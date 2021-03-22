$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'district/list',
    editurl: `${baseURL}/district/update`,
    datatype: "json",
    /*ajaxRowOptions: { contentType: 'application/json', type: "POST" },*/
    colModel: [
      {
        label: '库区编号',
        name: 'districtId',
        index: "districtId",
        width: 45,
        key: true
      },
      {label: '库区名称', name: 'districtName', width: 75, editable: true},
      {
        label: '所属仓库',
        name: 'warehouseId',
        width: 90,
        editable: true,
        edittype: 'select',
        editoptions: {value: vm.getWarehouseList()},
        formatter: function (value) {
          for (let i = 0; i < vm.warehouseList.length; i++) {
            if (value === vm.warehouseList[i].warehouseId) {
              return vm.warehouseList[i].warehouseName;
            }
          }
          return "---";

        }
      },
      {label: '起始节点', name: 'startNode', width: 80, editable: true},
      {label: '结束节点', name: 'endNode', width: 80, editable: true},
      {label: '本区域可用车辆', name: 'locationDevice', width: 80, editable: true},
      {label: '是否启用', name: 'isStart', width: 80, editable: true},
      {label: '备注', name: 'remark', width: 80, editable: true},
      {label: '创建时间', name: 'insertDate', index: "insertDate", width: 90}
    ],
    /*postData:{"warehouseId":vm.q.warehouseId},*/
    viewrecords: true,
    height: 385,
    rowNum: 6,
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
    gridComplete: function () {
      //隐藏grid底部滚动条
      $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"});
    },
    beforeRequest: function () {
      if (vm.q.warehouseId == null) {
        var url = decodeURI(window.location.href);
        vm.q.warehouseId = url.split("=")[1];
        $("#jqGrid").jqGrid('setGridParam', {
          postData: {"warehouseId": vm.q.warehouseId}
        }).trigger("reloadGrid");
        // console.log("vm.q.warehouseId" + vm.q.warehouseId);
        vm.getWarehouse(vm.q.warehouseId);
      }
      vm.getStorageStatus();
      vm.getAllFloors();
    }
  });

});

