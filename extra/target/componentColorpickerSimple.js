class componentColorpickerSimple {
  constructor(options) {
    this.options = Object.assign({
      colors: ['#ffffff','#f5f5f5','#e0e0e0','#bdbdbd','#e74c3c','#e67e22','#f1c40f','#d35400','#2ecc71','#1abc9c','#27ae60','#16a085','#3498db','#2980b9','#1a5276','#5dade2','#9b59b6','#8e44ad','#e91e63','#ad1457','#795548','#5d4037','#607d8b','#34495e'],
      columns: 6,
      currentColor: null,
      onSelect: null,
      onCancel: null
    }, options || {});
    this._popup = null;
  }

  show() {
    var self = this;
    var o = this.options;
    var cols = o.columns || 6;
    var colors = o.colors || [];
    self._colorItems = [];

    var grid = document.createElement('div');
    grid.className = 'cp-color-grid';
    grid.style.cssText = 'display:grid;grid-template-columns:repeat(' + cols + ',1fr);gap:6px;justify-items:center;';
    grid.setAttribute('tabindex', '0');

    var focusIdx = 0;
    for (var i = 0; i < colors.length; i++) {
      (function(idx, color) {
        var item = document.createElement('div');
        item.className = 'cp-color-item';
        item.style.cssText = 'width:32px;height:32px;border-radius:4px;cursor:pointer;border:2px solid transparent;box-sizing:border-box;transition:border-color .15s,box-shadow .15s;background-color:' + color + ';outline:none;';
        item.setAttribute('tabindex', '-1');
        if (color === o.currentColor) {
          item.style.borderColor = '#fff';
          item.style.boxShadow = '0 0 0 2px var(--vscode-focusBorder)';
          focusIdx = idx;
        }
        item.addEventListener('mouseenter', function() {
          if (color !== o.currentColor) item.style.borderColor = 'var(--vscode-focusBorder)';
        });
        item.addEventListener('mouseleave', function() {
          if (color !== o.currentColor && idx !== self._focusIdx) item.style.borderColor = 'transparent';
        });
        item.addEventListener('click', function() {
          if (typeof o.onSelect === 'function') o.onSelect(color);
          self.close();
        });
        grid.appendChild(item);
        self._colorItems.push({ el: item, color: color });
      })(i, colors[i]);
    }

    self._focusIdx = focusIdx;
    self._cols = cols;
    self._rows = Math.ceil(colors.length / cols);

    function updateFocus(newIdx) {
      if (newIdx < 0 || newIdx >= self._colorItems.length) return;
      var prev = self._colorItems[self._focusIdx].el;
      var next = self._colorItems[newIdx].el;
      if (prev) {
        prev.style.borderColor = (prev.style.backgroundColor === o.currentColor) ? '#fff' : 'transparent';
        prev.style.boxShadow = (prev.style.backgroundColor === o.currentColor) ? '0 0 0 2px var(--vscode-focusBorder)' : 'none';
      }
      self._focusIdx = newIdx;
      next.focus();
      next.style.borderColor = 'var(--vscode-focusBorder)';
      next.style.boxShadow = '0 0 0 2px var(--vscode-focusBorder)';
    }

    grid.addEventListener('keydown', function(e) {
      var fi = self._focusIdx;
      var total = self._colorItems.length;
      var c = self._cols;
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (fi + 1 < total) updateFocus(fi + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (fi > 0) updateFocus(fi - 1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (fi + c < total) updateFocus(fi + c);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (fi - c >= 0) updateFocus(fi - c);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var sel = self._colorItems[fi];
        if (sel && typeof o.onSelect === 'function') {
          o.onSelect(sel.color);
          self.close();
        }
      }
    });

    this._popup = new componentWindow({
      title: 'Select Color',
      content: grid,
      showCancel: true,
      showAccept: false,
      cancelText: 'Cancel',
      onCancel: function() {
        if (typeof o.onCancel === 'function') o.onCancel();
        self.close();
      }
    }).show();

    // Focus initial item after popup renders
    setTimeout(function() {
      var it = self._colorItems[self._focusIdx];
      if (it) {
        it.el.focus();
        it.el.style.borderColor = 'var(--vscode-focusBorder)';
        it.el.style.boxShadow = '0 0 0 2px var(--vscode-focusBorder)';
      }
    }, 50);

    return this;
  }

  close() {
    if (this._popup) {
      this._popup.close();
      this._popup = null;
    }
  }
}
