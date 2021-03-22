$(function () {
    var url=decodeURI(window.location.href);
    vm.q.deviceId=url.split("=")[1];
    $("#jqGrid").jqGrid({
        url: baseURL + 'dutyDistribution/list',
        datatype: "json",
        colModel: [
            { label: 'ID', name: 'dutyId', index: "dutyId", width: 80 ,key:true},
            { label: '车辆编号', name: 'deviceId',  width: 60,editable : true,editoptions : {readonly : true} },
            { label: '职责类别', name: 'dutyType',editable:true, edittype:'select',editrules:{required:true},
                editoptions:{value:"area:区域;taskPeak:任务峰值;taskType:任务类型",dataEvents: [
                        {
                            type: 'change',
                            fn: function (e) {
                                let keyId = $('#jqGrid').jqGrid('getGridParam','selrow');//获得行ID
                                let val = this.value;//获取当前值
                                if(val==="area"){
                                    $("#"+keyId+"_districtId ").attr("disabled",false);
                                    $("#"+keyId+"_taskPeak").attr("disabled",true);
                                    $("#"+keyId+"_taskType").attr("disabled",true);
                                }else if(val==="taskPeak"){
                                    $("#"+keyId+"_districtId ").attr("disabled",true);
                                    $("#"+keyId+"_taskPeak").attr("disabled",false);
                                    $("#"+keyId+"_taskType").attr("disabled",true);
                                }else if(val==="taskType"){
                                    $("#"+keyId+"_districtId ").attr("disabled",true);
                                    $("#"+keyId+"_taskPeak").attr("disabled",true);
                                    $("#"+keyId+"_taskType").attr("disabled",false);
                                }
                                // else if(val==="coordinateXyz"){
                                //     $("#"+keyId+"_districtId ").attr("disabled",true);
                                //     $("#"+keyId+"_taskPeak").attr("disabled",true);
                                //     $("#"+keyId+"_taskType").attr("disabled",true);
                                //     $("#"+keyId+"_coordinateXyz").attr("disabled",false);
                                // }
                            }
                        }
                    ]}, width: 90,
                formatter: function (value, options, row) {
                    if (value === 'area') {
                        return '<span>区域</span>';
                    } else if (value === 'taskPeak') {
                        return '<span>任务峰值</span>';
                    } else if (value === 'taskType') {
                        return '<span>任务类型</span>';
                    }
                    else {
                        return "---";
                    }
                },
            },
            { label: '区域编号', name: 'districtId', editable:true,editrules:{
                // required:true,
                    custom: true,//这里是自定义校验规则
                    custom_func: function (value,label) {
                        let keyId = getSelectedRow();
                        if (keyId == null) {
                            return;
                        }

                        if($("#"+keyId+"_dutyType option:selected").val()==="area"&&(value==null||value==="")){
                            return [false, "请输入区域编号"];
                        }else {
                            return [true, ""];
                        }
                    }


                },editoptions:{},width: 90},
            { label: '任务峰值', name: 'taskPeak', editable:true,editrules:{required:false,integer:true, minValue:1},editoptions:{},width: 90},
            { label: '任务类型', name: 'taskType',editable:true,edittype:'select',editoptions:{value:vm.getTaskTypes2()}, formatter: function(value){
                    for (let i = 0; i <vm.taskTypeList.length; i++) {
                        if(value === vm.taskTypeList[i].sign){
                            return vm.taskTypeList[i].describe;
                        }
                    }
                    return value;
                }, width: 90},

            // { label: '出入库口坐标', name: 'coordinateXyz',editable:true,edittype:'select',,editoptions:{value:vm.getDeviceTypes2()}, width: 90,
            //     }},

        ],
        viewrecords: true,
        postData:{'deviceId': vm.q.deviceId},
        height: 385,
        rowNum: 10,
        rowList : [10,30,50],
        rownumbers: false,
        rownumWidth: 25,
        autowidth:true,
        // shrinkToFit:false,
        // autoScroll: true,
        multiselect: true,
        pager: "#jqGridPager",
        editurl : baseURL+"dutyDistribution/updateOrSave",
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
            $("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "auto" });  //scroll

            var parent_column = $("#jqGrid").closest('[class*="col-"]');//list是jQgrid的table的ID
            $("#jqGrid").jqGrid('setGridWidth', parent_column.width());

            if(vm.guide===1){
                vm.guide=0;
                vm.add();
            }
        },
        beforeRequest:function () {
            vm.getTaskTypes();
        }
    });
});
var vm = new Vue({
    el:'#honghu_cloud',
    data:{
        q:{
            deviceId: '',
        },
        selected:'',
        dutyDistribution:{},
        taskTypeList:[],
        operation:null,
        kbParamId:99999998,
        guide: 0,
    },

    methods: {
        query: function () {
            vm.reload();
        },
        add: function(){
            vm.kbParamId=vm.kbParamId+1,
                $("#jqGrid").addRowData(vm.kbParamId, {"kbParamId":vm.kbParamId,"deviceId":vm.q.deviceId}, "first");
            $("#jqGrid").jqGrid('setColProp',"deviceId",{editable:true}, {editoptions:{value:vm.q.deviceId,readonly : true}});
            $("#jqGrid").jqGrid('editRow', vm.kbParamId);
            $("#jqGrid").jqGrid('setSelection', vm.kbParamId);

            if($("#"+vm.kbParamId+"_dutyType option:selected").val()==="area"){
                $("#"+vm.kbParamId+"_districtId ").attr("disabled",false);
                $("#"+vm.kbParamId+"_taskPeak").attr("disabled",true);
                $("#"+vm.kbParamId+"_taskType").attr("disabled",true);
            }else if($("#"+vm.kbParamId+"_dutyType option:selected").val()==="taskPeak") {
                $("#"+vm.kbParamId+"_districtId ").attr("disabled",true);
                $("#"+vm.kbParamId+"_taskPeak").attr("disabled",false);
                $("#"+vm.kbParamId+"_taskType").attr("disabled",true);
            }else if($("#"+vm.kbParamId+"_dutyType option:selected").val()==="taskType"){
                $("#"+vm.kbParamId+"_districtId ").attr("disabled",true);
                $("#"+vm.kbParamId+"_taskPeak").attr("disabled",true);
                $("#"+vm.kbParamId+"_taskType").attr("disabled",false);
            }

            $("#saveBtn").css("pointer-events","auto").attr("disabled",false);
            $("#restoreBtn").css("pointer-events","auto").attr("disabled",false);
            $("#saveAndSubmit").css("pointer-events", "auto").attr("disabled", false);
        },
        beforeUpdate: function () {
            let keyId = getSelectedRow();
            if (keyId == null) {
                return;
            }
            $("#jqGrid").jqGrid('setColProp',"kbId", {editable:false});
            $("#jqGrid").jqGrid('editRow', keyId);

            if($("#"+keyId+"_dutyType option:selected").val()==="area"){
                $("#"+keyId+"_districtId ").attr("disabled",false);
                $("#"+keyId+"_taskPeak").attr("disabled",true);
                $("#"+keyId+"_taskType").attr("disabled",true);
            }else if($("#"+keyId+"_dutyType option:selected").val()==="taskPeak") {
                $("#"+keyId+"_districtId ").attr("disabled",true);
                $("#"+keyId+"_taskPeak").attr("disabled",false);
                $("#"+keyId+"_taskType").attr("disabled",true);
            }else if($("#"+keyId+"_dutyType option:selected").val()==="taskType"){
                $("#"+keyId+"_districtId ").attr("disabled",true);
                $("#"+keyId+"_taskPeak").attr("disabled",true);
                $("#"+keyId+"_taskType").attr("disabled",false);
            }

            $("#saveBtn").css("pointer-events", "auto").attr("disabled", false);
            $("#restoreBtn").css("pointer-events", "auto").attr("disabled", false);
            $("#saveAndSubmit").css("pointer-events", "auto").attr("disabled", false);
        },
        restore: function (keyId) {
            $("#jqGrid").jqGrid('restoreRow', keyId);
            $("#saveBtn").css("pointer-events","none").attr("disabled",true);
            $("#restoreBtn").css("pointer-events","none").attr("disabled",true);
            $("#saveAndSubmit").css("pointer-events","none").attr("disabled",true);
            vm.reload();
        },
        save:function(){
            let keyId = getSelectedRow();
            if (keyId == null) {
                return;
            }
            $("#jqGrid").jqGrid('saveRow', keyId,
                {aftersavefunc : function (keyId, response) {
                        if(response.responseJSON.code===0){
                            alert("操作成功");
                            vm.reload();
                            $("#saveBtn").css("pointer-events","none").attr("disabled",true);
                            $("#restoreBtn").css("pointer-events","none").attr("disabled",true);
                        }else{
                            alert(response.responseJSON.msg);
                            $("#jqGrid").jqGrid('editRow', keyId);

                        }
                    },extraparam : {"operation":vm.operation}});
        },
        del: function () {
            var keyIds = getSelectedRows();
            if(keyIds == null){
                return ;
            }
            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "dutyDistribution/deleteCarDuty",
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

        toShuttleCar:function(){
            window.location.href=baseURL+"modules/device/shuttleCar.html"
        },

        getTaskTypes:function(){
            $.ajax({
                type: "POST",
                url: baseURL + "taskInfo/getTaskTypes",
                contentType: "application/json",
                async:false,
                success: function (r) {
                    if (r.code === 0) {
                        if (r.list != null) {
                            vm.taskTypeList = r.list;
                        }
                    }
                }
            });
        },
        getTaskTypes2: function(){
            if(vm.taskTypeList==null || vm.taskTypeList.length===0){
                vm.getTaskTypes();
            }
            let str = "";  //null:任务类型;
            let len = vm.taskTypeList.length;
            for (let i = 0; i < vm.taskTypeList.length; i++) {
                if (i != len - 1) {
                    str += vm.taskTypeList[i].sign + ":" + vm.taskTypeList[i].describe + ";";
                } else {
                    str += vm.taskTypeList[i].sign + ":" + vm.taskTypeList[i].describe;// 这里是option里面的 value:label
                }
            }
            return str;
        },

        reload: function () {
            vm.showList = true;
            var page = $("#jqGrid").jqGrid('getGridParam','page');
            $("#jqGrid").jqGrid('setGridParam',{
                postData:{
                    'deviceId': vm.q.deviceId,
                },
                page:page
            }).trigger("reloadGrid");

        }
    }

});