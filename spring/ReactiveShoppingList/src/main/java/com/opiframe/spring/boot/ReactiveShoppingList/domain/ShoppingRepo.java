/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ReactiveShoppingList.domain;

/**
 *
 * @author Erno
 */
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingRepo extends ReactiveMongoRepository<ShoppingItem,String>{
    
}
