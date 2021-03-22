
$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcPointWrite/pageList',
    datatype: "json",
    colModel: [
      {label: '数据点编号', name: 'pointId', width: 60, key: true},
      {label: 'PLC编号', name: 'plcId', width: 80},
      {label: '设备编号', name: 'deviceId', width: 120},
      {label: 'DB块编号', name: 'dbId', width: 80},
      {label: '偏移地址', name: 'dbAddress', width: 100},
      {label: '数据点名称', name: 'dataPoint', width: 120},
      {label: '写入数据类型', name: 'dataType', width: 130},
      {label: '当前值', name: 'value', width: 120},
      {label: '历史值', name: 'oldValue', width: 130},
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
      deviceId:null,
      dataPoint: null,
    },
    plcPointWrite:{
      pointId:null,
      deviceId: null,
      dbId: null,
      dbAddress: null,
      dataPoint: null,
      dataType: null,
    },
    showList: true,
    title: null,
    deviceIdFlag: true,
    dbIdFlag: true,
    dbAddressFlag: true,
    dataPointFlag: true,
    dataTypeFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },
    add: function () {
      vm.showList = false;
      vm.title = "新增";
      vm.plcPointWrite = {};
    },
    update: function () {
      var pointId = getSelectedRow();
      if (pointId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getPlcPointWrite(pointId);
    },
    del: function () {
      var pointIds = getSelectedRows();
      if (pointIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcPointWrite/delete",
          contentType: "application/json",
          data: JSON.stringify(pointIds),
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
      if (vm.plcPointWrite.deviceId == null || vm.plcPointWrite.deviceId === "") {
        vm.deviceIdFlag = false;
      } else {
        vm.deviceIdFlag = true;
      }
      if (vm.plcPointWrite.dbId == null || vm.plcPointWrite.dbId === "") {
        vm.dbIdFlag = false;
      } else {
        vm.dbIdFlag = true;
      }
      if (vm.plcPointWrite.dbAddress == null || vm.plcPointWrite.dbAddress
          === "") {
        vm.dbAddressFlag = false;
      } else {
        vm.dbAddressFlag = true;
      }
      if (vm.plcPointWrite.dataPoint == null || vm.plcPointWrite.dataPoint
          === "") {
        vm.dataPointFlag = false;
      } else {
        vm.dataPointFlag = true;
      }
      if (vm.plcPointWrite.dataType == null || vm.plcPointWrite.dataType
          === "") {
        vm.dataTypeFlag = false;
      } else {
        vm.dataTypeFlag = true;
      }
      if (vm.deviceIdFlag === false || vm.dbIdFlag === false
          || vm.dbAddressFlag === false || vm.dataPointFlag === false
          || vm.dataTypeFlag === false) {
        alert("请输入正确信息");
        return false;
      }
      var url = vm.plcPointWrite.pointId == null ? "plcPointWrite/save" : "plcPointWrite/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.plcPointWrite),
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
    getPlcPointWrite: function (keyId) {
      $.get(baseURL + "plcPointWrite/getPlcPointWrite/" + keyId, function (r) {
        vm.plcPointWrite = r.plcPointWrite;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'plcId': vm.q.plcId,
          'deviceId': vm.q.deviceId,
          'dataPoint': vm.q.dataPoint
        },
        page: page
      }).trigger("reloadGrid");
      vm.refresh();
    },
    refresh: function () {
      vm.deviceIdFlag = true;
      vm.vmbIdFlag = true;
      vm.mdbAddressFlag = true;
      vm.vmdataPointFlag = true;
      vm.vmdataTypeFlag = true;
    }
  }
});