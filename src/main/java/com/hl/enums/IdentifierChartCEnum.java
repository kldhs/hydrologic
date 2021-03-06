package com.hl.enums;

/**
 * @author xs
 * @date 2020/11/27 15:08
 * 表C 编码要素及标识符汇总表
 */
public enum IdentifierChartCEnum {
    F0("F0", "TT", "0", "N(10)", "观测时间引导符"),
    F1("F1", "TT", "0", "N(10)", "测站编码引导符"),
    F2("F2", "TT", "0", "N(10)", "人工置数"),
    F3("F3", "TT", "0", "N(10)", "图片信息"),
    F4("F4", "TT", "0", "N(10)", "1小时内每5分钟时段雨量"),
    F5("F5", "TT", "0", "N(10)", "1小时内5分钟间隔相对水位1"),
    F6("F6", "TT", "0", "N(10)", "1小时内5分钟间隔相对水位2"),
    F7("F7", "TT", "0", "N(10)", "1小时内5分钟间隔相对水位3"),
    F8("F8", "TT", "0", "N(10)", "1小时内5分钟间隔相对水位4"),
    F9("F9", "TT", "0", "N(10)", "1小时内5分钟间隔相对水位5"),
    FA("FA", "TT", "0", "N(10)", "1小时内5分钟间隔相对水位6"),
    FB("FB", "TT", "0", "N(10)", "1小时内5分钟间隔相对水位7"),
    FC("FC", "TT", "0", "N(10)", "1小时内5分钟间隔相对水位8"),
    FD("FD", "TT", "0", "N(10)", "流速批量数据传输"),
    _01("01", "TT", "0", "N(10)", "断面面积"),
    _02("02", "TT", "0", "N(10)", "瞬时气温"),
    _03("03", "TT", "0", "N(10)", "瞬时水温"),
    _04("04", "TT", "0", "N(10)", "时间步长码"),
    _05("05", "TT", "0", "N(10)", "时段长,降水、引排水、抽水历时"),
    _06("06", "TT", "0", "N(10)", "日蒸发量"),
    _07("07", "TT", "0", "N(10)", "当前蒸发"),
    _08("08", "TT", "0", "N(10)", "气压"),
    _09("09", "TT", "0", "N(10)", "闸坝、水库闸门开启高度"),
    _0A("0A", "TT", "0", "N(10)", "输水设备、闸门(组)编号"),
    _0B("0B", "TT", "0", "N(10)", "输水设备类别"),
    _0C("0C", "TT", "0", "N(10)", "水库、闸坝闸门开启孔数"),
    _0D("0D", "TT", "0", "N(10)", "地温"),
    _0E("0E", "TT", "0", "N(10)", "地下水瞬时埋深"),
    _0F("0F", "TT", "0", "N(10)", "波浪高度"),
    _10("10", "TT", "0", "N(10)", "10厘米处土壤含水量"),
    _11("11", "TT", "0", "N(10)", "20厘米处土壤含水量"),
    _12("12", "TT", "0", "N(10)", "30厘米处土壤含水量"),
    _13("13", "TT", "0", "N(10)", "40厘米处土壤含水量"),
    _14("14", "TT", "0", "N(10)", "50厘米处土壤含水量"),
    _15("15", "TT", "0", "N(10)", "60厘米处土壤含水量"),
    _16("16", "TT", "0", "N(10)", "80厘米处土壤含水量"),
    _17("17", "TT", "0", "N(10)", "100厘米处土壤含水量"),
    _18("18", "TT", "0", "N(10)", "湿度"),
    _19("19", "TT", "0", "N(10)", "开机台数"),
    _1A("1A", "TT", "0", "N(10)", "1小时时段降水量"),
    _1B("1B", "TT", "0", "N(10)", "2小时时段降水量"),
    _1C("1C", "TT", "0", "N(10)", "3小时时段降水量"),
    _1D("1D", "TT", "0", "N(10)", "6小时时段降水量"),
    _1E("1E", "TT", "0", "N(10)", "12小时时段降水量"),
    _1F("1F", "TT", "0", "N(10)", "日降水量"),
    _20("20", "TT", "0", "N(10)", "当前降水量"),
    _21("21", "TT", "0", "N(10)", "1分钟时段降水量 "),
    _22("22", "TT", "0", "N(10)", "5分钟时段降水量"),
    _23("23", "TT", "0", "N(10)", "10分钟时段降水量"),
    _24("24", "TT", "0", "N(10)", "30分钟时段降水量"),
    _25("25", "TT", "0", "N(10)", "暴雨量"),
    _26("26", "TT", "0", "N(10)", "降水量累计值"),
    _27("27", "TT", "0", "N(10)", "瞬时流量、抽水流量"),
    _28("28", "TT", "0", "N(10)", "取(排）水口流量1"),
    _29("29", "TT", "0", "N(10)", "取(排）水口流量2"),
    _2A("2A", "TT", "0", "N(10)", "取(排）水口流量3"),
    _2B("2B", "TT", "0", "N(10)", "取(排）水口流量4"),
    _2C("2C", "TT", "0", "N(10)", "取(排）水口流量5"),
    _2D("2D", "TT", "0", "N(10)", "取(排）水口流量6"),
    _2E("2E", "TT", "0", "N(10)", "取(排）水口流量7"),
    _2F("2F", "TT", "0", "N(10)", "取(排）水口流量8"),
    _30("30", "TT", "0", "N(10)", "总出库流量、过闸总流量 "),
    _31("31", "TT", "0", "N(10)", "输水设备流量、过闸(组)流量"),
    _32("32", "TT", "0", "N(10)", "输沙量"),
    _33("33", "TT", "0", "N(10)", "风向"),
    _34("34", "TT", "0", "N(10)", "风力(级) "),
    _35("35", "TT", "0", "N(10)", "风速"),
    _36("36", "TT", "0", "N(10)", "断面平均流速"),
    _37("37", "TT", "0", "N(10)", "当前瞬时流速"),
    _38("38", "TT", "0", "N(10)", "电源电压"),
    _39("39", "TT", "0", "N(10)", "瞬时河道水位、潮位"),
    _3A("3A", "TT", "0", "N(10)", "库(闸、站)下水位"),
    _3B("3B", "TT", "0", "N(10)", "库(闸、站)上水位"),
    _3C("3C", "TT", "0", "N(10)", "取(排）水口水位1"),
    _3D("3D", "TT", "0", "N(10)", "取(排）水口水位2"),
    _3E("3E", "TT", "0", "N(10)", "取(排）水口水位3"),
    _3F("3F", "TT", "0", "N(10)", "取(排）水口水位4"),
    _40("40", "TT", "0", "N(10)", "取(排）水口水位5"),
    _41("41", "TT", "0", "N(10)", "取(排）水口水位6"),
    _42("42", "TT", "0", "N(10)", "取(排）水口水位7"),
    _43("43", "TT", "0", "N(10)", "取(排）水口水位8"),
    _44("44", "TT", "0", "N(10)", "含沙量"),
    _45("45", "TT", "0", "N(10)", "遥测站状态及报警信息"),
    _46("46", "TT", "0", "N(10)", "pH值"),
    _47("47", "TT", "0", "N(10)", "溶解氧"),
    _48("48", "TT", "0", "N(10)", "电导率"),
    _49("49", "TT", "0", "N(10)", "浊度"),
    _4A("4A", "TT", "0", "N(10)", "高锰酸盐指数"),
    _4B("4B", "TT", "0", "N(10)", "氧化还原电位"),
    _4C("4C", "TT", "0", "N(10)", "氨氮"),
    _4D("4D", "TT", "0", "N(10)", "总磷"),
    _4E("4E", "TT", "0", "N(10)", "总氮"),
    _4F("4F", "TT", "0", "N(10)", "总有机碳"),
    _50("50", "TT", "0", "N(10)", "铜"),
    _51("51", "TT", "0", "N(10)", "锌"),
    _52("52", "TT", "0", "N(10)", "硒"),
    _53("53", "TT", "0", "N(10)", "砷"),
    _54("54", "TT", "0", "N(10)", "总汞"),
    _55("55", "TT", "0", "N(10)", "镉"),
    _56("56", "TT", "0", "N(10)", "铅"),
    _57("57", "TT", "0", "N(10)", "叶绿素 a"),
    _58("58", "TT", "0", "N(10)", "水压1"),
    _59("59", "TT", "0", "N(10)", "水压2"),
    _5A("5A", "TT", "0", "N(10)", "水压3"),
    _5B("5B", "TT", "0", "N(10)", "水压4"),
    _5C("5C", "TT", "0", "N(10)", "水压5"),
    _5D("5D", "TT", "0", "N(10)", "水压6"),
    _5E("5E", "TT", "0", "N(10)", "水压7"),
    _5F("5F", "TT", "0", "N(10)", "水压8"),
    _60("60", "TT", "0", "N(10)", "水表1剩余水量"),
    _61("61", "TT", "0", "N(10)", "水表2剩余水量"),
    _62("62", "TT", "0", "N(10)", "水表3剩余水量"),
    _63("63", "TT", "0", "N(10)", "水表4剩余水量"),
    _64("64", "TT", "0", "N(10)", "水表5剩余水量"),
    _65("65", "TT", "0", "N(10)", "水表6剩余水量"),
    _66("66", "TT", "0", "N(10)", "水表7剩余水量"),
    _67("67", "TT", "0", "N(10)", "水表8剩余水量"),
    _68("68", "TT", "0", "N(10)", "水表1每小时水量"),
    _69("69", "TT", "0", "N(10)", "水表2每小时水量"),
    _6A("6A", "TT", "0", "N(10)", "水表3每小时水量"),
    _6B("6B", "TT", "0", "N(10)", "水表4每小时水量"),
    _6C("6C", "TT", "0", "N(10)", "水表5每小时水量"),
    _6D("6D", "TT", "0", "N(10)", "水表6每小时水量"),
    _6E("6E", "TT", "0", "N(10)", "水表7每小时水量"),
    _6F("6F", "TT", "0", "N(10)", "水表8每小时水量"),
    _70("70", "TT", "0", "N(10)", "交流A相电压"),
    _71("71", "TT", "0", "N(10)", "交流B相电压"),
    _72("72", "TT", "0", "N(10)", "交流C相电压"),
    _73("73", "TT", "0", "N(10)", "交流A相电压"),
    _74("74", "TT", "0", "N(10)", "交流B相电压"),
    _75("75", "TT", "0", "N(10)", "交流C相电压"),
    _76("76", "TT", "0", "N(9)", "累计流量，单位立方米"),
    FF01("FF01", "TT", "0", "N(9)", "累计流量，单位立方米"),
    FF02("FF02", "TT", "0", "N(9)", "信号质量");

