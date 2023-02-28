package com.videosharing.app.videosharingapp.Services.Videos;

import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.Entities.VideoStatus;
import com.videosharing.app.videosharingapp.model.Videos.VideoDetails;
import com.videosharing.app.videosharingapp.repositories.VideoRepository;
import com.videosharing.app.videosharingapp.exceptions.VideoNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

        System.out.println("............. update this videoS");
        VideoEntity video = videoRepository.findById(id).get();
        if (v.getDescription() != null) video.setDescription(v.getDescription());
        if (v.getTitle() != null) video.setTitle(v.getTitle());
        if ( v.getLikes()!=null && v.getLikes() >= 0) {
            video.setLikes(v.getLikes());
        };
        if (v.getDislikes()!=null && v.getDislikes() >= 0 ) video.setDislikes(v.getDislikes());
        if (v.getTags() != null) video.setTags(v.getTags());
        if (v.getVideoUrl() != null) video.setVideoUrl(v.getVideoUrl());
        if (v.getUserId() != null) video.setUserId(v.getUserId());
        if (v.getVideoStatus() != null) video.setVideoStatus(v.getVideoStatus());

        if (v.getViewsCount() != null && v.getViewsCount()>=0 ) {
            video.setViewsCount(v.getViewsCount());
        };

        if (v.getThumbnailUrl() != null) video.setThumbnailUrl(v.getThumbnailUrl());
        return videoRepository.save(video);
    }


    // search videos with words /

    public Set<String> searchKeyWords(String key){
        //
        List<VideoEntity> videosList = videoRepository.findAll() ;
        Set<String> listSearchSuggestions =new HashSet<>() ;

        if(!key.equals("") && !key.equals(" ")){
            videosList.forEach(video ->{
                if(video.getTitle()!=null && video.getDescription()!=null &&video.getTags()!=null){
                    // search if title contains key
                    if(video.getTitle().toLowerCase().contains(key.toLowerCase())) {
                        listSearchSuggestions.add(video.getTitle())  ;
                    };
                    // search in description string
                    if(video.getDescription().toLowerCase().contains(key.toLowerCase())){
                        listSearchSuggestions.add(video.getTitle()) ;
                    };
                    //search in tags array :
                    for(String tag : video.getTags()) {
                        if(tag.toLowerCase().contains(key.toLowerCase())){
                            listSearchSuggestions.add(tag) ;
                        }
                    }
                }
            });
        }

        // returns search result
        return listSearchSuggestions;
    }

    @Override
    public List<VideoEntity> searchVideo(String key) {

        List<VideoEntity> listVideos =videoRepository.findAll();
        List<VideoEntity> filtredList= new ArrayList<>() ;

        if(!key.equals("") && !key.equals(" ")){
            for(VideoEntity video :listVideos ){
                if(video.getTitle()!=null && video.getDescription()!=null &&video.getTags()!=null){

                    if(video.getTitle().toLowerCase().contains(key.toLowerCase())) {
                        filtredList.add(video)  ;
                    } else if (video.getDescription().toLowerCase().contains(key.toLowerCase())) {
                        filtredList.add(video) ;
                    }else{

                        // verify if any tag much with the key

                        for(String tag : video.getTags()) {
                            if(tag.toLowerCase().contains(key.toLowerCase())){
                                filtredList.add(video) ;
                                break;
                            }
                        }
                    }
                }
            }
        }
        return filtredList;
    }
}
