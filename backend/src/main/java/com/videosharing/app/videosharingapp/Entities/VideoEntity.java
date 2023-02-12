package com.videosharing.app.videosharingapp.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document(value = "Video")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoEntity {
    @Id
    private String id;
    private String description;
    private String title;
    private String userId;
    private Integer likes;
    private Integer dislikes;
    private List<String> tags;
    private String url;
    private VideoStatus videoStatus;
    private Integer viewsCount;
    private String thumbnailUrl;
    private List<CommentEntity> comments;
}
