/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.service;

import com.opiframe.spring.boot.shoppingapp.data.ShoppingItem;
import com.opiframe.spring.boot.shoppingapp.data.ShoppingRepo;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Erno
 */
@Service
public class ShoppingService {
    
    @Autowired private ShoppingRepo repo;

    
    public boolean addToList(ShoppingItem item) {
        if(item.getType() == null) {
            return false;
        }
        try {
            repo.insert(item);
        } catch(Exception e) {
            return false;
        }
        return true;
    }
    
    public List<ShoppingItem> getDatabase() {
        return repo.findAll();
    }
    
    public List<ShoppingItem> searchDatabase(String type) {
        return repo.findByTypeIgnoreCase(type);
    }
    
    public boolean removeFromList(String id) {
        try {
            repo.deleteById(id);
        } catch (Exception e) {
            return false;
        }
        return true;
    }
    
    public boolean editItem(String id, ShoppingItem item) {
        return repo.editItem(id,item);
    }
}
