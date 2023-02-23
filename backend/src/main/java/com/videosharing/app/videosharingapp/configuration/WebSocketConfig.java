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


    /*@Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
                if (StompCommand.SUBSCRIBE.equals(accessor.getCommand())) {
                    String destination = accessor.getDestination();
                    if (destination != null && destination.startsWith("/notifications/")) {
                        String username = extractUsernameFromDestination(destination);
                        accessor.setDestination("/notifications/" + username);
                    }
                }
                return message;
            }
        });
    }*/

   /*
   private String extractUsernameFromDestination(String destination) {
        PathPattern pathPattern = pathPatternParser.parse("/notifications/{username}");
        PathContainer pathContainer = PathContainer.parsePath(destination);
        Map<String, String> pathVariables = (Map<String, String>) pathPattern.matchAndExtract(pathContainer);
        return pathVariables.get("username");
    }
    */
}
