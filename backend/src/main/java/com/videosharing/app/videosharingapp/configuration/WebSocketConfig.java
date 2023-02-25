package com.videosharing.app.videosharingapp.configuration;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.util.pattern.PathPatternParser;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private PathPatternParser pathPatternParser;


    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
       registry.addEndpoint("/ws").setAllowedOriginPatterns("*").withSockJS() ;
    }

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
       registry.configureBrokerChannel() ;
       registry.setApplicationDestinationPrefixes("/app");
    }
}
