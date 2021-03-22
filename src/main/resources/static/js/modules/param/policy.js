$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'policy/list',
        datatype: "json",
        colModel: [
			{ label: '策略ID', name: 'keyId', index: "keyId", width: 45, key: true },
			{ label: '策略名称', name: 'policyName', editable:true, edittype:'select',editrules:{required:true},editoptions:{value:vm.getPolicyList()}, width: 75},
			{ label: '存储过程', name: 'eventId',editable:true, edittype:'select',editrules:{required:true},width: 90, formatter: function(value){
					for (let i = 0; i <vm.eventList.length; i++) {
						if(value === vm.eventList[i].eventId){
							return vm.eventList[i].eventName;
						}
					}
					return value;
				} },
			{ label: '备注', name: 'remark',editrules:{required:true},editable:true, width: 80,editoptions:{placeholder: '必填'}},
			{ label: '创建时间', name: 'insertDate',  width: 90},
			{ label: '创建人', name: 'insertId', width: 90},
			{ label: '修改时间', name: 'updateDate',  width: 90},
			{ label: '修改人', name: 'updateId', width: 90},
			{ label: '操作',name: 'act',index : 'act',width : 120,sortable : false},
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
		editurl : baseURL+"policy/updateOrSave",
		beforeRequest: function() {
			vm.getEventList();
			vm.getPolicyList();
		},
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
			let keyIds = $("#jqGrid").jqGrid('getDataIDs');
			for ( let i = 0; i < keyIds.length; i++) {
				let cl = keyIds[i];
				let be = "<a class='btn btn-warning' onClick=\"vm.beforeUpdate("+ cl + ")\"><i class='fa fa-pencil-square-o'></i>&nbsp;编辑</a>&nbsp";
				let se = "<a class='btn btn-success' onClick=\"vm.save("+ cl + ")\"><i class='fa fa-save'></i>&nbsp;保存</a>&nbsp";
				let ce = "<a class='btn btn-danger' onClick=\"vm.restore("+ cl + ")\"><i class='fa fa-trash-o'></i>&nbsp;取消</a>";
			// <a v-if="hasPermission('param:policy')" class="btn btn-warning" @click="update"><i class="fa fa-pencil-square-o"></i>&nbsp;编辑</a>
			// 	let se = "<input style='height:22px;width:50px;background: #00a65a' type='button' value='保存' onclick=\"vm.save('"
			// 		+ cl + "');\" />&nbsp";
			// 	let ce = "<input style='height:22px;width:50px;background: #9f191f' type='button' value='取消' onclick=\"$('#jqGrid').restoreRow('"
			// 		+ cl + "');\" />&nbsp";
				$("#jqGrid").jqGrid('setRowData', keyIds[i],
					{
						act : be + se + ce
					});
			}
        }
    });
});

var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			policyName: null,
			keyId:null
		},
		showList: true,
		title:null,
		policy:{

		},
        eventList:null,
		eventStr:"",
		currentKeyId:"",
		policyList:null,
		addPolicyId:998,
		selectFlag:true
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){

			vm.addPolicyId = vm.addPolicyId+1;
			$("#jqGrid").addRowData(vm.addPolicyId, {"keyId":vm.addPolicyId}, "first");
			$("#jqGrid").jqGrid('setColProp',"eventId", {editoptions:{value:vm.getCurrentEventList(-1)},placeholder: '请先添加策略事件'});
			$("#jqGrid").jqGrid('editRow', vm.addPolicyId);

			$("#saveBtn").css("pointer-events","auto").attr("disabled",false);
			$("#restoreBtn").css("pointer-events","auto").attr("disabled",false);
		},

		del: function () {
			var keyIds = getSelectedRows();
			if(keyIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					url: baseURL + "policy/delete",
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
		getPolicy: function(keyId){
			$.get(baseURL + "policy/info/"+keyId, function(r){
				vm.policy = r.policy;
			});
		},
        getEventList: function(){
            $.ajax({
                type: "POST",
                url: baseURL + "policyEvent/getAll",
                contentType: "application/json",
                async:false,
                success: function (r) {
                    if (r.code === 0) {
                        if (r.eventList != null) {
                            vm.eventList = r.eventList;
                        }
                    }
                }
            });
        },
		beforeUpdate: function (keyId) {
			$("#jqGrid").jqGrid('setColProp',"eventId", {editoptions:{value:vm.getCurrentEventList(keyId)}});
			$("#jqGrid").jqGrid('editRow', keyId);
		},

		save: function (keyId) {
			$("#jqGrid").jqGrid('saveRow', keyId,{aftersavefunc : function (keyId, response) {
				if(response.responseJSON.code===0){
					alert("操作成功");
					vm.reload();
				}else{
					alert(response.responseJSON.msg);
					$("#jqGrid").jqGrid('editRow', keyId);

				}

			}});
		},
		restore: function (keyId) {
			$("#jqGrid").jqGrid('restoreRow', keyId);
			$("#saveBtn").css("pointer-events","none").attr("disabled",true);
			$("#restoreBtn").css("pointer-events","none").attr("disabled",true);
			vm.reload();
		},
		getPolicyList: function(){
			let str = "";
			$.ajax({
				type: "POST",
				url: baseURL + "policy/getAllByEnum",
				contentType: "application/json",
				async:false,
				success: function (r) {
					if (r.code === 0) {
						if (r.policyList != null) {
							vm.policyList = r.policyList;
							let len = r.policyList.length;
							for (let i = 0; i < r.policyList.length; i++) {
								if (i != len - 1) {
									str += r.policyList[i].sign + ":" + r.policyList[i].describe + ";";
								} else {
									str += r.policyList[i].sign + ":" + r.policyList[i].describe;// 这里是option里面的 value:label
								}
							}
						}
					}
				}
			});
			return str;
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
		getCurrentEventList: function(keyId){
			let str = "";
			$.ajax({
				type: "POST",
				url: baseURL + "policyEvent/getAllByPolicyId",
				data: {"policyId": keyId},
				async:false,
				success: function (r) {
					if (r.code === 0) {
						let len = r.eventList.length;
						if(len === 0){
							alert("请先添加策略事件!再增加策略！");
							vm.restore(keyId);
						}
						for (let i = 0; i < r.eventList.length; i++) {
							if (i != len - 1) {
								str += r.eventList[i].eventId + ":" + r.eventList[i].eventName + ";";
							} else {
								str += r.eventList[i].eventId + ":" + r.eventList[i].eventName;// 这里是option里面的 value:label
							}
						}
					}
				}
			});
			return str;
		},
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'policyName': vm.q.policyName, 'keyId': vm.q.keyId},
                page:page
            }).trigger("reloadGrid");
		}
	}
});