/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ReactiveShoppingList.service;

import com.opiframe.spring.boot.ReactiveShoppingList.domain.ShoppingItem;
import com.opiframe.spring.boot.ReactiveShoppingList.domain.ShoppingRepo;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicBoolean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 *
 * @author Erno
 */
@Service
public class ShoppingService {
    
    @Autowired
    private ShoppingRepo repo;
    
    
    public Flux<ShoppingItem> getAllItems() {
        return repo.findAll();
    }
    
    public boolean addToList(ShoppingItem item) {
        try {
            Mono<ShoppingItem> temp = Mono.just(item);
            repo.insert(temp).then().subscribe();
            return true;
        } catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }
    
    public boolean removeItem(String id) {
        AtomicBoolean isFound = new AtomicBoolean();
        CountDownLatch latch = new CountDownLatch(1);
        repo.findById(id).hasElement().subscribe(data -> {
            if(data) {
                repo.deleteById(id).then().subscribe();
                isFound.set(true);
            } else {
                isFound.set(false);
            }
        },
        error -> {
            isFound.set(false);
            latch.countDown();
        },
        () -> {
            latch.countDown();
        });
        try {
            latch.await();
        } catch(Exception e) {
            isFound.set(false);
        }
        return isFound.get();
    }
}
