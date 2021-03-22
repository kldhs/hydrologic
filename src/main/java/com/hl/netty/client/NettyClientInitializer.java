package com.hl.netty.client;

import io.netty.channel.ChannelInitializer;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.socket.SocketChannel;

/**
 * @author xs
 * @date 2020/11/39 10:23
 */
public class NettyClientInitializer extends ChannelInitializer<SocketChannel> {

    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
        //加入编码器
        //pipeline.addLast(new MyMessageEncoder());
        //加入解码器
        //pipeline.addLast(new MyMessageDecoder());
        pipeline.addLast(new NettyClientHandler());
    }
}
