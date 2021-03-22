package com.hl.util.mvc;

import org.apache.shiro.SecurityUtils;
import org.springframework.web.bind.annotation.ModelAttribute;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

public class AbstractController {

    public ActionValues<String,Object> values = new ActionValues();

    @ModelAttribute
    public void getParam(HttpServletRequest request){
        Enumeration<String> parameterNames = request.getParameterNames();
        this.values = new ActionValues();
        while(parameterNames.hasMoreElements()){
            String key = parameterNames.nextElement();
            this.values.put(key,request.getParameter(key));
        }
        //分页参数
        if(values.containsKey("page") && values.containsKey("limit")){
            values.put("limit",values.getLimit());
            values.put("page",values.getPage());
            values.put("offset",(values.getPage() - 1) * values.getLimit());
            values.put("endset",(values.getPage()) * values.getLimit()-1);
        }
    }

    //protected User getUser() {
    //    return (User) SecurityUtils.getSubject().getPrincipal();
    //}
    //
    //public Integer getUserId() {
    //    return getUser().getUserId();
    //}

}
