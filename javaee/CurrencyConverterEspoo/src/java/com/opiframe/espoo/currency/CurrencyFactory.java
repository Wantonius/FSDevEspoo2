/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.espoo.currency;

import java.io.Serializable;
import javax.enterprise.context.SessionScoped;
import javax.enterprise.inject.Produces;

/**
 *
 * @author Erno
 */
@SessionScoped
public class CurrencyFactory implements Serializable{
    
    
    private DollarConverter dollar = null;
    private EuroConverter euro = null;
    private YenConverter yen = null;
    
    @Produces
    @CurrencyAnnotation(Currencies.DOLLAR)
    public ICurrencyConvertable getDollarConverter() {
        if(dollar == null) {
            dollar = new DollarConverter();
        }
        return dollar;
    }

    @Produces
    @CurrencyAnnotation(Currencies.EURO)
    public ICurrencyConvertable getEuroConverter() {
        if(euro == null) {
            euro = new EuroConverter();
        }
        return euro;
    }
    
    @Produces
    @CurrencyAnnotation(Currencies.YEN)
    public ICurrencyConvertable getYenConverter() {
        if(yen == null) {
            yen = new YenConverter();
        }
        return yen;
    }   
}
