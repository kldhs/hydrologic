package com.hl.util.mvc;

import com.hl.util.DateUtil;

import java.util.Date;
import java.util.HashMap;

public class ActionValues<K,V> extends HashMap<K,V> {

    public Integer getInt(String str){
        if(this.containsKey(str)){
            return Integer.parseInt(this.get(str).toString());
        }else{
            return null;
        }
    }

    public String getStr(String str){
        if(this.containsKey(str)){
            return this.get(str).toString();
        }else{
            return null;
        }
    }

    public Date getDate(String str){
        if(this.containsKey(str)){
            return DateUtil.convert2Date(this.get(str).toString(),"yyyy-MM-dd hh:mm:ss");
        }else{
            return null;
        }
    }

    public Integer getLimit(){
        if(this.containsKey("limit") && this.get("limit")!=null && !this.get("limit").equals("") ){
            return Integer.parseInt(this.get("limit").toString());
        }else{
            return 6;
        }
    }

    public Integer getPage(){
        if(this.containsKey("page") && this.get("page")!=null && !this.get("page").equals("")){
            return Integer.parseInt(this.get("page").toString());
        }else{
            return 1;
        }
    }
}
