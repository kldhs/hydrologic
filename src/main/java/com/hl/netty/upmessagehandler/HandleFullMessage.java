package com.hl.netty.upmessagehandler;

import com.hl.HyStart;
import com.hl.dao.entity.TdDeviceInfo;
import com.hl.enums.*;
import com.hl.exception.*;
import com.hl.pojo.down.CompleteMessageDown;
import com.hl.pojo.down.HexBcdM1234Down;
import com.hl.pojo.down.HexBcdM1234MessageTextDown;
import com.hl.pojo.up.CompleteMessageUp;
import com.hl.pojo.up.HexBcdM1234MessageTextUp;
import com.hl.pojo.up.HexBcdM1234Up;
import com.hl.service.TdDevDataService;
import com.hl.service.TdDeviceInfoService;
import com.hl.util.CRC16Util;
import com.hl.util.LogUtil;
import com.hl.util.SpringBootUtil;
import com.hl.util.SystemInit;

import java.util.HashMap;

/**
 * @author xs
 * @date 2020/11/26 22:39
 */
public class HandleFullMessage {

    static TdDevDataService tdDevDataService = SpringBootUtil.getBean(TdDevDataService.class);
    static TdDeviceInfoService tdDeviceInfoService = SpringBootUtil.getBean(TdDeviceInfoService.class);

    /**
     * 处理完整报文
     *
     * @param resultStr
     */
    public static String handlefullmessage(String resultStr, String ipAndPort) {
        //遥测站地址
        //String devSn = resultStr.substring(
        //        (HexBcdM1234UpEnum.messageText.getTotalLength() - HexBcdM1234UpEnum.eom.getTotalLength() - HexBcdM1234UpEnum.checkCode.getTotalLength()) * 2,
        //        (HexBcdM1234UpEnum.messageText.getTotalLength() - HexBcdM1234UpEnum.eom.getTotalLength() - HexBcdM1234UpEnum.checkCode.getTotalLength()) * 2
        //                + Long.valueOf(resultStr.substring(HexBcdM1234UpEnum.messageTextLength.getStartLength(), HexBcdM1234UpEnum.messageTextLength.getEndLength()), 16).intValue() * 2)
        //        .substring(20, 30);
        String devSn = resultStr.substring(HexBcdM1234UpEnum.telemetryStationAddr.getStartLength(),HexBcdM1234UpEnum.telemetryStationAddr.getEndLength());
        //获取当前设备对象
        TdDeviceInfo tdDeviceInfo = SystemInit.tdDeviceInfoIpMap.get(ipAndPort.split(":")[0].replace(" ", ""));
        if (tdDeviceInfo == null) {
            tdDeviceInfo = SystemInit.tdDeviceInfoSnMap.get(devSn);
            tdDeviceInfoService.updateIp(tdDeviceInfo, ipAndPort.split(":")[0].replace(" ", ""));
            LogUtil.nettyWarn("----netty服务端----"  + " 将遥测站地址为："+devSn+"的设备ip地址更新为："+ipAndPort.split(":")[0].replace(" ", ""));
        }
        //获取当前设备编码模式
        String codeSchema = tdDeviceInfo.getDevCodeschema();
        //单次接收的报文
        HexBcdM1234Up hexBcdM1234Up = new HexBcdM1234Up();
        //流水号
        String serialNumber = null;
        //发报时间
        String sendTime = null;
        //包总数
        Integer totalPackagesNum = null;
        //当前包序号
        Integer currentPackageNumber = null;
        //计算得出的校验码
        String newCheckCode = null;
        //上行报文正文
        HexBcdM1234MessageTextUp hexBcdM1234UpMessageText;
        try {
            //如果是 HEX BCD 编码格式报文
            if (resultStr.startsWith(CodeFormatEnum.HEXBCD.getFh()) || resultStr.startsWith(CodeFormatEnum.HEXBCD.getFh().toLowerCase())) {
                String[] strings = initGetParament(resultStr, ipAndPort, hexBcdM1234Up,
                        codeSchema, serialNumber, sendTime, totalPackagesNum, currentPackageNumber);
                serialNumber = strings[0];
                sendTime = strings[1];
                totalPackagesNum = Integer.valueOf(strings[2]);
                currentPackageNumber = Integer.valueOf(strings[3]);
                checkCode(hexBcdM1234Up, resultStr, newCheckCode, ipAndPort);
                //如果是 ASCII 编码格式报文
            } else if (resultStr.startsWith(CodeFormatEnum.ASCII.getFh()) || resultStr.startsWith(CodeFormatEnum.ASCII.getFh().toLowerCase())) {
                LogUtil.nettyInfo("----netty服务端----" + ipAndPort + " 客户端的报文 是以\"01\"开头的 ASCII 编码格式报文");
            } else {
                LogUtil.nettyInfo("----netty服务端----" + ipAndPort + " 客户端的报文 既不是以\"01\"开头的 ASCII 编码格式报文 也不是以\"7e7e\"开头的 " +
                        "HEX BCD 编码格式报文。报文为：" + resultStr + "不做处理");
            }
            //处理单次接收的报文
            handleHexBcdM1234Up(hexBcdM1234Up, resultStr, ipAndPort);
            if(hexBcdM1234Up.getFunctionCodeEnum().equals(FunctionCodeEnum._2F)){
                return null;
            }else {
                //处理正文
                hexBcdM1234UpMessageText = handlemessageText(hexBcdM1234Up, ipAndPort);
                //处理上行完整报文
                return handleCompleteMessageUp(hexBcdM1234UpMessageText, hexBcdM1234Up, SystemInit.tdDeviceInfoSnMap.get(hexBcdM1234Up.getTelemetryStationAddr()), ipAndPort, codeSchema);
            }
        } catch (Exception e) {
            e.printStackTrace();
            LogUtil.nettyInfo("----netty服务端----" + e.getMessage());
            LogUtil.nettyInfo("----netty服务端----" + e.toString());
            return null;
        }
    }


