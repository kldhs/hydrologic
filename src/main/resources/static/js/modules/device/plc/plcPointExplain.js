
$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcDataExplainConfig/pageList',
    datatype: "json",
    colModel: [
      {label: '主键', name: 'keyId', width: 60, key: true},
      {label: '数据点编号', name: 'pointId', width: 80},
      {label: '说明编号', name: 'explainId', width: 120},
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
      pointId:null,
      explainId:null,
    },
    plcDataExplainConfig:{
      keyId:null,
      pointId:null,
      explainId:null,
    },
    showList: true,
    title: null,
    pointIdFlag: true,
    explainIdFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },

    add: function () {
      vm.showList = false;
      vm.title = "新增";
      vm.plcDataExplainConfig = {};
    },
    update: function () {
      var deviceId = getSelectedRow();
      if (deviceId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getPlcDataExplainConfig(deviceId);
    },
    del: function () {
      var deviceIds = getSelectedRows();
      if (deviceIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcDataExplainConfig/delete",
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
      if (vm.plcDataExplainConfig.pointId == null || vm.plcDataExplainConfig.pointId === "") {
        vm.pointIdFlag = false;
      }else{
        vm.pointIdFlag = true;
      }
      if (vm.plcDataExplainConfig.explainId == null || vm.plcDataExplainConfig.explainId === "") {
        vm.explainIdFlag = false;
      }else{
        vm.explainIdFlag = true;
      }
      if (vm.pointIdFlag === false || vm.explainIdFlag === false ) {
        alert("请输入正确信息");
        return false;
      }
      var url = vm.plcDataExplainConfig.keyId == null ? "plcDataExplainConfig/save" : "plcDataExplainConfig/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.plcDataExplainConfig),
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
    getPlcDataExplainConfig: function (keyId) {
      $.get(baseURL + "plcDataExplainConfig/getPlcDataExplainConfig/" + keyId, function (r) {
        vm.plcDataExplainConfig = r.plcDataExplainConfig;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'pointId': vm.q.pointId,
          'explainId': vm.q.explainId,
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