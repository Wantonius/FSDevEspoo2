/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.opiframe.spring.boot.ReactiveWebIntro;

import java.time.Duration;
import java.time.LocalTime;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

/**
 *
 * @author Erno
 */

@RestController
public class ReactiveController {
    
    
    @Autowired ReactiveService service;

    boolean isNotEmpty;
    @GetMapping(value="/message", produces=MediaType.APPLICATION_JSON_VALUE)
    public Publisher<Message> getHelloWorld() {
        service.getMessage().hasElement().subscribe(data -> this.isNotEmpty = data);
        if(this.isNotEmpty) {
            service.getMessage().subscribe(data-> System.out.println(data));
        }
        return service.getMessage();
    }
    
    @RequestMapping(value="/sse_events", produces=MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> getEventStream() {
        return Flux.interval(Duration.ofSeconds(1)).map(seq ->
                "Flux - "+LocalTime.now().toString());
    }
}
