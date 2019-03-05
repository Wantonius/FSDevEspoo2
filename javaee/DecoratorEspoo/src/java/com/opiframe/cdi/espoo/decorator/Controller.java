/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.cdi.espoo.decorator;

import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

/**
 *
 * @author Erno
 */
@Named(value = "controller")
@RequestScoped
public class Controller {

    @Inject @MessageQualifier IMessage messageGenerator;
    
    private String target;
    private String message;
    /**
     * Creates a new instance of Controller
     */
    public Controller() {
    }

    /**
     * @return the target
     */
    public String getTarget() {
        return target;
    }

    /**
     * @param target the target to set
     */
    public void setTarget(String target) {
        this.target = target;
    }

    /**
     * @return the message
     */
    public String getMessage() {
        return this.messageGenerator.deliverMessage(target);
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }
    
}
