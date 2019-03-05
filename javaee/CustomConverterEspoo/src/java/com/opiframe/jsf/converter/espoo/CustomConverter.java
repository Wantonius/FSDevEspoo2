/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.jsf.converter.espoo;

import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.FacesConverter;

/**
 *
 * @author Erno
 */
@FacesConverter("customConverter")
public class CustomConverter implements Converter {

    @Override
    public Object getAsObject(FacesContext context, UIComponent component, String value) {
        System.out.println("Custom Converter, input from user "+value);
        System.out.println("Converting value from component:"+component.getId());
        return "This is a fixed value";
    }

    @Override
    public String getAsString(FacesContext context, UIComponent component, Object value) {
        String temp = (String) value;
        return temp;
    }
    
    
}
