$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'dataConfig/list',
        datatype: "json",
        colModel: [			
			{ label: '数据库ID', name: 'keyId', index: "keyId", width: 45, key: true },
			{ label: '数据库类型', name: 'dataType', width: 75 },
			{ label: '数据库地址', name: 'dataAddress', width: 90 },
			{ label: '驱动名称', name: 'driverName', width: 80 },
			{ label: '数据库名称', name: 'dbName', width: 80 },
			{ label: '用户名', name: 'userName', width: 80 },
			{ label: '密码', name: 'userPassword', width: 80 }

        ],
		viewrecords: true,
        height: 385,
        rowNum: 6,
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
		q:{

			keyId:null
		},
		showList: true,
		title:null,

		dataConfig:{},

		dataTypeFlag:true,
		dataAddressFlag:true,
		dbNameFlag:true,
		userNameFlag:true,
		userPasswordFlag:true,
		selectFlag:true
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.dataConfig={};
			// vm.roleList = {};
			// vm.user = {status:1, roleId:2};
			
			//获取角色信息
			// this.getRoleList();
		},
		update: function () {
			var keyId = getSelectedRow();
			if(keyId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
			vm.getDataConfig(keyId);
			//获取角色信息
			// this.getRoleList();
		},
		del: function () {
			var userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "dataConfig/delete",
                    contentType: "application/json",
				    data: JSON.stringify(userIds),
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
			if(Boolean(vm.checkAllTribute())){
				return;
			}
			var url = vm.dataConfig.keyId == null ? "dataConfig/save" : "dataConfig/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.dataConfig),
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
		getDataConfig: function(keyId){
			$.get(baseURL + "dataConfig/info/"+keyId, function(r){
				vm.dataConfig = r.dataConfig;
				// vm.user.password = null;
			});
		},
		//输入信息非空验证及正则验证。
		regex: function(msg){
			let result = false;
			let reg = '';
			if(msg === 'dataType' ){
				if(vm.dataConfig.dataType == null || vm.dataConfig.dataType === ""){
					vm.dataTypeFlag=false;
				}else{
					vm.dataTypeFlag=true;
				}
			}else if(msg === 'dataAddress' ){
				reg = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/;
				result = vm.dataConfig.dataAddress != null && reg.test(vm.dataConfig.dataAddress)  ;
				if(!Boolean(result) || vm.dataConfig.dataAddress === ""){
					vm.dataAddressFlag=false;
				}else{
					vm.dataAddressFlag=true;
				}
			}else if(msg === 'dbName' ){
				if(vm.dataConfig.dbName == null || vm.dataConfig.dbName === ""){
					vm.dbNameFlag=false;
				}else{
					vm.dbNameFlag=true;
				}
			}else if(msg === 'userName' ){
				if(vm.dataConfig.userName == null || vm.dataConfig.userName === ""){
					vm.userNameFlag=false;
				}else{
					vm.userNameFlag=true;
				}
			}else if(msg === 'userPassword' ){
				if(vm.dataConfig.userPassword == null || vm.dataConfig.userPassword === ""){
					vm.userPasswordFlag=false;
				}else{
					vm.userPasswordFlag=true;
				}
			}
		},
		checkAllTribute: function(){
			if(vm.dataConfig.dataType == null || vm.dataConfig.dataType === ""){
				vm.dataTypeFlag=false;
				return false;
			}

			let reg = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/;
			let result = vm.dataConfig.dataAddress != null && reg.test(vm.dataConfig.dataAddress)  ;
			if(!Boolean(result) || vm.dataConfig.dataAddress === ""){
				vm.dataAddressFlag=false;
				return false;
			}

			if(vm.dataConfig.dbName == null || vm.dataConfig.dbName === ""){
				vm.dbNameFlag=false;
				return false;
			}
			if(vm.dataConfig.userName == null || vm.dataConfig.userName === ""){
				vm.userNameFlag=false;
				return false;
			}
			if(vm.dataConfig.userPassword == null || vm.dataConfig.userPassword === ""){
				vm.userPasswordFlag=false;
				return false;
			}

		},
		//检索框输入正则验证
		regexSelect: function(){
			let reg = /^[1-9]\d*$/;
			if (vm.q.keyId != null && vm.q.keyId !== "" && !reg.test(vm.q.keyId)) {
				vm.selectFlag = false;
				return;
			}
			vm.selectFlag = true;

		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'keyId': vm.q.keyId},
                page:page
            }).trigger("reloadGrid");
			vm.refresh();
		},
		refresh: function(){
			vm.dataTypeFlag=true;
			vm.dataAddressFlag=true;
			vm.dbNameFlag=true;
			vm.userNameFlag=true;
			vm.userPasswordFlag=true;
		}
	}
});