class componentWindow {
  constructor(options) {
    this.options = Object.assign({
      title: '',
      content: '',
      acceptText: 'Confirm',
      cancelText: 'Cancel',
      showCancel: true,
      showAccept: true,
      closeOnOverlay: true,
      onAccept: null,
      onCancel: null,
      onClose: null
    }, options || {});
    this.el = null;
    this.overlay = null;
    this._keydownHandler = this._onKeydown.bind(this);
  }

  render() {
    if (this.el) return this;

    var self = this;
    var o = this.options;

    this.overlay = document.createElement('div');
    this.overlay.className = 'cp-popup-overlay';
    this.overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity .2s;';
    if (o.closeOnOverlay) {
      this.overlay.addEventListener('click', function(e) {
        if (e.target === self.overlay) self.close();
      });
    }

    this.el = document.createElement('div');
    this.el.className = 'cp-popup-box';
    this.el.style.cssText = 'background:var(--vscode-editor-background);color:var(--vscode-foreground);border:1px solid var(--vscode-panel-border);border-radius:8px;box-shadow:0 8px 32px rgba(0,0,0,0.35);min-width:320px;max-width:520px;width:90%;transform:translateY(-10px);transition:transform .2s,opacity .2s;opacity:0;overflow:hidden;display:flex;flex-direction:column;';

    // Header
    var header = document.createElement('div');
    header.className = 'cp-popup-header';
    header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--vscode-panel-border);';

    var title = document.createElement('span');
    title.className = 'cp-popup-title';
    title.style.cssText = 'font-size:14px;font-weight:600;';
    title.textContent = o.title || '';

    var closeBtn = document.createElement('button');
    closeBtn.className = 'cp-popup-close';
    closeBtn.style.cssText = 'background:none;border:none;color:var(--vscode-foreground);font-size:18px;cursor:pointer;padding:0;width:24px;height:24px;display:flex;align-items:center;justify-content:center;border-radius:4px;opacity:.7;';
    closeBtn.innerHTML = '&times;';
    closeBtn.title = 'Close';
    closeBtn.addEventListener('mouseenter', function() { closeBtn.style.opacity = '1'; });
    closeBtn.addEventListener('mouseleave', function() { closeBtn.style.opacity = '.7'; });
    closeBtn.addEventListener('click', function() { self.close(); });

    header.appendChild(title);
    header.appendChild(closeBtn);

    // Body
    var body = document.createElement('div');
    body.className = 'cp-popup-body';
    body.style.cssText = 'padding:16px;font-size:13px;line-height:1.6;overflow:auto;max-height:60vh;';
    if (typeof o.content === 'string') {
      body.innerHTML = o.content;
    } else if (o.content instanceof HTMLElement) {
      body.appendChild(o.content);
    }

    // Footer
    var footer = document.createElement('div');
    footer.className = 'cp-popup-footer';
    footer.style.cssText = 'display:flex;align-items:center;justify-content:flex-end;gap:8px;padding:12px 16px;border-top:1px solid var(--vscode-panel-border);';

    if (o.showCancel) {
      var cancelBtn = document.createElement('button');
      cancelBtn.className = 'cp-popup-cancel';
      cancelBtn.textContent = o.cancelText;
      cancelBtn.style.cssText = 'padding:6px 14px;font-size:12px;border-radius:4px;border:1px solid var(--vscode-panel-border);background:var(--vscode-button-secondaryBackground);color:var(--vscode-button-secondaryForeground);cursor:pointer;outline:none;';
      cancelBtn.addEventListener('click', function() {
        if (typeof o.onCancel === 'function') o.onCancel();
        self.close();
      });
      footer.appendChild(cancelBtn);
    }

