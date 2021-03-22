package com.hl.pojo.down;

import com.hl.enums.IdentifierChartCEnum;

import java.util.HashMap;
import java.util.Hashtable;

/**
 * @author xs
 * @date 2021/02/03 09:56 需要发送的完整报文
 */
public class CompleteMessageDown {

    /**
     * 第一包数据插入时间
     */
    private Long time;

    /**
     * CompleteMessage对象
     */
    private static Hashtable<String, CompleteMessageDown> completeMessageDownTable = new Hashtable<>();

    /**
     * 遥测站地址
     */
    private String telemetryStationAddr;

    /**
     * 所有包的数据
     */
    private HashMap<String, HexBcdM1234Down> allHexBcdM1234Down;

    /**
     * 每个遥测站的包总数
     */
    private Integer totalNumberPackages;

    /**
     * 所有要素信息组
     */
    private HashMap<IdentifierChartCEnum, String> allElementInfoGroup;

    /**
     * 所有要素信息组字符串
     */
    private String allElementInfoGroupStr;

    /**
     * 构造方法
     */
    public CompleteMessageDown(String telemetryStationAddr) {
        this.telemetryStationAddr = telemetryStationAddr;
    }

    /**
     * 获取HexBcdM1234UpMessageText对象
     */
    public static CompleteMessageDown getCompleteMessageDown(String telemetryStationAddr) {
        CompleteMessageDown completeMessageDown;
        if (!completeMessageDownTable.containsKey(telemetryStationAddr)) {
            completeMessageDown = new CompleteMessageDown(telemetryStationAddr);
            completeMessageDownTable.put(telemetryStationAddr, completeMessageDown);
        } else {
            completeMessageDown = completeMessageDownTable.get(telemetryStationAddr);
        }
        return completeMessageDown;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public static Hashtable<String, CompleteMessageDown> getCompleteMessageDownTable() {
        return completeMessageDownTable;
    }

    public static void setCompleteMessageDownTable(Hashtable<String, CompleteMessageDown> completeMessageDownTable) {
        CompleteMessageDown.completeMessageDownTable = completeMessageDownTable;
    }

    public String getTelemetryStationAddr() {
        return telemetryStationAddr;
    }

    public void setTelemetryStationAddr(String telemetryStationAddr) {
        this.telemetryStationAddr = telemetryStationAddr;
    }

    public HashMap<String, HexBcdM1234Down> getAllHexBcdM1234Down() {
        return allHexBcdM1234Down;
    }

    public void setAllHexBcdM1234Down(HashMap<String, HexBcdM1234Down> allHexBcdM1234Down) {
        this.allHexBcdM1234Down = allHexBcdM1234Down;
    }

    public Integer getTotalNumberPackages() {
        return totalNumberPackages;
    }

    public void setTotalNumberPackages(Integer totalNumberPackages) {
        this.totalNumberPackages = totalNumberPackages;
    }

    public HashMap<IdentifierChartCEnum, String> getAllElementInfoGroup() {
        return allElementInfoGroup;
    }

    public void setAllElementInfoGroup(HashMap<IdentifierChartCEnum, String> allElementInfoGroup) {
        this.allElementInfoGroup = allElementInfoGroup;
    }

    public String getAllElementInfoGroupStr() {
        return allElementInfoGroupStr;
    }

    public void setAllElementInfoGroupStr(String allElementInfoGroupStr) {
        this.allElementInfoGroupStr = allElementInfoGroupStr;
    }

    /**
     * 清空allHexBcdM1234Up
     */
    public void clearAllHexBcdM1234Down() {
//        for (String key :this.allHexBcdM1234Up.keySet()) {
//            allHexBcdM1234Up.put(key,null);
//        }
        this.allHexBcdM1234Down = null;
    }

    /**
     * 清空除allHexBcdM1234Up之外所有需要清空的数据
     */
    public void clearCompleteMessageButNotAllHexBcdM1234Down() {
        this.time = null;
        this.totalNumberPackages = null;
        this.allElementInfoGroup = null;
        this.allElementInfoGroupStr = null;
    }

    @Override
    public CompleteMessageDown clone() {
        try {
            return (CompleteMessageDown) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
