import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import LoadingSpinner from "../../loadingSpinner/spinner";
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
  const commentsDetails = useSelector((state) => state.comment);
  const currentUserData = useSelector((state) => state.appUser);

  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const idParam = searchParams.get("id");

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  let currentRootComments = useRef([]);
  // let updatedBackendComments = useRef([]);

  if (backendComments)
    currentRootComments.current = backendComments?.filter(
      (backendComment) =>
        backendComment?.parentId === null && backendComment?.videoId === idParam
    );
  useEffect(() => {
    dispatch(fetchCommentsStart());
    const getCommentsData = async () => {
      try {
        const comments = await getAllComments();
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
    //console.log(currentRootComments.current);
    currentRootComments.current = backendComments?.filter(
      (backendComment) =>
        backendComment?.parentId === null && backendComment?.videoId === idParam
    );
  }, [backendComments, idParam]);

  const getReplies = (commentId) =>
    backendComments
      ?.filter((backendComment) => backendComment?.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = (text, parentId) => {
    //console.log(currentRootComments.current);
    if (currentUserData.currentUser) {
      createComment({
        text,
        parentId,
        videoId: idParam,
        createdAt: Date.now(),
        userId: currentUserData.currentUser.id,
        author: currentUserData.currentUser.username,
      }).then((res) => {
        if (res?.data) {
          const comment = res?.data;
          const newBackendComments = [comment, ...backendComments];
          setBackendComments(newBackendComments);
          setActiveComment(null);
          fetchCommentsSuccess();
        } else {
          //console.log(res);
        }
      });
    } else {
      alert("Please login to post comments ⚠");
    }
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(commentId, { text })
      .then((res) => {
        setBackendComments((backendComments) => {
          return backendComments.map((backendComment) => {
            if (backendComment?.id === commentId) {
              return { ...backendComment, text: res.data.text };
            } else return backendComment;
          });
        });

        setActiveComment(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi(commentId).then(() => {
        const updatedBackendComments = backendComments?.filter(
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
        {commentsDetails.isFetching ? (
          <LoadingSpinner />
        ) : (
          <>
            {currentRootComments.current?.map((currentVideoComment) => (
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
                authorId={currentVideoComment?.userId}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
