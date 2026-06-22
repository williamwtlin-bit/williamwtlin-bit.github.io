'use strict';


// \u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557
// \u2551  CONFIGURATION \u2014 Replace CLIENT_ID after registering your OAuth app  \u2551
// \u2551  See setup guide (click "Setup" on the login screen)                 \u2551
// \u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d
const CONFIG = {
  CLIENT_ID: 'xtLaSSXv7eKGXejZjiVFoDpdV9t8XneW',        // \u2190 Paste your Client ID here
  // Must match exactly what is registered in Atlassian OAuth app Callback URL
  REDIRECT_URI: 'https://william-appier.github.io/CSM-Dashboard/',
  AUTH_URL:  'https://auth.atlassian.com/authorize',
  // \u2190 Replace with your Cloudflare Worker URL after deploying it
  TOKEN_URL: 'https://workerfordashboard.williamlin12.workers.dev',
  API_BASE:  'https://api.atlassian.com',
  SCOPES:    'read:jira-work write:jira-work read:jira-user read:me offline_access',
  // Token refresh buffer: refresh if less than 5 min until expiry
  REFRESH_BUFFER_MS: 5 * 60 * 1000,
};

// \u2500\u2500 SESSION STORAGE KEYS (namespace to avoid collisions) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const SK = {
  TOKENS:   'jd_tokens',     // {access_token, refresh_token, expires_at}
  USER:     'jd_user',       // {accountId, displayName, email, cloudId, siteUrl}
  VERIFIER: 'jd_pkce_verif', // PKCE code_verifier (temporary, cleared after use)
  STATE:    'jd_oauth_state',// CSRF state nonce (temporary, cleared after use)
};

// \u2500\u2500 RUNTIME STATE \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
const COLORS=['#4f8ef7','#7c5cfa','#34d399','#fbbf24','#f87171','#22d3ee','#fb923c','#a78bfa','#38bdf8','#e879f9'];
let allData=[], selAsn=null;

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
