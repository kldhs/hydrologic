$(function () {
    var url=decodeURI(window.location.href);
    vm.q.deviceId=url.split("=")[1];
    // vm.getShuttleCar(vm.q.deviceId);
    $("#jqGrid").jqGrid({
        url: baseURL + 'chargerRecord/list/'+vm.q.deviceId,
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'keyId', width: 40, index: "keyId", key: true},
            { label: '设备编号', name: 'deviceId',width: 60 },
            { label: '开始充电时间', name: 'startChargerTime', width: 130 },
            { label: '结束充电时间', name: 'endChargerTime', width: 130 },
            { label: '开始充电电量', name: 'startElectricity', width: 100 },
            { label: '结束充电电量', name: 'endElectricity', width: 100 },
            { label: '是否自动开始', name: 'isAutoStart', width: 100 , formatter: function(value, options, row) {
                    if (value === 'y') {
                        return '<span>是</span>';
                    }
                    else if (value === 'n') {
                        return '<span>否</span>';
                    }else {
                        return "---";
                    }
                }},
            { label: '是否自动结束', name: 'isAutoEnd', width: 100 , formatter: function(value, options, row) {
                    if (value === 'y') {
                        return '<span>是</span>';
                    }
                    else if (value === 'n') {
                        return '<span>否</span>';
                    }else {
                        return "---";
                    }
                }},

        ],
        viewrecords: true,
        height: 385,
        rowNum: 11,
        rowList : [10,30,50],
        rownumbers: false,
        rownumWidth:25,
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
        // shrinkToFit:false,
        autoScroll: true,
        gridComplete:function(){
            //隐藏grid底部滚动条
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" });
            // var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
            // $("#jqGrid").jqGrid('setGridWidth', parent_column.width());
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
		q: {
            deviceId: null
		},
		showList: true,
		title:'充电明细',
        chargerRecord:{}
	},
	methods: {
		query: function () {
			vm.reload();
		},
        getShuttleCar:function(){

        },
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{
                    'deviceId':vm.q.deviceId
                },
                page:page
            }).trigger("reloadGrid");
		},
        toShuttleCar:function(){
            window.location.href=baseURL+"modules/device/shuttleCar.html"
        }

	}
});

