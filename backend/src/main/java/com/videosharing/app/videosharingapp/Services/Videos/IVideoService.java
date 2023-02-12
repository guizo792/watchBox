package com.videosharing.app.videosharingapp.Services.Videos;

import com.videosharing.app.videosharingapp.Entities.VideoEntity;

import java.util.List;

public interface IVideoService {
     List<VideoEntity> getAllVideos();
     VideoEntity getVideo(String id) throws Exception;
     VideoEntity addVideo(VideoEntity video);
     void deleteVideo(String id);
     VideoEntity updateVideo(String id, VideoEntity v);
}
