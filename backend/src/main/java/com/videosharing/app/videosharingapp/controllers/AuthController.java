package com.videosharing.app.videosharingapp.controllers;


import com.videosharing.app.videosharingapp.Services.Users.AuthenticationService;
import com.videosharing.app.videosharingapp.Services.Users.AuthenticationServiceImp;
import com.videosharing.app.videosharingapp.controllers.Requests.LoginRequest;
import com.videosharing.app.videosharingapp.controllers.Requests.RegisterRequest;
import com.videosharing.app.videosharingapp.controllers.Responses.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")

public class AuthController {

    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("/test")
    public ResponseEntity<String> testingRoute(){
        //
        return ResponseEntity.ok("Hello from authentication route");
    }

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest registerRequest){
        return ResponseEntity.ok(authenticationService.register(registerRequest));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(
            @RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authenticationService.login(loginRequest));
    }
}
