    var BOT_URL = "{{BOT_URL}}";

    // ── پر کردن آیکون‌های HTML از DfmIcon ──
    function dfmFillIconSlots() {
      var slots = document.querySelectorAll('#dfm-app .dfm-icon-slot');
      slots.forEach(function(slot) {
        if (slot.dataset.filled) return;
        var name = slot.dataset.icon;
        var size = parseInt(slot.dataset.size, 10) || 16;
        if (typeof DfmIcon !== 'undefined' && DfmIcon[name]) {
          slot.innerHTML = DfmIcon[name]({ size: size, primaryColor: 'currentColor' });
          slot.dataset.filled = '1';
        }
      });
    }
    dfmFillIconSlots();

    var dfmSearchTimer = null;
    var dfmEditingId = null;
    var dfmSelectedFolderId = null;
    var dfmSelectedTemplateId = null;
    var dfmFolderCache = {};
    var dfmClientTemplateInput = null;
    var dfmLastHtmlContent = null;
    var dfmBreadcrumb = null;
    var dfmNameInput = null;
    var dfmFileInput = null;

    function dfmApi(action, params, method) {
      method = method || 'GET';
      var url = BOT_URL + '?action=' + action;
      var opts = { method: method, headers: {} };
      if (method === 'POST') {
        var fd = new FormData();
        if (params) {
          for (var k in params) {
            if (params[k] != null) fd.append(k, params[k]);
          }
        }
        opts.body = fd;
      } else {
        if (params) {
          var qs = [];
          for (var k in params) { if (params[k] != null) qs.push(k + '=' + encodeURIComponent(params[k])); }
          if (qs.length) url += '&' + qs.join('&');
        }
      }
      return fetch(url, opts).then(function(r) {
        var ct = r.headers.get('content-type') || '';
        if (ct.indexOf('application/json') >= 0) return r.json();
        return r.text().then(function(text) {
          return { ok: false, error: { code: 'bad_response', message: 'پاسخ سرور JSON نیست — احتمالاً صفحه HTML بات برگشته است' } };
        });
      });
    }

    function dfmToast(type, title, message, duration) {
      var wrap = document.getElementById('dfmToastWrap');
      if (!wrap) return;
      var iconMap = { success: 'check', error: 'close', info: 'list' };
      var iconName = iconMap[type] || 'list';
      var el = document.createElement('div');
      el.className = 'dfm-toast dfm-toast-' + type;
      el.innerHTML =
        '<span class="dfm-toast-icon">' + (DfmIcon[iconName] ? DfmIcon[iconName]({ size: 20 }) : '') + '</span>' +
        '<div class="dfm-toast-body">' +
          (title ? '<div class="dfm-toast-title">' + dfmEscapeHtml(title) + '</div>' : '') +
          (message ? '<div class="dfm-toast-msg">' + dfmEscapeHtml(message) + '</div>' : '') +
        '</div>' +
        '<button class="dfm-toast-close">' + (DfmIcon.close ? DfmIcon.close({ size: 16 }) : '×') + '</button>';
      wrap.appendChild(el);
      var removeToast = function() {
        el.classList.add('dfm-toast-out');
        setTimeout(function() { if (el.parentNode) el.parentNode.removeChild(el); }, 300);
      };
      el.querySelector('.dfm-toast-close').onclick = removeToast;
      setTimeout(removeToast, duration || 3500);
    }


    function dfmGoList() {
      dfmShowPage('list');
    }

    function dfmShowPage(page) {
      var pages = ['home', 'list', 'form', 'schema', 'preview', 'report'];
      pages.forEach(function(p) {
        var el = document.getElementById('dfmPage' + p.charAt(0).toUpperCase() + p.slice(1));
        if (el) {
          el.classList.remove('active');
          el.classList.remove('dfm-slide-in');
        }
      });
      var target = document.getElementById('dfmPage' + page.charAt(0).toUpperCase() + page.slice(1));
      if (target) {
        target.classList.add('active');
        // ری‌تریکر انیمیشن برای اجرای مجدد در هر تغییر صفحه
        void target.offsetWidth;
        target.classList.add('dfm-slide-in');
      }
      dfmRenderBreadcrumb(page);
      dfmRenderHeaderActions(page);
    }

    // ── رندر دکمه‌های هدر بر اساس صفحه ──
    function dfmRenderHeaderActions(page) {
      var el = document.getElementById('dfmHeaderActions');
      var html = '';
      if (page === 'home') {
        // no actions on home page
      } else if (page === 'list') {
        html += '<button class="dfm-btn dfm-btn-secondary" onclick="dfmShowSettings()"><span class="dfm-icon-slot" data-icon="settings" data-size="16"></span> تنظیمات</button>';
        html += '<button class="dfm-btn dfm-btn-primary" onclick="dfmOpenCreate()"><span class="dfm-icon-slot" data-icon="plus" data-size="16"></span> فرم جدید</button>';
      } else if (page === 'form') {
        html += '<button class="dfm-btn dfm-btn-primary" onclick="dfmSave()">ذخیره</button>';
        html += '<button class="dfm-btn dfm-btn-secondary" onclick="dfmGoList()">انصراف</button>';
      } else if (page === 'schema' || page === 'preview') {
        html += '<button class="dfm-btn dfm-btn-secondary" onclick="dfmShowPage(\'form\')">بازگشت به فرم</button>';
      } else if (page === 'report') {
        html += '<button class="dfm-btn dfm-btn-secondary" onclick="dfmShowPage(\'form\')">بازگشت به فرم</button>';
      }
      el.innerHTML = html;
      dfmFillIconSlots();
    }


    }

    function dfmRenderBreadcrumb(page) {
      var crumbs = [];
      crumbs.push({ label: 'خانه', value: 'home', current: page === 'home' });
      if (page === 'list' || page === 'form' || page === 'schema' || page === 'preview' || page === 'report') {
        crumbs.push({ label: 'فرم‌های سایت', value: 'list', current: page === 'list' });
      }
      if (page === 'form' || page === 'schema' || page === 'preview' || page === 'report') {
        crumbs.push({ label: dfmEditingId ? 'ویرایش فرم' : 'فرم جدید', value: 'form', current: page === 'form' });
      }
      if (page === 'schema') {
        crumbs.push({ label: 'ساختار', value: 'schema', current: true });
      }
      if (page === 'preview') {
        crumbs.push({ label: 'پیش‌نمایش', value: 'preview', current: true });
      }
      if (page === 'report') {
        crumbs.push({ label: 'گزارش', value: 'report', current: true });
      }

      if (!dfmBreadcrumb) {
        dfmBreadcrumb = new DfmComponentBreadcrumb({
          container: document.getElementById('dfmBreadcrumbContainer'),
          items: crumbs,
          showBack: page !== 'home',
          onSelect: function(value) { dfmShowPage(value); },
          onBack: function() {
            if (page === 'form' || page === 'schema' || page === 'preview' || page === 'report') dfmShowPage('list');
            else dfmShowPage('home');
          }
        });
      } else {
        dfmBreadcrumb.setItems(crumbs);


    function dfmDebouncedSearch() {
      if (dfmSearchTimer) clearTimeout(dfmSearchTimer);
      dfmSearchTimer = setTimeout(function() {
        dfmLoadForms(document.getElementById('dfmSearch').value.trim());
      }, 300);
    }

    function dfmEscapeHtml(s) {
      var div = document.createElement('div');
      div.textContent = s || '';
      return div.innerHTML;
    }