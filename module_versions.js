    function dfmLoadVersions(formId, formKey) {
      var section = document.getElementById('dfmVersionsSection');
      var content = document.getElementById('dfmVersionsContent');
      section.style.display = 'block';

      var verTable = new DfmComponentTable({
        container: content,
        loadingText: 'در حال بارگذاری...',
        emptyText: 'نسخه‌ای ثبت نشده است',
        errorText: 'خطا در بارگذاری نسخه‌ها',
        escapeHtml: dfmEscapeHtml,
        columns: [
          { key: 'version', label: 'نسخه', render: function(row) {
            var cls = 'dfm-ver-badge';
            if (row.version === verTable.data[0].version) cls += ' dfm-ver-badge-current';
            return '<span class="' + cls + '">v' + row.version + (row.version === verTable.data[0].version ? ' (فعلی)' : '') + '</span>';
          }},
          { key: 'doc_id', label: 'شناسه سند', render: function(row) { return row.doc_id || '-'; } },
          { key: 'schema_fields', label: 'تعداد فیلدها', render: function(row) { return row.schema_fields != null ? row.schema_fields : '-'; } },
          { key: 'created_at', label: 'تاریخ', render: function(row) {
            return row.created_at ? new Date(row.created_at).toLocaleString('fa-IR') : '-';
          }},
          { key: 'doc_link', label: 'سند', render: function(row) {
            if (!row.doc_id) return '-';
            var url = 'https://maarefian.teamyar.com/?page=/document/file/show_version/' + row.doc_id + '&back_id=' + (row.doc_parent_id || '');
            var label = row.doc_name || ('سند ' + row.doc_id);
            return '<a href="' + url + '" target="_blank" class="dfm-ver-btn" title="' + dfmEscapeHtml(label) + '"><span class="dfm-icon-slot" data-icon="fileText" data-size="12"></span> ' + dfmEscapeHtml(label) + '</a>';
          }},
          { key: 'folder_link', label: 'پوشه', render: function(row) {
            if (!row.doc_parent_id) return '-';
            var url = 'https://maarefian.teamyar.com/?page=/document/index/show/' + row.doc_parent_id;
            var label = row.folder_name || ('پوشه ' + row.doc_parent_id);
            return '<a href="' + url + '" target="_blank" class="dfm-ver-btn" title="' + dfmEscapeHtml(label) + '"><span class="dfm-icon-slot" data-icon="folderOpen" data-size="12"></span> ' + dfmEscapeHtml(label) + '</a>';
          }},
          { key: 'actions', label: 'عملیات', render: function(row) {
            if (!row.doc_id) return '<span style="color:var(--c-text-3);font-size:11px">—</span>';
            var actions = '<div class="dfm-ver-actions">';
            actions += '<button class="dfm-ver-btn" onclick="dfmVersionSchema(' + row.doc_id + ')"><span class="dfm-icon-slot" data-icon="list" data-size="12"></span> ساختار</button>';
            actions += '<button class="dfm-ver-btn" onclick="dfmVersionPreview(' + row.doc_id + ')"><span class="dfm-icon-slot" data-icon="eye" data-size="12"></span> نتیجه</button>';
            if (formKey) {
              var verUrl = location.origin + '/?page=/bot/run/2/documnet_form_manager&unique=' + encodeURIComponent(formKey) + '&type=test&var=' + row.version;
              actions += '<button class="dfm-ver-btn" onclick="window.open(\'' + verUrl.replace(/'/g, "\\'") + '\', \'_blank\')"><span class="dfm-icon-slot" data-icon="eye" data-size="12"></span> نمایش</button>';
              actions += '<button class="dfm-ver-btn" onclick="dfmShowInstallCode(\'' + dfmEscapeHtml(formKey).replace(/'/g, "\\'") + '\',' + row.version + ')"><span class="dfm-icon-slot" data-icon="code" data-size="12"></span> کد نصب</button>';
            }
            actions += '<button class="dfm-ver-btn" onclick="dfmOpenReport(' + formId + ')"><span class="dfm-icon-slot" data-icon="fileText" data-size="12"></span> گزارش</button>';
            if (verTable.data.length > 1) {
              actions += '<button class="dfm-ver-btn dfm-btn-danger" onclick="dfmDeleteVersion(' + formId + ',' + row.version + ')"><span class="dfm-icon-slot" data-icon="trash" data-size="12"></span> حذف</button>';
            }
            actions += '</div>';
            return actions;
          }},
        ],
      });

      dfmApi('get_versions', { id: formId }).then(function(res) {
        if (!res.ok) {
          verTable.setError();
          return;
        }
        verTable.setData(res.data || []);
        dfmFillIconSlots();
      }).catch(function() {
        verTable.setError();
      });
    }

    function dfmVersionSchema(docId) {
      fetch(BOT_URL + '?action=version_html&doc_id=' + docId)
        .then(function(r) { return r.text(); })
        .then(function(html) {
          var schema = dfmParseHtmlSchema(html);
          dfmRenderSchema(schema);
          dfmShowPage('schema');
        })
        .catch(function() { dfmToast('error', 'خطا', 'بارگذاری ساختار نسخه ناموفق بود'); });
    }

    function dfmDeleteVersion(formId, version) {
      var dialog = new DfmComponentWindowConfirm({
        title: 'حذف نسخه',
        message: 'حذف نسخه v' + version + ' از تاریخچه؟ این عمل قابل بازگشت نیست.',
        confirmText: 'حذف',
        confirmClass: 'dfm-btn-danger',
        cancelText: 'انصراف',
        escapeHtml: dfmEscapeHtml,
        onConfirm: function() {
          dfmApi('delete_version', { id: formId, version: version }, 'POST').then(function(res) {
            if (!res.ok) throw new Error(res.error && res.error.message || 'خطا');
            dfmToast('success', 'حذف شد', 'نسخه v' + version + ' حذف شد');
            dfmLoadVersions(formId);
          }).catch(function(err) {
            dfmToast('error', 'خطا', err.message || 'حذف ناموفق');
          });
        },
      });
      dialog.show();
    }


    function dfmVersionPreview(docId) {
      fetch(BOT_URL + '?action=version_html&doc_id=' + docId)
        .then(function(r) { return r.text(); })
        .then(function(html) {
          var frame = document.getElementById('dfmPreviewFrame');
          dfmShowPage('preview');
          frame.removeAttribute('src');
          frame.removeAttribute('srcdoc');
          try {
            var doc = frame.contentWindow && frame.contentWindow.document;
            if (!doc && frame.contentDocument) doc = frame.contentDocument;
            if (doc) { doc.open(); doc.write(html || ''); doc.close(); return; }
          } catch (e) {}
          frame.srcdoc = html || '';
        })
        .catch(function() { dfmToast('error', 'خطا', 'بارگذاری پیش‌نمایش نسخه ناموفق بود'); });
    }