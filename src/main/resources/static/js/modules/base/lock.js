
		$(function () {
			$("#jqGrid").jqGrid({
				url: baseURL + 'lock/list',
				datatype: "json",
				colModel: [
					{ label: '货位号', name: 'storageId', index: "storageId", width: 45 ,key:true},
					{ label: '锁标识', name: 'lockMark' , width: 45 },
					{ label: '设备号', name: 'lockMark' , width: 45 },
					{ label: 'X坐标', name: 'x', width: 20},
					{ label: 'Y坐标', name: 'y', width: 20},
					{ label: 'Z坐标', name: 'z', width: 20},
					{ label: '货位类型', name: 'storageType', width: 20},
					{ label: '最后加锁时间', name: 'lockTime', width: 90, editable:false,formatter:"date",formatoptions: {srcformat:'Y-m-d H:i:s',newformat:'Y-m-d H:i:s'}},
				],
				viewrecords: true,
				height: 385,
				rowNum: 10,
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
				postData : {
					isLock : vm.q.isLock
				},
				gridComplete:function(){
					//隐藏grid底部滚动条
					$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
				}
			});
		});

	var vm = new Vue({
		el:'#honghu_cloud',
		data:{
			q:{
				minX: null,
				maxX: null,
				minY: null,
				maxY: null,
				minZ: null,
				maxZ: null,
				mark: null,
				isLock: 1
			},
		},
		methods: {
			query: function () {
				vm.reload();
			},
			del: function () {
				var storageIds = getSelectedRows();
				if(storageIds == null){
					return ;
				}

				confirm('确定要解锁选中的货位？', function(){
					$.ajax({
						type: "POST",
						url: baseURL + "lock/unLock",
						contentType: "application/json",
						data: JSON.stringify(storageIds),
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
			lock: function () {
				var storageIds = getSelectedRows();
				if(storageIds == null){
					return ;
				}

				confirm('确定要给选中的货位加锁？', function(){
					$.ajax({
						type: "POST",
						url: baseURL + "lock/lock",
						contentType: "application/json",
						data: JSON.stringify(storageIds),
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
			reload: function (event) {
				var page = $("#jqGrid").jqGrid('getGridParam','page');
				$("#jqGrid").jqGrid('setGridParam',{
					postData:{  'minX': vm.q.minX,'maxX': vm.q.maxX,
								'minY': vm.q.minY,'maxY': vm.q.maxY,
								'minZ': vm.q.minZ,'maxZ': vm.q.maxZ,
								'mark': vm.q.mark,'isLock': vm.q.isLock},
					page:page
				}).trigger("reloadGrid");
			}
		}
	});