
$(function () {
    vm.getAllDevices();
    $("#jqGrid").jqGrid({
        url: baseURL + 'shuttleCar/pathForView',
        datatype: "json",
        colModel: [
            {
                width: 70, formatter: function (value, row, index) {
                    if (index.rankOne.deviceId === 0||index.rankOne.deviceId === "0") {
                        return "";
                    } else {
                        return '<div class="view-device-td " >'
                            +'<div class="view-div">'+ '<div  class="view-span-left">' +"编号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.deviceId + '</div>'
                            + '<div   class="view-span-left">' +"IP:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.shuttleIp + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"WCS状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.deviceStatusWcs + '</div>'
                            + '<div   class="view-span-left">' +"底层状态:"+ '</div>'+ '<div  class="view-span-right">' +index.rankOne.deviceStatusScm+ '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"托盘状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.palletStatus + '</div>'
                            + '<div   class="view-span-left">' +"实际电量:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.actualElectricity + '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"当前坐标:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.carCurrentNode+ '</div>'
                            + '<div   class="view-span-left">' +"是否被堵住:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.isBlocked + '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"报警代码:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.warmingCode+ '</div>'
                            + '<div   class="view-span-left">' +"故障代码:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.errorCode + '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"当前任务号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.taskId+ '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-path">' +"互锁小车:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy"  >' + index.rankOne.carLocks + '</textarea>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-path">' +"网络状况:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy"  rows="3" cols="68"  >' + index.rankOne.netstat+ '</textarea>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-path">' +"任务异常信息:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy"  rows="3" cols="68"  >' + index.rankOne.taskExceptionMessage+ '</textarea>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-path">' +"当前任务路径:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy" rows="3" cols="68"  >' + index.rankOne.allPath+ '</textarea>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-copy">' +"锁定节点:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy"  rows="3" cols="68" >' + index.rankOne.lockPath + '</textarea>'+'</div>'
                            + '</div>';
                    }
                }
            },
            {
                width: 70, formatter: function (value, row, index) {
                    if (index.rankTwo.deviceId === 0||index.rankTwo.deviceId === "0") {
                        return "";
                    } else {
                        return '<div class="view-device-td " >'
                            +'<div class="view-div">'+ '<div  class="view-span-left">' +"编号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.deviceId + '</div>'
                            + '<div   class="view-span-left">' +"IP:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.shuttleIp + '</div>'+'</div>'
                            +'<div class="view-div">'+ '<div   class="view-span-left">' +"WCS状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.deviceStatusWcs + '</div>'
                            + '<div   class="view-span-left">' +"底层状态:"+ '</div>'+ '<div  class="view-span-right">' +index.rankTwo.deviceStatusScm+ '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"托盘状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.palletStatus + '</div>'
                            + '<div   class="view-span-left">' +"实际电量:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.actualElectricity + '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"当前坐标:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.carCurrentNode + '</div>'
                            + '<div   class="view-span-left">' +"是否被堵住:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.isBlocked + '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"报警代码:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.warmingCode+ '</div>'
                            + '<div   class="view-span-left">' +"故障代码:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.errorCode + '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left">' +"当前任务号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.warmingCode+ '</div>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-path">' +"互锁小车:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy" >' + index.rankTwo.carLocks + '</textarea>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-path">' +"网络状况:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy"  rows="3" cols="68"  >' + index.rankOne.netstat+ '</textarea>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-path">' +"任务异常信息:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy"  rows="3" cols="68"  >' + index.rankTwo.taskExceptionMessage+ '</textarea>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-path">' +"当前任务路径:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy"  rows="3" cols="68"  >' + index.rankTwo.allPath+ '</textarea>'+'</div>'
                            +'<div  class="view-div">'+ '<div   class="view-span-left-copy">' +"锁定节点:"+ '</div>'+ '<textarea class="textarea-class view-span-right-copy"  rows="3" cols="68" >' + index.rankTwo.lockPath + '</textarea>'+'</div>'
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

    $('#load_jqGrid').css({"display": "none"});
    $('.ui-jqgrid-bdiv').css({"height": "600px"});
    $('.ui-jqgrid-bdiv').css({"width": "1226px"});
    $('#jqGrid').css({"width": "100%"});
});

var vm = new Vue({
    el: '#app',
    data() {
        return {
            q: {
                deviceId: null,
            },
            devices: [],
        }
    },
    methods: {
        releaseLock: function () {
            confirm('确定要释放该小车的锁资源？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "monitor/releaseLockResourceById",
                    contentType: "application/json",
                    data: JSON.stringify(vm.q.deviceId),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('当前小车锁资源已释放');
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },

        releaseRunResource: function () {
            confirm('确定要释放该小车的路径资源？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "monitor/releaseRunResourceById",
                    contentType: "application/json",
                    data: JSON.stringify(vm.q.deviceId),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('当前小车路径资源已释放');
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },
        interrupt: function () {
            confirm('确定要释放该小车当前任务吗？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "monitor/interrupt",
                    contentType: "application/json",
                    data: JSON.stringify(vm.q.deviceId),
                    success: function (r) {
                        if (r.code === 0) {
                            alert('小车当前任务已中断');
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
        query: function () {
            vm.reload();
        },
        reload: function () {
            var page = $("#jqGrid").jqGrid('getGridParam', 'page');
            $("#jqGrid").jqGrid('clearGridData');
            $("#jqGrid").jqGrid('setGridParam', {
                postData: {
                    'deviceId': vm.q.deviceId,
                },
                page: page
            }).trigger("reloadGrid");
        },
    },
});





