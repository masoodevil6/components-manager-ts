class ComponentWorkflow {
  constructor(containerId, options) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.options = options || {};
    this.icons = this.options.icons || {};
    this.onSave = this.options.onSave || function(){};
    this.onCancel = this.options.onCancel || function(){};
    this.onBack = this.options.onBack || function(){};
    var self = this;
    this.confirm = this.options.confirm || function(m, fn){
      componentWindow.confirm(m, fn, null, { title: 'Confirm' });
    };
    this.esc = this.options.esc || function(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); };
    this.data = [];
    this.editing = null;
    this.npt = null;
    this.sn = null;
    this.cf = null;
    this.cp = null;
    this.te = null;
    this._colorPicker = null;
    this.se = null;
    this.sb = null;
    this.db = null;
    this.aet = null;
    this.els = {};
    this._globalListeners = [];
  }

  setData(d){ this.data = d || []; }
  getData(){ return this.data; }

  openBuilder(idx, name) {
    this.editing = idx;
    this.sn = null; this.se = null; this.sb = null;
    this.cf = null; this.cp = null; this.te = null;
    this._createBuilderDOM();
    this._bindBuilderEvents();
    this._createDialogDOM();
    this._bindDialogEvents();
    this._bindGlobalEvents();
    if(name !== undefined && this.els.wfName) this.els.wfName.value = name;
    this.renderCanvas();
  }

  closeBuilder() {
    this.editing = null;
    this.sn = null; this.se = null; this.sb = null;
    this.cf = null; this.cp = null; this.te = null;
    this._removeGlobalEvents();
    var overlays = ['wfNodeDialogOverlay', 'wfNodeSettingsOverlay', 'wfConfirmOverlay'];
    for(var i = 0; i < overlays.length; i++){
      var el = document.getElementById(overlays[i]);
      if(el && el.parentNode) el.parentNode.removeChild(el);
    }
    if(this.container) this.container.innerHTML = '';
    this.els = {};
  }

  saveName(n){ if(this.editing != null && this.data[this.editing]) this.data[this.editing].name = n; }

  _createBuilderDOM() {
    this.container.innerHTML = '';
    var builder = document.createElement('div');
    builder.className = 'wf-builder-view active';
    builder.style.cssText = 'height:100%;display:flex;flex-direction:column;';

    var header = document.createElement('div');
    header.className = 'wf-builder-header';
    header.innerHTML = '<button class="btn-sm btn-secondary" id="wfBack">Back</button>' +
      '<input type="text" id="wfName" placeholder="Workflow name...">' +
      '<div class="wf-validation-rules" id="wfNameRules" style="display:none;">' +
        '<div class="wf-rule-item" id="ruleUnique"><span class="wf-rule-icon wf-rule-fail">&#10008;</span><span>Unique name</span></div>' +
        '<div class="wf-rule-item" id="ruleUnderscore"><span class="wf-rule-icon wf-rule-pass">&#10004;</span><span>Underscore allowed</span></div>' +
        '<div class="wf-rule-item" id="ruleLowercase"><span class="wf-rule-icon wf-rule-fail">&#10008;</span><span>No uppercase letters</span></div>' +
        '<div class="wf-rule-item" id="ruleChars"><span class="wf-rule-icon wf-rule-fail">&#10008;</span><span>Only a-z, 0-9, _ allowed</span></div>' +
      '</div>';
    builder.appendChild(header);

    var body = document.createElement('div');
    body.className = 'wf-builder-body';
    body.style.cssText = 'flex:1;display:flex;overflow:hidden;';

    var toolbar = document.createElement('div');
    toolbar.className = 'wf-toolbar';
    toolbar.innerHTML =
      '<div class="wf-tool" data-type="start" title="Start"><div class="wf-shape wf-start"></div><span>Start</span></div>' +
      '<div class="wf-tool" data-type="end" title="End"><div class="wf-shape wf-end"></div><span>End</span></div>' +
      '<div class="wf-tool" data-type="condition" title="Condition"><div class="wf-shape-wrap"><div class="wf-shape wf-condition"></div></div><span>Condition</span></div>';
    body.appendChild(toolbar);

    var canvasWrap = document.createElement('div');
    canvasWrap.className = 'wf-canvas';
    canvasWrap.id = 'wfCanvas';
    canvasWrap.style.position = 'relative';
    canvasWrap.innerHTML = '<svg class="wf-edges-svg" id="wfEdgesSvg" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#555"/></marker></defs></svg>';
    body.appendChild(canvasWrap);
    builder.appendChild(body);

    var footer = document.createElement('div');
    footer.className = 'wf-builder-footer';
    footer.innerHTML = '<button class="btn-sm" id="wfSave">Save</button><button class="btn-sm btn-secondary" id="wfCancel">Cancel</button>';
    builder.appendChild(footer);

    this.container.appendChild(builder);
    this.els.wfBack = document.getElementById('wfBack');
    this.els.wfName = document.getElementById('wfName');
    this.els.wfNameRules = document.getElementById('wfNameRules');
    this.els.wfSave = document.getElementById('wfSave');
    this.els.wfCancel = document.getElementById('wfCancel');
    this.els.wfCanvas = document.getElementById('wfCanvas');
    this.els.wfEdgesSvg = document.getElementById('wfEdgesSvg');
  }

  _bindBuilderEvents() {
    var self = this;
    this.els.wfBack.addEventListener('click', function(){ self.onBack(); });
    this.els.wfCancel.addEventListener('click', function(){ self.onCancel(); });
    this.els.wfSave.addEventListener('click', function(){ self._doSave(); });
    this.els.wfName.addEventListener('input', function(){ self._validateName(this.value.trim()); });
    this.els.wfName.addEventListener('focus', function(){ self._validateName(this.value.trim()); });
    this.container.querySelectorAll('.wf-tool').forEach(function(tool){
      tool.addEventListener('click', function(){
        var type = this.getAttribute('data-type');
        self.showNodeDialog(type);
      });
    });
  }

  _createDialogDOM() {
    var nd = document.createElement('div');
    nd.id = 'wfNodeDialogOverlay';
    nd.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;justify-content:center;align-items:center;';
    nd.innerHTML = '<div style="background:var(--vscode-panel-background);border:1px solid var(--vscode-panel-border);border-radius:5px;padding:18px 20px;min-width:260px;max-width:340px;">' +
      '<label style="display:block;font-size:11px;color:var(--vscode-descriptionForeground);margin-bottom:6px;">Title</label>' +
      '<input type="text" id="wfNodeTitle" style="width:100%;padding:4px 8px;background:var(--vscode-input-background);color:var(--vscode-input-foreground);border:1px solid #555;border-radius:3px;font-size:12px;box-sizing:border-box;margin-bottom:10px;">' +
      '<label style="display:block;font-size:11px;color:var(--vscode-descriptionForeground);margin-bottom:6px;">Type</label>' +
      '<input type="text" id="wfNodeType" readonly style="width:100%;padding:4px 8px;background:var(--vscode-input-background);color:var(--vscode-input-foreground);border:1px solid #555;border-radius:3px;font-size:12px;box-sizing:border-box;margin-bottom:10px;">' +
      '<div style="display:flex;gap:6px;justify-content:flex-end;">' +
        '<button class="btn-sm" id="wfNodeSave">Add</button>' +
        '<button class="btn-sm btn-secondary" id="wfNodeCancel">Cancel</button>' +
      '</div></div>';
    document.body.appendChild(nd);

    var ns = document.createElement('div');
    ns.id = 'wfNodeSettingsOverlay';
    ns.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;justify-content:center;align-items:center;';
    ns.innerHTML = '<div style="background:var(--vscode-panel-background);border:1px solid var(--vscode-panel-border);border-radius:5px;padding:18px 20px;min-width:260px;max-width:340px;">' +
      '<label style="display:block;font-size:11px;color:var(--vscode-descriptionForeground);margin-bottom:6px;">Title</label>' +
      '<input type="text" id="wfNodeSettingsName" style="width:100%;padding:4px 8px;background:var(--vscode-input-background);color:var(--vscode-input-foreground);border:1px solid #555;border-radius:3px;font-size:12px;box-sizing:border-box;margin-bottom:10px;">' +
      '<label style="display:block;font-size:11px;color:var(--vscode-descriptionForeground);margin-bottom:6px;">Type</label>' +
      '<select id="wfNodeSettingsType" style="width:100%;padding:4px 8px;background:var(--vscode-input-background);color:var(--vscode-input-foreground);border:1px solid #555;border-radius:3px;font-size:12px;box-sizing:border-box;margin-bottom:10px;height:28px;">' +
        '<option value="start">Start</option><option value="end">End</option><option value="condition">Condition</option>' +
      '</select>' +
      '<div style="display:flex;gap:6px;justify-content:flex-end;">' +
        '<button class="btn-sm" id="wfNodeSettingsSave">Save</button>' +
        '<button class="btn-sm btn-secondary" id="wfNodeSettingsCancel">Cancel</button>' +
      '</div></div>';
    document.body.appendChild(ns);

    var cf = document.createElement('div');
    cf.id = 'wfConfirmOverlay';
    cf.style.cssText = 'display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;justify-content:center;align-items:center;';
    cf.innerHTML = '<div style="background:var(--vscode-panel-background);border:1px solid var(--vscode-panel-border);border-radius:5px;padding:18px 20px;min-width:260px;max-width:340px;">' +
      '<label id="wfConfirmMessage" style="display:block;font-size:12px;color:var(--vscode-foreground);margin-bottom:12px;"></label>' +
      '<div style="display:flex;gap:6px;justify-content:flex-end;">' +
        '<button class="btn-sm" id="wfConfirmYes">Yes</button>' +
        '<button class="btn-sm btn-secondary" id="wfConfirmNo">No</button>' +
      '</div></div>';
    document.body.appendChild(cf);
  }

  _bindDialogEvents() {
    var self = this;
    document.getElementById('wfNodeSave').addEventListener('click', function(){ self.addNodeFromDialog(); });
    document.getElementById('wfNodeCancel').addEventListener('click', function(){ self.hideNodeDialog(); });
    document.getElementById('wfNodeTitle').addEventListener('keydown', function(e){ if(e.key==='Enter'){ e.preventDefault(); self.addNodeFromDialog(); } });
  }

  _doSave() {
    var name = this.els.wfName.value.trim();
    if(!name) return;
    var st = this._validateName(name);
    if(!st.allValid) return;
    if(this.editing != null && this.data[this.editing]) this.data[this.editing].name = name;
    this.onSave(this.data);
    this.onCancel();
  }

  _validateName(name) {
    var result = { allValid: false, unique: false, underscore: true, lowercase: false, standard: false };
    result.underscore = name.indexOf('_') >= 0 || /^[a-z0-9_]*$/.test(name);
    result.lowercase = name === name.toLowerCase() && /[a-z]/.test(name);
    result.standard = /^[a-z0-9_]+$/.test(name);
    result.unique = true;
    for(var i = 0; i < this.data.length; i++){ if(i !== this.editing && this.data[i].name === name){ result.unique = false; break; } }
    result.allValid = result.unique && result.lowercase && result.standard;
    var rules = this.els.wfNameRules;
    if(!name){ rules.style.display = 'none'; return result; }
    rules.style.display = 'block';
    function setRule(id, pass){
      var el = document.getElementById(id);
      if(!el) return;
      var icon = el.querySelector('.wf-rule-icon');
      if(pass){ icon.innerHTML = '&#10004;'; icon.className = 'wf-rule-icon wf-rule-pass'; }
      else { icon.innerHTML = '&#10008;'; icon.className = 'wf-rule-icon wf-rule-fail'; }
    }
    setRule('ruleUnique', result.unique);
    setRule('ruleUnderscore', result.underscore);
    setRule('ruleLowercase', result.lowercase);
    setRule('ruleChars', result.standard);
    return result;
  }

  _bindGlobalEvents() {
    var self = this;
    function canvasClick(e) {
      if(e.target === self.els.wfCanvas || e.target.classList.contains('wf-edges-svg')) {
        var ch = false;
        if(self.se !== null){ self.se = null; ch = true; }
        if(self.sn !== null){ self.sn = null; ch = true; }
        if(self.sb !== null){ self.sb = null; ch = true; }
        if(ch) self.renderCanvas();
      }
    }
    this.els.wfCanvas.addEventListener('click', canvasClick);
    this._globalListeners.push({ el: this.els.wfCanvas, type: 'click', fn: canvasClick });

    function mm(e){ self._ut(e); }
    document.addEventListener('mousemove', mm);
    this._globalListeners.push({ el: document, type: 'mousemove', fn: mm });

    function kd(ev){ self._kd(ev); }
    document.addEventListener('keydown', kd);
    this._globalListeners.push({ el: document, type: 'keydown', fn: kd });

    function bdm(ev){ self._bdm(ev); }
    document.addEventListener('mousemove', bdm);
    this._globalListeners.push({ el: document, type: 'mousemove', fn: bdm });

    function bde(ev){ self._bde(ev); }
    document.addEventListener('mouseup', bde);
    this._globalListeners.push({ el: document, type: 'mouseup', fn: bde });
  }

  _removeGlobalEvents() {
    this._globalListeners.forEach(function(l){ l.el.removeEventListener(l.type, l.fn); });
    this._globalListeners = [];
    ['wfNodeDialogOverlay','wfNodeSettingsOverlay','wfConfirmOverlay'].forEach(function(id){
      var el = document.getElementById(id);
      if(el) el.remove();
    });
  }

  _gear(){ return this.icons.settings ? this.icons.settings(12) : '&#9881;'; }
  _trash(){ return this.icons.delete ? this.icons.delete(14) : '&#128465;'; }

  addNode(t, ty) {
    if(!t || !ty || this.editing == null) return;
    var w = this.data[this.editing];
    if(!w) return;
    var x = 40 + (w.nodes.length % 5) * 120, y = 40 + Math.floor(w.nodes.length / 5) * 80;
    var id = this._gid(w);
    w.nodes.push({ id: id, title: t, position_x: x, position_y: y, type: ty });
    this._sv(); this.renderCanvas();
  }

  delNode(i) {
    if(this.editing == null) return;
    var w = this.data[this.editing];
    if(!w || !w.nodes) return;
    var nid = w.nodes[i] ? w.nodes[i].id : null;
    if(w.edges && nid) w.edges = w.edges.filter(function(e){ return e.reference_id !== nid && e.destination_id !== nid; });
    w.nodes.splice(i, 1);
    this.sn = null; this.se = null; this.sb = null;
    this._sv(); this.renderCanvas();
  }

  addEdge(fi, fp, ti, tp) {
    if(this.editing == null) return;
    var w = this.data[this.editing];
    if(!w.edges) w.edges = [];
    var fn = w.nodes[fi], tn = w.nodes[ti];
    if(!fn || !tn) return;
    var fid = fn.id, tid = tn.id;
    for(var e = 0; e < w.edges.length; e++) if(w.edges[e].reference_id === fid && w.edges[e].destination_id === tid) return;
    w.edges.push({ reference_id: fid, reference_number: this._s2n(fp), destination_id: tid, destination_number: this._s2n(tp) });
    this._sv(); this.renderEdges();
  }

  delEdge(i) {
    if(this.editing == null) return;
    var w = this.data[this.editing];
    if(!w || !w.edges) return;
    w.edges.splice(i, 1);
    this.se = null; this.sb = null;
    this._sv(); this.renderEdges();
  }

  renderCanvas() {
    this.els.wfCanvas.innerHTML = '<svg class="wf-edges-svg" id="wfEdgesSvg" xmlns="http://www.w3.org/2000/svg"><defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#555"/></marker></defs></svg>';
    if(this.editing == null) return;
    var w = this.data[this.editing];
    if(!w || !w.nodes) return;
    for(var i = 0; i < w.nodes.length; i++) if(!w.nodes[i].id) w.nodes[i].id = this._gid(w);
    if(w.edges) for(var e = 0; e < w.edges.length; e++){
      var ed = w.edges[e];
      if(typeof ed.reference_id === 'number'){ var rn = w.nodes[ed.reference_id]; if(rn && rn.id) ed.reference_id = rn.id; }
      if(typeof ed.destination_id === 'number'){ var dn = w.nodes[ed.destination_id]; if(dn && dn.id) ed.destination_id = dn.id; }
    }
    for(var i = 0; i < w.nodes.length; i++) this._rn(w.nodes[i], i, w);
    var self = this;
    requestAnimationFrame(function(){ self.renderEdges(); });
  }

  _rn(n, i, w) {
    var self = this;
    var el = document.createElement('div');
    el.className = 'wf-node' + (this.sn === i ? ' wf-node-selected' : '');
    el.style.left = n.position_x + 'px';
    el.style.top = n.position_y + 'px';
    el.setAttribute('data-idx', i);
    el.setAttribute('data-id', n.id || '');
    var ss = this.sn !== null || this.se !== null || this.sb !== null;
    var its = this.sn === i;
    el.style.opacity = (ss && !its) ? '0.4' : '1';
    var sc = 'wf-node-shape wf-node-' + (n.type || 'start');
    var nc = n.color || '#fff';
    var bg = ' style="background-color:' + nc + ';"';
    var ph = '<span class="wf-node-port" data-side="top" data-port-num="1" data-port-idx="' + i + '">1</span><span class="wf-node-port" data-side="right" data-port-num="2" data-port-idx="' + i + '">2</span><span class="wf-node-port" data-side="bottom" data-port-num="3" data-port-idx="' + i + '">3</span><span class="wf-node-port" data-side="left" data-port-num="4" data-port-idx="' + i + '">4</span>';
    var tih = '<div class="wf-node-title-container" style="position:absolute;bottom:-30px;left:50%;transform:translateX(-50%);z-index:6;text-align:center;white-space:nowrap;"></div>';
    if(n.type === 'condition') el.innerHTML = tih + '<div class="wf-shape-wrap"><div class="' + sc + '"' + bg + '></div></div>' + ph;
    else el.innerHTML = tih + '<div class="' + sc + '"' + bg + '></div>' + ph;

    var titleContainer = el.querySelector('.wf-node-title-container');
    var titleEditor = null;
    if(titleContainer){
      titleEditor = new componentTextPositionEditor({
        container: titleContainer,
        value: n.title || n.type,
        inputWidth: '100px',
        stopPropagation: false,
        readOnly: this.sn !== i,
        icons: { check: this.icons.check },
        onSave: function(v){ n.title = v; self._sv(); self.renderCanvas(); },
        onBeforeEnter: function(){ if(self.sn !== i){ self.sn = i; self.se = null; self.sb = null; } self.aet = i; self.renderCanvas(); }
      });
    }

    if(this.sn !== i || this.aet !== i){
      new ComponentToolbarPosition(el, {
        right: -44, top: -10,
        direction: 'vertical',
        className: 'wf-node-toolbar',
        items: [
          { html: this._gear(), title: 'Settings (Enter)', className: 'wf-toolbar-gear', hotKey: 'Enter', onPointerDown: function(e){ e.stopPropagation(); self.showNodeSettings(i); } },
          { html: this.icons.colorpicker ? this.icons.colorpicker(10, '#333') : '', title: 'Change color', className: 'wf-toolbar-color', style: { backgroundColor: nc }, onPointerDown: function(e){ e.stopPropagation(); self.showColorPicker('node', i); } },
          { html: this.icons.delete ? this.icons.delete(10, '#fff') : 'x', title: 'Delete node (Del)', className: 'wf-toolbar-delete', hotKey: 'Delete', onPointerDown: function(e){ e.stopPropagation(); self.confirm('Delete this node?', function(){ self.delNode(i); }); } }
        ]
      }).render();
    }

    el.addEventListener('click', function(e){
      if(e.target.closest('.wf-toolbar-item') || e.target.closest('.wf-node-port') || e.target.closest('.text-pos-wrap')) return;
      if(e.target.closest('.text-pos-editor')){
        if(self.sn !== i){ self.sn = i; self.se = null; self.sb = null; } self.aet = i; self.renderCanvas();
        return;
      }
      if(self.cf !== null){ self._cc(); return; }
      self.sn = i; self.se = null; self.sb = null; self.renderCanvas();
    });

    el.querySelectorAll('.wf-node-port').forEach(function(p){
      p.addEventListener('pointerdown', function(e){
        e.stopPropagation();
        var s = this.getAttribute('data-side');
        if(self.cf === null) self._start(i, s);
        else if(self.cf !== i){ self.addEdge(self.cf, self.cp, i, s); self._cc(); }
        else self._cc();
      });
    });

    if(this.aet === i && titleEditor){ this.aet = null; titleEditor.enter(); }
    this.els.wfCanvas.appendChild(el);
    this._md(el, i);
  }

  _md(el, idx) {
    var self = this, sx, sy, ox, oy, drag = false, moved = false, raf = null, pdx = 0, pdy = 0;
    el.addEventListener('mousedown', function(e){
      if(e.target.closest('.wf-toolbar-item') || e.target.closest('.text-pos-editor') || e.target.closest('.text-pos-wrap')) return;
      drag = true; moved = false; sx = e.clientX; sy = e.clientY;
      var n = self.data[self.editing].nodes[idx]; ox = n.position_x; oy = n.position_y; pdx = 0; pdy = 0;
      el.style.transition = 'none'; e.preventDefault();
    });
    function mm(e){
      if(!drag) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if(Math.abs(dx) > 2 || Math.abs(dy) > 2) moved = true;
      pdx = dx; pdy = dy;
      if(raf) return;
      raf = requestAnimationFrame(function(){ raf = null; el.style.transform = 'translate3d(' + pdx + 'px,' + pdy + 'px,0)'; });
    }
    function mu(){
      if(!drag) return; drag = false;
      if(raf){ cancelAnimationFrame(raf); raf = null; }
      if(moved){
        var n = self.data[self.editing].nodes[idx];
        n.position_x = ox + pdx; n.position_y = oy + pdy;
        el.style.transition = ''; el.style.transform = '';
        el.style.left = n.position_x + 'px'; el.style.top = n.position_y + 'px';
        var w = self.data[self.editing];
        if(w && w.edges){
          for(var ei = 0; ei < w.edges.length; ei++){
            var ed = w.edges[ei];
            if(!ed.bendCoords) ed.bendCoords = [];
            if(ed.reference_id === n.id){
              var fc = self._gpc(ed.reference_id, ed.reference_number || 2), tc = self._gpc(ed.destination_id, ed.destination_number || 4);
              if(fc && tc && ed.bendCoords.length >= 2){ var r = self._ro(fc, ed.reference_number || 2, tc, ed.destination_number || 4); if(r.length >= 2){ ed.bendCoords[0] = {x: r[0].x, y: r[0].y}; ed.bendCoords[1] = {x: r[1].x, y: r[1].y}; } }
            }
            if(ed.destination_id === n.id){
              var fc = self._gpc(ed.reference_id, ed.reference_number || 2), tc = self._gpc(ed.destination_id, ed.destination_number || 4);
              if(fc && tc && ed.bendCoords.length >= 2){ var r = self._ro(fc, ed.reference_number || 2, tc, ed.destination_number || 4); if(r.length >= 2){ var la = ed.bendCoords.length - 1, rl = r.length - 1; ed.bendCoords[la] = {x: r[rl].x, y: r[rl].y}; ed.bendCoords[la - 1] = {x: r[rl - 1].x, y: r[rl - 1].y}; } }
            }
          }
        }
        self._sv();
      }
      self.sn = idx; self.se = null; self.renderCanvas();
    }
    document.addEventListener('mousemove', mm);
    document.addEventListener('mouseup', mu);
    this._globalListeners.push({ el: document, type: 'mousemove', fn: mm });
    this._globalListeners.push({ el: document, type: 'mouseup', fn: mu });
  }

  renderEdges() {
    var s = this.els.wfCanvas.querySelector('#wfEdgesSvg');
    if(!s) return;
    var ex = s.querySelectorAll('polyline,path.wf-edge-line,path.wf-edge-selected,.wf-bend-handles-group');
    ex.forEach(function(l){ l.remove(); });
    var ot = this.els.wfCanvas.querySelectorAll('.wf-toolbar-pos');
    ot.forEach(function(t){ if(!t.closest('.wf-node')) t.remove(); });
    if(this.editing == null) return;
    var w = this.data[this.editing];
    if(!w || !w.edges || !w.nodes) return;
    for(var e = 0; e < w.edges.length; e++) this._re(w.edges[e], e, s, w);
  }

  _re(ed, e, svg, wf) {
    var self = this, fc = this._gpc(ed.reference_id, ed.reference_number || 2), tc = this._gpc(ed.destination_id, ed.destination_number || 4);
    if(!fc || !tc) return;
    var fp = ed.reference_number || 2, tp = ed.destination_number || 4, rp = this._ro(fc, fp, tc, tp);
    if(ed.bendCoords && !Array.isArray(ed.bendCoords)){
      var old = ed.bendCoords; ed.bendCoords = [];
      Object.keys(old).map(Number).filter(function(k){ return !isNaN(k); }).sort(function(a,b){ return a-b; }).forEach(function(k){
        var c = old[k]; if(c && c.x !== undefined && c.y !== undefined) ed.bendCoords.push({x: c.x, y: c.y});
      });
    }
    if(ed._removedBaseIdx) ed._removedBaseIdx = [];
    if(!ed.bendCoords || ed.bendCoords.length === 0) ed.bendCoords = rp.map(function(p){ return {x: p.x, y: p.y}; });
    else if(ed.bendCoords.length >= 2 && rp.length >= 2){
      var eps = 3;
      if(Math.abs(ed.bendCoords[0].x - rp[0].x) > eps || Math.abs(ed.bendCoords[0].y - rp[0].y) > eps){
        ed.bendCoords[0] = {x: rp[0].x, y: rp[0].y}; if(ed.bendCoords.length > 1) ed.bendCoords[1] = {x: rp[1].x, y: rp[1].y};
      }
      var la = ed.bendCoords.length - 1, rl = rp.length - 1;
      if(Math.abs(ed.bendCoords[la].x - rp[rl].x) > eps || Math.abs(ed.bendCoords[la].y - rp[rl].y) > eps){
        ed.bendCoords[la] = {x: rp[rl].x, y: rp[rl].y}; if(ed.bendCoords.length > 1) ed.bendCoords[la - 1] = {x: rp[rl - 1].x, y: rp[rl - 1].y};
      }
    }
    var pa = ed.bendCoords.map(function(p){ return {x: p.x, y: p.y}; }), pd = this._ptr(pa, 10), hp = this._pts(pa);
    var poly = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    poly.setAttribute('d', pd);
    poly.setAttribute('class', 'wf-edge-line' + (this.se === e ? ' wf-edge-selected' : ''));
    poly.setAttribute('fill', 'none');
    poly.style.stroke = ed.color || '#555';
    var ss = this.sn !== null || this.se !== null || this.sb !== null, ies = (this.se === e) || (this.sb && this.sb.edgeIdx === e);
    var dop = (ss && !ies) ? '0.4' : '1';
    poly.style.opacity = dop;
    svg.appendChild(poly);

    var hit = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    hit.setAttribute('points', hp);
    hit.setAttribute('class', 'wf-edge-hit');
    hit.setAttribute('fill', 'none');
    hit.setAttribute('stroke-linejoin', 'round');
    hit.setAttribute('stroke-linecap', 'round');
    hit.style.opacity = dop;
    hit.setAttribute('data-edge-idx', e);
    hit.addEventListener('click', function(ev){
      ev.stopPropagation();
      self.se = e; self.sn = null; self.sb = null;
      self.renderEdges(); self.renderCanvas();
    });
    hit.addEventListener('dblclick', function(ev){
      ev.stopPropagation(); ev.preventDefault();
      var rect = self.els.wfCanvas.getBoundingClientRect();
      var mx = ev.clientX - rect.left, my = ev.clientY - rect.top;
      var ed2 = self.data[self.editing].edges[e];
      if(!ed2 || !ed2.bendCoords) return;
      var bestSeg = -1, bestDist = Infinity;
      for(var i = 0; i < ed2.bendCoords.length - 1; i++){
        var proj = self._cos(mx, my, ed2.bendCoords[i].x, ed2.bendCoords[i].y, ed2.bendCoords[i+1].x, ed2.bendCoords[i+1].y);
        if(proj && proj.dist < bestDist){ bestDist = proj.dist; bestSeg = i; }
      }
      if(bestSeg >= 0) ed2.bendCoords.splice(bestSeg + 1, 0, {x: mx, y: my});
      self._sv(); self.renderEdges();
    });
    svg.appendChild(hit);

    if(this.se === e){
      this._rbh(svg, pa, e);
      var midIdx = Math.floor(pa.length / 2);
      var mp = pa[midIdx] || rp[Math.floor(rp.length / 2)] || {x: 0, y: 0};
      var mx = mp.x, my = mp.y;
      new ComponentToolbarPosition(this.els.wfCanvas, {
        x: mx + 10, y: my - 30,
        direction: 'horizontal',
        className: 'wf-edge-toolbar',
        items: [
          { html: this._trash(), title: 'Delete connection', className: 'wf-toolbar-delete', onClick: function(ev){ ev.stopPropagation(); self.confirm('Delete this connection?', function(){ self.delEdge(e); }); } },
          { html: '', title: 'Change color', className: 'wf-toolbar-color', style: { backgroundColor: ed.color || '#555' }, onClick: function(ev){ ev.stopPropagation(); self.showColorPicker('edge', e); } },
          { html: '&#8634;', title: 'Reset bends', className: 'wf-toolbar-reset', onClick: function(ev){ ev.stopPropagation(); ed.bendCoords = rp.map(function(p){ return {x: p.x, y: p.y}; }); self._sv(); self.renderEdges(); } }
        ]
      }).render();
    }
  }

  _rbh(svg, pa, ei) {
    var self = this, g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'wf-bend-handles-group');
    var H = 6;
    for(var bi = 2; bi < pa.length - 2; bi++){
      (function(bidx, pt){
        var key = bidx;
        var isSel = self.sb && self.sb.edgeIdx === ei && self.sb.key === key;
        var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', pt.x - H); rect.setAttribute('y', pt.y - H);
        rect.setAttribute('width', H * 2); rect.setAttribute('height', H * 2);
        rect.setAttribute('rx', '2');
        rect.setAttribute('class', 'wf-bend-handle' + (isSel ? ' wf-bend-selected' : ''));
        rect.style.cursor = 'move';
        rect.addEventListener('mousedown', function(ev){ ev.stopPropagation(); ev.preventDefault(); if(self.db) return; self.sb = {edgeIdx: ei, key: key}; self.db = {edgeIdx: ei, key: key, startX: ev.clientX, startY: ev.clientY, origX: pt.x, origY: pt.y}; });
        rect.addEventListener('dblclick', function(ev){ ev.stopPropagation(); ev.preventDefault(); var ed = self.data[self.editing].edges[ei]; if(!ed || !ed.bendCoords) return; if(bidx > 1 && bidx < ed.bendCoords.length - 2) ed.bendCoords.splice(bidx, 1); self.sb = null; self._sv(); self.renderEdges(); });
        if(isSel){
          var R = 16, G = 5;
          var ring = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          ring.setAttribute('cx', pt.x); ring.setAttribute('cy', pt.y); ring.setAttribute('r', R - 2);
          ring.setAttribute('fill', 'none'); ring.setAttribute('stroke', '#00e5ff'); ring.setAttribute('stroke-width', '2'); ring.setAttribute('stroke-dasharray', '4,2');
          g.appendChild(ring);
          var h1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          h1.setAttribute('x1', pt.x - R); h1.setAttribute('y1', pt.y); h1.setAttribute('x2', pt.x - G); h1.setAttribute('y2', pt.y);
          h1.setAttribute('stroke', '#00e5ff'); h1.setAttribute('stroke-width', '2'); h1.setAttribute('stroke-dasharray', '4,2');
          var h2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          h2.setAttribute('x1', pt.x + G); h2.setAttribute('y1', pt.y); h2.setAttribute('x2', pt.x + R); h2.setAttribute('y2', pt.y);
          h2.setAttribute('stroke', '#00e5ff'); h2.setAttribute('stroke-width', '2'); h2.setAttribute('stroke-dasharray', '4,2');
          var v1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          v1.setAttribute('x1', pt.x); v1.setAttribute('y1', pt.y - R); v1.setAttribute('x2', pt.x); v1.setAttribute('y2', pt.y - G);
          v1.setAttribute('stroke', '#00e5ff'); v1.setAttribute('stroke-width', '2'); v1.setAttribute('stroke-dasharray', '4,2');
          var v2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          v2.setAttribute('x1', pt.x); v2.setAttribute('y1', pt.y + G); v2.setAttribute('x2', pt.x); v2.setAttribute('y2', pt.y + R);
          v2.setAttribute('stroke', '#00e5ff'); v2.setAttribute('stroke-width', '2'); v2.setAttribute('stroke-dasharray', '4,2');
          g.appendChild(h1); g.appendChild(h2); g.appendChild(v1); g.appendChild(v2);
        }
        g.appendChild(rect);
      })(bi, pa[bi]);
    }
    svg.appendChild(g);
  }

  _start(i, s){ this.cf = i; this.cp = s || 'right'; this.els.wfCanvas.classList.add('connecting'); }
  _cc(){ this.cf = null; this.cp = null; if(this.te){ this.te.remove(); this.te = null; } this.els.wfCanvas.classList.remove('connecting'); }

  _ut(e) {
    if(this.cf === null || this.cp === null) return;
    var s = this.els.wfCanvas.querySelector('#wfEdgesSvg');
    if(!s) return;
    if(!this.te){
      this.te = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      this.te.setAttribute('class', 'wf-edge-temp');
      this.te.setAttribute('fill', 'none');
      s.appendChild(this.te);
    }
    var fp = this._s2n(this.cp), w = this.data[this.editing], fn = w && w.nodes && w.nodes[this.cf] ? w.nodes[this.cf] : null, fc = fn ? this._gpc(fn.id, fp) : null;
    if(!fc) return;
    var rect = this.els.wfCanvas.getBoundingClientRect(), mx = e.clientX - rect.left, my = e.clientY - rect.top;
    var fd = this._psd(fp), ST = 40, sx = fc.x + fd.dx * ST, sy = fc.y + fd.dy * ST, fv = this._ivp(fp), pts = [];
    pts.push({x: fc.x, y: fc.y}); pts.push({x: sx, y: sy});
    if(fv) pts.push({x: mx, y: sy}); else pts.push({x: sx, y: my});
    pts.push({x: mx, y: my});
    this.te.setAttribute('d', this._ptr(pts, 10));
  }

  _kd(ev) {
    if(ev.key === 'Escape' || ev.keyCode === 27){
      if(this.cf !== null){ ev.preventDefault(); this._cc(); return; }
      var ch = false;
      if(this.se !== null){ this.se = null; ch = true; }
      if(this.sn !== null){ this.sn = null; ch = true; }
      if(ch){ ev.preventDefault(); this.renderCanvas(); }
    }
    if(ev.key === 'Delete' || ev.keyCode === 46){
      if(this.se !== null){ ev.preventDefault(); var self = this; this.confirm('Delete this connection?', function(){ self.delEdge(self.se); }); }
      else if(this.sn !== null){ ev.preventDefault(); var self = this; this.confirm('Delete this node?', function(){ self.delNode(self.sn); }); }
    }
    if(this.sb && this.se !== null){
      var dx = 0, dy = 0, mv = false;
      if(ev.key === 'ArrowLeft' || ev.keyCode === 37){ dx = -1; mv = true; }
      if(ev.key === 'ArrowUp' || ev.keyCode === 38){ dy = -1; mv = true; }
      if(ev.key === 'ArrowRight' || ev.keyCode === 39){ dx = 1; mv = true; }
      if(ev.key === 'ArrowDown' || ev.keyCode === 40){ dy = 1; mv = true; }
      if(mv){
        ev.preventDefault();
        var ed = this.data[this.editing].edges[this.se];
        if(ed){
          if(!ed.bendCoords) ed.bendCoords = [];
          var si = parseInt(this.sb.key);
          if(!isNaN(si) && ed.bendCoords[si]){ var pt = ed.bendCoords[si]; ed.bendCoords[si] = {x: pt.x + dx, y: pt.y + dy}; }
          this._sv(); this.renderEdges();
        }
      }
    }
    // Move selected node with arrow keys
    if(this.sn !== null && !this.sb && this.se === null){
      var ndx = 0, ndy = 0, nmv = false;
      if(ev.key === 'ArrowLeft' || ev.keyCode === 37){ ndx = -10; nmv = true; }
      if(ev.key === 'ArrowUp' || ev.keyCode === 38){ ndy = -10; nmv = true; }
      if(ev.key === 'ArrowRight' || ev.keyCode === 39){ ndx = 10; nmv = true; }
      if(ev.key === 'ArrowDown' || ev.keyCode === 40){ ndy = 10; nmv = true; }
      if(nmv){
        ev.preventDefault();
        var w = this.data[this.editing];
        if(w && w.nodes[this.sn]){
          var n = w.nodes[this.sn];
          n.position_x = (n.position_x || 0) + ndx;
          n.position_y = (n.position_y || 0) + ndy;
          this._sv(); this.renderCanvas();
        }
      }
    }
  }

  _bdm(ev) {
    if(!this.db) return;
    var w = this.data[this.editing];
    if(!w || !w.edges) return;
    var ed = w.edges[this.db.edgeIdx];
    if(!ed || !ed.bendCoords) return;
    var b = this.db, nx = b.origX + (ev.clientX - b.startX), ny = b.origY + (ev.clientY - b.startY);
    var di = parseInt(b.key);
    if(!isNaN(di) && ed.bendCoords[di]) ed.bendCoords[di] = {x: nx, y: ny};
    this.renderEdges();
  }

  _bde(ev) {
    if(!this.db) return;
    var w = this.data[this.editing];
    if(w && w.edges) this._sv();
    this.db = null;
  }

  showNodeDialog(type){
    this.npt = type;
    var el = document.getElementById('wfNodeDialogOverlay');
    var ti = document.getElementById('wfNodeTitle');
    var ty = document.getElementById('wfNodeType');
    if(ty) ty.value = type || '';
    if(ti){ ti.value = ''; ti.focus(); }
    if(el) el.style.display = 'flex';
  }

  hideNodeDialog(){
    this.npt = null;
    var el = document.getElementById('wfNodeDialogOverlay');
    if(el) el.style.display = 'none';
  }

  addNodeFromDialog(){
    var ti = document.getElementById('wfNodeTitle');
    var ty = this.npt;
    if(!ti || !ty) return;
    var t = ti.value.trim();
    if(!t) return;
    this.addNode(t, ty);
    this.hideNodeDialog();
  }

  showNodeSettings(idx){
    if(this.editing == null) return;
    var n = this.data[this.editing].nodes[idx];
    if(!n) return;
    var self = this;
    var wrap = document.createElement('div');
    wrap.style.cssText = 'display:flex;flex-direction:column;gap:12px;';

    var nameRow = document.createElement('div');
    nameRow.style.cssText = 'display:flex;flex-direction:column;gap:4px;';
    var nameLbl = document.createElement('label');
    nameLbl.textContent = 'عنوان';
    nameLbl.style.cssText = 'font-size:12px;font-weight:600;';
    var nameInp = document.createElement('input');
    nameInp.type = 'text';
    nameInp.value = n.title || '';
    nameInp.style.cssText = 'padding:6px 10px;font-size:13px;border:1px solid var(--vscode-panel-border);border-radius:4px;background:var(--vscode-input-background);color:var(--vscode-input-foreground);outline:none;';
    nameRow.appendChild(nameLbl);
    nameRow.appendChild(nameInp);

    var typeRow = document.createElement('div');
    typeRow.style.cssText = 'display:flex;flex-direction:column;gap:4px;';
    var typeLbl = document.createElement('label');
    typeLbl.textContent = 'نوع';
    typeLbl.style.cssText = 'font-size:12px;font-weight:600;';
    var typeSel = document.createElement('select');
    typeSel.style.cssText = 'padding:6px 10px;font-size:13px;border:1px solid var(--vscode-panel-border);border-radius:4px;background:var(--vscode-input-background);color:var(--vscode-input-foreground);outline:none;';
    var types = [
      { value: 'start', label: 'شروع' },
      { value: 'end', label: 'پایان' },
      { value: 'condition', label: 'شرط' },
      { value: 'custom', label: 'سفارشی' }
    ];
    types.forEach(function(t){
      var opt = document.createElement('option');
      opt.value = t.value;
      opt.textContent = t.label;
      if((n.type || 'start') === t.value) opt.selected = true;
      typeSel.appendChild(opt);
    });
    typeRow.appendChild(typeLbl);
    typeRow.appendChild(typeSel);

    wrap.appendChild(nameRow);
    wrap.appendChild(typeRow);

    this._nodeSettingsPopup = new componentWindow({
      title: 'Node Settings',
      content: wrap,
      acceptText: 'Save',
      cancelText: 'Cancel',
      onAccept: function(){
        var v = nameInp.value.trim();
        if(v) n.title = v;
        n.type = typeSel.value;
        self._sv(); self.renderCanvas();
      },
      onCancel: function(){}
    }).show();
  }

  hideNodeSettings(){
    if(this._nodeSettingsPopup){ this._nodeSettingsPopup.close(); this._nodeSettingsPopup = null; }
  }

  saveNodeSettings(){
    // Legacy: now handled inside componentWindow onAccept
  }

  showColorPicker(tt, idx){
    if(this.editing == null) return;
    var currentColor;
    if(tt === 'node'){
      var n = this.data[this.editing].nodes[idx];
      if(!n) return; currentColor = n.color || '#ffffff';
    } else if(tt === 'edge'){
      var ed = this.data[this.editing].edges[idx];
      if(!ed) return; currentColor = ed.color || '#555555';
    } else return;
    var self = this;
    this._colorPicker = new componentColorpickerSimple({
      currentColor: currentColor,
      onSelect: function(color){
        if(tt === 'node') self.data[self.editing].nodes[idx].color = color;
        else if(tt === 'edge') self.data[self.editing].edges[idx].color = color;
        self._sv(); self.renderCanvas();
      },
      onCancel: function(){}
    }).show();
  }

  hideColorPicker(){
    if(this._colorPicker){ this._colorPicker.close(); this._colorPicker = null; }
  }

  _sv(){ this.onSave(this.data); }

  _gid(w){
    var id = '';
    do { id = Math.floor(10000 + Math.random() * 90000).toString(); }
    while(w.nodes.some(function(n){ return n.id === id; }));
    return id;
  }

  _s2n(s){
    switch(s){ case 'top': return 1; case 'right': return 2; case 'bottom': return 3; case 'left': return 4; default: return 2; }
  }

  _n2s(n){
    switch(n){ case 1: return 'top'; case 2: return 'right'; case 3: return 'bottom'; case 4: return 'left'; default: return 'right'; }
  }

  _gpo(s){
    switch(s){ case 'top': return {x:18,y:0}; case 'right': return {x:36,y:18}; case 'bottom': return {x:18,y:36}; case 'left': return {x:0,y:18}; default: return {x:18,y:18}; }
  }

  _gpc(nid, pn){
    var ne = this.els.wfCanvas.querySelector('.wf-node[data-id="' + nid + '"]');
    if(!ne) return null;
    var pe = ne.querySelector('.wf-node-port[data-port-num="' + pn + '"]');
    if(!pe) return null;
    var cr = this.els.wfCanvas.getBoundingClientRect(), pr = pe.getBoundingClientRect();
    return {x: pr.left + pr.width / 2 - cr.left, y: pr.top + pr.height / 2 - cr.top};
  }

  _psd(p){
    switch(p){ case 1: return {dx:0,dy:-1}; case 2: return {dx:1,dy:0}; case 3: return {dx:0,dy:1}; case 4: return {dx:-1,dy:0}; default: return {dx:1,dy:0}; }
  }

  _ivp(p){ return p === 1 || p === 3; }

  _ro(f, fp, t, tp){
    var ST = 40, fd = this._psd(fp), td = this._psd(tp);
    var sx = f.x + fd.dx * ST, sy = f.y + fd.dy * ST;
    var ex = t.x + td.dx * ST, ey = t.y + td.dy * ST;
    var fv = this._ivp(fp), tv = this._ivp(tp), pts = [];
    pts.push({x: f.x, y: f.y}); pts.push({x: sx, y: sy});
    if(fv && tv){ var my = (sy + ey) / 2; pts.push({x: sx, y: my}); pts.push({x: ex, y: my}); }
    else if(fv && !tv) pts.push({x: ex, y: sy});
    else if(!fv && tv) pts.push({x: sx, y: ey});
    else { var my2 = (sy + ey) / 2; pts.push({x: sx, y: my2}); pts.push({x: ex, y: my2}); }
    pts.push({x: ex, y: ey}); pts.push({x: t.x, y: t.y});
    return pts;
  }

  _ptr(pts, r){
    if(!r) r = 8;
    if(pts.length < 2) return '';
    var d = 'M' + pts[0].x + ' ' + pts[0].y;
    for(var i = 1; i < pts.length - 1; i++){
      var pr = pts[i-1], c = pts[i], nx = pts[i+1];
      var d1x = c.x - pr.x, d1y = c.y - pr.y, l1 = Math.sqrt(d1x * d1x + d1y * d1y);
      var d2x = nx.x - c.x, d2y = nx.y - c.y, l2 = Math.sqrt(d2x * d2x + d2y * d2y);
      var cr = Math.min(r, l1 / 2, l2 / 2);
      var bx1 = c.x - (d1x / l1) * cr, by1 = c.y - (d1y / l1) * cr;
      var bx2 = c.x + (d2x / l2) * cr, by2 = c.y + (d2y / l2) * cr;
      d += ' L' + bx1 + ' ' + by1; d += ' Q' + c.x + ' ' + c.y + ' ' + bx2 + ' ' + by2;
    }
    var la = pts[pts.length - 1];
    d += ' L' + la.x + ' ' + la.y;
    return d;
  }

  _pts(pts){ return pts.map(function(p){ return p.x + ',' + p.y; }).join(' '); }

  _cos(px, py, ax, ay, bx, by){
    var dx = bx - ax, dy = by - ay;
    if(Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) return null;
    var l2 = dx * dx + dy * dy;
    var t = ((px - ax) * dx + (py - ay) * dy) / l2;
    if(t < 0 || t > 1) return null;
    var cx = ax + t * dx, cy = ay + t * dy;
    return {x: cx, y: cy, t: t, dist: Math.hypot(px - cx, py - cy)};
  }
}

if(typeof module !== 'undefined' && module.exports) module.exports = ComponentWorkflow;
