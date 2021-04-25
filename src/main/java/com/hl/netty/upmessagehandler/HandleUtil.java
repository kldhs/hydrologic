package com.hl.netty.upmessagehandler;

import com.hl.dao.entity.TdDeviceInfo;
import com.hl.enums.IdentifierChartCEnum;
import com.hl.enums.StartAndEndCharEnum;
import com.hl.pojo.up.CompleteMessageUp;
import com.hl.pojo.up.HexBcdM1234Up;
import com.hl.util.CRC16Util;

import java.util.HashMap;
import java.util.Set;
import java.util.TreeMap;

/**
 * @author xs
 * @date 2021/02/24 11:11
 */
public class HandleUtil {
    /**
     * 拼接完整报文
     */
    public static String jointMessage(TreeMap<String, HexBcdM1234Up> allHexBcdM1234Up) {
        StringBuilder messageStr = new StringBuilder(" ");
        //如果是图片信息
        if(allHexBcdM1234Up.get(String.valueOf( allHexBcdM1234Up.keySet().size() ))
                .getHexBcdM1234UpMessageText().getElementInfoGroupStr()
                .substring(0,2)
                .equals(IdentifierChartCEnum.F3.getHexStr())){
            for (HexBcdM1234Up hexBcdM1234Up : allHexBcdM1234Up.values()) {
                messageStr = messageStr.append(hexBcdM1234Up.getHexBcdM1234UpMessageText().getElementInfoGroupStr().substring(2));
            }
            messageStr =new StringBuilder(IdentifierChartCEnum.F3.getHexStr()).append(messageStr);
        }else{
            for (HexBcdM1234Up hexBcdM1234Up : allHexBcdM1234Up.values()) {
                messageStr = messageStr.append(hexBcdM1234Up.getHexBcdM1234UpMessageText().getElementInfoGroupStr());
            }
        }

        return String.valueOf(messageStr).trim();
    }

    /**
     * 判断是否接收超时
     */
    public static boolean checkAcceptMessageOutTime(CompleteMessageUp completeMessage) {
        if (System.currentTimeMillis() - completeMessage.getTime() >= 2000) {
            return true;
        }
        return false;
    }

    /**
     * 获取M2模式下当前报文序列
     */
    public static String getM2CurrentPackageNumber(TreeMap<String, HexBcdM1234Up> allHexBcdM1234Up) {
        String m2CurrentPackageNumber = "0";
        Set<String> keys = allHexBcdM1234Up.keySet();
        m2CurrentPackageNumber = String.valueOf(keys.size() + 1);
        return m2CurrentPackageNumber;
    }