    /**
     * 初始化获取参数
     */
    private static String[] initGetParament(String resultStr, String ipAndPort, HexBcdM1234Up hexBcdM1234Up,
            String codeschema, String serialNumber, String sendTime, Integer totalPackagesNum, Integer currentPackageNumber) throws InitGetParamentException {
        String[] strings = new String[]{null, null, null, null};
        try {
            LogUtil.nettyInfo("----netty服务端----" + ipAndPort + " 客户端的报文 是以\"7e7e\"开头的 HEX BCD 编码格式报文");
            //初始化获取参数
            //正文长度
            hexBcdM1234Up.setMessageTextLength(resultStr.substring(HexBcdM1234UpEnum.messageTextLength.getStartLength(), HexBcdM1234UpEnum.messageTextLength.getEndLength()));
            //完整报文总长度
            hexBcdM1234Up.setTotalLength(CRC16Util.toHexString(Long.valueOf(hexBcdM1234Up.getMessageTextLength(), 16).intValue() + HexBcdM1234UpEnum.messageText.getTotalLength()));
            //完整报文
            hexBcdM1234Up.setTotalMessage(resultStr.substring(0, Long.valueOf(hexBcdM1234Up.getTotalLength(), 16).intValue() * 2));
            //正文
            hexBcdM1234Up.setMessageTextStr(hexBcdM1234Up.getTotalMessage().substring(
                    (HexBcdM1234UpEnum.messageText.getTotalLength() - HexBcdM1234UpEnum.eom.getTotalLength() - HexBcdM1234UpEnum.checkCode.getTotalLength()) * 2,
                    (HexBcdM1234UpEnum.messageText.getTotalLength() - HexBcdM1234UpEnum.eom.getTotalLength() - HexBcdM1234UpEnum.checkCode.getTotalLength()) * 2
                            + Long.valueOf(hexBcdM1234Up.getMessageTextLength(), 16).intValue() * 2
            ));
            if ("M1".equals(codeschema) || "M2".equals(codeschema) || "M4".equals(codeschema)) {
                if ("M2".equals(codeschema)) {
                    totalPackagesNum = -1;
                    currentPackageNumber = -1;
                } else {
                    totalPackagesNum = 1;
                    currentPackageNumber = 1;
                }
                serialNumber = hexBcdM1234Up.getMessageTextStr().substring(0, 4);
                sendTime = hexBcdM1234Up.getMessageTextStr().substring(4, 16);
            } else if ("M3".equals(codeschema)) {
                int[] totalAndCurrentPackagesNum = HandleUtil.getTotalAndCurrentPackagesNum(hexBcdM1234Up.getMessageTextStr().substring(0, 6));
                totalPackagesNum = totalAndCurrentPackagesNum[0];
                currentPackageNumber = totalAndCurrentPackagesNum[1];
                serialNumber = hexBcdM1234Up.getMessageTextStr().substring(6, 10);
                sendTime = hexBcdM1234Up.getMessageTextStr().substring(10, 22);
            }
            if (serialNumber == null || sendTime == null || totalPackagesNum == null || currentPackageNumber == null) {
                throw new InitGetParamentException("serialNumber:" + serialNumber + " sendTime:" + sendTime + " totalPackagesNum:" + totalPackagesNum + " currentPackageNumber:" + currentPackageNumber);
            }
            strings[0] = serialNumber;
            strings[1] = sendTime;
            strings[2] = totalPackagesNum.toString();
            strings[3] = currentPackageNumber.toString();
        } catch (Exception e) {
            throw new InitGetParamentException("serialNumber:" + serialNumber + " sendTime:" + sendTime + " totalPackagesNum:" + totalPackagesNum + " currentPackageNumber:" + currentPackageNumber);
        }
        return strings;
    }

