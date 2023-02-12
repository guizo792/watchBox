package com.videosharing.app.videosharingapp.repositories;

import com.videosharing.app.videosharingapp.Entities.CommentEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CommentRepository extends MongoRepository<CommentEntity,String> {

    Optional<CommentEntity> findById(String id);
}
