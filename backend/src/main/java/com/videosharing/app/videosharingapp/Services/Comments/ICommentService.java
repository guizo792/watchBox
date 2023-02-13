package com.videosharing.app.videosharingapp.Services.Comments;

import com.videosharing.app.videosharingapp.Entities.CommentEntity;

import java.util.List;

public interface ICommentService {
    List<CommentEntity> getAllComments();
    CommentEntity getComment(String id) throws Exception;
    CommentEntity addComment(CommentEntity video);
    void deleteComment(String id);
    CommentEntity updateComment(String id, CommentEntity v);
}
