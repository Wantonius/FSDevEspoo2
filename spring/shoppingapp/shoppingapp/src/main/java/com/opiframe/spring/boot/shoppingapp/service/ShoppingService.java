/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.service;

import com.opiframe.spring.boot.shoppingapp.data.ShoppingItem;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 *
 * @author Erno
 */
@Service
public class ShoppingService {
    
    private final List<ShoppingItem> database = new ArrayList<>();
    
    public boolean addToList(ShoppingItem item) {
        if(item.getType() == null) {
            return false;
        }
        database.add(item);
        return true;
    }
    
    public List<ShoppingItem> getDatabase() {
        return database;
    }
    
    public List<ShoppingItem> searchDatabase(String type) {
        List<ShoppingItem> tempList = new ArrayList<>();
        for(ShoppingItem i:database) {
            if(i.getType().equals(type)) {
                tempList.add(i);
            }
        }
        return tempList;
    }
    
    public boolean removeFromList(long id) {
        for(ShoppingItem i:database) {
            if(i.getId() == id) {
                database.remove(i);
                return true;
            }
        }
        return false;
    }
    
    public boolean editItem(long id, ShoppingItem item) {
        int index = 0;
        if(item.getType() == null) {
            return false;
        }
        for(ShoppingItem i:database) {
        if(i.getId() == id) {
                database.get(index).setType(item.getType());
                database.get(index).setCount(item.getCount());
                database.get(index).setPrice(item.getPrice());
                return true;
            }  
        index++;
        }
        return false;
    }
}
