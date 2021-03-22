$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcConveyorPath/pageList',
    datatype: "json",
    colModel: [
      {label: '路径编号', name: 'pathId', width: 60, key: true},
      {label: 'PLC编号', name: 'plcId', width: 80},
      {label: '起始位置', name: 'startLocation', width: 120},
      {label: '目的位置', name: 'endLocation', width: 80},
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
      pathId:null,
      plcIp:null,
      startLocation:null,
      endLocation:null,
    },
    plcConveyorPath:{
      pathId:null,
      plcId:null,
      startLocation:null,
      endLocation:null,
    },
    showList: true,
    title: null,
    plcIdFlag: true,
    startLocationFlag: true,
    endLocationFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },
    add: function () {
      vm.plcConveyorPath={};
      vm.showList = false;
      vm.title = "新增";
    },
    update: function () {
      var pathId = getSelectedRow();
      if (pathId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getPlcConveyorPath(pathId);
    },
    del: function () {
      var pathIds = getSelectedRows();
      if (pathIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcConveyorPath/delete",
          contentType: "application/json",
          data: JSON.stringify(pathIds),
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
      if (vm.plcConveyorPath.plcId == null || vm.plcConveyorPath.plcId === "") {
        vm.plcIdFlag = false;
      }else{
        vm.plcIdFlag = true;
      }
      if (vm.plcConveyorPath.startLocation == null || vm.plcConveyorPath.startLocation=== "") {
        vm.startLocationFlag = false;
      }else{
        vm.startLocationFlag = true;
      }
      if (vm.plcConveyorPath.endLocation == null || vm.plcConveyorPath.endLocation === "") {
        vm.endLocationFlag = false;
      }else{
        vm.endLocationFlag = true;
      }
      if (vm.plcIdFlag === false || vm.startLocationFlag === false
          || vm.endLocationFlag === false  ) {
        alert("请输入正确信息");
        return false;
      }
      var url = vm.plcConveyorPath.pathId == null ? "plcConveyorPath/save" : "plcConveyorPath/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.plcConveyorPath),
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
    getPlcConveyorPath: function (pathId) {
      $.get(baseURL + "plcConveyorPath/getPlcConveyorPath/" + pathId, function (r) {
        vm.plcConveyorPath = r.plcConveyorPath;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'pathId': vm.q.pathId,
          'plcIp': vm.q.plcIp,
          'startLocation': vm.q.startLocation,
          'endLocation': vm.q.endLocation,
        },
        page: page
      }).trigger("reloadGrid");
      vm.refresh();
    },
    refresh: function () {
      vm.plcIdFlag = true;
      vm.plcIdFlag = true;
      vm.plcIdFlag = true;
    }
  }
});