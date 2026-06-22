'use strict';

// CSM BRIEF \u00e2\u0080\u0094 DATA, STATE & FUNCTIONS
// \u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090

let ACCOUNTS = [
  {
    id:'mannings', name:'Mannings', health:'red',
    insight:'AIXP-1840 open 11 days \u00e2\u0080\u0094 no update from Jin Chen. Bi-weekly May 28.',
    diffs:[{type:'warn',text:'AIXP-1840 no update in 11 days'}],
    riskTags:['mtg','ticket'], ticketCount:1, mtgCount:3,
    projects:[
      {name:'Q3 Renewal Contract',status:'progress'},
      {name:'AIXON \u00e2\u0086\u0092 AIRIS Upgrade (Q4)',status:'progress'},
    ],
    meetings:[
      {date:'May 28',title:'Bi-weekly Meeting',meta:'11:00\u00e2\u0080\u009312:00 HKT \u00c2\u00b7 Teams \u00c2\u00b7 Rola Chung'},
      {date:'Jun 1',title:'Mannings Quotation',meta:'11:15\u00e2\u0080\u009312:00 HKT'},
      {date:'Jun 4',title:'Monthly Meeting',meta:'11:00\u00e2\u0080\u009312:00 HKT \u00c2\u00b7 Teams \u00c2\u00b7 Rola Chung'},
    ],
    tickets:[
      {key:'AIXP-1840',title:'IPA_Mannings_Meta \u00e6\u00b2\u0092\u00e6\u009c\u0089\u00e7\u0094\u00a2\u00e5\u0087\u00ba AI suggestions',status:'in-progress',assignee:'Jin Chen',pinned:true},
    ],
    suggestions:[
      {priority:'high',label:'Ticket \u00c2\u00b7 High',text:'Chase Jin Chen on AIXP-1840 before May 28 \u00e2\u0080\u0094 11 days open with no update.'},
      {priority:'high',label:'Renewal \u00c2\u00b7 High',text:'Prep Q3 renewal quotation now \u00e2\u0080\u0094 Jun 1 meeting is 14 days away.'},
      {priority:'medium',label:'Timeline \u00c2\u00b7 Medium',text:'Confirm AIRIS upgrade ETA before Jun 4 monthly \u00e2\u0080\u0094 currently no timeline set.'},
    ],
  },
  {
    id:'scmp', name:'SCMP', health:'yellow',
    insight:'PROJ-33328 in backlog since May 15. June renewal has no calendar event yet.',
    diffs:[], riskTags:['renewal','ticket'], ticketCount:1, mtgCount:2,
    projects:[
      {name:'Segments Enablement',status:'progress'},
      {name:'Renewal (June 2026)',status:'blocked'},
    ],
    meetings:[
      {date:'May 19',title:'Segment / Experiment / Insight Interview',meta:'10:30\u00e2\u0080\u009311:00 HKT \u00c2\u00b7 Recurring weekly'},
      {date:'May 26',title:'Segment / Experiment / Insight Interview',meta:'10:30\u00e2\u0080\u009311:00 HKT'},
    ],
    tickets:[
      {key:'PROJ-33328',title:'Enable segment quota increase to 50',status:'backlog',assignee:'Michael Palmer',pinned:false},
    ],
    suggestions:[
      {priority:'high',label:'Renewal \u00c2\u00b7 High',text:'June renewal has no meeting booked yet \u00e2\u0080\u0094 schedule it this week.'},
      {priority:'medium',label:'Ticket \u00c2\u00b7 Medium',text:'PROJ-33328 sitting in backlog since May 15. Follow up with Michael Palmer.'},
    ],
  },
  {
    id:'1010hope', name:'10/10Hope', health:'yellow',
    insight:'klickngo API integration in progress. EC & POS integration has no ticket yet.',
    diffs:[], riskTags:['ticket'], ticketCount:1, mtgCount:2,
    projects:[
      {name:'AIQUA Usage Tracking',status:'progress'},
      {name:'EC & POS Integration',status:'progress'},
    ],
    meetings:[
      {date:'May 18',title:'10/10 \u00e6\u0095\u00b4\u00e5\u0090\u0088',meta:'14:30\u00e2\u0080\u009315:00 HKT \u00c2\u00b7 Recurring'},
      {date:'May 25',title:'10/10 \u00e6\u0095\u00b4\u00e5\u0090\u0088',meta:'14:30\u00e2\u0080\u009315:00 HKT'},
    ],
    tickets:[
      {key:'QGWL-25317',title:'klickngo API Integration for 10/10 Hope',status:'in-progress',assignee:'Mark Liu',pinned:false},
    ],
    suggestions:[
      {priority:'medium',label:'Ticket \u00c2\u00b7 Medium',text:'Get Mark Liu update on QGWL-25317 klickngo API integration status.'},
      {priority:'medium',label:'Action \u00c2\u00b7 Medium',text:'EC & POS integration has no formal ticket \u00e2\u0080\u0094 consider raising one to track it.'},
    ],
  },
  {
    id:'luxgen', name:'Luxgen', health:'yellow',
    insight:'Renewal decision meetings were May 19. Log the outcome and update status.',
    diffs:[{type:'new',text:'\u00e7\u00a2\u00ba\u00e8\u00aa\u008d\u00e6\u0098\u00af\u00e5\u0090\u00a6\u00e5\u00bb\u00b6 Luxgen \u00e5\u0090\u0088\u00e7\u00b4\u0084 \u00e2\u0080\u0094 outcome pending log'}],
    riskTags:['renewal'], ticketCount:0, mtgCount:1,
    projects:[{name:'Contract Renewal Decision',status:'progress'}],
    meetings:[{date:'May 26',title:'Luxgen checking',meta:'10:00\u00e2\u0080\u009310:30 HKT \u00c2\u00b7 Recurring'}],
    tickets:[],
    suggestions:[
      {priority:'high',label:'Renewal \u00c2\u00b7 High',text:'Log the May 19 renewal outcome \u00e2\u0080\u0094 renew, churn, or pending? Update account status.'},
    ],
  },
  {
    id:'55688', name:'55688', health:'yellow',
    insight:'Tracking Service Agent purchase intent. Weekly check-in ongoing.',
    diffs:[], riskTags:['ticket'], ticketCount:0, mtgCount:2,
    projects:[{name:'Service Agent Purchase Decision',status:'progress'}],
    meetings:[
      {date:'May 19',title:'55688 SA Tracking',meta:'09:15\u00e2\u0080\u009309:45 HKT \u00c2\u00b7 Recurring'},
      {date:'May 26',title:'55688 SA Tracking',meta:'09:15\u00e2\u0080\u009309:45 HKT'},
    ],
    tickets:[],
    suggestions:[
      {priority:'medium',label:'Action \u00c2\u00b7 Medium',text:'Bring Service Agent pricing summary to May 19 meeting. Push for a clear decision timeline.'},
    ],
  },
  {
    id:'tiyuanxiang', name:'\u00e7\u0094\u00b0\u00e5\u008e\u009f\u00e9\u00a6\u0099', health:'green',
    insight:'Use case tracking session weekly. No blockers detected.',
    diffs:[], riskTags:['ok'], ticketCount:0, mtgCount:2,
    projects:[
      {name:'Automation Journey Development',status:'progress'},
      {name:'Agent Usage & Feedback',status:'ok'},
    ],
    meetings:[
      {date:'May 20',title:'\u00e7\u0094\u00b0\u00e5\u008e\u009f\u00e9\u00a6\u0099 use case tracking',meta:'09:30\u00e2\u0080\u009310:00 HKT \u00c2\u00b7 Recurring'},
      {date:'May 27',title:'\u00e7\u0094\u00b0\u00e5\u008e\u009f\u00e9\u00a6\u0099 use case tracking',meta:'09:30\u00e2\u0080\u009310:00 HKT'},
    ],
    tickets:[],
    suggestions:[
      {priority:'low',label:'Action \u00c2\u00b7 Low',text:'Collect agent usage feedback at May 20 session and log for OKR.'},
    ],
  },
];

