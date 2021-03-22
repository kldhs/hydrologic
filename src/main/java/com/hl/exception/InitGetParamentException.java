package com.hl.exception;

/**
 * @author xs
 * @date 2020/01/09 21:15
 */
public class InitGetParamentException extends HexBcdM1234MessageTextUpException {
    public InitGetParamentException(String message) {
        super("初始化获取参数异常："+message);
    }
}
