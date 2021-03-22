package com.hl.util.validator;

import com.hl.util.exception.RRException;
import org.apache.commons.lang.StringUtils;

/**
 * 数据校验
 * @author honghu cloud
 * @technology +QQ： 2170983087
 * @date 2017-03-23 15:50
 */
public abstract class Assert {

    public static void isBlank(String str, String message) {
        if (StringUtils.isBlank(str)) {
            throw new RRException(message);
        }
    }

    public static void isNull(Object object, String message) {
        if (object == null) {
            throw new RRException(message);
        }
    }
}
