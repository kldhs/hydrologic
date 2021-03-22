package com.hl.dao.mapper;

/**
 * @author xs
 * @date 2019/10/16 15:25
 */

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

public interface AdmDao<T> extends Mapper<T>, MySqlMapper<T> {

}
