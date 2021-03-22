package com.hl.pojo.down;

import com.hl.enums.TeleStationClassCodeEnum;

/**
 * @author xs
 * @date 2021/01/12 10:16 下行报文正文
 */
public class HexBcdM1234MessageTextDown implements Cloneable{

    /**
     * 流水号
     */
    private String serialNumber;
    /**
     * 发报时间
     */
    private String sendTime;

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getSendTime() {
        return sendTime;
    }

    public void setSendTime(String sendTime) {
        this.sendTime = sendTime;
    }

    @Override
    public HexBcdM1234MessageTextDown clone() {
        try {
            return (HexBcdM1234MessageTextDown) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public String toString() {
        return serialNumber+sendTime;
    }
}
