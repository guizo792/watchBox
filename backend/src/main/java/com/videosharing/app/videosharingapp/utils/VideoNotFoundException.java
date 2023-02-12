package com.videosharing.app.videosharingapp.utils;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "There's no video matching the provided id")
public class VideoNotFoundException extends RuntimeException  {

}
