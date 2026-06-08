/* inject fe-v2 styles at runtime */
(function(){
  var s = document.createElement('style');
  s.textContent = [
    '.fe-feat-list{display:flex;flex-direction:column;gap:6px;max-height:340px;overflow-y:auto;padding-right:4px}',
    '.fe-feat-list-preview{max-height:220px}',
    '.fe-cat-header{font-size:.7rem;font-weight:700;letter-spacing:.08em;color:var(--muted);padding:10px 0 4px;border-bottom:1px solid var(--border);margin-bottom:2px}',
    '.fe-feat-row{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:8px;border:1px solid var(--border);cursor:pointer;transition:background .15s,border-color .15s;margin-bottom:2px}',
    '.fe-feat-row:hover{border-color:var(--accent);background:rgba(99,102,241,.06)}',
    '.fe-feat-row.fe-row-on{border-color:var(--accent);background:rgba(99,102,241,.12)}',
    '.fe-feat-cb{width:16px;height:16px;border-radius:4px;border:2px solid var(--muted);flex-shrink:0;transition:all .15s;position:relative}',
    '.fe-feat-cb.fe-cb-on{background:var(--accent);border-color:var(--accent)}',
    '.fe-feat-cb.fe-cb-on::after{content:\'\\2713\';position:absolute;top:0;left:2px;color:#fff;font-size:11px;line-height:15px}',
    '.fe-feat-name{flex:1;font-size:.88rem;font-weight:500}',
    '.fe-badge-clone{font-size:.7rem;padding:2px 8px;border-radius:4px;border:1px solid var(--border);color:var(--muted);flex-shrink:0}',
    '.fe-badge-manual{font-size:.7rem;padding:2px 8px;border-radius:4px;background:rgba(245,158,11,.15);color:#f59e0b;border:1px solid rgba(245,158,11,.3);flex-shrink:0}',
    '.fe-preview-feat-row{display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-radius:6px;border:1px solid var(--border);margin-bottom:4px}'
  ].join('');
  document.head.appendChild(s);
}());
/* Feature Enable Wizard v2 — CSM Dashboard */
(function () {
  'use strict';

  // Feature catalog matching the onboarding wizard
  var FE_CATALOG = {
    AIQUA: [
      { cat: 'Channels', items: [
        { id: 'sms',          name: 'Enable SMS',              mode: 'clone'  },
        { id: 'edm',          name: 'Enable EDM Channel',      mode: 'clone'  },
        { id: 'onsite',       name: 'On-site Experience',      mode: 'clone'  },
        { id: 'product_feed', name: 'Onboard Product Feed',    mode: 'manual' }
      ]},
      { cat: 'Audience', items: [
        { id: 'seg_split',    name: 'Segment Split',           mode: 'clone'  },
        { id: 'new_seg',      name: 'New Segment UI',          mode: 'clone'  }
      ]},
      { cat: 'Campaign', items: [
        { id: 'creative',     name: 'Creative Studio',         mode: 'clone'  },
        { id: 'inapp',        name: 'In-app Creative Studio',  mode: 'clone'  },
        { id: 'content_asst', name: 'Content Assistant',       mode: 'clone'  },
        { id: 'feed_trigger', name: 'Feed Trigger',            mode: 'manual' }
      ]},
      { cat: 'Segment Agent', items: [
        { id: 'sa_onboard',   name: 'Agent Onboard Ticket',    mode: 'clone'  },
        { id: 'sa_credit',    name: 'Credit System',           mode: 'clone'  },
        { id: 'sa_config',    name: 'Agent Config',            mode: 'manual' },
        { id: 'sa_agent',     name: 'Onboard Agent',           mode: 'clone'  }
      ]},
      { cat: 'OJM', items: [
        { id: 'ojm_enable',   name: 'Enable OJM',              mode: 'manual' },
        { id: 'ojm_feat',     name: 'OJM Feature Enablement',  mode: 'clone'  }
      ]}
    ],
    AIRIS: [
      { cat: 'Compulsory', items: [
        { id: 'airis_onboard',     name: 'Onboard AIRIS',                      mode: 'manual' }
      ]},
      { cat: 'Platform Link', items: [
        { id: 'airis_enterprise',  name: 'Onboard AR to Enterprise Console',   mode: 'clone'  }
      ]}
    ]
  };

  var feW = {};

  function esc(s) {
    return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  /* public API */
  window.openFeatureEnableWizard = function () {
    feW = { step: 0, platform: null, clientName: '', appId: '', sel: {} };
    document.getElementById('feOverlay').style.display = 'flex';
    feRender();
  };
  window.closeFeWizard   = function () { document.getElementById('feOverlay').style.display = 'none'; };
  window.fePickPlatform  = function (p) { feW.platform = p; fePlatformStep(); };
  window.feSetClientName = function (v) { feW.clientName = v; };
  window.feSetAppId      = function (v) { feW.appId = v; };
  window.feToggleFeat    = function (id) {
    feW.sel[id] = !feW.sel[id];
    var row = document.querySelector('.fe-feat-row[data-id="' + id + '"]');
    var cb  = document.querySelector('.fe-feat-cb[data-id="' + id + '"]');
    if (row) row.classList.toggle('fe-row-on', !!feW.sel[id]);
    if (cb)  cb.classList.toggle('fe-cb-on',  !!feW.sel[id]);
  };
  window.feNext = function () {
    if (feW.step === 1 && (!feW.clientName.trim() || !feW.appId.trim())) { alert('Please fill in Client Name and App ID.'); return; }
    if (feW.step === 2 && !Object.keys(feW.sel).some(function (k) { return feW.sel[k]; })) { alert('Select at least one feature.'); return; }
    if (feW.step < 3) { feW.step++; feRender(); }
  };
  window.feBack   = function () { if (feW.step > 0) { feW.step--; feRender(); } };
  window.feCreate = function () {
    var cats = FE_CATALOG[feW.platform] || [];
    var allItems = []; cats.forEach(function(g){ allItems = allItems.concat(g.items); });
    var selected = allItems.filter(function (f) { return feW.sel[f.id]; });
    if (!selected.length) { alert('No features selected.'); return; }
    var btn = document.getElementById('feCreateBtn');
    if (btn) { btn.disabled = true; btn.textContent = '⏳ Creating...'; }
    var created = [], failed = [];
    Promise.resolve()
      .then(function () { return window.getAccessToken(); })
      .then(function (tok) {
        return window.fetchAccessibleResources(tok).then(function (res) {
          return { tok: tok, cloudId: res[0].id };
        });
      })
      .then(function (auth) {
        var chain = Promise.resolve();
        selected.forEach(function (f) {
          chain = chain.then(function () {
            var summary = '[Feature Enable] ' + feW.clientName + ' \u00b7 ' + feW.platform + ' \u00b7 ' + f.name;
            var bodyTxt = 'Feature enable request for ' + feW.clientName + ' (App ID: ' + feW.appId + ').\n\nPlatform: ' + feW.platform + '\nFeature: ' + f.name + '\nMode: ' + f.mode + '\n\nRequested via CSM Dashboard Feature Enable wizard.';
            var body = { fields: { project: { key: 'LEG' }, summary: summary,
              description: { type: 'doc', version: 1, content: [{ type: 'paragraph', content: [{ type: 'text', text: bodyTxt }] }] },
              issuetype: { name: 'Task' } } };
            return fetch('https://api.atlassian.com/ex/jira/' + auth.cloudId + '/rest/api/3/issue', {
              method: 'POST',
              headers: { Authorization: 'Bearer ' + auth.tok, 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(body)
            }).then(function (r) { return r.json(); })
              .then(function (d) { if (d.key) { created.push(d.key); } else { failed.push(f.name); } })
              .catch(function () { failed.push(f.name); });
          });
        });
        return chain;
      })
      .then(function () { feShowResult(created, failed); })
      .catch(function (err) {
        document.getElementById('feBody').innerHTML = '<div style="text-align:center;padding:20px;color:var(--red)">⚠️ Auth error: ' + esc(err.message) + '</div>';
        document.getElementById('feFooter').innerHTML = '<button class="wiz-btn-pri" onclick="closeFeWizard()">Close</button>';
      });
  };

  /* render ─────────────────────────────── */
  function feRender() {
    var steps = [fePlatformStep, feDetailsStep, feFeaturesStep, fePreviewStep];
    var pct   = [12, 37, 63, 88];
    var titles = [feW.platform ? feW.platform + ' \u2014 Select Platform' : 'Select Platform',
                  feW.platform ? feW.platform + ' \u2014 Client Details'  : 'Client Details',
                  feW.platform ? feW.platform + ' \u2014 Select Features' : 'Select Features',
                  'Preview & Create'];
    var labels = ['Step 1 / 4', 'Step 2 / 4', 'Step 3 / 4', 'Step 4 / 4'];
    document.getElementById('feProgressBar').style.width = pct[feW.step] + '%';
    document.getElementById('feTitle').textContent = titles[feW.step];
    document.getElementById('feStepInd').textContent = labels[feW.step];
    steps[feW.step]();
  }

  function mkPlatCard(id, name, sub, emoji, disabled) {
    var sel = feW.platform === id ? ' fe-selected' : '';
    var dis = disabled ? ' fe-disabled' : '';
    var click = disabled ? '' : 'onclick="fePickPlatform(\'' + id + '\')"';
    return '<div class="fe-platform-card' + sel + dis + '" ' + click + '>' +
      '<div style="font-size:1.8rem;margin-bottom:8px">' + emoji + '</div>' +
      '<div style="font-weight:700">' + name + '</div>' +
      '<div style="font-size:.75rem;color:var(--muted);margin-top:4px">' + sub + '</div>' +
      (disabled ? '<div style="font-size:.7rem;color:#f59e0b;margin-top:6px;font-weight:600">Coming soon</div>' : '') +
      '</div>';
  }

  function fePlatformStep() {
    document.getElementById('feBody').innerHTML =
      '<p style="color:var(--muted);font-size:.87rem;margin-bottom:4px">Select the platform to enable features for.</p>' +
      '<div class="fe-platform-grid">' +
        mkPlatCard('AIQUA', 'AIQUA', 'Customer Engagement', '🎯', false) +
        mkPlatCard('AIRIS', 'AIRIS', 'Customer Data Platform', '🔮', false) +
        mkPlatCard('BB', 'BotBonnie', 'Conversational AI', '🤖', true) +
      '</div>';
    document.getElementById('feFooter').innerHTML =
      '<button class="wiz-btn-sec" onclick="closeFeWizard()">Cancel</button>' +
      '<button class="wiz-btn-pri" onclick="feNext()"' + (feW.platform ? '' : ' disabled') + '>Next →</button>';
  }

  function feDetailsStep() {
    document.getElementById('feBody').innerHTML =
      '<div class="wiz-field-group" style="margin-bottom:18px">' +
        '<label class="wiz-label">Client Name <span style="color:var(--red)">*</span></label>' +
        '<input class="wiz-input" id="feClientName" placeholder="e.g. Mannings HK" value="' + esc(feW.clientName) + '" oninput="window.feSetClientName(this.value)">' +
      '</div>' +
      '<div class="wiz-field-group">' +
        '<label class="wiz-label">App ID <span style="color:var(--red)">*</span></label>' +
        '<input class="wiz-input" id="feAppId" placeholder="e.g. 12345" value="' + esc(feW.appId) + '" oninput="window.feSetAppId(this.value)">' +
      '</div>';
    document.getElementById('feFooter').innerHTML =
      '<button class="wiz-btn-sec" onclick="feBack()">← Back</button>' +
      '<button class="wiz-btn-pri" onclick="feNext()">Next →</button>';
  }

  function feFeaturesStep() {
    var cats = FE_CATALOG[feW.platform] || [];
    var html = '';
    cats.forEach(function (g) {
      html += '<div class="fe-cat-header">' + g.cat.toUpperCase() + '</div>';
      g.items.forEach(function (f) {
        var on = feW.sel[f.id] ? ' fe-row-on' : '';
        var badge = f.mode === 'manual'
          ? '<span class="fe-badge-manual">⚠ manual</span>'
          : '<span class="fe-badge-clone">clone</span>';
        html += '<div class="fe-feat-row' + on + '" data-id="' + f.id + '" onclick="feToggleFeat(\'' + f.id + '\')">' +
          '<div class="fe-feat-cb' + (feW.sel[f.id] ? ' fe-cb-on' : '') + '" data-id="' + f.id + '"></div>' +
          '<span class="fe-feat-name">' + f.name + '</span>' +
          badge +
          '</div>';
      });
    });
    document.getElementById('feBody').innerHTML =
      '<p style="color:var(--muted);font-size:.82rem;margin-bottom:12px">Enabling for <strong>' +
      esc(feW.clientName) + '</strong> · App <strong>' + esc(feW.appId) + '</strong></p>' +
      '<div class="fe-feat-list">' + html + '</div>';
    document.getElementById('feFooter').innerHTML =
      '<button class="wiz-btn-sec" onclick="feBack()">← Back</button>' +
      '<button class="wiz-btn-pri" onclick="feNext()">Review & Create →</button>';
  }

  function fePreviewStep() {
    var cats = FE_CATALOG[feW.platform] || [];
    var allItems = []; cats.forEach(function(g){ allItems = allItems.concat(g.items); });
    var selected = allItems.filter(function (f) { return feW.sel[f.id]; });
    var rows = selected.map(function (f) {
      var badge = f.mode === 'manual'
        ? '<span class="fe-badge-manual">⚠ manual</span>'
        : '<span class="fe-badge-clone">clone</span>';
      return '<div class="fe-preview-feat-row"><span>' + f.name + '</span>' + badge + '</div>';
    }).join('');
    document.getElementById('feBody').innerHTML =
      '<div class="fe-preview-card">' +
        '<div class="fe-preview-row"><span class="fe-preview-label">Platform</span><span class="fe-preview-val">' + feW.platform + '</span></div>' +
        '<div class="fe-preview-row"><span class="fe-preview-label">Client</span><span class="fe-preview-val">' + esc(feW.clientName) + '</span></div>' +
        '<div class="fe-preview-row"><span class="fe-preview-label">App ID</span><span class="fe-preview-val">' + esc(feW.appId) + '</span></div>' +
      '</div>' +
      '<div style="margin-top:14px;font-size:.82rem;color:var(--muted);margin-bottom:8px;font-weight:600">' + selected.length + ' feature' + (selected.length !== 1 ? 's' : '') + ' selected:</div>' +
      '<div class="fe-feat-list fe-feat-list-preview">' + rows + '</div>' +
      '<p style="color:var(--muted);font-size:.78rem;margin-top:12px">One Jira ticket per feature. Track in the Issue Tracking tab.</p>';
    document.getElementById('feFooter').innerHTML =
      '<button class="wiz-btn-sec" onclick="feBack()">← Back</button>' +
      '<button class="wiz-btn-pri" id="feCreateBtn" onclick="feCreate()">🎫 Create ' + selected.length + ' Ticket' + (selected.length !== 1 ? 's' : '') + '</button>';
  }

  function feShowResult(created, failed) {
    document.getElementById('feBody').innerHTML =
      '<div style="text-align:center;padding:24px">' +
        '<div style="font-size:2.5rem;margin-bottom:12px">' + (created.length ? '✅' : '⚠️') + '</div>' +
        '<div style="font-weight:700;font-size:1.05rem;margin-bottom:8px">' +
          created.length + ' ticket' + (created.length !== 1 ? 's' : '') + ' created' +
          (failed.length ? ' · ' + failed.length + ' failed' : '') + '</div>' +
        '<div style="color:var(--accent);font-weight:600;margin-bottom:16px">' + created.join(' · ') + '</div>' +
        (failed.length ? '<div style="color:var(--red);font-size:.8rem;margin-bottom:12px">Failed: ' + failed.join(', ') + '</div>' : '') +
        '<div style="color:var(--muted);font-size:.82rem">Track progress for <strong>' + esc(feW.clientName) + '</strong> in the Issue Tracking tab.</div>' +
      '</div>';
    document.getElementById('feFooter').innerHTML =
      '<button class="wiz-btn-sec" onclick="closeFeWizard()">Close</button>' +
      '<button class="wiz-btn-pri" onclick="closeFeWizard();var t=document.getElementById(\'tab-tracking\');if(t)t.click()">📋 Go to Tracking</button>';
    if (window.loadTickets) { window.loadTickets(); }
  }
}());
