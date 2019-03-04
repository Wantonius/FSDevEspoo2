/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.espoo.jsf.shoppinglist;

import java.util.ArrayList;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;

/**
 *
 * @author Erno
 */
@ApplicationScoped
public class ShoppingService {
    
    private List<ShoppingItem> shoppingList = new ArrayList<>();

    public ShoppingService() {
        
    }
    /**
     * @return the shoppingList
     */
    public List<ShoppingItem> getShoppingList() {
        return shoppingList;
    }
    
    public boolean addToList(ShoppingItem item) {
        this.shoppingList.add(item);
        return true;
    }
    
    public boolean removeFromList(ShoppingItem item) {
        if(this.shoppingList.contains(item)) {
            this.shoppingList.remove(item);
            return true;
        }
        return false;
    }
}
