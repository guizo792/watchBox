package com.videosharing.app.videosharingapp.Services.Comments;

import com.videosharing.app.videosharingapp.Entities.CommentEntity;
import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.repositories.CommentRepository;
import com.videosharing.app.videosharingapp.utils.CommentNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ICommentServiceImpl implements ICommentService {
    @Autowired
    CommentRepository commentRepository;

    // Utility function
    void throwExceptionIfNotExist(String id) {
        if (!commentRepository.existsById(id)) {
            throw new CommentNotFoundException();
        }
    }

    @Override
    public List<CommentEntity> getAllComments() {
        return commentRepository.findAll();
    }

    @Override
    public CommentEntity getComment(String id) throws CommentNotFoundException {
        throwExceptionIfNotExist(id);
        return commentRepository.findById(id).get();
    }

    @Override
    public CommentEntity addComment(CommentEntity comment) {
        return commentRepository.save(comment);
    }

    @Override
    public void deleteComment(String id) {
        throwExceptionIfNotExist(id);
        commentRepository.deleteById(id);
    }

    @Override
    public CommentEntity updateComment(String id, CommentEntity v) {
        throwExceptionIfNotExist(id);
            CommentEntity comment = commentRepository.findById(id).get();
        v.setId(comment.getId());
        return commentRepository.save(v);
    }
}
