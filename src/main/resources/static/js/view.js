// 动态刷新
setInterval(function () {
    if(window.sessionStorage.getItem("localStorageindexRefreshFlag")==="首页"){
        vm.refreshView();
    }
}, 1000 * 1.5);

$(function () {
    vm.getMonitorType();
    vm.getFloorList();
    vm.getShuttleCarStatus();
    vm.getWarehouseList();
    vm.getDeviceStatusWCS();
    vm.getMoveDirection();
    vm.getPalletStatus();
    vm.getAllDevices(1);
    vm.getStorageStatus();
    vm.getStorageType();

    $("#jqGrid").jqGrid({
        url: baseURL + 'shuttleCar/listForView',
        // url: baseURL + 'shuttleCar/list',
        datatype: "json",
        colModel: [
            {
                width: 80, formatter: function (value, row, index) {
                    if (index.rankOne.deviceId === 0) {
                        return "";
                    } else {
                        return '<div class="view-device-td " >'
                            +'<div class="view-device-td-image" style="height:140px;"> </div>'
                            +'<div class="view-div">'+ '<div  class="view-span-left">' +"编号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.deviceId + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"IP:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.shuttleIp + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.deviceStatusWcs + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"坐标:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.x +"-"
                            +index.rankOne.y+"-"
                            +index.rankOne.z+ '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"电量:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.actualElectricity + '</div>'+'</div>'
                            + '</div>';
                    }
                }
            },
            {
                width: 80, formatter: function (value, row, index) {
                    if (index.rankTwo.deviceId === 0) {
                        return "";
                    } else {
                        return '<div class="view-device-td " >'
                            +'<div class="view-device-td-image" style="height:140px;"> </div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"编号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.deviceId + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"IP:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.shuttleIp + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.deviceStatusWcs + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"坐标:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.x +"-"
                            +index.rankTwo.y+"-"
                            +index.rankTwo.z+ '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"电量:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.actualElectricity + '</div>'+'</div>'
                            + '</div>';
                    }
                }
            },
            {
                width: 80, formatter: function (value, row, index) {
                    if (index.rankThree.deviceId === 0) {
                        return "";
                    } else {
                        return '<div class="view-device-td " >'
                            +'<div class="view-device-td-image" style="height:140px;"> </div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"编号:"+ '</div>'+ '<div   class="view-span-right">' + index.rankThree.deviceId + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"IP:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.shuttleIp + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.deviceStatusWcs + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"坐标:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.x +"-"
                            +index.rankThree.y+"-"
                            +index.rankThree.z+ '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"电量:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.actualElectricity + '</div>'+'</div>'
                            + '</div>';
                    }
                }
            },
            {
                width: 80, formatter: function (value, row, index) {
                    if (index.rankFour.deviceId === 0) {
                        return "";
                    } else {
                        return '<div class="view-device-td " >'
                            +'<div class="view-device-td-image" style="height:140px;"> </div>'
                            +'<div class="view-div">'+ '<div class="view-span-left" >' +"编号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.deviceId + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div  class="view-span-left">' +"IP:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.shuttleIp + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div  class="view-span-left">' +"状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.deviceStatusWcs + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div  class="view-span-left">' +"坐标:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.x +"-"
                            +index.rankFour.y+"-"
                            +index.rankFour.z+ '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div  class="view-span-left">' +"电量:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.actualElectricity + '</div>'+'</div>'
                            + '</div>';
                    }
                }
            },
        ],
        height: 800,
        rowNum: 100,
        rowList: [8, 16, 32],
        rownumWidth: 25,
        autowidth: true,
        shrinkToFit: false,
        autoScroll: true,
        rownumbers: false,
        viewrecords: true,
        cellEdit: true,
        forceFit: true,
        loadui: "Disable",
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
        },
    });
    $('.ui-jqgrid-hdiv').hide();
    $('.jqgfirstrow').hide();
    $('#load_jqGrid').hide();
    // $('.table-responsive').css({"overflow-x": "hidden"});
    // $('.table-responsive').css({"overflow-y": "hidden"});
    $('#load_jqGrid').css({"display": "none"});
    $('.ui-jqgrid-bdiv').css({"height": "600px"});
    $('.ui-jqgrid-bdiv').css({"width": "1226px"});
    $('#jqGrid').css({"width": "100%"});
    // $("#load_jqGrid").hide();
});

Vue.component('query', {
    props: {
        queryTitle: {
            type: String,
            default: '货位类型',
        },
        queryConfirm: {
            type: String,
            default: 'Yes'
        },
        queryCancel: {
            type: String,
            default: 'No'
        },

    },
    template: `<div class="storage-monitor-modal">
            <p>{{ queryTitle }}</p>
            <div class="slot">
            <slot>
            </slot></div>
            <div>
                <div >
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="storage" v-model="vm.storage.storageType"/> 货位
                     </label>
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="road" v-model="vm.storage.storageType"/> 坡道
                     </label>
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="in" v-model="vm.storage.storageType"/> 入库口
                     </label>
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="out" v-model="vm.storage.storageType"/> 出库口
                     </label>
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="hoister" v-model="vm.storage.storageType"/> 提升机
                     </label> 
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="ban" v-model="vm.storage.storageType"/> 禁用
                     </label> 
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="charger" v-model="vm.storage.storageType"/> 充电桩
                     </label>                           
               </div>
               <div style="text-align: center;margin-top: 13px">
                 <button class="btn btn-primary" @click="queryY()" @click="update">{{ queryConfirm }}</button>
             <button class="btn btn-warning" @click="queryN()" >{{ queryCancel }}</button> 
                </div>
            </div>
        </div>`,
    methods: {
        queryY() {
            this.$emit('y');
        },
        queryN() {
            this.$emit('n');
        },
        update() {
            this.$parent.update()
        }
    }
});

