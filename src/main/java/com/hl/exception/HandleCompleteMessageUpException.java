package com.hl.exception;

/**
 * @author xs
 * @date 2020/01/09 20:58
 */
public class HandleCompleteMessageUpException extends Exception{
    public HandleCompleteMessageUpException( String message) {
        super("处理上行完整报文异常："+message);
    }
}
