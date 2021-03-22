$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcScanEvent/pageList',
    datatype: "json",
    colModel: [
      {label: '事件编号', name: 'eventId', width: 60, key: true},
      {label: '事件名称', name: 'eventName', width: 80},
      {label: 'PLC编号', name: 'plcId', width: 120},
      {label: '触发条件', name: 'triggerReason', width: 80},
      {label: '写入数据', name: 'writeDbId', width: 100},
      {label: '调用名', name: 'invokName', width: 100},
      {label: '扫描间隔', name: 'scanInterval', width: 100},
      {label: '录入人', name: 'insertId', idth: 80,},
      {label: '录入时间', name: 'insertDate', width: 100},
      {label: '更新人', name: 'updateId', width: 100},
      {label: '更新时间', name: 'updateDate', width: 70},
    ],
    viewrecords: true,
    height: 385,
    rowNum: 18,
    rowList: [10, 30, 50],
    rownumbers: false,
    rownumWidth: 25,
    autowidth: true,
    multiselect: true,
    pager: "#jqGridPager",
    jsonReader: {
      root: "page.list",
      page: "page.currPage",
      total: "page.totalPage",
      records: "page.totalCount"
    },
    prmNames: {
      page: "page",
      rows: "limit",
      order: "order"
    },
    // shrinkToFit: false,
    autoScroll: true,
    gridComplete: function () {
      //隐藏grid底部滚动条
      $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"}); //hidden ,scroll
      var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
      $("#jqGrid").jqGrid('setGridWidth', parent_column.width());

    },
  });
  $('.ui-jqgrid tr th').css({"text-align": "center"});
  $('#jqGrid').css({"text-align": "center"});
});

var vm = new Vue({
  el: '#honghu_cloud',
  data: {
    q: {
      eventId:null,
      eventName:null,
      plcId:null,
      triggerReason:null,
    },
    plcScanEvent:{
      eventId:null,
      eventName:null,
      plcId:null,
      triggerReason:null,
      writeDbId:null,
      invokName:null,
      scanInterval:null,
    },
    showList: true,
    title: null,
    eventNameFlag: true,
    plcIdFlag: true,
    triggerReasonFlag: true,
    writeDbIdFlag: true,
    invokNameFlag: true,
    scanIntervalFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },

    add: function () {
      vm.plcScanEvent={};
      vm.showList = false;
      vm.title = "新增";
    },
    update: function () {
      var eventId = getSelectedRow();
      if (eventId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getPlcScanEvent(eventId);
    },
    del: function () {
      var eventIds = getSelectedRows();
      if (eventIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcScanEvent/delete",
          contentType: "application/json",
          data: JSON.stringify(eventIds),
          success: function (r) {
            if (r.code === 0) {
              alert('操作成功', function () {
                vm.reload();
              });
            } else {
              alert(r.msg);
            }
          }
        });
      });
    },
    saveOrUpdate: function (event) {
      if (vm.plcScanEvent.scanInterval == null || vm.plcScanEvent.scanInterval === "") {
        vm.scanIntervalFlag = false;
      }else{
        vm.scanIntervalFlag = true;
      }
      if (vm.plcScanEvent.eventName == null || vm.plcScanEvent.eventName === "") {
        vm.eventNameFlag = false;
      }else{
        vm.eventNameFlag = true;
      }
      if (vm.plcScanEvent.plcId == null || vm.plcScanEvent.plcId === "") {
        vm.plcIdFlag = false;
      }else{
        vm.plcIdFlag = true;
      }
      if (vm.plcScanEvent.triggerReason == null || vm.plcScanEvent.triggerReason === "") {
        vm.triggerReasonFlag = false;
      }else{
        vm.triggerReasonFlag = true;
      }
      if (vm.plcScanEvent.writeDbId == null || vm.plcScanEvent.writeDbId === "") {
        vm.writeDbIdFlag = false;
      }else{
        vm.writeDbIdFlag = true;
      }
      if (vm.plcScanEvent.invokName == null || vm.plcScanEvent.invokName === "") {
        vm.invokNameFlag = false;
      }else{
        vm.invokNameFlag = true;
      }
      if (vm.scanIntervalFlag === false || vm.eventNameFlag === false
          || vm.plcIdFlag === false || vm.triggerReasonFlag === false
          || vm.writeDbIdFlag === false || vm.invokNameFlag === false ) {
        alert("请输入正确信息");
        return false;
      }
      var url = vm.plcScanEvent.eventId == null ? "plcScanEvent/save" : "plcScanEvent/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.plcScanEvent),
        success: function (r) {
          if (r.code === 0) {
            alert('操作成功', function () {
              vm.reload();
            });
          } else {
            alert(r.msg);
          }
        }
      });
    },
    getPlcScanEvent: function (eventId) {
      $.get(baseURL + "plcScanEvent/getPlcScanEvent/" + eventId, function (r) {
        vm.plcScanEvent = r.plcScanEvent;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'eventId': vm.q.eventId,
          'eventName': vm.q.eventName,
          'plcId': vm.q.plcId,
          'triggerReason': vm.q.triggerReason,
        },
        page: page
      }).trigger("reloadGrid");
      vm.refresh();
    },
    refresh: function () {
      vm.eventNameFlag = true;
      vm.plcIdFlag = true;
      vm.triggerReasonFlag = true;
      vm.writeDbIdFlag = true;
      vm.invokNameFlag = true;
      vm.scanIntervalFlag = true;
    }
  }
});