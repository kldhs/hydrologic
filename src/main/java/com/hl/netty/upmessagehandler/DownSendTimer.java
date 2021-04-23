package com.hl.netty.upmessagehandler;

import com.hl.pojo.down.CompleteMessageDown;
import com.hl.util.LogUtil;

import java.util.Hashtable;
import java.util.PriorityQueue;
import java.util.Timer;
import java.util.TimerTask;

/**
 * @author xs
 * @date 2021/02/05 09:16
 */
public class DownSendTimer extends Thread {

    /**
     * 用来存放自身将要执行任务的队列
     */
    private PriorityQueue<CompleteMessageDown> completeMessageDownQueue = new PriorityQueue();

    /**
     * CarExecuteThread线程对象
     */
    static Hashtable<String, DownSendTimer> downSendTimerTable = new Hashtable<>();

    /**
     * 遥测站地址
     */
    private String telemetryStationAddr;


    private DownSendTimer(String telemetryStationAddr) {
        super(telemetryStationAddr + "号遥测站");
        this.telemetryStationAddr = telemetryStationAddr;
    }

    /**
     * 获取CarExecuteThread对象
     */
    public static DownSendTimer getDownSendTimer(String telemetryStationAddr) {
        DownSendTimer downSendTimer;
        if (!downSendTimerTable.containsKey(telemetryStationAddr)) {
            downSendTimer = new DownSendTimer(telemetryStationAddr);
            downSendTimerTable.put(telemetryStationAddr, downSendTimer);
        } else {
            downSendTimer = downSendTimerTable.get(telemetryStationAddr);
        }
        return downSendTimer;
    }

    /**
     * 存放任务
     */
    public static void setCompleteMessageDown(CompleteMessageDown completeMessageDown) {
        getDownSendTimer(completeMessageDown.getTelemetryStationAddr()).getCompleteMessageDownQueue().add(completeMessageDown);
    }

    /**
     * 获取当前对象任务队列
     */
    public PriorityQueue<CompleteMessageDown> getCompleteMessageDownQueue() {
        return completeMessageDownQueue;
    }

    @Override
    public void run() {
        try {
            new Timer(telemetryStationAddr + "号遥测站").schedule(new TimerTask() {
                @Override
                public void run() {
                    try {
                        CompleteMessageDown completeMessageDown = completeMessageDownQueue.poll();

                        if (completeMessageDownQueue.size() >= 2) {
                            LogUtil.threadError("-------小车轮询线程-------任务数异常 当前 "  + " 号小车队列中存在 " + " 个任务。");
                        }
                        if (completeMessageDown != null) {
                            //new DownSendThread(subTaskInfo, completeMessageDown).start();
                        } else {

                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }, 3000, 3000);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
