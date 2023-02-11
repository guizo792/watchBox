package com.videosharing.app.videosharingapp.Services.Users;

import com.videosharing.app.videosharingapp.controllers.Requests.LoginRequest;
import com.videosharing.app.videosharingapp.controllers.Requests.RegisterRequest;
import com.videosharing.app.videosharingapp.controllers.Responses.AuthenticationResponse;



public interface AuthenticationService {
    AuthenticationResponse login(LoginRequest req) ;
    AuthenticationResponse register(RegisterRequest req);

}
