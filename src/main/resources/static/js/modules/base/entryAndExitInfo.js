$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'entryAndExitInfo/list',
		datatype: "json",
		colModel: [
			{ label: 'ID', name: 'keyId', index: "keyId", width: 150 ,key:true},
			{ label: '仓库ID', name: 'warehouseId',  width: 100,editable : true,edittype:'select',editoptions:{value:vm.getWarehouseList2()},
				formatter: function(value){
					for (let i = 0; i <vm.warehouseList.length; i++) {
						if(value === vm.warehouseList[i]){
							return vm.warehouseList[i];
						}
					}
					return value;
				}
			},
			{ label: '库区ID', name: 'districtId',  width: 100,editable : true,editrules:{required:true}},
			{ label: '出入口编号', name: 'locationNumber',  width: 100,editable : true,editrules:{required:true}},
			{ label: '口类型', name: 'type',  width: 100,editable : true,edittype:'select',editrules:{required:true},editoptions:{value:"10:入库;20:出库"},
				formatter: function (value, options, row) {
					if (value === '10') {
						return '<span>入库</span>';
					} else if (value === '20') {
						return '<span>出库</span>';
					} else {
						return "---";
					}
				}},
			{ label: '位置区域', name: 'locationArea',  width: 100,editable : true,edittype:'select',editrules:{required:true},editoptions:{
				value:"storage:货架;conveyor:输送线;dis:拆叠盘机;hois:提升机"},
				formatter: function (value, options, row) {
					if (value === 'storage') {
						return '<span>货架</span>';
					} else if (value === 'conveyor') {
						return '<span>输送线</span>';
					} else if (value === 'dis') {
						return '<span>拆叠盘机</span>';
					}else if (value === 'hois') {
						return '<span>提升机</span>';
					} else {
						return "---";
					}
				}},
			{ label: '状态', name: 'status',  width: 100,editable : true,edittype:'select',editrules:{required:true},editoptions:{value:"stop:禁用;start:启用"},
				formatter: function (value, options, row) {
					if (value === 'stop') {
						return '<span>禁用</span>';
					} else if (value === 'start') {
						return '<span>启用</span>';
					} else {
						return "---";
					}
				}
			},
			{ label: '对应取放货口X', name: 'x',  width: 120,editable : true,editrules:{required:false, integer:true, minValue:0}},
			{ label: '对应取放货口Y', name: 'y',  width: 120,editable : true,editrules:{required:false, integer:true, minValue:0}},
			{ label: '对应取放货口Z', name: 'z',  width: 120,editable : true,	editrules:{required:false, integer:true, minValue:0}},
			{label: '录入人', name: 'insertId', width: 80},
			{label: '录入时间', name: 'insertDate', width: 150},
			{label: '更新人', name: 'updateId', width: 80},
			{label: '更新时间', name: 'updateDate', width: 150}
		],
		viewrecords: true,
		height: 385,
		rowNum: 10,
		rowList : [10,30,50],
		rownumbers: false,
		rownumWidth: 25,
		autowidth:true,
		shrinkToFit:false,
		autoScroll: true,
		multiselect: true,
		pager: "#jqGridPager",
		editurl : baseURL+"entryAndExitInfo/updateOrSave",
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
			$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" });  //scroll

			var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
			$("#jqGrid").jqGrid('setGridWidth', parent_column.width());

			if(vm.guide===1){
				vm.guide=0;
				vm.add();
			}
		},
		beforeRequest: function () {
			vm.getWarehouseList();
		}
	});
});
var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			warehouseId: '',
			locationNumber:'',
			type:'',
			locationArea:''
		},
		selected:'',
		warehouseList: null,
		taskTypeInfo:{},
		operation:null,
		rowId:998,
		guide: 0,
		typeList:[
			{"value":"","label":"口类型"},
			{"value":"10","label":"入库"},
			{"value":"20","label":"出库"}
		],
		locationAreaList:[
			{"value":"","label":"位置区域"},
			{"value":"storage","label":"货架"},
			{"value":"conveyor","label":"输送线"},
			{"value":"dis","label":"拆叠盘机"},
			{"value":"hois","label":"提升机"}
		],
	},

	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.rowId=vm.rowId+1,
			$("#jqGrid").addRowData(vm.rowId, {"rowId":vm.rowId,"insertDate":getCurrentTime(), "updateDate":getCurrentTime()}, "first");
			// $("#jqGrid").jqGrid('setColProp',"kbId",{editable:true}, {editoptions:{value:vm.q.kbId,readonly : true}});
			$("#jqGrid").jqGrid('editRow', vm.rowId);
			$("#jqGrid").jqGrid('setSelection', vm.rowId);

			$("#saveBtn").css("pointer-events","auto").attr("disabled",false);
			$("#restoreBtn").css("pointer-events","auto").attr("disabled",false);
			$("#saveAndSubmit").css("pointer-events", "auto").attr("disabled", false);
		},
		beforeUpdate: function () {
			let keyId = getSelectedRow();
			if (keyId == null) {
				return;
			}
			$("#jqGrid").jqGrid('editRow', keyId);
			// $("#jqGrid").jqGrid('setSelection', keyId);
			$("#saveBtn").css("pointer-events", "auto").attr("disabled", false);
			$("#restoreBtn").css("pointer-events", "auto").attr("disabled", false);
			$("#saveAndSubmit").css("pointer-events", "auto").attr("disabled", false);
		},
		restore: function (keyId) {
			$("#jqGrid").jqGrid('restoreRow', keyId);
			$("#saveBtn").css("pointer-events","none").attr("disabled",true);
			$("#restoreBtn").css("pointer-events","none").attr("disabled",true);
			$("#saveAndSubmit").css("pointer-events","none").attr("disabled",true);
			vm.reload();
		},
		save:function(){
			let keyId = getSelectedRow();
			if (keyId == null) {
				return;
			}
			$("#jqGrid").jqGrid('saveRow', keyId,
				{aftersavefunc : function (keyId, response) {
						if(response.responseJSON.code===0){
							alert("操作成功");
							vm.reload();
							$("#saveBtn").css("pointer-events","none").attr("disabled",true);
							$("#restoreBtn").css("pointer-events","none").attr("disabled",true);
						}else{
							alert(response.responseJSON.msg);
							$("#jqGrid").jqGrid('editRow', keyId);

						}
					},extraparam : {"operation":vm.operation}});
		},
		del: function () {
			var keyIds = getSelectedRows();
			if(keyIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					url: baseURL + "entryAndExitInfo/delete",
					contentType: "application/json",
					data: JSON.stringify(keyIds),
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
		getWarehouseList: function () {
			$.ajax({
				type: "POST",
				url: baseURL + "warehouse/getAll",
				contentType: "application/json",
				async:false,
				success: function (r) {
					if (r.code === 0) {
						if (r.warehouseList != null) {
							vm.warehouseList = r.warehouseList;
						}
					}
				}
			});
		},
		getWarehouseList2: function(){
			if(vm.warehouseList==null || vm.warehouseList.length===0){
				vm.getWarehouseList();
			}
			let str = "";
			let len = vm.warehouseList.length;
			for (let i = 0; i < vm.warehouseList.length; i++) {
				if (i != len - 1) {
					str += vm.warehouseList[i].warehouseId + ":" + vm.warehouseList[i].warehouseId + ";";
				} else {
					str += vm.warehouseList[i].warehouseId + ":" + vm.warehouseList[i].warehouseId;// 这里是option里面的 value:label
				}
			}
			return str;
		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{
					'warehouseId':vm.q.warehouseId,
					'locationNumber': vm.q.locationNumber,
					'type': vm.q.type,
					'locationArea': vm.q.locationArea
				},
				page:page
			}).trigger("reloadGrid");

		}
	}

});