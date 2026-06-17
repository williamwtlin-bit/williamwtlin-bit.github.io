'use strict';

// SECTION 6 — SCREEN MANAGEMENT & APP INIT
// ════════════════════════════════════════════════════════════════════════════

function showScreen(name){
  ['loginScreen','appScreen'].forEach(id=>{
    const el=document.getElementById(id);
    if(el) el.style.display=(id===name+'Screen'||id===name)?'':'none';
  });
  if(name==='appScreen') document.getElementById('appScreen').style.display='block';
}

function showLoginScreen(){
  showScreen('login');
  const btn=document.getElementById('loginBtn');
  btn.disabled=false;
  btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg> Sign in with Atlassian';
}
function showLoginError(msg){
  const el=document.getElementById('loginErr'); el.textContent=msg; el.style.display='block';
}
function getConfiguredClientId(){
  return CONFIG.CLIENT_ID || null;
}
// Stub — setup screen removed
function showSetupScreen(){ showLoginScreen(); }
function copyRedirectUri(){}
function logout(){
  clearSession();
  selAsn=null; allData=[]; tbdData=[];
  showLoginScreen();
  toast('info','Logged out — session cleared');
}

async function launchDashboard(user){
  showScreen('app');
  document.getElementById('tab-brief').style.display=user.email==='william.wt.lin@appier.com'?'':'none';
  document.getElementById('headerUser').textContent=user.displayName;
  document.getElementById('headerSub').textContent=
    `${user.email} · ${user.siteName||user.siteUrl} · Reporter view`;
  try{
    // Fetch both datasets in parallel
    const [reported, assigned] = await Promise.all([
      fetchAllIssues(user),
      fetchAssignedIssues(user),
    ]);
    renderDashboard(reported);
    renderTbd(assigned);
    renderPinned();
    toast('success',`Welcome ${user.displayName} — loaded ${reported.length} reported, ${assigned.length} assigned`);
    // Strip any stale mock records left over from a preview session (ob_mock_*)
    saveOnboardings(loadOnboardings().filter(function(o){ return !o.id.startsWith('ob_mock_'); }));
    renderOnboardingProgress();
    scheduleDaily();
  }catch(e){
    toast('error',`Could not load tickets: ${e.message}`);
  }
}

