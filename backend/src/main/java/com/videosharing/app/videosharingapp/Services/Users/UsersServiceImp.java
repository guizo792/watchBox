package com.videosharing.app.videosharingapp.Services.Users;

import com.mongodb.client.result.UpdateResult;
import com.videosharing.app.videosharingapp.Entities.Notification;
import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.Services.Notifications.NotificationsService;
import com.videosharing.app.videosharingapp.Services.Notifications.WSService;
import com.videosharing.app.videosharingapp.controllers.Responses.ResponseMessage;
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

import java.util.*;

@Service
public class UsersServiceImp implements UsersService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    WSService wsService ;

    @Autowired
    NotificationsService notificationsService ;
    @Override
    public UserEntity getUser(String id) throws UserNotFoundException {
        UserEntity user;
        try {
            user = userRepository.findById(id).get();

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new UserNotFoundException("can't find a user with this id" + id);
        }

        return user;
    }

    @Override
    public UserResponse updateUser(String id, UserEntity newUserDetails) throws UserNotFoundException, LikesException {
        UpdateResult updatedUser;
        try {

            // get user from db
            UserEntity userDb = userRepository.findById(id).get();
            Query query = new Query(Criteria.where("id").is(id));
            Update update = new Update();
            System.out.println("......." + update);
            Optional.ofNullable(newUserDetails.getFirstName())
                    .ifPresent(e -> update.set("firstName", newUserDetails.getFirstName()));
            Optional.ofNullable(newUserDetails.getLastName())
                    .ifPresent(e -> update.set("lastName", newUserDetails.getLastName()));
            Optional.ofNullable(newUserDetails.getUsername())
                    .ifPresent(e -> update.set("username", newUserDetails.getUsername()));
            Optional.ofNullable(newUserDetails.getProfilePicture())
                    .ifPresent(e -> update.set("profilePicture", newUserDetails.getProfilePicture()));

            // update likedVideos List if requested
            Optional.ofNullable(newUserDetails.getLikedVideos()).ifPresent(e -> {
                Set<String> likedVideos = userDb.getLikedVideos() != null ? userDb.getLikedVideos()
                        : new HashSet<String>();
                Set<String> dislikedVideos = userDb.getDislikedVideos() != null ? userDb.getDislikedVideos()
                        : new HashSet<String>();

                boolean added = likedVideos.add((String) (newUserDetails.getLikedVideos().toArray())[0]);
                boolean isDisliked = dislikedVideos.contains((String) (newUserDetails.getLikedVideos().toArray())[0]);

                if (added && !isDisliked) {
                    update.set("likedVideos", likedVideos);
                } else if (added) {

                    dislikedVideos.remove((String) (newUserDetails.getLikedVideos().toArray())[0]);
                    userDb.setDislikedVideos(dislikedVideos);
                    update.set("dislikedVideos", dislikedVideos);
                    update.set("likedVideos", likedVideos);

                } else {
                    throw new ExpressionException("the user already liked this video");
                }
            });

            // update disliked List if requested
            Optional.ofNullable(newUserDetails.getDislikedVideos()).ifPresent(e -> {

                Set<String> dislikedVideos = userDb.getDislikedVideos() != null ? userDb.getDislikedVideos()
                        : new HashSet<String>();
                Set<String> likedVideos = userDb.getLikedVideos() != null ? userDb.getLikedVideos()
                        : new HashSet<String>();

                boolean added = dislikedVideos.add((String) (newUserDetails.getDislikedVideos().toArray())[0]);
                boolean isLiked = likedVideos.contains((String) (newUserDetails.getDislikedVideos().toArray())[0]);

                if (added && !isLiked) {
                    update.set("dislikedVideos", dislikedVideos);
                } else if (added) {
                    likedVideos.remove((String) (newUserDetails.getDislikedVideos().toArray())[0]);
                    update.set("likedVideos", likedVideos);
                    update.set("dislikedVideos", dislikedVideos);
                } else {
                    throw new ExpressionException("the user already disliked this video");
                }
            });

            // update subscribedTo List when a user subscribe to other user
            Optional.ofNullable(newUserDetails.getSubscribedToUsers()).ifPresent(e -> {

                Set<String> subscribeTo = userDb.getSubscribedToUsers() != null ? userDb.getSubscribedToUsers()
                        : new HashSet<String>();

                boolean subscribed = subscribeTo.add((String) (newUserDetails.getSubscribedToUsers().toArray())[0]);

                if (subscribed) {
                    update.set("subscribedToUsers", subscribeTo);
                } else {
                    subscribeTo.remove((String) (newUserDetails.getSubscribedToUsers().toArray())[0]);
                    update.set("subscribedToUsers", subscribeTo);
                }
            });

            // update subscribers List when a subscribe request is coming from another user
            Optional.ofNullable(newUserDetails.getSubscribers()).ifPresent(e -> {
                Set<String> subscribers = userDb.getSubscribers() != null ? userDb.getSubscribers()
                        : new HashSet<String>();
                boolean added = subscribers.add((String) (newUserDetails.getSubscribers().toArray())[0]);
                if (added) {
                    update.set("subscribers", subscribers);

                    Set<String> usersToNotify =new HashSet<>() ;
                    usersToNotify.add(userDb.getId()) ;
                    Notification notification =new Notification("Subscribed to you",(String) (newUserDetails.getSubscribers().toArray())[0] ,usersToNotify,new Date() );
                    notificationsService.addNewNotification(notification);

                    wsService.notifyFrontend(new ResponseMessage("Just subscribed to you :)",(String) (newUserDetails.getSubscribers().toArray())[0]),userDb.getId());
                } else {
                    subscribers.remove((String) (newUserDetails.getSubscribers().toArray())[0]);
                    update.set("subscribers", subscribers);
                }
            });

            System.out.println(update);
            if (!update.toString().equals("{}")) {
                updatedUser = mongoTemplate.updateFirst(query, update, UserEntity.class);
                // return updated user
                // create response object and set properties
                UserResponse userUpdated = new UserResponse();
                BeanUtils.copyProperties(userRepository.findById(id).get(), userUpdated);
                //
                return userUpdated;
            } else {
                throw new Exception("update body is not correct !!");
            }

        } catch (ExpressionException e) {
            throw new LikesException(e.getMessage());
        } catch (Exception e) {
            throw new UserNotFoundException(e.getMessage());

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

    @Override
    public UserResponse removeLikedVideo(String idUser, String idVideo) throws Exception {
        try {
            UserEntity user = userRepository.findById(idUser).get();

            Set<String> likedVideos = user.getLikedVideos();

            if (likedVideos.contains(idVideo)) {
                likedVideos.remove(idVideo);
                user.setLikedVideos(likedVideos);
            }
            userRepository.save(user);
            UserResponse userResponse = new UserResponse();

            BeanUtils.copyProperties(user, userResponse);

            return userResponse;
        } catch (Exception e) {
            throw new Exception("can't find user ");
        }
    }

    @Override
    public UserResponse removeDislikedVideo(String idUser, String idVideo) throws Exception {
        try {
            UserEntity user = userRepository.findById(idUser).get();

            Set<String> disLikedVideos = user.getDislikedVideos();

            if (disLikedVideos.contains(idVideo)) {
                disLikedVideos.remove(idVideo);
                user.setDislikedVideos(disLikedVideos);
            }
            userRepository.save(user);
            UserResponse userResponse = new UserResponse();

            BeanUtils.copyProperties(user, userResponse);

            return userResponse;
        } catch (Exception e) {
            throw new Exception("can't find user ");
        }
    }
}