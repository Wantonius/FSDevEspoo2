/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.service;

import com.opiframe.spring.boot.shoppingapp.data.User;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

/**
 *
 * @author Erno
 */
@Service
public class UserService {
    
    private final Map<String,User> loggedUsers;
    private final List<User> registeredUsers;
    
    public UserService(){
        loggedUsers = new HashMap<>();
        registeredUsers = new ArrayList<>();
    }
    
    public boolean register(User user) {
       if(user.getUsername() == null || user.getUsername().length() == 0) {
           return false;
       }
       if(user.getPassword() == null || user.getPassword().length() == 0) {
           return false;
       }        
       for(User u:registeredUsers) {
           if(u.getUsername().equals(user.getUsername())) {
               return false;
           }
       }
       registeredUsers.add(user);
       return true;
    }
    
    public String login(User user) {
        if(user.getUsername() == null || user.getUsername().length() == 0) {
           return "";
       }
       if(user.getPassword() == null || user.getPassword().length() == 0) {
           return "";
       }
       for(User u:registeredUsers) {
           if(u.getUsername().equals(user.getUsername())) {
               if(u.getPassword().equals(user.getPassword())) {
                   String token = Tokeniser.createToken();
                   loggedUsers.put(token, user);
                   return token;
               }
           }
       }
       return "";
    }
    
    public boolean logout(String token) {
        if(loggedUsers.containsKey(token)) {
            loggedUsers.remove(token);
            return true;
        }
        return false;
    }
    
    public boolean isUserLogged(String token) {
        if(loggedUsers.containsKey(token)) {
            return true;
        }
        return false;
    }
}