    /**
     * 判断是不是接收到完整报文之后重新开始接收的第一段报文
     */
    public static boolean checkRestartAcceptMessage(CompleteMessageUp completeMessage) {
        TreeMap<String, HexBcdM1234Up> allHexBcdM1234Up = completeMessage.getAllHexBcdM1234Up();
        if (allHexBcdM1234Up == null) {
            return true;
        } else {
            for (Integer i = 1; i <= completeMessage.getTotalNumberPackages(); i++) {
                if (allHexBcdM1234Up.get(i.toString()) != null) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * 判断是不是接收完了所有报文
     */
    public static boolean checkAcceptMessageOver(CompleteMessageUp completeMessage, TdDeviceInfo tdDeviceInfo) {
        TreeMap<String, HexBcdM1234Up> allHexBcdM1234Up = completeMessage.getAllHexBcdM1234Up();
        if (!"M2".equals(tdDeviceInfo.getDevCodeschema())) {
            if (allHexBcdM1234Up == null) {
                return false;
            } else {
                for (Integer i = 1; i <= completeMessage.getTotalNumberPackages(); i++) {
                    if (allHexBcdM1234Up.get(i.toString()) == null) {
                        return false;
                    }
                }
            }
            return true;
        } else {
            HexBcdM1234Up hexBcdM1234Up = allHexBcdM1234Up.get(String.valueOf(allHexBcdM1234Up.keySet().size()));
            if (hexBcdM1234Up.getEom().equals(StartAndEndCharEnum.ETX.getHexStr())) {
                return true;
            }
            return false;
        }
    }

    /**
     * 获取总包数以及当前包序号
     */
    public static int[] getTotalAndCurrentPackagesNum(String numLength) {
        int[] ints = new int[2];
        int numLengthNum = Long.valueOf(numLength, 16).intValue();
        StringBuffer sb = new StringBuffer();
        sb.append((numLengthNum >> 23) & 0x1)
                .append((numLengthNum >> 22) & 0x1)
                .append((numLengthNum >> 21) & 0x1)
                .append((numLengthNum >> 20) & 0x1)
                .append((numLengthNum >> 19) & 0x1)
                .append((numLengthNum >> 18) & 0x1)
                .append((numLengthNum >> 17) & 0x1)
                .append((numLengthNum >> 16) & 0x1)
                .append((numLengthNum >> 15) & 0x1)
                .append((numLengthNum >> 14) & 0x1)
                .append((numLengthNum >> 13) & 0x1)
                .append((numLengthNum >> 12) & 0x1)
                .append((numLengthNum >> 11) & 0x1)
                .append((numLengthNum >> 10) & 0x1)
                .append((numLengthNum >> 9) & 0x1)
                .append((numLengthNum >> 8) & 0x1)
                .append((numLengthNum >> 7) & 0x1)
                .append((numLengthNum >> 6) & 0x1)
                .append((numLengthNum >> 5) & 0x1)
                .append((numLengthNum >> 4) & 0x1)
                .append((numLengthNum >> 3) & 0x1)
                .append((numLengthNum >> 2) & 0x1)
                .append((numLengthNum >> 1) & 0x1)
                .append((numLengthNum >> 0) & 0x1);
        ints[0] = Long.valueOf(sb.substring(0, 12), 2).intValue();
        ints[1] = Long.valueOf(sb.substring(12, 24), 2).intValue();
        return ints;
    }


    /**
     * 处理要素信息组信息
     */
    public static HashMap handleElementInfoGroupStr(HashMap elementInfoGroup, String elementInfoGroupStr) {
        //如果是图片
        if(elementInfoGroupStr.substring(0, 2).equals(IdentifierChartCEnum.F3.getHexStr())) {
            elementInfoGroup.put(IdentifierChartCEnum.getEnumByObj(elementInfoGroupStr.substring(0, 2)), elementInfoGroupStr.substring(2, elementInfoGroupStr.length()));
            elementInfoGroupStr = elementInfoGroupStr.substring(elementInfoGroupStr.length());
        }else if (elementInfoGroupStr.substring(0, 2).equals(IdentifierChartCEnum._09.getHexStr())) {
            //如果是闸门状态，单独加的，可能不符合协议
            int numLength = Integer.valueOf(elementInfoGroupStr.substring(4, 6));
            String a = "";
            for (int i = 1; i <= numLength; i++) {
                String b = elementInfoGroupStr.substring(6, 6 + numLength * 4).substring((i - 1) * 4, i * 4);
                a = a + Integer.valueOf(b.substring(0, 2)) + "." + Integer.valueOf(b.substring(2, 4)) + "|";
            }
            a = a.substring(0, a.length() - 1);
            elementInfoGroup.put(IdentifierChartCEnum.getEnumByObj(elementInfoGroupStr.substring(0, 2)), a);
            elementInfoGroupStr = elementInfoGroupStr.substring(6 + numLength * 4);
        } else {
            if (elementInfoGroupStr.substring(0, 2).equals(IdentifierChartCEnum.FF01.getHexStr().substring(0, 2))) {
                String numLength = elementInfoGroupStr.substring(4, 6);
                int[] ints = getDataAndDecimalsLength(numLength);
                elementInfoGroup.put(IdentifierChartCEnum.getEnumByObj(elementInfoGroupStr.substring(0, 4)),
                        elementInfoGroupStr.substring(6, 6 + ints[0] * 2 - ints[1]) + "." + elementInfoGroupStr.substring(6 + ints[0] * 2 - ints[1], 6 + ints[0] * 2));
                elementInfoGroupStr = elementInfoGroupStr.substring(6 + ints[0] * 2);
            }else {
                String numLength = elementInfoGroupStr.substring(2, 4);
                int[] ints = getDataAndDecimalsLength(numLength);
                elementInfoGroup.put(IdentifierChartCEnum.getEnumByObj(elementInfoGroupStr.substring(0, 2)),
                        elementInfoGroupStr.substring(4, 4 + ints[0] * 2 - ints[1]) + "." + elementInfoGroupStr.substring(4 + ints[0] * 2 - ints[1], 4 + ints[0] * 2));
                elementInfoGroupStr = elementInfoGroupStr.substring(4 + ints[0] * 2);
            }
        }
        if (elementInfoGroupStr.length() != 0) {
            handleElementInfoGroupStr(elementInfoGroup, elementInfoGroupStr);
        }
        return elementInfoGroup;
    }

    /**
     * 获取数据总长度以及小数长度
     */
    public static int[] getDataAndDecimalsLength(String numLength) {
        int[] ints = new int[2];
        String sb = CRC16Util.getBinaryByHex(numLength);
        ints[0] = Long.valueOf(sb.substring(0, 5), 2).intValue();
        ints[1] = Long.valueOf(sb.substring(5, 8), 2).intValue();
        return ints;
    }
}
