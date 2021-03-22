$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'deviceException/pageList',
    datatype: "json",
    colModel: [
      {label: '主键', name: 'keyId', index: "deviceId", width: 60, key: true},
      {label: '设备编号', name: 'deviceId', width: 80},
      {label: '设备类型', name: 'deviceType', width: 120},
      {label: '所在仓库', name: 'warehouseId', width: 80},
      {label: '异常位置', name: 'errorLocation', width: 100},
      {label: '坐标X', name: 'x', width: 120},
      {label: '坐标Y', name: 'y', width: 130},
      {label: '坐标Z', name: 'z', idth: 80,},
      {label: '异常编号', name: 'errorId', width: 100},
      {label: '异常时间', name: 'errorTime', width: 100},
      {label: '异常类型', name: 'errorType', width: 70},
      {label: '备注', name: 'remark', width: 70},
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
    beforeRequest: function () {
      vm.getDeviceTypeList();
    }
  });
  $('.ui-jqgrid tr th').css({"text-align": "center"});
  $('#jqGrid').css({"text-align": "center"});
  $('#jqGrid').css({"vertical-align": "middle"});
});

var vm = new Vue({
  el: '#honghu_cloud',
  data: {
    q: {
      deviceId: null,
      deviceType: null
    },
    deviceTypeList:null,
    showList: true,


    chargerIdList: null,
    storageInfo: null,
    message: null,
    flag: 0,
    tempChargerId: null,
    tempCacheBit: null,
    floorList: [],

    deviceIdFlag: true,
    deviceNameFlag: true,
    shuttleIpFlag: true,
    shuttlePortFlag: true,
    safeElectricityFlag: true,
    maxElectricityFlag: true,
    minElectricityFlag: true,
    xFlag: true,
    yFlag: true,
    zFlag: true,
    warehouseIdFlag: true,
    dutyTypeFlag: true,
    selectFlag: true,
    showAndorUpdate: true

  },
  methods: {
    getDeviceTypeList:function () {
      $.get(baseURL + "deviceException/getDeviceTypeList", function (r) {
        vm.deviceTypeList = r.list;
      });
    },
    exceptionCodeEdit: function(){
      var url = baseURL + "modules/device/exceptionCodeEdit.html";
      window.location.href = url;
    },
    query: function () {
      vm.reload();
    },

    del: function () {
      var deviceExceptionIds = getSelectedRows();
      if (deviceExceptionIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "deviceException/delete",
          contentType: "application/json",
          data: JSON.stringify(deviceExceptionIds),
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
    //检索框输入正则验证
    regexSelect: function () {
      let reg = /^[1-9]\d*$/;
      if (vm.q.deviceId != null && vm.q.deviceId !== "" && !reg.test(
          vm.q.deviceId)) {
        vm.selectFlag = false;
        return;
      }
      vm.selectFlag = true;

    },
    //输入信息非空验证及正则验证。
    regex: function (msg) {
      let result = false;
      let reg = '';

      if (msg === 'deviceId') {
        reg = /^[1-9]\d*$/;
        result = reg.test(vm.shuttleCar.deviceId);
        if (vm.shuttleCar.deviceId == null || vm.shuttleCar.deviceId === ""
            || !Boolean(result)) {
          vm.deviceIdFlag = false;
        } else {
          vm.deviceIdFlag = true;
        }
      } else if (msg === 'deviceName') {
        if (vm.shuttleCar.deviceName == null || vm.shuttleCar.deviceName
            === "") {
          vm.deviceNameFlag = false;
        } else {
          vm.deviceNameFlag = true;
        }
      } else if (msg === 'shuttleIp') {
        reg = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/;
        result = reg.test(vm.shuttleCar.shuttleIp);
        if (!Boolean(result) || vm.shuttleCar.shuttleIp == null
            || vm.shuttleCar.shuttleIp === "") {
          vm.shuttleIpFlag = false;
        } else {
          vm.shuttleIpFlag = true;
        }
      } else if (msg === 'shuttlePort') {
        reg = /^[1-9]\d*$/;
        result = reg.test(vm.shuttleCar.shuttlePort);

        if (vm.shuttleCar.shuttlePort == null || vm.shuttleCar.shuttlePort
            === "" || !Boolean(result)) {
          vm.shuttlePortFlag = false;
        } else {
          vm.shuttlePortFlag = true;

        }
      } else if (msg === 'safeElectricity') {
        reg = /^[1-9]\d*$/;
        result = reg.test(vm.shuttleCar.safeElectricity);
        if (vm.shuttleCar.safeElectricity == null
            || vm.shuttleCar.safeElectricity === "" || !Boolean(result)
            || vm.shuttleCar.maxElectricity <= 0 || vm.shuttleCar.maxElectricity
            >= 100) {
          vm.safeElectricityFlag = false;
        } else {
          vm.safeElectricityFlag = true;
        }
      } else if (msg === 'maxElectricity') {
        reg = /^[1-9]\d*$/;
        result = reg.test(vm.shuttleCar.maxElectricity);
        if (vm.shuttleCar.maxElectricity == null || vm.shuttleCar.maxElectricity
            === "" || !Boolean(result) || vm.shuttleCar.maxElectricity <= 0
            || vm.shuttleCar.maxElectricity >= 100) {
          vm.maxElectricityFlag = false;
        } else {
          vm.maxElectricityFlag = true;
        }
      } else if (msg === 'minElectricity') {
        reg = /^[1-9]\d*$/;
        result = reg.test(vm.shuttleCar.minElectricity);
        if (vm.shuttleCar.minElectricity == null || vm.shuttleCar.minElectricity
            === "" || !Boolean(result) || vm.shuttleCar.maxElectricity <= 0
            || vm.shuttleCar.maxElectricity >= 100) {
          vm.minElectricityFlag = false;
        } else {
          vm.minElectricityFlag = true;
        }
      } else if (msg === 'x') {
        reg = /^([1-9]\d*|[0]{1,1})$/;
        result = reg.test(vm.shuttleCar.x);
        if (vm.shuttleCar.x == null || vm.shuttleCar.x === "" || !Boolean(
            result) || vm.shuttleCar.x < 0) {
          vm.xFlag = false;
        } else {
          vm.xFlag = true;
        }
      } else if (msg === 'y') {
        reg = /^([1-9]\d*|[0]{1,1})$/;
        result = reg.test(vm.shuttleCar.y);
        if (vm.shuttleCar.y == null || vm.shuttleCar.y === "" || !Boolean(
            result) || vm.shuttleCar.y < 0) {
          vm.yFlag = false;
        } else {
          vm.yFlag = true;
        }
      } else if (msg === 'z') {
        reg = /^[0-9]\d*$/;
        result = reg.test(vm.shuttleCar.z);
        if (vm.shuttleCar.z == null || vm.shuttleCar.z === "" || !Boolean(
            result) || vm.shuttleCar.z < 0) {
          vm.zFlag = false;
        } else {
          vm.zFlag = true;
        }
      } else if (msg === 'dutyType') {
        if (vm.q.dutyType == null || vm.q.dutyType === "") {
          vm.dutyTypeFlag = false;
        } else {
          vm.dutyTypeFlag = true;
        }
      } else if (msg === 'warehouseId') {
        if (!Boolean(vm.shuttleCar.warehouseId) || vm.shuttleCar.warehouseId
            == null || vm.shuttleCar.warehouseId === "") {
          vm.warehouseIdFlag = false;
        } else {
          vm.warehouseIdFlag = true;
        }
      }
    },
    checkAllTribute: function () {
      if (vm.deviceNameFlag === false || vm.shuttleIpFlag === false
          || vm.shuttlePortFlag === false || vm.safeElectricityFlag === false ||
          vm.maxElectricityFlag === false || vm.minElectricityFlag === false
          || vm.xFlag === false || vm.yFlag === false ||
          vm.zFlag === false || vm.warehouseIdFlag === false || vm.dutyTypeFlag
          === false) {
        alert("请输入正确信息");
        return false;
      }
      let result = false;
      let reg = /^[1-9]\d*$/;
      result = reg.test(vm.shuttleCar.deviceId);
      if (vm.shuttleCar.deviceId == null || vm.shuttleCar.deviceId === ""
          || !Boolean(result)) {
        vm.deviceIdFlag = false;
        return false;
      }

      if (vm.shuttleCar.deviceName == null || vm.shuttleCar.deviceName === "") {
        vm.deviceNameFlag = false;
        return false;
      }
      result = reg.test(vm.shuttleCar.warehouseId);
      if (vm.shuttleCar.warehouseId == null || vm.shuttleCar.warehouseId === ""
          || !Boolean(result)) {
        vm.warehouseIdFlag = false;
        return false;
      }
      reg = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/;
      result = reg.test(vm.shuttleCar.shuttleIp);
      if (vm.shuttleCar.shuttleIp == null || vm.shuttleCar.shuttleIp === ""
          || !Boolean(result)) {
        vm.shuttleIpFlag = false;
        return false;
      }
      reg = /^[1-9]\d*$/;
      result = reg.test(vm.shuttleCar.shuttlePort);
      if (vm.shuttleCar.shuttlePort == null || vm.shuttleCar.shuttlePort === ""
          || !Boolean(result)) {
        vm.shuttlePortFlag = false;
        return false;
      }
      result = reg.test(vm.shuttleCar.safeElectricity);
      if (vm.shuttleCar.safeElectricity == null || vm.shuttleCar.safeElectricity
          === "" || !Boolean(result)) {
        vm.safeElectricityFlag = false;
        return false;
      }
      result = reg.test(vm.shuttleCar.maxElectricity);
      if (vm.shuttleCar.maxElectricity == null || vm.shuttleCar.maxElectricity
          === "" || !Boolean(result)) {
        vm.maxElectricityFlag = false;
        return false;
      }
      result = reg.test(vm.shuttleCar.minElectricity);
      if (vm.shuttleCar.minElectricity == null || vm.shuttleCar.minElectricity
          === "" || !Boolean(result)) {
        vm.minElectricityFlag = false;
        return false;
      }
      reg = /^[0-9]\d*$/;
      result = reg.test(vm.shuttleCar.x);
      if (vm.shuttleCar.x == null || vm.shuttleCar.x === "" || !Boolean(
          result)) {
        vm.xFlag = false;
        return false;
      }
      result = reg.test(vm.shuttleCar.y);
      if (vm.shuttleCar.y == null || vm.shuttleCar.y === "" || !Boolean(
          result)) {
        vm.yFlag = false;
        return false;
      }
      result = reg.test(vm.shuttleCar.z);
      if (vm.shuttleCar.z == null || vm.shuttleCar.z === "" || !Boolean(
          result)) {
        vm.zFlag = false;
        return false;
      }
      if (vm.showAndorUpdate === true) {  //编辑
        if (vm.q.dutyType == null || vm.q.dutyType === "") {
          vm.dutyTypeFlag = false;
          return false;
        }
      } else {
        if (vm.dutyDistribution.dutyType == null || vm.dutyDistribution.dutyType
            === "") {
          vm.dutyTypeFlag = false;
          return false;
        }
      }
      console.log(44);
      return true;
    },
    getShuttle: function (deviceId) {
      $.get(baseURL + "shuttleCar/info/" + deviceId, function (r) {
        vm.shuttleCar = r.shuttleCar;
      });
    },

    getPalletStatus: function () {
      $.get(baseURL + "shuttleCar/getPalletStatus", function (r) {
        vm.palletStatusList = r.list;
      });
    },
    getShuttleCarStatus: function () {
      $.get(baseURL + "shuttleCar/getShuttleCarStatus", function (r) {
        vm.statusList = r.list;
      });
    },
    getWarehouseMap: function () {
      $.get(baseURL + "monitor/getMap/" + vm.q.floor, function (r) {
        if (r.code === 0) {
          vm.storageInfo = r.storageInfos;
        } else {
          alert(r.msg);
        }
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'deviceId': vm.q.deviceId,
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