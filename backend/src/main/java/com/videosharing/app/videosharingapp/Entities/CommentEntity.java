package com.videosharing.app.videosharingapp.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Document(value = "Comment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
    @Id
    private String id;
    private String text;
    private Integer likeCount;
    private Integer dislikeCount;
    private String userId;
    private String videoId;
    private String parentId;
    private Date createdAt;
}
