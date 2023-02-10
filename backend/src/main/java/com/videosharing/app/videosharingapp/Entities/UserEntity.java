package com.videosharing.app.videosharingapp.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.Set;

@Document(value = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    private String id ;
    private String firstName;
    private String lastName ;
    private String emailAddress ;
    private String password ;
    private String profilePicture;
    private Set<String> subscribedToUsers ;
    private  Set<String> subscribers ;
    private List<String> videoHistory ;
    private Set<String> likedVideos ;
    private Set<String> dislikedVideos;
}
