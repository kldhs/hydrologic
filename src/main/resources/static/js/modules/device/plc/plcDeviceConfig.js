
$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcDevice/pageList',
    datatype: "json",
    colModel: [
      {label: '设备编号', name: 'deviceId', width: 60, key: true},
      {label: 'PLC编号', name: 'plcId', width: 80},
      {label: '设备名称', name: 'deviceName', width: 120},
      {label: '设备位置', name: 'deviceLocation', width: 80},
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
      plcId:null,
      deviceName:null,
      deviceLocation: null,
    },
    plcDeviceInfo:{
      deviceId:null,
      plcId:null,
      deviceName:null,
      deviceLocation:null,
    },
    showList: true,
    title: null,
    plcIdFlag: true,
    deviceNameFlag: true,
    deviceLocationFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },

    add: function () {
      vm.showList = false;
      vm.title = "新增";
      vm.plcDeviceInfo = {};
    },
    update: function () {
      var deviceId = getSelectedRow();
      if (deviceId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getErrorCodeExplain(deviceId);
    },
    del: function () {
      var deviceIds = getSelectedRows();
      if (deviceIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcDevice/delete",
          contentType: "application/json",
          data: JSON.stringify(deviceIds),
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
      if (vm.plcDeviceInfo.plcId == null || vm.plcDeviceInfo.plcId === "") {
        vm.plcIdFlag = false;
      }else{
        vm.plcIdFlag = true;
      }
      if (vm.plcDeviceInfo.deviceName == null || vm.plcDeviceInfo.deviceName === "") {
        vm.deviceNameFlag = false;
      }else{
        vm.deviceNameFlag = true;
      }
      if (vm.plcDeviceInfo.deviceLocation == null || vm.plcDeviceInfo.deviceLocation === "") {
        vm.deviceLocationFlag = false;
      }else{
        vm.deviceLocationFlag = true;
      }
      if (vm.plcIdFlag === false || vm.deviceNameFlag === false
          || vm.deviceLocationFlag === false ) {
        alert("请输入正确信息");
        return false;
      }
      var url = vm.plcDeviceInfo.deviceId == null ? "plcDevice/save" : "plcDevice/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.plcDeviceInfo),
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
    getErrorCodeExplain: function (deviceId) {
      $.get(baseURL + "plcDevice/getPlcDeviceInfo/" + deviceId, function (r) {
        vm.plcDeviceInfo = r.plcDeviceInfo;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'plcId': vm.q.plcId,
          'deviceName': vm.q.deviceName,
          'deviceLocation': vm.q.deviceLocation
        },
        page: page
      }).trigger("reloadGrid");
      vm.refresh();
    },
    refresh: function () {
      vm.plcIdFlag = true;
      vm.deviceNameFlag = true;
      vm.deviceLocationFlag = true;
    }
  }
});