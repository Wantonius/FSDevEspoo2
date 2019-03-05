/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.jsf.converter.espoo;

import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;

/**
 *
 * @author Erno
 */
@Named(value = "myController")
@SessionScoped
public class MyController implements Serializable {

    private String field;
    private MyPhaseListener phase;
        /**
     * Creates a new instance of MyController
     */
    public MyController() {
    }

    /**
     * @return the field
     */
    public String getField() {
        return field;
    }

    /**
     * @param field the field to set
     */
    public void setField(String field) {
        this.field = field;
    }

    /**
     * @return the phase
     */
    public MyPhaseListener getPhase() {
        return phase;
    }

    /**
     * @param phase the phase to set
     */
    public void setPhase(MyPhaseListener phase) {
        this.phase = phase;
    }
    
}
