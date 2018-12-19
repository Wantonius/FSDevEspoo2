/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp;

import com.mongodb.MongoClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

/**
 *
 * @author Erno
 */

@Configuration
public class ShoppingAppMongoConf {
    
    public @Bean MongoTemplate mongoTemplate() throws Exception {
        MongoTemplate template = new MongoTemplate(new MongoClient(
        "127.0.0.1"), "springshoppingitems");
        return template;
    }
}
