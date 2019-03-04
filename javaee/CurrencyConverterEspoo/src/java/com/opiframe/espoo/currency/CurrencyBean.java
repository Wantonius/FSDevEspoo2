/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.espoo.currency;

import java.util.Arrays;
import java.util.List;
import javax.inject.Named;
import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;

/**
 *
 * @author Erno
 */
@Named(value = "currencyBean")
@RequestScoped
public class CurrencyBean {

    @Inject @CurrencyAnnotation(Currencies.DOLLAR) ICurrencyConvertable dollar;
    @Inject @CurrencyAnnotation(Currencies.EURO) ICurrencyConvertable euro;    
    @Inject @CurrencyAnnotation(Currencies.YEN) ICurrencyConvertable yen;    
    
    private double currencyAmount;
    private Currencies currencyType;
    
    /**
     * Creates a new instance of CurrencyBean
     */
    public CurrencyBean() {
        currencyAmount = 0.0d;
        currencyType = Currencies.DOLLAR;
    }

    public List<Currencies> getCurrencies() {
        return Arrays.asList(Currencies.values());
    }
    
    /**
     * @return the currencyAmount
     */
    public double getCurrencyAmount() {
        return currencyAmount;
    }

    /**
     * @param currencyAmount the currencyAmount to set
     */
    public void setCurrencyAmount(double currencyAmount) {
        this.currencyAmount = currencyAmount;
    }

    /**
     * @return the currencyType
     */
    public Currencies getCurrencyType() {
        return currencyType;
    }

    /**
     * @param currencyType the currencyType to set
     */
    public void setCurrencyType(Currencies currencyType) {
        this.currencyType = currencyType;
    }

    /**
     * @return the asDollar
     */
    public double getAsDollar() {
        return dollar.convert(currencyType, currencyAmount);
    }


    /**
     * @return the asEuro
     */
    public double getAsEuro() {
        return euro.convert(currencyType, currencyAmount);
    }



    /**
     * @return the asYen
     */
    public double getAsYen() {
        return yen.convert(currencyType, currencyAmount);
    }


    
}
