#!/usr/bin/env node

/**
 * Deployment Verification Script
 * 
 * This script verifies that all fixes have been properly deployed:
 * 1. Google Analytics is loading
 * 2. Redirects are working correctly
 * 3. Sitemap is accessible
 * 4. No redirect chains exist
 */

import https from 'https';
import http from 'http';

const DOMAIN = 'www.towingno1.com';
const BASE_URL = `https://${DOMAIN}`;

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    
    const req = client.request(url, {
      method: options.method || 'GET',
      headers: options.headers || {},
      ...options,
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve({ 
        statusCode: res.statusCode, 
        headers: res.headers,
        data,
        redirectLocation: res.headers.location 
      }));
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function checkGoogleAnalytics() {
  log('\n📊 Checking Google Analytics...', 'cyan');
  
  try {
    const response = await makeRequest(BASE_URL);
    
    if (response.data.includes('gtag/js?id=G-30WWS5SMCS')) {
      log('✅ Google Analytics script found (gtag.js)', 'green');
    } else {
      log('❌ Google Analytics script NOT found', 'red');
      return false;
    }
    
    if (response.data.includes("gtag('config', 'G-30WWS5SMCS')")) {
      log('✅ Google Analytics config found', 'green');
    } else {
      log('❌ Google Analytics config NOT found', 'red');
      return false;
    }
    
    return true;
  } catch (error) {
    log(`❌ Error checking Google Analytics: ${error.message}`, 'red');
    return false;
  }
}

async function checkRedirect(fromUrl, expectedToUrl, description) {
  log(`\n🔀 Checking redirect: ${description}`, 'cyan');
  log(`   From: ${fromUrl}`, 'blue');
  log(`   Expected: ${expectedToUrl}`, 'blue');
  
  try {
    const response = await makeRequest(fromUrl, {
      followRedirect: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DeploymentVerifier/1.0)',
      }
    });
    
    if (response.statusCode === 301 || response.statusCode === 308) {
      if (response.redirectLocation === expectedToUrl || 
          response.redirectLocation === expectedToUrl + '/') {
        log(`✅ Redirect working (${response.statusCode})`, 'green');
        log(`   → ${response.redirectLocation}`, 'green');
        return true;
      } else {
        log(`⚠️  Redirect to unexpected location (${response.statusCode})`, 'yellow');
        log(`   → ${response.redirectLocation}`, 'yellow');
        return false;
      }
    } else if (response.statusCode === 200) {
      log(`⚠️  No redirect (200 OK) - might be correct if this is the canonical URL`, 'yellow');
      return fromUrl === expectedToUrl;
    } else {
      log(`❌ Unexpected status code: ${response.statusCode}`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Error checking redirect: ${error.message}`, 'red');
    return false;
  }
}

async function checkNoRedirect(url, description) {
  log(`\n✓ Checking canonical URL: ${description}`, 'cyan');
  log(`   URL: ${url}`, 'blue');
  
  try {
    const response = await makeRequest(url, {
      followRedirect: false,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; DeploymentVerifier/1.0)',
      }
    });
    
    if (response.statusCode === 200) {
      log(`✅ No redirect (200 OK) - Correct!`, 'green');
      return true;
    } else if (response.statusCode === 301 || response.statusCode === 308) {
      log(`❌ Unexpected redirect (${response.statusCode})`, 'red');
      log(`   → ${response.redirectLocation}`, 'red');
      return false;
    } else {
      log(`⚠️  Unexpected status code: ${response.statusCode}`, 'yellow');
      return false;
    }
  } catch (error) {
    log(`❌ Error checking URL: ${error.message}`, 'red');
    return false;
  }
}

async function checkSitemap() {
  log('\n🗺️  Checking Sitemap...', 'cyan');
  
  try {
    const response = await makeRequest(`${BASE_URL}/sitemap.xml`);
    
    if (response.statusCode === 200) {
      log('✅ Sitemap accessible (200 OK)', 'green');
      
      if (response.data.includes('<urlset')) {
        log('✅ Valid XML sitemap format', 'green');
      } else {
        log('⚠️  Response doesn\'t look like a valid sitemap', 'yellow');
      }
      
      // Count URLs
      const urlMatches = response.data.match(/<url>/g);
      if (urlMatches) {
        log(`✅ Found ${urlMatches.length} URLs in sitemap`, 'green');
      }
      
      return true;
    } else {
      log(`❌ Sitemap not accessible (${response.statusCode})`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Error checking sitemap: ${error.message}`, 'red');
    return false;
  }
}

