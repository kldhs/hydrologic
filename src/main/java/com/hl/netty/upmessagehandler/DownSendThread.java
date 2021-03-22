package com.hl.netty.upmessagehandler;

import com.hl.dao.entity.TdDeviceInfo;
import com.hl.pojo.down.CompleteMessageDown;

/**
 * @author xs
 * @date 2021/02/05 09:52
 */
public class DownSendThread extends Thread {

    TdDeviceInfo tdDeviceInfo;
    CompleteMessageDown completeMessageDown;

    DownSendThread(TdDeviceInfo tdDeviceInfo, CompleteMessageDown completeMessageDown) {
        super(tdDeviceInfo.getIp() + "号遥测站");
        this.tdDeviceInfo = tdDeviceInfo;
        this.completeMessageDown = completeMessageDown;
    }

    @Override
    public void run() {
        downSendHandle(tdDeviceInfo, completeMessageDown);
    }

    /**
     * 任务执行
     */
    private void downSendHandle(TdDeviceInfo tdDeviceInfo, CompleteMessageDown completeMessageDown) {
        try {
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
