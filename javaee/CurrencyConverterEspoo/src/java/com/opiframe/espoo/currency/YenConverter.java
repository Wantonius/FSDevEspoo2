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
public class YenConverter implements ICurrencyConvertable{

    @Override
    public double convert(Currencies currencyType, double amount) {
        switch(currencyType) {
            case DOLLAR:
                return amount/Rates.YEN_TO_DOLLAR;
            case EURO:
                return amount/Rates.YEN_TO_EURO;
            case YEN:
                return amount;
            default:
                return amount;
        }
    }
    
}
