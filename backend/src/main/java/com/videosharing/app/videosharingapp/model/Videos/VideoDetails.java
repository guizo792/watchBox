package com.videosharing.app.videosharingapp.model.Videos;

import com.videosharing.app.videosharingapp.Entities.CommentEntity;
import com.videosharing.app.videosharingapp.Entities.VideoStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoDetails {
    private String description;
    private String title;
    private String userId;
    private List<String> tags;
    private String videoURL;
    private String videoStatus;
    private String thumbnailUrl;
}
