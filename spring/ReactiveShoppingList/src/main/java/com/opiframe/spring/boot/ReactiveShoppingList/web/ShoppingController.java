/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ReactiveShoppingList.web;

import com.opiframe.spring.boot.ReactiveShoppingList.domain.ShoppingItem;
import com.opiframe.spring.boot.ReactiveShoppingList.service.ShoppingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

/**
 *
 * @author Erno
 */
@RestController
@RequestMapping("/api/shopping")
public class ShoppingController {
    
    @Autowired
    private ShoppingService service;
    
    
    @GetMapping(produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Flux<ShoppingItem>> getShoppingList() {
        return new ResponseEntity(service.getAllItems(),HttpStatus.OK);
    }
    
    @PostMapping(produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addToList(@RequestBody ShoppingItem item) {
        service.addToList(item);
        return new ResponseEntity("{\"message\":\"success\"}",HttpStatus.OK);
    }

    @DeleteMapping(value="/{id}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> removeFromList(@PathVariable String id) {
        if(service.removeItem(id)) {
            return new ResponseEntity("{\"message\":\"success\"}",HttpStatus.OK);           
        } else {
            return new ResponseEntity("{\"message\":\"not found\"}",HttpStatus.NOT_FOUND);
        }
        
    }
}
