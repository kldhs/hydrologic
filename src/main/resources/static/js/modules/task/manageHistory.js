$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'taskInfoOld/list',
        datatype: "json",
        colModel: [			
			{ label: '任务编号', name: 'taskId', index: "taskId", width: 150 ,key: true },
			{ label: '上层WCS任务号', name: 'wmsId', index: "wmsId", width: 130},
			{ label: '任务类型', name: 'taskType', width: 80 , formatter: function(value, options, row) {
					if (value === '10') {
						return '<span>入库</span>';
					}else if (value === '20') {
						return '<span>出库</span>';
					}else if (value === '2') {
						return '<span>移库</span>';
					}else if (value === '3') {
						return '<span>充电</span>';
					}else if (value === '4') {
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
					if (value === 'normal') {
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
        // postData:{'taskStatus': 'noOver','isError':'normal'},
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
			{"value":"10","label":"入库"},
			{"value":"20","label":"出库"},
			{"value":"2","label":"移库"},
			{"value":"3","label":"充电"},
			{"value":"4","label":"调车"}
		],
		statusList:[],
		isErrorList:[
			{"value":"","label":"是否异常"},
			{"value":"normal","label":"正常"},
			{"value":"error","label":"异常"},
		]
		// selected:''
	},
	methods: {
		query: function () {
			vm.reload();
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

		getTaskStatus:function () {
			$.get(baseURL + "taskInfo/getTaskStatus", function(r){
				vm.statusList = r.list;
			});
		},

	}
});

