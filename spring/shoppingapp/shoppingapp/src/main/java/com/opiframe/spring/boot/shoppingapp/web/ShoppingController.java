/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.web;

import com.opiframe.spring.boot.shoppingapp.data.ShoppingItem;
import com.opiframe.spring.boot.shoppingapp.service.ShoppingService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Erno
 */

@RestController
public class ShoppingController {
    
    @Autowired 
    private ShoppingService service;
    
    @RequestMapping(value="/api/shopping", method=RequestMethod.GET)
    public ResponseEntity<List<ShoppingItem>> getShoppingList(@RequestParam(required=false) String type) {
        List<ShoppingItem> temp;
        if(type == null) {
             temp = service.getDatabase();
        } else {
            temp= service.searchDatabase(type);
        }
        return new ResponseEntity(temp, HttpStatus.OK);
    }
    
    @RequestMapping(value="/api/shopping", method=RequestMethod.POST)
    public ResponseEntity<String> addToList(@RequestBody ShoppingItem item) {
        if(service.addToList(item)) {
            return new ResponseEntity("{\"message\":\"success\"}", HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"not acceptable\"}",HttpStatus.NOT_ACCEPTABLE);          
        }
    }
    
    @RequestMapping(value="/api/shopping/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<String> removeFromList(@PathVariable long id) {
        boolean success = service.removeFromList(id);
        if(success) {
            return new ResponseEntity("{\"message\":\"success\"}",HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"not found\"}",HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(value="/api/shopping/{id}", method=RequestMethod.PATCH)
    public ResponseEntity<String> editItem(@PathVariable long id, @RequestBody ShoppingItem item) {
        boolean success = service.editItem(id, item);
        if(success) {
            return new ResponseEntity("{\"message\":\"success\"}",HttpStatus.OK);
        } else {
            return new ResponseEntity("{\"message\":\"not found\"}",HttpStatus.NOT_FOUND);
        }
    }
}
