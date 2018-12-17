/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.service;

import java.security.SecureRandom;
import java.util.Base64;

/**
 *
 * @author Erno
 */
public class Tokeniser {
    
    
    public static String createToken() {
        SecureRandom sr = new SecureRandom();
        byte bytes[] = new byte[128];
        sr.nextBytes(bytes);
        Base64.Encoder encoder = Base64.getUrlEncoder().withoutPadding();
        String token = encoder.encodeToString(bytes);
        return token;
    }
}