const BRIEF_CAT_META = {
  onboard:  {emoji:'\u00f0\u009f\u009a\u0080', label:'Onboard',           cls:'onboard'},
  renewal:  {emoji:'\u00f0\u009f\u0094\u0084', label:'Renewal',            cls:'renewal'},
  ticket:   {emoji:'\u00f0\u009f\u008e\u00ab', label:'Ticket Resolved',    cls:'ticket'},
  feature:  {emoji:'\u00e2\u009a\u00a1', label:'Feature Enabled',    cls:'feature'},
  pitching: {emoji:'\u00f0\u009f\u008e\u00af', label:'Pitching',           cls:'pitching'},
  ai:       {emoji:'\u00f0\u009f\u00a4\u0096', label:'AI Adoption',        cls:'ai'},
  team:     {emoji:'\u00f0\u009f\u00a4\u009d', label:'Team Contribution',  cls:'team'},
  other:    {emoji:'\u00f0\u009f\u0093\u008c', label:'Other',              cls:'other'},
};

const OKR_SECTIONS = [
  {key:'onboard',  title:'1. Onboarded new accounts'},
  {key:'renewal',  title:'2. Renewed successfully'},
  {key:'pitching', title:'3. Others \u00e2\u0080\u0094 Pitching & team contribution'},
  {key:'feature',  title:'4. Pilot / New feature enablement'},
  {key:'ai',       title:'5. AI adoption'},
  {key:'team',     title:'6. Functional knowledge & teamwork'},
  {key:'ticket',   title:'7. Issues resolved'},
  {key:'other',    title:'8. Other contributions'},
];

