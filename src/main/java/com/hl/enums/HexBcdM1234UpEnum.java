package com.hl.enums;

/**
 * @author xs
 * @date 2020/11/29 18:43
 */
public enum HexBcdM1234UpEnum {
    frameHeader(0, 4, 0, 2, "帧起始符"),
    centralStationAddr(4, 6, 2, 1, "中心站地址"),
    telemetryStationAddr(6, 16, 3, 5, "遥测站地址"),
    password(16, 20, 8, 2, "密码"),
    functionCode(20, 22, 10, 1, "功能码"),
    upOrDown(22, 24, 11, 1, "报文上下行标识"),
    messageTextLength(24, 26, 12, 1, "正文长度"),
    som(26, 28, 13, 1, "报文起始符"),
    //正文长度为不定长，在这里设置为完整报文除正文长度外的其他内容总长度
    messageText(28, -1, 14, 17, "报文正文"),
    eom(-1, -1, -1, 1, "报文结束符"),
    checkCode(-1, -1, -1, 2, "校验码");

    /**
     * 起始长度
     */
    private int startLength;
    /**
     * 结束长度
     */
    private int endLength;
    /**
     * 偏移量
     */
    private int offset;
    /**
     * 字节总长度
     */
    private int totalLength;
    /**
     * 描述
     */
    private String describe;

    HexBcdM1234UpEnum(int startLength, int endLength, int offset, int totalLength, String describe) {
        this.startLength = startLength;
        this.endLength = endLength;
        this.offset = offset;
        this.totalLength = totalLength;
        this.describe = describe;
    }

    public int getStartLength() {
        return startLength;
    }

    public void setStartLength(int startLength) {
        this.startLength = startLength;
    }

    public int getEndLength() {
        return endLength;
    }

    public void setEndLength(int endLength) {
        this.endLength = endLength;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getTotalLength() {
        return totalLength;
    }

    public void setTotalLength(int totalLength) {
        this.totalLength = totalLength;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public static HexBcdM1234UpEnum getEnumByObj(Object object) {
        for (HexBcdM1234UpEnum hexBcdM1234UpEnum : HexBcdM1234UpEnum.values()) {
            if (hexBcdM1234UpEnum.getStartLength()==Integer.valueOf((int)object)
                    || hexBcdM1234UpEnum.getEndLength()==Integer.valueOf((int)object)
                    || hexBcdM1234UpEnum.getOffset()==Integer.valueOf((int)object)
                    || hexBcdM1234UpEnum.getTotalLength()==Integer.valueOf((int)object)
                    || hexBcdM1234UpEnum.getDescribe().equals(object)) {
                return hexBcdM1234UpEnum;
            }
        }
        throw new IllegalArgumentException("不存在成员为：" + object + "的 HexBcdM1234UpEnum 枚举对象");
    }
}
