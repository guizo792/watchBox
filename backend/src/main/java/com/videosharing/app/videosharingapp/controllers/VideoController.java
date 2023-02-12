package com.videosharing.app.videosharingapp.controllers;


import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.repositories.VideoRepository;
import com.videosharing.app.videosharingapp.utils.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class VideoController {

    @Autowired
    VideoRepository videoRepository;

    @GetMapping("/test")
    public ResponseEntity<String> testingRoute() {
        //
        return ResponseEntity.ok("Hello from authentication route");
    }

    @GetMapping("/videos")
    public ResponseEntity<Object> getAllVideos() {
        List<VideoEntity> videos = videoRepository.findAll();
        return ResponseHandler.responseBuilder(HttpStatus.OK, videos, videos.size());
//        return new ResponseEntity<List<VideoEntity>>(videoRepository.findAll(), HttpStatus.OK);
    }

    @GetMapping("/videos/{id}")
    public ResponseEntity<VideoEntity> getVideo(@PathVariable String id) {
        try {
            VideoEntity video = videoRepository.findById(id).get();
            return new ResponseEntity<VideoEntity>(video, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There is no video with this id", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/videos")
    public ResponseEntity<VideoEntity> addVideo(@RequestBody VideoEntity video) {
        try {
            VideoEntity v = videoRepository.save(video);
            if (videoRepository.existsById(v.getId())) {
                return new ResponseEntity<VideoEntity>(v, HttpStatus.CREATED);
            }
            return new ResponseEntity("There was a problem adding the video, Please try again!", HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem adding the video, Please try again!", HttpStatus.BAD_REQUEST);
        }

    }

    @DeleteMapping(path = "/videos/{id}")
    public ResponseEntity<String> deleteVideo(@PathVariable String id) {
        try {
            Boolean videoExist = videoRepository.findById(id).isPresent();
            if (videoExist) {
                videoRepository.deleteById(id);
                return new ResponseEntity<String>("Video deleted successfully", HttpStatus.NO_CONTENT);
            }
            throw new Exception("The id provided doesn't match any video");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem deleting the video", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/videos/{id}")
    public ResponseEntity<VideoEntity> updateVideo(@PathVariable String id, @RequestBody VideoEntity v) {
        try {
            VideoEntity video = videoRepository.findById(id).get();
            v.setId(video.getId());

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There is no video with the provided id", HttpStatus.BAD_GATEWAY);

        }

        try {

            return new ResponseEntity<VideoEntity>(videoRepository.save(v), HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem editing the video informations", HttpStatus.BAD_GATEWAY);
        }

    }
}
