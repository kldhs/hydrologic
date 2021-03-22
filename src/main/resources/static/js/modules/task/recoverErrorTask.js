$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'taskInfoError/list',
        datatype: "json",
        colModel: [
			{ label: '任务编号', name: 'taskId', index: "taskId", width: 150, key: true },
			{ label: '子任务编号', name: 'taskDetailId', index: "taskDetailId", width: 150, key: true },
			{ label: '任务状态', name: 'taskStatus', width: 80, formatter: function (value, options, row) {
					for (let i = 0; i < vm.statusList.length; i++) {
						if (value === vm.statusList[i].sign) {
								return vm.statusList[i].describe ;
						}
					}
					return "---";
				}
			},
			{ label: '任务类型', name: 'taskType', width: 80 , formatter: function(value, options, row) {
					for (let i = 0; i <vm.typeList.length; i++) {
						if(value === vm.typeList[i].sign){
							return '<span >'+vm.typeList[i].describe+'</span>';
						}
					}
					return "---";
				}},
			{ label: '仓库', name: 'warehouseId', width: 60 },
			{ label: '库区', name: 'districtId', width: 60 },
			{ label: '起始位置', name: 'startLocation', width: 130 },
			{ label: '目的位置', name: 'endLocation', width: 130 },
			{ label: '恢复后取货位置', name: 'startLocationError', width: 150 },
			{ label: '恢复后放货位置', name: 'endLocationError', width: 150 },
			{ label: '设备编号', name: 'deviceId', width: 80 },
			{ label: '设备类型', name: 'deviceType', width: 80 ,formatter: function(value, options, row) {
					if (value === 'shuttle') {
						return '<span>穿梭车</span>';
					}
					else if (value === 'transveyer') {
						return '<span>输送线</span>';
					}else{
						return "---";
					}
				}},
			{ label: '托盘编号', name: 'palletId', width: 80 },
			{ label: '异常时间', name: 'errorTime', width: 160 },
			{ label: '处理完成时间', name: 'handleTime', width: 160}
        ],
		viewrecords: true,
        height: 385,
        rowNum: 11,
		rowList : [10,30,50],
        rownumbers: false, 
        rownumWidth: 25, 
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
		beforeRequest:function () {
			vm.getTaskTypes();
			vm.getTaskStatus();
		},
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" });
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
			taskType: null,
			taskStatus: null,
			warehouseId: null
		},
		showList: true,
		title:null,
		taskInfo:{},
		typeList:[],
		statusList:[]
	},
	methods: {
		query: function () {
			vm.reload();
		},
		getTaskStatus: function () {
			$.get(baseURL + "taskInfo/getTaskStatus", function (r) {
				vm.statusList = r.list;
			});
		},
		getTaskTypes: function () {
			$.get(baseURL + "taskInfo/getTaskTypes", function (r) {
				vm.typeList = r.list;
			});
		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'taskId': vm.q.taskId,
						 'taskType': vm.q.taskType,
						 'taskStatus': vm.q.taskStatus,
						 'warehouseId': vm.q.warehouseId},
                page:page
            }).trigger("reloadGrid");
		}

	}
});

