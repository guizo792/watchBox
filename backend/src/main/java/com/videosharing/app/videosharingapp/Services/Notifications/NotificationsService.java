package com.videosharing.app.videosharingapp.Services.Notifications;

import com.videosharing.app.videosharingapp.Entities.Notification;
import org.springframework.data.mongodb.core.aggregation.BooleanOperators;

import java.util.List;

public interface NotificationsService {
    public List<Notification> getAllUserNotifications(String idUser) ;
    public Notification getNotification() ;
    public  Notification addNewNotification(Notification notification) ;
    public Notification updateNotification() ;
    public boolean deleteNotification() ;
}
