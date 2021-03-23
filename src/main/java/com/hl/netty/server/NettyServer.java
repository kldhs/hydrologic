package com.hl.netty.server;

import com.hl.util.LogUtil;
import io.netty.bootstrap.ServerBootstrap;
import io.netty.channel.ChannelFuture;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelOption;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.socket.nio.NioServerSocketChannel;
import java.net.InetAddress;
import java.util.HashMap;

/**
 * Echoes back any received data from a client.
 *
 * @author xs
 * @date 2020/11/30 10:33
 */
public final class NettyServer {

    /**
     *  存放所有连接上来的ChannelHandlerContext
     */
    public static HashMap<String , ChannelHandlerContext > channelHandlerContextMap =new HashMap<>();

    public static void startNettyServer(int port) {
        // Configure the server.
        EventLoopGroup bossGroup = new NioEventLoopGroup(1);
        EventLoopGroup workerGroup = new NioEventLoopGroup();
        try {
            ServerBootstrap b = new ServerBootstrap();
            b.group(bossGroup, workerGroup)
                    .channel(NioServerSocketChannel.class)
                    .option(ChannelOption.SO_BACKLOG, 100)
//                    .handler(new LoggingHandler(LogLevel.INFO))
                    .childHandler(
                            //自定义初始化
                            new NettyServerInitializer()
                    );
            // Start the server.
            ChannelFuture channelFuture = b.bind(port).sync();
            LogUtil.nettyInfo("----netty服务端----"+"netty服务端已经开启，服务端ip为："+ InetAddress.getLocalHost().toString().split("/")[1]+" 服务端端口为："+port);
            // Wait until the server socket is closed.
            channelFuture.channel().closeFuture().sync();
        } catch (Exception e) {
            e.printStackTrace();
            LogUtil.nettyPrintStackTrace("异常",e);
        } finally {
            // Shut down all event loops to terminate all threads.
            bossGroup.shutdownGracefully();
            workerGroup.shutdownGracefully();
        }
    }
}
