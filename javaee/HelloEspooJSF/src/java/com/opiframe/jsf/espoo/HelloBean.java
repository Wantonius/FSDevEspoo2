/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.jsf.espoo;

import javax.inject.Named;
import javax.enterprise.context.RequestScoped;

/**
 *
 * @author Erno
 */
@Named(value = "helloBean")
@RequestScoped
public class HelloBean {

    private String name = "Erno";
    /**
     * Creates a new instance of HelloBean
     */
    public HelloBean() {
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }
    
}
