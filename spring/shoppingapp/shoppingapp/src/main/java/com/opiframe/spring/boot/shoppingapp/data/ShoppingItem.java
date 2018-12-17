/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.data;

import java.io.Serializable;

/**
 *
 * @author Erno
 */
public class ShoppingItem implements Serializable {
    
    private static long autoIncrementId = 100;
    
    private final long id;
    private String type;
    private int count;
    private double price;
    
    public ShoppingItem() {
        autoIncrementId++;
        this.id = autoIncrementId;
    }
    
    /**
     * @return the id
     */
    public long getId() {
        return id;
    }


    /**
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the count
     */
    public int getCount() {
        return count;
    }

    /**
     * @param count the count to set
     */
    public void setCount(int count) {
        this.count = count;
    }

    /**
     * @return the price
     */
    public double getPrice() {
        return price;
    }

    /**
     * @param price the price to set
     */
    public void setPrice(double price) {
        this.price = price;
    }
    

    
}
