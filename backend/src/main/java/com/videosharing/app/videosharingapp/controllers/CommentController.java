package com.videosharing.app.videosharingapp.controllers;

import com.videosharing.app.videosharingapp.Entities.CommentEntity;
import com.videosharing.app.videosharingapp.Entities.VideoEntity;
import com.videosharing.app.videosharingapp.Services.Comments.ICommentService;
import com.videosharing.app.videosharingapp.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api")
public class CommentController {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    ICommentService commentService;

    @GetMapping("/comments/test")
    public ResponseEntity<String> testingRoute(){
        //
        return ResponseEntity.ok("Hello from comments route");
    }

    @GetMapping("/comments")
    public ResponseEntity<List<CommentEntity>> getAllComments(){
        return new ResponseEntity<List<CommentEntity>>(commentService.getAllComments(), HttpStatus.OK);
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<CommentEntity> getComment(@PathVariable String id){
        try {
            CommentEntity comment = commentService.getComment(id);
            return new ResponseEntity<CommentEntity>(comment, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("No comment with the provided id, Please try again!", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/comments")
    public ResponseEntity<CommentEntity> addComment(@RequestBody CommentEntity comment) {
        try {
            return new ResponseEntity<CommentEntity>(commentService.addComment(comment), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem adding the comment, Please try again!", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/comments/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable String id) {
        try {
            commentService.deleteComment(id);
            return new ResponseEntity<String>("Comment deleted successfully", HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem deleting the comment", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/comments/{id}")
    public ResponseEntity<CommentEntity> updateComment(@PathVariable String id, @RequestBody CommentEntity c) {
        try {
            CommentEntity comment = commentService.updateComment(id, c);
            return new ResponseEntity<CommentEntity>(comment , HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem editing the comment informations", HttpStatus.BAD_GATEWAY);
        }
    }
}