    /**
     * 校验码是否正确
     *
     * @param hexBcdM1234Up
     */
    private static void checkCode(HexBcdM1234Up hexBcdM1234Up, String resultStr, String newCheckCode, String ipAndPort) throws CheckCodeException {
        try {
            //报文的校验码
            hexBcdM1234Up.setCheckCode(hexBcdM1234Up.getTotalMessage().substring(
                    Long.valueOf(hexBcdM1234Up.getTotalLength(), 16).intValue() * 2 - HexBcdM1234UpEnum.checkCode.getTotalLength() * 2,
                    Long.valueOf(hexBcdM1234Up.getTotalLength(), 16).intValue() * 2));
            newCheckCode = CRC16Util.getCRCCode(resultStr.substring(0,
                    Long.valueOf(hexBcdM1234Up.getTotalLength(), 16).intValue() * 2 - HexBcdM1234UpEnum.checkCode.getTotalLength() * 2));
            //校验码不正确
            if (!hexBcdM1234Up.getCheckCode().toUpperCase().equals(newCheckCode)) {
                LogUtil.nettyInfo("----netty服务端----" + ipAndPort + " 客户端的报文校验码未通过，报文中的校验码为：" + hexBcdM1234Up.getCheckCode().toUpperCase() + " 计算出的校验码为：" + newCheckCode);
                throw new CheckCodeException(ipAndPort + " 客户端的报文校验码未通过，报文中的校验码为：" + hexBcdM1234Up.getCheckCode().toUpperCase() + " 计算出的校验码为：" + newCheckCode);
            }
        } catch (Exception e) {
            throw new CheckCodeException(ipAndPort + " 客户端的报文校验码未通过，报文中的校验码为：" + hexBcdM1234Up.getCheckCode().toUpperCase() + " 计算出的校验码为：" + newCheckCode);
        }
    }

