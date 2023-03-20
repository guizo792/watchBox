package com.videosharing.app.videosharingapp.Services.Users;

import com.videosharing.app.videosharingapp.Entities.UserEntity;
import com.videosharing.app.videosharingapp.Services.JWT.JwtService;
import com.videosharing.app.videosharingapp.controllers.Requests.LoginRequest;
import com.videosharing.app.videosharingapp.controllers.Requests.RegisterRequest;
import com.videosharing.app.videosharingapp.controllers.Responses.AuthenticationResponse;
import com.videosharing.app.videosharingapp.model.Users.Role;
import com.videosharing.app.videosharingapp.model.Users.UserDetailsImp;
import com.videosharing.app.videosharingapp.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class AuthenticationServiceImp implements AuthenticationService{

    @Autowired
    UserRepository userRepository ;
    @Autowired
    PasswordEncoder passwordEncoder ;
    @Autowired
    JwtService jwtService ;
    @Autowired
    AuthenticationManager authenticationManger ;

    @Override
    public AuthenticationResponse login(LoginRequest req) {

        // verify if the credentials are valid or not
        authenticationManger.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername() ,
                        req.getPassword()
                )
        );

        // console output
        System.out.println("login method: " +authenticationManger.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername() ,
                        req.getPassword()
                )
        ).isAuthenticated());

        // get user by username
        var user =userRepository.findByUsername(req.getUsername()).
                orElseThrow() ;

        //generate token
        // user details object
       UserDetailsImp userDetailsImp =new UserDetailsImp() ;
        BeanUtils.copyProperties(user,userDetailsImp);
        //token
        var token =jwtService.generateToken(userDetailsImp) ;
        //
        return AuthenticationResponse.builder()
                .jwtToken(token)
                .username(userDetailsImp.getUsername())
                .firstName(userDetailsImp.getFirstName())
                .lastName(userDetailsImp.getLastName())
                .profilePicture(userDetailsImp.getProfilePicture())
                .id(userDetailsImp.getId())
                .likedVideos(user.getLikedVideos())
                .subscribedToUsers(user.getSubscribedToUsers())
                .subscribers(user.getSubscribers())
                .videoHistory(user.getVideoHistory())
                .dislikedVideos(user.getDislikedVideos())
                .build() ;
    }

    @Override
    public AuthenticationResponse register(RegisterRequest req) {

        // build userDetails object
        var user= UserDetailsImp.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .profilePicture(req.getProfilePicture())
                .role(Role.USER)
                .build() ;

        // save the new user to db
        UserEntity userEntity =new UserEntity() ;
        BeanUtils.copyProperties(user,userEntity);
        UserEntity userSaved =userRepository.save(userEntity) ;
        //generate jwt token

        UserDetailsImp userRegistered=new UserDetailsImp() ;
        BeanUtils.copyProperties(userSaved,userRegistered);

        String token =jwtService.generateToken(userRegistered) ;

        return AuthenticationResponse.builder()
                .jwtToken(token)
                .lastName(userSaved.getLastName())
                .firstName(userSaved.getFirstName())
                .username(userSaved.getUsername())
                .id(userSaved.getId())
                .profilePicture(userSaved.getProfilePicture())
                .likedVideos(userSaved.getLikedVideos())
                .subscribedToUsers(userSaved.getSubscribedToUsers())
                .subscribers(userSaved.getSubscribers())
                .videoHistory(userSaved.getVideoHistory())
                .dislikedVideos(userSaved.getDislikedVideos())
                .build() ;
    }
}
