$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'taskTypeInfo/list',
		datatype: "json",
		colModel: [
			{ label: 'ID', name: 'keyId', index: "keyId", width: 80 ,key:true},
			{ label: '类型编号', name: 'typeId',  width: 60,editable : true,
				editrules:{
					required:true,
					custom: true,//这里是自定义校验规则
					custom_func:
						function (value, name) {
							let keyId = getSelectedRow();
							if (keyId == null) {
								return;
							}
							let ret;
							$.ajaxSettings.async = false;
							$.get(baseURL + "taskTypeInfo/checkTypeId/" + value + "/" + keyId, function (r) {
								ret = r;
							});
							$.ajaxSettings.async = true;
							if (ret === 0) {
								return [false, "类型编号已存在"];
							} else {
								return [true, ""];
							}
						}
				}
			},
			{ label: '类型名称', name: 'typeName',  width: 60,editable : true,editoptions : {readonly : false},
				editrules:{
					required:true,
					custom: true,//这里是自定义校验规则
					custom_func: function (value,name) {
						let keyId = getSelectedRow();
						if (keyId == null) {
							return;
						}
						let ret;
						$.ajaxSettings.async = false;
						$.get(baseURL + "taskTypeInfo/checkTypeName/"+value+"/"+keyId, function (r) {
							ret=r;
						});
						$.ajaxSettings.async = true;
						if (ret === 0) {
							return [false, "类型名称已存在"];
						} else {
							return [true, ""];
						}
					}
				}
				},
			{label: '录入人', name: 'insertId', width: 50},
			{label: '录入时间', name: 'insertDate', width: 100},
			{label: '更新人', name: 'updateId', width: 50},
			{label: '更新时间', name: 'updateDate', width: 100}
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
		editurl : baseURL+"taskTypeInfo/updateOrSave",
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
	});
});
var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			typeId: '',
		},
		selected:'',
		taskTypeInfo:{},
		operation:null,
		rowId:998,
		guide: 0,
	},

	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.rowId=vm.rowId+1,
			$("#jqGrid").addRowData(vm.rowId, {"rowId":vm.rowId,"insertDate":getCurrentTime(), "updateDate":getCurrentTime()}, "first");
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
					url: baseURL + "taskTypeInfo/delete",
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
		// checkTypeId:function(keyId){
		// 	$.get(baseURL + "taskTypeInfo/checkTypeId/"+$("#"+keyId+"_typeId").val()+"/"+keyId, function (r) {
		// 		vm.isTypeIdValidated=r;
		// 	});
		// },
		// checkTypeName:function(keyId){
		// 	$.get(baseURL + "taskTypeInfo/checkTypeName/"+$("#"+keyId+"_typeName").val()+"/"+keyId, function (r) {
		// 		vm.isTypeNameValidated=r;
		// 	});
		// },
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{
					'typeId': vm.q.typeId,
				},
				page:page
			}).trigger("reloadGrid");

		}

	}

});