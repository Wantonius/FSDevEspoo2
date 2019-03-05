/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.jsf.actionlistener.espoo;

import java.awt.Point;
import java.awt.Rectangle;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import java.io.Serializable;
import java.util.Map;
import javax.faces.context.FacesContext;
import javax.faces.event.ActionEvent;

/**
 *
 * @author Erno
 */
@Named(value = "myController")
@SessionScoped
public class MyController implements Serializable {

    private String outcome = "";
    private final Rectangle marioRect = new Rectangle(0,0,367,913);
    private final Rectangle luigiRect = new Rectangle(368,0,735,913);
    /**
     * Creates a new instance of MyController
     */
    public MyController() {
    }
    
    public void handleMouseClick(ActionEvent e) {
        FacesContext context = FacesContext.getCurrentInstance();
        String clientId = e.getComponent().getClientId(context);
        Map<String,String> requestParams = 
                context.getExternalContext().getRequestParameterMap();
        int x  = new Integer((String)requestParams.get(clientId+".x"));
        int y  = new Integer((String)requestParams.get(clientId+".y"));
        if(luigiRect.contains(new Point(x,y))) {
            outcome = "luigi";
        } 
        if(marioRect.contains(new Point(x,y))) {
            outcome = "mario";
        }
    }
    
    public String navigate() {
        return this.outcome;
    }
}
