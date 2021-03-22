$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcDataCommandExplain/pageList',
    datatype: "json",
    colModel: [
      {label: '主键', name: 'keyId', width: 60, key: true},
      {label: '数据点名称', name: 'explain', width: 80},
      {label: '指令编号', name: 'commandId', width: 120},
      {label: '指令名称', name: 'commandName', width: 80},
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
      explain:null,
      commandId:null,
      commandName:null,
    },
    plcCommandExplain:{
      keyId:null,
      explain:null,
      commandId:null,
      commandName:null,
    },
    showList: true,
    title: null,
    explainFlag: true,
    commandIdFlag: true,
    commandNameFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },
    add: function () {
      vm.plcCommandExplain={};
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
      vm.getPlcCommandExplain(keyId);
    },
    del: function () {
      var keyIds = getSelectedRows();
      if (keyIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcDataCommandExplain/delete",
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
      if (vm.plcCommandExplain.explain == null || vm.plcCommandExplain.explain === "") {
        vm.explainFlag = false;
      }else{
        vm.explainFlag = true;
      }
      if (vm.plcCommandExplain.commandId == null || vm.plcCommandExplain.commandId === "") {
        vm.commandIdFlag = false;
      }else{
        vm.commandIdFlag = true;
      }
      if (vm.plcCommandExplain.commandName == null || vm.plcCommandExplain.commandName === "") {
        vm.commandNameFlag = false;
      }else{
        vm.commandNameFlag = true;
      }

      if (vm.explainFlag === false || vm.commandIdFlag === false
          || vm.commandNameFlag === false ) {
        alert("请输入正确信息");
        return false;
      }
      var url = vm.plcCommandExplain.plcId == null ? "plcDataCommandExplain/save" : "plcDataCommandExplain/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.plcCommandExplain),
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
    getPlcCommandExplain: function (keyId) {
      $.get(baseURL + "plcDataCommandExplain/getPlcParam/" + keyId, function (r) {
        vm.plcCommandExplain = r.plcCommandExplain;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'explain': vm.q.explain,
          'commandId': vm.q.commandId,
          'commandName': vm.q.commandName,
        },
        page: page
      }).trigger("reloadGrid");
      vm.refresh();
    },
    refresh: function () {
      vm.explainFlag = true;
      vm.commandIdFlag = true;
      vm.commandNameFlag = true;
    }
  }
});