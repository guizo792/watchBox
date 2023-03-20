package com.videosharing.app.videosharingapp.repositories;

import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface VideoRepository extends MongoRepository<VideoEntity,String> {

    Optional<VideoEntity> findById(String id);
    boolean existsById(String id);
    List<VideoEntity> findAllByUserId(String userId) ;
}
