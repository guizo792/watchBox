package com.videosharing.app.videosharingapp.Services.Videos;

import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.model.Videos.VideoDetails;

import java.util.List;
import java.util.Set;



public interface IVideoService {
     List<VideoEntity> getAllVideos();
     VideoEntity getVideo(String id) throws Exception;
     VideoEntity addVideo(VideoDetails video);
     void deleteVideo(String id);
     VideoEntity updateVideo(String id, VideoEntity v);
     Set<String> searchKeyWords(String key);
     List<VideoEntity> searchVideo(String key);
     List<VideoEntity> getVideosToRecommend(String idUser) ;
}
