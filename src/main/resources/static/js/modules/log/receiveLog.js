$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'log/receiveLog/list',
        datatype: "json",
        colModel: [
            { label: '日志编号', name: 'keyId', index: "keyId", width: 45, key: true },
            { label: '接收内容', name: 'content', width: 75 },
            { label: '发送者', name: 'sender', width: 90 },
            { label: '接收时间', name: 'recvTime', width: 80 }
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
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" });
            let parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
            $("#jqGrid").jqGrid('setGridWidth', parent_column.width());
        }
    });
});


let vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			startTime: null,
            endTime: null
		},
		showList: true,
		title:null,
	},
	methods: {
		query: function () {
			vm.reload();
		},
		reload: function () {
			vm.showList = true;
			let page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'startTime':vm.q.startTime,'endTime':vm.q.endTime},
                page:page
            }).trigger("reloadGrid");
		}
	}
});