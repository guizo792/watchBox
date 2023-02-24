package com.videosharing.app.videosharingapp.controllers.Requests;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RequestMessage {
    private String message ;

    private String userToNotify ;

    private String userEmitter;
}
