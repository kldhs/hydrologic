$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'policyEvent/list',
        datatype: "json",
        colModel: [
			{ label: '事件ID', name: 'eventId', index: "eventId", width: 45, key: true },
			{ label: '调用名', name: 'eventName', editable:true, editrules:{required:true}, editoptions:{placeholder: '必填'}, width: 100 },
			{ label: '事件描述', name: 'eventShow',editable:true, editrules:{required:true}, editoptions:{placeholder: '必填'}, width: 100 },
			{ label: '所属策略名称', name: 'policyId',editable:true, edittype:'select', editrules:{required:true}, editoptions:{value:vm.getPolicyList(),placeholder: '必填'}, width: 75, formatter: function(value){
					for (let i = 0; i <vm.policyList.length; i++) {
						if(value == vm.policyList[i].sign){
							return vm.policyList[i].describe;
						}
					}
					return "---";

				} },
			{ label: '备注', name: 'remark',editable:true,editrules:{required:true},editoptions:{placeholder: '必填'}, width: 100},
			{ label: '创建时间', name: 'insertDate',  width: 120},
			{ label: '创建人', name: 'insertId', width: 90},
			{ label: '修改时间', name: 'updateDate',  width: 120},
			{ label: '修改人', name: 'updateId', width: 90}
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
		editurl : baseURL+"policyEvent/save",
		beforeRequest: function() {
			vm.getPolicyList();
		},
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });

        }
    });
});

let vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			eventName: null,
			eventId:null
		},
		showList:true,
        policyList:null,
		addEventId:null,
		selectFlag:true
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			let ids = jQuery("#jqGrid").jqGrid('getDataIDs');
			//获得当前最大行号（数据编号）
			let rowid = Math.max.apply(Math,ids);
			$("#jqGrid").addRowData(rowid+1, {"eventId":rowid+1}, "first");
			$("#jqGrid").jqGrid('editRow', rowid+1);

			vm.addEventId=rowid+1;
			$("#saveBtn").css("pointer-events","auto").attr("disabled",false);
			$("#restoreBtn").css("pointer-events","auto").attr("disabled",false);
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
			console.log(str);
			return str;
        },
		save: function () {
			let result = $("#jqGrid").jqGrid('saveRow', vm.addEventId);
			if(Boolean(result)){
				$("#saveBtn").css("pointer-events","none").attr("disabled",true);
				$("#restoreBtn").css("pointer-events","none").attr("disabled",true);
				vm.reload();
			}

		},
		restore: function () {
			$("#jqGrid").jqGrid('restoreRow', vm.addEventId);
			$("#saveBtn").css("pointer-events","none").attr("disabled",true);
			$("#restoreBtn").css("pointer-events","none").attr("disabled",true);
			vm.reload();
		},

		//检索框输入正则验证
		regexSelect: function(){
			let reg = /^[1-9]\d*$/;
			if (vm.q.eventId != null && vm.q.eventId !== "" && !reg.test(vm.q.eventId)) {
				vm.selectFlag = false;
				return;
			}
			vm.selectFlag = true;

		},
		del: function () {
			let eventIds = getSelectedRows();
			if(eventIds == null){
				return ;
			}
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
					url: baseURL + "policyEvent/delete",
					contentType: "application/json",
					data: JSON.stringify(eventIds),
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
			});
		},
		reload: function () {
			vm.showList = true;
			let page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'eventName': vm.q.eventName, 'eventId': vm.q.eventId},
                page:page
            }).trigger("reloadGrid");
		}
	}
});