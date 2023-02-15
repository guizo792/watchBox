package com.videosharing.app.videosharingapp.Services.Users;

import com.mongodb.client.result.UpdateResult;
import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.controllers.Responses.UserResponse;
import com.videosharing.app.videosharingapp.exceptions.UserNotFoundException;
import com.videosharing.app.videosharingapp.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;


@Service
public class UsersServiceImp implements UsersService{

    @Autowired
    UserRepository userRepository ;

    @Autowired
    MongoTemplate mongoTemplate ;


    @Override
    public UserEntity getUser(String id) throws UserNotFoundException {
        UserEntity user ;
        try {
           user =userRepository.findById(id).get() ;

        }catch(Exception e){
            System.out.println(e.getMessage());
            throw new UserNotFoundException("can't find a user with this id"+id);
        }

        return user;
    }

    @Override
    public UserResponse updateUser(String id, UserEntity newUserDetails) throws UserNotFoundException {
        UpdateResult updatedUser;
         try{

             Query query =new Query(Criteria.where("id").is(id)) ;
             Update update =new Update() ;

             Optional.ofNullable(newUserDetails.getFirstName()).ifPresent(e -> update.set("firstName", newUserDetails.getFirstName()));
             Optional.ofNullable(newUserDetails.getLastName()).ifPresent(e -> update.set("lastName", newUserDetails.getLastName()));
             Optional.ofNullable(newUserDetails.getUsername()).ifPresent(e -> update.set("username", newUserDetails.getUsername()));
             Optional.ofNullable(newUserDetails.getProfilePicture()).ifPresent(e -> update.set("profilePicture", newUserDetails.getProfilePicture()));

             updatedUser =mongoTemplate.updateFirst(query, update, UserEntity.class);

             // return updated user
             // get user from db
             UserEntity userDb= userRepository.findById(id).get();
             // create response object and set properties
             UserResponse userUpdated =new UserResponse();
             BeanUtils.copyProperties(userDb,userUpdated);

             //
             return userUpdated ;

         }catch(Exception e){
             //
             throw new UserNotFoundException("No such user matches the provided id  ") ;
         }

    }

    @Override
    public List<UserEntity> getAllUsers() {
        return null;
    }

    @Override
    public UserEntity deleteUser(String id) {
        return null;
    }
}
