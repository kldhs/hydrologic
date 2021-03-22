package com.hl.netty.server;

import com.hl.netty.upmessagehandler.decoder.PackageSpliter;
import com.hl.util.CRC16Util;
import com.hl.util.LogUtil;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;
import io.netty.util.concurrent.DefaultEventExecutorGroup;
import io.netty.util.concurrent.EventExecutorGroup;

/**
 * ChannelInitializer自定义初始化
 *
 * @author xs
 * @date 2020/11/30 10:43
 */
public class NettyServerInitializer extends ChannelInitializer<SocketChannel> {

    /**
     * 创建业务线程池
     */
    static final EventExecutorGroup group = new DefaultEventExecutorGroup(16);

    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        LogUtil.nettyInfo("----------netty服务端----------"+"连接建立，客户端为:"+ch.remoteAddress()+" 服务端:"+ch.localAddress().toString().replace("/","")+"开始初始化Channel。");
        ChannelPipeline pipeline = ch.pipeline();
        //处理粘包、拆包
        pipeline.addLast(new PackageSpliter(Unpooled.copiedBuffer(CRC16Util.HexString2Bytes("7E7E")),Integer.MAX_VALUE, 12, 1, 1, 0, 3) );
        //pipeline.addLast(new HeaderDecoder(Integer.MAX_VALUE,Unpooled.copiedBuffer(CRC16Util.HexString2Bytes("7E7E"))));
        //自定义server端处理类
        pipeline.addLast(new NettyServerHandler());
        //处理耗时业务的 方式1：Context中添加线程池。
        //说明: 如果我们在addLast 添加handler ，前面有指定EventExecutorGroup, 那么该handler 会优先加入到该线程池中
        //p.addLast(group, new EchoServerHandler());

    }
}
