package com.hl.exception;

/**
 * @author xs
 * @date 2020/01/14 14:19
 */
public class HandleHexBcdM1234UpException extends HexBcdM1234MessageTextUpException {
    public HandleHexBcdM1234UpException(String message) {
        super("处理单次接收的报文时的异常:"+message);
    }
}
