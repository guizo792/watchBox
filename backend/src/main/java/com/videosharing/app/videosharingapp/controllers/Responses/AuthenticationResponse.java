package com.videosharing.app.videosharingapp.controllers.Responses;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
    private String jwtToken ;
    private String username ;
    private String lastName ;
    private String firstName ;
    private String profilePicture ;
    private String id ;
}
