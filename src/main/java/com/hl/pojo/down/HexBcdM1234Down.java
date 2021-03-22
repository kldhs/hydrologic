package com.hl.pojo.down;

import com.hl.enums.FunctionCodeEnum;
import com.hl.pojo.up.HexBcdM1234MessageTextUp;

/**
 * @author xs
 * @date 2021/01/12 10:18
 * 单次发送的报文
 */
public class HexBcdM1234Down {
    /**
     * 完整报文
     */
    private String totalMessage;
    /**
     * 帧起始符
     */
    private String frameHeader;
    /**
     * 遥测站地址
     */
    private String telemetryStationAddr;
    /**
     * 中心站地址
     */
    private String centralStationAddr;
    /**
     * 密码
     */
    private String password;
    /**
     * 功能码
     */
    private FunctionCodeEnum functionCodeEnum;
    /**
     * 报文上下行标识
     */
    private String upOrDown;
    /**
     * 报文起始符
     */
    private String som;
    /**
     * 正文字节长度
     */
    private String messageTextLength;
    /**
     * 报文正文
     */
    private HexBcdM1234MessageTextDown hexBcdM1234MessageTextDown;
    /**
     * 报文正文Str
     */
    private String messageTextStr;
    /**
     * 报文结束符
     */
    private String eom;

    public String getTotalMessage() {
        return totalMessage;
    }

    public void setTotalMessage(String totalMessage) {
        this.totalMessage = totalMessage;
    }

    public String getFrameHeader() {
        return frameHeader;
    }

    public void setFrameHeader(String frameHeader) {
        this.frameHeader = frameHeader;
    }

    public String getTelemetryStationAddr() {
        return telemetryStationAddr;
    }

    public void setTelemetryStationAddr(String telemetryStationAddr) {
        this.telemetryStationAddr = telemetryStationAddr;
    }

    public String getCentralStationAddr() {
        return centralStationAddr;
    }

    public void setCentralStationAddr(String centralStationAddr) {
        this.centralStationAddr = centralStationAddr;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public FunctionCodeEnum getFunctionCodeEnum() {
        return functionCodeEnum;
    }

    public void setFunctionCodeEnum(FunctionCodeEnum functionCodeEnum) {
        this.functionCodeEnum = functionCodeEnum;
    }

    public String getUpOrDown() {
        return upOrDown;
    }

    public void setUpOrDown(String upOrDown) {
        this.upOrDown = upOrDown;
    }

    public String getSom() {
        return som;
    }

    public void setSom(String som) {
        this.som = som;
    }

    public HexBcdM1234MessageTextDown getHexBcdM1234MessageTextDown() {
        return hexBcdM1234MessageTextDown;
    }

    public void setHexBcdM1234MessageTextDown(HexBcdM1234MessageTextDown hexBcdM1234MessageTextDown) {
        this.hexBcdM1234MessageTextDown = hexBcdM1234MessageTextDown;
    }

    public String getMessageTextStr() {
        return messageTextStr;
    }

    public void setMessageTextStr(String messageTextStr) {
        this.messageTextStr = messageTextStr;
    }

    public String getEom() {
        return eom;
    }

    public void setEom(String eom) {
        this.eom = eom;
    }

    public String getMessageTextLength() {
        return messageTextLength;
    }

    public void setMessageTextLength(String messageTextLength) {
        this.messageTextLength = messageTextLength;
    }

    @Override
    public String toString() {
        return
                (frameHeader
                        + telemetryStationAddr
                        + centralStationAddr
                        + password
                        + functionCodeEnum.getFunctionCode()
                        + upOrDown
                        + messageTextLength
                        + som
                        + messageTextStr
                        + eom).toUpperCase();
    }
}
