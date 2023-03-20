package com.videosharing.app.videosharingapp.controllers;


import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.Services.Users.UsersService;
import com.videosharing.app.videosharingapp.controllers.Requests.PasswordChangeReq;
import com.videosharing.app.videosharingapp.controllers.Requests.RemoveLikedVideoReq;
import com.videosharing.app.videosharingapp.controllers.Responses.UserResponse;
import com.videosharing.app.videosharingapp.exceptions.NoVideosException;
import com.videosharing.app.videosharingapp.exceptions.UserNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
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

    @GetMapping("/{id}/videos")
    public ResponseEntity getUserVideos(@PathVariable  String id){
        try {
            List<VideoEntity> userVideos =usersService.getUserVideos(id) ;
            return new ResponseEntity<>(userVideos,HttpStatus.OK);
        } catch (NoVideosException e) {
            System.out.println("heeeeeeeeeeeeeere");
            throw new RuntimeException(e);
        }
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


    @PutMapping("/{idUser}/password")
    public ResponseEntity changeUserPassword(@PathVariable String idUser,@RequestBody PasswordChangeReq req) {
        try {

            System.out.println("heeeeeeeeeeere");

            boolean updated =usersService.changeUserPassword(idUser,req.getCurrentPassword() ,req.getNewPassword()) ;
            return new ResponseEntity<Boolean>(updated,HttpStatus.OK) ;
        }catch (ExpressionException e ){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST) ;
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND) ;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity updateUserDetails(@PathVariable String id,@RequestBody UserEntity userNewDetails) {
        try {
            UserResponse updatedUser =usersService.updateUser(id,userNewDetails) ;
            return new ResponseEntity<UserResponse>(updatedUser,HttpStatus.OK) ;
        }catch (ExpressionException e ){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST) ;
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND) ;
        }
    }



    @DeleteMapping("/likedVideos/{id}")
    public ResponseEntity removeLikedVideo(@PathVariable String id,@RequestBody RemoveLikedVideoReq req) {
        //System.out.println("method delete is called ");
        //System.out.println(req);
        try {
            UserResponse updatedUser =usersService.removeLikedVideo(id,req.getIdVideo()) ;
            return new ResponseEntity<UserResponse>(updatedUser,HttpStatus.OK) ;
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND) ;
        }
    }

    @DeleteMapping("/dislikedVideos/{id}")
    public ResponseEntity removeDislikedVideo(@PathVariable String id,@RequestBody RemoveLikedVideoReq req) {
        try {
            UserResponse updatedUser =usersService.removeDislikedVideo(id,req.getIdVideo()) ;
            return new ResponseEntity<UserResponse>(updatedUser,HttpStatus.OK) ;
        }catch (Exception e){
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND) ;
        }
    }

}




