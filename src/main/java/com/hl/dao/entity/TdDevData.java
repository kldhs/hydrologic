package com.hl.dao.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Table(name = "td_devdata")
public class TdDevData implements Serializable {

    /**
     * 序号ID
     */
    @Id
    private Integer id;

    /**
     * 设备编号(报文中遥测站地址)
     */
    @Column(name = "dev_sn")
    private String devSn;

    /**
     * 数据采集时间
     */
    @Column(name = "read_time")
    private Date readTime;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

    /**
     * 序列号
     */
    @Column(name = "serial_number")
    private String serialNumber;

    /**
     * 功能码
     */
    @Column(name = "function_code")
    private String functionCode;

    /**
     * 遥测站分类码HEX编码(以逗号分隔)
     */
    @Column(name = "channel")
    private String channel;

    /**
     * 遥测站采集数据(以逗号分隔，与编码一一对应)
     */
    @Column(name = "value")
    private String value;

    private static final long serialVersionUID = 1L;

    /**
     * 获取序号ID
     *
     * @return id - 序号ID
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置序号ID
     *
     * @param id 序号ID
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取设备编号(报文中遥测站地址)
     *
     * @return dev_sn - 设备编号(报文中遥测站地址)
     */
    public String getDevSn() {
        return devSn;
    }

    /**
     * 设置设备编号(报文中遥测站地址)
     *
     * @param devSn 设备编号(报文中遥测站地址)
     */
    public void setDevSn(String devSn) {
        this.devSn = devSn == null ? null : devSn.trim();
    }

    /**
     * 获取数据采集时间
     *
     * @return read_time - 数据采集时间
     */
    public Date getReadTime() {
        return readTime;
    }

    /**
     * 设置数据采集时间
     *
     * @param readTime 数据采集时间
     */
    public void setReadTime(Date readTime) {
        this.readTime = readTime;
    }

    /**
     * 获取创建时间
     *
     * @return create_time - 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置创建时间
     *
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getFunctionCode() {
        return functionCode;
    }

    public void setFunctionCode(String functionCode) {
        this.functionCode = functionCode;
    }

    /**
     * 获取遥测站分类码HEX编码(以逗号分隔)
     *
     * @return channel - 遥测站分类码HEX编码(以逗号分隔)
     */
    public String getChannel() {
        return channel;
    }

    /**
     * 设置遥测站分类码HEX编码(以逗号分隔)
     *
     * @param channel 遥测站分类码HEX编码(以逗号分隔)
     */
    public void setChannel(String channel) {
        this.channel = channel == null ? null : channel.trim();
    }

    /**
     * 获取遥测站采集数据(以逗号分隔，与编码一一对应)
     *
     * @return value - 遥测站采集数据(以逗号分隔，与编码一一对应)
     */
    public String getValue() {
        return value;
    }

    /**
     * 设置遥测站采集数据(以逗号分隔，与编码一一对应)
     *
     * @param value 遥测站采集数据(以逗号分隔，与编码一一对应)
     */
    public void setValue(String value) {
        this.value = value == null ? null : value.trim();
    }

}