const RISK_LABELS = {mtg:'\u00f0\u009f\u0093\u0085 Meeting Due', ticket:'\u00f0\u009f\u0090\u009b Ticket Blocked', renewal:'\u00e2\u009a\u00a0\u00ef\u00b8\u008f Renewal Risk', silent:'\u00f0\u009f\u0091\u00bb Client Silent', ok:'\u00e2\u009c\u0085 On Track'};

const PRELOADED_LOG = [
  {id:1,  date:'2026-Q1', quarter:'Q1 2026', category:'onboard',  client:'10/10Hope', description:'AIQUA onboarded (Prizm HK)'},
  {id:2,  date:'2026-Q1', quarter:'Q1 2026', category:'renewal',  client:'Mannings',  description:'Renewed AQ & AX to 2026-06-30'},
  {id:3,  date:'2026-Q1', quarter:'Q1 2026', category:'renewal',  client:'\u00e7\u0094\u00b0\u00e5\u008e\u009f\u00e9\u00a6\u0099',     description:'Renewed to 2027-02-16'},
  {id:4,  date:'2026-Q1', quarter:'Q1 2026', category:'pitching', client:'Internal',  description:'Genki \u00e2\u0080\u0094 AA opportunity pitched'},
  {id:5,  date:'2026-Q1', quarter:'Q1 2026', category:'pitching', client:'Mannings',  description:'AA & AR opportunities pitched'},
  {id:6,  date:'2026-Q1', quarter:'Q1 2026', category:'pitching', client:'Internal',  description:'Partner team pitching \u00e2\u0080\u0094 Prizm (City Super)'},
  {id:7,  date:'2026-Q1', quarter:'Q1 2026', category:'pitching', client:'Internal',  description:'Partner team pitching \u00e2\u0080\u0094 Ledgerbio (Chinachem)'},
  {id:8,  date:'2026-Q1', quarter:'Q1 2026', category:'team',     client:'SCMP',      description:'Assisted in finding SCMP for panel speaker'},
  {id:9,  date:'2026-Q1', quarter:'Q1 2026', category:'feature',  client:'\u00e7\u0094\u00b0\u00e5\u008e\u009f\u00e9\u00a6\u0099',     description:'Campaign agent enabled'},
  {id:10, date:'2026-Q1', quarter:'Q1 2026', category:'feature',  client:'Mannings',  description:'AB test with new recommendations filtering rules'},
  {id:11, date:'2026-Q1', quarter:'Q1 2026', category:'ai',       client:'Internal',  description:'Gemini + NotebookLM as first answer-seeking before team'},
  {id:12, date:'2026-Q1', quarter:'Q1 2026', category:'ai',       client:'Internal',  description:'AI video scene generation for AA demo'},
  {id:13, date:'2026-Q1', quarter:'Q1 2026', category:'ai',       client:'Internal',  description:'NotebookLM + Gemini + Canva/Felo.ai for slides'},
  {id:14, date:'2026-Q1', quarter:'Q1 2026', category:'ai',       client:'Mannings',  description:'Gemini for bi-weekly report preparation'},
  {id:15, date:'2026-Q1', quarter:'Q1 2026', category:'team',     client:'Internal',  description:'LON insights shared to Darren, Brian, Eric'},
  {id:16, date:'2026-Q1', quarter:'Q1 2026', category:'team',     client:'Internal',  description:'UX interview with Medet'},
  {id:17, date:'2026-Q1', quarter:'Q1 2026', category:'team',     client:'Internal',  description:'AQ recommendation sharing with Zebbie'},
];

