/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.cdi.espoo.decorator;

import javax.decorator.Decorator;
import javax.decorator.Delegate;
import javax.enterprise.inject.Any;
import javax.inject.Inject;

/**
 *
 * @author Erno
 */
@Decorator
public class MessageDecorator implements IMessage {

    @Inject @Delegate @MessageQualifier IMessage message; 
    
    @Override
    public String deliverMessage(String target) {
        System.out.println("Decorator");
        return message.deliverMessage(target + ", this part from the decorator!");    }
    
}
