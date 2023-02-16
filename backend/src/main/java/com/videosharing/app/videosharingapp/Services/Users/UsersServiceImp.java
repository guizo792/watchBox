package com.videosharing.app.videosharingapp.Services.Users;

import com.mongodb.client.result.UpdateResult;
import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.controllers.Responses.UserResponse;
import com.videosharing.app.videosharingapp.exceptions.LikesException;
import com.videosharing.app.videosharingapp.exceptions.UserNotFoundException;
import com.videosharing.app.videosharingapp.repositories.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Service;


import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


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
    public UserResponse updateUser(String id, UserEntity newUserDetails) throws UserNotFoundException, LikesException {
        UpdateResult updatedUser;
         try{

             // get user from db
             UserEntity userDb= userRepository.findById(id).get();
             Query query =new Query(Criteria.where("id").is(id)) ;
             Update update =new Update() ;

             Optional.ofNullable(newUserDetails.getFirstName()).ifPresent(e -> update.set("firstName", newUserDetails.getFirstName()));
             Optional.ofNullable(newUserDetails.getLastName()).ifPresent(e -> update.set("lastName", newUserDetails.getLastName()));
             Optional.ofNullable(newUserDetails.getUsername()).ifPresent(e -> update.set("username", newUserDetails.getUsername()));
             Optional.ofNullable(newUserDetails.getProfilePicture()).ifPresent(e -> update.set("profilePicture", newUserDetails.getProfilePicture()));

             // update likedVideos List if requested
             Optional.ofNullable(newUserDetails.getLikedVideos()).ifPresent(e -> {
                 Set<String> likedVideos =userDb.getLikedVideos()!=null ? userDb.getLikedVideos(): new HashSet<String>();
                 Set<String> dislikedVideos= userDb.getDislikedVideos()!=null ? userDb.getDislikedVideos(): new HashSet<String>();

                 boolean added =likedVideos.add((String) (newUserDetails.getLikedVideos().toArray())[0]);
                 boolean isDisliked =dislikedVideos.contains((String) (newUserDetails.getLikedVideos().toArray())[0]) ;

                 if(added==true && isDisliked==false ) {
                     update.set("likedVideos", likedVideos);
                     userDb.setLikedVideos(likedVideos);
                     System.out.println("heeeere 1");
                 }else if(added==true && isDisliked){

                     dislikedVideos.remove((String) (newUserDetails.getLikedVideos().toArray())[0]);
                     userDb.setDislikedVideos(dislikedVideos);
                     update.set("dislikedVideos",dislikedVideos);

                     update.set("likedVideos", likedVideos);
                     userDb.setLikedVideos(likedVideos);

                 } else {
                     throw new ExpressionException("the user already liked this video") ;
                 }
             });

             // update disliked List if requested
             Optional.ofNullable(newUserDetails.getDislikedVideos()).ifPresent(e -> {

                 Set<String> dislikedVideos =userDb.getDislikedVideos()!=null ? userDb.getDislikedVideos(): new HashSet<String>();
                 Set<String> likedVideos= userDb.getLikedVideos()!=null ? userDb.getLikedVideos(): new HashSet<String>();

                 boolean added =dislikedVideos.add((String) (newUserDetails.getDislikedVideos().toArray())[0]);
                 boolean isLiked =likedVideos.contains((String) (newUserDetails.getDislikedVideos().toArray())[0]) ;

                 if(added==true && isLiked ==false) {

                     update.set("dislikedVideos", dislikedVideos);
                     userDb.setDislikedVideos(dislikedVideos);

                 }else if (isLiked==true && added==true ){

                     System.out.println("dkjhfdkhjfd");
                     likedVideos.remove((String) (newUserDetails.getDislikedVideos().toArray())[0]) ;

                     update.set("likedVideos",likedVideos);
                     userDb.setLikedVideos(likedVideos);

                     update.set("dislikedVideos", dislikedVideos);
                     userDb.setDislikedVideos(dislikedVideos);
                 }

                 else{
                     throw new ExpressionException("the user already disliked this video") ;
                 }
             });


             updatedUser =mongoTemplate.updateFirst(query, update, UserEntity.class);
             // return updated user
             // create response object and set properties
             UserResponse userUpdated =new UserResponse();
             BeanUtils.copyProperties(userDb,userUpdated);
             //
             return userUpdated ;

         }catch(ExpressionException e){
             throw new LikesException(e.getMessage()) ;
         }catch(Exception e) {
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
