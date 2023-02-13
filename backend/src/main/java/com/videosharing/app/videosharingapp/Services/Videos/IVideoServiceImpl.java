package com.videosharing.app.videosharingapp.Services.Videos;

import com.videosharing.app.videosharingapp.Entities.VideoEntity;
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
    public VideoEntity addVideo(VideoEntity video) {
        return videoRepository.save(video);
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
        v.setId(video.getId());
        return videoRepository.save(v);
    }
}
