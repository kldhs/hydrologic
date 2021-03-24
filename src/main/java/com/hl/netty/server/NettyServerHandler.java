package com.hl.netty.server;

import com.hl.netty.upmessagehandler.HandleFullMessage;
import com.hl.util.CRC16Util;
import com.hl.util.LogUtil;
import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandler.Sharable;
import io.netty.channel.ChannelHandlerAdapter;
import io.netty.channel.ChannelHandlerContext;
import io.netty.util.concurrent.DefaultEventExecutorGroup;
import io.netty.util.concurrent.EventExecutorGroup;

import java.util.concurrent.Callable;

/**
 * Handler implementation for the echo server.
 *
 * @author xs
 * @date 2020/11/30 10:31
 */
@Sharable
public class NettyServerHandler extends ChannelHandlerAdapter {

    /**
     * 创建业务线程池，可以将任务提交到该线程池
     */
    static final EventExecutorGroup group = new DefaultEventExecutorGroup(16);


    /**
     * 每一次读取到合格的单个报文，会调用此方法
     *
     * @param ctx
     * @param msg
     * @throws Exception
     */
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        //System.out.println("EchoServer Handler 的线程是=" + Thread.currentThread().getName());

        //方式1：接收客户端消息之后，不开启线程去处理，如果有多个客户端同时发送消息，
        //此时使用的线程为 NioEventLoopGroup 的线程。
        /*ByteBuf buf = (ByteBuf) msg;
        byte[] bytes = new byte[buf.readableBytes()];
        buf.readBytes(bytes);
        String body = new String(bytes, "UTF-8");
        //休眠10秒
        Thread.sleep(10 * 1000);
        System.out.println("普通调用方式的 线程是=" + Thread.currentThread().getName());
        ctx.writeAndFlush(Unpooled.copiedBuffer("hello, 客户端~(>^ω^<)喵2", CharsetUtil.UTF_8));*/

        //方式2：接收客户端消息之后，开启线程去处理，如果有多个客户端同时发送消息，
        //此时使用的线程 依然 为 NioEventLoopGroup 的线程。(方式1与方式2好像一样？)
        /*ctx.channel().eventLoop().execute(new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(5 * 1000);
                    //输出线程名
                    System.out.println("EchoServerHandler execute 线程2是=" + Thread.currentThread().getName());
                    ctx.writeAndFlush(Unpooled.copiedBuffer("hello, 客户端~(>^ω^<)喵2", CharsetUtil.UTF_8));
                } catch (Exception ex) {
                    System.out.println("发生异常" + ex.getMessage());
                }
            }
        });*/

        //方式3（处理耗时业务的 方式2）：接收客户端消息之后，使用 DefaultEventExecutorGroup 线程去处理，
        //这种方式使用线程与 NioEventLoopGroup 并非同一个线程，能减少等待时间 资源最大化
        group.submit(new Callable<Object>() {
            @Override
            public Object call() throws Exception {
                try {
                    //接收客户端信息
                    ByteBuf buf = (ByteBuf) msg;
                    byte[] bytes = new byte[buf.readableBytes()];
                    buf.readBytes(bytes);
                    String messageHex = CRC16Util.bytesToHex(bytes).toUpperCase();
                    LogUtil.nettyInfo("----netty服务端----" + "接收到来自 " + (ctx.channel().remoteAddress()).toString().replace("/", "") + "的byte数组转换为Hex字符串为：" + messageHex);
                    String a = HandleFullMessage.handlefullmessage(messageHex, (ctx.channel().remoteAddress()).toString().replace("/", ""));
                    if(a!=null){
                        LogUtil.nettyInfo("----netty服务端----" + "回复报文,向 " + (ctx.channel().remoteAddress()).toString().replace("/", "") + "地址发送的Hex字符串为：" + a);
                        ByteBuf byteBuf = Unpooled.copiedBuffer(CRC16Util.HexString2Bytes(a));
                        ctx.writeAndFlush(byteBuf);
                    }
                } catch (Exception e) {
                    LogUtil.nettyPrintStackTrace("异常",e);
                    e.printStackTrace();
                }
                return null;
            }
        });
        //LogUtil.nettyInfo("----netty服务端----"+"处理"+ctx.channel().remoteAddress()+"的 DefaultEventExecutorGroup 线程结束");
    }

    /**
     * 当读取到的数据不是计算得出(如果有设置decoder，这是通过decoder计算；如果没设置，通过时间间隔计算？)的数据结尾时，会调用此方法
     *
     * @param ctx
     */
    @Override
    public void channelReadComplete(ChannelHandlerContext ctx) {
        ctx.flush();
    }

    @Override
    public void channelInactive(ChannelHandlerContext ctx) {
        NettyServer.channelHandlerContextMap.remove(ctx.channel().remoteAddress().toString().replace("/", ""));
        LogUtil.nettyError("----netty服务端----" + " 客户端:" + ctx.channel().remoteAddress() + "信道已经处于 非活跃 状态");
    }

    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        NettyServer.channelHandlerContextMap.put(ctx.channel().remoteAddress().toString().replace("/", ""), ctx);
        LogUtil.nettyError("----netty服务端----" + " 客户端:" + ctx.channel().remoteAddress() + "信道已经处于 活跃 状态");
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // Close the connection when an exception is raised.
        cause.printStackTrace();
        LogUtil.nettyError("----netty服务端----" + cause.getMessage());
        LogUtil.nettyError("----netty服务端----" + "连接断开，服务端:" + ctx.channel().localAddress() + " 客户端:" + ctx.channel().remoteAddress());
        ctx.close();
    }


}
