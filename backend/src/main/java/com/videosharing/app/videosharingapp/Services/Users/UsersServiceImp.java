package com.videosharing.app.videosharingapp.Services.Users;

import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.exceptions.UserNotFoundException;
import com.videosharing.app.videosharingapp.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UsersServiceImp implements UsersService{

    @Autowired
    UserRepository userRepository ;


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
    public UserEntity updateUser(String id, UserEntity newUserDetails) throws UserNotFoundException {
         UserEntity user ;
         try{
             // find user if exist
             user =userRepository.findById(id).get();

             // new user details with old id
             newUserDetails.setId(user.getId());
             //
             userRepository.save(newUserDetails) ;

         }catch(Exception e){
             //
             throw new UserNotFoundException("No such user matches the provided id  ") ;
         }
        return newUserDetails ;
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
