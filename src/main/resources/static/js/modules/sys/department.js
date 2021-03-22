var setting = {
    data: {
        simpleData: {
            enable: true,
            idKey: "departmentId",
            pIdKey: "parentId",
            rootPId: -1
        },
        key: {
            url: "nourl",
            name: "departmentName"
        }
    }
};
var ztree;

var vm = new Vue({
    el: '#honghu_cloud',
    data: {
        showList: true,
        title: null,
        menu: {
            departmentName: null,
            departmentId: null,
            parentName: null,
            parentId: 0,
            departmentLevel: 1,
            displayOrder: 0
        },
        menuNameFlag: true,
        displayOrderFlag: true,
        parentIdFlag: true
    },
    methods: {
        getDepartment: function () {
            //加载菜单树
            $.get(baseURL + "department/select", function (r) {
                ztree = $.fn.zTree.init($("#departmentTree"), setting, r.departmentList);
                var node = ztree.getNodeByParam("departmentId", vm.menu.parentId);
                ztree.selectNode(node);
                // console.log("node.departmentName:" + node.departmentName);
                vm.menu.parentName = node.departmentName;
            })
        },
        add: function () {
            vm.showList = false;
            vm.title = "新增";
            vm.menu = {parentName: null, parentId: 0, departmentLevel: 1, displayOrder: 0};
            vm.getDepartment();
        },
        update: function () {
            var departmentId = getDepartmentId();
            if (departmentId == null) {
                return;
            }
            $.get(baseURL + "department/info/" + departmentId, function (r) {
                vm.showList = false;
                vm.title = "修改";
                vm.menu = r.department;
                vm.getDepartment();
            });
        },
        del: function () {
            var departmentId = getDepartmentId();
            if (departmentId == null) {
                return;
            }
            confirm('确定要删除选中的记录？', function () {
                $.ajax({
                    type: "POST",
                    url: baseURL + "department/delete",
                    data: "departmentId=" + departmentId,
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
        saveOrUpdate: function (event) {
            if (vm.menu.departmentName == null || vm.menu.departmentName === "") {
                vm.menuNameFlag = false;
                return;
            }else{
                vm.menuNameFlag = true;
            }
            let reg = /^[0-9]\d*$/;
            let result = reg.test(vm.menu.displayOrder);
            if (!Boolean(result) || vm.menu.displayOrder == null || vm.menu.displayOrder === "") {
                vm.displayOrderFlag = false;
                return;
            }
            if (vm.menu.parentName == null) {
                vm.parentIdFlag = false;
                return;
            } else {
                vm.parentIdFlag = true;
            }
            var url = vm.menu.menuId == null ? "department/save" : "department/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.menu),
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
        },
        departmentTree: function () {
            layer.open({
                type: 1,
                offset: '50px',
                skin: 'layui-layer-molv',
                title: "选择菜单",
                area: ['300px', '450px'],
                shade: 0,
                shadeClose: false,
                content: jQuery("#departmentLayer"),
                btn: ['确定', '取消'],
                btn1: function (index) {
                    var node = ztree.getSelectedNodes();
                    //选择上级菜单
                    console.log('node:' + node[0].departmentName);
                    vm.menu.parentId = node[0].departmentId;
                    vm.menu.departmentLevel = node[0].departmentLevel + 1;
                    vm.menu.parentName = node[0].departmentName;
                    layer.close(index);
                }
            });
        },
        //输入信息非空验证及正则验证。
        regex: function (msg) {
            let result = false;
            let reg = '';
            console.log(msg);
            if (msg === 'menuName') {
                console.log(msg);
                if (vm.menu.menuName == null || vm.menu.menuName === "") {
                    vm.menuNameFlag = false;
                } else {
                    vm.menuNameFlag = true;
                }
            } else if (msg === 'displayOrder') {
                reg = /^[0-9]\d*$/;
                result = reg.test(vm.menu.displayOrder);
                if (!Boolean(result) || vm.menu.displayOrder == null || vm.menu.displayOrder === "") {
                    vm.displayOrderFlag = false;
                } else {
                    vm.displayOrderFlag = true;
                }
            }
        },
        reload: function () {
            vm.showList = true;
            Menu.table.refresh();
            vm.refresh();
        },
        refresh: function () {
            vm.menuNameFlag = true;
            vm.displayOrderFlag = true;
        }
    }
});


var Menu = {
    id: "menuTable",
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Menu.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '部门ID', field: 'departmentId', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '部门名称', field: 'departmentName', align: 'center', valign: 'middle', sortable: true, width: '140px'},
        {title: '部门级别', field: 'departmentLevel', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '根节点编号', field: 'rootId', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '父节点编号', field: 'parentId', align: 'center', valign: 'middle', sortable: true, width: '100px'},
        {title: '显示顺序', field: 'displayOrder', align: 'center', valign: 'middle', sortable: true}]
    return columns;
};


function getDepartmentId() {
    var selected = $('#menuTable').bootstrapTreeTable('getSelections');
    if (selected.length == 0) {
        alert("请选择一条记录");
        return false;
    } else {
        return selected[0].id;
    }
}


$(function () {
    var colunms = Menu.initColumn();
    var table = new TreeTable(Menu.id, baseURL + "department/list", colunms);
    table.setExpandColumn(2);
    table.setIdField("departmentId");
    table.setCodeField("departmentId");
    table.setParentCodeField("parentId");
    table.setExpandAll(false);
    table.init();
    Menu.table = table;
});
