package com.hl.pojo.up;

import com.hl.enums.TeleStationClassCodeEnum;

/**
 * @author xs
 * @date 2020/11/29 22:21 上行报文正文
 */
public class HexBcdM1234MessageTextUp implements Cloneable {

    /**
     * 包总数
     */
    private Integer totalNumberPackages;

    /**
     * 当前包序号
     */
    private Integer currentPackageNumber;

    /**
     * 流水号
     */
    private String serialNumber;
    /**
     * 发报时间
     */
    private String sendTime;
    /**
     * 地址标识符
     */
    private String addrTag;
    /**
     * 遥测站地址
     */
    private String telemetryStationAddr;
    /**
     * 遥测站分类码
     */
    private TeleStationClassCodeEnum teleStationClassCodeEnum;
    /**
     * 观测时间标识符
     */
    private String oberveTimeCode;
    /**
     * 观测时间
     */
    private String oberveTime;

    /**
     * 要素信息组字符串
     */
    private String elementInfoGroupStr;

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

    public String getAddrTag() {
        return addrTag;
    }

    public void setAddrTag(String addrTag) {
        this.addrTag = addrTag;
    }

    public String getTelemetryStationAddr() {
        return telemetryStationAddr;
    }

    public void setTelemetryStationAddr(String telemetryStationAddr) {
        this.telemetryStationAddr = telemetryStationAddr;
    }

    public TeleStationClassCodeEnum getTeleStationClassCodeEnum() {
        return teleStationClassCodeEnum;
    }

    public void setTeleStationClassCodeEnum(TeleStationClassCodeEnum teleStationClassCodeEnum) {
        this.teleStationClassCodeEnum = teleStationClassCodeEnum;
    }

    public String getOberveTimeCode() {
        return oberveTimeCode;
    }

    public void setOberveTimeCode(String oberveTimeCode) {
        this.oberveTimeCode = oberveTimeCode;
    }

    public String getOberveTime() {
        return oberveTime;
    }

    public void setOberveTime(String oberveTime) {
        this.oberveTime = oberveTime;
    }

    public Integer getTotalNumberPackages() {
        return totalNumberPackages;
    }

    public void setTotalNumberPackages(Integer totalNumberPackages) {
        this.totalNumberPackages = totalNumberPackages;
    }

    public Integer getCurrentPackageNumber() {
        return currentPackageNumber;
    }

    public void setCurrentPackageNumber(Integer currentPackageNumber) {
        this.currentPackageNumber = currentPackageNumber;
    }

    public String getElementInfoGroupStr() {
        return elementInfoGroupStr;
    }

    public void setElementInfoGroupStr(String elementInfoGroupStr) {
        this.elementInfoGroupStr = elementInfoGroupStr;
    }


    @Override
    public HexBcdM1234MessageTextUp clone() {
        try {
            return (HexBcdM1234MessageTextUp) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
        }
        return null;
    }
}
