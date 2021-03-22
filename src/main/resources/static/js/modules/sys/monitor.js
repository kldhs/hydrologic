$(function () {
    vm.getAllFloors();
    vm.getAllDevices(1);
    vm.getAllFloorsDevices();
    vm.getStorageStatus();
    vm.getStorageType();
});
Vue.component('query', {
    props: {
        queryTitle: {
            type: String,
            default: '货位类型',
        },
        queryConfirm: {
            type: String,
            default: 'Yes'
        },
        queryCancel: {
            type: String,
            default: 'No'
        },

    },
    template: `<div class="storage-monitor-modal">
            <p>{{ queryTitle }}</p>
            <div class="slot">
            <slot>
            </slot></div>
            <div>
                <div >
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="storage" v-model="vm.storage.storageType"/> 货位
                     </label>
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="road" v-model="vm.storage.storageType"/> 坡道
                     </label>
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="in" v-model="vm.storage.storageType"/> 入库口
                     </label>
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="out" v-model="vm.storage.storageType"/> 出库口
                     </label>
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="hoister" v-model="vm.storage.storageType"/> 提升机
                     </label> 
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="ban" v-model="vm.storage.storageType"/> 禁用
                     </label> 
                     <label class="radio-inline">
                         <input type="radio" name="storageType" value="charger" v-model="vm.storage.storageType"/> 充电桩
                     </label>                           
               </div>
               <div style="text-align: center;margin-top: 13px">
                 <button class="btn btn-primary" @click="queryY()" @click="update">{{ queryConfirm }}</button>
             <button class="btn btn-warning" @click="queryN()" >{{ queryCancel }}</button> 
                </div>
            </div>
        </div>`,
    methods: {
        queryY() {
            this.$emit('y');
        },
        queryN() {
            this.$emit('n');
        },
        update() {
            this.$parent.update()
        }
    }
});