var vm = new Vue({
  el: '#honghu_cloud',
  data: {
    q: {
      warehouseId: null,
      storageStatusDescribe: null,
      floor:1
    },
    storageInfo: null,
    flag: 1,
    seen: false,
    current: null,
    showList: 1,
    floorList:[],
    title: "库区列表",
    warehouse: {},
    warehouseList: null,
    storageStatusList: null,
    district: {
      startNode: null,
      startX: null,
      startY: null,
      startZ: null,
      endNode: null,
      endX: null,
      endY: null,
      endZ: null
    },
    message: null,
    // showBox: false,
    // tranLeft: 0,
    // tranTop: 0,
    // boxItem: null
  },
  methods: {
    add: function () {
      vm.showList = false;
      vm.title = "新增";
      vm.getWarehouseMap();
    },
    toWarehouse: function () {
      window.location.href = baseURL + "modules/base/warehouse.html";
    },
    update: function () {
      var districtId = getSelectedRow();
      if (districtId == null) {
        return;
      }
      $("#saveBtn").css("pointer-events", "auto").attr("disabled", false);
      $("#restoreBtn").css("pointer-events", "auto").attr("disabled", false);
      /*vm.showList = false;
            vm.title = "修改";
      vm.getDistrict(districtId);
      vm.getWarehouseMap();*/
      vm.getWarehouseMap();
      $("#jqGrid").jqGrid('editRow', districtId);
    },
    doUpdate: function () {
      var districtId = getSelectedRow();
      if (districtId == null) {
        return;
      }
      $("#saveBtn").css("pointer-events", "none").attr("disabled", true);
      $("#restoreBtn").css("pointer-events", "none").attr("disabled", true);
      $("#jqGrid").jqGrid('saveRow', districtId);
      vm.reload();
    },
    restore: function () {
      var districtId = getSelectedRow();
      if (districtId == null) {
        return;
      }
      $("#jqGrid").jqGrid('restoreRow', districtId);
      $("#saveBtn").css("pointer-events", "none").attr("disabled", true);
      $("#restoreBtn").css("pointer-events", "none").attr("disabled", true);
    },
    del: function () {
      var districtIds = getSelectedRows();
      if (districtIds == null) {
        return;
      }
      console.log(districtIds);
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "district/delete",
          contentType: "application/json",
          data: JSON.stringify(districtIds),
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
    saveOrUpdate: function () {
      var url = vm.district.districtId == null ? "district/save"
          : "district/update";
      vm.district.warehouseId = vm.warehouse.warehouseId;
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.district),
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

    forbidden: function () {
      var districtIds = getSelectedRows();
      if (districtIds == null) {
        return;
      }
      console.log(districtIds);
      confirm('确定要禁用所选区域？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "district/forbidden",
          contentType: "application/json",
          data: JSON.stringify(districtIds),
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
    startUsing: function () {
      var districtIds = getSelectedRows();
      if (districtIds == null) {
        return;
      }
      console.log(districtIds);
      confirm('确定要启用所选区域？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "district/startUsing",
          contentType: "application/json",
          data: JSON.stringify(districtIds),
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

    getDistrict: function (districtId) {
      $.get(baseURL + "district/info/" + districtId, function (r) {
        if (r.code === 0) {
          vm.district = r.district;
        } else {
          alert(r.msg);
        }

      });

    },
    getWarehouse: function (warehouseId) {
      $.get(baseURL + "warehouse/info/" + warehouseId, function (r) {
        if (r.code === 0) {
          vm.warehouse = r.warehouse;
          vm.q.warehouseId = warehouseId;
        } else {
          alert(r.msg);
        }

      });
    },
    getWarehouseMap: function () {
      $.get(baseURL + "monitor/getMap/"+vm.q.floor, function (r) {
        if (r.code === 0) {
          vm.storageInfo = r.storageInfos;
        } else {
          alert(r.msg);
        }
      });
    },
    getWarehouseList: function () {
      let str = "";
      $.ajax({
        type: "POST",
        url: baseURL + "warehouse/getAll",
        contentType: "application/json",
        async: false,
        success: function (r) {
          if (r.code === 0) {
            if (r.warehouseList != null) {
              vm.warehouseList = r.warehouseList;
              let len = r.warehouseList.length;
              for (let i = 0; i < r.warehouseList.length; i++) {
                if (i != len - 1) {
                  str += r.warehouseList[i].warehouseId + ":"
                      + r.warehouseList[i].warehouseName + ";";
                } else {
                  str += r.warehouseList[i].warehouseId + ":"
                      + r.warehouseList[i].warehouseName;// 这里是option里面的 value:label
                }
              }
            }
          }
        }
      });
      return str;
    },
    getStorageStatus: function () {
      $.get(baseURL + "storage/getStorageStatus", function (r) {
        vm.storageStatusList = r.list
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {"warehouseId": vm.q.warehouseId},
        page: page
      }).trigger("reloadGrid");
    },
    getlocation: function (item) {
      if (this.flag == 1) {
        this.district.startNode = "(" + item.x + "," + item.y + "," + item.z
            + ")";
        this.district.startX = item.x;
        this.district.startY = item.y;
        this.district.startZ = item.z;
      } else if (this.flag == 2) {
        this.district.endNode = "(" + item.x + "," + item.y + "," + item.z
            + ")";
        this.district.endX = item.x;
        this.district.endY = item.y;
        this.district.endZ = item.z;
      }
    },
    toStartNode: function () {
      this.flag = 1;
    },
    toEndNode: function () {
      this.flag = 2;
    },
    getAllFloors:function(){
      $.get(baseURL+"storage/getAllFloors",function (r) {
        vm.floorList=r.floors;
      });
    },
    enter: function (item, e) {
      for (let i = 0; i < vm.storageStatusList.length; i++) {
        if (item.status === vm.storageStatusList[i].sign) {
          vm.q.storageStatusDescribe = vm.storageStatusList[i].describe;
        }
      }
      vm.message = '坐标：' + '(' + item.x + ',' + item.y + ',' + item.z + ')'
          + '\n' + '货位状态：' + vm.q.storageStatusDescribe;
    }
  }
});