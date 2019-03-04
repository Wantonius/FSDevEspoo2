/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.espoo.currency;

/**
 *
 * @author Erno
 */
public interface ICurrencyConvertable {
    public double convert(Currencies currencyType, double amount);   
}
