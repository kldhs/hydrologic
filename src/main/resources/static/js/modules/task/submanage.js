$(function () {
    var url=decodeURI(window.location.href);
    vm.q.taskId=url.split("=")[1];
    vm.getTaskInfo(vm.q.taskId);
    $("#jqGrid").jqGrid({
        url: baseURL + 'taskInfoDetail/list/'+vm.q.taskId,
        datatype: "json",
        colModel: [
            { label: '子任务编号', name: 'taskDetailId', width: 150, index: "taskDetailId", key: true},
            { label: '主任务编号', name: 'taskId',width: 150 },
            { label: '任务状态', name: 'status', width: 80, formatter: function(value, options, row){
                    for (let i = 0; i <vm.statusList.length; i++) {
                        if(value === vm.statusList[i].sign){
                            return vm.statusList[i].describe;
                        }
                    }
                    return "---";

                }},
            { label: '任务类型', name: 'taskType', width: 80,formatter: function(value, options, row) {
                    if (value == '10') {
                        return '<span>入库</span>';
                    }
                    if (value == '20') {
                        return '<span>出库</span>';
                    }
                    if (value == '2') {
                        return '<span>移库</span>';
                    }
                    if (value == '3') {
                        return '<span>充电</span>';
                    }
                    if (value == '4') {
                        return '<span>调车</span>';
                    }
                }},
            { label: '托盘编号', name: 'palletId', width: 80 },

            { label: '起始位置（货位）', name: 'startLocationReality', width: 130 },
            { label: '目的位置（货位）', name: 'endLocationReality', width: 130 },

            { label: '起始位置（XYZ）', name: 'startLocation', width: 130 },
            { label: '目的位置（XYZ）', name: 'endLocation', width: 130 },

            // { label: '设备类型', name: 'deviceType', width: 80 ,formatter: function(value, options, row) {
            //         if (value === 'shuttle') {
            //             return '<span>穿梭车</span>';
            //         }
            //         if (value === 'transveyer') {
            //             return '<span>输送线</span>';
            //         }
            //
            //     }},
            { label: '设备编号', name: 'deviceId', width: 80 },
            { label: '异常标记', name: 'isError', width: 80 , formatter: function(value, options, row) {
                    if (value === 'normal') {
                        return '<span>正常</span>';
                    }
                    if (value === 'error') {
                        return '<span>异常</span>';
                    }else {
                        return "---";
                    }
                }},

            { label: '前置任务编号', name: 'preTask', width: 100 },

            { label: '接收时间', name: 'receiveTime', width: 160 },
            { label: '开始时间', name: 'startTime', width: 160 },
            { label: '结束时间', name: 'endTime', width: 160 }

        ],

        postData:{"taskId":vm.taskInfo.taskId},
        viewrecords: true,
        height: 385,
        rowNum: 11,
        rowList : [10,30,50],
        rownumbers: false,
        rownumWidth:25,
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page",
            rows:"limit",
            order: "order"
        },
        shrinkToFit:false,
        autoScroll: true,
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" });
            var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
            $("#jqGrid").jqGrid('setGridWidth', parent_column.width());
        },
        beforeRequest:function () {
            vm.getTaskStatus();
        }
    });
});

var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "deptId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url:"nourl"
        }
    }
};
var ztree;

