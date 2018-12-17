/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp;


import com.opiframe.spring.boot.shoppingapp.service.UserService;
import java.io.IOException;
import java.util.Enumeration;
import org.springframework.stereotype.Component;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;

/**
 *
 * @author Erno
 */
@Component
public class LoginFilter implements Filter {

    @Autowired
    private UserService service;
    
    @Bean
    public FilterRegistrationBean myFilterBean(LoginFilter filter) {
        FilterRegistrationBean myBean = new FilterRegistrationBean();
        myBean.setFilter(filter);
        myBean.addUrlPatterns("/api/*");
        myBean.setEnabled(true);
        myBean.setName("MyBean");
        myBean.setAsyncSupported(true);
        myBean.setOrder(1);
        return myBean;
    }
    
    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain fc) throws IOException, ServletException {
        boolean isFound = false;
        HttpServletRequest httpReq = (HttpServletRequest) req;
        HttpServletResponse httpRes = (HttpServletResponse) res;
        Enumeration headerNames = httpReq.getHeaderNames();
        while(headerNames.hasMoreElements()) {
            String header = (String)headerNames.nextElement();
            if("token".equals(header)) {
                if(service.isUserLogged(httpReq.getHeader("token"))) {
                       fc.doFilter(req, res);
                       isFound = true;
                } 
            } 
        }
        if(!isFound) {
            httpRes.sendError(403);
        }
    }


}
