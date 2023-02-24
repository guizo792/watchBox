package com.videosharing.app.videosharingapp.controllers;


import com.videosharing.app.videosharingapp.Services.Notifications.WSService;
import com.videosharing.app.videosharingapp.controllers.Requests.RequestMessage;
import com.videosharing.app.videosharingapp.controllers.Responses.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;


@Controller
@CrossOrigin("*")
public class NotificationsController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate ;

    @Autowired
    WSService wsService ;
    // handel any request with /ws/messages

    @MessageMapping("/sendNotification")
    public void send(@Payload RequestMessage msg){
        System.out.println("this the payload" +msg);
        wsService.notifyFrontend(new ResponseMessage(msg.getMessage(),msg.getUserEmitter()), msg.getUserToNotify());
    }



    public void notifs(final RequestMessage msg){
        System.out.println("called");
      simpMessagingTemplate.convertAndSend(msg.getMessage()); ;
    }

    //handel requests with /ws/messages

   /* @MessageMapping("/private")
    public void sendToUser(final RequestMessage msg) {
        simpMessagingTemplate.convertAndSendToUser(msg.getUser(), "/specific", msg);
    }*/
}