    /**
     * 处理上行单次接收的报文
     */
    private static void handleHexBcdM1234Up(HexBcdM1234Up hexBcdM1234Up, String resultStr, String ipAndPort) throws HandleHexBcdM1234UpException {
        try {
            //正文
            hexBcdM1234Up.setMessageTextStr(hexBcdM1234Up.getTotalMessage().substring(
                    (HexBcdM1234UpEnum.messageText.getTotalLength() - HexBcdM1234UpEnum.eom.getTotalLength() - HexBcdM1234UpEnum.checkCode.getTotalLength()) * 2,
                    (HexBcdM1234UpEnum.messageText.getTotalLength() - HexBcdM1234UpEnum.eom.getTotalLength() - HexBcdM1234UpEnum.checkCode.getTotalLength()) * 2
                            + Long.valueOf(hexBcdM1234Up.getMessageTextLength(), 16).intValue() * 2
            ));
            hexBcdM1234Up.setFrameHeader(hexBcdM1234Up.getTotalMessage().substring(HexBcdM1234UpEnum.frameHeader.getStartLength(), HexBcdM1234UpEnum.frameHeader.getEndLength()));
            hexBcdM1234Up.setCentralStationAddr(hexBcdM1234Up.getTotalMessage().substring(HexBcdM1234UpEnum.centralStationAddr.getStartLength(), HexBcdM1234UpEnum.centralStationAddr.getEndLength()));
            hexBcdM1234Up.setTelemetryStationAddr(hexBcdM1234Up.getTotalMessage().substring(HexBcdM1234UpEnum.telemetryStationAddr.getStartLength(),
                    HexBcdM1234UpEnum.telemetryStationAddr.getEndLength()));
            hexBcdM1234Up.setPassword(
                    hexBcdM1234Up.getTotalMessage().substring(HexBcdM1234UpEnum.password.getStartLength(),
                            HexBcdM1234UpEnum.password.getEndLength()));
            hexBcdM1234Up.setFunctionCodeEnum(FunctionCodeEnum.getEnumByObj(
                    hexBcdM1234Up.getTotalMessage().substring(HexBcdM1234UpEnum.functionCode.getStartLength(),
                            HexBcdM1234UpEnum.functionCode.getEndLength())));
            hexBcdM1234Up.setUpOrDown(
                    hexBcdM1234Up.getTotalMessage().substring(HexBcdM1234UpEnum.upOrDown.getStartLength(),
                            HexBcdM1234UpEnum.upOrDown.getEndLength()));
            hexBcdM1234Up.setSom(hexBcdM1234Up.getTotalMessage().substring(HexBcdM1234UpEnum.som.getStartLength(),
                    HexBcdM1234UpEnum.som.getEndLength()));
            hexBcdM1234Up.setEom(hexBcdM1234Up.getTotalMessage().substring(
                    Long.valueOf(hexBcdM1234Up.getTotalLength(), 16).intValue() * 2 - HexBcdM1234UpEnum.checkCode.getTotalLength() * 2
                            - HexBcdM1234UpEnum.eom.getTotalLength() * 2
                    ,
                    Long.valueOf(hexBcdM1234Up.getTotalLength(), 16).intValue() * 2 - HexBcdM1234UpEnum.checkCode.getTotalLength() * 2));
        } catch (Exception e) {
            e.toString();
            throw new HandleHexBcdM1234UpException(ipAndPort + " 客户端处理单次接收的报文异常");
        }
    }

    /**
     * 处理上行正文
     *
     * @param hexBcdM1234Up
     */
    public static HexBcdM1234MessageTextUp handlemessageText(HexBcdM1234Up hexBcdM1234Up, String ipAndPort) throws HexBcdM1234MessageTextUpException {
        //获取HexBcdM1234MessageTextUp对象
        HexBcdM1234MessageTextUp hexBcdM1234UpMessageText = new HexBcdM1234MessageTextUp();
        try {
            //获取遥测站地址
            String telemetryStationAddr = hexBcdM1234Up.getTelemetryStationAddr();
            //获取设备的相关配置信息
            TdDeviceInfo tdDeviceInfo = SystemInit.tdDeviceInfoSnMap.get(telemetryStationAddr);
            //获取正文
            String messageTextStr = hexBcdM1234Up.getMessageTextStr();
            //填充报文正文相关信息
            //总包数
            Integer totalPackagesNum = 0;
            //当前包序号
            Integer currentPackagesNum = 0;
            //要素组信息字符串
            String elementInfoGroupStr = "";
            if ("M1".equals(tdDeviceInfo.getDevCodeschema()) || "M2".equals(tdDeviceInfo.getDevCodeschema()) || "M4".equals(tdDeviceInfo.getDevCodeschema())) {
                if ("M2".equals(tdDeviceInfo.getDevCodeschema())) {
                    totalPackagesNum = -1;
                    currentPackagesNum = -1;
                } else {
                    totalPackagesNum = 1;
                    currentPackagesNum = 1;
                }
                hexBcdM1234UpMessageText.setSerialNumber(messageTextStr.substring(0, 4));
                hexBcdM1234UpMessageText.setSendTime(messageTextStr.substring(4, 16));
                hexBcdM1234UpMessageText.setAddrTag(messageTextStr.substring(16, 20));
                hexBcdM1234UpMessageText.setTelemetryStationAddr(messageTextStr.substring(20, 30));
                hexBcdM1234UpMessageText.setTeleStationClassCodeEnum(TeleStationClassCodeEnum.getEnumByObj(messageTextStr.substring(30, 32)));
                hexBcdM1234UpMessageText.setOberveTimeCode(messageTextStr.substring(32, 36));
                hexBcdM1234UpMessageText.setOberveTime(messageTextStr.substring(36, 46));
                elementInfoGroupStr = messageTextStr.substring(46);
            } else if ("M3".equals(tdDeviceInfo.getDevCodeschema())) {
                int[] totalAndCurrentPackagesNum = HandleUtil.getTotalAndCurrentPackagesNum(messageTextStr.substring(0, 6));
                totalPackagesNum = totalAndCurrentPackagesNum[0];
                currentPackagesNum = totalAndCurrentPackagesNum[1];
                hexBcdM1234UpMessageText.setSerialNumber(messageTextStr.substring(6, 10));
                hexBcdM1234UpMessageText.setSendTime(messageTextStr.substring(10, 22));
                hexBcdM1234UpMessageText.setAddrTag(messageTextStr.substring(22, 26));
                hexBcdM1234UpMessageText.setTelemetryStationAddr(messageTextStr.substring(26, 36));
                hexBcdM1234UpMessageText.setTeleStationClassCodeEnum(TeleStationClassCodeEnum.getEnumByObj(messageTextStr.substring(36, 38)));
                hexBcdM1234UpMessageText.setOberveTimeCode(messageTextStr.substring(38, 42));
                hexBcdM1234UpMessageText.setOberveTime(messageTextStr.substring(42, 52));
                elementInfoGroupStr = messageTextStr.substring(52);
            }
            hexBcdM1234UpMessageText.setTotalNumberPackages(totalPackagesNum);
            hexBcdM1234UpMessageText.setCurrentPackageNumber(currentPackagesNum);
            hexBcdM1234UpMessageText.setElementInfoGroupStr(elementInfoGroupStr);
        } catch (Exception e) {
            throw new HexBcdM1234MessageTextUpException(ipAndPort + " 客户端处理正文异常");
        }
        return hexBcdM1234UpMessageText;
    }

