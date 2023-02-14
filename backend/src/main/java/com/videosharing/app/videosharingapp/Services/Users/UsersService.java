package com.videosharing.app.videosharingapp.Services.Users;

import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.exceptions.UserNotFoundException;

import java.util.List;

public interface UsersService {

    UserEntity getUser(String id) throws UserNotFoundException;
    UserEntity updateUser(String id, UserEntity newUserDetails) throws UserNotFoundException;
    List<UserEntity> getAllUsers() ;
    UserEntity deleteUser(String id) ;
}
