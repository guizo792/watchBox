package com.videosharing.app.videosharingapp.controllers;


import com.videosharing.app.videosharingapp.Entities.Notification;
import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.Services.Notifications.NotificationsService;
import com.videosharing.app.videosharingapp.Services.Notifications.WSService;
import com.videosharing.app.videosharingapp.Services.Users.UsersService;
import com.videosharing.app.videosharingapp.controllers.Requests.RequestMessage;
import com.videosharing.app.videosharingapp.controllers.Responses.ResponseMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Controller
@CrossOrigin("*")
public class NotificationsController {

    @Autowired
    NotificationsService notificationsService ;

    @Autowired
    WSService wsService ;

    @Autowired
    UsersService usersService ;

    // handel any request with /ws/messages

    @MessageMapping("/sendNotification")
    public void send(@Payload RequestMessage msg){
        //System.out.println("this the payload" +msg);

        //save notif to db
        Set<String> usersToNotify =new HashSet<>() ;
        usersToNotify.add(msg.getUserToNotify()) ;
        Notification notification =new Notification(msg.getMessage(),msg.getUserEmitter() ,usersToNotify,new Date() );
        notificationsService.addNewNotification(notification);

        // send real time notif
        wsService.notifyFrontend(new ResponseMessage(msg.getMessage(),msg.getUserEmitter()), msg.getUserToNotify());
    }

    @MessageMapping("/newVideo")
    public void sendNewVideoNotification(@Payload RequestMessage msg){
        //System.out.println("this the request :" +msg);
        try {
            UserEntity userEmittedNotification =usersService.getUser(msg.getUserEmitter());

            //save notif to db
            Set<String> usersToNotify =userEmittedNotification.getSubscribers();

            Notification notification =new Notification(msg.getMessage(),msg.getUserEmitter() ,usersToNotify,new Date() );
            notificationsService.addNewNotification(notification);

            // send real time notif
            usersToNotify.forEach(userId ->{
                wsService.notifyFrontend(new ResponseMessage(msg.getMessage(),msg.getUserEmitter()), userId);
            });
        }catch(Exception e){
            // catch error : client error
            System.out.println(e.getMessage());
        }

    }


    @GetMapping("/api/notifications/{idUser}")
    public ResponseEntity<List<Notification>> getAllNotifications(@PathVariable String idUser){
        //
        return new ResponseEntity<>(notificationsService.getAllUserNotifications(idUser), HttpStatus.OK);
    }
}
