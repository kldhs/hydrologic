$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcParam/pageList',
    datatype: "json",
    colModel: [
      {label: 'PLC编号', name: 'plcId', width: 60, key: true},
      {label: 'PLC名称', name: 'plcName', width: 80},
      {label: 'IP', name: 'plcIp', width: 120},
      {label: '主端口', name: 'masterPort', width: 80},
      {label: '从端口', name: 'slavePort', width: 100},
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
      plcName:null,
      plcIp:null,
    },
    plcParam:{
      plcId:null,
      plcName:null,
      plcIp:null,
      masterPort:null,
      slavePort:null,

    },
    showList: true,
    title: null,
    plcNameFlag: true,
    plcIpFlag: true,
    masterPortFlag: true,
    slavePortFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },

    // exceptionCodeEdit: function(){
    //   var url = baseURL + "modules/device/exceptionCodeEdit.html";
    //   window.location.href = url;
    // },
    // back: function(){
    //   var url = baseURL + "modules/device/deviceException.html";
    //   window.location.href = url;
    // },

    add: function () {
      vm.plcParam={};
      vm.showList = false;
      vm.title = "新增";
    },
    update: function () {
      var plcId = getSelectedRow();
      if (plcId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getErrorCodeExplain(plcId);
    },
    del: function () {
      var plcIds = getSelectedRows();
      if (plcIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcParam/delete",
          contentType: "application/json",
          data: JSON.stringify(plcIds),
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
      if (vm.plcParam.plcName == null || vm.plcParam.plcName === "") {
        vm.plcNameFlag = false;
      }else{
        vm.plcNameFlag = true;
      }
      if (vm.plcParam.plcIp == null || vm.plcParam.plcIp === "") {
        vm.plcIpFlag = false;
      }else{
        vm.plcIpFlag = true;
      }
      if (vm.plcParam.masterPort == null || vm.plcParam.masterPort === "") {
        vm.masterPortFlag = false;
      }else{
        vm.masterPortFlag = true;
      }
      if (vm.plcParam.slavePort == null || vm.plcParam.slavePort === "") {
        vm.slavePortFlag = false;
      }else{
        vm.slavePortFlag = true;
      }

      if (vm.plcNameFlag === false || vm.plcIpFlag === false
          || vm.masterPortFlag === false || vm.slavePortFlag === false ) {
        alert("请输入正确信息");
        return false;
      }
      var url = vm.plcParam.plcId == null ? "plcParam/save" : "plcParam/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.plcParam),
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
    getErrorCodeExplain: function (plcId) {
      $.get(baseURL + "plcParam/getPlcParam/" + plcId, function (r) {
        vm.plcParam = r.plcParam;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'plcName': vm.q.plcName,
          'plcIp': vm.q.plcIp,
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