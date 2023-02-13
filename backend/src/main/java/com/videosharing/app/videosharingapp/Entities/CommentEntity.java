package com.videosharing.app.videosharingapp.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentEntity {
    @Id
    private String id;
    private String text;
    private String author;
    private Integer likeCount;
    private Integer dislikeCount;
    private String userId;
    private String parentId;
    private Date createdAt;
}
