package com.hl.enums;

/**
 * @author xs
 * @date 2020/12/04 09:15 表C 遥测站分类码
 */
public enum TeleStationClassCodeEnum {
    Precipitation("precipitation","降水", "50", "P", "降水：降水、蒸发、气象"),
    Riverway("riverway","河道",  "48", "H", "河道：降水、蒸发、河道水情、气象、水质"),
    Lakes("lakes", "水库(湖泊)", "4B", "K", "水库(湖泊)：降水、蒸发、河道水情、气象、水质"),
    GateDam("lateDam", "闸坝", "5A", "Z", "闸坝：降水、蒸发、河道水情、气象、水质"),
    PumpStation("pumpStation","泵站",  "44", "D", "泵站：降水、蒸发、河道水情、气象、水质"),
    Tide("tide","潮汐",  "54", "T", "潮汐：降水、蒸发、潮汐水情、气象"),
    SoilMoistureStatus("soilMoistureStatus","墒情",  "4D", "M", "墒情：降水、蒸发、墒情"),
    UndergroundWater("undergroundWater", "地下水", "47", "G", "地下水：埋深、水质、开采量"),
    WaterQuality("waterQuality","水质",  "51", "Q", "水质：水质、流量、水位"),
    Intake("intake","取水口",  "49", "I", "取水口：水位、水质、水量、水压等"),
    Outfall("outfall","排水口",  "4F", "O", "排水口：降水、蒸发、气象"),
    GateTimer("gateTimer","排水口",  "5a", "O", "闸门定时"),
    Other("other", "其他", "00", "X", "自定义");
    /**
     * 类别名称
     */
    private String className;
    /**
     * 中文类别名称
     */
    private String classNameCn;
    /**
     * hex编码
     */
    private String hexCode;
    /**
     * ascii编码
     */
    private String sciiCode;

    /**
     * 描述
     */
    private String describe;

    TeleStationClassCodeEnum(String className, String classNameCn, String hexCode, String sciiCode, String describe) {
        this.className = className;
        this.classNameCn = classNameCn;
        this.hexCode = hexCode;
        this.sciiCode = sciiCode;
        this.describe = describe;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public String getClassNameCn() {
        return classNameCn;
    }

    public void setClassNameCn(String classNameCn) {
        this.classNameCn = classNameCn;
    }

    public String getHexCode() {
        return hexCode;
    }

    public void setHexCode(String hexCode) {
        this.hexCode = hexCode;
    }

    public String getSciiCode() {
        return sciiCode;
    }

    public void setSciiCode(String sciiCode) {
        this.sciiCode = sciiCode;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public static TeleStationClassCodeEnum getEnumByObj(Object object) {
        for (TeleStationClassCodeEnum teleStationClassCodeEnum : TeleStationClassCodeEnum.values()) {
            if (teleStationClassCodeEnum.getClassName().equals(object)
                    || teleStationClassCodeEnum.getClassNameCn().equals(object)
                    || teleStationClassCodeEnum.getHexCode().equals(object)
                    || teleStationClassCodeEnum.getSciiCode().equals(object)
                    || teleStationClassCodeEnum.getDescribe().equals(object)
                    || teleStationClassCodeEnum.getDescribe().equals(object)) {
                return teleStationClassCodeEnum;
            }
        }
        throw new IllegalArgumentException("不存在成员为：" + object + "的 teleStationClassCodeEnum 枚举对象");
    }
}
