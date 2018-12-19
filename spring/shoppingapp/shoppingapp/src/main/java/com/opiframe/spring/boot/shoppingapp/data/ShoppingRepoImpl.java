/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.data;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;

/**
 *
 * @author Erno
 */
public class ShoppingRepoImpl implements CustomShoppingRepo{

    @Autowired MongoTemplate template;
    @Override
    public boolean editItem(String id,ShoppingItem item) {
        System.out.println("Moi!");
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(id));
        Update update = new Update();
        update.set("type", item.getType());
        update.set("count",item.getCount());
        update.set("price",item.getPrice());
        try {        
            template.updateFirst(query, update, ShoppingItem.class);
        } catch(Exception e) {
            return false;
        }
        return true;       
    }
 
}
