package com.hl.dao.mapper;

import com.hl.dao.entity.TdDevData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface TdDevDataMapper extends AdmDao<TdDevData> {
    void insertByMyself(@Param("a") String tdDevDataTableName,@Param("b") TdDevData tdDevData);
}
