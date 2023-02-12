package com.videosharing.app.videosharingapp.utils;

import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ResponseHandler{
        public static ResponseEntity<Object> responseBuilder(
                HttpStatus httpStatus, List<VideoEntity> data, Integer results
        ) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", httpStatus);
            response.put("data", data);
            response.put("results", results);


            return  new ResponseEntity<>(response, httpStatus);
        }
}