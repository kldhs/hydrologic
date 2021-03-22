$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'taskInfo/list',
        datatype: "json",
        colModel: [
			{ label: '任务编号', name: 'taskId', index: "taskId", width: 150 ,key: true },
			{ label: '上层WCS任务号', name: 'wmsId', index: "wmsId", width: 130},
			{ label: '任务类型', name: 'taskType', width: 80 , formatter: function(value, options, row) {
					if (value === 'in') {
						return '<span>入库</span>';
					}else if (value === 'out') {
						return '<span>出库</span>';
					}else if (value === 'move') {
						return '<span>移库</span>';
					}else if (value === 'charge') {
						return '<span>充电</span>';
					}else if (value === 'shunt') {
						return '<span>调车</span>';
					}else{
						return "---";
					}
				}},
			{ label: '任务状态', name: 'taskStatus', width: 90, formatter: function(value, options, row){
					for (let i = 0; i <vm.statusList.length; i++) {
						if(value === vm.statusList[i].sign){
							return vm.statusList[i].describe
						}
					}
					return "---";
				}},
			{ label: '仓库编号', name: 'warehouseId', width: 80 },
			{ label: '库区编号', name: 'districtId', width: 80 },
			{ label: '起始位置（货位ID）', name: 'startLocationReality', width: 150, },
			{ label: '目的位置（货位ID）', name: 'endLocationReality', width: 150 },
			{ label: '起始位置（X,Y,Z）', width: 150,formatter: function(value,option,row) {
					return "(" + row.startX + "," + row.startY + "," + row.startZ + ")";
				}},
			{ label: '目的位置（X,Y,Z）',  width: 150 ,formatter: function(value,option,row) {
					return "(" + row.endX + "," + row.endY + "," + row.endZ + ")";
				}},
			{ label: '计划起始位置', name: 'startLocation', width: 120 },
			{ label: '计划目的位置', name: 'endLocation', width: 120 },
			{ label: '设备编号', name: 'deviceId', width: 80 },
			{ label: '接收时间', name: 'receiveTime', width: 180 },
			{ label: '开始时间', name: 'startTime', width: 180 },
			{ label: '结束时间', name: 'endTime', width: 180 },
			{ label: '结果是否回传', name: 'isSend', width: 100 , formatter: function(value, options, row) {
					if (value === 'y') {
						return '<span>已回传</span>';
					}
					else if (value === 'n') {
						return '<span>未回传</span>';
					}else {
						return "---";
					}
				}},
			{ label: '异常标记', name: 'isError', width: 80 , formatter: function(value, options, row) {
					if (value === 'n') {
						return '<span>正常</span>';
					}
					if (value === 'error') {
						return '<span>异常</span>';
					}else {
						return "---";
					}
				}},
			{ label: '托盘编号', name: 'palletId', width: 80 },
			{ label: '物料级别', name: 'materialGrade', width: 80 , formatter: function(value, options, row) {
					if (value === 'a') {
						return '<span>A类</span>';
					}else if (value === 'b') {
						return '<span>B类</span>';
					}else if (value === 'c') {
						return '<span>C类</span>';
					}else if (value === 'd') {
						return '<span>D类</span>';
					}else {
						return "---";
					}
				}},
        ],
        postData:{'taskStatus': 'noOver','isError':'n'},
		viewrecords: true,
        height: 385,
        rowNum: 11,
		rowList : [10,30,50],
        rownumWidth:25,
        autowidth:true,
        multiselect: true,
		shrinkToFit:false,
		autoScroll: true,
		rownumbers: false,
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

        gridComplete:function(){
        	//隐藏grid底部滚动条
        	// $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
			//隐藏grid底部滚动条
			$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" }); //hidden ,scroll
			var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
			$("#jqGrid").jqGrid('setGridWidth', parent_column.width());
        },
		beforeRequest:function () {
			vm.getTaskStatus();
			vm.getTaskStopFlag();
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
			taskType: '',
			taskStatus: null,
			warehouseId: null,
			isError:'',
			palletId:'',
			wmsId:'',
			startTime: null,
			endTime: null
		},
		showList: true,
		title:null,
		taskInfo:{},
		typeList:[
			{"value":"","label":"任务类型"},
			{"value":"in","label":"入库"},
			{"value":"out","label":"出库"},
			{"value":"move","label":"移库"},
			{"value":"charge","label":"充电"},
			{"value":"shunt","label":"调车"}
		],
		statusList:[],
		taskStopOrResume:'',
		taskStopFlag:null,
		// isErrorList:[
		// 	{"value":"","label":"是否异常"},
		// 	{"value":"n","label":"正常"},
		// 	{"value":"error","label":"异常"},
		// ]
		// selected:''
	},
	methods: {
		query: function () {
			vm.reload();
		},
		getTaskStopFlag:function(){
			$.get(baseURL + "taskInfo/getTaskStopFlag", function(r){
				vm.taskStopFlag = r.list[0];
				if(vm.taskStopFlag==="0"){
					vm.taskStopOrResume='任务正常发送中-点击停止';
				}else if(vm.taskStopFlag==="1"){
					vm.taskStopOrResume='任务已停止发送-点击恢复';
				}
			});
		},
		stopOrResume:function(){
			if(vm.taskStopOrResume==='任务正常发送中-点击停止') {
				let flag=0;
				confirm('确定要停止发送任务？', function () {
					$.ajax({
						type: "POST",
						url: baseURL + "taskInfo/stopOrResumeTask",
						// async: false,
						contentType: "application/json",
						data: JSON.stringify(flag),
						success: function (r) {
							if (r.code === 0) {
								alert('操作成功');
								vm.taskStopOrResume = '任务已停止发送-点击恢复';
							} else {
								alert(r.msg);
							}
						}
					});
				});
			}
			else if(vm.taskStopOrResume==='任务已停止发送-点击恢复'){

				let flag=1;
				confirm('确定要开始发送任务？', function () {
					$.ajax({
						type: "POST",
						url: baseURL + "taskInfo/stopOrResumeTask",
						contentType: "application/json",
						data: JSON.stringify(flag),
						success: function (r) {
							if (r.code === 0) {
								alert('操作成功');
								vm.taskStopOrResume = '任务正常发送中-点击停止';
							} else {
								alert(r.msg);
							}
						}
					});
				});

			}
		},
		update: function () {
			var taskId = getSelectedRow();
			if(taskId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
			vm.getTaskInfo(taskId);
		},
		saveOrUpdate: function () {
			var url = vm.taskInfo.taskId == null ? "taskInfo/save" : "taskInfo/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.taskInfo),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		getTaskInfo: function(taskId){
			$.get(baseURL + "taskInfo/info/"+taskId, function(r){
				vm.taskInfo = r.taskInfo;

			});
		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'taskId': vm.q.taskId,
						 'taskType': vm.q.taskType,
						 'taskStatus': vm.q.taskStatus,
					     'isError':vm.q.isError,
						 'warehouseId': vm.q.warehouseId,
					     'palletId':vm.q.palletId,
					     'wmsId':vm.q.wmsId,
					     'startTime':vm.q.startTime,
					     'endTime':vm.q.endTime
				},
                page:page
            }).trigger("reloadGrid");
		},
        toDistrict: function(){
            var taskId = getSelectedRow();
            if(taskId == null){
                return ;
            }
            var url = baseURL + "modules/task/submanage.html?taskInfo="+taskId ;
            window.location.href = url;
        },
		getTaskStatus:function () {
			$.get(baseURL + "taskInfo/getTaskStatus", function(r){
				vm.statusList = r.list;
			});
		},
		del: function () {
			var taskIds = getSelectedRows();
			if(taskIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					url: baseURL + "taskInfo/delete",
					contentType: "application/json",
					data: JSON.stringify(taskIds),
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
		}
	}
});

