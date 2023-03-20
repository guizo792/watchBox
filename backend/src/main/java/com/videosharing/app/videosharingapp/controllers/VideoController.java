package com.videosharing.app.videosharingapp.controllers;


import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.Services.Videos.IVideoService;
import com.videosharing.app.videosharingapp.model.Videos.VideoDetails;
import com.videosharing.app.videosharingapp.repositories.VideoRepository;
import com.videosharing.app.videosharingapp.utils.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class VideoController {



    @Autowired
    VideoRepository videoRepository;

    @Autowired
    IVideoService videoService;

    @GetMapping("/test")
    public ResponseEntity<String> testingRoute() {
        //
        return ResponseEntity.ok("video route testing");
    }

    @GetMapping("/videos")
    public ResponseEntity<Object> getAllVideos() {
        List<VideoEntity> videos = videoService.getAllVideos();
        return ResponseHandler.responseBuilder(HttpStatus.OK, videos, videos.size());
//        return new ResponseEntity<List<VideoEntity>>(videoService.getAllVideos(), HttpStatus.OK);
    }

    @GetMapping("/videos/{id}")
    public ResponseEntity<VideoEntity> getVideo(@PathVariable String id){
        try {
            VideoEntity video = videoService.getVideo(id);
            return new ResponseEntity<VideoEntity>(video, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("No video with the provided id, Please try again!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/videos")
    public ResponseEntity<VideoEntity> addVideo(@RequestBody VideoDetails video) {
        try {
            VideoEntity v = videoService.addVideo(video);
            if (videoRepository.existsById(v.getId())) {
                //System.out.println("inside this if ");
               ;
                return new ResponseEntity<VideoEntity>(v, HttpStatus.CREATED);
            } else {
                return new ResponseEntity("There was a problem adding the video, Please try again!", HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem adding the video, Please try again!", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/videos/{id}")
    public ResponseEntity<String> deleteVideo(@PathVariable String id) {
        try {
            videoService.deleteVideo(id);
            return new ResponseEntity<String>("Video deleted successfully", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem deleting the video", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/videos/{id}")
    public ResponseEntity<VideoEntity> updateVideo(@PathVariable String id, @RequestBody VideoEntity v) {
        try {
            VideoEntity video = videoService.updateVideo(id, v);

            return new ResponseEntity<VideoEntity>(video , HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem editing the video informations", HttpStatus.BAD_GATEWAY);
        }

    }

    // search videos
    @GetMapping("/videos/search")
    public ResponseEntity<Set<String>> searchVideoKeys(@RequestParam String key){
        Set<String> listSugg =videoService.searchKeyWords(key) ;
        //System.out.println(listSugg);
        return new ResponseEntity<>(listSugg,HttpStatus.OK);
    }

    @GetMapping("/videos/find")
    public ResponseEntity<List<VideoEntity>> filterVideosWithKey(@RequestParam String key){
        List<VideoEntity> filteredVideos =videoService.searchVideo(key) ;
        //System.out.println(listSugg);
        return new ResponseEntity<>(filteredVideos,HttpStatus.OK);
    }

    @GetMapping("/videosRecommend")
    public ResponseEntity<Object> getVideosToRecommendToUser(@RequestParam String idUser){
        List<VideoEntity> videos =videoService.getVideosToRecommend(idUser);
        //System.out.println(listSugg);
        return ResponseHandler.responseBuilder(HttpStatus.OK, videos, videos.size());

    }

}
