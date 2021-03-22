$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'shuttleCar/list',
        datatype: "json",
        colModel: [
            {label: '设备号', name: 'deviceId', index: "deviceId", width: 60, key: true},
            {label: '设备ip', name: 'shuttleIp', width: 120},
            {label: '设备状态(WCS)', name: 'deviceStatusWcsDescribe', width: 120},
            {label: '设备状态(单片机)', name: 'deviceStatusScmDescribe', width: 130},
            {
                label: '坐标',
                name: 'z',
                width: 80,
                formatter: function (value, option, row) {
                    return  + row.x + "-" + row.y + "-" + row.z ;
                }
            },
            {label: '载货状态', name: 'palletStatusDescribe', width: 100},
            {label: '当前电量', name: 'actualElectricity', width: 70},
            {label: '最大电量', name: 'maxElectricity', width: 70},
            {label: '最小电量', name: 'minElectricity', width: 70},
            {label: '安全电量', name: 'safeElectricity', width: 70},
            {
                label: '电量监控',
                name: 'isCharge',
                width: 80,
                formatter: function (value, options, row) {
                    if (value === 'y') {
                        return '<span >自动充电</span>';
                    } else if (value === 'n') {
                        return '<span >不自动充电</span>';
                    } else {
                        return "---";
                        ;
                    }
                }
            },
            {label: '故障代码', name: 'errorNumber', width: 70},
            {label: '报警代码', name: 'warnNumber', width: 70},
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
        shrinkToFit: false,
        autoScroll: true,
        gridComplete: function () {
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "auto"}); //hidden ,scroll
            var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
            $("#jqGrid").jqGrid('setGridWidth', parent_column.width());

        },
        beforeRequest: function () {
            vm.getAllFloors();
            vm.getShuttleCarStatus();
            vm.getWarehouseList();
            vm.getDeviceStatusWCS();
            vm.getMoveDirection();
            vm.getPalletStatus();
        }
    });
    $('.ui-jqgrid tr th').css({"text-align": "center"});
    $('#jqGrid').css({"text-align": "center"});
});

