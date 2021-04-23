package com.hl.service;

import com.hl.dao.entity.TdDevData;
import com.hl.dao.mapper.TdDevDataMapper;
import com.hl.enums.IdentifierChartCEnum;
import com.hl.exception.DbOperationException;
import com.hl.pojo.up.CompleteMessageUp;
import com.hl.util.CRC16Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author xs
 * @date 2020/12/16 23:32
 */
@Service
public class TdDevDataService {
    @Autowired
    TdDevDataMapper tdDevDataMapper;

    public void insertTdDevData(CompleteMessageUp completeMessage) {
        TdDevData tdDevData = new TdDevData();
        tdDevData.setDevSn(completeMessage.getTelemetryStationAddr());
        try {
            String aa = (completeMessage.getAllHexBcdM1234Up().get("1")).getHexBcdM1234UpMessageText().getOberveTime();
            Date readTime = new SimpleDateFormat("yyyyMMddHHmm").parse("20" + aa);
            tdDevData.setReadTime(readTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        tdDevData.setCreateTime(new Date());
        String strChannel = new String();
        String strValue = new String();
        for (IdentifierChartCEnum key : completeMessage.getAllElementInfoGroup().keySet()) {
            Double aLong = Double.valueOf(completeMessage.getAllElementInfoGroup().get(key));
            strChannel = strChannel + key.getHexStr() + ",";
            strValue = strValue + (Double.valueOf(completeMessage.getAllElementInfoGroup().get(key))).toString() + ",";
        }
        tdDevData.setChannel(strChannel.substring(0, strChannel.length() - 1));
        tdDevData.setValue(strValue.substring(0, strValue.length() - 1));
        tdDevDataMapper.insert(tdDevData);
    }

    public void insertTdDevDataByMyself(CompleteMessageUp completeMessage,String picturePath) throws DbOperationException {
        try {
            java.text.NumberFormat nf = java.text.NumberFormat.getInstance();
            nf.setGroupingUsed(false);
            TdDevData tdDevData = new TdDevData();
            tdDevData.setDevSn(completeMessage.getTelemetryStationAddr());
            try {
                String aa = (completeMessage.getAllHexBcdM1234Up().get("1")).getHexBcdM1234UpMessageText().getOberveTime();
                Date readTime = new SimpleDateFormat("yyyyMMddHHmm").parse("20" + aa);
                tdDevData.setReadTime(readTime);
            } catch (ParseException e) {
                e.printStackTrace();
            }
            tdDevData.setCreateTime(new Date());
            String strChannel = new String();
            String strValue = new String();
            String dateNowStr = new SimpleDateFormat("yyyyMM").format(new Date());
            for (IdentifierChartCEnum key : completeMessage.getAllElementInfoGroup().keySet()) {
                if(key.equals(IdentifierChartCEnum.F3.getHexStr())){
                    strChannel = strChannel + key.getHexStr() + ",";
                    strValue = picturePath +",";
                }else if (key.equals(IdentifierChartCEnum._09)) {
                    strChannel = strChannel + key.getHexStr() + ",";
                    strValue = strValue + completeMessage.getAllElementInfoGroup().get(key) + ",";
                } else if(key.equals(IdentifierChartCEnum._45)){
                    strChannel = strChannel + key.getHexStr() + ",";
                    strValue = strValue + CRC16Util.getBinaryByHex(completeMessage.getAllElementInfoGroup().get(key).replace(".","")).substring(20,32) + ",";
                }else{
                    strChannel = strChannel + key.getHexStr() + ",";
                    strValue = strValue + nf.format(Double.valueOf(completeMessage.getAllElementInfoGroup().get(key))) + ",";
                }
            }
            tdDevData.setSerialNumber(completeMessage.getAllHexBcdM1234Up().get("1").getHexBcdM1234UpMessageText().getSerialNumber());
            tdDevData.setFunctionCode(completeMessage.getAllHexBcdM1234Up().get("1").getFunctionCodeEnum().getDescribe());
            tdDevData.setChannel(strChannel.substring(0, strChannel.length() - 1));
            tdDevData.setValue(strValue.substring(0, strValue.length() - 1));
            tdDevDataMapper.insertByMyself("td_devdata" + dateNowStr, tdDevData);
        } catch (Exception e) {
            e.printStackTrace();
            throw new DbOperationException("insertTdDevDataByMyself插入上行记录时异常");
        }
    }


}
