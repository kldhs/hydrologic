$(function () {
	vm.getSysParamConfig();
});

var vm = new Vue({
	el:'#honghu_cloud',
	data:{
		q:{

		},
		showList: true,
		title:"系统交互参数",
		sysParamConfig:{},
		isIpValidated1:true,
		isIpValidated2:true,
		isPortValidated1:true,
		isPortValidated2:true,
		isScmPortValidated:true,
		isLocalNameValidated:true,
		isWmsNameValidated:true
	},
	methods: {
		initCheck:function(){
			vm.isIpValidated1=true;
			vm.isIpValidated2=true;
			vm.isPortValidated1=true;
			vm.isPortValidated2=true;
			vm.isScmPortValidated=true;
			vm.isLocalNameValidated=true;
			vm.isWmsNameValidated=true;
		},
		checkPort:function(){
			var portReg=/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/;
			vm.isPortValidated1 = !(!portReg.test(vm.sysParamConfig.localToWms) && (vm.sysParamConfig.localToWms != null || vm.sysParamConfig.localToWms !== ""));
			vm.isPortValidated2 = !(!portReg.test(vm.sysParamConfig.wmsPort) && (vm.sysParamConfig.wmsPort != null || vm.sysParamConfig.wmsPort !== ""));
			vm.isScmPortValidated = !(!portReg.test(vm.sysParamConfig.localToScm) && (vm.sysParamConfig.localToScm !== "" || vm.sysParamConfig.localToScm != null));
		},
		checkIp:function(){
			var ipReg= /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
			vm.isIpValidated1 = !(!ipReg.test(vm.sysParamConfig.localIp) && (vm.sysParamConfig.localIp !== "" || vm.sysParamConfig.localIp != null));
			vm.isIpValidated2 = !(!ipReg.test(vm.sysParamConfig.wmsIp) && (vm.sysParamConfig.wmsIp !== "" || vm.sysParamConfig.wmsIp != null));
		},
		checkLocalName:function(){
			vm.isLocalNameValidated = vm.sysParamConfig.localName !== "" && vm.sysParamConfig.localName != null;
		},
		checkWmsName:function(){
			vm.isWmsNameValidated = vm.sysParamConfig.wmsName !== "" && vm.sysParamConfig.wmsName != null;
		},

		update: function () {
			vm.showList = false;
            vm.title = "修改";
			vm.initCheck();
		},

		saveOrUpdate: function () {
			//判断表单验证
			if (!vm.isIpValidated1 || !vm.isIpValidated2 || !vm.isPortValidated1|| !vm.isPortValidated2||!vm.isScmPortValidated||!vm.isLocalNameValidated || !vm.isWmsNameValidated ) {
				alert('请输入正确的信息');
				return;
			}
			var url = "sysParamConfig/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sysParamConfig),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功',function(){
							vm.toSysParamConfig()
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		getSysParamConfig: function(){
			$.get(baseURL + "sysParamConfig/info", function(r){
				vm.sysParamConfig = r.sysParamConfig;
			});
		},
		toSysParamConfig:function () {
			window.location.href=baseURL+"modules/param/hardware.html"
		}

	}
});