async function checkRobotsTxt() {
  log('\n🤖 Checking robots.txt...', 'cyan');
  
  try {
    const response = await makeRequest(`${BASE_URL}/robots.txt`);
    
    if (response.statusCode === 200) {
      log('✅ robots.txt accessible (200 OK)', 'green');
      
      if (response.data.includes('Sitemap: https://www.towingno1.com/sitemap.xml')) {
        log('✅ Sitemap URL found in robots.txt', 'green');
      } else {
        log('⚠️  Sitemap URL not found in robots.txt', 'yellow');
      }
      
      if (response.data.includes('Host: https://www.towingno1.com')) {
        log('✅ Host directive found in robots.txt', 'green');
      } else {
        log('⚠️  Host directive not found in robots.txt', 'yellow');
      }
      
      return true;
    } else {
      log(`❌ robots.txt not accessible (${response.statusCode})`, 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Error checking robots.txt: ${error.message}`, 'red');
    return false;
  }
}

async function main() {
  log('\n╔════════════════════════════════════════════════════════════╗', 'cyan');
  log('║         Deployment Verification Script                    ║', 'cyan');
  log('║         TowingNo.1 - Google Indexing Fixes                ║', 'cyan');
  log('╚════════════════════════════════════════════════════════════╝', 'cyan');
  
  const results = {
    googleAnalytics: false,
    redirects: [],
    sitemap: false,
    robotsTxt: false,
  };
  
  // Check Google Analytics
  results.googleAnalytics = await checkGoogleAnalytics();
  
  // Check redirects
  log('\n' + '='.repeat(60), 'cyan');
  log('REDIRECT TESTS', 'cyan');
  log('='.repeat(60), 'cyan');
  
  // HTTP to HTTPS redirect
  results.redirects.push(
    await checkRedirect(
      `http://${DOMAIN}`,
      BASE_URL,
      'HTTP to HTTPS'
    )
  );
  
  // Non-www to www redirect
  results.redirects.push(
    await checkRedirect(
      'https://towingno1.com',
      BASE_URL,
      'Non-www to www'
    )
  );
  
  // Canonical URL should NOT redirect
  results.redirects.push(
    await checkNoRedirect(
      BASE_URL,
      'Canonical URL (should not redirect)'
    )
  );
  
  // Check sitemap
  log('\n' + '='.repeat(60), 'cyan');
  log('SITEMAP & ROBOTS.TXT TESTS', 'cyan');
  log('='.repeat(60), 'cyan');
  
  results.sitemap = await checkSitemap();
  results.robotsTxt = await checkRobotsTxt();
  
  // Summary
  log('\n' + '='.repeat(60), 'cyan');
  log('SUMMARY', 'cyan');
  log('='.repeat(60), 'cyan');
  
  const allRedirectsPass = results.redirects.every(r => r);
  const allPass = results.googleAnalytics && allRedirectsPass && 
                  results.sitemap && results.robotsTxt;
  
  log(`\nGoogle Analytics: ${results.googleAnalytics ? '✅ PASS' : '❌ FAIL'}`, 
      results.googleAnalytics ? 'green' : 'red');
  log(`Redirects: ${allRedirectsPass ? '✅ PASS' : '❌ FAIL'}`, 
      allRedirectsPass ? 'green' : 'red');
  log(`Sitemap: ${results.sitemap ? '✅ PASS' : '❌ FAIL'}`, 
      results.sitemap ? 'green' : 'red');
  log(`Robots.txt: ${results.robotsTxt ? '✅ PASS' : '❌ FAIL'}`, 
      results.robotsTxt ? 'green' : 'red');
  
  log('\n' + '='.repeat(60), 'cyan');
  
  if (allPass) {
    log('\n🎉 All checks passed! Deployment is ready for Google indexing.', 'green');
    log('\nNext steps:', 'cyan');
    log('1. Wait 24-48 hours for Google to re-crawl', 'blue');
    log('2. Request indexing in Google Search Console', 'blue');
    log('3. Monitor indexing status daily', 'blue');
  } else {
    log('\n⚠️  Some checks failed. Please review the issues above.', 'yellow');
    log('\nTroubleshooting:', 'cyan');
    log('1. Ensure changes are deployed to Vercel', 'blue');
    log('2. Clear Vercel cache if needed', 'blue');
    log('3. Check Vercel deployment logs', 'blue');
  }
  
  log('');
  process.exit(allPass ? 0 : 1);
}

main().catch(error => {
  log(`\n❌ Fatal error: ${error.message}`, 'red');
  console.error(error);
  process.exit(1);
});
