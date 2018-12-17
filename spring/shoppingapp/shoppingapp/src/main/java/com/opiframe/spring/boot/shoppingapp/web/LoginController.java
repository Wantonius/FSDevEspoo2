/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.web;

import com.opiframe.spring.boot.shoppingapp.data.User;
import com.opiframe.spring.boot.shoppingapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Erno
 */
@RestController
public class LoginController {
    
    
    @Autowired
    private UserService service;

    @RequestMapping(value="/login", method=RequestMethod.POST)
    public ResponseEntity<String> login(@RequestBody User user) {
           String responseString = "";
           responseString = service.login(user);
           if("".equals(responseString)) {
               return new ResponseEntity("{\"message\":\"Wrong username or password\"}",HttpStatus.FORBIDDEN);
           } else {
               return new ResponseEntity("{\"token\":\""+responseString+"\"}",HttpStatus.OK);              
           }
    }
    
    @RequestMapping(value="/register", method=RequestMethod.POST)
    public ResponseEntity<String> register(@RequestBody User user) {
        if(service.register(user)) {
            return new ResponseEntity("{\"message\":\"Success\"}",HttpStatus.OK);          
        } else {
            return new ResponseEntity("{\"message\":\"Username already in use\"}",HttpStatus.FORBIDDEN);
        }
    }
    
    @RequestMapping(value="/logout", method=RequestMethod.POST)
    public ResponseEntity<String> logout(@RequestHeader(value="token") String token) {
        if(service.logout(token)) {
            return new ResponseEntity("{\"message\":\"Success\"}",HttpStatus.OK);        
        } else {
            return new ResponseEntity("{\"message\":\"not found\"}",HttpStatus.NOT_FOUND);
        }
    }
}
