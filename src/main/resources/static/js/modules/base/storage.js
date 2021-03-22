
$(function () {
	vm.getStorageStatus();
	vm.getStorageType();

	$("#jqGrid").jqGrid({
		url: baseURL + 'storage/list',
		datatype: "json",
		colModel: [
			{ label: '货位号', name: 'storageId', index: "storageId", width: 45 ,key:true},
			{ label: '坐标', width: 20,formatter: function(value,option,row){
					return "("+row.x+","+row.y +","+row.z+")" ;
				}},
			{ label: '仓库编号', name: 'warehouseId' , width: 20 },
			{ label: '库区编号', name: 'districtId' , width: 20, formatter: function(value){
					return value === -1 ? '--' :value;
				} },
			{ label: '货位类型', name: 'storageType', width: 20, formatter: function(value){
					for (let i = 0; i <vm.storageTypeList.length; i++) {
						if(value === vm.storageTypeList[i].sign){
							return vm.storageTypeList[i].describe;
						}
					}
					return "其他";
				}},
			{ label: '货位状态', name: 'status', width: 20, formatter: function(value){
					for (let i = 0; i <vm.storageStatusList.length; i++) {
						if(value === vm.storageStatusList[i].sign){
							return vm.storageStatusList[i].describe;
						}
					}
					return "---";
					/*return vm.storageStatusList[1].describe;*/
				}},
			{ label: '备注', name: 'remark', width: 45, formatter: function(value){
					return value === null ? '--' :value;
				}},
			{ label: '创建时间', name: 'insertDate', width: 90, editable:false,formatter:"date",formatoptions: {srcformat:'Y-m-d H:i:s',newformat:'Y-m-d H:i:s'}}
		],
		viewrecords: true,
		height: 385,
		rowNum: 10,
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
		gridComplete:function(){
			//隐藏grid底部滚动条
			$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
			var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
			$("#jqGrid").jqGrid('setGridWidth', parent_column.width());
		},
		beforeRequest: function() {

		}
	});
});

var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			minX: null,
			maxX: null,
			minY: null,
			maxY: null,
			minZ: null,
			maxZ: null,
			mark: null,
			storageId:null,
			status:""
		},
		storageStatusList:{},
		storageTypeList:{},
		showList: true,
		title:null,
		storage:{},
		selectFlagMinX: true,
		selectFlagMaxX: true,
		selectFlagMinY: true,
		selectFlagMaxY: true,
		selectFlagMinZ: true,
		selectFlagMaxZ: true
	},

	methods: {
		query: function () {
			vm.reload();
		},
		/*add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.storage = {};
		},*/
		update: function () {
			var storageId = getSelectedRow();
			if(storageId == null){
				return ;
			}

			vm.showList = false;
			vm.title = "修改";

			vm.getStorage(storageId);

		},
		del: function () {
			var storageIds = getSelectedRows();
			if(storageIds == null){
				return ;
			}

			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					url: baseURL + "storage/delete",
					contentType: "application/json",
					data: JSON.stringify(storageIds),
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
			var url = "storage/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.storage),
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
		getStorage: function(storageId){
			$.get(baseURL + "storage/info/"+storageId, function(r){
				vm.storage = r.storage;
			});
		},
		getStorageStatus: function(){
			$.get(baseURL + "storage/getStorageStatus", function(r){
				vm.storageStatusList = r.list;
			});
		},
		getStorageType: function(){
			$.get(baseURL + "storage/getStorageType", function(r){
				vm.storageTypeList = r.list;
				console.log(vm.storageTypeList);
			});
		},
		//检索框输入正则验证
		regexSelect: function(){
			let reg = /^[1-9]\d*$/;
			vm.selectFlagMinX = !(vm.q.minX != null && vm.q.minX !== "" && !reg.test(vm.q.minX));
			vm.selectFlagMaxX = !(vm.q.maxX != null && vm.q.maxX !== "" && !reg.test(vm.q.maxX));

			vm.selectFlagMinY = !(vm.q.minY != null && vm.q.minY !== "" && !reg.test(vm.q.minY));
			vm.selectFlagMaxY = !(vm.q.maxY != null && vm.q.maxY !== "" && !reg.test(vm.q.maxY));

			vm.selectFlagMinZ = !(vm.q.minZ != null && vm.q.minZ !== "" && !reg.test(vm.q.minZ));
			vm.selectFlagMaxZ = !(vm.q.maxZ != null && vm.q.maxZ !== "" && !reg.test(vm.q.maxZ));

		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'minX': vm.q.minX,'maxX': vm.q.maxX,
					'minY': vm.q.minY,'maxY': vm.q.maxY,
					'minZ': vm.q.minZ,'maxZ': vm.q.maxZ,
					'storageId':vm.q.storageId,
					'status':vm.q.status},
				page:page
			}).trigger("reloadGrid");
		}
	}
});