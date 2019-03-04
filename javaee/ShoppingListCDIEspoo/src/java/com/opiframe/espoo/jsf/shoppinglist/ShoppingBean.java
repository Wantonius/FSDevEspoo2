/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.espoo.jsf.shoppinglist;

import java.io.Serializable;
import java.util.List;
import javax.inject.Named;
import javax.enterprise.context.SessionScoped;
import javax.inject.Inject;

/**
 *
 * @author Erno
 */
@Named(value = "shoppingBean")
@SessionScoped
public class ShoppingBean implements Serializable {

    @Inject ShoppingService service;
    

    private ShoppingItem item;
    /**
     * Creates a new instance of ShoppingBean
     */
    public ShoppingBean() {
        this.item = new ShoppingItem();
    }

    /**
     * @return the item
     */
    public ShoppingItem getItem() {
        return item;
    }

    /**
     * @param item the item to set
     */
    public void setItem(ShoppingItem item) {
        this.item = item;
    }
    
    public List<ShoppingItem> getShoppingList() {
        return service.getShoppingList();
    }
    
    public void addToList() {
        service.addToList(this.item);
        this.item = new ShoppingItem();
    }

    /**
     * @return the rendered
     */
    public boolean isRendered() {
        if(service.getShoppingList().size() > 0) {
            return true;
        }
        return false;
    }


    
    public void removeFromList(ShoppingItem item) {
        service.removeFromList(item);
    }
}
