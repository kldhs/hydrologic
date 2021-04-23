package com.hl.util;

import com.hl.pojo.ConfigsPoJo;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author xs
 * @date 2021/04/20 21:34
 */
public class HandlePicture {
    public static byte[] readPicture(String url) {
        File file = new File("文件路径");
        File[] filelist = file.listFiles();
        for (int i = 0; i < filelist.length; i++) {
            long newtime = System.currentTimeMillis();
            long txttime = filelist[i].lastModified();//遍历的文件时间
            System.err.println("系统时间：" + newtime);
            System.err.println("文件创建时间：" + txttime);
            long time = newtime - txttime;
            if ((time / (1000 * 60 * 60 * 24)) > 7) {
                boolean b = filelist[i].delete();
                if (b) {
                    System.err.println(filelist[i].getName() + "删除成功");
                }
            }
        }
        return null;
    }

    /**
     * 创建图片返回该图片完整地址
     * @param aa
     * @param pictureName
     * @return
     * @throws IOException
     */
    public static String  writePicture(byte[] aa, String pictureName) throws IOException {
        FileOutputStream out = null;
        String dateNowStr = new SimpleDateFormat("yyyyMMdd").format(new Date());
        String dirPath = new ConfigsPoJo().getPlaceImagesPath() + "/" + dateNowStr;
        try {
            File dir = new File(dirPath);
            judeDirExists(dir);
            File resultPicture = new File(dirPath + pictureName);//要写入的图片
            judeFileExists(resultPicture);
            out = new FileOutputStream(resultPicture);// 指定要写入的图片
            out.write(aa);// 将读取的内容，写入到输出流当中
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //执行完以上后，磁盘下的该文件才完整，大小是实际大小
            out.close();// 关闭输入输出流
        }
        return dirPath + pictureName;
    }

    /**
     * 判断文件夹是否存在
     */
    public static void judeDirExists(File file) {
        if (file.exists()) {
            if (file.isDirectory()) {
                System.out.println("dir exists");
            } else {
                System.out.println("the same name file exists, can not create dir");
            }
        } else {
            System.out.println("dir not exists, create it ...");
            file.mkdir();
        }
    }

    /**
     * 判断文件是否存在
     */
    public static void judeFileExists(File file) {
        if (file.exists()) {
            System.out.println("file exists");
        } else {
            System.out.println("file not exists, create it ...");
            try {
                file.createNewFile();
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }

    }

}
