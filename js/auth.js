'use strict';

// SECTION 1 \u2014 PKCE UTILITIES
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

// Cryptographically random string using Web Crypto API (available on HTTPS + localhost)
function randomString(len=64){
  const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const arr=new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr,b=>chars[b%chars.length]).join('');
}

// base64url encode (no padding, URL-safe)
function b64url(buf){
  return btoa(String.fromCharCode(...new Uint8Array(buf)))
    .replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'');
}

async function generatePKCE(){
  const verifier=randomString(64);
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier));
  return {verifier, challenge:b64url(digest)};
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// SECTION 2 \u2014 TOKEN MANAGEMENT (sessionStorage only \u2014 cleared on tab close)
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

function saveTokens(t){
  // Never log tokens. Store expiry as absolute timestamp.
  sessionStorage.setItem(SK.TOKENS, JSON.stringify({
    access_token:  t.access_token,
    refresh_token: t.refresh_token || null,
    expires_at:    Date.now() + (t.expires_in || 3600) * 1000,
  }));
}

function getTokens(){
  try{ return JSON.parse(sessionStorage.getItem(SK.TOKENS)); }
  catch(e){ return null; }
}

function saveUser(u){ sessionStorage.setItem(SK.USER, JSON.stringify(u)); }
function getUser(){
  try{ return JSON.parse(sessionStorage.getItem(SK.USER)); }
  catch(e){ return null; }
}

function clearSession(){
  Object.values(SK).forEach(k=>sessionStorage.removeItem(k));
}

function isTokenExpiringSoon(){
  const t=getTokens();
  return !t || Date.now() >= (t.expires_at - CONFIG.REFRESH_BUFFER_MS);
}

// Returns a valid access token, refreshing if needed
async function getAccessToken(){
  if(!isTokenExpiringSoon()){
    const t=getTokens();
    if(t?.access_token) return t.access_token;
  }
  // Attempt refresh
  const t=getTokens();
  if(!t?.refresh_token) throw new Error('Session expired. Please log in again.');
  // Send JSON to Cloudflare Worker proxy (Worker adds client_secret server-side)
  const resp=await fetch(CONFIG.TOKEN_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      grant_type:    'refresh_token',
      refresh_token: t.refresh_token,
    }),
  });
  if(!resp.ok) throw new Error('Token refresh failed. Please log in again.');
  const fresh=await resp.json();
  saveTokens(fresh);
  return fresh.access_token;
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
// SECTION 3 \u2014 OAUTH 2.0 FLOW
// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550

async function startLogin(){
  if(!getConfiguredClientId()){ showSetupScreen(); return; }
  const btn=document.getElementById('loginBtn');
  btn.disabled=true; btn.textContent='Redirecting\u2026';

  // Generate PKCE + state, store temporarily in sessionStorage
  const {verifier,challenge}=await generatePKCE();
  const state=randomString(32);
  sessionStorage.setItem(SK.VERIFIER, verifier);
  sessionStorage.setItem(SK.STATE, state);

  const params=new URLSearchParams({
    audience:          'api.atlassian.com',
    client_id:         getConfiguredClientId(),
    scope:             CONFIG.SCOPES,
    redirect_uri:      CONFIG.REDIRECT_URI,
    state:             state,
    response_type:     'code',
    prompt:            'consent',
    code_challenge:    challenge,
    code_challenge_method: 'S256',
  });
  // Navigate to Atlassian \u2014 user will see Google SSO if configured on their org
  window.location.href = `${CONFIG.AUTH_URL}?${params}`;
}

async function handleOAuthCallback(){
  const params=new URLSearchParams(window.location.search);
  const code=params.get('code');
  const returnedState=params.get('state');
  const error=params.get('error');

  // Clean the URL immediately \u2014 ~ever leave auth code in browser history
  history.replaceState({}, document.title, CONFIG.REDIRECT_URI);

  if(error){
    showLoginScreen();
    showLoginError(`Atlassian returned an error: ${error} \u2014 ${params.get('error_description')||''}`);
    return;
  }
  if(!code){ showLoginScreen(); return; }

  // \u2500\u2500 CSRF check: state must match exactly what we generated \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  const savedState=sessionStorage.getItem(SK.STATE);
  const verifier=sessionStorage.getItem(SK.VERIFIER);
  sessionStorage.removeItem(SK.STATE);    // one-time use
  sessionStorage.removeItem(SK.VERIFIER); // one-time use

  if(!savedState || returnedState !== savedState){
    showLoginScreen();
    showLoginError('Security check failed (state mismatch). This could indicate a CSRF attack. Please try again.');
    return;
  }
  if(!verifier){
    showLoginScreen();
    showLoginError('PKCE verifier missing. Please try logging in again.');
    return;
  }

  // \u2500\u2500 Exchange code for tokens via Cloudflare Worker proxy \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
  showScreen('loading');
  try{
    // Worker receives JSON, adds client_secret server-side, calls Atlassian
    const resp=await fetch(CONFIG.TOKEN_URL,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({
        grant_type:    'authorization_code',
        code:          code,
        redirect_uri:  CONFIG.REDIRECT_URI,
        code_verifier: verifier,
      }),
    });
    if(!resp.ok){
      const err=await resp.json().catch(()=>({error_description:'Unknown error'}));
      throw new Error(err.error_description || `HTTP ${resp.status}`);
    }
    const tokens=await resp.json();
    saveTokens(tokens);

    // \u2500\u2500 Fetch user identity \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500
    const [me, resources]=await Promise.all([fetchMe(), fetchAccessibleResources()]);
    // Pick the resource that has Jira scopes \u2014 avoids accidentally picking Confluence
    const resource = resources.find(r =>
      r.scopes && r.scopes.some(s => s.includes('jira'))
    ) || resources[0];
    const user={
      accountId:   me.account_id,
      displayName: me.name,
      email:       me.email,
      cloudId:     resource?.id    || '',
      siteUrl:     resource?.url   || 'https://appier.atlassian.net',
      siteName:    resource?.name  || '',
    };
    if(!user.cloudId){
      throw new Error('Could not determine Atlassian Cloud ID. Ensure your OAuth app scopes include read:jira-work and that your account has access to a Jira site.');
    }
    saveUser(user);
    launchDashboard(user);
  }catch(e){
    clearSession();
    showLoginScreen();
    showLoginError(`Login failed: ${e.message}`);
  }
}

// \u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550
