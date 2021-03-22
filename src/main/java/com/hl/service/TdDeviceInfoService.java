package com.hl.service;

import com.hl.dao.entity.TdDeviceInfo;
import com.hl.dao.mapper.TdDeviceInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

/**
 * @author xs
 * @date 2020/12/22 11:52
 */
@Service
public class TdDeviceInfoService {
    @Autowired
    TdDeviceInfoMapper tdDeviceInfoMapper;

    public TdDeviceInfo getTdDeviceInfoByDevSn(String devSn) {
        Example example = new Example(TdDeviceInfo.class);
        Example.Criteria criteria = example.createCriteria();
        criteria.andEqualTo("devSn", devSn);
        return tdDeviceInfoMapper.selectOneByExample(example);
    }

    public void updateIp(TdDeviceInfo tdDeviceInfo, String ip) {
        TdDeviceInfo tdDeviceInfoByDevSn = tdDeviceInfoMapper.selectByPrimaryKey(tdDeviceInfo.getId());
        tdDeviceInfoByDevSn.setIp(ip);
        tdDeviceInfoMapper.updateByPrimaryKey(tdDeviceInfoByDevSn);
    }

    public List<TdDeviceInfo> selectAll() {
        return tdDeviceInfoMapper.selectAll();
    }

}
