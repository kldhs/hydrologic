package com.hl.pojo.up;

import com.hl.enums.FunctionCodeEnum;

/**
 * @author xs
 * @date 2019/11/27
 * 单次接收的报文
 */
public class HexBcdM1234Up extends BaseMessageUp {
    /**
     * 完整报文
     */
    private String totalMessage;
    /**
     * 帧起始符
     */
    private String frameHeader;
    /**
     * 中心站地址
     */
    private String centralStationAddr;
    /**
     * 遥测站地址
     */
    private String telemetryStationAddr;
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
     * 正文字节长度
     */
    private String messageTextLength;
    /**
     * 报文字节总长度
     */
    private String totalLength;
    /**
     * 报文起始符
     */
    private String som;
    /**
     * 报文正文
     */
    private HexBcdM1234MessageTextUp hexBcdM1234UpMessageText;
    /**
     * 报文正文Str
     */
    private String messageTextStr;
    /**
     * 报文结束符
     */
    private String eom;
    /**
     * 校验码
     */
    private String checkCode;

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

    public String getCentralStationAddr() {
        return centralStationAddr;
    }

    public void setCentralStationAddr(String centralStationAddr) {
        this.centralStationAddr = centralStationAddr;
    }

    public String getTelemetryStationAddr() {
        return telemetryStationAddr;
    }

    public String getTotalLength() {
        return totalLength;
    }

    public void setTotalLength(String totalLength) {
        this.totalLength = totalLength;
    }

    public void setTelemetryStationAddr(String telemetryStationAddr) {
        this.telemetryStationAddr = telemetryStationAddr;
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

    public String getMessageTextLength() {
        return messageTextLength;
    }

    public void setMessageTextLength(String messageTextLength) {
        this.messageTextLength = messageTextLength;
    }

    public String getSom() {
        return som;
    }

    public void setSom(String som) {
        this.som = som;
    }

    public HexBcdM1234MessageTextUp getHexBcdM1234UpMessageText() {
        return hexBcdM1234UpMessageText;
    }

    public void setHexBcdM1234UpMessageText(HexBcdM1234MessageTextUp hexBcdM1234UpMessageText) {
        this.hexBcdM1234UpMessageText = hexBcdM1234UpMessageText;
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

    public String getCheckCode() {
        return checkCode;
    }

    public void setCheckCode(String checkCode) {
        this.checkCode = checkCode;
    }
}