    /**
     * 处理上行完整报文
     */
    private static String handleCompleteMessageUp(HexBcdM1234MessageTextUp hexBcdM1234UpMessageText,
            HexBcdM1234Up hexBcdM1234Up, TdDeviceInfo tdDeviceInfo, String ipAndPort, String codeschema) throws HandleCompleteMessageUpException {
        String creatCompleteMessageDownStr = null;
        try {
            //获取CompleteMessageUp对象
            CompleteMessageUp completeMessageUp = CompleteMessageUp.getCompleteMessageUp(hexBcdM1234UpMessageText.getTelemetryStationAddr());
            CompleteMessageUp completeMessageUpCopy = null;
            completeMessageUp.setTotalNumberPackages(hexBcdM1234UpMessageText.getTotalNumberPackages());
            //判断是不是接收到完整报文之后重新开始接收的第一段报文
            if (HandleUtil.checkRestartAcceptMessage(completeMessageUp)) {
                //设置接收第一段报文的时间
                completeMessageUp.setTime(System.currentTimeMillis());
                completeMessageUp.setAllHexBcdM1234Up(new HashMap<String, HexBcdM1234Up>());
            }
            //放入当前报文
            (hexBcdM1234Up).setHexBcdM1234UpMessageText(hexBcdM1234UpMessageText);
            if ("M2".equals(tdDeviceInfo.getDevCodeschema())) {
                String m2currentPackageNumber = HandleUtil.getM2CurrentPackageNumber(completeMessageUp.getAllHexBcdM1234Up());
                completeMessageUp.getAllHexBcdM1234Up().put(m2currentPackageNumber, hexBcdM1234Up);
            } else {
                completeMessageUp.getAllHexBcdM1234Up().put(hexBcdM1234UpMessageText.getCurrentPackageNumber().toString(), hexBcdM1234Up);
            }
            //判断是否所有报文接收完成
            if (HandleUtil.checkAcceptMessageOver(completeMessageUp, tdDeviceInfo)) {
                completeMessageUp.setAllElementInfoGroupStr(HandleUtil.jointMessage(completeMessageUp.getAllHexBcdM1234Up()));
                completeMessageUp.setAllElementInfoGroup(HandleUtil.handleElementInfoGroupStr(new HashMap(), completeMessageUp.getAllElementInfoGroupStr()));
                completeMessageUpCopy = completeMessageUp.clone();
                tdDevDataService.insertTdDevDataByMyself(completeMessageUpCopy);
                //下行回复
                creatCompleteMessageDownStr = creatCompleteMessageDown(completeMessageUp, hexBcdM1234Up, codeschema);
                completeMessageUp.clearAllHexBcdM1234Up();
                completeMessageUp.clearCompleteMessageButNotAllHexBcdM1234Up();
            } else {
                //判断是否是否接收超时
                if (HandleUtil.checkAcceptMessageOutTime(completeMessageUp)) {
                    completeMessageUp.clearAllHexBcdM1234Up();
                    completeMessageUp.clearCompleteMessageButNotAllHexBcdM1234Up();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new HandleCompleteMessageUpException(ipAndPort + " 处理上行完整报文异常");
        }
        return creatCompleteMessageDownStr;
    }

    private static String creatCompleteMessageDown(CompleteMessageUp completeMessageUp, HexBcdM1234Up hexBcdM1234Up, String codeschema) {
        CompleteMessageDown completeMessageDown = new CompleteMessageDown(hexBcdM1234Up.getTelemetryStationAddr());
        HexBcdM1234Down hexBcdM1234Down = new HexBcdM1234Down();
        HexBcdM1234MessageTextDown hexBcdM1234MessageTextDown = new HexBcdM1234MessageTextDown();
        if (codeschema.equals("M2")) {
            creatHexBcdM1234MessageTextDown(hexBcdM1234MessageTextDown, hexBcdM1234Up);
            creatHexBcdM1234Down(hexBcdM1234Down, hexBcdM1234Up, hexBcdM1234MessageTextDown);
            return CRC16Util.getCRCMsg(hexBcdM1234Down.getTotalMessage());
        } else {

        }
        return null;
    }

    /**
     * 获取下行正文
     *
     * @return
     */
    private static void creatHexBcdM1234MessageTextDown(HexBcdM1234MessageTextDown hexBcdM1234MessageTextDown, HexBcdM1234Up hexBcdM1234Up) {
        hexBcdM1234MessageTextDown.setSerialNumber(hexBcdM1234Up.getHexBcdM1234UpMessageText().getSerialNumber());
        hexBcdM1234MessageTextDown.setSendTime(hexBcdM1234Up.getHexBcdM1234UpMessageText().getSendTime());
    }

    private static void creatHexBcdM1234Down(HexBcdM1234Down hexBcdM1234Down, HexBcdM1234Up hexBcdM1234Up, HexBcdM1234MessageTextDown hexBcdM1234MessageTextDown) {
        hexBcdM1234Down.setFrameHeader("7E7E");
        hexBcdM1234Down.setTelemetryStationAddr(hexBcdM1234Up.getTelemetryStationAddr());
        hexBcdM1234Down.setCentralStationAddr(hexBcdM1234Up.getCentralStationAddr());
        hexBcdM1234Down.setPassword(hexBcdM1234Up.getPassword());
        hexBcdM1234Down.setFunctionCodeEnum(hexBcdM1234Up.getFunctionCodeEnum());
        hexBcdM1234Down.setUpOrDown("8");
        hexBcdM1234Down.setMessageTextStr(hexBcdM1234MessageTextDown.toString());
        hexBcdM1234Down.setMessageTextLength(CRC16Util.addZeroForNum(CRC16Util.toHexString(hexBcdM1234Down.getMessageTextStr().length()/2)
                , 12 / 4));
        hexBcdM1234Down.setSom(StartAndEndCharEnum.STX.getHexStr());
        hexBcdM1234Down.setHexBcdM1234MessageTextDown(hexBcdM1234MessageTextDown);
        if (StartAndEndCharEnum.getEnumByObj(hexBcdM1234Up.getEom()).equals(StartAndEndCharEnum.ETB)) {
            hexBcdM1234Down.setEom(StartAndEndCharEnum.ACK.getHexStr());
        } else if (StartAndEndCharEnum.getEnumByObj(hexBcdM1234Up.getEom()).equals(StartAndEndCharEnum.ETX)) {
            hexBcdM1234Down.setEom(StartAndEndCharEnum.EOT.getHexStr());
        }
        hexBcdM1234Down.setTotalMessage(hexBcdM1234Down.toString());
    }
}



