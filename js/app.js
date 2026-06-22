'use strict';

// \u2500\u2500 ENTRY POINT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
initTheme(); // Apply saved theme on load
initBrief(); // Initialise CSM Brief tab (static data, no auth needed)
(async function init(){
  // Security: warn if not on HTTPS (PKCE crypto requires secure context)
  if(location.protocol==='http:' && location.hostname!=='localhost'){
    alert('\u26a0\ufe0f Warning: This page is loaded over HTTP. OAuth login requires HTTPS. Please host this file on a secure server.');
    return;
  }

  // Case 1: Returning from Atlassian OAuth redirect (URL has ?code=...)
  if(new URLSearchParams(window.location.search).has('code')){
    await handleOAuthCallback();
    return;
  }

  // Case 2: Already have a valid session in sessionStorage
  const tokens=getTokens();
  const user=getUser();
  if(tokens && user && !isTokenExpiringSoon()){
    launchDashboard(user);
    return;
  }

  // Case 3: No session \u2014 show login screen
  showLoginScreen();
})();
