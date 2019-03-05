/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.cdi.espoo.decorator;

import javax.enterprise.context.RequestScoped;

/**
 *
 * @author Erno
 */
@MessageQualifier
@RequestScoped
public class MessageGenerator implements IMessage{

    @Override
    public String deliverMessage(String target) {
        return "Hello, "+target;
    }
    
    
}