var vm = new Vue({
    el: '#app',
    methods: {
        getlocation: function (obj) {
            if (this.flag == 1) {
                vm.genTask.startX=obj.x;
                vm.genTask.startY=obj.y;
                vm.genTask.startZ=obj.z;
                this.q.startNode = "(" + obj.x + "," + obj.y + "," + obj.z + ")";
            } else if (this.flag == 2) {
                vm.genTask.endX=obj.x;
                vm.genTask.endY=obj.y;
                vm.genTask.endZ=obj.z;
                this.q.endNode = "(" + obj.x + "," + obj.y + "," + obj.z + ")";
            }
        },
        toStartNode: function () {
            this.flag = 1;
        },
        toEndNode: function () {
            this.flag = 2;
        },
        generateTask: function () {
            $.ajax({
                type: "POST",
                url: baseURL + "storage/generateTask",
                contentType: "application/json",
                data: JSON.stringify(vm.genTask),
                success: function (r) {
                    if (r.code === 0) {
                        alert('生成任务成功');
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        hideLayer:function(){
            $('#layer').hide();
        },
        hover: function (obj) {
            for (let i = 0; i <vm.storageStatusList.length; i++) {
                if(obj.status === vm.storageStatusList[i].sign){
                    vm.q.storageStatusDescribe=vm.storageStatusList[i].describe;
                }
            }
            for (let i = 0; i <vm.storageTypeList.length; i++) {
                if(obj.storageType === vm.storageTypeList[i].sign){
                    vm.q.storageTypeDescribe=vm.storageTypeList[i].describe;
                }
            }
            vm.storage =obj;
            vm.message = "货位编号" + ':' + vm.storage.storageId + '\n' + "坐标" + ':' + '(' + vm.storage.x + ',' + vm.storage.y + ',' + vm.storage.z + ')' + '\n'
                + "货位类型" + ':' + vm.q.storageTypeDescribe +'\n'+ "货位状态" + ':' + vm.q.storageStatusDescribe + '\n' + "锁标识" + ':'
                + vm.storage.lockMark+ '\n'+"托盘号:" + vm.storage.palletId;
            $("td").contextMenu({
                target: function(ele) { // 当前元素--jq对象
                    $('#layer').show();
                },

                menu: [{ // 菜单项
                    text: "编辑货位类型",

                    callback: function () {

                        vm.isHide = !vm.isHide;
                        $('.box').show();
                    }
                },
                    {
                        text: "标记为缓存位",
                        callback: function () {
                            if(obj.storageType == 'storage'){
                                $.ajax({
                                    type: "POST",
                                    url: baseURL + "storage/updateCache",
                                    contentType: "application/json",
                                    data: JSON.stringify(obj),
                                    success: function (r) {
                                        if (r.code === 0) {
                                            alert('标记成功');
                                        } else {
                                            alert(r.msg);
                                        }
                                    }
                                });
                            }

                        }
                    },

                    {
                        text: "标记为有货",
                        callback: function () {
                            obj.status = 'exist';
                            $.ajax({
                                type: "POST",
                                url: baseURL + "storage/update",
                                contentType: "application/json",
                                data: JSON.stringify(obj),
                                success: function (r) {
                                    if (r.code === 0) {
                                        alert('标记成功');
                                    } else {
                                        alert(r.msg);
                                    }
                                }
                            });
                        }

                    },
                    {
                        text: "标记为无货",
                        callback: function () {
                            obj.status = 'empty';
                            $.ajax({
                                type: "POST",
                                url: baseURL + "storage/update",
                                contentType: "application/json",
                                data: JSON.stringify(obj),
                                success: function (r) {
                                    if (r.code === 0) {
                                        alert('标记成功');
                                    } else {
                                        alert(r.msg);
                                    }
                                }
                            });
                        }
                    },
                    {
                        text: "释放锁资源",
                        callback: function () {
                            confirm('确定要释放该小车的锁资源？', function () {
                                $.ajax({
                                    type: "POST",
                                    url: baseURL + "monitor/releaseLockResource",
                                    contentType: "application/json",
                                    data: JSON.stringify(obj),
                                    success: function (r) {
                                        if (r.code === 0) {
                                            alert('当前小车锁资源已释放');
                                        } else {
                                            alert(r.msg);
                                        }
                                    }
                                });
                            });
                        }
                    },
                    {
                        text: "释放运行中资源",
                        callback: function () {
                            confirm('确定要释放该小车的路径资源？', function () {
                                $.ajax({
                                    type: "POST",
                                    url: baseURL + "monitor/releaseRunResourceById",
                                    contentType: "application/json",
                                    data: JSON.stringify(obj),
                                    success: function (r) {
                                        if (r.code === 0) {
                                            alert('当前小车路径资源已释放');
                                        } else {
                                            alert(r.msg);
                                        }
                                    }
                                });
                            });
                        }
                    }
                ]
            });
        },
        confirm() {
            this.isHide = !this.isHide;
            $('.box').hide();
            $('#layer').hide();
        },
        cancel() {
            this.isHide = !this.isHide;
            $('.box').hide();
            $('#layer').hide();
        },
        update: function () {
            var url = "storage/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.storage),
                success: function (r) {
                    if (r.code === 0) {
                        alert('操作成功');
                    } else {
                        alert(r.msg);
                    }
                }
            });
        },
        clear:function(){
            vm.q.startNode=null;
            vm.q.endNode=null;
            vm.genTask.materialGrade=null;
            vm.genTask.palletId=null;
        },
        getCarPositionCss:function(){
            $("table tr td").removeClass('active1');
            $(".carIds").remove();
            for(let i=0;i< vm.devices.length;i++) {
                // $("table tr:eq(" + (vm.devices[i].x) + ") td:nth-child(" + (vm.devices[i].y + 1) + ")").addClass('active1');
                $("table tr:eq(" + (vm.devices[i].x) + ") td:nth-child(" + (vm.devices[i].y + 1) + ")").prepend(
                    "<div class='carIds active1' style='height: 25px;width:25px;color:white;background:yellow;border-radius: 10px;text-align:center;vertical-align:middle;'><span style='text-align:center;color:red;vertical-align:middle;'>" + (vm.devices[i].deviceId) + "</span></div>");
            }
        },
        getAllFloors:function(){
            $.get(baseURL+"storage/getAllFloors",function (r) {
                vm.floorList=r.floors;
            });
        },
        getAllDevices:function(n){
            $.get(baseURL+"shuttleCar/getAllDevices/"+n,function (r) {
                vm.devices=r.list;
                vm.getCarPositionCss();
            });
        },
        getAllFloorsDevices:function(){
            $.get(baseURL+"shuttleCar/getAllFloorsDevices/",function (r) {
                vm.devicesAllFloors=r.list;
            });
        },
        getStorageStatus:function(){
            $.get(baseURL+"storage/getStorageStatus",function (r) {
                vm.storageStatusList = r.list
            });
        },
        getStorageType:function(){
            $.get(baseURL+"storage/getStorageType",function (r) {
                vm.storageTypeList = r.list
            });
        },
        initTable:function () {
            axios
                .get('//monitor/getMap/'+vm.q.floor)
                .then(response => (this.info = response.data.storageInfos))
                .catch(function (error) {
                    console.log(error);
                });
            axios
                .get(baseURL+"shuttleCar/getAllDevices/"+vm.q.floor)
                .then(response => (vm.devices = response.data.list))
                .then(vm.getCarPositionCss())
                .catch(function (error) {
                    console.log(error);
                });
        }
    },

    data() {
        return {
            info: null,
            q: {
                startNode: null,
                endNode: null,
                storageStatusDescribe:null,
                storageTypeDescribe:null,
                floor:1
            },
            flag: 0,
            typeList: [
                // {"value": "10", "label": "入库"},
                // {"value": "20", "label": "出库"},
                {"value": "move", "label": "移库"},
                // {"value": "3", "label": "充电"},
                {"value": "shunt", "label": "调车"},
            ],
            devices:{},
            devicesAllFloors:{},
            floorList:[],
            floors:null,
            storage: {},
            message: '',
            selected: '',
            isHide: true,
            lock:null,
            style1:false,
            storageStatusList:null,
            storageTypeList:null,
            genTask:{
                startX:null,
                startY:null,
                startZ:null,
                endX:null,
                endY:null,
                endZ:null,
                taskType:'4',
                deviceId:null,
                palletId:null,
                materialGrade:null
            }
        }
    },
    mounted() {
        axios
            .get("//monitor/getMap/1")
            .then(response => (this.info = response.data.storageInfos))
            .catch(function (error) {
                console.log(error);
            });
    },
});
 // 动态刷新
setInterval(function () {
    if (window.sessionStorage.getItem("monitorRefreshFlag") === "货位监控") {
        vm.initTable();
    }
}, 1000 * 1);

