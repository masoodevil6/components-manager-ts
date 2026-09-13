    function dfmShowSettings() {
      var win = new DfmComponentWindow({
        title: 'تنظیمات',
        width: '520px',
        bodyHtml: '<div id="dfmSettingsCollapses"></div>',
        escapeHtml: dfmEscapeHtml,
      });
      win.show();
      window._dfmSettingsWin = win;
      var foot = win.getFooterEl();
      var closeBtn = document.createElement('button');
      closeBtn.className = 'dfm-btn dfm-btn-secondary';
      closeBtn.textContent = 'بستن';
      closeBtn.onclick = function() { win.close(); };
      foot.appendChild(closeBtn);

      var container = document.getElementById('dfmSettingsCollapses');

      var selectPanel = new DfmComponentCollapse({
        id: 'dfmSettingsPortalSelect',
        title: 'انتخاب پورتال',
        searchable: false,
        open: true,
      });
      container.appendChild(selectPanel.getElement());
      selectPanel.getContentEl().id = 'dfmPortalSelectWrap';

      var portalPanel = new DfmComponentCollapse({
        id: 'dfmSettingsPortal',
        title: 'نصب بات در پورتال',
        searchable: false,
        open: true,
      });
      container.appendChild(portalPanel.getElement());
      portalPanel.getContentEl().id = 'dfmPortalStatusWrap';

      dfmLoadPortalSelect();
      if (dfmSelectedPortalId) {
        dfmRefreshPortalStatus();
      }
    }

    var dfmSelectedPortalId = parseInt(localStorage.getItem('dfmSelectedPortalId')) || 0;

    function dfmLoadPortalSelect() {
      var wrap = document.getElementById('dfmPortalSelectWrap');
      if (!wrap) return;
      wrap.innerHTML = '<div style="text-align:center;padding:12px;color:var(--c-text-3)">در حال بارگذاری...</div>';
      dfmApi('portal_list').then(function(res) {
        if (!res.ok || !res.data) { wrap.innerHTML = '<div class="dfm-portal-empty">خطا در دریافت لیست پورتال‌ها</div>'; return; }
        var portals = res.data;
        var html = '<select id="dfmPortalSelectMain" class="dfm-input" style="width:100%" onchange="dfmOnPortalSelectChange()">';
        html += '<option value="0">— انتخاب پورتال —</option>';
        for (var i = 0; i < portals.length; i++) {
          var sel = (portals[i].id === dfmSelectedPortalId) ? ' selected' : '';
          html += '<option value="' + portals[i].id + '"' + sel + '>' + dfmEscapeHtml(portals[i].name) + ' (ID: ' + portals[i].id + ')</option>';
        }
        html += '</select>';
        wrap.innerHTML = html;
        if (dfmSelectedPortalId) {
          dfmRefreshPortalStatus();
        }
      });
    }

    function dfmOnPortalSelectChange() {
      var sel = document.getElementById('dfmPortalSelectMain');
      dfmSelectedPortalId = sel ? parseInt(sel.value) || 0 : 0;
      localStorage.setItem('dfmSelectedPortalId', dfmSelectedPortalId);
      dfmRefreshPortalStatus();
      dfmLoadForms();
    }

    function dfmRefreshPortalStatus() {
      var wrap = document.getElementById('dfmPortalStatusWrap');
      if (!wrap) return;
      if (!dfmSelectedPortalId) {
        wrap.innerHTML = '<div class="dfm-portal-empty">ابتدا پورتال را انتخاب کنید</div>';
        return;
      }
      wrap.innerHTML = '<div style="text-align:center;padding:20px;color:var(--c-text-3)">در حال بارگذاری...</div>';
      dfmApi('portal_status', { portal_id: dfmSelectedPortalId }).then(function(res) {
        if (!res.ok || !res.data) { wrap.innerHTML = '<div class="dfm-portal-empty">خطا در دریافت وضعیت</div>'; return; }
        var d = res.data;
        if (d.installed) {
          var publicUrl = location.origin + '/?page=' + encodeURIComponent(d.portal_path);
          wrap.innerHTML =
            '<div class="dfm-portal-installed-item">' +
              '<div class="dfm-portal-installed-info">' +
                '<div class="dfm-portal-installed-name">نصب شده ✓ (پورتال ID: ' + d.portal_id + ')</div>' +
                '<div class="dfm-portal-installed-path">' + dfmEscapeHtml(d.portal_path) + '</div>' +
                '<div class="dfm-portal-installed-url">' + dfmEscapeHtml(publicUrl) + '</div>' +
              '</div>' +
              '<div class="dfm-portal-installed-actions">' +
                '<button class="dfm-btn dfm-btn-sm dfm-btn-secondary" onclick="dfmCopyPortalUrl(\'' + publicUrl.replace(/'/g, "\\'") + '\')">کپی URL</button>' +
                '<button class="dfm-btn dfm-btn-sm dfm-btn-danger" onclick="dfmUninstallFromPortal()">حذف نصب</button>' +
              '</div>' +
            '</div>';
        } else {
          wrap.innerHTML =
            '<div class="dfm-portal-install-form">' +
              '<div style="margin-bottom:10px;color:var(--c-text-3);font-size:13px">بات در این پورتال نصب نشده است</div>' +
              '<label class="dfm-field-label">مسیر (slug)</label>' +
              '<div class="dfm-portal-slug-row"><span class="dfm-portal-slug-prefix">/form/</span><input id="dfmPortalSlug" type="text" class="dfm-input" placeholder="مثلاً documents" /></div>' +
              '<label class="dfm-field-label">عنوان</label>' +
              '<input id="dfmPortalTitle" type="text" class="dfm-input" placeholder="عنوان در پورتال" />' +
              '<label class="dfm-portal-checkbox-row"><input type="checkbox" id="dfmPortalCaptcha" /> فعال‌سازی کپچا</label>' +
              '<button class="dfm-btn dfm-btn-primary" id="dfmPortalInstallBtn" onclick="dfmInstallToPortal()" style="margin-top:8px;width:100%">نصب در پورتال</button>' +
            '</div>';
        }
      });
    }

    function dfmSyncPortalConfig(portalFormId, slug, useCaptcha) {
      var portalId = dfmSelectedPortalId;
      dfmApi('portal_install', { portal_id: portalId, portal_slug: slug, portal_form_id: portalFormId, use_captcha: useCaptcha }, 'POST').then(function(res) {
        if (!res.ok) throw new Error(res.error && res.error.message || 'خطا');
        dfmToast('success', 'همگام شد', 'کانفیگ محلی با پورتال همگام شد');
        dfmRefreshPortalStatus();
      }).catch(function(err) {
        dfmToast('error', 'خطا', err.message || 'همگام‌سازی ناموفق');
      });
    }

    function dfmInstallToPortal() {
      var slug = document.getElementById('dfmPortalSlug').value.trim();
      var title = document.getElementById('dfmPortalTitle').value.trim();
      var useCaptcha = document.getElementById('dfmPortalCaptcha').checked ? 1 : 0;
      var portalId = dfmSelectedPortalId;
      if (!portalId) { dfmToast('error', 'خطا', 'انتخاب پورتال الزامی است'); return; }
      if (!slug) { dfmToast('error', 'خطا', 'مسیر الزامی است'); return; }
      var btn = document.getElementById('dfmPortalInstallBtn');
      if (btn) { btn.disabled = true; btn.textContent = 'در حال نصب...'; }
      var details = JSON.stringify({ id: 0, command_id: { run_path: '2/documnet_form_manager' }, use_captcha: useCaptcha, title: title || slug, path: slug });
      var fd = new FormData();
      fd.append('details_0', details);
      fetch('/portal/site/update_forms?m=' + portalId, { method: 'POST', body: fd })
        .then(function(r) { return r.text(); })
        .then(function() {
          return fetch('/portal/site/forms?m=' + portalId).then(function(r) { return r.text(); });
        })
        .then(function(text) {
          var match = text.match(/loadSiteForms\((\{.*\})\)/);
          var portalFormId = 0;
          if (match) {
            try {
              var data = JSON.parse(match[1]);
              if (data.items) {
                for (var i = 0; i < data.items.length; i++) {
                  if (data.items[i].path === '/form/' + slug) { portalFormId = data.items[i].id; break; }
                }
              }
            } catch (e) {}
          }
          return dfmApi('portal_install', { portal_id: portalId, portal_slug: slug, portal_form_id: portalFormId, use_captcha: useCaptcha }, 'POST');
        })
        .then(function(res) {
          if (!res.ok) throw new Error(res.error && res.error.message || 'خطا');
          dfmToast('success', 'نصب شد', 'بات در پورتال نصب شد');
          dfmRefreshPortalStatus();
        })
        .catch(function(err) {
          dfmToast('error', 'خطا', err.message || 'نصب ناموفق');
        })
        .then(function() { if (btn) { btn.disabled = false; btn.textContent = 'نصب در پورتال'; } });
    }

    function dfmUninstallFromPortal() {
      var dialog = new DfmComponentWindowConfirm({
        title: 'حذف نصب از پورتال',
        message: 'حذف نصب بات از پورتال؟ کاربران سایت دیگر به فرم‌ها دسترسی نخواهند داشت.',
        confirmText: 'حذف نصب',
        confirmClass: 'dfm-btn-danger',
        cancelText: 'انصراف',
        escapeHtml: dfmEscapeHtml,
        onConfirm: function() {
          var BOT_RUN_PATH = '2/documnet_form_manager';
          var portalId = dfmSelectedPortalId;
          dfmApi('portal_status', portalId ? { portal_id: portalId } : {}).then(function(res) {
            var localPortalFormId = (res.ok && res.data && res.data.portal_form_id) || 0;
            return fetch('/portal/site/forms?m=' + portalId).then(function(r) { return r.text(); }).then(function(text) {
              var match = text.match(/loadSiteForms\((\{.*\})\)/);
              var portalFormId = localPortalFormId;
              if (match) {
                try {
                  var data = JSON.parse(match[1]);
                  var items = data.items || [];
                  for (var i = 0; i < items.length; i++) {
                    var cmd = items[i].command_id || {};
                    if (cmd.run_path === BOT_RUN_PATH) { portalFormId = items[i].id; break; }
                  }
                } catch(e) {}
              }
              if (!portalFormId) throw new Error('فرم پورتال پیدا نشد');
              var fd = new FormData();
              fd.append('deleted_details', portalFormId);
              return fetch('/portal/site/update_forms?m=' + portalId, { method: 'POST', body: fd });
            });
          }).then(function() {
            return dfmApi('portal_uninstall', { portal_id: portalId }, 'POST');
          }).then(function(res) {
            if (!res.ok) throw new Error(res.error && res.error.message || 'خطا');
            dfmToast('success', 'حذف شد', 'نصب از پورتال حذف شد');
          }).catch(function(err) {
            dfmToast('error', 'خطا', err.message || 'حذف ناموفق');
          }).then(function() {
            dfmRefreshPortalStatus();
          });
        },
      });
      dialog.show();
    }

    function dfmCopyPortalUrl(url) {
      navigator.clipboard.writeText(url).then(function() {
        dfmToast('success', 'کپی شد', 'URL در کلیپ‌بورد کپی شد');
      }).catch(function() {
        dfmToast('error', 'خطا', 'کپی ناموفق');
      });