    if (o.showAccept) {
      var acceptBtn = document.createElement('button');
      acceptBtn.className = 'cp-popup-accept';
      acceptBtn.textContent = o.acceptText;
      acceptBtn.style.cssText = 'padding:6px 14px;font-size:12px;border-radius:4px;border:none;background:var(--vscode-button-background);color:var(--vscode-button-foreground);cursor:pointer;outline:none;';
      acceptBtn.addEventListener('click', function() {
        if (typeof o.onAccept === 'function') o.onAccept();
        self.close();
      });
      footer.appendChild(acceptBtn);
    }

    this.el.appendChild(header);
    this.el.appendChild(body);
    if (o.showCancel || o.showAccept) {
      this.el.appendChild(footer);
    }
    this.overlay.appendChild(this.el);
    document.body.appendChild(this.overlay);

    // Add focus ring styling
    if(cancelBtn) {
      cancelBtn.addEventListener('focus', function() { cancelBtn.style.boxShadow = '0 0 0 2px var(--vscode-focusBorder)'; });
      cancelBtn.addEventListener('blur', function() { cancelBtn.style.boxShadow = 'none'; });
    }
    if(acceptBtn) {
      acceptBtn.addEventListener('focus', function() { acceptBtn.style.boxShadow = '0 0 0 2px var(--vscode-focusBorder)'; });
      acceptBtn.addEventListener('blur', function() { acceptBtn.style.boxShadow = 'none'; });
    }

    // Animate in
    requestAnimationFrame(function() {
      self.overlay.style.opacity = '1';
      self.el.style.opacity = '1';
      self.el.style.transform = 'translateY(0)';
    });

    document.addEventListener('keydown', this._keydownHandler);
    this._focusFooter();
    return this;
  }

  _focusFooter() {
    var self = this;
    var btns = self.el.querySelectorAll('.cp-popup-footer button');
    if(!btns.length) return;
    self._footerButtons = Array.prototype.slice.call(btns);
    self._focusIdx = self._footerButtons.length - 1;
    self._footerButtons[self._focusIdx].focus();
  }

  _onKeydown(e) {
    if (e.key === 'Escape') {
      this.close();
      return;
    }
    if(!this._footerButtons || this._footerButtons.length < 2) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      this._focusIdx = (this._focusIdx + 1) % this._footerButtons.length;
      this._footerButtons[this._focusIdx].focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      this._focusIdx = (this._focusIdx - 1 + this._footerButtons.length) % this._footerButtons.length;
      this._footerButtons[this._focusIdx].focus();
    } else if (e.key === 'Enter') {
      var focused = document.activeElement;
      if(focused && focused.classList.contains('cp-popup-accept')) {
        e.preventDefault();
        focused.click();
      } else if(focused && focused.classList.contains('cp-popup-cancel')) {
        e.preventDefault();
        focused.click();
      }
    }
  }

  show() {
    return this.render();
  }

  close() {
    if (!this.el) return;
    var self = this;
    if (typeof this.options.onClose === 'function') {
      this.options.onClose();
    }
    this.overlay.style.opacity = '0';
    this.el.style.opacity = '0';
    this.el.style.transform = 'translateY(-10px)';
    setTimeout(function() {
      self.destroy();
    }, 200);
    document.removeEventListener('keydown', this._keydownHandler);
  }

  destroy() {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
    this.el = null;
    this.overlay = null;
    this._footerButtons = null;
    this._focusIdx = -1;
  }
}

// Convenience static methods
componentWindow.confirm = function(message, onAccept, onCancel, options) {
  var opts = Object.assign({
    title: 'Confirm',
    content: message,
    acceptText: 'Confirm',
    cancelText: 'Cancel',
    onAccept: onAccept,
    onCancel: onCancel
  }, options || {});
  var popup = new componentWindow(opts);
  return popup.show();
};

componentWindow.alert = function(message, onClose, options) {
  var opts = Object.assign({
    title: 'Alert',
    content: message,
    showCancel: false,
    acceptText: 'OK',
    onAccept: onClose
  }, options || {});
  var popup = new componentWindow(opts);
  return popup.show();
};