// \u00e2\u0094\u0080\u00e2\u0094\u0080 BRIEF STATE \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
let logEntries = [];
let briefNextId = 100;
const BRIEF_LOG_KEY = 'csm_session_log';

function loadLog(){
  try{ return JSON.parse(localStorage.getItem(BRIEF_LOG_KEY)||'null')||[...PRELOADED_LOG]; }
  catch(_){ return [...PRELOADED_LOG]; }
}
function saveLog(){ localStorage.setItem(BRIEF_LOG_KEY, JSON.stringify(logEntries)); }

// \u00e2\u0094\u0080\u00e2\u0094\u0080 BRIEF INIT (called once on page load) \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080

// \u00e2\u0094\u0080\u00e2\u0094\u0080 GITHUB BRIEF AUTO-SYNC \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
// csm-brief.json lives in the repo root \u00e2\u0086\u0092 served by GitHub Pages at same origin.
// Claude pushes a new version via GitHub API after every brief generation.
// Dashboard fetches it on every load \u00e2\u0080\u0094 zero manual steps.

function _setSyncUI(state, text) {
  const dot = document.getElementById('syncDot');
  const lbl = document.getElementById('syncLabel');
  if (dot) { dot.className = 'sync-dot' + (state ? ' ' + state : ''); }
  if (lbl) { lbl.textContent = text; }
}

