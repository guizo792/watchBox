package com.videosharing.app.videosharingapp.Services.Notifications;

import com.videosharing.app.videosharingapp.Entities.Notification;
import com.videosharing.app.videosharingapp.repositories.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.List;


@Service
public class NotificationServiceImp implements NotificationsService{

    @Autowired
    NotificationRepository notificationRepository ;


    // get notifications that belongs to a user with id : idUser :
    @Override
    public List<Notification> getAllUserNotifications(String idUser) {

        List<Notification> list = new ArrayList<Notification>();

       notificationRepository.findAll().forEach(notification ->{
           boolean notifIsForUser =notification.getUsersToNotify().contains(idUser) ;
           
           if(notifIsForUser){
               list.add(notification) ;
           }
       });

       // SORT NOTIFICATIONS LIST BY DATE :
        list.sort(new Comparator<Notification>() {
           @Override
           public int compare(Notification n1, Notification n2) {
               return n2.getDate().compareTo(n1.getDate());
           }
       });
        return list;
    }

    @Override
    public Notification getNotification() {
        return null;
    }

    @Override
    public Notification addNewNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Notification updateNotification() {
        return null;
    }

    @Override
    public boolean deleteNotification() {
        return false;
    }
}