// ── PREVIEW / MOCK MODE ──────────────────────────────────────────────────────
const MOCK_REPORTED = [
  // ── Mannings: mix of active + done (normal full card) ──
  {key:'ETS-3345',url:'#',summary:'[Mannings] Campaign #3115910 investigation',status:'To Do',assignee:'hazel.wang',reporter:'william.wt.lin',created:'2026-04-28',resolutiondate:null},
  {key:'QGWL-25560',url:'#',summary:'[Mannings] Campaign #3115910 investigation',status:'Backlog',assignee:'hazel.wang',reporter:'william.wt.lin',created:'2026-04-28',resolutiondate:null},
  {key:'QGWL-25487',url:'#',summary:'[Mannings] Check edm campaign deliver queries',status:'In Progress',assignee:'hazel.wang',reporter:'william.wt.lin',created:'2026-04-20',resolutiondate:null},
  {key:'ETS-3058',url:'#',summary:'[Mannings] Request on prediction support data',status:'In Progress',assignee:'Zoe Cheng',reporter:'william.wt.lin',created:'2026-04-15',resolutiondate:null},
  {key:'QGWL-25295',url:'#',summary:'[Mannings] OJM delete this node only feature is not working',status:'Backlog',assignee:'hazel.wang',reporter:'william.wt.lin',created:'2026-03-30',resolutiondate:null},
  {key:'ETS-3173',url:'#',summary:'[Mannings] Integration status checking',status:'Done',assignee:'jason.wu',reporter:'william.wt.lin',created:'2026-04-21',resolutiondate:'2026-04-21'},
  {key:'ETS-3166',url:'#',summary:'[Mannings] Check edm campaign deliver queries',status:'Done',assignee:'hazel.wang',reporter:'william.wt.lin',created:'2026-04-21',resolutiondate:'2026-04-22'},
  {key:'QGWL-25258',url:'#',summary:'[Mannings] Feed trigger campaign investigation',status:'Done',assignee:'hazel.wang',reporter:'william.wt.lin',created:'2026-03-25',resolutiondate:'2026-04-08'},
  {key:'ETS-2705',url:'#',summary:'[Mannings] Enable enterprise segment feature',status:"Won't Fix",assignee:'hazel.wang',reporter:'william.wt.lin',created:'2026-03-10',resolutiondate:'2026-03-20'},

  // ── 1010Hope: active only (normal card, no done section) ──
  {key:'QGWL-25317',url:'#',summary:'[1010Hope] klickngo API Integration',status:'In Progress',assignee:'Mark Liu',reporter:'william.wt.lin',created:'2026-04-01',resolutiondate:null},
  {key:'QGWL-24745',url:'#',summary:'[1010Hope] Onboarding new AIQUA account',status:'In Progress',assignee:'Mark Liu',reporter:'william.wt.lin',created:'2026-01-16',resolutiondate:null},

  // ── Qchicken: active + done ──
  {key:'QGWL-24972',url:'#',summary:'[Qchicken] Enable campaign agent for client',status:'Backlog',assignee:'susan.huang',reporter:'william.wt.lin',created:'2026-02-13',resolutiondate:null},
  {key:'ETS-2926',url:'#',summary:'[Qchicken] Enable event count condition on AIQUA',status:'Done',assignee:'vivian.yang',reporter:'william.wt.lin',created:'2026-04-09',resolutiondate:'2026-04-09'},
  {key:'AEP-6217',url:'#',summary:'[Qchicken] Credit System operation request',status:'Done',assignee:'mars.weng',reporter:'william.wt.lin',created:'2026-03-27',resolutiondate:'2026-03-30'},

  // ── Luxgen: ALL DONE → compact row ──
  {key:'FIN-2402',url:'#',summary:'[Luxgen] 2026-3月服務交付報告',status:'Done',assignee:'william.wt.lin',reporter:'william.wt.lin',created:'2026-04-01',resolutiondate:'2026-04-01'},
  {key:'FIN-2340',url:'#',summary:'[Luxgen] 2026-2月服務交付報告',status:'Done',assignee:'william.wt.lin',reporter:'william.wt.lin',created:'2026-03-05',resolutiondate:'2026-03-10'},
  {key:'FIN-2283',url:'#',summary:'[Luxgen] 2026-1月服務交付報告',status:'Done',assignee:'william.wt.lin',reporter:'william.wt.lin',created:'2026-02-05',resolutiondate:'2026-02-05'},

  // ── Genki: ALL DONE → compact row ──
  {key:'ETS-2622',url:'#',summary:'[Genki] Offboard Genki AIXON account',status:'Done',assignee:'jason.wu',reporter:'william.wt.lin',created:'2026-03-20',resolutiondate:'2026-03-20'},
  {key:'ETS-1650',url:'#',summary:'[Genki] Deactivate Genki account',status:'Done',assignee:'jason.wu',reporter:'william.wt.lin',created:'2026-01-21',resolutiondate:'2026-01-21'},
  {key:'PROJ-32948',url:'#',summary:'[Genki] Offboard Genki AIXON account',status:"Won't Fix",assignee:'jason.wu',reporter:'william.wt.lin',created:'2026-03-16',resolutiondate:'2026-03-16'},

  // ── 55688潔衣家: Pending Approval (active, normal card) ──
  {key:'BBT-7216',url:'#',summary:'[55688潔衣家] Customized binding feature show error messages',status:'Pending Approval',assignee:'rick.lee',reporter:'william.wt.lin',created:'2026-02-12',resolutiondate:null},
  {key:'BBT-7209',url:'#',summary:'[55688潔衣家] 反映腳本模組突然消失',status:'Done',assignee:'rick.lee',reporter:'william.wt.lin',created:'2026-02-11',resolutiondate:'2026-02-11'},

  // ── Others: no brackets ──
  {key:'AIR-4126',url:'#',summary:'Feature request on providing event prediction on AIRIS UI',status:'To Do',assignee:'Michael Palmer',reporter:'william.wt.lin',created:'2026-02-05',resolutiondate:null},
  {key:'EAM-355',url:'#',summary:'Offboard Request - Genki',status:'Backlog',assignee:'Roland Wang',reporter:'william.wt.lin',created:'2026-03-16',resolutiondate:null},
];

