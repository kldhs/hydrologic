package com.hl.exception;

/**
 * @author xs
 * @date 2020/01/13 17:04
 */
public class CheckCodeException extends HexBcdM1234MessageTextUpException {
    public CheckCodeException(String message) {
        super("校验码异常：" + message);
    }
}
