    // ── گزارش‌گیری ──────────────────────────────────────────────────────────
    var dfmReportFormId = 0;

    function dfmOpenReport(formId) {
      dfmReportFormId = formId || 0;
      dfmShowPage('report');
      dfmSwitchReportTab('overview');
    }

    function dfmSwitchReportTab(tab) {
      var tabs = ['overview', 'responses', 'chart'];
      tabs.forEach(function(t) {
        var btn = document.getElementById('dfmTab' + t.charAt(0).toUpperCase() + t.slice(1));
        var panel = document.getElementById('dfmReport' + t.charAt(0).toUpperCase() + t.slice(1));
        if (btn) btn.classList.remove('dfm-tab-btn-active');
        if (panel) panel.style.display = 'none';
      });
      var activeBtn = document.getElementById('dfmTab' + tab.charAt(0).toUpperCase() + tab.slice(1));
      var activePanel = document.getElementById('dfmReport' + tab.charAt(0).toUpperCase() + tab.slice(1));
      if (activeBtn) activeBtn.classList.add('dfm-tab-btn-active');
      if (activePanel) activePanel.style.display = 'block';

      if (tab === 'overview') dfmLoadReportOverview();
      else if (tab === 'responses') dfmLoadReportResponses();
      else if (tab === 'chart') dfmLoadReportChart();
    }

    function dfmLoadReportOverview() {
      var panel = document.getElementById('dfmReportOverview');
      panel.innerHTML = '<p style="color:var(--c-text-3)">در حال بارگذاری...</p>';
      dfmApi('report_overview', { form_id: dfmReportFormId }).then(function(res) {
        if (!res.ok || !res.data) { panel.innerHTML = '<p style="color:var(--c-danger)">خطا در بارگذاری</p>'; return; }
        var d = res.data;
        var html = '<div class="dfm-report-summary">';
        html += '<div class="dfm-report-card"><div class="dfm-report-card-value">' + d.total_users + '</div><div class="dfm-report-card-label">تعداد کاربران</div></div>';
        html += '<div class="dfm-report-card"><div class="dfm-report-card-value">' + d.total_responses + '</div><div class="dfm-report-card-label">کل پاسخ‌ها</div></div>';
        html += '<div class="dfm-report-card"><div class="dfm-report-card-value">' + d.total_forms + '</div><div class="dfm-report-card-label">تعداد فرم‌ها</div></div>';
        html += '</div>';
        html += '<div id="dfmReportOverviewTable"></div>';
        panel.innerHTML = html;
        var table = new DfmComponentTable({
          container: document.getElementById('dfmReportOverviewTable'),
          emptyText: 'کاربری وجود ندارد',
          escapeHtml: dfmEscapeHtml,
          columns: [
            { key: 'profile_name', label: 'کاربر' },
            { key: 'response_count', label: 'تعداد پاسخ', render: function(r) { return '<span class="dfm-badge dfm-badge-on">' + (r.response_count || 0) + '</span>'; } },
            { key: 'form_count', label: 'فرم‌های پاسخ‌داده', render: function(r) { return '<span class="dfm-badge">' + (r.form_count || 0) + '</span>'; } },
            { key: 'last_submitted', label: 'آخرین ارسال', render: function(r) { return r.last_submitted ? new Date(r.last_submitted).toLocaleDateString('fa-IR') : '-'; } },
          ],
        });
        table.setData(d.users || []);
        dfmFillIconSlots();
      }).catch(function() { panel.innerHTML = '<p style="color:var(--c-danger)">خطا</p>'; });
    }

    function dfmLoadReportResponses() {
      var panel = document.getElementById('dfmReportResponses');
      panel.innerHTML = '<p style="color:var(--c-text-3)">در حال بارگذاری...</p>';
      dfmApi('report_responses', { form_id: dfmReportFormId }).then(function(res) {
        if (!res.ok || !res.data) { panel.innerHTML = '<p style="color:var(--c-danger)">خطا در بارگذاری</p>'; return; }
        var d = res.data;
        var responses = d.responses || [];

        // جمع‌آوری تمام فیلدهای یکتا از همه پاسخ‌ها
        var fieldMap = {};
        var fieldOrder = [];
        responses.forEach(function(r) {
          if (r.answers) {
            r.answers.forEach(function(a) {
              if (!fieldMap[a.field_name]) {
                fieldMap[a.field_name] = { label: a.label, type: a.type };
                fieldOrder.push(a.field_name);
              }
            });
          }
        });

        // ساخت answer lookup برای هر response
        responses.forEach(function(r) {
          r._answerMap = {};
          if (r.answers) {
            r.answers.forEach(function(a) { r._answerMap[a.field_name] = a.value; });
          }
        });

        var html = '<div class="dfm-report-summary">';
        html += '<div class="dfm-report-card"><div class="dfm-report-card-value">' + d.total + '</div><div class="dfm-report-card-label">کل پاسخ‌ها</div></div>';
        html += '</div>';
        html += '<div id="dfmReportResponsesTable" style="overflow-x:auto"></div>';
        panel.innerHTML = html;

        // ساخت ستون‌ها: کاربر، فرم، فیلدهای schema، وضعیت، تاریخ
        var columns = [
          { key: 'profile_name', label: 'کاربر' },
          { key: 'form_name', label: 'فرم' },
        ];
        fieldOrder.forEach(function(fn) {
          var info = fieldMap[fn];
          columns.push({
            key: '_answerMap.' + fn,
            label: info.label || fn,
            render: (function(fieldName) {
              return function(r) {
                var val = r._answerMap ? r._answerMap[fieldName] : null;
                if (val == null || val === '') return '<span style="color:var(--c-text-3)">—</span>';
                return dfmEscapeHtml(val);
              };
            })(fn)
          });
        });
        columns.push({ key: 'status', label: 'وضعیت', render: function(r) {
          var s = r.status || 0;
          var labels = ['پیش‌نویس', 'شروع شده', 'ارسال شده', 'تایید شده'];
          var colors = ['dfm-badge-off', 'dfm-badge-off', 'dfm-badge-on', 'dfm-badge-on'];
          return '<span class="dfm-badge ' + (colors[s] || 'dfm-badge-off') + '">' + (labels[s] || 'نامشخص') + '</span>';
        }});
        columns.push({ key: 'submitted_at', label: 'تاریخ ارسال', render: function(r) { return r.submitted_at ? new Date(r.submitted_at).toLocaleDateString('fa-IR') : '-'; } });

        var table = new DfmComponentTable({
          container: document.getElementById('dfmReportResponsesTable'),
          emptyText: 'پاسخی ثبت نشده',
          escapeHtml: dfmEscapeHtml,
          columns: columns,
        });
        table.setData(responses);
        dfmFillIconSlots();
      }).catch(function() { panel.innerHTML = '<p style="color:var(--c-danger)">خطا</p>'; });
    }

    function dfmLoadReportChart() {
      var panel = document.getElementById('dfmReportChart');
      panel.innerHTML = '<p style="color:var(--c-text-3)">در حال بارگذاری...</p>';
      dfmApi('report_chart', { form_id: dfmReportFormId }).then(function(res) {
        if (!res.ok || !res.data) { panel.innerHTML = '<p style="color:var(--c-danger)">خطا در بارگذاری</p>'; return; }
        var d = res.data;
        var data = d.data || [];
        var forms = d.forms || [];
        if (data.length === 0 && forms.length === 0) {
          panel.innerHTML = '<div class="dfm-empty"><p>داده‌ای برای نمایش وجود ندارد</p></div>';
          return;
        }

        var maxCount = 0;
        data.forEach(function(d) { if (d.count > maxCount) maxCount = d.count; });
        if (maxCount === 0) maxCount = 1;

        var gridLines = '';
        var gridSteps = 4;
        for (var i = 1; i <= gridSteps; i++) {
          var gridVal = Math.round((maxCount / gridSteps) * i);
          var gridBottom = (i / gridSteps) * 180;
          gridLines += '<div class="dfm-chart-grid" style="bottom:' + (gridBottom + 16) + 'px">' +
            '<span class="dfm-chart-grid-label">' + gridVal + '</span></div>';
        }

        var html = '';

        html += '<div class="dfm-chart-summary">';
        html += '<div class="dfm-chart-stat"><div class="dfm-chart-stat-value">' + (d.total || 0) + '</div><div class="dfm-chart-stat-label">کل پاسخ‌ها</div></div>';
        html += '<div class="dfm-chart-stat"><div class="dfm-chart-stat-value">' + (d.active_days || 0) + '</div><div class="dfm-chart-stat-label">روزهای فعال</div></div>';
        html += '<div class="dfm-chart-stat"><div class="dfm-chart-stat-value">' + (d.avg_per_day || 0) + '</div><div class="dfm-chart-stat-label">میانگین در روز</div></div>';
        html += '<div class="dfm-chart-stat"><div class="dfm-chart-stat-value">' + (d.peak_count || 0) + '</div><div class="dfm-chart-stat-label">پیک پاسخ‌دهی</div></div>';
        html += '</div>';

        if (data.length > 0) {
          html += '<div class="dfm-chart-container">';
          html += '<h3 style="font-size:14px;font-weight:700;margin-bottom:4px">پاسخ‌دهی بر اساس روز</h3>';
          if (d.peak_day) {
            html += '<p style="font-size:11px;color:var(--c-text-3);margin-bottom:8px">بیشترین پاسخ در تاریخ ' + dfmEscapeHtml(d.peak_day) + ' (' + (d.peak_count || 0) + ' پاسخ)</p>';
          }
          html += '<div class="dfm-chart-bar-wrap" style="position:relative">';
          html += gridLines;
          data.forEach(function(item) {
            var h = Math.round((item.count / maxCount) * 180);
            html += '<div class="dfm-chart-bar-col" title="' + dfmEscapeHtml(item.date) + ': ' + item.count + ' پاسخ">';
            html += '<span class="dfm-chart-bar-count">' + item.count + '</span>';
            html += '<div class="dfm-chart-bar" style="height:' + h + 'px"></div>';
            html += '<span class="dfm-chart-bar-label">' + dfmEscapeHtml(item.date) + '</span>';
            html += '</div>';
          });
          html += '</div></div>';
        }

        if (forms.length > 0) {
          var maxFormCount = forms[0].count || 1;
          html += '<div class="dfm-form-breakdown">';
          html += '<h3>توزیع پاسخ‌ها بر اساس فرم</h3>';
          forms.forEach(function(f) {
            var pct = Math.round((f.count / maxFormCount) * 100);
            html += '<div class="dfm-form-bar-row" title="' + dfmEscapeHtml(f.name) + ': ' + f.count + ' پاسخ">';
            html += '<span class="dfm-form-bar-name">' + dfmEscapeHtml(f.name) + '</span>';
            html += '<div class="dfm-form-bar-track"><div class="dfm-form-bar-fill" style="width:' + pct + '%"></div></div>';
            html += '<span class="dfm-form-bar-count">' + f.count + '</span>';
            html += '</div>';
          });
          html += '</div>';
        }

        panel.innerHTML = html;
      }).catch(function() { panel.innerHTML = '<p style="color:var(--c-danger)">خطا</p>'; });
    }