const MOCK_ASSIGNED = [
  // Longest lead time first (oldest created = highest priority)
  {key:'PROJ-9005',url:'#',summary:'[Mannings] Approve AIXON renewal contract',status:'UNDER CLIENT REVIEW',assignee:'william.wt.lin',reporter:'jason.wu',created:'2026-01-20',resolutiondate:null},
  {key:'QGWL-9003',url:'#',summary:'[Qchicken] Confirm DQB toggle settings',status:'Backlog',assignee:'william.wt.lin',reporter:'vivian.yang',created:'2026-02-20',resolutiondate:null},
  {key:'ETS-9001',url:'#',summary:'[Mannings] Review webhook integration docs',status:'In Progress',assignee:'william.wt.lin',reporter:'hazel.wang',created:'2026-03-01',resolutiondate:null},
  {key:'ETS-9002',url:'#',summary:'[1010Hope] Validate KlickNGo API response format',status:'To Do',assignee:'william.wt.lin',reporter:'Mark Liu',created:'2026-03-15',resolutiondate:null},
  {key:'ETS-9004',url:'#',summary:'[Luxgen] Monthly delivery report sign-off',status:'To Do',assignee:'william.wt.lin',reporter:'Brandon Tang',created:'2026-04-10',resolutiondate:null},
];

// ── MOCK ONBOARDING RECORDS ─────────────────────────────────────────────────
const MOCK_ONBOARDINGS = [
  {
    id: 'ob_mock_001',
    platform: 'AIQUA',
    clientName: 'Mannings',
    legalTicket: 'LEG-1001',
    opportunityLink: 'https://appier.atlassian.net/opp/123',
    onboardTicketKey: 'QGWL-24745',
    appId: 'app-mannings-hk-001',
    createdAt: '2026-04-01',
    features: [
      { featureId:'sms',          name:'Enable SMS',              ticketKey:'QGWL-21143', status:'Done',        mode:'clone' },
      { featureId:'edm',          name:'Enable EDM Channel',      ticketKey:'QGWL-25054', status:'Done',        mode:'clone' },
      { featureId:'onsite',       name:'On-site Experience',      ticketKey:'QGWL-21222', status:'In Progress', mode:'clone' },
      { featureId:'seg_split',    name:'Segment Split',           ticketKey:'QGWL-25241', status:'Done',        mode:'clone' },
      { featureId:'creative',     name:'Creative Studio',         ticketKey:'QGWL-24875', status:'Backlog',     mode:'clone' },
      { featureId:'feed_trigger', name:'Feed Trigger',            ticketKey:'QGWL-25213', status:'Backlog',     mode:'manual_clone' },
    ],
  },
  {
    id: 'ob_mock_002',
    platform: 'AIQUA',
    clientName: '1010Hope',
    legalTicket: 'LEG-1002',
    opportunityLink: 'https://appier.atlassian.net/opp/456',
    onboardTicketKey: 'QGWL-24745',
    appId: '',   // ← No App ID yet — shows "Awaiting from TS" state
    createdAt: '2026-04-28',
    features: [
      { featureId:'edm',       name:'Enable EDM Channel',      ticketKey:'QGWL-9901', status:'Backlog',     mode:'clone' },
      { featureId:'onsite',    name:'On-site Experience',      ticketKey:'QGWL-9902', status:'Backlog',     mode:'clone' },
      { featureId:'seg_split', name:'Segment Split',           ticketKey:'QGWL-9903', status:'To Do',       mode:'clone' },
      { featureId:'creative',  name:'Creative Studio',         ticketKey:'QGWL-9904', status:'Backlog',     mode:'clone' },
    ],
  },
  {
    id: 'ob_mock_003',
    platform: 'AIQUA',
    clientName: 'Qchicken',
    legalTicket: 'LEG-1003',
    opportunityLink: 'https://appier.atlassian.net/opp/789',
    onboardTicketKey: 'QGWL-24746',
    appId: 'app-qchicken-tw-007',
    createdAt: '2026-03-15',
    features: [
      { featureId:'sms',          name:'Enable SMS',              ticketKey:'QGWL-8801', status:'Done',    mode:'clone' },
      { featureId:'edm',          name:'Enable EDM Channel',      ticketKey:'QGWL-8802', status:'Done',    mode:'clone' },
      { featureId:'seg_split',    name:'Segment Split',           ticketKey:'QGWL-8803', status:'Done',    mode:'clone' },
      { featureId:'new_seg',      name:'New Segment UI',          ticketKey:'QGWL-8804', status:'Done',    mode:'clone' },
      { featureId:'content_asst', name:'Content Assistant',       ticketKey:'QGWL-8805', status:'Done',    mode:'clone' },
    ],
  },
];

