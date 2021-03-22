package com.hl.util;

import com.hl.dao.entity.TdDeviceInfo;
import com.hl.service.TdDeviceInfoService;

import java.util.HashMap;

/**
 * @author xs
 * @date 2019/09/11 10:01
 */
public class SystemInit {
    public static HashMap<String , TdDeviceInfo> tdDeviceInfoSnMap =new HashMap<>();
    public static HashMap<String , TdDeviceInfo> tdDeviceInfoIpMap =new HashMap<>();

    public static void init(){
        TdDeviceInfoService tdDeviceInfoService = SpringBootUtil.getBean(TdDeviceInfoService.class);
        for (TdDeviceInfo tdDeviceInfo:tdDeviceInfoService.selectAll()) {
            if(tdDeviceInfoSnMap.get(tdDeviceInfo.getDevSn())==null){
                tdDeviceInfoSnMap.put(tdDeviceInfo.getDevSn(),tdDeviceInfo);
            }else{
                LogUtil.nettyError("-------异常-------"+"tdDeviceInfoSnMap初始化异常，数据库配置中存在相同的设备号："+tdDeviceInfo.getDevSn());
            }
            if(tdDeviceInfoIpMap.get(tdDeviceInfo.getIp())==null){
                tdDeviceInfoIpMap.put(tdDeviceInfo.getIp(),tdDeviceInfo);
            }else{
                LogUtil.nettyError("-------异常-------"+"tdDeviceInfoIpMap初始化异常，数据库配置中存在相同的ip："+tdDeviceInfo.getIp());
            }
        }
    }
}
