$(function () {
  vm.before();
  $("#jqGrid").jqGrid({
    url: baseURL + 'plcPoint/list',
    datatype: "json",
    colModel: [
      {label: '编号', name: 'pointId', width: 50, key: true},
      {label: 'PLCID', name: 'plcId', width: 50, editable: true, hidden: false},
      {label: 'PLC名称', name: 'plcName', width: 50, editable: false, hidden: false},
      {label: '设备ID', name: 'deviceId', width: 50, editable: true, hidden: false},
      {label: '设备名称', name: 'deviceName', width: 80, editable: false, hidden: false},
      {label: 'DB块编号', name: 'dbId',editable:true, width: 50},
      {label: '偏移地址', name: 'dbAddress', editable:true,width: 50},
      {label: '字节长度', name: 'byteLength', editable:true,width: 50},
      {label: '位地址', name: 'bitAddress', editable:true,width: 50},
      {label: '数据点名称', name: 'dataPoint',editable:true, width: 70},
      {label: '类型', name: 'dataType',editable:true, edittype:'select',editrules:{required:true},editoptions:{value:vm.getDataType()}, width: 70, formatter: function(value){
          for (let i = 0; i <vm.dataTypeList.length; i++) {
            console.log(vm.dataTypeList);
            if(value === vm.dataTypeList[i].sign){
              return vm.dataTypeList[i].describe;
            }
          }
          return value;
      }},
      {label: '当前值', name: 'value',editable:false, width: 50},
      {label: '历史值', name: 'oldValue',editable:false, width: 50},
      {label: '操作类型', name: 'operationType',editable:true,edittype:'select',editrules:{required:true},editoptions:{value:vm.getOpType()}, width: 70, formatter: function(value){
          for (let i = 0; i <vm.opTypeList.length; i++) {
            if(value === vm.opTypeList[i].sign){
              return vm.opTypeList[i].describe;
            }
          }
          return value;
        }},
      {label: '录入人', name: 'insertId', width: 50,hidden: true},
      {label: '录入时间', name: 'insertDate', width: 60},
      {label: '更新人', name: 'updateId', width: 50, hidden: true},
      {label: '更新时间', name: 'updateDate', width: 60, hidden: true}
    ],
    postData: {"deviceId":vm.q.deviceId},
    viewrecords: true,
    height: 600,
    rowNum: 18,
    rowList: [10, 30, 50],
    rownumbers: false,
    rownumWidth: 25,
    autowidth: true,
    multiselect: true,
    pager: "#jqGridPager",
    editurl : baseURL+"plcPoint/updateOrSave",
    jsonReader: {
      root: "page.list",
      page: "page.currPage",
      total: "page.totalPage",
      records: "page.totalCount"
    },
    prmNames: {
      page: "page",
      rows: "limit",
      order: "order"
    },
    // shrinkToFit: false,
    // autoScroll: true,
    gridComplete: function () {
      //隐藏grid底部滚动条
      $("#jqGrid").closest(".ui-jqgrid-bdiv").css({"overflow-x": "hidden"}); //hidden ,scroll

      if(vm.guide===1){
        vm.guide=0;
        vm.add();
      }
    }
  });
  $('.ui-jqgrid tr th').css({"text-align": "center"});
  $('#jqGrid').css({"text-align": "center"});
});

