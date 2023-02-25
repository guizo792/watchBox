package com.videosharing.app.videosharingapp.controllers.Responses;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage {
    private String message ;
    private String idSender;
    private final Date date =new Date() ;
}
