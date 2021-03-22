package com.hl.netty.upmessagehandler.decoder;

import io.netty.buffer.ByteBuf;
import io.netty.handler.codec.DelimiterBasedFrameDecoder;

/**
 * @author xs
 * @date 2020/12/22 23:33
 * 报文头拆包器
 */
public class HeaderDecoder extends DelimiterBasedFrameDecoder {

    public HeaderDecoder(int maxFrameLength, ByteBuf delimiter) {
        super(maxFrameLength, delimiter);
    }
}
