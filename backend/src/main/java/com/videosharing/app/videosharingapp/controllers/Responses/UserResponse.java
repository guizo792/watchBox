package com.videosharing.app.videosharingapp.controllers.Responses;


import com.videosharing.app.videosharingapp.model.Users.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.List;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse {

    private String id ;
    private String firstName;
    private String lastName ;
    private String username ;
    private Role role ;
    private String profilePicture;
    private Set<String> subscribedToUsers ;
    private  Set<String> subscribers ;
    private List<String> videoHistory ;
    private Set<String> likedVideos ;
    private Set<String> dislikedVideos;
}