function loadPreview(){
  const mockUser = {
    accountId: 'preview-user',
    displayName: 'william.wt.lin (Preview)',
    email: 'william.wt.lin@appier.com',
    cloudId: 'preview',
    siteUrl: 'https://appier.atlassian.net',
    siteName: 'appier (Preview)',
  };
  showScreen('app');
  document.getElementById('headerUser').textContent = mockUser.displayName;
  document.getElementById('headerSub').textContent =
    `${mockUser.email} · ${mockUser.siteName} · Reporter view`;
  document.getElementById('previewBadge').style.display = 'flex';
  renderDashboard(MOCK_REPORTED);
  renderTbd(MOCK_ASSIGNED);
  renderPinned();
  toast('info', '🎨 Preview mode — showing mock data');

  // Inject mock onboardings into localStorage for preview
  saveOnboardings(MOCK_ONBOARDINGS);
  renderOnboardingProgressMock();
}

function exitPreview(){
  document.getElementById('previewBadge').style.display = 'none';
  // Clear mock onboardings and mock drafts from localStorage on exit
  if(loadOnboardings().some(o=>o.id.startsWith('ob_mock_'))){
    saveOnboardings([]);
  }
  if(loadDrafts().some(d=>d.id.startsWith('draft_MOCK'))){
    saveDrafts([]);
  }
  allData = []; tbdData = []; selAsn = null;
  showLoginScreen();
}

// Mock version of renderOnboardingProgress — skips the live Jira status fetch
// Inject one mock draft so preview shows the draft/resume state
function injectMockDraft(){
  const mockDraft = {
    id:               'draft_MOCK-9999',
    savedAt:          new Date().toISOString().slice(0,10)+'T09:00:00.000Z',
    platform:         'AIQUA',
    clientName:       'Luxgen',
    legalTicket:      'LEG-2001',
    opportunityLink:  'https://appier.atlassian.net/opp/999',
    assignee:         { accountId:'mock', displayName:'hazel.wang', avatarUrl:'' },
    onboardTicketKey: 'QGWL-MOCK-001',
    appId:            '',
    projectId:        '',
    organizationId:   '',
    selectedFeatures: { edm:true, seg_split:true, creative:true },
    extraFields:      { edm:{ email:'noreply@luxgen.com' } },
    step:             3,  // resumes at IDs step — TS provides these before feature selection
  };
  const drafts = loadDrafts().filter(d=>!d.id.startsWith('draft_MOCK'));
  drafts.unshift(mockDraft);
  saveDrafts(drafts);
}

