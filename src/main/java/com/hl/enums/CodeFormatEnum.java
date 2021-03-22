package com.hl.enums;

/**
 * @author xs
 * @date 2020/11/27 15:08
 * 编码格式
 */
public enum CodeFormatEnum {
    ASCII("01","ASCII为 01"),
    HEXBCD("7E7E","HEXBCD为 7E7E");

    /**
     * 帧头格式（ASCII为"01",HEXBCD为"7E7E"）
     */
    private String fh;

    /**
     * 描述
     */
    private String describe;

    CodeFormatEnum(String fh, String describe) {
        this.fh = fh;
        this.describe = describe;
    }

    public String getFh() {
        return fh;
    }

    public void setFh(String fh) {
        this.fh = fh;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public static CodeFormatEnum getEnumByObj(Object object) {
        for (CodeFormatEnum deviceCodeFormatEnum : CodeFormatEnum.values()) {
            if (deviceCodeFormatEnum.getFh().equals(object)
                    || deviceCodeFormatEnum.getDescribe().equals(object)) {
                return deviceCodeFormatEnum;
            }
        }
        throw new IllegalArgumentException("不存在成员为：" + object + "的 CodeFormatEnum 枚举对象");
    }
}
