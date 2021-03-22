$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'kbShowContent/list',
		datatype: "json",
		colModel: [
			{ label: 'ID', name: 'keyId', index: "keyId", width: 80 ,key:true},
			{ label: '看板编号', name: 'kbId',  width: 60 },
			{ label: '设备编号', name: 'deviceId', width: 60},
			{ label: '设备类型', name: 'deviceType' , width: 60 },
			{ label: '显示状态', name: 'showStatus', width: 60,formatter: function(value, options, row) {
					if (value === 'waitDisplay') {
						return '<span>待显示</span>';
					}else if (value === 'display') {
						return '<span>已显示</span>';

					}else if (value === 'clean') {
						return '<span>清除</span>';
					}
					else{
						return "---";
					}
				}},
			{ label: '显示内容', name: 'showContent', width: 200},
		],
		viewrecords: true,
		height: 385,
		rowNum: 10,
		rowList : [10,30,50],
		rownumbers: false,
		rownumWidth: 25,
		autowidth:true,
		// shrinkToFit:false,
		// autoScroll: true,
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
		beforeRequest:function () {
			vm.getDeviceTypes();
		},
		gridComplete:function(){
			//隐藏grid底部滚动条
			$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" });

			var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
			$("#jqGrid").jqGrid('setGridWidth', parent_column.width());

		}
	});
});
var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			kbId: null,
			deviceId:null,
			deviceType:null,
			showStatus:null
		},

		selected:'',
		showList: true,
		title:null,
		deviceTypeList:null,
		kbParam:{},
		showStatusList:[
			{"value":"waitDisplay","label":"待显示"},
			{"value":"display","label":"已显示"},
			{"value":"clean","label":"清除"}
		],
	},

	methods: {

		query: function () {
			vm.reload();
		},
		getDeviceTypes:function(){
			$.get(baseURL + "kbDuty/getDeviceTypes", function(r){
				vm.deviceTypeList = r.list;
			});
		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'kbId': vm.q.kbId,
					'deviceId':vm.q.deviceId,
					'showStatus':vm.q.showStatus,
					'deviceType':vm.q.deviceType
				},
				page:page
			}).trigger("reloadGrid");

		}
	}

});