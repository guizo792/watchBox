package com.videosharing.app.videosharingapp.controllers.Requests;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PasswordChangeReq {
    String currentPassword ;
    String newPassword ;
}