var vm = new Vue({
    el: '#honghu_cloud',
    data: {
        q: {
            deviceId: null,
            shuttleStatus: "all",
            dutyType: '',
            taskType: '',
            floor: 1
        },
        devices: {},
        aaa:null,
        statusList: null,
        wcsStatusList: null,
        warehouseList: null,
        moveDirectionList: null,
        palletStatusList: null,
        // selected:'',
        showList: true,
        title: null,
        deviceStatusScm: '',
        chargeList: [
            {"value": "y", "label": "是"},
            {"value": "n", "label": "否"}
        ],
        shuttleCar: {
            warehouseId: ""
        },
        dutyDistribution: {},
        dutyTypeList: [
            {"value": "taskType", "label": "任务类型"},
            // {"value": "gateway", "label": "出入口"},
            {"value": "area", "label": "区域"},
            {"value": "taskPeak", "label": "区域任务峰值"}
            // {"value": "randomDispatch", "label": "随机调度"}
        ],
        typeList: [
            // {"value":"","label":"任务类型"},
            {"value": "10", "label": "入库"},
            {"value": "20", "label": "出库"},
            {"value": "2", "label": "移库"},
            {"value": "3", "label": "充电"},
            {"value": "4", "label": "调车"}
        ],
        chargerIdList: null,
        storageInfo: null,
        message: null,
        flag: 0,

        shuttleCarId: null,   //绑定充电桩
        shuttleCarIdCacheBit: null,  //绑定缓存位
        tempChargerId: null,
        tempCacheBit: null,
        floorList: [],

        //表单输入验证
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
        query: function () {
            vm.reload();
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.shuttleCar = {};
            vm.shuttleCar.deviceStatusWcs = 'idle';
            // vm.shuttleCar.warehouseId=vm.warehouseList[0];
            // vm.dutyDistribution = {};
            vm.showAndorUpdate = true;
            vm.getWarehouseMap();
            vm.shuttleCar.chargerId = '';
            vm.shuttleCar.cacheBit = '';
            vm.flag = 0;
            vm.q.dutyType = '';
            // vm.q.dutyType=vm.dutyTypeList[0].value;
            // vm.dutyDistribution.dutyType= vm.dutyTypeList[0].value;
        },
        update: function () {
            var deviceId = getSelectedRow();
            if (deviceId == null) {
                return;
            }
            vm.showList = false;
            vm.title = "修改";
            vm.showAndorUpdate = false;
            // vm.getDutyDistribution(deviceId);
            vm.getShuttle(deviceId);
            vm.getWarehouseMap();
            vm.flag = 0;
        },
        del: function () {
            var deviceIds = getSelectedRows();
            if (deviceIds == null) {
                return;
            }
            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "shuttleCar/delete",
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
        saveOrUpdate: function () {
            if (!Boolean(vm.checkAllTribute())) {
                return;
            }
            if (vm.title === "新增") {
                // vm.dutyDistribution.deviceId = vm.shuttleCar.deviceId;
                $.ajax({
                    type: "POST",
                    url: baseURL + "shuttleCar/save",
                    contentType: "application/json",
                    data: JSON.stringify(vm.shuttleCar),
                    success: function (r) {
                        if (r.code === 0) {
                            // saveDutyDistribution();
                            alert('保存成功', function () {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });

                function saveDutyDistribution() {
                    // vm.dutyDistribution.taskType=vm.q.taskType;
                    $.ajax({
                        type: "POST",
                        url: baseURL + "dutyDistribution/save",
                        contentType: "application/json",
                        data: JSON.stringify(vm.dutyDistribution),
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
                }
            } else if (vm.title === "修改") {
                $.ajax({
                    type: "POST",
                    url: baseURL + "shuttleCar/update",
                    contentType: "application/json",
                    data: JSON.stringify(vm.shuttleCar),
                    success: function (r) {
                        if (r.code === 0) {
                            // updateDutyDistribution();
                            alert('操作成功', function () {
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });

                function updateDutyDistribution() {
                    if (vm.dutyDistribution.dutyType === 'taskType') {
                        // vm.dutyDistribution.dutyType='area';
                        vm.dutyDistribution.districtId = '';
                        vm.dutyDistribution.coordinateXyz = '';
                        vm.dutyDistribution.taskPeak = '';
                    } else if (vm.dutyDistribution.dutyType === 'gateway') {
                        vm.dutyDistribution.districtId = '';
                        vm.dutyDistribution.taskType = '';
                        vm.dutyDistribution.taskPeak = '';
                    } else if (vm.dutyDistribution.dutyType === 'area') {
                        vm.dutyDistribution.coordinateXyz = '';
                        vm.dutyDistribution.taskType = '';
                        vm.dutyDistribution.taskPeak = '';
                    } else if (vm.dutyDistribution.dutyType === 'taskPeak') {
                        vm.dutyDistribution.coordinateXyz = '';
                        vm.dutyDistribution.taskType = '';
                        vm.dutyDistribution.districtId = '';
                    } else {
                        vm.dutyDistribution.taskPeak = '';
                        vm.dutyDistribution.coordinateXyz = '';
                        vm.dutyDistribution.taskType = '';
                        vm.dutyDistribution.districtId = '';
                    }
                    $.ajax({
                        type: "POST",
                        url: baseURL + "dutyDistribution/update",
                        contentType: "application/json",
                        data: JSON.stringify(vm.dutyDistribution),
                        success: function (r) {
                            if (r.code === 0) {
                                // alert('操作成功', function () {
                                //   vm.reload();
                                // });
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                }
            }
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
            }
            // else if (msg === 'dutyType') {
            //   if (vm.q.dutyType == null || vm.q.dutyType === "") {
            //     vm.dutyTypeFlag = false;
            //   } else {
            //     vm.dutyTypeFlag = true;
            //   }
            // }
            else if (msg === 'warehouseId') {
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
            // if (vm.showAndorUpdate === true) {  //编辑
            //   if (vm.q.dutyType == null || vm.q.dutyType === "") {
            //     vm.dutyTypeFlag = false;
            //     return false;
            //   }
            // } else {
            //   if (vm.dutyDistribution.dutyType == null || vm.dutyDistribution.dutyType
            //       === "") {
            //     vm.dutyTypeFlag = false;
            //     return false;
            //   }
            // }

            // console.log(44);
            return true;
        },
        getShuttle: function (deviceId) {
            $.get(baseURL + "shuttleCar/info/" + deviceId, function (r) {
                vm.shuttleCar = r.shuttleCar;
            });
        },
        getDutyDistribution: function (deviceId) {
            $.get(baseURL + "dutyDistribution/info/" + deviceId, function (r) {
                vm.dutyDistribution = r.dutyDistribution;
            });
        },
        getWarehouseList: function () {
            $.get(baseURL + "warehouse/getAll/", function (r) {
                vm.warehouseList = r.warehouseList;
            });
        },
        getDeviceStatusWCS: function () {
            $.get(baseURL + "shuttleCar/getDeviceStatusWCS", function (r) {
                vm.wcsStatusList = r.list;
            });
        },
        getMoveDirection: function () {
            $.get(baseURL + "shuttleCar/getMoveDirection", function (r) {
                vm.moveDirectionList = r.list;
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
        andDutyType: function () {
            if (vm.title === "新增") {
                vm.dutyDistribution.dutyType = vm.q.dutyType;
            }
        },
        generateChargeTask: function () {
            var deviceIds = getSelectedRows();
            if (deviceIds == null) {
                return;
            }
            confirm('确定要生成充电任务？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "shuttleCar/generateChargeTask",
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
        clearalarm: function () {
            var deviceIds = getSelectedRows();
            if (deviceIds == null) {
                return;
            }
            confirm('确定要清除报警故障？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "shuttleCar/clearalarm/",
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
        callBackAllCar: function () {
            $.get(baseURL + "shuttleCar/callBackAllCar/", function (r) {
                if (r.code === 0) {
                    alert("所有小车已全部生成召回任务");
                } else {
                    alert(r.msg);
                }
            });
        },
        enter: function (item, ch) {
            $.ajax({
                type: "POST",
                url: baseURL + "shuttleCar/getShuttleCarId/" + ch,
                contentType: "application/json",
                data: JSON.stringify(item),
                success: function (r) {
                    if (r.code === 0) {
                        if (ch === 'charger') {
                            vm.shuttleCarId = r.shuttleCarId;   //绑定小车id
                            vm.message = '坐标：' + '(' + item.x + ',' + item.y + ',' + item.z
                                + ')' + '\n' + '货位编号：' + item.storageId + '\n' + "货位类型:"
                                + item.storageType + '\n'
                                + '绑定车辆：' + vm.shuttleCarId;
                        } else if (ch === 'cacheBit') {
                            vm.shuttleCarIdCacheBit = r.shuttleCarId;
                            vm.message = '坐标：' + '(' + item.x + ',' + item.y + ',' + item.z
                                + ')' + '\n' + '货位编号：' + item.storageId + '\n' + "货位类型:"
                                + item.storageType + '\n'
                                + '绑定车辆：' + vm.shuttleCarIdCacheBit;
                        }
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        getlocation: function (item, ch) {
            if (vm.flag === 1 && ch === "charger") {
                if (vm.shuttleCarId == null) {
                    vm.shuttleCar.chargerId = item.storageId;
                    vm.$forceUpdate();
                } else if (vm.shuttleCarId === vm.shuttleCar.deviceId && vm.title
                    === "修改") {
                    vm.shuttleCar.chargerId = vm.tempChargerId;
                } else if (vm.shuttleCarId != null && vm.shuttleCar.deviceId
                    !== vm.shuttleCarId) {
                    alert("充电桩已被" + vm.shuttleCarId + "号车占用，请选择其他充电桩");
                }
            }
            if (vm.flag === 2 && ch === 'cacheBit') {
                if (vm.shuttleCarIdCacheBit == null) {
                    vm.shuttleCar.cacheBit = item.storageId;
                } else if (vm.shuttleCarIdCacheBit === vm.shuttleCar.deviceId
                    && vm.title === "修改") {
                    vm.shuttleCar.cacheBit = vm.tempCacheBit;
                } else if (vm.shuttleCarIdCacheBit != null && vm.shuttleCar.deviceId
                    !== vm.shuttleCarIdCacheBit) {
                    alert("缓存位已被" + vm.shuttleCarIdCacheBit + "号车占用，请选择其他缓存位");
                }
            }
        },
        toChargerNode: function () {
            vm.flag = 1;
            if (vm.title === "修改") {
                vm.tempChargerId = vm.shuttleCar.chargerId;
            }
            $('#storageInfoWindow').modal('show');

        },
        toCacheBitNode: function () {
            vm.flag = 2;
            if (vm.title === "修改") {
                vm.tempCacheBit = vm.shuttleCar.cacheBit;
            }
            $('#storageInfoWindow').modal('show');
        },
        getAllFloors: function () {
            $.get(baseURL + "storage/getAllFloors", function (r) {
                vm.floorList = r.floors;
            });
        },
        toDistrict: function () {
            var deviceId = getSelectedRow();
            if (deviceId == null) {
                return;
            }
            window.location.href = baseURL
                + "modules/device/chargerInfo.html?shuttleCar=" + deviceId;
        },
        toCarDuty: function () {
            var deviceId = getSelectedRow();
            if (deviceId == null) {
                return;
            }
            window.location.href = baseURL
                + "modules/device/carDuty.html?shuttleCar=" + deviceId;
        },
        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'deviceId': vm.q.deviceId,
                    'deviceStatusWcs': vm.q.shuttleStatus
                },
                page: page
            }).trigger("reloadGrid");
            vm.refresh();
        },
        sendPathPause: function () {
            var deviceIds = getSelectedRows();
            if (deviceIds == null) {
                return;
            }
            confirm('确定要终止所选小车路径下发功能？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "shuttleCar/sendPathPause",
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
        unLockCar: function () {
            var deviceIds = getSelectedRows();
            if (deviceIds == null) {
                return;
            }
            confirm('确定要解锁小车？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "shuttleCar/rgvUnLock",
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
        sendPathRecover: function () {
            var deviceIds = getSelectedRows();
            if (deviceIds == null) {
                return;
            }
            confirm('确定要恢复所选小车路径下发功能？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "shuttleCar/sendPathRecover",
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
        getAllDevices: function (n) {
            $.get(baseURL + "shuttleCar/getAllDevicesInDb", function (r) {
                vm.devices = r.list;
            });
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

// 动态刷新
setInterval(function () {
    var u = new SpeechSynthesisUtterance();
    var c = new SpeechSynthesisUtterance();
    u.text = "语音播放";
    c.text = "语音播放";
    u.lang = 'zh';
    u.rate = 1;
    u.pitch=1;
    u.volume=1;
    c.lang = 'zh';
    c.rate = 1;
    c.pitch=1;
    c.volume=1;
    vm.getAllDevices();
    for (var i = 0; i < vm.devices.length; i++) {
        if (vm.devices[i].deviceStatusWcs === "error") {
            u.text = vm.devices[i].deviceId + "号小车 故障 ！！！"
            //     +"，故障代码："+vm.devices[i].errorNumber+" 报警代码："+vm.devices[i].warnNumber
            // +"请尽快处理！！！";
            break;
        }
    }
    if (u.text !== "语音播放") {
        speechSynthesis.speak(u);
    }

    for (var i = 0; i < vm.devices.length; i++) {
        if (Number(vm.devices[i].actualElectricity )<= 40) {
            c.text = vm.devices[i].deviceId + "号小车 电量低于40，请检查运行状态 ！！！"
            //     +"，故障代码："+vm.devices[i].errorNumber+" 报警代码："+vm.devices[i].warnNumber
            // +"请尽快处理！！！";
            break;
        }
    }
    if (c.text !== "语音播放") {
        speechSynthesis.speak(c);
    }
}, 1000 * 10);