function renderOnboardingProgressMock(){
  injectMockDraft();
  const list    = loadOnboardings();
  const secEl   = document.getElementById('obProgressSection');
  const newWrap = document.getElementById('obNewWrap');
  const cardsEl = document.getElementById('obCards');
  if(!secEl||!cardsEl) return;

  const mockDrafts = loadDrafts();
  if(!list.length && !mockDrafts.length){
    secEl.style.display='none';
    if(newWrap) newWrap.style.display='flex';
    return;
  }

  secEl.style.display='block';
  if(newWrap) newWrap.style.display='none';

  cardsEl.innerHTML = list.map(ob=>{
    const done  = ob.features.filter(f=>isDone(f.status||'')).length;
    const total = ob.features.length;
    const pct   = total ? Math.round((done/total)*100) : 0;
    const gid   = 'obc_'+ob.id;
    return `<div class="ob-card" id="${gid}">
      <div class="ob-card-header" onclick="toggleObCard('${gid}')">
        <span class="ob-client">${esc(ob.clientName)}</span>
        <span class="ob-platform-badge">${ob.platform}</span>
        <span class="ob-pct">${done}/${total} features done</span>
        <span class="ob-date">${ob.createdAt}</span>
        <div class="ob-progress-bar-wrap">
          <div class="ob-progress-fill" style="width:${pct}%"></div>
        </div>
      </div>
      <div class="ob-card-body open" id="${gid}_body">
        ${ob.appId
          ? `<div class="ob-appid-row">
               <span class="ob-appid-label">App ID</span>
               <span class="ob-appid-val">${esc(ob.appId)}</span>
               <button class="btn-add-feat" onclick="addObFeatures('${ob.id}')">＋ Add Features</button>
               <button class="ob-del-btn" onclick="deleteOnboarding('${ob.id}')">Delete record</button>
             </div>`
          : `<div class="ob-appid-row">
               <span class="ob-appid-label">App ID</span>
               <span class="ob-appid-missing">⏳ Awaiting from TS team</span>
               <button class="appid-scan-btn" style="font-size:11px">🔍 Scan (preview)</button>
               <button class="btn-add-feat" onclick="addObFeatures('${ob.id}')">＋ Add Features</button>
               <button class="ob-del-btn" onclick="deleteOnboarding('${ob.id}')">Delete</button>
             </div>`}
        <table class="ob-feat-table">
          <thead><tr><th>Feature</th><th>Ticket</th><th>Status</th><th>Lead Time</th></tr></thead>
          <tbody>
            <tr>
              <td style="color:var(--muted2);font-size:12px">Onboard Ticket</td>
              <td><a class="ob-ticket-link" href="https://appier.atlassian.net/browse/${ob.onboardTicketKey}" target="_blank">${ob.onboardTicketKey}</a></td>
              <td id="obst-${ob.onboardTicketKey}"><span class="sb ${sClass(ob.onboardStatus||'')}" style="${ob.onboardStatus?'':'color:var(--muted);font-style:italic'}"><span class="sd"></span>${esc(ob.onboardStatus||'Loading…')}</span></td>
              <td>—</td>
            </tr>
            ${ob.features.map(f=>{
              const days = Math.floor((Date.now()-new Date(ob.createdAt))/86400000);
              return `<tr>
                <td style="font-size:12px">${esc(f.name)}${(f.manual||f.mode==='manual_clone')?'<span style="margin-left:6px;font-family:DM Mono,monospace;font-size:9px;padding:1px 5px;border-radius:3px;background:var(--yellow-soft);color:var(--yellow);border:1px solid rgba(251,191,36,.3)">MANUAL</span>':''}</td>
                <td><a class="ob-ticket-link" href="https://appier.atlassian.net/browse/${f.ticketKey}" target="_blank">${f.ticketKey}</a></td>
                <td><span class="sb ${sClass(f.status)}"><span class="sd"></span>${esc(f.status)}</span></td>
                <td><span class="lt ${ltC(days)}">${days}d</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
        <div style="padding:10px 14px;border-top:1px solid var(--border);display:flex;justify-content:flex-end">
          <button class="btn-add-feat" onclick="addObFeatures('${ob.id}')">＋ Add Features</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ════════════════════════════════════════════════════════════════════════════
