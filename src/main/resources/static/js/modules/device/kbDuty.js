$(function () {
	var url=decodeURI(window.location.href);
	vm.q.kbId=url.split("=")[1];
	$("#jqGrid").jqGrid({
		url: baseURL + 'kbDuty/list',
		datatype: "json",
		colModel: [
			{ label: 'ID', name: 'keyId', index: "keyId", width: 80 ,key:true},
			{ label: '看板编号', name: 'kbId',  width: 60,editable : true,editoptions : {readonly : true} },
			{ label: '看板职责', name: 'kbDuty',editable:true, edittype:'select',editrules:{required:true},
				editoptions:{value:"area:区域;device:设备",dataEvents: [
						{
							type: 'change',
							fn: function (e) {
								let keyId = $('#jqGrid').jqGrid('getGridParam','selrow');//获得行ID
								let val = this.value;//获取当前值
								if(val==="area"){
									$("#"+keyId+"_districtId ").attr("disabled",false);
									$("#"+keyId+"_deviceId").attr("disabled",true);
									$("#"+keyId+"_deviceType").attr("disabled",true);
								}else if(val==="device"){
									$("#"+keyId+"_districtId ").attr("disabled",true);
									$("#"+keyId+"_deviceType").attr("disabled",false);
									$("#"+keyId+"_deviceId ").attr("disabled",false);
								}
							}
						}
					]}, width: 90,
				formatter: function (value, options, row) {
					if (value === 'area') {
						return '<span>区域</span>';
					} else if (value === 'device') {
						return '<span>设备</span>';
					} else {
						return "---";
					}
				},
				},
			{ label: '区域编号', name: 'districtId',editable:true,editrules:{
				// required:true,
					custom: true,//这里是自定义校验规则
					custom_func: function (value,label) {
						let keyId = getSelectedRow();
						if (keyId == null) {
							return;
						}
						let reg = /^[1-9]\d*$/;
						let result=reg.test(value);
						if($("#"+keyId+"_kbDuty option:selected").val()==="area"&&(value==null||value===""||!Boolean(result))){
							return [false, "请输入正确的区域编号"];
						}else {
							return [true, ""];
						}
					}
				},editoptions:{placeholder: ''}, width: 90},
			{ label: '设备编号', name: 'deviceId', editable:true,editrules:{required:false,integer:true, minValue:1},editoptions:{},width: 90},
			{ label: '设备类型', name: 'deviceType',editable:true,edittype:'select',editrules:{
				required:false,
					custom: true,//这里是自定义校验规则
					custom_func: function (value,label) {
						let keyId = getSelectedRow();
						if (keyId == null) {
							return;
						}
						if($("#"+keyId+"_kbDuty option:selected").val()==="device"&&(value==null||value==="")){
							return [false, "请输入设备类型"];
						}else {
							return [true, ""];
						}
					}
				},editoptions:{value:vm.getDeviceTypes2()}, width: 90, formatter: function(value){
					for (let i = 0; i <vm.deviceTypeList.length; i++) {
						if(value === vm.deviceTypeList[i]){
							return vm.deviceTypeList[i];
						}
					}
					return value;
				}},
		],
		viewrecords: true,
		postData:{'kbId': vm.q.kbId},
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
		editurl : baseURL+"kbDuty/updateOrSave",
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
		beforeRequest:function () {
			vm.getDeviceTypes();
		}
	});
});
var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			kbId: '',
		},
		selected:'',
		kbDuty:{},
		kbDutyList:[
			{"value":"area","label":"区域"},
			{"value":"device","label":"设备"}
		],
		deviceTypeList:[],
		operation:null,
		kbParamId:998,
		guide: 0,
	},

	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.kbParamId=vm.kbParamId+1,
			$("#jqGrid").addRowData(vm.kbParamId, {"kbParamId":vm.kbParamId,"kbId":vm.q.kbId}, "first");
			$("#jqGrid").jqGrid('setColProp',"kbId",{editable:true}, {editoptions:{value:vm.q.kbId,readonly : true}});
			$("#jqGrid").jqGrid('editRow', vm.kbParamId);
			$("#jqGrid").jqGrid('setSelection', vm.kbParamId);

			if($("#"+vm.kbParamId+"_kbDuty option:selected").val()==="area"){
				$("#"+vm.kbParamId+"_deviceId").attr("disabled",true);
				$("#"+vm.kbParamId+"_deviceType").attr("disabled",true);
			}else if($("#"+vm.kbParamId+"_kbDuty option:selected").val()==="device") {
				$("#"+vm.kbParamId+"_districtId ").attr("disabled",true);
			}
			$("#saveBtn").css("pointer-events","auto").attr("disabled",false);
			$("#restoreBtn").css("pointer-events","auto").attr("disabled",false);
			$("#saveAndSubmit").css("pointer-events", "auto").attr("disabled", false);
		},
		beforeUpdate: function () {
			let keyId = getSelectedRow();
			if (keyId == null) {
				return;
			}
			$("#jqGrid").jqGrid('setColProp',"kbId", {editable:false});
			$("#jqGrid").jqGrid('editRow', keyId);
			if($("#"+keyId+"_kbDuty option:selected").val()==="area"){
				$("#"+keyId+"_deviceId").attr("disabled",true);
				$("#"+keyId+"_deviceType").attr("disabled",true);
			}else if($("#"+keyId+"_kbDuty option:selected").val()==="device") {
				$("#"+keyId+"_districtId ").attr("disabled",true);
			}
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
					url: baseURL + "kbDuty/delete",
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

		toKbParam:function(){
			window.location.href=baseURL+"modules/device/kbParam.html"
		},

		getKbDuty: function(keyId){
			$.get(baseURL + "kbDuty/info/"+keyId, function(r){
				vm.kbDuty = r.kbDuty;
			});
		},
		getDeviceTypes:function(){
			$.ajax({
				type: "POST",
				url: baseURL + "kbDuty/getDeviceTypes",
				contentType: "application/json",
				async:false,
				success: function (r) {
					if (r.code === 0) {
						if (r.list != null) {
							vm.deviceTypeList = r.list;
						}
					}
				}
			});
		},
		getDeviceTypes2: function(){
			if(vm.deviceTypeList==null || vm.deviceTypeList.length===0){
				vm.getDeviceTypes();
			}
			let str = "";
			let len = vm.deviceTypeList.length;
			for (let i = 0; i < vm.deviceTypeList.length; i++) {
				if (i != len - 1) {
					str += vm.deviceTypeList[i] + ":" + vm.deviceTypeList[i] + ";";
				} else {
					str += vm.deviceTypeList[i] + ":" + vm.deviceTypeList[i];// 这里是option里面的 value:label
				}
			}
			return str;
		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{
					'kbId': vm.q.kbId,
				},
				page:page
			}).trigger("reloadGrid");

		}
	}

});