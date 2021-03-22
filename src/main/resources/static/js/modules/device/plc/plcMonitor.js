
$(function () {

    $("#jqGridc").jqGrid({
        url: baseURL + 'plcMonitor/conveyorForView',
        datatype: "json",
        colModel: [
            {
                width: 60, formatter: function (value, row, index) {
                    if (index.rankOne.id === "0"||index.rankOne.id === 0) {
                        return "";
                    } else {
                        var str="";
                        str=str+'<div class="view-device-td-c ">'+'<div class="view-device-td-image-c" style="height:140px;"> </div>';
                      if(index.rankOne.id!==""&&index.rankOne.id!==null){
                        str=str+'<div  class="view-span-left">' +"工位号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.id + '</div>';
                      }
                       if(index.rankOne.swiftNum!==""&&index.rankOne.swiftNum!==null){
                        str=str+'<div  class="view-span-left">' +"流水号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.swiftNum + '</div>';
                       }
                        if(index.rankOne.taskAttr!==""&&index.rankOne.taskAttr!==null){
                            str=str+'<div  class="view-span-left">' +"任务属性:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.taskAttr + '</div>';
                        }
                        if(index.rankOne.gooSta!==""&&index.rankOne.gooSta!==null){
                            str=str+'<div  class="view-span-left">' +"货物状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.gooSta + '</div>';
                        }
                        if(index.rankOne.ready!==""&&index.rankOne.ready!==null){
                            str=str+'<div  class="view-span-left">' +"就绪:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.ready + '</div>';
                        }
                        if(index.rankOne.inApFor!==""&&index.rankOne.inApFor!==null){
                            str=str+'<div  class="view-span-left">' +"入库申请:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.inApFor + '</div>';
                        }
                        if(index.rankOne.desti!==""&&index.rankOne.desti!==null){
                            str=str+'<div  class="view-span-left">' +"目标位置:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.desti + '</div>';
                        }
                        if(index.rankOne.warMess!==""&&index.rankOne.warMess!==null){
                            str=str+'<div  class="view-span-left">' +"报警信息:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.warMess + '</div>';
                        }
                        if(index.rankOne.leftContour!==""&&index.rankOne.leftContour!==null){
                            str=str+'<div  class="view-span-left">' +"左侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.leftContour + '</div>';
                        }
                        if(index.rankOne.leftInApFor!==""&&index.rankOne.leftInApFor!==null){
                            str=str+'<div  class="view-span-left">' +"申请wcs读左入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.leftInApFor + '</div>';
                        }
                        if(index.rankOne.topContour!==""&&index.rankOne.topContour!==null){
                            str=str+'<div  class="view-span-left">' +"上侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.topContour + '</div>';
                        }
                        if(index.rankOne.topInApFor!==""&&index.rankOne.topInApFor!==null){
                            str=str+'<div  class="view-span-left">' +"申请wcs读上入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.topInApFor + '</div>';
                        }
                        if(index.rankOne.contour!==""&&index.rankOne.contour!==null){
                            str=str+'<div  class="view-span-left">' +"外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.contour + '</div>';
                        }
                        if(index.rankOne.apFor!==""&&index.rankOne.apFor!==null){
                            str=str+'<div  class="view-span-left">' +"申请wcs读数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.apFor + '</div>';
                        }
                        if(index.rankOne.inputOpen!==""&&index.rankOne.inputOpen!==null){
                            str=str+'<div  class="view-span-left">' +"入库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.inputOpen + '</div>';
                        }
                        if(index.rankOne.outOpen!==""&&index.rankOne.outOpen!==null){
                            str=str+'<div  class="view-span-left">' +"出库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.outOpen + '</div>';
                        }
                        if(index.rankOne.toReturn!==""&&index.rankOne.toReturn!==null){
                            str=str+'<div  class="view-span-left">' +"是否退回:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.toReturn + '</div>';
                        }
                        if(index.rankOne.hoiLayer!==""&&index.rankOne.hoiLayer!==null){
                            str=str+'<div  class="view-span-left">' +"提升机当前层:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.hoiLayer + '</div>';
                        }
                        if(index.rankOne.layArrive!==""&&index.rankOne.layArrive!==null){
                            str=str+'<div  class="view-span-left">' +"层到位:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.layArrive + '</div>';
                        }
                        if(index.rankOne.pickStatus!==""&&index.rankOne.pickStatus!==null){
                            str=str+'<div  class="view-span-left">' +"取货状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.pickStatus + '</div>';
                        }
                        if(index.rankOne.pickComp!==""&&index.rankOne.pickComp!==null){
                            str=str+'<div  class="view-span-left">' +"取货完成:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.pickComp + '</div>';
                        }
                        return str+ '</div>';
                    }
                }
            },
            {
                width: 60, formatter: function (value, row, index) {
                    if (index.rankTwo.id === 0||index.rankTwo.id === "0") {
                        return "";
                    } else {
                      var str="";
                      str=str+'<div class="view-device-td-c ">'+'<div class="view-device-td-image-c" style="height:140px;"> </div>';
                      if(index.rankTwo.id!==""&&index.rankTwo.id!==null){
                        str=str+'<div  class="view-span-left">' +"工位号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.id + '</div>';
                      }
                      if(index.rankTwo.swiftNum!==""&&index.rankTwo.swiftNum!==null){
                        str=str+'<div  class="view-span-left">' +"流水号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.swiftNum + '</div>';
                      }
                      if(index.rankTwo.taskAttr!==""&&index.rankTwo.taskAttr!==null){
                        str=str+'<div  class="view-span-left">' +"任务属性:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.taskAttr + '</div>';
                      }
                      if(index.rankTwo.gooSta!==""&&index.rankTwo.gooSta!==null){
                        str=str+'<div  class="view-span-left">' +"货物状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.gooSta + '</div>';
                      }
                      if(index.rankTwo.ready!==""&&index.rankTwo.ready!==null){
                        str=str+'<div  class="view-span-left">' +"就绪:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.ready + '</div>';
                      }
                      if(index.rankTwo.inApFor!==""&&index.rankTwo.inApFor!==null){
                        str=str+'<div  class="view-span-left">' +"入库申请:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.inApFor + '</div>';
                      }
                      if(index.rankTwo.desti!==""&&index.rankTwo.desti!==null){
                        str=str+'<div  class="view-span-left">' +"目标位置:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.desti + '</div>';
                      }
                      if(index.rankTwo.warMess!==""&&index.rankTwo.warMess!==null){
                        str=str+'<div  class="view-span-left">' +"报警信息:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.warMess + '</div>';
                      }
                      if(index.rankTwo.leftContour!==""&&index.rankTwo.leftContour!==null){
                        str=str+'<div  class="view-span-left">' +"左侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.leftContour + '</div>';
                      }
                      if(index.rankTwo.leftInApFor!==""&&index.rankTwo.leftInApFor!==null){
                        str=str+'<div  class="view-span-left">' +"申请wcs读左入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.leftInApFor + '</div>';
                      }
                      if(index.rankTwo.topContour!==""&&index.rankTwo.topContour!==null){
                        str=str+'<div  class="view-span-left">' +"上侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.topContour + '</div>';
                      }
                      if(index.rankTwo.topInApFor!==""&&index.rankTwo.topInApFor!==null){
                        str=str+'<div  class="view-span-left">' +"申请wcs读上入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.topInApFor + '</div>';
                      }
                      if(index.rankTwo.contour!==""&&index.rankTwo.contour!==null){
                        str=str+'<div  class="view-span-left">' +"外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.contour + '</div>';
                      }
                      if(index.rankTwo.apFor!==""&&index.rankTwo.apFor!==null){
                        str=str+'<div  class="view-span-left">' +"申请wcs读数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.apFor + '</div>';
                      }
                      if(index.rankTwo.inputOpen!==""&&index.rankTwo.inputOpen!==null){
                        str=str+'<div  class="view-span-left">' +"入库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.inputOpen + '</div>';
                      }
                      if(index.rankTwo.outOpen!==""&&index.rankTwo.outOpen!==null){
                        str=str+'<div  class="view-span-left">' +"出库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.outOpen + '</div>';
                      }
                      if(index.rankTwo.toReturn!==""&&index.rankTwo.toReturn!==null){
                        str=str+'<div  class="view-span-left">' +"是否退回:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.toReturn + '</div>';
                      }
                      if(index.rankTwo.hoiLayer!==""&&index.rankTwo.hoiLayer!==null){
                        str=str+'<div  class="view-span-left">' +"提升机当前层:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.hoiLayer + '</div>';
                      }
                      if(index.rankTwo.layArrive!==""&&index.rankTwo.layArrive!==null){
                        str=str+'<div  class="view-span-left">' +"层到位:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.layArrive + '</div>';
                      }
                      if(index.rankTwo.pickStatus!==""&&index.rankTwo.pickStatus!==null){
                        str=str+'<div  class="view-span-left">' +"取货状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.pickStatus + '</div>';
                      }
                      if(index.rankTwo.pickComp!==""&&index.rankTwo.pickComp!==null){
                        str=str+'<div  class="view-span-left">' +"取货完成:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.pickComp + '</div>';
                      }
                      return str+ '</div>';
                    }
                }
            },
            {
            width: 60, formatter: function (value, row, index) {
              if (index.rankThree.id === 0||index.rankThree.id === "0") {
                return "";
              } else {
                var str="";
                str=str+'<div class="view-device-td-c ">'+'<div class="view-device-td-image-c" style="height:140px;"> </div>';
                if(index.rankThree.id!==""&&index.rankThree.id!==null){
                  str=str+'<div  class="view-span-left">' +"工位号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.id + '</div>';
                }
                if(index.rankThree.swiftNum!==""&&index.rankThree.swiftNum!==null){
                  str=str+'<div  class="view-span-left">' +"流水号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.swiftNum + '</div>';
                }
                if(index.rankThree.taskAttr!==""&&index.rankThree.taskAttr!==null){
                  str=str+'<div  class="view-span-left">' +"任务属性:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.taskAttr + '</div>';
                }
                if(index.rankThree.gooSta!==""&&index.rankThree.gooSta!==null){
                  str=str+'<div  class="view-span-left">' +"货物状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.gooSta + '</div>';
                }
                if(index.rankThree.ready!==""&&index.rankThree.ready!==null){
                  str=str+'<div  class="view-span-left">' +"就绪:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.ready + '</div>';
                }
                if(index.rankThree.inApFor!==""&&index.rankThree.inApFor!==null){
                  str=str+'<div  class="view-span-left">' +"入库申请:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.inApFor + '</div>';
                }
                if(index.rankThree.desti!==""&&index.rankThree.desti!==null){
                  str=str+'<div  class="view-span-left">' +"目标位置:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.desti + '</div>';
                }
                if(index.rankThree.warMess!==""&&index.rankThree.warMess!==null){
                  str=str+'<div  class="view-span-left">' +"报警信息:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.warMess + '</div>';
                }
                if(index.rankThree.leftContour!==""&&index.rankThree.leftContour!==null){
                  str=str+'<div  class="view-span-left">' +"左侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.leftContour + '</div>';
                }
                if(index.rankThree.leftInApFor!==""&&index.rankThree.leftInApFor!==null){
                  str=str+'<div  class="view-span-left">' +"申请wcs读左入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.leftInApFor + '</div>';
                }
                if(index.rankThree.topContour!==""&&index.rankThree.topContour!==null){
                  str=str+'<div  class="view-span-left">' +"上侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.topContour + '</div>';
                }
                if(index.rankThree.topInApFor!==""&&index.rankThree.topInApFor!==null){
                  str=str+'<div  class="view-span-left">' +"申请wcs读上入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.topInApFor + '</div>';
                }
                if(index.rankThree.contour!==""&&index.rankThree.contour!==null){
                  str=str+'<div  class="view-span-left">' +"外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.contour + '</div>';
                }
                if(index.rankThree.apFor!==""&&index.rankThree.apFor!==null){
                  str=str+'<div  class="view-span-left">' +"申请wcs读数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.apFor + '</div>';
                }
                if(index.rankThree.inputOpen!==""&&index.rankThree.inputOpen!==null){
                  str=str+'<div  class="view-span-left">' +"入库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.inputOpen + '</div>';
                }
                if(index.rankThree.outOpen!==""&&index.rankThree.outOpen!==null){
                  str=str+'<div  class="view-span-left">' +"出库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.outOpen + '</div>';
                }
                if(index.rankThree.toReturn!==""&&index.rankThree.toReturn!==null){
                  str=str+'<div  class="view-span-left">' +"是否退回:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.toReturn + '</div>';
                }
                if(index.rankThree.hoiLayer!==""&&index.rankThree.hoiLayer!==null){
                  str=str+'<div  class="view-span-left">' +"提升机当前层:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.hoiLayer + '</div>';
                }
                if(index.rankThree.layArrive!==""&&index.rankThree.layArrive!==null){
                  str=str+'<div  class="view-span-left">' +"层到位:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.layArrive + '</div>';
                }
                if(index.rankThree.pickStatus!==""&&index.rankThree.pickStatus!==null){
                  str=str+'<div  class="view-span-left">' +"取货状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.pickStatus + '</div>';
                }
                if(index.rankThree.pickComp!==""&&index.rankThree.pickComp!==null){
                  str=str+'<div  class="view-span-left">' +"取货完成:"+ '</div>'+ '<div  class="view-span-right">' + index.rankThree.pickComp + '</div>';
                }
                return str+ '</div>';
              }
            }
          },
            {
            width: 60, formatter: function (value, row, index) {
              if (index.rankFour.id === 0||index.rankFour.id === "0") {
                return "";
              } else {
                var str="";
                str=str+'<div class="view-device-td-c ">'+'<div class="view-device-td-image-c" style="height:140px;"> </div>';
                if(index.rankFour.id!==""&&index.rankFour.id!==null){
                  str=str+'<div  class="view-span-left">' +"工位号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.id + '</div>';
                }
                if(index.rankFour.swiftNum!==""&&index.rankFour.swiftNum!==null){
                  str=str+'<div  class="view-span-left">' +"流水号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.swiftNum + '</div>';
                }
                if(index.rankFour.taskAttr!==""&&index.rankFour.taskAttr!==null){
                  str=str+'<div  class="view-span-left">' +"任务属性:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.taskAttr + '</div>';
                }
                if(index.rankFour.gooSta!==""&&index.rankFour.gooSta!==null){
                  str=str+'<div  class="view-span-left">' +"货物状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.gooSta + '</div>';
                }
                if(index.rankFour.ready!==""&&index.rankFour.ready!==null){
                  str=str+'<div  class="view-span-left">' +"就绪:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.ready + '</div>';
                }
                if(index.rankFour.inApFor!==""&&index.rankFour.inApFor!==null){
                  str=str+'<div  class="view-span-left">' +"入库申请:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.inApFor + '</div>';
                }
                if(index.rankFour.desti!==""&&index.rankFour.desti!==null){
                  str=str+'<div  class="view-span-left">' +"目标位置:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.desti + '</div>';
                }
                if(index.rankFour.warMess!==""&&index.rankFour.warMess!==null){
                  str=str+'<div  class="view-span-left">' +"报警信息:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.warMess + '</div>';
                }
                if(index.rankFour.leftContour!==""&&index.rankFour.leftContour!==null){
                  str=str+'<div  class="view-span-left">' +"左侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.leftContour + '</div>';
                }
                if(index.rankFour.leftInApFor!==""&&index.rankFour.leftInApFor!==null){
                  str=str+'<div  class="view-span-left">' +"申请wcs读左入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.leftInApFor + '</div>';
                }
                if(index.rankFour.topContour!==""&&index.rankFour.topContour!==null){
                  str=str+'<div  class="view-span-left">' +"上侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.topContour + '</div>';
                }
                if(index.rankFour.topInApFor!==""&&index.rankFour.topInApFor!==null){
                  str=str+'<div  class="view-span-left">' +"申请wcs读上入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.topInApFor + '</div>';
                }
                if(index.rankFour.contour!==""&&index.rankFour.contour!==null){
                  str=str+'<div  class="view-span-left">' +"外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.contour + '</div>';
                }
                if(index.rankFour.apFor!==""&&index.rankFour.apFor!==null){
                  str=str+'<div  class="view-span-left">' +"申请wcs读数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.apFor + '</div>';
                }
                if(index.rankFour.inputOpen!==""&&index.rankFour.inputOpen!==null){
                  str=str+'<div  class="view-span-left">' +"入库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.inputOpen + '</div>';
                }
                if(index.rankFour.outOpen!==""&&index.rankFour.outOpen!==null){
                  str=str+'<div  class="view-span-left">' +"出库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.outOpen + '</div>';
                }
                if(index.rankFour.toReturn!==""&&index.rankFour.toReturn!==null){
                  str=str+'<div  class="view-span-left">' +"是否退回:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.toReturn + '</div>';
                }
                if(index.rankFour.hoiLayer!==""&&index.rankFour.hoiLayer!==null){
                  str=str+'<div  class="view-span-left">' +"提升机当前层:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.hoiLayer + '</div>';
                }
                if(index.rankFour.layArrive!==""&&index.rankFour.layArrive!==null){
                  str=str+'<div  class="view-span-left">' +"层到位:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.layArrive + '</div>';
                }
                if(index.rankFour.pickStatus!==""&&index.rankFour.pickStatus!==null){
                  str=str+'<div  class="view-span-left">' +"取货状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.pickStatus + '</div>';
                }
                if(index.rankFour.pickComp!==""&&index.rankFour.pickComp!==null){
                  str=str+'<div  class="view-span-left">' +"取货完成:"+ '</div>'+ '<div  class="view-span-right">' + index.rankFour.pickComp + '</div>';
                }
                return str+ '</div>';
              }
            }
          },
        ],
        height: 800,
        rowNum: 100,
        rowList: [8, 16, 32],
        rownumWidth: 25,
        autowidth: true,
        shrinkToFit: false,
        autoScroll: true,
        rownumbers: false,
        viewrecords: true,
        cellEdit: true,
        forceFit: true,
        loadui: "Disable",
        pager: "#jqGridPager",
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
        gridComplete: function () {
        },
    });
    $("#jqGridh").jqGrid({
    url: baseURL + 'plcMonitor/hoisterForView',
    datatype: "json",
    colModel: [
      {
        width: 60, formatter: function (value, row, index) {
          if (index.rankOne.id === "0"||index.rankOne.id === 0) {
            return "";
          } else {
            var str="";
            str=str+'<div class="view-device-td-h ">'+'<div class="view-device-td-image-h" style="height:140px;"> </div>';
            if(index.rankOne.id!==""&&index.rankOne.id!==null){
              str=str+'<div  class="view-span-left">' +"工位号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.id + '</div>';
            }
            if(index.rankOne.swiftNumHoi!==""&&index.rankOne.swiftNumHoi!==null){
              str=str+'<div  class="view-span-left">' +"任务流水号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.swiftNumHoi + '</div>';
            }
            if(index.rankOne.startSignHoi!==""&&index.rankOne.startSignHoi!==null){
              str=str+'<div  class="view-span-left">' +"开启信号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.startSignHoi + '</div>';
            }
            if(index.rankOne.resetSignHoi!==""&&index.rankOne.resetSignHoi!==null){
              str=str+'<div  class="view-span-left">' +"复位信号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.resetSignHoi + '</div>';
            }
            if(index.rankOne.taskAttrHoi!==""&&index.rankOne.taskAttrHoi!==null){
              str=str+'<div  class="view-span-left">' +"任务属性:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.taskAttrHoi + '</div>';
            }
            if(index.rankOne.leftRelHoi!==""&&index.rankOne.leftRelHoi!==null){
              str=str+'<div  class="view-span-left">' +"左侧允许放货:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.leftRelHoi + '</div>';
            }
            if(index.rankOne.rightRelHoi!==""&&index.rankOne.rightRelHoi!==null){
              str=str+'<div  class="view-span-left">' +"右侧允许放货:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.rightRelHoi + '</div>';
            }
            if(index.rankOne.pickZHoi!==""&&index.rankOne.pickZHoi!==null){
              str=str+'<div  class="view-span-left">' +"取货层:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.pickZHoi + '</div>';
            }
            if(index.rankOne.pickYHoi!==""&&index.rankOne.pickYHoi!==null){
              str=str+'<div  class="view-span-left">' +"取货排:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.pickYHoi + '</div>';
            }
            if(index.rankOne.relZHoi!==""&&index.rankOne.relZHoi!==null){
              str=str+'<div  class="view-span-left">' +"放货层:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.relZHoi + '</div>';
            }
            if(index.rankOne.relYHoi!==""&&index.rankOne.relYHoi!==null){
              str=str+'<div  class="view-span-left">' +"放货排:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.relYHoi + '</div>';
            }
            if(index.rankOne.carStatusHoi!==""&&index.rankOne.carStatusHoi!==null){
              str=str+'<div  class="view-span-left">' +"母车进出提升机状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.carStatusHoi + '</div>';
            }
            if(index.rankOne.chargeHoi!==""&&index.rankOne.chargeHoi!==null){
              str=str+'<div  class="view-span-left">' +"母车充电开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.chargeHoi + '</div>';
            }
            if(index.rankOne.fbSwiftNumHoi!==""&&index.rankOne.fbSwiftNumHoi!==null){
              str=str+'<div  class="view-span-left">' +"反馈完成流水号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.fbSwiftNumHoi + '</div>';
            }
            if(index.rankOne.linkStatusHoi!==""&&index.rankOne.linkStatusHoi!==null){
              str=str+'<div  class="view-span-left">' +"联机状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.linkStatusHoi + '</div>';
            }
            if(index.rankOne.readyHoi!==""&&index.rankOne.readyHoi!==null){
              str=str+'<div  class="view-span-left">' +"就绪:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.readyHoi + '</div>';
            }
            if(index.rankOne.taskAttrBackHoi!==""&&index.rankOne.taskAttrBackHoi!==null){
              str=str+'<div  class="view-span-left">' +"任务属性:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.taskAttrBackHoi + '</div>';
            }
            if(index.rankOne.currLayerHoi!==""&&index.rankOne.currLayerHoi!==null){
              str=str+'<div  class="view-span-left">' +"当前层:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.currLayerHoi + '</div>';
            }
            if(index.rankOne.runStatusHoi!==""&&index.rankOne.runStatusHoi!==null){
              str=str+'<div  class="view-span-left">' +"运行状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.runStatusHoi + '</div>';
            }
            if(index.rankOne.havaCargoCarHoi!==""&&index.rankOne.havaCargoCarHoi!==null){
              str=str+'<div  class="view-span-left">' +"有无货/车:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.havaCargoCarHoi + '</div>';
            }
            if(index.rankOne.tarLayerSignHoi!==""&&index.rankOne.tarLayerSignHoi!==null){
              str=str+'<div  class="view-span-left">' +"目标层到位信号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.tarLayerSignHoi + '</div>';
            }
            if(index.rankOne.errorStatusHoi!==""&&index.rankOne.errorStatusHoi!==null){
              str=str+'<div  class="view-span-left">' +"故障状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.errorStatusHoi + '</div>';
            }
            if(index.rankOne.seneorStatusHoi!==""&&index.rankOne.seneorStatusHoi!==null){
              str=str+'<div  class="view-span-left">' +"传感器状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.seneorStatusHoi + '</div>';
            }
            if(index.rankOne.pickRelStatusHoi!==""&&index.rankOne.pickRelStatusHoi!==null){
              str=str+'<div  class="view-span-left">' +"取放货/车完成状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankOne.pickRelStatusHoi + '</div>';
            }
            return str+ '</div>';
          }
        }
      },
      {
        width: 60, formatter: function (value, row, index) {
          if (index.rankTwo.id === 0||index.rankTwo.id === "0") {
            return "";
          } else {
            var str="";
            str=str+'<div class="view-device-td-c ">'+'<div class="view-device-td-image-h" style="height:140px;"> </div>';
            if(index.rankTwo.id!==""&&index.rankTwo.id!==null){
              str=str+'<div  class="view-span-left">' +"工位号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.id + '</div>';
            }
            if(index.rankTwo.swiftNum!==""&&index.rankTwo.swiftNum!==null){
              str=str+'<div  class="view-span-left">' +"流水号:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.swiftNum + '</div>';
            }
            if(index.rankTwo.taskAttr!==""&&index.rankTwo.taskAttr!==null){
              str=str+'<div  class="view-span-left">' +"任务属性:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.taskAttr + '</div>';
            }
            if(index.rankTwo.gooSta!==""&&index.rankTwo.gooSta!==null){
              str=str+'<div  class="view-span-left">' +"货物状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.gooSta + '</div>';
            }
            if(index.rankTwo.ready!==""&&index.rankTwo.ready!==null){
              str=str+'<div  class="view-span-left">' +"就绪:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.ready + '</div>';
            }
            if(index.rankTwo.inApFor!==""&&index.rankTwo.inApFor!==null){
              str=str+'<div  class="view-span-left">' +"入库申请:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.inApFor + '</div>';
            }
            if(index.rankTwo.desti!==""&&index.rankTwo.desti!==null){
              str=str+'<div  class="view-span-left">' +"目标位置:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.desti + '</div>';
            }
            if(index.rankTwo.warMess!==""&&index.rankTwo.warMess!==null){
              str=str+'<div  class="view-span-left">' +"报警信息:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.warMess + '</div>';
            }
            if(index.rankTwo.leftContour!==""&&index.rankTwo.leftContour!==null){
              str=str+'<div  class="view-span-left">' +"左侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.leftContour + '</div>';
            }
            if(index.rankTwo.leftInApFor!==""&&index.rankTwo.leftInApFor!==null){
              str=str+'<div  class="view-span-left">' +"申请wcs读左入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.leftInApFor + '</div>';
            }
            if(index.rankTwo.topContour!==""&&index.rankTwo.topContour!==null){
              str=str+'<div  class="view-span-left">' +"上侧外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.topContour + '</div>';
            }
            if(index.rankTwo.topInApFor!==""&&index.rankTwo.topInApFor!==null){
              str=str+'<div  class="view-span-left">' +"申请wcs读上入库数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.topInApFor + '</div>';
            }
            if(index.rankTwo.contour!==""&&index.rankTwo.contour!==null){
              str=str+'<div  class="view-span-left">' +"外形检测结果:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.contour + '</div>';
            }
            if(index.rankTwo.apFor!==""&&index.rankTwo.apFor!==null){
              str=str+'<div  class="view-span-left">' +"申请wcs读数据:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.apFor + '</div>';
            }
            if(index.rankTwo.inputOpen!==""&&index.rankTwo.inputOpen!==null){
              str=str+'<div  class="view-span-left">' +"入库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.inputOpen + '</div>';
            }
            if(index.rankTwo.outOpen!==""&&index.rankTwo.outOpen!==null){
              str=str+'<div  class="view-span-left">' +"出库开启:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.outOpen + '</div>';
            }
            if(index.rankTwo.toReturn!==""&&index.rankTwo.toReturn!==null){
              str=str+'<div  class="view-span-left">' +"是否退回:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.toReturn + '</div>';
            }
            if(index.rankTwo.hoiLayer!==""&&index.rankTwo.hoiLayer!==null){
              str=str+'<div  class="view-span-left">' +"提升机当前层:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.hoiLayer + '</div>';
            }
            if(index.rankTwo.layArrive!==""&&index.rankTwo.layArrive!==null){
              str=str+'<div  class="view-span-left">' +"层到位:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.layArrive + '</div>';
            }
            if(index.rankTwo.pickStatus!==""&&index.rankTwo.pickStatus!==null){
              str=str+'<div  class="view-span-left">' +"取货状态:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.pickStatus + '</div>';
            }
            if(index.rankTwo.pickComp!==""&&index.rankTwo.pickComp!==null){
              str=str+'<div  class="view-span-left">' +"取货完成:"+ '</div>'+ '<div  class="view-span-right">' + index.rankTwo.pickComp + '</div>';
            }
            return str+ '</div>';
          }
        }
      },
    ],
    height: 800,
    rowNum: 100,
    rowList: [8, 16, 32],
    rownumWidth: 25,
    autowidth: true,
    shrinkToFit: false,
    autoScroll: true,
    rownumbers: false,
    viewrecords: true,
    cellEdit: true,
    forceFit: true,
    loadui: "Disable",
    pager: "#jqGridPager",
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
    gridComplete: function () {
    },
  });
    $('.ui-jqgrid-hdiv').hide();
    $('.jqgfirstrow').hide();
    $('#load_jqGrid').hide();

    $('#load_jqGrid').css({"display": "none"});
    $('.ui-jqgrid-bdiv').css({"height": "600px"});
    $('.ui-jqgrid-bdiv').css({"width": "1226px"});
    $('#jqGrid').css({"width": "100%"});
});

var vm = new Vue({
    el: '#app',
    data() {
        return {
            q: {
              deviceType: "1",
            },
        }
    },
    methods: {
      refreshView: function () {
        if (vm.q.deviceType === 1) {
          $(".view-c").show();
          $(".view-h").show();
          vm.refreshHForView();
          vm.refreshCForView();
        } else if (vm.q.deviceType === 2) {
          $(".view-h").hide();
          $(".view-c").show();
          vm.refreshCForView();
        } else if (vm.q.deviceType === 3) {
          $(".view-h").show();
          $(".view-c").hide();
          vm.refreshHForView();
        }
      },

      refreshCForView: function () {
        var page = $("#jqGridc").jqGrid('getGridParam', 'page');
        $("#jqGridc").jqGrid('setGridParam', {
          page: page
        }).trigger("reloadGrid");
      },

      refreshHForView: function () {
        var page = $("#jqGridh").jqGrid('getGridParam', 'page');
        $("#jqGridh").jqGrid('setGridParam', {
          page: page
        }).trigger("reloadGrid");
      },

        query: function () {
            vm.reload();
        },
        reload: function () {
          vm.refreshView();
        },
    },
});



