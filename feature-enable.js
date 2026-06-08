/* Runtime CSS injector */
(function(){
  var s = document.createElement('style');
  s.textContent = [
    '.fe-feat-list{display:flex;flex-direction:column;gap:0;max-height:380px;overflow-y:auto;padding-right:4px}',
    '.fe-feat-list-preview{max-height:220px}',
    '.fe-cat-header{font-size:.7rem;font-weight:700;letter-spacing:.08em;color:var(--muted);padding:10px 0 4px;border-bottom:1px solid var(--border);margin-bottom:4px;text-transform:uppercase}',
    '.fe-feat-item{border:1px solid var(--border);border-radius:8px;margin-bottom:4px;overflow:hidden;transition:border-color .15s}',
    '.fe-feat-item.fe-row-on{border-color:var(--accent)}',
    '.fe-feat-row{display:flex;align-items:center;gap:10px;padding:10px 14px;cursor:pointer;user-select:none;transition:background .15s}',
    '.fe-feat-row:hover{background:rgba(99,102,241,.06)}',
    '.fe-feat-item.fe-row-on .fe-feat-row{background:rgba(99,102,241,.1)}',
    '.fe-feat-cb{width:16px;height:16px;border-radius:4px;border:2px solid var(--muted);flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:10px;color:#fff;transition:all .15s}',
    '.fe-feat-cb.fe-cb-on{background:var(--accent);border-color:var(--accent)}',
    '.fe-feat-name{flex:1;font-size:.88rem;font-weight:500;color:var(--text)}',
    '.fe-badge-clone{font-size:.7rem;padding:2px 8px;border-radius:4px;border:1px solid var(--border);color:var(--muted);flex-shrink:0;font-family:"DM Mono",monospace}',
    '.fe-badge-manual{font-size:.7rem;padding:2px 8px;border-radius:4px;background:rgba(245,158,11,.15);color:#f59e0b;border:1px solid rgba(245,158,11,.3);flex-shrink:0;font-family:"DM Mono",monospace}',
    '.fe-feat-extra{display:none;flex-direction:column;gap:10px;padding:2px 14px 14px 42px}',
    '.fe-feat-item.fe-row-on .fe-feat-extra{display:flex}',
    '.fe-hint{font-size:.75rem;color:var(--muted);line-height:1.5;margin:0}',
    '.fe-hint a{color:var(--accent);text-decoration:none}',
    '.fe-hint a:hover{text-decoration:underline}',
    '.fe-preview-feat-row{display:flex;flex-direction:column;padding:10px 14px;border-radius:8px;border:1px solid var(--border);margin-bottom:5px;gap:4px}',
    '.fe-preview-feat-title{display:flex;align-items:center;gap:8px;font-size:.88rem;font-weight:600;color:var(--text)}',
    '.fe-preview-feat-extra{font-size:.76rem;color:var(--muted);display:flex;flex-direction:column;gap:3px;padding-top:6px;border-top:1px solid var(--border);margin-top:2px}'
  ].join('');
  document.head.appendChild(s);
}());

