package com.hl.netty.client;

import com.hl.util.CRC16Util;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerAdapter;
import io.netty.channel.ChannelHandlerContext;

import java.nio.charset.Charset;

/**
 * Handler implementation for the echo client.  It initiates the ping-pong traffic between the echo client and server by sending the first message to the server.
 *
 * @author xs
 * @date 2020/11/30 9:28
 */
public class NettyClientHandler extends ChannelHandlerAdapter {

    private final ByteBuf firstMessage;

    /**
     * Creates a client-side handler.
     */
    public NettyClientHandler() {
        firstMessage = Unpooled.buffer(NettyClient.SIZE);
        for (int i = 0; i < firstMessage.capacity(); i++) {
            firstMessage.writeByte((byte) i);
        }
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) {

        //给服务器发消息
        for (int i = 0; i < 1; i++) {
            //ctx.writeAndFlush(Unpooled.copiedBuffer(
            //        ("7E7E011802832372000032002B020568201125180042F1F1180283237248F0F020112518002019000300261901883039230000351038121281031B63").getBytes()));

//            ByteBuf byteBuf = Unpooled.copiedBuffer(CRC16Util.HexString2Bytes("FF0401020304"));
            String aa = ("7E7E013119903047123432003F020473210323134538F1F1311990304748F0F02103231345272B0000000000371B000000392300000000FF01280000000000FF020800381214104520000004A103D3F1").replace(" ", "");
//            String aa = "7E7E011802832372000032002B020568201125180042F1F1180283237248F0F020112518002019000300261901883039230000351038121281031B63";
            ByteBuf byteBuf = Unpooled.copiedBuffer(CRC16Util.HexString2Bytes(aa));
            //ByteBuf byteBuf = Unpooled.copiedBuffer(CRC16Util.HexString2Bytes("011802832371000032002B02008E201222107E7E1541F1F1180283237148F0F0201222101522190000007E7E201900000039230000771038121320035B147E7E"));
            //ByteBuf byteBuf1 = Unpooled.copiedBuffer("0401020304".getBytes());
            //byte[] bytes = ("0401020304").getBytes();

            ctx.writeAndFlush(byteBuf);
            System.out.println("1111111111");

        }
//        ctx.writeAndFlush(CRC16Util.getcmdStr
//        ("7E7E011802832372000032002B020568201125180042F1F1180283237248F0F020112518002019000300261901883039230000351038121281031B63"));
    }

    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) {
        //接收服务器消息
        ByteBuf buf = (ByteBuf) msg;
        byte[] bytes = new byte[buf.readableBytes()];
        buf.readBytes(bytes);
        String s = new String(bytes, Charset.forName("UTF-8"));
        System.out.println("s=" + s);
    }

    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) {
        ctx.flush();
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // Close the connection when an exception is raised.
        //cause.printStackTrace();
        ctx.close();
    }
}
