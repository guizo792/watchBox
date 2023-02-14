package com.videosharing.app.videosharingapp.controllers;


import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.Services.Users.UsersService;
import com.videosharing.app.videosharingapp.exceptions.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    UsersService usersService;

    // testing route
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        //
        return new ResponseEntity<String>("users is working", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUser(@PathVariable  String id){
        try {
            UserEntity user =usersService.getUser(id) ;
            return new ResponseEntity<UserEntity>(user,HttpStatus.OK);
        }catch (UserNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND) ;
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<UserEntity> updateUserDetails(@PathVariable String id,@RequestBody UserEntity userNewDetails) {
        try {
            UserEntity updatedUser =usersService.updateUser(id,userNewDetails) ;
            return new ResponseEntity<UserEntity>(updatedUser,HttpStatus.OK) ;
        }catch (UserNotFoundException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND) ;
        }
    }
}