    /**
     * 16进制标识符
     */
    private String hexStr;
    /**
     * ascii标识符
     */
    private String asciiStr;
    /**
     * 数据单位
     */
    private String dataUnit;
    /**
     * 数据定义
     */
    private String dataDef;
    /**
     * 描述
     */
    private String describe;

    IdentifierChartCEnum(String hexStr, String asciiStr, String dataUnit, String dataDef, String describe) {
        this.hexStr = hexStr;
        this.asciiStr = asciiStr;
        this.dataUnit = dataUnit;
        this.dataDef = dataDef;
        this.describe = describe;
    }

    public String getHexStr() {
        return hexStr;
    }

    public void setHexStr(String hexStr) {
        this.hexStr = hexStr;
    }

    public String getAsciiStr() {
        return asciiStr;
    }

    public void setAsciiStr(String asciiStr) {
        this.asciiStr = asciiStr;
    }

    public String getDataUnit() {
        return dataUnit;
    }

    public void setDataUnit(String dataUnit) {
        this.dataUnit = dataUnit;
    }

    public String getDataDef() {
        return dataDef;
    }

    public void setDataDef(String dataDef) {
        this.dataDef = dataDef;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public static IdentifierChartCEnum getEnumByObj(Object object) {
        for (IdentifierChartCEnum identifierChartCEnum : IdentifierChartCEnum.values()) {
            if (identifierChartCEnum.getHexStr().equals(object)
                    || identifierChartCEnum.getAsciiStr().equals(object)
                    || identifierChartCEnum.getDataUnit().equals(object)
                    || identifierChartCEnum.getDataDef().equals(object)
                    || identifierChartCEnum.getDescribe().equals(object)) {
                return identifierChartCEnum;
            }
        }
        throw new IllegalArgumentException("不存在成员为：" + object + "的 IdentifierChartCEnum 枚举对象");
    }
}
