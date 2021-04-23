package com.hl.pojo.up;

import com.hl.enums.IdentifierChartCEnum;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.TreeMap;

/**
 * @author xs
 * @date 2020/12/18 09:49 上行的所有单个报文组成的完整报文
 */
public class CompleteMessageUp implements Cloneable {

    /**
     * 第一包数据插入时间
     */
    private Long time;

    /**
     * CompleteMessage对象
     */
    private static Hashtable<String, CompleteMessageUp> completeMessageUpTable = new Hashtable<>();

    /**
     * 遥测站地址
     */
    private String telemetryStationAddr;

    /**
     * 所有包的数据
     */
    private TreeMap<String, HexBcdM1234Up> allHexBcdM1234Up;

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
    private CompleteMessageUp(String telemetryStationAddr) {
        this.telemetryStationAddr = telemetryStationAddr;
    }

    /**
     * 获取HexBcdM1234UpMessageText对象
     */
    public static CompleteMessageUp getCompleteMessageUp(String telemetryStationAddr) {
        CompleteMessageUp completeMessage;
        if (!completeMessageUpTable.containsKey(telemetryStationAddr)) {
            completeMessage = new CompleteMessageUp(telemetryStationAddr);
            completeMessageUpTable.put(telemetryStationAddr, completeMessage);
        } else {
            completeMessage = completeMessageUpTable.get(telemetryStationAddr);
        }
        return completeMessage;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public static Hashtable<String, CompleteMessageUp> getCompleteMessageUpTable() {
        return completeMessageUpTable;
    }

    public static void setCompleteMessageUpTable(Hashtable<String, CompleteMessageUp> completeMessageTable) {
        CompleteMessageUp.completeMessageUpTable = completeMessageTable;
    }

    public String getTelemetryStationAddr() {
        return telemetryStationAddr;
    }

    public void setTelemetryStationAddr(String telemetryStationAddr) {
        this.telemetryStationAddr = telemetryStationAddr;
    }

    public TreeMap<String, HexBcdM1234Up> getAllHexBcdM1234Up() {
        return allHexBcdM1234Up;
    }

    public void setAllHexBcdM1234Up(TreeMap<String, HexBcdM1234Up> allHexBcdM1234Up) {
        this.allHexBcdM1234Up = allHexBcdM1234Up;
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
    public void clearAllHexBcdM1234Up() {
//        for (String key :this.allHexBcdM1234Up.keySet()) {
//            allHexBcdM1234Up.put(key,null);
//        }
        this.allHexBcdM1234Up = null;
    }

    /**
     * 清空除allHexBcdM1234Up之外所有需要清空的数据
     */
    public void clearCompleteMessageButNotAllHexBcdM1234Up() {
        this.time = null;
        this.totalNumberPackages = null;
        this.allElementInfoGroup = null;
        this.allElementInfoGroupStr = null;
    }

    @Override
    public CompleteMessageUp clone() {
        try {
            return (CompleteMessageUp) super.clone();
        } catch (CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }
}
