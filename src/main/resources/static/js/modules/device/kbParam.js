$(function () {
	$("#jqGrid").jqGrid({
		url: baseURL + 'kbParam/list',
		datatype: "json",
		colModel: [
			{ label: 'ID', name: 'keyId', index: "keyId", width: 150 ,key:true},
			{ label: '仓库编号', name: 'warehouseId',  width: 90 },
			{ label: '看板编号', name: 'kbId',  width: 90 },
			{ label: '看板名称', name: 'kbName' , width: 90 },
			{ label: '看板类型', name: 'kbType', width: 90,formatter: function(value, options, row) {
					if (value === 'led') {
						return '<span>LED看板</span>';
					}else if (value === 'android') {
						return '<span>安卓看板</span>';
					}else{
						return "---";
					}
				}},
			{ label: '看板地址', name: 'kbLocation' , width: 100 },
			{ label: '看板型号', name: 'kbModel', width: 90},
			{ label: 'DLL路径', name: 'dllRoute', width: 120},
			{ label: '看板IP', name: 'kbIp', width: 120},
			{ label: '看板端口', name: 'kbPort', width: 90},
			{ label: '显示方式', name: 'displayMode', width: 80,formatter: function(value, options, row) {
					if (value === 'text') {
						return '<span>文字</span>';
					}else if (value === 'picture') {
						return '<span>图片</span>';

					}else{
						return "---";
					}
				}},
			{ label: '图片路径', name: 'picRoute', width: 200},
			{ label: '显示内容', name: 'showContent', width: 180}

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
			$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "scroll" });
			var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
			$("#jqGrid").jqGrid('setGridWidth', parent_column.width());

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
			kbId: null,
			displayMode:null,
			kbModel:"a",
			kbType:null,
			kbTypeTemp:"",
			warehouseId:null
		},

		// selected:'',
		showList: true,
		title:null,
		kbParam:{
		},
		warehouseList: null,
		displayModeList:[
			{"value":"text","label":"文字"},
			{"value":"picture","label":"图片"}
		],
		kbTypeList:[
			// {"value":"","label":"看板类型"},
			{"value":"led","label":"LED看板"},
			{"value":"android","label":"安卓看板"}
		],
		kbModelList:[
			{"value":"a","label":"a"},
			{"value":"b","label":"b"}
		],
		showAndorUpdate:true,
		kbIdTemp:null,
		//正则验证
		isKbIdValidated:true,
		isKbNameValidated:true,
		isKbTypeValidated:true,
		isKbModelValidated:true,
		isKbIpValidated:true,
		isKbPortValidated:true,
		isPicRouteValidated:true,
		isDllRouteValidated:true,
		isWarehouseIdValidated:true
		// selectFlag:true
	},

	methods: {
		initCheck:function(){
			vm.isKbIdValidated=true;
			vm.isKbNameValidated=true;
			vm.isKbTypeValidated=true;
			vm.isKbModelValidated=true;
			vm.isKbIpValidated=true;
			vm.isKbPortValidated=true;
			vm.isPicRouteValidated=true;
			vm.isDllRouteValidated=true;
			vm.isWarehouseIdValidated=true;
		},

		checkWarehouseId:function(){
			let reg = /^[1-9]\d*$/ ;
			if((vm.title==="修改")&& (!reg.test(vm.kbParam.warehouseId)&&(vm.kbParam.warehouseId !== "" || vm.kbParam.warehouseId != null))
			||((vm.title==="新增")&&(!reg.test(vm.q.warehouseId)&&(vm.q.warehouseId !== "" || vm.q.warehouseId != null)))){
				vm.isWarehouseIdValidated=false;
			}
		},
		checkKbId:function(){
			let reg = /^[1-9]\d*$/ ;
			// vm.isKbIdValidated = !(!reg.test(vm.kbParam.kbId)&&(vm.kbParam.kbId !== "" || vm.kbParam.kbId != null));
            if(!reg.test(vm.kbParam.kbId)&&(vm.kbParam.kbId !== "" || vm.kbParam.kbId != null)){
				vm.isKbIdValidated=false;
			}else{
				let warehouseId=vm.title === "新增"?vm.q.warehouseId:vm.kbParam.warehouseId;
				if(vm.title === "修改"&&vm.kbIdTemp===vm.kbParam.kbId){
					vm.isKbIdValidated = true;
				}else

				$.get(baseURL + "kbParam/checkKbId/"+warehouseId+"/"+vm.kbParam.kbId, function (r) {
					if (r === 0) {
						vm.isKbIdValidated = false;
						alert("本仓库中此看板编号已存在");
					} else {
						vm.isKbIdValidated = true;
					}
				})
			}

		},
		checkKbName:function(){
			vm.isKbNameValidated = vm.kbParam.kbName !== "" && vm.kbParam.kbName != null;
		},
		checkKbModel:function(){
			vm.isKbModelValidated=vm.q.kbModel !== "" && vm.q.kbModel != null;
		},
		checkKbType:function(){
			if( ((vm.title==="新增")&& (vm.q.kbTypeTemp=== "" || vm.q.kbTypeTemp == null))||(
				(vm.title==="修改")&& (vm.kbParam.kbType=== "" || vm.kbParam.kbType == null)) )
			vm.isKbTypeValidated=false;
		},
		checkKbIp:function(){
			var ipReg= /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
			vm.isKbIpValidated = !(!ipReg.test(vm.kbParam.kbIp) && (vm.kbParam.kbIp !== "" || vm.kbParam.kbIp != null));

		},
		checkKbPort:function(){
			var portReg=/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;

			vm.isKbPortValidated= !(!portReg.test(vm.kbParam.kbPort) && (vm.kbParam.kbPort !== "" || vm.kbParam.kbPort != null));
		},
		checkDllRoute:function(){
			var dllRouteReg=/^[a-zA-Z]:[\\]((?! )(?![^\\/]*\s+[\\/])[\w -]+[\\/])*(?! )(?![^.]*\s+\.)[\w -]+$/;
			vm.isDllRouteValidated=dllRouteReg.test(vm.kbParam.dllRoute)||vm.kbParam.dllRoute==null||vm.kbParam.dllRoute==="";
		},
		checkPicRoute:function(){
			var picRouteReg=/^[a-zA-Z]:[\\]((?! )(?![^\\/]*\s+[\\/])[\w -]+[\\/])*(?! )(?![^.]*\s+\.)[\w -]+$/;
			vm.isPicRouteValidated=picRouteReg.test(vm.kbParam.picRoute)||vm.kbParam.picRoute==null||vm.kbParam.picRoute==="";
		},
		checkAllTribute:function(){
			if (!vm.isWarehouseIdValidated||!vm.isKbIdValidated || !vm.isKbNameValidated ||!vm.isKbTypeValidated|| !vm.isKbModelValidated|| !vm.isKbIpValidated||!vm.isKbPortValidated||!vm.isPicRouteValidated||!vm.isDllRouteValidated) {
				alert('请输入正确的信息');
				return false;
			}
			if( ((vm.q.warehouseId === "" || vm.q.warehouseId == null)&& (vm.title==="新增"))
			||((vm.kbParam.warehouseId === "" || vm.kbParam.warehouseId == null)&& (vm.title==="修改"))){
				vm.isWarehouseIdValidated=false;
				return false;
			}
			let reg = /^[1-9]\d*$/ ;
			if(!reg.test(vm.kbParam.kbId)&&(vm.kbParam.kbId !== "" || vm.kbParam.kbId != null)){
				vm.isKbIdValidated=false;
				return false;
			}
			if(vm.kbParam.kbName === "" || vm.kbParam.kbName == null){
				vm.isKbNameValidated =false;
				return false;
			}
			if(vm.q.kbModel === "" || vm.q.kbModel == null){
				vm.isKbModelValidated=false;
				return false;
			}
			if(((vm.title==="新增")&& (vm.q.kbTypeTemp=== "" || vm.q.kbTypeTemp == null))||(
				(vm.title==="修改")&& (vm.kbParam.kbType=== "" || vm.kbParam.kbType == null))){
				vm.isKbTypeValidated=false;
				return false;
			}
			if(vm.kbParam.kbIp === "" || vm.kbParam.kbIp == null){
				vm.isKbIpValidated =false;
				return false;
			}
			if(vm.kbParam.kbPort === "" || vm.kbParam.kbPort == null){
				vm.isKbPortValidated=false;
				return false;
			}
			return true;
		},

		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.showAndorUpdate=true;
			vm.q.displayMode="text";
			vm.q.kbTypeTemp="led";
			vm.kbParam = {};
			vm.initCheck();
		},
		update: function () {
			var keyId = getSelectedRow();
			if(keyId == null){
				return ;
			}

			vm.showList = false;
			vm.title = "修改";
			vm.showAndorUpdate=false;
			vm.getKb(keyId);
			vm.initCheck();
		},
		del: function () {
			var keyIds = getSelectedRows();
			if(keyIds == null){
				return ;
			}

			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					url: baseURL + "kbParam/delete",
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


		saveOrUpdate: function () {
			if (Boolean(!vm.checkAllTribute())) {
				return false;
			}
			if(vm.title==="新增"){
				var url = "kbParam/save";
				vm.kbParam.warehouseId=vm.q.warehouseId;
				vm.kbParam.displayMode=vm.q.displayMode;
				vm.kbParam.kbType=vm.q.kbTypeTemp;
				vm.kbParam.kbModel=vm.q.kbModel;
			}
			if(vm.title==="修改"){
				url="kbParam/update";
			}
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.kbParam),
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
		toDistrict: function(){
			var kbId = getSelectedRow();
			if(kbId == null){
				return ;
			}
			var url = baseURL + "modules/device/kbDuty.html?kbId="+kbId ;
			// var url = baseURL + "modules/device/kbShowContent.html" ;
			window.location.href = url;
		},

		getKb: function(keyId){
			$.get(baseURL + "kbParam/info/"+keyId, function(r){
				vm.kbParam = r.kbParam;
				vm.kbIdTemp=vm.kbParam.kbId;
			});
		},

		// created() {
		// 	//如果没有这句代码，select中初始化会是空白的，默认选中就无法实现
		// 	this.q.kbType= this.kbTypeList[0].value;
		// },

		sendToScreen:function(){
			var keyId = getSelectedRow();
			if(keyId == null){
				return ;
			}
			vm.getKb(keyId);
			$.get(baseURL + "kbParam/sendToScreen/"+vm.kbParam.showContent, function(r){
				// vm.kbParam = r.kbParam;
				if(r.code == 0){

					alert('操作成功', function(){
						vm.reload();
					});
				}else{
					alert(r.msg);
				}
			});
		},
		getWarehouseList: function () {
			$.get(baseURL + "warehouse/getAll/", function (r) {
				vm.warehouseList = r.warehouseList;
				vm.q.warehouseId=vm.warehouseList[0].warehouseId;
			});
		},

		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'kbId': vm.q.kbId,
					     'kbType':vm.q.kbType
				},
				page:page
			}).trigger("reloadGrid");
		}
	}

});