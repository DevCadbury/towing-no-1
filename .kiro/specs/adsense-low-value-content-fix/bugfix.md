# Bugfix Requirements Document

## Introduction

The towing service website (towingno1.com) was rejected by Google AdSense under the "Low Value Content" policy. AdSense flagged the site as having too few pages, little original content, possible AI-generated or thin content, insufficient value to users, or an incomplete/under-development appearance.

This bugfix treats the site's failure to meet AdSense's minimum quality and value criteria as the defect to be corrected. The goal is to bring every reviewable page and site-wide signal up to AdSense's published standards (substantial original content, required policy pages, working navigation, mobile-friendliness, no broken links, HTTPS, a valid AdSense verification code in the `<head>` of every page, and a verified Search Console property with no outstanding issues) — while preserving the site's existing working behavior, SEO structure, branding, and contact/dispatch functionality.

The "input" (X) for the bug condition is any reviewable surface AdSense evaluates: an individual page/post, a required policy page, the site-wide navigation, the document `<head>`, an outbound/internal link, or the Search Console property state.

## Bug Analysis

### Current Behavior (Defect)

The site currently fails AdSense review because the following conditions are present:

1.1 WHEN AdSense reviews the count of substantive, content-rich pages THEN the site presents too few qualifying pages to demonstrate value (below the 15–20 quality page/post threshold).

1.2 WHEN AdSense evaluates a content page (home, service, location, blog, about, contact) THEN the page contains thin or insufficient original text (well under 500–1000+ words of unique, useful content) and reads as templated or AI-generated.

1.3 WHEN AdSense looks for the required policy and informational pages (About Us, Contact Us, Privacy Policy, Terms & Conditions) THEN one or more are missing, incomplete, or too thin to satisfy the policy requirement.

1.4 WHEN AdSense parses the document `<head>` of pages for site ownership/verification THEN the Google Search Console verification value is a placeholder (`REPLACE_WITH_YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE`) rather than a valid verification code.

1.5 WHEN AdSense crawls the site's internal and outbound links THEN one or more broken links, dead routes, or unresolved references are encountered.

1.6 WHEN AdSense assesses navigation and information architecture THEN content pages are not all reliably reachable through a clear menu/navigation structure, making parts of the site appear incomplete.

1.7 WHEN AdSense evaluates overall site completeness THEN the site appears under-development or low-value due to the combination of thin content, missing depth, and unverified ownership signals.

### Expected Behavior (Correct)

For the same review conditions, the corrected site SHALL satisfy AdSense's quality and value criteria:

2.1 WHEN AdSense reviews the count of substantive, content-rich pages THEN the site SHALL present at least 15–20 quality, indexable pages/posts that each provide genuine user value.

2.2 WHEN AdSense evaluates a content page (home, service, location, blog, about, contact) THEN the page SHALL contain original, useful, human-quality text of 500–1000+ words that is specific to the page topic and not duplicated across pages.

2.3 WHEN AdSense looks for the required policy and informational pages THEN the site SHALL provide complete, substantive About Us, Contact Us, Privacy Policy, and Terms & Conditions pages, each reachable from site navigation.

2.4 WHEN AdSense parses the document `<head>` of every page THEN the page SHALL include a valid Google Search Console verification code and the AdSense verification/code snippet, with no placeholder values remaining.

2.5 WHEN AdSense crawls the site's internal and outbound links THEN every link SHALL resolve successfully with no broken links or dead routes.

2.6 WHEN AdSense assesses navigation and information architecture THEN every content page SHALL be reachable through a clear, consistent menu/navigation structure on both desktop and mobile.

2.7 WHEN AdSense evaluates overall site completeness THEN the site SHALL present as a complete, professional, mobile-friendly site served over HTTPS, with a verified Search Console property reporting no coverage, manual action, or security issues.

### Unchanged Behavior (Regression Prevention)

The following existing behavior MUST be preserved while fixing the defect:

3.1 WHEN a visitor uses the call-to-action or phone links (e.g., `tel:+17788380014`) THEN the system SHALL CONTINUE TO trigger the correct dialing/contact behavior.

3.2 WHEN a visitor navigates existing routes (`/`, `/about`, `/contact`, `/privacy`, `/terms`, `/blog`, `/blog/[slug]`, `/locations`, `/locations/[city]`, `/services`, and each service page) THEN the system SHALL CONTINUE TO render those routes successfully without 404s or regressions.

3.3 WHEN search engines and crawlers read the site's structured data, metadata, sitemap, and robots configuration THEN the system SHALL CONTINUE TO expose valid SEO signals (JSON-LD schema, canonical URLs, Open Graph/Twitter tags, sitemap, robots) without breaking existing entries.

3.4 WHEN a visitor loads any page on a mobile or desktop device THEN the system SHALL CONTINUE TO render the existing responsive layout, branding, navbar, footer, and floating call button correctly.

3.5 WHEN existing integrations load (Google Tag Manager, Google Analytics, AdSense script, live-chat widget) THEN the system SHALL CONTINUE TO initialize without errors or being removed.

3.6 WHEN a visitor submits the contact/email flow THEN the system SHALL CONTINUE TO process the request through the existing API routes without change to that behavior.

## Bug Condition Derivation

The bug condition and properties below guide the fix and its validation.

**Bug Condition Function** — identifies a reviewable surface that fails AdSense's value criteria:

```pascal
FUNCTION isBugCondition(X)
  INPUT: X of type ReviewableSurface   // a page, policy page, head, link, nav, or SC property state
  OUTPUT: boolean

  RETURN (X is a content page AND wordCount(X) < 500)
      OR (X is a content page AND NOT isOriginalUsefulContent(X))
      OR (X is a required policy page AND (isMissing(X) OR isThin(X)))
      OR (X is a document head AND verificationCode(X) = PLACEHOLDER)
      OR (X is a link AND NOT resolves(X))
      OR (X is a content page AND NOT reachableFromNav(X))
      OR (totalQualityPages(site) < 15)
END FUNCTION
```

**Property: Fix Checking** — for every surface that triggers the bug, the fixed site must satisfy the value criteria:

```pascal
// Property: Fix Checking - AdSense value criteria met
FOR ALL X WHERE isBugCondition(X) DO
  result ← review'(X)
  ASSERT meetsAdSenseValueCriteria(result)
  // i.e. content page has >= 500 words of original useful content,
  //      required policy pages present and substantive,
  //      head contains a valid (non-placeholder) verification code,
  //      every link resolves, every page reachable from nav,
  //      total quality pages >= 15
END FOR
```

**Property: Preservation Checking** — for every surface that does NOT trigger the bug, behavior is unchanged:

```pascal
// Property: Preservation Checking
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT review(X) = review'(X)
  // existing routes, CTAs, SEO signals, responsive layout,
  // analytics/chat integrations, and contact API behave identically
END FOR
```

- **F**: the site as it exists today (rejected by AdSense).
- **F'**: the corrected site after applying the fix.
