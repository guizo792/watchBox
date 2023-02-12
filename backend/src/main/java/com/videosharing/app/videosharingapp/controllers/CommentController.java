package com.videosharing.app.videosharingapp.controllers;

import com.videosharing.app.videosharingapp.Entities.CommentEntity;
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

    @GetMapping("/comments/test")
    public ResponseEntity<String> testingRoute(){
        //
        return ResponseEntity.ok("Hello from comments route");
    }

    @GetMapping("/comments")
    public ResponseEntity<List<CommentEntity>> getAllComments(){
        List<CommentEntity> comments = commentRepository.findAll();
        return new ResponseEntity<List<CommentEntity>>(comments, HttpStatus.OK);
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<CommentEntity> getComment(@PathVariable String id){
        try {
            CommentEntity comment = commentRepository.findById(id).get();
            return new ResponseEntity<CommentEntity>(comment, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("No comment found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/comments")
    public ResponseEntity<CommentEntity> addComment(@RequestBody CommentEntity comment) {
        try {
            return new ResponseEntity<CommentEntity>(commentRepository.save(comment), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem adding the comment, Please try again!", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/comments/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable String id) {
        try {
            Boolean commentExist = commentRepository.findById(id).isPresent();
            if (commentExist) {
                commentRepository.deleteById(id);
                return new ResponseEntity<String>("comment deleted successfully", HttpStatus.NO_CONTENT);
            }
            throw new Exception("The id provided doesn't match any comment");
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem deleting the comment", HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping(path = "/comments/{id}")
    public ResponseEntity<CommentEntity> updateComment(@PathVariable String id, @RequestBody CommentEntity c) {
        try {
            CommentEntity comment = commentRepository.findById(id).get();
            c.setId(comment.getId());

        } catch(Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There is no comment with the provided id", HttpStatus.BAD_GATEWAY);

        }

        try {

            return new ResponseEntity<CommentEntity>(commentRepository.save(c), HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity("There was a problem editing the comment", HttpStatus.BAD_GATEWAY);
        }

    }
}
