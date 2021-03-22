$(function () {
  vm.getDeviceTypeList();
});

$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'deviceException/pageListforExceCode',
    datatype: "json",
    colModel: [
      {label: '主键', name: 'keyId', width: 60, key: true},
      {label: '设备类型', name: 'deviceType', width: 80},
      {label: '异常编号', name: 'errorId', width: 120},
      {label: '异常描述', name: 'errorExplain', width: 80},
      {label: '异常类型', name: 'errorType', width: 100},
      {label: '是否启用', name: 'isStart', width: 120},
      {label: '备注', name: 'remark', width: 130},
      {label: '录入人', name: 'insertId',width: 80,},
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
      exceCode:null,
      exceDescribe:null,
      deviceType: null,
    },
    errorCodeExplain:{
      keyId:null,
      deviceType:null,
      errorType:null,
      errorId:null,
      errorExplain:null,
      isStart:null,
      remark:null,
    },
    deviceTypeList:null,
    showList: true,
    title: null,
    deviceTypeFlag: true,
    errorTypeFlag: true,
    errorIdFlag: true,
    errorExplainFlag: true,
    isStartFlag: true,
  },
  methods: {
    getDeviceTypeList:function () {
      $.get(baseURL + "deviceException/getDeviceTypeList", function (r) {
        vm.deviceTypeList = r.list;
      });
    },

    query: function () {
      vm.reload();
    },

    exceptionCodeEdit: function(){
      var url = baseURL + "modules/device/exceptionCodeEdit.html";
      window.location.href = url;
    },
    back: function(){
      var url = baseURL + "modules/device/deviceException.html";
      window.location.href = url;
    },

    add: function () {
      vm.showList = false;
      vm.title = "新增";
      vm.errorCodeExplain = {};
    },
    update: function () {
      var keyId = getSelectedRow();
      if (keyId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getErrorCodeExplain(keyId);
    },
    del: function () {
      var errorCodeExplainIds = getSelectedRows();
      if (errorCodeExplainIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "deviceException/deleteErrorCodeExplain",
          contentType: "application/json",
          data: JSON.stringify(errorCodeExplainIds),
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
      if (vm.errorCodeExplain.deviceType == null || vm.errorCodeExplain.deviceType === "") {
        vm.deviceTypeFlag = false;
      }else{
        vm.deviceTypeFlag = true;
      }
      if (vm.errorCodeExplain.errorType == null || vm.errorCodeExplain.errorType === "") {
        vm.errorTypeFlag = false;
      }else{
        vm.errorTypeFlag = true;
      }
      if (vm.errorCodeExplain.errorId == null || vm.errorCodeExplain.errorId === "") {
        vm.errorIdFlag = false;
      }else{
        vm.errorIdFlag = true;
      }
      if (vm.errorCodeExplain.errorExplain == null || vm.errorCodeExplain.errorExplain === "") {
        vm.errorExplainFlag = false;
      }else{
        vm.errorExplainFlag = true;
      }
      if (vm.errorCodeExplain.isStart == null || vm.errorCodeExplain.isStart === "") {
        vm.isStartFlag = false;
      }else{
        vm.isStartFlag = true;
      }
      if (vm.deviceTypeFlag === false || vm.errorTypeFlag === false
          || vm.errorIdFlag === false || vm.errorExplainFlag === false
          ||vm.isStartFlag === false ) {
        alert("请输入正确信息");
        return false;
      }
      var url =vm.errorCodeExplain.keyId  == null ? "deviceException/save" : "deviceException/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.errorCodeExplain),
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
    getErrorCodeExplain: function (keyId) {
      $.get(baseURL + "deviceException/getErrorCodeExplain/" + keyId, function (r) {
        vm.errorCodeExplain = r.errorCodeExplain;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'errorId': vm.q.exceCode,
          'errorExplain': vm.q.exceDescribe,
          'deviceType': vm.q.deviceType
        },
        page: page
      }).trigger("reloadGrid");
      vm.refresh();
    },
    refresh: function () {
      vm.deviceNameFlag = true;
      vm.shuttleIpFlag = true;
      vm.shuttlePortFlag = true;
      vm.safeElectricityFlag = true;
      vm.maxElectricityFlag = true;
      vm.minElectricityFlag = true;
      vm.xFlag = true;
      vm.yFlag = true;
      vm.zFlag = true;
      vm.warehouseIdFlag = true;
      vm.dutyTypeFlag = true;
    }
  }
});