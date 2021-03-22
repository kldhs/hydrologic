package com.hl.util;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * @author xs
 * @date 2019/10/18 13:24 配置文件初始化类
 */
public class ConfigFileInit {

    private static Properties properties;

    public static Properties getProperties() {
        if (properties == null) {
            init();
        }
        return properties;
    }

    public static void init() {
        String fileName = "configs.properties";
        try {
            properties = new Properties();
            //InputStream in = ClassLoader.getSystemResourceAsStream(fileName);
            //InputStream in = new ClassPathResource(fileName).getInputStream();
            InputStream in = ConfigFileInit.class.getClassLoader().getResourceAsStream(fileName);
            properties.load(in);
        } catch (IOException e) {
            System.err.println("未正确读取到地图文件请检查src/main/resources路径下的configs.properties配置文件");
        }
    }

}
