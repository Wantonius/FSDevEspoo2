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
public class DollarConverter implements ICurrencyConvertable {

    @Override
    public double convert(Currencies currencyType, double amount) {
        switch(currencyType) {
            case DOLLAR:
                return amount;
            case EURO:
                return amount/Rates.DOLLAR_TO_EURO;
            case YEN:
                return amount/Rates.DOLLAR_TO_YEN;
            default:
                return amount;
        }
    }
    
}