/* Feature Enable Wizard v4 — CSM Dashboard */
(function () {
  'use strict';

  var FE_CATALOG = {
    AIQUA: [
      { cat: 'Channels', items: [
        { id: 'sms',          name: 'Enable SMS',              mode: 'clone',  sample: 'QGWL-25618',
          extra: [
            { id: 'smsQuantity',    label: 'SMS Quantity',   placeholder: 'e.g. 100000', type: 'number' },
            { id: 'smsValidPeriod', label: 'Valid Period',   placeholder: 'e.g. 12 months' }
          ]
        },
        { id: 'edm',          name: 'Enable EDM Channel',      mode: 'clone',  sample: 'QGWL-25619',
          extra: [
            { id: 'email', label: 'Email / Domain', placeholder: 'e.g. noreply@client.com' }
          ]
        },
        { id: 'onsite',       name: 'On-site Experience',      mode: 'clone',  sample: 'QGWL-25620', extra: [] },
        { id: 'product_feed', name: 'Onboard Product Feed',    mode: 'manual', sample: 'QGWL-25675',
          extra: [
            { id: 'productFeedUrl', label: 'Product Feed URL', placeholder: 'https://example.com/feed.xml' }
          ]
        }
      ]},
      { cat: 'Audience', items: [
        { id: 'seg_split', name: 'Segment Split',  mode: 'clone', sample: 'QGWL-25620', extra: [] },
        { id: 'new_seg',   name: 'New Segment UI', mode: 'clone', sample: 'QGWL-25621', extra: [] }
      ]},
      { cat: 'Campaign', items: [
        { id: 'creative',     name: 'Creative Studio',        mode: 'clone',  sample: 'QGWL-25620', extra: [] },
        { id: 'inapp',        name: 'In-app Creative Studio', mode: 'clone',  sample: 'QGWL-25620', extra: [] },
        { id: 'content_asst', name: 'Content Assistant',      mode: 'clone',  sample: 'QGWL-25620', extra: [] },
        { id: 'feed_trigger', name: 'Feed Trigger',           mode: 'manual', sample: 'QGWL-25674', extra: [] }
      ]},
      { cat: 'Segment Agent', items: [
        { id: 'sa_onboard', name: 'Agent Onboard Ticket', mode: 'clone',  sample: 'PROJ-33300', board: 'PROJ', suggestedAssignee: 'Meh-Chi Yeh',
          extra: [
            { id: 'arName',         label: 'AIRIS Name',     placeholder: 'e.g. Mannings_AIRIS' },
            { id: 'arId',           label: 'AIRIS ID',       placeholder: 'e.g. ar-xxx' },
            { id: 'axId',           label: 'Aixon ID',       placeholder: 'e.g. ax-xxx' },
            { id: 'eam_project_id', label: 'EAM Project ID', placeholder: 'e.g. eam-xxx' }
          ]
        },
        { id: 'sa_credit', name: 'Credit System', mode: 'clone', sample: 'AEP-6694', board: 'AEP', suggestedAssignee: 'Mark Chu',
          extra: [
            { id: 'salesforceId',   label: 'Salesforce ID',    placeholder: 'e.g. sf-xxx' },
            { id: 'agentStartDate', label: 'Agent Start Date', placeholder: 'YYYY-MM-DD' },
            { id: 'agentEndDate',   label: 'Agent End Date',   placeholder: 'YYYY-MM-DD' },
            { id: 'agent',          label: 'Agent Name(s)',    placeholder: 'e.g. AgentA, AgentB' },
            { id: 'agentCredit',    label: 'Agent Credit',     placeholder: 'e.g. 1000', type: 'number' }
          ]
        },
        { id: 'sa_config', name: 'Agent Config',   mode: 'manual', sample: 'AGNT-814', board: 'AGNT', suggestedAssignee: 'Mark Chu',  extra: [] },
        { id: 'sa_agent',  name: 'Onboard Agent',  mode: 'clone',  sample: 'AGNT-815', board: 'AGNT', suggestedAssignee: 'Susan Huang',
          extra: [
            { id: 'domain', label: 'Client Domain', placeholder: 'e.g. client.com' }
          ]
        }
      ]},
      { cat: 'OJM', items: [
        { id: 'ojm_enable', name: 'Enable OJM',             mode: 'manual', sample: 'PHXX-6251', board: 'PHXX', suggestedAssignee: 'Shiv',
          extra: [
            { id: 'botId', label: 'Bot ID', placeholder: 'Provided by client' }
          ]
        },
        { id: 'ojm_feat',   name: 'OJM Feature Enablement', mode: 'clone',  sample: 'PHXX-6252', board: 'PHXX', extra: [] }
      ]}
    ],
    AIRIS: [
      { cat: 'Compulsory', items: [
        { id: 'airis_onboard', name: 'Onboard AIRIS', mode: 'manual', sample: 'AR-1000', extra: [] }
      ]},
      { cat: 'Platform Link', items: [
        { id: 'airis_enterprise', name: 'Onboard AR to Enterprise Console', mode: 'clone', sample: 'AR-1001', extra: [] }
      ]}
    ]
  };

  var feW = {};

  function esc(s) {
    return String(s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }

  function getAllItems(platform) {
    var result = [];
    (FE_CATALOG[platform] || []).forEach(function(c){ c.items.forEach(function(f){ result.push(f); }); });
    return result;
  }

  function getSelected(platform) {
    return getAllItems(platform).filter(function(f){ return feW.sel[f.id]; });
  }

  /* ── public API ─────────────────────────────────────── */
  window.openFeatureEnableWizard = function () {
    feW = { step: 0, platform: null, clientName: '', appId: '', sel: {}, extraFields: {} };
    document.getElementById('feOverlay').style.display = 'flex';
    feRender();
  };

  window.closeFeWizard = function () {
    document.getElementById('feOverlay').style.display = 'none';
  };

  window.fePickPlatform = function (p) {
    feW.platform = p;
    document.querySelectorAll('.fe-platform-card').forEach(function(c){
      c.classList.toggle('fe-selected', c.dataset.p === p);
    });
    var nxt = document.querySelector('#feFooter .wiz-btn-pri');
    if (nxt) nxt.removeAttribute('disabled');
  };

  window.feSetClientName = function (v) { feW.clientName = v; };
  window.feSetAppId      = function (v) { feW.appId      = v; };

  window.feToggleFeat = function (id) {
    feW.sel[id] = !feW.sel[id];
    var item = document.querySelector('.fe-feat-item[data-id="' + id + '"]');
    if (!item) return;
    item.classList.toggle('fe-row-on', !!feW.sel[id]);
    var cb = item.querySelector('.fe-feat-cb');
    if (cb) {
      cb.classList.toggle('fe-cb-on', !!feW.sel[id]);
      cb.textContent = feW.sel[id] ? '✓' : '';
    }
  };

  window.setFeatExtra = function (fid, eid, val) {
    if (!feW.extraFields[fid]) feW.extraFields[fid] = {};
    feW.extraFields[fid][eid] = val;
  };

  window.feNext = function () {
    if (feW.step === 1 && (!feW.clientName.trim() || !feW.appId.trim())) {
      alert('Please fill in Client Name and App ID.');
      return;
    }
    if (feW.step === 2 && !getSelected(feW.platform).length) {
      alert('Please select at least one feature.');
      return;
    }
    feW.step++;
    feRender();
  };

  window.feBack = function () {
    feW.step--;
    feRender();
  };

  window.feCreate = function () {
    var selected = getSelected(feW.platform);
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
        var tok = auth.tok, cloudId = auth.cloudId;
        var chain = Promise.resolve();
        selected.forEach(function (f) {
          chain = chain.then(function () {
            var extras = feW.extraFields[f.id] || {};
            var extraLines = (f.extra || []).map(function(ex){
              return ex.label + ': ' + (extras[ex.id] || '—');
            }).join('\n');
            var summary = '[Feature Enable] ' + feW.clientName + ' · ' + feW.platform + ' · ' + f.name;
            var body = {
              fields: {
                project: { key: 'LEG' },
                summary: summary,
                description: {
                  type: 'doc', version: 1,
                  content: [{ type: 'paragraph', content: [{ type: 'text',
                    text: 'Feature enable request.\n\nClient: ' + feW.clientName
                        + '\nApp ID: ' + feW.appId
                        + '\nPlatform: ' + feW.platform
                        + '\nFeature: ' + f.name
                        + (f.sample ? '\nSample ticket: ' + f.sample : '')
                        + (extraLines ? '\n\n' + extraLines : '')
                        + '\n\nRequested via CSM Dashboard.'
                  }] }]
                },
                issuetype: { name: 'Task' }
              }
            };
            return fetch('https://api.atlassian.com/ex/jira/' + cloudId + '/rest/api/3/issue', {
              method: 'POST',
              headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json', Accept: 'application/json' },
              body: JSON.stringify(body)
            })
            .then(function(r){ return r.json(); })
            .then(function(d){ if (d.key) { created.push(d.key); } else { failed.push(f.name); } })
            .catch(function(){ failed.push(f.name); });
          });
        });
        return chain;
      })
      .then(function(){ feShowResult(created, failed); })
      .catch(function(err){
        document.getElementById('feBody').innerHTML =
          '<div style="text-align:center;padding:20px;color:var(--red)">⚠️ Auth error: ' + esc(err.message) + '</div>';
        document.getElementById('feFooter').innerHTML =
          '<button class="wiz-btn-pri" onclick="closeFeWizard()">Close</button>';
      });
  };

  /* ── private helpers ─────────────────────────────────── */
  function feRender() {
    var pcts   = [12, 37, 63, 88];
    var titles = ['Select Platform', 'Client Details',
                  feW.platform ? feW.platform + ' — Select Features' : 'Select Features',
                  'Preview & Create'];
    var labels = ['Step 1 / 4', 'Step 2 / 4', 'Step 3 / 4', 'Step 4 / 4'];
    document.getElementById('feProgressBar').style.width = pcts[feW.step] + '%';
    document.getElementById('feTitle').textContent       = titles[feW.step];
    document.getElementById('feStepInd').textContent     = labels[feW.step];
    [fePlatformStep, feDetailsStep, feFeaturesStep, fePreviewStep][feW.step]();
  }

  function fePlatformStep() {
    var platforms = [
      ['AIQUA', 'Customer Engagement',   '🎯', false],
      ['AIRIS', 'Customer Data Platform', '🔮', false],
      ['BB',    'BotBonnie',              '🤖',