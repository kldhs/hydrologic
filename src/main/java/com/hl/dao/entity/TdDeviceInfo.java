package com.hl.dao.entity;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.*;

@Table(name = "td_deviceinfo")
public class TdDeviceInfo implements Serializable {
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
     * 设备名称
     */
    @Column(name = "dev_name")
    private String devName;

    /**
     * 设备ip
     */
    @Column(name = "ip")
    private String ip;

    /**
     * 设备编码格式（ASCII或HEXBCD）
     */
    @Column(name = "dev_codeformat")
    private String devCodeformat;

    /**
     * 设备编码模式（M1/2/3/4）
     */
    @Column(name = "dev_codeschema")
    private String devCodeschema;

    /**
     * 设备位置（设备真实位置，**省**市）
     */
    @Column(name = "dev_location")
    private String devLocation;

    /**
     * 创建时间
     */
    @Column(name = "create_time")
    private Date createTime;

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
     * 获取设备名称
     *
     * @return dev_name - 设备名称
     */
    public String getDevName() {
        return devName;
    }

    /**
     * 设置设备名称
     *
     * @param devName 设备名称
     */
    public void setDevName(String devName) {
        this.devName = devName == null ? null : devName.trim();
    }

    /**
     * 获取设备编码格式（ASCII或HEXBCD）
     *
     * @return dev_codeformat - 设备编码格式（ASCII或HEXBCD）
     */
    public String getDevCodeformat() {
        return devCodeformat;
    }

    /**
     * 设置设备编码格式（ASCII或HEXBCD）
     *
     * @param devCodeformat 设备编码格式（ASCII或HEXBCD）
     */
    public void setDevCodeformat(String devCodeformat) {
        this.devCodeformat = devCodeformat == null ? null : devCodeformat.trim();
    }

    /**
     * 获取设备编码模式（M1/2/3/4）
     *
     * @return dev_codeschema - 设备编码模式（M1/2/3/4）
     */
    public String getDevCodeschema() {
        return devCodeschema;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    /**
     * 设置设备编码模式（M1/2/3/4）
     *
     * @param devCodeschema 设备编码模式（M1/2/3/4）
     */
    public void setDevCodeschema(String devCodeschema) {
        this.devCodeschema = devCodeschema == null ? null : devCodeschema.trim();
    }

    /**
     * 获取设备位置（设备真实位置，**省**市）
     *
     * @return dev_location - 设备位置（设备真实位置，**省**市）
     */
    public String getDevLocation() {
        return devLocation;
    }

    /**
     * 设置设备位置（设备真实位置，**省**市）
     *
     * @param devLocation 设备位置（设备真实位置，**省**市）
     */
    public void setDevLocation(String devLocation) {
        this.devLocation = devLocation == null ? null : devLocation.trim();
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
}
