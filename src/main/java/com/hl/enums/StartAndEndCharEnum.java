package com.hl.enums;

/**
 * @author xs
 * @date 2020/11/27 15:08
 * 编码格式
 */
public enum StartAndEndCharEnum {
    STX("STX", "02", "正文开始"),
    ETX("ETX", "03", "正文结束"),
    EOT("EOT", "04", "传输结束"),
    ENQ("ENQ", "05", "请求"),
    ACK("ACK", "06", "收到通知"),
    NAK("NAK", "15", "拒绝接收"),
    ETB("ETB", "17", "结束传输块"),
    ESC("ESC", "1B", "逃离/取消");

    /**
     * ascii标识符
     */
    private String asciiStr;

    /**
     * 16进制标识符
     */
    private String hexStr;

    /**
     * 描述
     */
    private String describe;

    StartAndEndCharEnum(String asciiStr, String hexStr, String describe) {
        this.asciiStr = asciiStr;
        this.hexStr = hexStr;
        this.describe = describe;
    }

    public String getAsciiStr() {
        return asciiStr;
    }

    public void setAsciiStr(String asciiStr) {
        this.asciiStr = asciiStr;
    }

    public String getHexStr() {
        return hexStr;
    }

    public void setHexStr(String hexStr) {
        this.hexStr = hexStr;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public static StartAndEndCharEnum getEnumByObj(Object object) {
        for (StartAndEndCharEnum deviceCodeFormatEnum : StartAndEndCharEnum.values()) {
            if (deviceCodeFormatEnum.getAsciiStr().equals(object)
                    || deviceCodeFormatEnum.getHexStr().equals(object)
                    || deviceCodeFormatEnum.getDescribe().equals(object)) {
                return deviceCodeFormatEnum;
            }
        }
        throw new IllegalArgumentException("不存在成员为：" + object + "的 StartAndEndCharEnum 枚举对象");
    }
}
