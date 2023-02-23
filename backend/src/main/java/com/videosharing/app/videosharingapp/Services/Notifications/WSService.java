package com.videosharing.app.videosharingapp.Services.Notifications;


import com.videosharing.app.videosharingapp.controllers.Responses.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WSService {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate ;


    public void notifyFrontend(final ResponseMessage message,String username){
        System.out.println("/notifications/"+username);
        simpMessagingTemplate.convertAndSend("/notifications/"+username,message);
    }

}
