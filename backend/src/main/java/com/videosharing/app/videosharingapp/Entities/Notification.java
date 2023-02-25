package com.videosharing.app.videosharingapp.Entities;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class Notification {
    private String message ;
    private String idSender;
    private Set<String> usersToNotify;
    private Date date;
}
