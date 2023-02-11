package com.videosharing.app.videosharingapp.repositories;

import com.videosharing.app.videosharingapp.Entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity,String> {

    Optional<UserEntity> findByUsername(String username);
}
