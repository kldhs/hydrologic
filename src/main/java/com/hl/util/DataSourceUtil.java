package com.hl.util;


import javax.sql.DataSource;
import java.sql.SQLException;

/**
 * 2020-1-15
 * @author hcs
 * 数据库
 */
public class DataSourceUtil {

    private static  String dataSourceName = null;
    /*
    获取当前连接的数据库的名称：sqlserver还是oracle
    * */
    public static String getDataSourceName(){
        if(dataSourceName == null){
            DataSource dataSource = (DataSource)SpringBootUtil.getBean("dataSource");
            String driverName="";
            try {
                driverName = dataSource.getConnection().getMetaData().getDriverName();
            } catch (SQLException e) {
                e.printStackTrace();
            }
            if(driverName.toLowerCase().contains("oracle")){
                dataSourceName = "oracle";
            }else if (driverName.toLowerCase().contains("sql server")){
                dataSourceName = "sqlserver";
            }else{
                dataSourceName = "mysql";

            }
        }
        return dataSourceName;
    }

}
