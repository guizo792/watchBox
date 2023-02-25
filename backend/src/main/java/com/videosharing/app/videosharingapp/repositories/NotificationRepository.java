package com.videosharing.app.videosharingapp.repositories;

import com.videosharing.app.videosharingapp.Entities.Notification;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface NotificationRepository extends MongoRepository<Notification,String> {
}
