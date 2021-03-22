$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'user/list',
        datatype: "json",
        colModel: [
			{ label: '用户ID', name: 'userId', index: "userId", width: 45, key: true },
			{ label: '用户名', name: 'userName', width: 75 },
			{ label: '角色', name: 'roleName', width: 75 },
			{ label: '部门', name: 'deptName', width: 75 },
			{ label: '邮箱', name: 'email', width: 90 },
			{ label: '手机号', name: 'mobile', width: 80 },
			{ label: '状态', name: 'status', width: 80, formatter: function(value){
				return value === 0 ? 
					'<span class="label label-danger">禁用</span>' : 
					'<span class="label label-success">正常</span>';
			}},
			{ label: '创建时间', name: 'insertDate', index: "insertDate", width: 90}
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
		beforeRequest: function() {

		},
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
        }
    });
});

let setting = {
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

var settingForDept = {
	data: {
		simpleData: {
			enable: true,
			idKey: "departmentId",
			pIdKey: "parentId",
			rootPId: -1
		},
		key: {
			url:"nourl",
			name:"departmentName"
		}
	}
};
var ztree;

var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			userName: null,
			dept:null
		},
		showList: true,
		title:null,
		roleList:{},
		user:{
			status:1,
			roleIdList:null
		},
		passwordFlag: true,
		emailFlag: true,
		mobileFlag: true,
		usernameFlag: true
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.roleList = {};
			vm.user = {status:1, roleId:2,dept:null};
			//获取角色信息
			this.getRoleList();
			this.getDepartment();
		},
		update: function () {
			let userId = getSelectedRow();
			if(userId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
			vm.getUser(userId);
			//获取角色信息
			this.getRoleList();
			//

		},
		del: function () {
			let userIds = getSelectedRows();
			if(userIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "user/delete",
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
			if(!Boolean(vm.checkAllTribute())){
				return;
			}
			let url = vm.user.userId == null ? "user/save" : "user/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.user),
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
		getUser: function(userId){
			$.get(baseURL + "user/info/"+userId, function(r){
				vm.user = r.user;
				vm.user.password = null;
			});
		},
		getRoleList: function(){
			$.get(baseURL + "role/select", function(r){
				vm.roleList = r.list;
			});
		},
		//输入信息非空验证及正则验证。
		regex: function(msg){
			let result = false;
			let reg = '';
			if('username' === msg){
				vm.usernameFlag = !(vm.user.userName == null || vm.user.userName === "");
			}else if('password' === msg && '新增' === vm.title){
				reg = /^[A-Za-z0-9]+$/;
				result = reg.test(vm.user.password) ;
				vm.passwordFlag = !(!Boolean(result) || vm.user.password == null || vm.user.userName === "");
			} else if('email' === msg){
				reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				result = reg.test(vm.user.email) ;
				vm.emailFlag = !(!Boolean(result) || vm.user.email == null || !Boolean(result));
			} else if('mobile' === msg){
				reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
				result = reg.test(vm.user.mobile) ;
				vm.mobileFlag = !(!Boolean(result) || vm.user.mobile == null);
			}
		},
		checkAllTribute: function(){
			let result = false;
			let reg = '';
			if(!(vm.mobileFlag && vm.emailFlag && vm.passwordFlag && vm.usernameFlag)){
				alert("请检查并填入正确信息");
				return false;
			}

			if(vm.user.userName == null || "" === vm.user.userName){
				vm.usernameFlag=false;
				return false;
			}

			reg = /^[A-Za-z0-9]+$/;
			result = reg.test(vm.user.password) ;
			if( vm.title === '新增'){
				if(!Boolean(result) || null == vm.user.password || "" === vm.user.password) {
					vm.passwordFlag = false;
					return false;
				}
			}

			reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
			result = reg.test(vm.user.email) ;
			if(!Boolean(result) || null == vm.user.email || "" === vm.user.email){
				vm.emailFlag=false;
				return false;
			}

			reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
			result = reg.test(vm.user.mobile ) ;
			if(null == vm.user.mobile || "" === vm.user.mobile || !Boolean(result)){
				vm.mobileFlag=false;
				return false;
			}
			return true;

		},
		reload: function () {
			vm.showList = true;
			let page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'userName': vm.q.userName},
                page:page
            }).trigger("reloadGrid");
			vm.refresh();
		},
		refresh: function(){
			vm.passwordFlag=true;
			vm.emailFlag=true;
			vm.mobileFlag=true;
			vm.usernameFlag=true;
		},
		departmentTree: function(){
			layer.open({
				type: 1,
				offset: '50px',
				skin: 'layui-layer-molv',
				title: "选择菜单",
				area: ['300px', '450px'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#departmentLayer"),
				// btn: ['确定', '取消'],
				btn1: function (index) {
					var node = ztree.getSelectedNodes();
					console.log('node:' + node[0].departmentName);
					vm.user.dept = node[0].departmentId;
					layer.close(index);
				}
			});
		},
		getDepartment: function(){
			//加载菜单树
			$.get(baseURL + "department/selectForUser", function(r){
				ztree = $.fn.zTree.init($("#departmentTree"), settingForDept, r.departmentList);
				// var node = ztree.getNodeByParam("departmentId", vm.menu.parentId);
				// ztree.selectNode(node);
				// console.log("node.departmentName:" + node.departmentName);
				// vm.menu.departmentName = node.departmentName;
			})
		},
	}
});