class componentTextPositionEditor {
  constructor(options) {
    this.options = Object.assign({
      container: null,
      value: '',
      placeholder: 'Enter text...',
      onSave: null,
      onCancel: null,
      onBeforeEnter: null,
      stopPropagation: true,
      readOnly: false,
      inputWidth: '100px',
      icons: {}
    }, options || {});
    this._value = this.options.value || '';
    this._editing = false;
    this._el = null;
    this._displayEl = null;
    this._wrapEl = null;
    this._inputEl = null;
    this._saveBtnEl = null;

    if (this.options.container) {
      this.render();
    }
  }

  render() {
    var self = this;
    var o = this.options;
    var container = o.container;
    if (!container) return;

    this._el = document.createElement('div');
    this._el.className = 'text-pos-editor';
    this._el.style.cssText = 'display:inline-block;position:relative;';

    this._displayEl = document.createElement('span');
    this._displayEl.className = 'text-pos-display';
    this._displayEl.style.cssText = 'cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
    this._displayEl.textContent = this._value || o.placeholder;
    this._displayEl.title = 'Click to edit';

    if (!o.readOnly) {
      this._displayEl.addEventListener('click', function(e) {
        if (o.stopPropagation !== false) e.stopPropagation();
        if (typeof o.onBeforeEnter === 'function') o.onBeforeEnter(e);
        self.enter();
      });
    }

    this._el.appendChild(this._displayEl);
    container.appendChild(this._el);
  }

  enter() {
    if (this._editing) return;
    this._editing = true;
    var self = this;
    var o = this.options;

    this._displayEl.style.display = 'none';

    this._wrapEl = document.createElement('span');
    this._wrapEl.className = 'text-pos-wrap';
    this._wrapEl.style.cssText = 'display:inline-flex;align-items:center;gap:4px;';

    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'text-pos-input';
    input.style.cssText = 'width:' + o.inputWidth + ';padding:2px 4px;font-size:12px;border:1px solid var(--vscode-focusBorder);background:var(--vscode-input-background);color:var(--vscode-input-foreground);outline:none;border-radius:3px;';
    input.value = this._value;

    var saveBtn = document.createElement('span');
    saveBtn.className = 'text-pos-save';
    saveBtn.style.cssText = 'cursor:pointer;display:flex;align-items:center;justify-content:center;width:18px;height:18px;background:var(--vscode-button-background);border-radius:50%;color:var(--vscode-button-foreground);font-size:10px;user-select:none;';
    saveBtn.title = 'Save';
    saveBtn.innerHTML = (o.icons && o.icons.check) ? o.icons.check(10, '#fff') : '&#10004;';

    this._wrapEl.appendChild(input);
    this._wrapEl.appendChild(saveBtn);
    this._el.appendChild(this._wrapEl);

    setTimeout(function() {
      input.focus();
      input.select();
    }, 0);

    function doSave() {
      var v = input.value.trim();
      if (v) {
        self._value = v;
        self._displayEl.textContent = v;
        if (typeof o.onSave === 'function') o.onSave(v);
      }
      self.exitEdit();
    }

    function doCancel() {
      self.exitEdit();
      if (typeof o.onCancel === 'function') o.onCancel();
    }

    saveBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      doSave();
    });

    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        doSave();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        doCancel();
      }
    });

    // blur = cancel after short delay so saveBtn click can fire first
    input.addEventListener('blur', function() {
      setTimeout(function() {
        if (self._editing) doCancel();
      }, 150);
    });

    this._inputEl = input;
    this._saveBtnEl = saveBtn;
  }

  exitEdit() {
    if (!this._editing) return;
    this._editing = false;
    if (this._wrapEl) {
      this._wrapEl.remove();
      this._wrapEl = null;
    }
    if (this._displayEl) this._displayEl.style.display = '';
    this._inputEl = null;
    this._saveBtnEl = null;
  }

  setValue(v) {
    this._value = v || '';
    if (this._displayEl) this._displayEl.textContent = this._value;
  }

  getValue() {
    return this._value;
  }

  isEditing() {
    return this._editing;
  }

  destroy() {
    this.exitEdit();
    if (this._el) {
      this._el.remove();
      this._el = null;
    }
  }
}
