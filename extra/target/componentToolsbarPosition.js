class ComponentToolbarPosition {
  constructor(parent, options) {
    this.parent = typeof parent === 'string' ? document.getElementById(parent) : parent;
    this.options = options || {};
    this.el = null;
    this._keydownHandler = this._onKeydown.bind(this);
  }

  _onKeydown(e) {
    if(!this.parent || !this.el) return;
    // Skip if any popup overlay is active
    if(document.querySelector('.cp-popup-overlay')) return;
    var isSelected = this.parent.classList.contains('wf-node-selected');
    if(!isSelected) return;
    var items = this.options.items || [];
    for(var i = 0; i < items.length; i++) {
      var item = items[i];
      if(!item.hotKey) continue;
      if(e.key === item.hotKey || e.code === item.hotKey) {
        e.preventDefault();
        if(item.onPointerDown) item.onPointerDown(e);
        else if(item.onClick) item.onClick(e);
        return;
      }
    }
  }

  render() {
    if (this.el) this.destroy();
    var box = document.createElement('div');
    var dir = this.options.direction || 'horizontal';
    box.className = 'wf-toolbar-pos wf-toolbar-pos-' + dir;
    if (this.options.className) box.className += ' ' + this.options.className;
    box.style.position = 'absolute';
    if (this.options.right !== undefined) {
      box.style.right = this.options.right + 'px';
      box.style.left = 'auto';
    } else {
      box.style.left = (this.options.x || 0) + 'px';
    }
    if (this.options.bottom !== undefined) {
      box.style.bottom = this.options.bottom + 'px';
      box.style.top = 'auto';
    } else if (this.options.top !== undefined) {
      box.style.top = this.options.top + 'px';
    } else {
      box.style.top = (this.options.y || 0) + 'px';
    }

    var items = this.options.items || [];
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var span = document.createElement('span');
      span.className = 'wf-toolbar-item' + (item.className ? ' ' + item.className : '');
      span.title = item.title || '';
      span.innerHTML = item.html || '';
      if (item.style) {
        for (var k in item.style) span.style[k] = item.style[k];
      }
      if (item.onClick) span.addEventListener('click', item.onClick);
      if (item.onPointerDown) span.addEventListener('pointerdown', item.onPointerDown);
      box.appendChild(span);
    }

    this.parent.appendChild(box);
    this.el = box;
    document.addEventListener('keydown', this._keydownHandler);
    return this;
  }

  destroy() {
    document.removeEventListener('keydown', this._keydownHandler);
    if (this.el && this.el.parentNode) {
      this.el.parentNode.removeChild(this.el);
    }
    this.el = null;
  }

  setPosition(x, y) {
    if (!this.el) return;
    if (x !== undefined) this.el.style.left = x + 'px';
    if (y !== undefined) this.el.style.top = y + 'px';
  }

  setRightBottom(right, bottom) {
    if (!this.el) return;
    if (right !== undefined) { this.el.style.right = right + 'px'; this.el.style.left = 'auto'; }
    if (bottom !== undefined) { this.el.style.bottom = bottom + 'px'; this.el.style.top = 'auto'; }
  }
}
