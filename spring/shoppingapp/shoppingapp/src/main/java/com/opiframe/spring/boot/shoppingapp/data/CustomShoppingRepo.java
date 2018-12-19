/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.shoppingapp.data;

/**
 *
 * @author Erno
 */
public interface CustomShoppingRepo {
    public boolean editItem(String id,ShoppingItem item);
}
