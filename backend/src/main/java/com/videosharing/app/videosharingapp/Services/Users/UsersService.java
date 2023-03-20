package com.videosharing.app.videosharingapp.Services.Users;

import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.controllers.Responses.UserResponse;
import com.videosharing.app.videosharingapp.exceptions.LikesException;
import com.videosharing.app.videosharingapp.exceptions.NoVideosException;
import com.videosharing.app.videosharingapp.exceptions.UserNotFoundException;

import java.util.List;

public interface UsersService {

    UserEntity getUser(String id) throws UserNotFoundException;
    UserResponse updateUser(String id, UserEntity newUserDetails) throws UserNotFoundException, LikesException;
    List<UserEntity> getAllUsers() ;
    UserEntity deleteUser(String id) ;
    UserResponse removeLikedVideo(String idUser,String idVideo) throws Exception;
    UserResponse removeDislikedVideo(String idUser,String idVideo) throws Exception;
    List<VideoEntity> getUserVideos(String idUser) throws NoVideosException;

}
