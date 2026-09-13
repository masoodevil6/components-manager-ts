    function dfmLoadForms(search) {
      var params = {};
      if (search) params.search = search;
      if (dfmSelectedPortalId) params.portal_id = dfmSelectedPortalId;
      dfmApi('list', params).then(function(res) {
        dfmRenderList(res.ok ? (res.data || []) : []);
      });
    }

    function dfmRenderList(forms) {
      var el = document.getElementById('dfmList');
      el.innerHTML = '';
      if (!forms.length) {
        el.innerHTML = '<div class="dfm-empty"><p>هنوز فرمی ساخته نشده</p><p style="font-size:13px">با کلیک روی «فرم جدید» شروع کنید</p></div>';
        return;
      }
      var listTable = new DfmComponentTable({
        container: el,
        emptyText: 'هنوز فرمی ساخته نشده',
        escapeHtml: dfmEscapeHtml,
        columns: [
          { key: 'name', label: 'نام فرم', render: function(row) {
            return '<a href="javascript:void(0)" onclick="dfmOpenForm(' + row.id + ')" style="font-weight:600;color:var(--c-text)">' + dfmEscapeHtml(row.name) + '</a>';
          }},
          { key: 'form_key', label: 'کلید فرم', render: function(row) {
            if (!row.form_key) return '<span style="color:var(--c-text-3);font-size:11px">—</span>';
            return '<code style="font-size:11px;background:var(--c-bg-2);padding:2px 6px;border-radius:4px">' + dfmEscapeHtml(row.form_key) + '</code>';
          }},
          { key: 'schema_version', label: 'نسخه', render: function(row) {
            return '<span class="dfm-ver-badge">v' + (row.schema_version || 1) + '</span>';
          }},
          { key: 'response_count', label: 'پاسخ‌ها', render: function(row) {
            var cnt = row.response_count || 0;
            var cls = cnt > 0 ? 'dfm-badge dfm-badge-on' : 'dfm-badge dfm-badge-off';
            return '<span class="' + cls + '">' + cnt + '</span>';
          }},
          { key: 'doc_link', label: 'سند', render: function(row) {
            if (!row.doc_id) return '<span style="color:var(--c-text-3);font-size:11px">—</span>';
            var url = 'https://maarefian.teamyar.com/?page=/document/file/show_version/' + row.doc_id + '&back_id=' + (row.doc_parent_id || '');
            var label = row.doc_name || ('سند ' + row.doc_id);
            return '<a href="' + url + '" target="_blank" class="dfm-ver-btn" title="' + dfmEscapeHtml(label) + '"><span class="dfm-icon-slot" data-icon="fileText" data-size="12"></span> ' + dfmEscapeHtml(label) + '</a>';
          }},
          { key: 'folder_link', label: 'پوشه', render: function(row) {
            if (!row.doc_parent_id) return '<span style="color:var(--c-text-3);font-size:11px">—</span>';
            var url = 'https://maarefian.teamyar.com/?page=/document/index/show/' + row.doc_parent_id;
            var label = row.folder_name || ('پوشه ' + row.doc_parent_id);
            return '<a href="' + url + '" target="_blank" class="dfm-ver-btn" title="' + dfmEscapeHtml(label) + '"><span class="dfm-icon-slot" data-icon="folderOpen" data-size="12"></span> ' + dfmEscapeHtml(label) + '</a>';
          }},
          { key: 'created_at', label: 'تاریخ ایجاد', render: function(row) {
            return row.created_at ? new Date(row.created_at).toLocaleDateString('fa-IR') : '-';
          }},
          { key: 'actions', label: 'عملیات', render: function(row) {
            var actions = '<div class="dfm-ver-actions">';
            if (row.form_key) {
              var formUrl = location.origin + '/?page=/bot/run/2/documnet_form_manager&unique=' + encodeURIComponent(row.form_key) + '&type=test';
              actions += '<button class="dfm-btn dfm-btn-sm dfm-btn-secondary" onclick="dfmCopyFormUrl(\'' + formUrl.replace(/'/g, "\\'") + '\')" title="کپی لینک فرم">لینک</button>';
              actions += '<button class="dfm-btn dfm-btn-sm dfm-btn-secondary" onclick="window.open(\'' + formUrl.replace(/'/g, "\\'") + '\', \'_blank\')" title="نمایش فرم">نمایش</button>';
              actions += '<button class="dfm-btn dfm-btn-sm dfm-btn-secondary" onclick="dfmShowInstallCode(\'' + dfmEscapeHtml(row.form_key).replace(/'/g, "\\'") + '\')" title="کد نصب فرم"><span class="dfm-icon-slot" data-icon="code" data-size="12"></span> کد نصب</button>';
            }
            actions += '<button class="dfm-btn dfm-btn-sm dfm-btn-secondary" onclick="dfmEditForm(' + row.id + ')">ویرایش</button>';
            actions += '<button class="dfm-btn dfm-btn-sm dfm-btn-danger" onclick="dfmDeleteForm(' + row.id + ',\'' + dfmEscapeHtml(row.name).replace(/'/g, "\\'") + '\')">حذف</button>';
            actions += '</div>';
            return actions;
          }},
        ],
      });
      listTable.setData(forms);
      dfmFillIconSlots();
    }

    function dfmOpenForm(id) {
      dfmApi('get', { id: id }).then(function(res) {
        if (res.ok && res.data) {
          dfmToast('info', 'فرم: ' + res.data.name, 'پاسخ‌ها: ' + (res.data.responses ? res.data.responses.length : 0));
        }
      });
    }

    function dfmCopyFormUrl(url) {
      navigator.clipboard.writeText(url).then(function() {
        dfmToast('success', 'لینک کپی شد', 'لینک فرم در حافظه کپی شد');
      }).catch(function() {
        var ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        dfmToast('success', 'لینک کپی شد', 'لینک فرم در حافظه کپی شد');
      });
    }

    function dfmShowInstallCode(formKey, version) {
      var apiUrl = BOT_URL + '?action=install_info';
      fetch(apiUrl, { method: 'POST' })
        .then(function(res) { return res.json(); })
        .then(function(info) {
          var data = info.data || info;
          var baseUrl = data.server_url || location.origin;
          var portalFormPath = data.portal_form_path || '';
          var portalDomain = data.portal_domain || '';
          var botPath = data.bot_path || '/bot/run/2/documnet_form_manager';

          var formUrl, code;
          if (portalFormPath) {
            formUrl = portalFormPath + '?unique=' + encodeURIComponent(formKey) + '&type=form';
            if (version) formUrl += '&var=' + version;
            code = '';
            code += '<!-- کانتینر فرم -->\n';
            code += '<div id="dfm-form-container-' + formKey + '"></div>\n\n';
            code += '<script>\n';
            code += '(function() {\n';
            code += '  var container = document.getElementById(\'dfm-form-container-' + formKey + '\');\n';
            code += '  if (!container) { console.error(\'کانتینر فرم پیدا نشد\'); return; }\n\n';
            code += '  fetch(\'' + formUrl + '\')\n';
            code += '    .then(function(res) { return res.json(); })\n';
            code += '    .then(function(data) {\n';
            code += '      if (data.error) { container.innerHTML = \'<p>\' + data.error + \'</p>\'; return; }\n\n';
            code += '      container.innerHTML = data.template;\n\n';
            code += '      if (data.script) {\n';
            code += '        var scriptEl = document.createElement(\'script\');\n';
            code += '        scriptEl.textContent = data.script;\n';
            code += '        container.appendChild(scriptEl);\n';
            code += '      }\n';
            code += '    })\n';
            code += '    .catch(function(err) { console.error(\'خطا در بارگذاری فرم:\', err); });\n';
            code += '})();\n';
            code += '<\/script>';
          } else {
            formUrl = baseUrl + '/?page=' + botPath + '&unique=' + encodeURIComponent(formKey) + '&type=form';
            if (version) formUrl += '&var=' + version;
            code = '';
            code += '<!-- کانتینر فرم -->\n';
            code += '<div id="dfm-form-container-' + formKey + '"></div>\n\n';
            code += '<script>\n';
            code += '(function() {\n';
            code += '  var container = document.getElementById(\'dfm-form-container-' + formKey + '\');\n';
            code += '  if (!container) { console.error(\'کانتینر فرم پیدا نشد\'); return; }\n\n';
            code += '  fetch(\'' + formUrl + '\')\n';
            code += '    .then(function(res) { return res.json(); })\n';
            code += '    .then(function(data) {\n';
            code += '      if (data.error) { container.innerHTML = \'<p>\' + data.error + \'</p>\'; return; }\n\n';
            code += '      container.innerHTML = data.template;\n\n';
            code += '      if (data.script) {\n';
            code += '        var scriptEl = document.createElement(\'script\');\n';
            code += '        scriptEl.textContent = data.script;\n';
            code += '        container.appendChild(scriptEl);\n';
            code += '      }\n';
            code += '    })\n';
            code += '    .catch(function(err) { console.error(\'خطا در بارگذاری فرم:\', err); });\n';
            code += '})();\n';
            code += '<\/script>';
          }

          var portalInfo = '';
          if (data.portal_name) {
            portalInfo += '<div style="font-size:12px;color:var(--c-text-3);margin-bottom:4px">پورتال: ' + dfmEscapeHtml(data.portal_name) + '</div>';
          }
          if (portalFormPath) {
            portalInfo += '<div style="font-size:12px;color:var(--c-text-3);margin-bottom:4px">مسیر فرم در پورتال: ' + dfmEscapeHtml(portalFormPath) + '</div>';
          }

          var win = new DfmComponentWindow({
            title: 'کد نصب فرم',
            width: '640px',
            bodyHtml: '<div style="margin-bottom:12px;display:flex;gap:8px;align-items:center">'
              + '<span style="font-size:13px;color:var(--c-text-3)">آدرس فرم:</span>'
              + '<code style="font-size:11px;background:var(--c-bg-2);padding:2px 6px;border-radius:4px;flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">' + dfmEscapeHtml(formUrl) + '</code>'
              + '<button class="dfm-btn dfm-btn-sm dfm-btn-secondary" onclick="dfmCopyInstallCode()">کپی کد</button>'
              + '</div>'
              + portalInfo
              + '<pre id="dfmInstallCodePre" style="background:var(--c-bg-2);border:1px solid var(--c-border-light);border-radius:8px;padding:16px;font-size:12px;line-height:1.6;overflow:auto;max-height:400px;direction:ltr;text-align:left;white-space:pre-wrap;word-break:break-all">' + dfmEscapeHtml(code) + '</pre>',
            escapeHtml: dfmEscapeHtml,
          });
          win.show();
          window._dfmInstallCode = code;
        })
        .catch(function(err) {
          console.error('install_info error:', err);
          dfmToast('error', 'خطا', 'دریافت اطلاعات نصب ناموفق بود');
        });
    }

    function dfmCopyInstallCode() {
      var code = window._dfmInstallCode || '';
      navigator.clipboard.writeText(code).then(function() {
        dfmToast('success', 'کپی شد', 'کد نصب در حافظه کپی شد');
      }).catch(function() {
        var ta = document.createElement('textarea');
        ta.value = code;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        dfmToast('success', 'کپی شد', 'کد نصب در حافظه کپی شد');
      });
    }

    function dfmSetFieldsLocked(locked) {
      if (dfmNameInput) dfmNameInput.setDisabled(locked);
      var folderWrap = document.getElementById('dfmFolderPanelContainer');
      if (locked) {
        if (folderWrap) folderWrap.classList.add('dfm-field-locked');
      } else {
        if (folderWrap) folderWrap.classList.remove('dfm-field-locked');
      }
    }

    function dfmOpenCreate() {
      dfmEditingId = null;
      dfmSelectedFolderId = null;
      dfmSelectedTemplateId = null;
      dfmFolderPanel.hideBadge();
      dfmFolderPanel.clearSearch();
      if (dfmFolderTree) dfmFolderTree.clearSelection();
      dfmLastHtmlContent = null;
      document.getElementById('dfmFormTitle').textContent = 'فرم جدید';
      if (dfmNameInput) dfmNameInput.setValue('');
      if (dfmFileInput) { dfmFileInput.clear(); dfmFileInput.setError(''); }
      if (dfmFileInput) { dfmFileInput.setButtonDisabled('dfmSchemaBtn', true); dfmFileInput.setButtonDisabled('dfmPreviewBtn', true); }
      dfmSetFieldsLocked(false);
      document.getElementById('dfmVersionsSection').style.display = 'none';
      var badge = document.getElementById('dfmNextVersionBadge');
      if (badge) badge.style.display = 'none';
      dfmShowPage('form');
      dfmLoadClientTemplates();
      dfmLoadFolders();
    }


    function dfmEditForm(id) {
      dfmApi('get', { id: id }).then(function(res) {
        if (!res.ok || !res.data) return;
        var f = res.data;
        dfmEditingId = id;
        dfmSelectedFolderId = f.doc_parent_id || null;
        dfmSelectedTemplateId = f.client_template_id || null;
        dfmLastHtmlContent = null;
        document.getElementById('dfmFormTitle').textContent = 'ویرایش فرم';
        if (dfmNameInput) dfmNameInput.setValue(f.name || '');
        if (dfmFileInput) { dfmFileInput.clear(); dfmFileInput.setError(''); }
        if (dfmFileInput) { dfmFileInput.setButtonDisabled('dfmSchemaBtn', true); dfmFileInput.setButtonDisabled('dfmPreviewBtn', true); }
        dfmSetFieldsLocked(true);
        var nextVer = (f.schema_version || 1) + 1;
        var badge = document.getElementById('dfmNextVersionBadge');
        if (badge) { badge.textContent = '→ نسخه ' + nextVer; badge.style.display = 'inline-flex'; }
        dfmShowPage('form');
        dfmLoadClientTemplates();
        dfmLoadFolders();
        dfmLoadVersions(id, f.form_key);
      });
    }


    function dfmSetFileError(message) {
      if (dfmFileInput) dfmFileInput.setError(message || '');
    }

    function dfmClearSelectedFile(message) {
      if (dfmFileInput) dfmFileInput.clear();
      dfmLastHtmlContent = null;
      if (dfmFileInput) { dfmFileInput.setButtonDisabled('dfmSchemaBtn', true); dfmFileInput.setButtonDisabled('dfmPreviewBtn', true); }
      dfmSetFileError(message || '');
    }

    function dfmValidateFormHtml(html) {
      if (!html || !String(html).trim()) return 'فایل HTML خالی است';
      var doc;
      try {
        doc = new DOMParser().parseFromString(html, 'text/html');
      } catch (e) {
        return 'فایل HTML قابل خواندن نیست';
      }
      var parserError = doc.querySelector('parsererror');
      if (parserError) return 'ساختار فایل HTML معتبر نیست';
      var hasForm = doc.querySelector('form');
      var hasFields = doc.querySelector('input, textarea, select');
      if (!hasForm && !hasFields) return 'فایل انتخاب‌شده هیچ فیلد فرم ندارد';
      if (!dfmParseHtmlSchema(html).length) return 'در فرم HTML هیچ فیلد معتبری پیدا نشد';
      return '';
    }

    function dfmOnFileChange(file) {
      dfmSetFileError('');
      dfmLastHtmlContent = null;
      if (dfmFileInput) { dfmFileInput.setButtonDisabled('dfmSchemaBtn', true); dfmFileInput.setButtonDisabled('dfmPreviewBtn', true); }
      if (!file) return;
      if (!/\.html?$/i.test(file.name || '')) {
        dfmClearSelectedFile('فقط فایل HTML با پسوند .html یا .htm قابل قبول است');
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        var htmlContent = e.target.result || '';
        var error = dfmValidateFormHtml(htmlContent);
        if (error) {
          dfmClearSelectedFile(error);
          return;
        }
        dfmLastHtmlContent = htmlContent;
        if (dfmFileInput) { dfmFileInput.setButtonDisabled('dfmSchemaBtn', false); dfmFileInput.setButtonDisabled('dfmPreviewBtn', false); }
      };
      reader.onerror = function() {
        dfmClearSelectedFile('خطا در خواندن فایل');
      };
      reader.readAsText(file);
    }

    function dfmShowSchema() {
      var file = dfmFileInput ? dfmFileInput.getFile() : null;
      if (!file) return;
      if (dfmLastHtmlContent) {
        var schema = dfmParseHtmlSchema(dfmLastHtmlContent);
        dfmRenderSchema(schema);
        dfmShowPage('schema');
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        dfmLastHtmlContent = e.target.result;
        var schema = dfmParseHtmlSchema(dfmLastHtmlContent);
        dfmRenderSchema(schema);
        dfmShowPage('schema');
      };
      reader.readAsText(file);
    }

    function dfmShowPreview() {
      var file = dfmFileInput ? dfmFileInput.getFile() : null;
      if (!file) return;
      var renderPreview = function(html) {
        var frame = document.getElementById('dfmPreviewFrame');
        dfmShowPage('preview');
        frame.removeAttribute('src');
        frame.removeAttribute('srcdoc');
        try {
          var doc = frame.contentWindow && frame.contentWindow.document;
          if (!doc && frame.contentDocument) doc = frame.contentDocument;
          if (doc) {
            doc.open();
            doc.write(html || '');
            doc.close();
            return;
          }
        } catch (e) {}
        frame.srcdoc = html || '';
      };
      if (dfmLastHtmlContent) {
        renderPreview(dfmLastHtmlContent);
        return;
      }
      var reader = new FileReader();
      reader.onload = function(e) {
        dfmLastHtmlContent = e.target.result;
        renderPreview(dfmLastHtmlContent);
      };
      reader.readAsText(file);
    }

    function dfmParseHtmlSchema(html) {
      var fields = [];
      var doc;
      try {
        doc = new DOMParser().parseFromString(html || '', 'text/html');
      } catch (e) {
        return fields;
      }

      function getLabel(el) {
        var id = el.getAttribute('id') || '';
        if (id && doc.querySelector) {
          var labelFor = doc.querySelector('label[for="' + id.replace(/"/g, '\\"') + '"]');
          if (labelFor && labelFor.textContent) return labelFor.textContent.trim();
        }
        var parentLabel = el.closest ? el.closest('label') : null;
        if (parentLabel && parentLabel.textContent) return parentLabel.textContent.trim();
        return el.getAttribute('aria-label') || el.getAttribute('placeholder') || el.getAttribute('title') || '';
      }

      function getCommon(el) {
        return {
          name: el.getAttribute('name') || '',
          id: el.getAttribute('id') || '',
          required: el.hasAttribute('required'),
          placeholder: el.getAttribute('placeholder') || ''
        };
      }

      var controls = Array.prototype.slice.call(doc.querySelectorAll('input, textarea, select'));
      controls.forEach(function(el) {
        var tagName = (el.tagName || '').toLowerCase();
        var a = getCommon(el);
        var displayName = a.name || a.id || '';
        var label = getLabel(el);
        if (tagName === 'input') {
          var type = (el.getAttribute('type') || 'text').toLowerCase();
          if (type === 'submit' || type === 'button' || type === 'reset' || type === 'hidden') return;
          fields.push({ name: displayName, type: type, label: label, required: a.required, placeholder: a.placeholder, options: null });
        } else if (tagName === 'textarea') {
          fields.push({ name: displayName, type: 'textarea', label: label, required: a.required, placeholder: a.placeholder, options: null });
        } else if (tagName === 'select') {
          var options = Array.prototype.slice.call(el.querySelectorAll('option')).map(function(opt) {
            return { value: opt.getAttribute('value') || '', text: (opt.textContent || '').trim() };
          });
          fields.push({ name: displayName, type: 'select', label: label, required: a.required, placeholder: '', options: options });
        }
      });
      return fields;
    }

    function dfmRenderSchema(fields) {
      var container = document.getElementById('dfmSchemaContent');
      if (!fields.length) {
        container.innerHTML = '<div class="dfm-schema-empty">هیچ فیلدی در HTML پیدا نشد</div>';
        return;
      }
      window._dfmSchemaFields = fields;
      var typeCounts = {};
      fields.forEach(function(f) {
        typeCounts[f.type] = (typeCounts[f.type] || 0) + 1;
      });
      var statsHtml = '<div class="dfm-schema-stats">' +
        '<div class="dfm-stat-chip">فیلدها <span class="dfm-stat-num">' + fields.length + '</span></div>';
      Object.keys(typeCounts).forEach(function(t) {
        statsHtml += '<div class="dfm-stat-chip">' + dfmEscapeHtml(t) + ' <span class="dfm-stat-num">' + typeCounts[t] + '</span></div>';
      });
      statsHtml += '</div>';
      var tableHtml = '<div class="dfm-schema-table-wrap"><table class="dfm-schema-table">' +
        '<thead><tr>' +
          '<th class="dfm-schema-col-row">ردیف</th>' +
          '<th>نام</th>' +
          '<th>برچسب</th>' +
          '<th class="dfm-schema-col-type">نوع</th>' +
          '<th class="dfm-schema-col-details">جزئیات</th>' +
        '</tr></thead><tbody>';
      fields.forEach(function(f, idx) {
        var typeClass = 'dfm-type-' + (f.type || 'default');
        var typeLabel = dfmEscapeHtml(f.type || 'text');
        var nameHtml = dfmEscapeHtml(f.name || '(بدون نام)');
        var labelHtml = dfmEscapeHtml(f.label || '-');
        var detailsHtml = '<div class="dfm-schema-detail-list">';
        if (f.required) detailsHtml += '<span class="dfm-schema-required">الزامی</span>';
        if (f.placeholder) detailsHtml += '<span class="dfm-schema-detail-chip">placeholder: ' + dfmEscapeHtml(f.placeholder) + '</span>';
        if (f.options && f.options.length) {
          detailsHtml += '<span class="dfm-schema-options-trigger">' + DfmIcon.gear({ size: 16 }) + '<span class="dfm-schema-options-tooltip">' +
            '<span class="dfm-schema-tooltip-title">گزینه‌های تشخیص داده‌شده</span>';
          f.options.forEach(function(o) {
            detailsHtml += '<span class="dfm-schema-tooltip-option">' + dfmEscapeHtml(o.text || o.value || '-') + '</span>';
          });
          detailsHtml += '</span></span>';
        }
        if (detailsHtml === '<div class="dfm-schema-detail-list">') detailsHtml += '<span class="dfm-schema-detail-chip">-</span>';
        detailsHtml += '</div>';
        tableHtml += '<tr>' +
          '<td class="dfm-schema-col-row"><span class="dfm-schema-row-num">' + (idx + 1) + '</span></td>' +
          '<td><span class="dfm-schema-field-name">' + nameHtml + '</span></td>' +
          '<td><span class="dfm-schema-label">' + labelHtml + '</span></td>' +
          '<td><span class="dfm-schema-type ' + typeClass + '">' + typeLabel + '</span></td>' +
          '<td style="cursor:pointer" onclick="dfmShowFieldDetails(' + idx + ')">' + detailsHtml + '</td>' +
        '</tr>';
      });
      tableHtml += '</tbody></table></div>';
      container.innerHTML = statsHtml + tableHtml;
    }

    function dfmShowFieldDetails(idx) {
      var f = window._dfmSchemaFields && window._dfmSchemaFields[idx];
      if (!f) return;
      var rows = [
        { label: 'نام', value: f.name || '(بدون نام)' },
        { label: 'برچسب', value: f.label || '-' },
        { label: 'نوع', value: f.type || 'text' },
        { label: 'الزامی', value: f.required ? 'بله' : 'خیر' },
        { label: 'Placeholder', value: f.placeholder || '-' },
        { label: 'ID', value: f.id || '-' },
      ];
      var bodyHtml = '<table class="dfm-table" style="width:100%"><tbody>';
      rows.forEach(function(r) {
        bodyHtml += '<tr><td style="font-weight:600;width:120px;color:var(--c-text-2)">' + dfmEscapeHtml(r.label) + '</td>' +
          '<td style="color:var(--c-text)">' + dfmEscapeHtml(r.value) + '</td></tr>';
      });
      bodyHtml += '</tbody></table>';
      if (f.options && f.options.length) {
        bodyHtml += '<div style="margin-top:16px"><div style="font-weight:700;font-size:13px;margin-bottom:8px;color:var(--c-text)">گزینه‌ها:</div>';
        bodyHtml += '<div style="display:flex;flex-wrap:wrap;gap:6px">';
        f.options.forEach(function(o) {
          bodyHtml += '<span class="dfm-schema-detail-chip">' + dfmEscapeHtml(o.text || o.value || '-') + '</span>';
        });
        bodyHtml += '</div></div>';
      }
      var win = new DfmComponentWindow({
        title: 'جزئیات فیلد: ' + (f.name || '(بدون نام)'),
        width: '480px',
        bodyHtml: bodyHtml,
        escapeHtml: dfmEscapeHtml,
      });
      win.show();
      var foot = win.getFooterEl();
      var closeBtn = document.createElement('button');
      closeBtn.className = 'dfm-btn dfm-btn-secondary';
      closeBtn.textContent = 'بستن';
      closeBtn.onclick = function() { win.close(); };
      foot.appendChild(closeBtn);
    }

    var dfmSelectedSubmitSelector = null;

    function dfmSave() {
      var name = dfmNameInput ? dfmNameInput.getValue() : '';
      var file = dfmFileInput ? dfmFileInput.getFile() : null;
      if (!name) { dfmToast('error', 'خطا', 'نام فرم الزامی است'); return; }
      if (!dfmEditingId && !file) { dfmSetFileError('فایل HTML الزامی است'); return; }

      if (file) {
        var useHtmlContent = function(htmlContent) {
          var error = dfmValidateFormHtml(htmlContent);
          if (error) {
            dfmClearSelectedFile(error);
            return;
          }
          dfmDetectButtonsAndProceed(name, htmlContent);
        };
        if (dfmLastHtmlContent) {
          useHtmlContent(dfmLastHtmlContent);
        } else {
          var reader = new FileReader();
          reader.onload = function(e) { useHtmlContent(e.target.result || ''); };
          reader.onerror = function() { dfmClearSelectedFile('خطا در خواندن فایل'); };
          reader.readAsText(file);
        }
      } else {
        dfmDoSave(name, null, false);
      }
    }

    function dfmDetectButtonsAndProceed(name, htmlContent) {
      dfmApi('detect_buttons', { form_html: htmlContent }, 'POST').then(function(res) {
        if (!res.ok || !res.data || !res.data.buttons || res.data.buttons.length === 0) {
          dfmProceedAfterButtons(name, htmlContent, null);
          return;
        }
        dfmShowButtonSelectorModal(res.data, function(selectedSelector) {
          dfmProceedAfterButtons(name, htmlContent, selectedSelector);
        });
      }).catch(function() {
        dfmProceedAfterButtons(name, htmlContent, null);
      });
    }

    function dfmProceedAfterButtons(name, htmlContent, submitSelector) {
      dfmSelectedSubmitSelector = submitSelector;
      if (dfmEditingId) {
        dfmPreviewDiffAndSave(name, htmlContent);
      } else {
        dfmDoSave(name, htmlContent, false);
      }
    }

    var dfmButtonModalWin = null;
    var dfmButtonModalTable = null;
    var dfmButtonModalCallback = null;
    var dfmButtonModalSelected = null;

    function dfmShowButtonSelectorModal(data, onConfirm) {
      var buttons = data.buttons || [];
      var best = data.best;
      dfmButtonModalCallback = onConfirm;
      dfmButtonModalSelected = (best && best.selector) || null;

      var confidenceColors = { HIGH: '#16a34a', MEDIUM: '#d97706', LOW: '#dc2626' };
      var confidenceLabels = { HIGH: 'بالا', MEDIUM: 'متوسط', LOW: 'پایین' };

      var rows = buttons.map(function(btn) {
        var isBest = best && btn.index === best.index;
        return {
          _btn: btn,
          _isBest: isBest,
          _selector: btn.selector || '',
          _confColor: confidenceColors[btn.confidence] || '#94a3b8',
          _confLabel: confidenceLabels[btn.confidence] || '—'
        };
      });

      rows.push({
        _btn: null,
        _isBest: false,
        _selector: '',
        _confColor: '',
        _confLabel: ''
      });

      dfmButtonModalWin = new DfmComponentWindow({
        title: 'انتخاب دکمه ارسال',
        width: '640px',
        bodyHtml: '<p style="font-size:13px;color:var(--c-text-3);margin:0 0 12px">دکمه‌ای که عمل ارسال فرم را انجام می‌دهد انتخاب کنید</p><div id="dfmBtnTableContainer"></div>',
        escapeHtml: dfmEscapeHtml,
        onClose: function() {
          dfmButtonModalWin = null;
          dfmButtonModalTable = null;
          dfmButtonModalCallback = null;
        }
      });
      dfmButtonModalWin.show();

      var container = dfmButtonModalWin.getBodyEl().querySelector('#dfmBtnTableContainer');
      dfmButtonModalTable = new DfmComponentTable({
        container: container,
        escapeHtml: dfmEscapeHtml,
        columns: [
          { key: '_selector', label: '', width: '40px', align: 'center', render: function(row) {
            return '<input type="radio" name="dfmBtnRadio" value="' + dfmEscapeHtml(row._selector) + '"' + (row._isBest ? ' checked' : '') + ' style="cursor:pointer" />';
          }},
          { key: '_btn', label: 'پیش‌نمایش', width: '120px', align: 'center', render: function(row) {
            if (!row._btn) return '—';
            var b = row._btn;
            var safeText = dfmEscapeHtml(b.text || '');
            var cls = b.class ? ' class="' + dfmEscapeHtml(b.class) + '"' : '';
            var style = 'pointer-events:none;opacity:0.7;cursor:default';
            if (b.tag === 'input') {
              var inpType = b.type || 'button';
              return '<input type="' + dfmEscapeHtml(inpType) + '"' + cls + ' value="' + safeText + '" disabled style="' + style + '" />';
            }
            if (b.tag === 'element') {
              return '<span role="button"' + cls + ' tabindex="-1" style="' + style + '">' + safeText + '</span>';
            }
            return '<button type="button"' + cls + ' disabled style="' + style + '">' + safeText + '</button>';
          }},
          { key: '_btn', label: 'متن دکمه', render: function(row) {
            if (!row._btn) return '<span style="font-weight:600">بدون انتخاب</span>';
            var badge = row._isBest ? ' <span style="font-size:10px;padding:1px 6px;border-radius:3px;background:#e0e7ff;color:#4338ca">پیشنهاد</span>' : '';
            return dfmEscapeHtml(row._btn.text || '(بدون متن)') + badge;
          }},
          { key: '_btn', label: 'tag/type', width: '90px', render: function(row) {
            if (!row._btn) return '—';
            return dfmEscapeHtml(row._btn.tag) + (row._btn.type ? '/' + dfmEscapeHtml(row._btn.type) : '');
          }},
          { key: '_btn', label: 'امتیاز', width: '90px', render: function(row) {
            if (!row._btn) return '—';
            return '<span style="font-size:11px;padding:1px 6px;border-radius:3px;background:' + row._confColor + '15;color:' + row._confColor + '">' + row._btn.score + ' (' + row._confLabel + ')</span>';
          }},
          { key: '_selector', label: 'selector', render: function(row) {
            if (!row._btn) return '—';
            return row._selector ? '<code style="font-size:11px">' + dfmEscapeHtml(row._selector) + '</code>' : '—';
          }}
        ],
        data: rows
      });
      dfmButtonModalTable.render();

      container.addEventListener('change', function(e) {
        if (e.target.name === 'dfmBtnRadio') {
          dfmButtonModalSelected = e.target.value || null;
        }
      });

      var foot = dfmButtonModalWin.getFooterEl();
      var confirmBtn = document.createElement('button');
      confirmBtn.className = 'dfm-btn dfm-btn-primary';
      confirmBtn.textContent = 'تایید و ادامه';
      confirmBtn.onclick = dfmConfirmButtonSelection;
      foot.appendChild(confirmBtn);

      var cancelBtn = document.createElement('button');
      cancelBtn.className = 'dfm-btn dfm-btn-secondary';
      cancelBtn.textContent = 'انصراف';
      cancelBtn.onclick = function() { if (dfmButtonModalWin) dfmButtonModalWin.close(); };
      foot.appendChild(cancelBtn);
    }

    function dfmConfirmButtonSelection() {
      var selected = dfmButtonModalSelected;
      var cb = dfmButtonModalCallback;
      if (dfmButtonModalWin) dfmButtonModalWin.close();
      if (cb) cb(selected || null);
    }

    // پیش‌نمایش diff قبل از ذخیره (فقط هنگام ویرایش با HTML جدید)
    function dfmPreviewDiffAndSave(name, htmlContent) {
      dfmApi('preview_diff', { id: dfmEditingId, form_html: htmlContent }, 'POST').then(function(res) {
        if (!res.ok) {
          // اگر خطا → ذخیره بدون diff
          dfmDoSave(name, htmlContent, false);
          return;
        }
        var data = res.data;
        var diff = data.diff;
        // اگر تغییری نیست → ذخیره مستقیم
        if (diff.added.length === 0 && diff.removed.length === 0 &&
            diff.renamed.length === 0 && diff.changed.length === 0) {
          dfmDoSave(name, htmlContent, false);
          return;
        }
        // نمایش modal تایید تغییرات
        dfmShowSchemaDiffModal(data, function() {
          dfmDoSave(name, htmlContent, true);
        });
      }).catch(function() {
        dfmDoSave(name, htmlContent, false);
      });
    }

    // modal نمایش تغییرات schema
    function dfmShowSchemaDiffModal(data, onConfirm) {
      var diff = data.diff;
      var html = '<div class="dfm-modal-overlay" id="dfmDiffModal">' +
        '<div class="dfm-modal-box">' +
          '<div class="dfm-modal-head">' +
            '<h3>⚠ تغییرات schema (v' + data.old_version + ' → v' + data.new_version + ')</h3>' +
          '</div>' +
          '<div class="dfm-modal-body">';

      if (diff.added.length > 0) {
        html += '<div class="dfm-diff-section dfm-diff-added">' +
          '<div class="dfm-diff-title">➕ فیلدهای اضافه‌شده (' + diff.added.length + ')</div>' +
          '<ul>';
        diff.added.forEach(function(f) {
          html += '<li><b>' + dfmEscapeHtml(f.name) + '</b> (' + dfmEscapeHtml(f.type || 'text') + ')' +
            (f.required ? ' — <span class="dfm-diff-badge dfm-diff-badge-required">الزامی</span>' : '') + '</li>';
        });
        html += '</ul></div>';
      }

      if (diff.removed.length > 0) {
        html += '<div class="dfm-diff-section dfm-diff-removed">' +
          '<div class="dfm-diff-title">➖ فیلدهای حذف‌شده (' + diff.removed.length + ')</div>' +
          '<ul>';
        diff.removed.forEach(function(f) {
          html += '<li><b>' + dfmEscapeHtml(f.name) + '</b> (' + dfmEscapeHtml(f.type || 'text') + ')</li>';
        });
        html += '</ul></div>';
      }

      if (diff.renamed.length > 0) {
        html += '<div class="dfm-diff-section dfm-diff-renamed">' +
          '<div class="dfm-diff-title">✏ تغییر نام (' + diff.renamed.length + ')</div>' +
          '<ul>';
        diff.renamed.forEach(function(r) {
          html += '<li><b>' + dfmEscapeHtml(r.from) + '</b> → <b>' + dfmEscapeHtml(r.to) + '</b></li>';
        });
        html += '</ul></div>';
      }

      if (diff.changed.length > 0) {
        html += '<div class="dfm-diff-section dfm-diff-changed">' +
          '<div class="dfm-diff-title">🔄 تغییر نوع (' + diff.changed.length + ')</div>' +
          '<ul>';
        diff.changed.forEach(function(c) {
          html += '<li><b>' + dfmEscapeHtml(c.name) + '</b>: ' +
            dfmEscapeHtml(c.from.type) + ' → ' + dfmEscapeHtml(c.to.type) + '</li>';
        });
        html += '</ul></div>';
      }

      html += '<div class="dfm-diff-stats">' +
        '<span class="dfm-diff-badge dfm-diff-badge-info">📊 پاسخ‌های تحت تاثیر: ' + data.affected_responses + '</span>' +
        '<span class="dfm-diff-badge dfm-diff-badge-success">📋 فیلدهای مشترک: ' + diff.common.length + '</span>' +
        '</div>';

      html += '</div>' +
        '<div class="dfm-modal-foot">' +
          '<button class="dfm-btn dfm-btn-primary" onclick="dfmConfirmDiffSave()">تایید و ذخیره</button>' +
          '<button class="dfm-btn dfm-btn-secondary" onclick="dfmCloseDiffModal()">انصراف</button>' +
        '</div>' +
      '</div></div>';

      // ذخیره callback
      window._dfmDiffConfirm = onConfirm;

      // افزودن به DOM
      var div = document.createElement('div');
      div.innerHTML = html;
      document.body.appendChild(div.firstElementChild);
    }

    function dfmConfirmDiffSave() {
      var cb = window._dfmDiffConfirm;
      dfmCloseDiffModal();
      if (cb) cb();
    }

    function dfmCloseDiffModal() {
      var modal = document.getElementById('dfmDiffModal');
      if (modal) modal.remove();
      window._dfmDiffConfirm = null;
    }

    function dfmDoSave(name, htmlContent, confirmDiff) {
      var params = { name: name };
      if (htmlContent) params.form_html = htmlContent;
      if (dfmSelectedFolderId) params.doc_parent_id = dfmSelectedFolderId;
      if (dfmSelectedTemplateId) params.client_template_id = dfmSelectedTemplateId;
      if (confirmDiff) params.confirm_diff = true;
      if (dfmSelectedPortalId) params.portal_id = dfmSelectedPortalId;
      if (dfmSelectedSubmitSelector) {
        params.metadata = JSON.stringify({ submit: { selector: dfmSelectedSubmitSelector } });
        dfmSelectedSubmitSelector = null;
      }
      if (dfmEditingId) {
        params.id = dfmEditingId;
        dfmApi('update', params, 'POST').then(function(res) {
          if (res.ok) { dfmToast('success', 'فرم بروزرسانی شد', name); dfmGoList(); dfmLoadForms(); }
          else dfmToast('error', 'خطا در ذخیره', res.error ? res.error.message : 'خطای ناشناخته');
        });
      } else {
        dfmApi('create', params, 'POST').then(function(res) {
          if (res.ok) { dfmToast('success', 'فرم ایجاد شد', name); dfmGoList(); dfmLoadForms(); }
          else dfmToast('error', 'خطا در ذخیره', res.error ? res.error.message : 'خطای ناشناخته');
        });
      }
    }

    function dfmDeleteForm(id, name) {
      var dlg = new DfmComponentWindowConfirm({
        title: 'حذف فرم',
        message: 'فرم «' + name + '» حذف شود؟ تمام پاسخ‌ها هم حذف می‌شوند.',
        confirmText: 'حذف',
        confirmClass: 'dfm-btn-danger',
        cancelText: 'انصراف',
        checkboxLabel: 'حذف فایل از ماژول اسناد',
        onConfirm: function(deleteDoc) {
          var params = { id: id };
          if (deleteDoc) params.delete_doc = true;
          dfmApi('delete', params, 'POST').then(function(res) {
            if (res.ok) { dfmToast('success', 'فرم حذف شد', deleteDoc ? 'فایل سند نیز حذف شد' : name); dfmLoadForms(); }
            else dfmToast('error', 'خطا در حذف', res.error ? res.error.message : 'خطای ناشناخته');
          });
        },
        escapeHtml: dfmEscapeHtml,
      });
      dlg.show();
    }