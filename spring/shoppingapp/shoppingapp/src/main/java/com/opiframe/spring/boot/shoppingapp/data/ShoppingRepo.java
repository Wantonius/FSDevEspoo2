/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.data;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Erno
 */
@Repository
public interface ShoppingRepo extends MongoRepository<ShoppingItem,String>, CustomShoppingRepo{
        
  public List<ShoppingItem> findByTypeIgnoreCase(String type);
  
  @Query("{price:{$gte:?0,$lte:?1}}")
  public List<ShoppingItem> findByPriceRange(double gte, double lte);
}
