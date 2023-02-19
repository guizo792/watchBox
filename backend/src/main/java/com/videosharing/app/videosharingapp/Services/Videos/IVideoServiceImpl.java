package com.videosharing.app.videosharingapp.Services.Videos;

import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.Entities.VideoStatus;
import com.videosharing.app.videosharingapp.model.Videos.VideoDetails;
import com.videosharing.app.videosharingapp.repositories.VideoRepository;
import com.videosharing.app.videosharingapp.utils.VideoNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class IVideoServiceImpl implements IVideoService {

    @Autowired
    VideoRepository videoRepository;

    // Utility function
    void throwExceptionIfNotExist(String id) {
        if (!videoRepository.existsById(id)) {
            throw new VideoNotFoundException();
        }
    }

    @Override
    public List<VideoEntity> getAllVideos() {
        return videoRepository.findAll();
    }

    @Override
    public VideoEntity getVideo(String id) throws VideoNotFoundException {
        throwExceptionIfNotExist(id);
        return videoRepository.findById(id).get();
    }

    @Override
    public VideoEntity addVideo(VideoDetails video) {
        System.out.println("Request BODY: " + video);
        VideoEntity createdVideo = new VideoEntity();
        createdVideo.setTitle(video.getTitle());
        createdVideo.setDescription(video.getDescription());
        createdVideo.setUserId(video.getUserId());
        createdVideo.setTags(video.getTags());
        createdVideo.setVideoUrl(video.getVideoURL());
        createdVideo.setThumbnailUrl(video.getThumbnailUrl());
        if (video.getVideoStatus() != null && video.getVideoStatus().equals("public")) {
            createdVideo.setVideoStatus(VideoStatus.PUBLIC);
        } else if (video.getVideoStatus() != null && video.getVideoStatus().equals("private")) {
            createdVideo.setVideoStatus(VideoStatus.PRIVATE);
        } else {
            createdVideo.setVideoStatus(VideoStatus.UNLISTED);
        }
        System.out.println(createdVideo);
        return videoRepository.save(createdVideo);
    }

    @Override
    public void deleteVideo(String id) {
        throwExceptionIfNotExist(id);
        videoRepository.deleteById(id);
    }

    @Override
    public VideoEntity updateVideo(String id, VideoEntity v) {
        throwExceptionIfNotExist(id);
        VideoEntity video = videoRepository.findById(id).get();
        if (v.getDescription() != null) video.setDescription(v.getDescription());
        if (v.getTitle() != null) video.setTitle(v.getTitle());
        if ( v.getLikes()!=null && v.getLikes() >= 0) video.setLikes(v.getLikes());
        if (v.getDislikes()!=null && v.getDislikes() >= 0 ) video.setDislikes(v.getDislikes());
        if (v.getTags() != null) video.setTags(v.getTags());
        if (v.getVideoUrl() != null) video.setVideoUrl(v.getVideoUrl());
        if (v.getUserId() != null) video.setUserId(v.getUserId());
        if (v.getVideoStatus() != null) video.setVideoStatus(v.getVideoStatus());
        if (v.getViewsCount() != 0) video.setViewsCount(v.getViewsCount());
        if (v.getThumbnailUrl() != null) video.setThumbnailUrl(v.getThumbnailUrl());
        return videoRepository.save(video);
    }
}
