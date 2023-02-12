package com.videosharing.app.videosharingapp.Entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

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
}