async function loadBriefFromGitHub() {
  _setSyncUI('spin', 'Loading brief from GitHub\u00e2\u0080\u00a6');
  try {
    // Cache-bust so we always get the latest commit, not a CDN-cached copy
    const res = await fetch('./csm-brief.json?_=' + Date.now());
    if (!res.ok) throw new Error(res.status === 404 ? 'No brief pushed yet \u00e2\u0080\u0094 ask Claude to generate your brief.' : 'HTTP ' + res.status);
    const data = await res.json();
    if (!Array.isArray(data.accounts) || data.accounts.length === 0) throw new Error('Brief is empty \u00e2\u0080\u0094 ask Claude to generate your brief.');
    ACCOUNTS = data.accounts;
    renderBriefCards();
    renderBriefStats();
    briefUpdateTabCounts();
    const ts = data.generatedAt
      ? new Date(data.generatedAt).toLocaleString('en-HK', { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit', hour12:false, timeZone:'Asia/Hong_Kong' })
      : '?';
    _setSyncUI('ok', 'Brief synced \u00c2\u00b7 ' + ts + ' HKT \u00c2\u00b7 auto-updated by Claude each morning');
  } catch (e) {
    _setSyncUI('err', e.message || 'Could not load brief');
  }
}

function initBrief(){
  loadBriefFromGitHub();
  logEntries = loadLog();
  briefNextId = Math.max(briefNextId, ...logEntries.map(e=>e.id||0)) + 1;
  renderBriefCards();
  renderOKR();
  renderLog();
  renderBriefStats();
  briefUpdateTabCounts();

  // Wire mDesc textarea to enable/disable save button
  const mDesc = document.getElementById('mDesc');
  if(mDesc){
    mDesc.addEventListener('input', function(){
      const btn = document.getElementById('mSaveBtn');
      if(btn) btn.disabled = !this.value.trim();
    });
  }
  // Close add-log modal on overlay click
  const addModal = document.getElementById('addModal');
  if(addModal){
    addModal.addEventListener('click', function(e){
      if(e.target===this) closeModal();
    });
  }
  // Seed mDate with today (YYYY-MM-DD)
  const mDate = document.getElementById('mDate');
  if(mDate && !mDate.value){
    mDate.value = new Date().toISOString().split('T')[0];
  }
}

// \u00e2\u0094\u0080\u00e2\u0094\u0080 BRIEF SUB-TAB SWITCH \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
function briefSwitchTab(name){
  ['brief','okr'].forEach(t=>{
    const btn  = document.getElementById('btab-'+t);
    const pane = document.getElementById('bpane-'+t);
    if(btn)  btn.classList.toggle('active',  t===name);
    if(pane) pane.classList.toggle('active', t===name);
  });
}

// \u00e2\u0094\u0080\u00e2\u0094\u0080 BRIEF STATS \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
function renderBriefStats(){
  const crit = ACCOUNTS.filter(a=>a.health==='red').length;
  const risk = ACCOUNTS.filter(a=>a.health==='yellow').length;
  const ok   = ACCOUNTS.filter(a=>a.health==='green').length;
  const mtgs = ACCOUNTS.reduce((s,a)=>s+a.mtgCount,0);
  const setCt = (id,v)=>{ const el=document.getElementById(id); if(el) el.textContent=v; };
  setCt('bs-crit', crit); setCt('bs-risk', risk); setCt('bs-ok', ok); setCt('bs-mtg', mtgs);
  // Update main tab count
  const tc = document.getElementById('tc-brief');
  if(tc) tc.textContent = ACCOUNTS.length;
}

function briefUpdateTabCounts(){
  const set = (id,v)=>{ const el=document.getElementById(id); if(el) el.textContent=v; };
  set('btc-brief', ACCOUNTS.length);
  set('btc-okr',   logEntries.length);
  set('tc-brief',  ACCOUNTS.length);
}

// \u00e2\u0094\u0080\u00e2\u0094\u0080 ACCOUNT BRIEF RENDER \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
function renderBriefCards(){
  const grid = document.getElementById('accountGrid');
  if(!grid) return;
  const sorted = [...ACCOUNTS].sort((a,b)=>{
    const order={red:0,yellow:1,green:2,gray:3};
    return (order[a.health]??3)-(order[b.health]??3);
  });
  grid.innerHTML = sorted.map(acct=>{
    const hBadge={red:'\u00f0\u009f\u0094\u00b4 Critical',yellow:'\u00f0\u009f\u009f\u00a1 At Risk',green:'\u00f0\u009f\u009f\u00a2 On Track',gray:'\u00e2\u009a\u00aa Unclear'}[acct.health]||'\u00e2\u009a\u00aa';
    const diffHTML = acct.diffs.map(d=>`<div class="diff-line diff-${esc(d.type)}">${d.type==='new'?'\u00e2\u0086\u0097':d.type==='close'?'\u00e2\u0086\u0098':'\u00e2\u009a\u00a0'} ${esc(d.text)}</div>`).join('');
    const riskHTML = acct.riskTags.map(t=>`<span class="risk-tag ${esc(t)}">${RISK_LABELS[t]||t}</span>`).join('');
    return `
    <div class="acct-card health-${esc(acct.health)}" onclick="openBriefPanel('${esc(acct.id)}')">
      <div class="acct-header">
        <div>
          <div class="acct-name">${esc(acct.name)}</div>
          <div class="acct-meta">
            <span>\u00f0\u009f\u008e\u00ab ${acct.ticketCount} ticket${acct.ticketCount!==1?'s':''}</span>
            <span>\u00f0\u009f\u0093\u0085 ${acct.mtgCount} meeting${acct.mtgCount!==1?'s':''}</span>
          </div>
        </div>
        <div class="health-badge ${esc(acct.health)}">${hBadge}</div>
      </div>
      <div class="acct-insight">
        ${esc(acct.insight)}
        ${diffHTML}
      </div>
      <div class="acct-footer">
        <div class="risk-tags">${riskHTML}</div>
        <div style="font-family:\'DM Mono\',monospace;font-size:10px;color:var(--muted)">\u00e2\u0086\u0092 Full brief</div>
      </div>
    </div>`;
  }).join('');
}

// \u00e2\u0094\u0080\u00e2\u0094\u0080 BRIEF SIDE PANEL \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
function openBriefPanel(id){
  const acct = ACCOUNTS.find(a=>a.id===id);
  if(!acct) return;
  const titleEl = document.getElementById('briefPanelTitle');
  const subEl   = document.getElementById('briefPanelSub');
  const bodyEl  = document.getElementById('briefPanelBody');
  if(titleEl) titleEl.textContent = acct.name;
  const hLabel = {red:'\u00f0\u009f\u0094\u00b4 Critical',yellow:'\u00f0\u009f\u009f\u00a1 At Risk',green:'\u00f0\u009f\u009f\u00a2 On Track',gray:'\u00e2\u009a\u00aa Unclear'}[acct.health]||'';
  if(subEl) subEl.textContent = hLabel + ' \u00c2\u00b7 Updated today';

  const mtgHTML = acct.meetings.length
    ? acct.meetings.map(m=>`
        <div class="mtg-row">
          <div class="mtg-date">${esc(m.date)}</div>
          <div class="mtg-info">
            <div class="title">${esc(m.title)}</div>
            <div class="meta">${esc(m.meta)}</div>
          </div>
        </div>`).join('')
    : '<div class="brief-empty-state">No meetings in next 14 days</div>';

  const tickHTML = acct.tickets.length
    ? acct.tickets.map(t=>`
        <div class="brief-ticket-row">
          <div class="brief-ticket-key">${esc(t.key)}</div>
          <div class="brief-ticket-info">
            <div class="title">${esc(t.title)} ${t.pinned?'<span class="brief-pinned-badge">pinned</span>':''}</div>
            <div class="meta">
              <span class="status-dot ${esc(t.status)}">${esc(t.status.replace('-',' '))}</span>
              <span>${esc(t.assignee)}</span>
            </div>
          </div>
        </div>`).join('')
    : '<div class="brief-empty-state">No active tickets</div>';

  const projHTML = acct.projects.length
    ? acct.projects.map(p=>`
        <div class="project-row">
          <div class="proj-name">${esc(p.name)}</div>
          <div class="proj-status ${esc(p.status)}">${{progress:'\u00f0\u009f\u009f\u00a1 In Progress',ok:'\u00f0\u009f\u009f\u00a2 On Track',blocked:'\u00f0\u009f\u0094\u00b4 Blocked'}[p.status]||p.status}</div>
        </div>`).join('')
    : '';

  const sugHTML = acct.suggestions.map((s,i)=>`
    <div class="suggestion-row ${esc(s.priority)}">
      <div class="sug-label"><span>${i+1}</span><span>${esc(s.label)}</span></div>
      <div class="sug-text">${esc(s.text)}</div>
    </div>`).join('');

  if(bodyEl) bodyEl.innerHTML = `
    <div class="p-section">
      <div class="p-section-title">\u00f0\u009f\u0093\u0085 Upcoming Meetings</div>
      ${mtgHTML}
    </div>
    <div class="p-section">
      <div class="p-section-title">\u00f0\u009f\u008e\u00ab Active Tickets</div>
      ${tickHTML}
    </div>
    ${acct.projects.length?`
    <div class="p-section">
      <div class="p-section-title">\u00f0\u009f\u0097\u0082 Projects</div>
      ${projHTML}
    </div>`:''}
    <div class="p-section">
      <div class="p-section-title">\u00f0\u009f\u0092\u00a1 Suggestions</div>
      ${sugHTML}
      <div style="font-family:\'DM Mono\',monospace;font-size:10px;color:var(--muted);margin-top:10px">
        Reply in Claude: "Done: [#]" or "Didn't work: [#]" to log outcome
      </div>
    </div>
  `;

  const ov = document.getElementById('briefPanelOverlay');
  const sp = document.getElementById('briefSidePanel');
  if(ov) ov.classList.add('open');
  if(sp) sp.classList.add('open');
}

function closeBriefPanel(){
  const ov = document.getElementById('briefPanelOverlay');
  const sp = document.getElementById('briefSidePanel');
  if(ov) ov.classList.remove('open');
  if(sp) sp.classList.remove('open');
}

// \u00e2\u0094\u0080\u00e2\u0094\u0080 OKR TAB \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
function renderOKR(){
  const qSel = document.getElementById('okrQSel');
  if(!qSel) return;
  const q = qSel.value;
  const filtered = logEntries.filter(e=>e.quarter===q);
  const container = document.getElementById('okrSections');
  if(!container) return;
  container.innerHTML = OKR_SECTIONS.map(sec=>{
    const items = filtered.filter(e=>e.category===sec.key);
    const id = 'okr-'+sec.key;
    return `
    <div class="okr-section">
      <div class="okr-section-head" onclick="toggleOKRSection('${id}')">
        <div class="title">${BRIEF_CAT_META[sec.key]?.emoji||'\u00e2\u0080\u00a2'} ${esc(sec.title)}</div>
        <div class="count">${items.length} item${items.length!==1?'s':''}</div>
      </div>
      <div class="okr-body" id="${id}">
        ${items.length
          ? items.map(e=>`
            <div class="okr-item">
              <span class="client-tag">${esc(e.client)}</span>
              <span>${esc(e.description)}</span>
            </div>`).join('')
          : '<div style="font-family:\'DM Mono\',monospace;font-size:11px;color:var(--muted)">None this quarter</div>'}
      </div>
    </div>`;
  }).join('');
  briefUpdateTabCounts();
}

function toggleOKRSection(id){
  const el = document.getElementById(id);
  if(el) el.classList.toggle('open');
}

function copyOKR(){
  const qSel = document.getElementById('okrQSel');
  if(!qSel) return;
  const q = qSel.value;
  const filtered = logEntries.filter(e=>e.quarter===q);
  let txt = `\u00f0\u009f\u0093\u008a OKR SUMMARY \u00e2\u0080\u0094 CSM Brief (${q})\n\n`;
  OKR_SECTIONS.forEach(sec=>{
    const items = filtered.filter(e=>e.category===sec.key);
    txt += sec.title+'\n';
    txt += items.length
      ? items.map(e=>`  \u00e2\u0080\u00a2 [${e.client}] ${e.description}`).join('\n')+'\n'
      : '  \u00e2\u0080\u00a2 None this quarter\n';
    txt += '\n';
  });
  navigator.clipboard.writeText(txt).then(()=>{
    const btn = document.getElementById('okrCopyBtn');
    if(btn){ btn.textContent='\u00e2\u009c\u0093 Copied!'; setTimeout(()=>btn.textContent='Copy Summary', 2000); }
  });
}

// \u00e2\u0094\u0080\u00e2\u0094\u0080 SESSION LOG TAB \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
function renderLog(){
  const qF   = document.getElementById('logQFilter');
  const catF  = document.getElementById('logCatFilter');
  const cliF  = document.getElementById('logClientFilter');
  if(!qF||!catF||!cliF) return;
  const q      = qF.value;
  const cat    = catF.value;
  const client = cliF.value;
  const filtered = logEntries.filter(e=>{
    if(q!=='all' && e.quarter!==q) return false;
    if(cat!=='all' && e.category!==cat) return false;
    if(client!=='all' && e.client!==client) return false;
    return true;
  });
  const list = document.getElementById('logList');
  if(!list) return;
  if(!filtered.length){
    list.innerHTML='<div class="brief-empty-state">No entries match your filters</div>';
    briefUpdateTabCounts(); return;
  }
  list.innerHTML = filtered.map(e=>`
    <div class="log-entry">
      <span class="log-emoji">${BRIEF_CAT_META[e.category]?.emoji||'\u00f0\u009f\u0093\u008c'}</span>
      <div class="log-body">
        <div class="log-tags">
          <span class="log-cat ${esc(e.category)}">${esc(BRIEF_CAT_META[e.category]?.label||e.category)}</span>
          <span class="log-client">${esc(e.client)}</span>
          <span class="log-date">${esc(e.date)}</span>
        </div>
        <div class="log-desc">${esc(e.description)}</div>
        <div class="log-qtr">${esc(e.quarter)}</div>
      </div>
      <button class="log-del" onclick="deleteLogEntry(${e.id})" title="Remove">\u00e2\u009c\u0095</button>
    </div>`).join('');
  briefUpdateTabCounts();
}

function deleteLogEntry(id){
  logEntries = logEntries.filter(e=>e.id!==id);
  saveLog();
  renderLog();
  renderOKR();
  briefUpdateTabCounts();
}

// \u00e2\u0094\u0080\u00e2\u0094\u0080 ADD LOG MODAL \u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080\u00e2\u0094\u0080
function openAddModal(){
  const today = new Date().toISOString().split('T')[0];
  const mDate = document.getElementById('mDate');
  const mDesc = document.getElementById('mDesc');
  const mSaveBtn = document.getElementById('mSaveBtn');
  if(mDate) mDate.value = today;
  if(mDesc) mDesc.value = '';
  if(mSaveBtn) mSaveBtn.disabled = true;
  const modal = document.getElementById('addModal');
  if(modal) modal.classList.add('open');
}

function closeModal(){
  const modal = document.getElementById('addModal');
  if(modal) modal.classList.remove('open');
}

function saveEntry(){
  const mDesc = document.getElementById('mDesc');
  const desc = mDesc ? mDesc.value.trim() : '';
  if(!desc) return;
  const entry = {
    id: briefNextId++,
    date:        document.getElementById('mDate')?.value    || new Date().toISOString().split('T')[0],
    quarter:     document.getElementById('mQuarter')?.value || 'Q2 2026',
    category:    document.getElementById('mCat')?.value     || 'other',
    client:      document.getElementById('mClient')?.value  || 'Other',
    description: desc,
  };
  logEntries.push(entry);
  saveLog();
  closeModal();
  renderLog();
  renderOKR();
  briefUpdateTabCounts();
}

// \u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090
// END CSM BRIEF
// \u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090\u00e2\u0095\u0090
