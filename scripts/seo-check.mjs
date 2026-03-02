#!/usr/bin/env node
/**
 * SEO Audit Script — towing-no-1.com
 * Scans all pages in the app/ directory for SEO completeness
 * and outputs a CSV report of issues.
 *
 * Usage: node scripts/seo-check.mjs > seo-report.csv
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.join(__dirname, '..', 'app');

const issues = [];
const checked = [];

function addIssue(page, issue, severity = 'ERROR') {
  issues.push({ page, issue, severity });
}

function checkFile(filePath, pagePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const isClientComponent = content.includes('"use client"') || content.includes("'use client'");

  if (isClientComponent) {
    // Client components cannot export metadata
    if (content.includes('export const metadata') || content.includes('export async function generateMetadata')) {
      addIssue(pagePath, 'Client component exports metadata — Next.js will ignore it', 'ERROR');
    }
    if (!content.includes('export default function') && !content.includes('export default async function')) {
      return; // Skip if no default export
    }
    // No metadata exportable — parent should handle it
    checked.push({ page: pagePath, title: '[CLIENT COMPONENT — metadata in parent]', description: '-', canonical: '-', og: '-' });
    return;
  }

  // Check for metadata export (static or dynamic)
  const hasMetadata = content.includes('export const metadata') || content.includes('export async function generateMetadata');
  if (!hasMetadata) {
    addIssue(pagePath, 'Missing metadata export (no title or description)', 'ERROR');
  }

  // If generateMetadata is used, it's dynamic — skip static analysis
  if (content.includes('export async function generateMetadata') && !content.includes('export const metadata')) {
    checked.push({ page: pagePath, title: '[dynamic generateMetadata]', description: '[dynamic]', canonical: 'dynamic', og: 'dynamic' });
    return;
  }

  // Extract title — match double-quoted strings (handles apostrophes inside)
  const titleMatch = content.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : '';
  if (!title) {
    addIssue(pagePath, 'Missing <title> tag', 'ERROR');
  } else if (title.length > 65) {
    addIssue(pagePath, `Title too long (${title.length} chars > 65): "${title.slice(0, 50)}..."`, 'WARNING');
  }

  // Extract description — match double-quoted strings (handles apostrophes inside)
  const descMatch = content.match(/description:\s*"([^"]+)"/);
  const desc = descMatch ? descMatch[1] : '';
  if (!desc) {
    addIssue(pagePath, 'Missing meta description', 'ERROR');
  } else if (desc.length < 100) {
    addIssue(pagePath, `Meta description too short (${desc.length} chars < 100)`, 'WARNING');
  } else if (desc.length > 160) {
    addIssue(pagePath, `Meta description too long (${desc.length} chars > 160)`, 'WARNING');
  }

  // Check for canonical
  const hasCanonical = content.includes('alternates') && content.includes('canonical');
  if (!hasCanonical) {
    addIssue(pagePath, 'Missing alternates.canonical', 'ERROR');
  }

  // Check for OG tags
  const hasOG = content.includes('openGraph');
  if (!hasOG) {
    addIssue(pagePath, 'Missing openGraph metadata', 'WARNING');
  }

  // Check for Twitter Card
  const hasTwitter = content.includes('twitter:') || content.includes("twitter: {") || content.includes('twitter:{');
  if (!hasTwitter) {
    addIssue(pagePath, 'Missing Twitter Card metadata', 'WARNING');
  }

  checked.push({
    page: pagePath,
    title: title || '[MISSING]',
    description: desc ? `${desc.slice(0, 60)}...` : '[MISSING]',
    canonical: hasCanonical ? 'YES' : 'NO',
    og: hasOG ? 'YES' : 'NO',
  });
}

function walkDir(dir, prefix = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const routePath = prefix + '/' + entry.name;

    if (entry.isDirectory()) {
      // Skip API routes, internal Next.js dirs
      if (['api', '_app', '_document'].includes(entry.name)) continue;
      walkDir(fullPath, routePath);
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      checkFile(fullPath, prefix || '/');
    }
  }
}

walkDir(APP_DIR);

// Output CSV
console.log('--- SEO ISSUES REPORT ---');
console.log('Page,Severity,Issue');
for (const { page, severity, issue } of issues) {
  console.log(`"${page}","${severity}","${issue}"`);
}

console.log('\n--- PAGES CHECKED ---');
console.log('Page,Title,Description,Canonical,OG');
for (const row of checked) {
  console.log(`"${row.page}","${row.title}","${row.description}","${row.canonical}","${row.og}"`);
}

const errors = issues.filter(i => i.severity === 'ERROR').length;
const warnings = issues.filter(i => i.severity === 'WARNING').length;

console.log(`\nSummary: ${errors} errors, ${warnings} warnings across ${checked.length} pages`);

if (errors > 0) {
  console.error(`\n[FAIL] ${errors} critical SEO errors found.`);
  process.exit(1);
} else {
  console.log('\n[PASS] No critical SEO errors found.');
}
