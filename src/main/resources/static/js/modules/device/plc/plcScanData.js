$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcScanData/pageList',
    datatype: "json",
    colModel: [
      {label: '主键', name: 'keyId', width: 60, key: true},
      {label: '起始数据点', name: 'startPointId', width: 80},
      {label: '目的数据点', name: 'endPointId', width: 120},
      {label: '扫描间隔', name: 'scanInterval', width: 80},
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
      keyId:null,
      startPointId:null,
      endPointId:null,
      scanInterval:null,
    },
    plcScanData:{
      keyId:null,
      startPointId:null,
      endPointId:null,
      scanInterval:null,
    },
    showList: true,
    title: null,
    startPointIdFlag: true,
    endPointIdFlag: true,
    scanIntervalFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },
    add: function () {
      vm.plcScanData={};
      vm.showList = false;
      vm.title = "新增";
    },
    update: function () {
      var keyId = getSelectedRow();
      if (keyId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getPlcScanData(keyId);
    },
    del: function () {
      var keyIds = getSelectedRows();
      if (keyIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcScanData/delete",
          contentType: "application/json",
          data: JSON.stringify(keyIds),
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
      if (vm.plcScanData.startPointId == null || vm.plcScanData.startPointId === "") {
        vm.startPointIdFlag = false;
      }else{
        vm.startPointIdFlag = true;
      }
      if (vm.plcScanData.endPointId == null || vm.plcScanData.endPointId === "") {
        vm.endPointIdFlag = false;
      }else{
        vm.endPointIdFlag = true;
      }
      if (vm.plcScanData.scanInterval == null || vm.plcScanData.scanInterval === "") {
        vm.scanIntervalFlag = false;
      }else{
        vm.scanIntervalFlag = true;
      }

      if (vm.startPointIdFlag === false || vm.endPointIdFlag === false
          || vm.scanIntervalFlag === false ) {
        alert("请输入正确信息");
        return false;
      }
      var url = vm.plcScanData.keyId == null ? "plcScanData/save" : "plcScanData/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.plcScanData),
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
    getPlcScanData: function (keyId) {
      $.get(baseURL + "plcScanData/getPlcScanData/" + keyId, function (r) {
        vm.plcScanData = r.plcScanData;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'keyId': vm.q.keyId,
          'startPointId': vm.q.startPointId,
          'endPointId': vm.q.endPointId,
          'scanInterval': vm.q.scanInterval,
        },
        page: page
      }).trigger("reloadGrid");
      vm.refresh();
    },
    refresh: function () {
      vm.startPointIdFlag = true;
      vm.endPointIdFlag = true;
      vm.scanIntervalFlag = true;
    }
  }
});