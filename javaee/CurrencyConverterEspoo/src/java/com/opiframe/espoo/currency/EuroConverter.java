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
public class EuroConverter implements ICurrencyConvertable{

    @Override
    public double convert(Currencies currencyType, double amount) {
                switch(currencyType) {
            case DOLLAR:
                return amount/Rates.EURO_TO_DOLLAR;
            case EURO:
                return amount;
            case YEN:
                return amount/Rates.EURO_TO_YEN;
            default:
                return amount;
        }    }
    
}
