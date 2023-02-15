import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
// import {
//   updateComment as updateCommentApi,
//   deleteComment as deleteCommentApi,
// } from "./commentsApi";
import { getAllComments } from "../../../services/commentService";
import {
  fetchCommentsFailure,
  fetchCommentsStart,
  fetchCommentsSuccess,
} from "../../../store/comment/comment.action";
import { useSearchParams } from "react-router-dom";
import { createComment } from "../../../services/commentService";
import {
  deleteComment as deleteCommentApi,
  updateComment as updateCommentApi,
} from "../../../services/commentService";

const Comments = ({ commentsUrl, currentUserId }) => {
  const commentsDetails = useSelector((state) => state.commentsDetails);
  const currentUserData = useSelector((state) => state.appUser);
  // const videosData = useSelector((state) => state.videosServices);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const idParam = searchParams.get("id");

  const [backendComments, setBackendComments] = useState([]);
  // const [currentVideoComments, setCurrentVideoComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  let currentRootComments = useRef([]);
  currentRootComments.current = backendComments.filter(
    (backendComment) =>
      backendComment?.parentId === null && backendComment?.videoId === idParam
  );

  console.log(currentRootComments.current);
  // if (rootComments) {
  //   setCurrentVideoComments((backendComments) => {
  //     console.log("here is current comments updating");
  //     return backendComments.filter(
  //       (backendComment) => backendComment?.videoId === idParam
  //     );
  //   });
  // }

  useEffect(() => {
    dispatch(fetchCommentsStart());
    const getCommentsData = async () => {
      try {
        const comments = await getAllComments();
        // console.log(video.data);
        if (comments.data) {
          setBackendComments(comments.data);
          dispatch(fetchCommentsSuccess(comments.data));
        }
      } catch (err) {
        dispatch(fetchCommentsFailure(err));
      }
    };

    getCommentsData();
  }, [dispatch, idParam]);

  useEffect(() => {
    console.log("heeeeeeeeeeeeeeeeeey");
    console.log(currentRootComments.current);
    console.log(backendComments);
    currentRootComments.current = backendComments.filter(
      (backendComment) =>
        backendComment?.parentId === null && backendComment?.videoId === idParam
    );
  }, [backendComments, idParam]);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment?.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = async (text, parentId) => {
    if (currentUserData.currentUser) {
      const res = await createComment({
        text,
        parentId,
        videoId: idParam,
        createdAt: Date.now(),
        userId: currentUserData.currentUser.id,
        author: currentUserData.currentUser.username,
      });
      if (res.status !== 201) {
        throw new Error("There was an error creating the comment, try again!");
      }
      if (res?.data?.data) {
        const comment = res?.data?.data;
        const newBackendComments = [comment, ...backendComments];
        setBackendComments(newBackendComments);

        console.log(currentRootComments);
        console.log(backendComments);
        console.log(newBackendComments);
        console.log(commentsDetails.comments);
        setActiveComment(null);
        fetchCommentsSuccess();
        console.log(commentsDetails.comments);
      }
    } else {
      console.error("Please login to post comments ⚠");
    }
  };
  const updateComment = (text, commentId) => {
    updateCommentApi(commentId, { text })
      .then((res) => {
        const updatedBackendComments = backendComments.map((backendComment) => {
          if (backendComment?.id === commentId) {
            return { ...backendComment, body: res?.data?.data?.text };
          }
          return backendComment;
        });
        setBackendComments(updatedBackendComments);
        setActiveComment(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment?.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  return (
    <div className="mt-[20px] ml-14">
      <h3 className="text-2xl mb-[20px]">Comments</h3>
      <div className="text-xl">Write comment</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="mt-[40px] flex flex-col gap-6">
        {currentRootComments.current.map((currentVideoComment) => (
          <Comment
            key={currentVideoComment.id}
            comment={currentVideoComment}
            replies={getReplies(currentVideoComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
