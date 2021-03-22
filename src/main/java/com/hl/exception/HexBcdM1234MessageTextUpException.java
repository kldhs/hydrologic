package com.hl.exception;

/**
 * @author xs
 * @date 2020/01/09 20:58
 */
public class HexBcdM1234MessageTextUpException extends Exception{
    public HexBcdM1234MessageTextUpException( String message) {
        super("处理正文异常："+message);
    }
}