var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q: {
			taskId: null,
            status:null,
            taskStatus:null,
            startLocationReality:null

		},
		// showList: true,
		title:'任务明细',
        taskInfo:{},
		taskInfoDetail:{},
        storageInfo:{storageId:null},
        typeList:[
            {"value":"","label":"任务类型"},
            {"value":"10","label":"入库"},
            {"value":"20","label":"出库"},
            {"value":"2","label":"移库"},
            {"value":"3","label":"充电"},
            {"value":"4","label":"调车"}
        ],
        statusList:[]

	},
	methods: {
		query: function () {
			vm.reload();
		},
		saveAndUpdate: function () {
			let tempStartLocation=vm.taskInfo.startLocationReality;
            if((vm.q.taskStatus==="blackout"&&vm.taskInfo.taskStatus==="waitExe" )||(vm.q.taskStatus==="blackout"&&vm.q.startLocationReality!==vm.taskInfo.startLocationReality&&vm.taskInfo.taskStatus==="waitExe")) {   //加条件
                vm.taskInfo.isError = "error";
                vm.taskInfo.taskStatus = "over";
                vm.taskInfo.startLocationReality=vm.q.startLocationReality;
                var promise = $.ajax({
                    type: "POST",
                    url: baseURL + "taskInfo/update",
                    contentType: "application/json",
                    data: JSON.stringify(vm.taskInfo),
                    success: function (r) {
                        if (r.code === 0) {
                        } else {
                            alert(r.msg);
                        }
                    }
                });
                promise.then(function () {
                    var url = "taskInfoError/save";
                    $.ajax({
                        type: "POST",
                        url: baseURL + url,
                        contentType: "application/json",
                        data: JSON.stringify(vm.taskInfo),
                        success: function (r) {
                            if (r.code === 0) {
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                });
                promise.then(function () {
                    var url = "taskInfo/save";
                    vm.taskInfo.taskStatus="waitExe";
                    vm.taskInfo.startLocationReality=tempStartLocation;
                    $.ajax({
                        type: "POST",
                        url: baseURL + url,
                        contentType: "application/json",
                        data: JSON.stringify(vm.taskInfo),
                        success: function (r) {
                            if (r.code === 0) {
                                alert('提交成功', function () {
                                    vm.getTaskInfo(vm.q.taskId);
                                });
                            } else {
                                alert(r.msg);
                            }
                        }
                    });
                });


            }
            else{
                alert("不需要处理");
            }

		},

        resume:function(){
            let taskInfoDetailId = getSelectedRow();
            if(taskInfoDetailId == null){
                return;
            }
            $.ajax({
                type: "POST",
                async: false,
                url: baseURL + "taskInfoDetail/getTaskDevicePosition",
                contentType: "application/json",
                data: JSON.stringify(vm.taskInfo),
                success: function (r) {
                    if (r.code == 0) {
                        vm.storageInfo = r.storageInfo;
                    } else {
                        alert(r.msg);
                    }
                }
            });
            confirm('车辆当前位置为：'+vm.storageInfo.storageId, function() {
                $.ajax({
                    type: "POST",
                    async: false,
                    url: baseURL + "taskInfoDetail/resumeTask",
                    contentType: "application/json",
                    data: JSON.stringify(taskInfoDetailId),
                    success: function (r) {
                        if (r.code == 0) {
                            alert('操作成功', function(){
                                vm.reload();
                            });
                        } else {
                            alert(r.msg);
                        }
                    }
                });
            });
        },

        del: function () {
            var taskInfoDetailIds = getSelectedRows();
            if(taskInfoDetailIds  == null){
                return ;
            }
            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "taskInfoDetail/delete",
                    contentType: "application/json",
                    data: JSON.stringify(taskInfoDetailIds),
                    success: function(r){
                        if(r.code == 0){
                            alert('操作成功', function(){
                                vm.reload();
                            });
                        }else{
                            alert(r.msg);
                        }
                    }
                });
            });
        },
		getTaskInfo: function(taskId){
			$.get(baseURL + "taskInfo/info/"+taskId, function(r){
				vm.taskInfo = r.taskInfo;
                // vm.q.taskStatus =vm.taskInfo.taskStatus;
                // vm.q.startLocationReality=vm.taskInfo.startLocationReality;
			});
		},
        getTaskInfoDetail: function(taskDetailId){
            $.get(baseURL + "taskInfoDetail/info/"+taskDetailId, function(r){
                vm.taskInfoDetail = r.taskInfoDetail;
            });
        },
        getTaskStatus:function () {
            $.get(baseURL + "taskInfo/getTaskStatus", function(r){
                vm.statusList = r.list;
            });
        },

		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'taskId': vm.q.taskId,
                          'status': vm.q.status

                },
                page:page
            }).trigger("reloadGrid");
		},
        toManage:function(){
            window.location.href=baseURL+"modules/task/manage.html"
        }

	}
});

//任务状态下拉框不可选
// $("#status").attr("disabled","disabled").css("background-color","#EEEEEE;");