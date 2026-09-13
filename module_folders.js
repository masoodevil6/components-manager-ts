    function dfmInitClientTemplateInput() {
      if (dfmClientTemplateInput) return;
      dfmClientTemplateInput = new DfmComponentInputSearch({
        container: document.getElementById('dfmClientTemplateContainer'),
        placeholder: '— انتخاب الگو —',
        searchPlaceholder: 'جستجوی الگو...',
        emptyText: 'الگویی پیدا نشد',
        value: dfmSelectedTemplateId || '',
        escapeHtml: dfmEscapeHtml,
        onChange: function(value) {
          dfmSelectedTemplateId = value || null;
          dfmOnTemplateChange();
        }
      });
    }

    function dfmLoadClientTemplates() {
      dfmInitClientTemplateInput();
      dfmClientTemplateInput.setValue(dfmSelectedTemplateId || '', false);
      dfmApi('client_templates').then(function(res) {
        if (!res.ok || !res.data) return;
        var templates = res.data;
        var natural = templates.filter(function(t) { return t.type === 'natural'; });
        var legal = templates.filter(function(t) { return t.type === 'legal'; });
        var groups = [];
        if (natural.length) {
          groups.push({
            label: 'مشتریان حقیقی',
            options: natural.map(function(t) { return { value: t.id, label: t.name }; })
          });
        }
        if (legal.length) {
          groups.push({
            label: 'مشتریان حقوقی',
            options: legal.map(function(t) { return { value: t.id, label: t.name }; })
          });
        }
        dfmClientTemplateInput.setData(groups);
        dfmClientTemplateInput.setValue(dfmSelectedTemplateId || '', false);
      });
    }

    // ── کامپوننت‌های درخت و collapse ──
    var dfmFolderTree = null;
    var dfmFolderPanel = null;

    function dfmGetSelectedFolderName(id, name) {
      if (name) return name;
      var selectedNode = dfmFolderTree && dfmFolderTree._nodeMap && dfmFolderTree._nodeMap[id];
      if (selectedNode && selectedNode.name) return selectedNode.name;
      if (selectedNode && selectedNode.el) {
        var nameEl = selectedNode.el.querySelector('.dfm-ct-title, .dfm-ct-name');
        if (nameEl && nameEl.textContent) return nameEl.textContent.trim();
      }
      return '';
    }

    function dfmInitFolderPanel() {
      dfmFolderPanel = new DfmComponentCollapse({
        id: 'dfmFolderCollapse',
        title: 'پوشه ذخیره فرم',
        searchPlaceholder: 'جستجوی پوشه...',
        hint: 'پوشه مقصد را انتخاب کنید — فرم در این پوشه ذخیره می‌شود',
        onSearch: function(query) { if (dfmFolderTree) dfmFolderTree.filter(query); },
        onClearSelection: function() {}
      });
      document.getElementById('dfmFolderPanelContainer').appendChild(dfmFolderPanel.getElement());

      var treeContainer = document.createElement('div');
      treeContainer.className = 'dfm-ct-tree';
      dfmFolderPanel.getContentEl().appendChild(treeContainer);

      dfmFolderTree = new DfmComponentTree({
        container: treeContainer,
        mode: 'recursive',
        selectedId: dfmSelectedFolderId,
        icons: {
          size: 18,
          folder: DfmIcon.folder({ size: 18 })
        },
        escapeHtml: dfmEscapeHtml,
        loadChildren: function(parentId) {
          return dfmApi('folders', { parent_id: parentId }).then(function(res) {
            return res.ok ? (res.data || []) : [];
          });
        },
        onSelect: function(id, name) {
          dfmSelectedFolderId = id;
          if (id) { dfmFolderPanel.showBadge(dfmGetSelectedFolderName(id, name)); }
          else { dfmFolderPanel.hideBadge(); }
        }
      });
    }

    function dfmLoadFolders() {
      if (!dfmFolderTree) return;
      dfmApi('folders', { parent_id: 0 }).then(function(res) {
        var folders = res.ok ? (res.data || []) : [];
        dfmFolderTree.setSelectedId(dfmSelectedFolderId);
        dfmFolderTree.setData(folders);
        if (dfmSelectedFolderId) {
          dfmFolderPanel.showBadge(dfmGetSelectedFolderName(dfmSelectedFolderId));
        }
      });
    }



    function dfmInitFormFields() {
      if (dfmNameInput) return;
      dfmNameInput = new DfmComponentInputText({
        container: document.getElementById('dfmNameFieldContainer'),
        id: 'dfmName',
        label: 'نام فرم',
        icon: 'edit',
        placeholder: 'مثلاً فرم ارزیابی رضایت مشتری',
        escapeHtml: dfmEscapeHtml,
      });
      dfmFileInput = new DfmComponentInputFile({
        container: document.getElementById('dfmFileFieldContainer'),
        id: 'dfmFile',
        label: 'فایل HTML فرم',
        icon: 'folderOpen',
        accept: '.html,.htm',
        hint: 'HTML تولید شده توسط AI را آپلود کنید — ساختار فرم خودکار استخراج می‌شود',
        badgeHtml: '<span id="dfmNextVersionBadge" class="dfm-next-version-badge" style="display:none"></span>',
        escapeHtml: dfmEscapeHtml,
        onChange: function(file) { dfmOnFileChange(file); },
        buttons: [
          { id: 'dfmSchemaBtn', label: 'ساختار', icon: 'list', className: 'dfm-btn-schema', onClick: function() { dfmShowSchema(); } },
          { id: 'dfmPreviewBtn', label: 'نتیجه', icon: 'eye', className: 'dfm-btn-preview', onClick: function() { dfmShowPreview(); } },
        ],
      });
      dfmFillIconSlots();
    }


    function dfmOnTemplateChange() {
      if (dfmClientTemplateInput) dfmSelectedTemplateId = dfmClientTemplateInput.getValue() || null;
    }