var vm = new Vue({
    el: '#app',
    data() {
        return {
            monitorTypeList: null,
            floorList: null,
            page: null,
            q: {
                floor: 1,
                monitorType: "",
                startNode: null,
                endNode: null,
                storageStatusDescribe: null,
                storageTypeDescribe: null,
            },
            info: null,
            flag: 0,
            devices: null,
            floors: null,
            storage: {},
            message: '',
            selected: '',
            isHide: true,
            lock: null,
            style1: false,
            storageStatusList: null,
            storageTypeList: null,
        }
    },
    methods: {
        getMonitorType: function () {
            $.get(baseURL + "monitor/getAllMonitorType/", function (r) {
                vm.monitorTypeList = r.list;
            });
        },
        getFloorList: function () {
            $.get(baseURL + "storage/getAllFloors", function (r) {
                vm.floorList = r.floors;
            });
        },

        refreshView: function () {
            if (vm.q.monitorType === "") {
                $(".view-device").show();
                $(".view-map").show();
                vm.refreshMap();
                vm.refreshDevicesForMap();
                vm.refreshDevicesForView();
            } else if (vm.q.monitorType === "0") {
                $(".view-device").hide();
                $(".view-map").show();
                vm.refreshMap();
                vm.refreshDevicesForMap();
            } else if (vm.q.monitorType === "1") {
                $(".view-device").show();
                $(".view-map").hide();
                vm.refreshDevicesForView();
            }
        },
        refreshMap: function () {
            axios
                .get('//monitor/getMap/' + vm.q.floor)
                .then(response => (this.info = response.data.storageInfos))
                .catch(function (error) {
                    console.log(error);
                });
        },
        refreshDevicesForMap: function () {
            axios
                .get(baseURL + "shuttleCar/getAllDevices/"+vm.q.floor)
                .then(response => (vm.devices = response.data.list))
                .then(vm.getCarPositionCss())
                .catch(function (error) {
                    console.log(error);
                });
        },
        refreshDevicesForView: function () {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('setGridParam', {
                page: page
            }).trigger("reloadGrid");
        },

        getlocation: function (obj) {
            if (this.flag == 1) {
                vm.genTask.startX = obj.x;
                vm.genTask.startY = obj.y;
                vm.genTask.startZ = obj.z;
                this.q.startNode = "(" + obj.x + "," + obj.y + "," + obj.z + ")";
            } else if (this.flag == 2) {
                vm.genTask.endX = obj.x;
                vm.genTask.endY = obj.y;
                vm.genTask.endZ = obj.z;
                this.q.endNode = "(" + obj.x + "," + obj.y + "," + obj.z + ")";
            }
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
        toStartNode: function () {
            this.flag = 1;
        },
        toEndNode: function () {
            this.flag = 2;
        },

        hideLayer: function () {
            $('#layer').hide();
        },
        hover: function (obj) {
            for (let i = 0; i < vm.storageStatusList.length; i++) {
                if (obj.status === vm.storageStatusList[i].sign) {
                    vm.q.storageStatusDescribe = vm.storageStatusList[i].describe;
                }
            }
            for (let i = 0; i < vm.storageTypeList.length; i++) {
                if (obj.storageType === vm.storageTypeList[i].sign) {
                    vm.q.storageTypeDescribe = vm.storageTypeList[i].describe;
                }
            }
            vm.storage = obj;
            vm.message = "货位编号" + ':' + vm.storage.storageId + '\n' + "坐标" + ':' + '(' + vm.storage.x + ',' + vm.storage.y + ',' + vm.storage.z + ')' + '\n'
                + "货位类型" + ':' + vm.q.storageTypeDescribe + '\n' + "货位状态" + ':' + vm.q.storageStatusDescribe + '\n' + "锁标识" + ':'
                + vm.storage.lockMark + '\n' + "托盘号:" + vm.storage.palletId;
        },
        confirm() {
            this.isHide = !this.isHide;
            $('.box').hide();
            $('#layer').hide();
        },
        cancel() {
            this.isHide = !this.isHide;
            $('.box').hide();
            $('#layer').hide();
        },
        update: function () {
            var url = "storage/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.storage),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功');
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        clear: function () {
            vm.q.startNode = null;
            vm.q.endNode = null;
            vm.genTask.materialGrade = null;
            vm.genTask.palletId = null;
        },
        getCarPositionCss: function () {
            $("table tr td").removeClass('active1');
            $(".carIds").remove();
            for (let i = 0; i < vm.devices.length; i++) {
                // $("table tr:eq(" + (vm.devices[i].x) + ") td:nth-child(" + (vm.devices[i].y + 1) + ")").addClass('active1');
                $("table tr:eq(" + (vm.devices[i].x) + ") td:nth-child(" + (vm.devices[i].y + 1) + ")").prepend(
                    "<div class='carIds active1' style='height: 25px;width:25px;color:white;background:yellow;border-radius: 10px;text-align:center;vertical-align:middle;'><span style='text-align:center;vertical-align:middle;'>" + (vm.devices[i].deviceId) + "</span></div>");
            }
        },

        getAllDevices: function (n) {
            $.get(baseURL + "shuttleCar/getAllDevices/"+n, function (r) {
                vm.devices = r.list;
                vm.getCarPositionCss();
            });
        },
        getStorageStatus: function () {
            $.get(baseURL + "storage/getStorageStatus", function (r) {
                vm.storageStatusList = r.list
            });
        },
        getStorageType: function () {
            $.get(baseURL + "storage/getStorageType", function (r) {
                vm.storageTypeList = r.list
            });
        },
    },
});



