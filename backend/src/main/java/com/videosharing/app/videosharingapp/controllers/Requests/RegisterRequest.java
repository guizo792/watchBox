package com.videosharing.app.videosharingapp.controllers.Requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RegisterRequest {
    private String username ;
    private String password  ;
    private String firstName;
    private String lastName ;
    private String profilePicture ;
}
