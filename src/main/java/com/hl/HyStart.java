package com.hl;

import com.hl.netty.server.NettyServer;
import com.hl.util.CRC16Util;
import com.hl.util.SystemInit;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class HyStart {

    public static void main(String[] args) {
        //String binaryByHex = CRC16Util.getBinaryByHex("000004A1");
        //System.out.println(binaryByHex);
        SpringApplication.run(HyStart.class, args);
        final int PORT = Integer.parseInt(System.getProperty("port", "7000"));
        SystemInit.init();
        NettyServer.startNettyServer(PORT);
    }
}
