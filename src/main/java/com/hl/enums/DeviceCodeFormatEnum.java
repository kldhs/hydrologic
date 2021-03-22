package com.hl.enums;

/**
 * @author xs
 * @date 2020/11/27 15:08
 * 编码格式
 */
public enum DeviceCodeFormatEnum {
    _1802832372("1802832372","7E7E","M1","遥测站地址:1802832372,帧头格式:HEXBCD,模式：M1"),
    _1802832371("1802832371","7E7E","M1","遥测站地址:1802832371,帧头格式:HEXBCD,模式：M1");
    /**
     * 遥测站地址
     */
    private String telemetryStationAddr;
    /**
     * 帧头格式（ASCII为"01",HEXBCD为"7E7E"）
     */
    private String fhFormat;

    /**
     * 模式（M1、M2、M3、M4）
     */
    private String codeSchema;

    /**
     * 描述
     */
    private String describe;

    DeviceCodeFormatEnum(String telemetryStationAddr, String fhFormat, String codeSchema, String describe) {
        this.telemetryStationAddr = telemetryStationAddr;
        this.fhFormat = fhFormat;
        this.codeSchema = codeSchema;
        this.describe = describe;
    }

    public String getTelemetryStationAddr() {
        return telemetryStationAddr;
    }

    public void setTelemetryStationAddr(String telemetryStationAddr) {
        this.telemetryStationAddr = telemetryStationAddr;
    }

    public String getFhFormat() {
        return fhFormat;
    }

    public void setFhFormat(String fhFormat) {
        this.fhFormat = fhFormat;
    }

    public String getCodeSchema() {
        return codeSchema;
    }

    public void setCodeSchema(String codeSchema) {
        this.codeSchema = codeSchema;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public static DeviceCodeFormatEnum getEnumByObj(Object object) {
        for (DeviceCodeFormatEnum deviceCodeFormatEnum : DeviceCodeFormatEnum.values()) {
            if (deviceCodeFormatEnum.getTelemetryStationAddr().equals(object)
                    || deviceCodeFormatEnum.getFhFormat().equals(object)
                    || deviceCodeFormatEnum.getCodeSchema().equals(object)
                    || deviceCodeFormatEnum.getDescribe().equals(object)) {
                return deviceCodeFormatEnum;
            }
        }
        throw new IllegalArgumentException("不存在成员为：" + object + "的 DeviceCodeFormatEnum 枚举对象");
    }
}
