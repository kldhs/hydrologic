package com.hl.exception;

/**
 * @author xs
 * @date 2020/01/13 17:04
 */
public class DbOperationException extends HexBcdM1234MessageTextUpException {
    public DbOperationException(String message) {
        super("数据库操作异常：" + message);
    }
}