var vm = new Vue({
  el: '#honghu_cloud',
  data: {
    q: {
      plcId: null,
      deviceId: null,
      dataPoint: null,
    },
    plcPointInfo: {
      pointId:null,
      deviceId: null,
      dbId: null,
      dbAddress: null,
      dataPoint: null,
      dataLength: null,
    },
    showList: true,
    title: null,
    guide: 0,
    deviceIdFlag: true,
    dbIdFlag: true,
    pointId: null,
    plcParam:null,
    plcDeviceInfo:null,
    opTypeList:null,
    dataTypeList:null,
    dbAddressFlag: true,
    dataPointFlag: true,
    dataLengthFlag: true,
  },
  methods: {
    query: function () {
      vm.reload();
    },
    add: function(){
      // vm.pointId = vm.pointId+1;
      $("#jqGrid").addRowData(vm.pointId, {
        "insertDate":getCurrentTime(),
        "updateDate":getCurrentTime()},
          "first");
      $("#jqGrid").jqGrid('editRow', vm.pointId);
      $("#saveBtn").css("pointer-events","auto").attr("disabled",false);
      $("#restoreBtn").css("pointer-events","auto").attr("disabled",false);
      $("#saveAndSubmit").css("pointer-events", "auto").attr("disabled", false);
    },
    beforeUpdate: function () {
      let keyId = getSelectedRow();
      if (keyId == null) {
        return;
      }
      // $("#jqGrid").jqGrid('setColProp',"plcId", {editoptions:{readonly:true}});
      // $("#jqGrid").jqGrid('setColProp',"deviceId", {editoptions:{readonly:true}});
      $("#jqGrid").jqGrid('editRow', keyId);

      $("#saveBtn").css("pointer-events", "auto").attr("disabled", false);
      $("#restoreBtn").css("pointer-events", "auto").attr("disabled", false);
      $("#saveAndSubmit").css("pointer-events", "auto").attr("disabled", false);
    },
    restore: function (keyId) {
      $("#jqGrid").jqGrid('restoreRow', keyId);
      $("#saveBtn").css("pointer-events","none").attr("disabled",true);
      $("#restoreBtn").css("pointer-events","none").attr("disabled",true);
      vm.reload();
    },
    save: function () {
      let pointId = getSelectedRow();
      if (pointId == null) {
        return;
      }
      $("#jqGrid").jqGrid('saveRow', pointId,{aftersavefunc : function (pointId, response) {
          if(response.responseJSON.code===0){
            alert("操作成功");
            vm.reload();
          }else{
            alert(response.responseJSON.msg);
            $("#jqGrid").jqGrid('editRow', pointId);

          }

        }});
      // $("#saveBtn").css("pointer-events","none").attr("disabled",true);
      // $("#restoreBtn").css("pointer-events","none").attr("disabled",true);
      // $("#saveAndSubmit").css("pointer-events","none").attr("disabled",true);
    },
    update: function () {
      var pointId = getSelectedRow();
      if (pointId == null) {
        return;
      }
      vm.showList = false;
      vm.title = "修改";
      vm.getPlcPointInfo(pointId);
    },
    getOpType2: function(){
      $.ajax({
        type: "POST",
        url: baseURL + "plcPoint/getOpType",
        contentType: "application/json",
        async:false,
        success: function (r) {
          if (r.code === 0) {
            if (r.list != null) {
              vm.opTypeList = r.list;
            }
          }
        }
      });
    },
    getOpType: function(){
      if(vm.opTypeList==null || vm.opTypeList.length===0){
        vm.getOpType2();
      }
      let str = "";
      let len = vm.opTypeList.length;
      for (let i = 0; i < vm.opTypeList.length; i++) {
        if (i != len - 1) {
          str += vm.opTypeList[i].sign + ":" + vm.opTypeList[i].describe + ";";
        } else {
          str += vm.opTypeList[i].sign + ":" + vm.opTypeList[i].describe;// 这里是option里面的 value:label
        }
      }
      return str;
    },
    getDataType2: function(){
      $.ajax({
        type: "POST",
        url: baseURL + "plcPoint/getDataType",
        contentType: "application/json",
        async:false,
        success: function (r) {
          if (r.code === 0) {
            if (r.list != null) {
              vm.dataTypeList = r.list;
            }
          }
        }
      });
    },
    getDataType: function(){
      if(vm.dataTypeList==null || vm.dataTypeList.length===0){
        vm.getDataType2();
      }
      let str = "";
      let len = vm.dataTypeList.length;
      for (let i = 0; i < vm.dataTypeList.length; i++) {
        if (i != len - 1) {
          str += vm.dataTypeList[i].sign + ":" + vm.dataTypeList[i].describe + ";";
        } else {
          str += vm.dataTypeList[i].sign + ":" + vm.dataTypeList[i].describe;// 这里是option里面的 value:label
        }
      }
      return str;
    },
    del: function () {
      var pointIds = getSelectedRows();
      if (pointIds == null) {
        return;
      }
      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "plcPoint/delete",
          contentType: "application/json",
          data: JSON.stringify(pointIds),
          success: function (r) {
            if (r.code === 0) {
              alert('操作成功', function () {
                vm.reload();
              });
            } else {
              alert(r.msg);
            }
          }
        });
      });
    },
    before: function () {
      let url=decodeURI(window.location.href);
      console.log(url)
      if(url.indexOf("?") != -1){
        let param = url.split("?")[1]; //op=jump&deviceId=1&plcId=1
        let paramArray = param.split("&");
        if(paramArray[0].indexOf("jump") != -1){
          vm.q.deviceId=paramArray[1].split("=")[1];
          vm.q.plcId=paramArray[2].split("=")[1];
        }else if(param.indexOf("add") != -1){
          vm.q.deviceId=paramArray[1].split("=")[1];
          vm.q.plcId=paramArray[2].split("=")[1];
          vm.guide=1;
        }

        $.get(baseURL + "plcParam/getPlcParam/" + vm.q.plcId, function (r) {
          vm.plcParam = r.plcParam;
        });

        $.get(baseURL + "plcDevice/getPlcDeviceInfo/" + vm.q.deviceId, function (r) {
          vm.plcDeviceInfo = r.plcDeviceInfo;
        });
      }
    },
    selectFile: function (){
      let inputObj=document.createElement('input')
      inputObj.setAttribute('id','_ef');
      inputObj.setAttribute('type','file');
      inputObj.setAttribute('name','file');
      inputObj.setAttribute('style','display:none');
      inputObj.setAttribute('onchange',function uploadFile() {
        let myform = new FormData();
        myform.append('file',$('#_ef')[0].files[0]);
        $.ajax({
          url: baseURL + 'plcPoint/list',
          type: "POST",
          data: myform,
          contentType: false,
          processData: false,
          success: function (data) {
            console.log(data);
          },
          error:function(data){
            console.log(data)
          }
        });
      });
      document.body.appendChild(inputObj);
      inputObj.click();
    },
    getPlcPointInfo: function (keyId) {
      $.get(baseURL + "plcPointInfo/getplcPointInfo/" + keyId, function (r) {
        vm.plcPointInfo = r.plcPointInfo;
      });
    },
    reload: function () {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'plcId': vm.q.plcId,
          'deviceId': vm.q.deviceId,
          'dataPoint': vm.q.dataPoint
        },
        page: page
      }).trigger("reloadGrid");
      vm.refresh();
    },
    refresh: function () {
      vm.deviceIdFlag = true;
      vm.vmbIdFlag = true;
      vm.mdbAddressFlag = true;
      vm.vmdataPointFlag = true;
      vm.vmdataLengthFlag = true;
    }
  }
});
