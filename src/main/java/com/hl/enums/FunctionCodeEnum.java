package com.hl.enums;

/**
 * @author xs
 * @date 2020/12/04 23:57
 */
public enum FunctionCodeEnum {
    _2F("2F", "链路维持报", false, false),
    _30("30", "测试报", true, false),
    _31("31", "均匀时段水文信息报", true, false),
    _32("32", "遥测站定时报", true, false),
    _33("33", "遥测站加报报", true, false),
    _34("34", "遥测站小时报", true, false),
    _35("35", "遥测站人工置数报", true, false),
    _36("36", "遥测站图片报或中心站查询遥测站图片采集信息", true, false),
    //主动
    _37("37", "中心站查询遥测站实时数据", true, true),
    //主动
    _38("38", "中心站查询遥测站时段数据", true, true),
    //主动
    _39("39", "中心站查询遥测站人工置数", true, true),
    //主动
    _3A("3A", "中心站查询遥测站指定要素实时数据", true, true),
    //主动
    _40("40", "中心站修改遥测站基本配置表", true, true),
    //主动
    _41("41", "中心站读取遥测站基本配置表/遥测站自报基本配置表", true, true),
    //主动
    _42("42", "中心站修改遥测站运行参数配置表", true, true),
    //主动
    _43("43", "中心站读取遥测站运行参数配置表/遥测站自报运行参数配置表", true, true),
    //主动
    _44("44", "查询水泵电机实时工作数据", true, true),
    //主动
    _45("45", "查询遥测终端软件版本", true, true),
    //主动
    _46("46", "查询遥测站状态和报警信息", true, true),
    //主动
    _47("47", "初始化固态存储数据", true, true),
    //主动
    _48("48", "恢复终端出厂设置", true, true),
    //主动
    _49("49", "修改密码", true, true),
    //主动
    _4A("4A", "设置遥测站时钟", true, true),
    //主动
    _4B("4B", "设置遥测终端 IC 卡状态", true, true),
    //主动
    _4C("4C", "控制水泵开关命令/水泵状态信息自报", true, true),
    //主动
    _4D("4D", "控制阀门开关命令/阀门状态信息自报", true, true),
    //主动
    _4E("4E", "控制闸门开关命令/闸门状态信息自报", true, true),
    //主动
    _4F("4F", "水量定值控制命令", true, true),
    //主动
    _50("50", "中心站查询遥测站事件记录", true, true),
    //主动
    _51("51", "中心站查询遥测站时钟", true, true);

    /**
     * 功能码
     */
    private String functionCode;

    /**
     * 描述
     */
    private String describe;

    /**
     * 是否存在下行报文
     */
    private boolean haveDown;

    /**
     * 是否为主动下行
     */
    private boolean initiativeDown;

    public String getFunctionCode() {
        return functionCode;
    }

    public void setFunctionCode(String functionCode) {
        this.functionCode = functionCode;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public boolean isHaveDown() {
        return haveDown;
    }

    public void setHaveDown(boolean haveDown) {
        this.haveDown = haveDown;
    }

    public boolean isInitiativeDown() {
        return initiativeDown;
    }

    public void setInitiativeDown(boolean initiativeDown) {
        this.initiativeDown = initiativeDown;
    }

    FunctionCodeEnum(String functionCode, String describe, boolean haveDown,boolean initiativeDown) {
        this.functionCode = functionCode;
        this.describe = describe;
        this.haveDown = haveDown;
        this.initiativeDown = initiativeDown;
    }

    public static FunctionCodeEnum getEnumByObj(Object object) {
        for (FunctionCodeEnum functionCodeEnum : FunctionCodeEnum.values()) {
            if (functionCodeEnum.getFunctionCode().equals(object)
                    || functionCodeEnum.getDescribe().equals(object)) {
                return functionCodeEnum;
            }
        }
        throw new IllegalArgumentException("不存在成员为：" + object + "的 FunctionCodeEnum 枚举对象");
    }

}
