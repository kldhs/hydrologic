package com.hl.netty.upmessagehandler.decoder;
import io.netty.buffer.ByteBuf;
/**
 * @author xs
 * @date 2020/11/30 09:39 处理粘包、拆包 固定长度的拆包器：FixedLengthFrameDecoder，行拆包器：LineBasedFrameDecoder，分隔符拆包器：DelimiterBasedFrameDecoder，基于数据包长度的拆包器：
 * LengthFieldBasedFrameDecoder
 */

public class PackageSpliter extends HydrologicDecoder {

    /**
     * @param headerCode 报文起始符
     * @param maxFrameLength 报文最大长度
     * @param lengthFieldOffset 报文长度偏移量
     * @param lengthFieldLength 报文长度字节数
     * @param lengthAdjustment
     * @param initialBytesToStrip
     * @param enderCodeLength 报文结束符
     */
    public PackageSpliter(ByteBuf headerCode, int maxFrameLength, int lengthFieldOffset, int lengthFieldLength, int lengthAdjustment, int initialBytesToStrip,
            int enderCodeLength) {
        super(headerCode, maxFrameLength, lengthFieldOffset, lengthFieldLength, lengthAdjustment, initialBytesToStrip, enderCodeLength);
    }

    ///**
    // * 最大字节程度，非固定长度拆包器此参数为：Integer.MAX_VALUE
    // */
    //private int maxFrameLength;
    ///**
    // * 分隔符
    // */
    //private ByteBuf delimiter;
    //
    //public PackageSpliter(int maxFrameLength, ByteBuf delimiter) {
    //    super(maxFrameLength, delimiter);
    //    this.maxFrameLength = maxFrameLength;
    //    this.delimiter = delimiter;
    //}
    //
    //public int getMaxFrameLength() {
    //    return maxFrameLength;
    //}
    //
    //public void setMaxFrameLength(int maxFrameLength) {
    //    this.maxFrameLength = maxFrameLength;
    //}
    //
    //public ByteBuf getDelimiter() {
    //    return delimiter;
    //}
    //
    //public void setDelimiter(ByteBuf delimiter) {
    //    this.delimiter = delimiter;
    //}
}
