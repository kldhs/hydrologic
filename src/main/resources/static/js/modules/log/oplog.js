$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'log/opLog/list',
        datatype: "json",
        colModel: [			
			{ label: '日志编号', name: 'logId', index: "logId", width: 150, key: true },
			{ label: '操作模块', name: 'operModule', width: 120 },
			{ label: '操作类', name: 'operClass', width: 180 },
			{ label: '操作方法', name: 'operMethod', width: 100 },
			{ label: '操作类型', name: 'operType', width: 80},
            { label: '操作识别字段数据', name: 'operColData', width: 150},
            { label: '操作人', name: 'operName', width: 80},
			{ label: '操作日期', name: 'operDate', width: 150,editable:false,formatter:"date",formatoptions: {srcformat:'Y-m-d H:i:s',newformat:'Y-m-d H:i:s'}},
            { label: '数据内容', name: 'dataContent', width: 400}
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
        shrinkToFit:false,
        autoScroll: true,
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" });
            let parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
            $("#jqGrid").jqGrid('setGridWidth', parent_column.width());
        }
    });
});


var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{
			operModule: null,
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
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'operModule': vm.q.operModule,'startTime':vm.q.startTime,'endTime':vm.q.endTime},
                page:page
            }).trigger("reloadGrid");
		}
	}
});