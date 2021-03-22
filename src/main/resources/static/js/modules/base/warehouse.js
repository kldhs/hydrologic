$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'warehouse/list',
        datatype: "json",
        colModel: [			
			{ label: '仓库ID', name: 'warehouseId', index: "warehouseId", width: 45, key: true },
			{ label: '仓库名称', name: 'warehouseName',editable:'true',edittype:'text', index: "warehouseName", width: 75 },
			{ label: '创建时间', name: 'insertDate', index: "insertDate", width: 90}
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
        }
    });

});

var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			warehouseId: null,
			warehouseName: null,
			districtName: null
		},
		showList: true,
		title:null,
		warehouse:{

		},
		warehouseNameFlag : true
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.warehouse.warehouseName=null;
			vm.title = "新增";
		},
		toDistrict: function(){
			var warehouseId = getSelectedRow();
			if(warehouseId == null){
				return ;
			}
			var url = baseURL + "modules/base/district.html?warehouseId="+ warehouseId;
			window.location.href = url;
		},
		update: function () {
			var warehouseId = getSelectedRow();
			if(warehouseId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";

			vm.getWarehouse(warehouseId);
		},
		getWarehouse: function(warehouseId){
			$.get(baseURL + "warehouse/info/"+warehouseId, function(r){
				vm.warehouse = r.warehouse;
			});
		},
		del: function () {
			var warehouseIds = getSelectedRows();
			if(warehouseIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "warehouse/delete",
                    contentType: "application/json",
				    data: JSON.stringify(warehouseIds),
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
			if(!Boolean(vm.checkAllTribute())){
				return;
			}
			var url = vm.warehouse.warehouseId == null ? "warehouse/save" : "warehouse/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.warehouse),
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
		regex: function(msg){
			if(msg === 'warehouseName' ){
				if(vm.warehouse.warehouseName == null || vm.warehouse.warehouseName === ""){
					vm.warehouseNameFlag=false;
				}else{
					vm.warehouseNameFlag=true;
				}
			}
		},
		checkAllTribute: function(){
			if(vm.warehouse.warehouseName == null || vm.warehouse.warehouseName === ""){
				vm.warehouseNameFlag=false;
				return false;
			}
			return true;
		},
	    reload: function () {
	    	vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'warehouseId': vm.q.warehouseId,'warehouseName': vm.q.warehouseName,'districtName': vm.q.districtName},
                page:page
            }).trigger("reloadGrid");
			vm.refresh();
		},
		refresh: function(){
			vm.warehouseNameFlag=true;
		}
	}
});