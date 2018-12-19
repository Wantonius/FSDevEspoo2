/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ReactiveWebIntro;

import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;


/**
 *
 * @author Erno
 */
@Service
public class ReactiveService {
    
    private Message message;
    
    
    public ReactiveService() {
        message = new Message();
        message.setPayload("Hello World");
        message.setSender("Matti");
        message.setTarget("Jaska");
    }

    public ReactiveService(Message message) {
        this.message = message;
    }
    
    public Mono<Message> getMessage() {
        return Mono.just(message);
    }
    
}
