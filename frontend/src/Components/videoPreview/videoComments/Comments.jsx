import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import {
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "./commentsApi";
import { getAllComments } from "../../../services/commentService";
import {
  fetchCommentsFailure,
  fetchCommentsStart,
  fetchCommentsSuccess,
} from "../../../store/comment/comment.action";
import { useSearchParams } from "react-router-dom";
import { createComment } from "../../../services/commentService";

const Comments = ({ commentsUrl, currentUserId }) => {
  const commentsDetails = useSelector((state) => state.commentsDetails);
  const currentUser = useSelector((state) => state.appUser);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const idParam = searchParams.get("id");

  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const currentVideoComments = backendComments.filter(
    (backendComment) => backendComment.videoId === idParam
  );

  useEffect(() => {
    dispatch(fetchCommentsStart());
    const getCommentsData = async () => {
      const fetchData = async () => {
        return await getAllComments(searchParams.get("id"), "userId");
      };
      try {
        const comments = await fetchData();
        // console.log(video.data);
        if (comments.data) {
          console.log("hiiiiiiiiiiiiiiiiiiiii       11111111");
          console.log(comments.data);
          setBackendComments(comments.data);
          dispatch(fetchCommentsSuccess(comments.data));
        }
      } catch (err) {
        dispatch(fetchCommentsFailure(err));
      }
    };

    getCommentsData();
  }, [idParam]);

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  const addComment = async (text, parentId) => {
    const res = await createComment({
      text,
      parentId,
      videoId: idParam,
      createdAt: Date.now(),
      userId: currentUserId,
      // userId: currentUser.id,
      // author: currentUser: username,
    });
    if (res.status !== 201) {
      throw new Error("There was an error creating the comment, try again!");
    }
    if (res?.data?.data) {
      const comment = res?.data?.data;
      setBackendComments([comment, ...backendComments], () => {
        console.log([comment, ...backendComments]);
        console.log(backendComments);
      });
      console.log(commentsDetails.comments);
      setActiveComment(null);
      fetchCommentsSuccess();
      console.log(commentsDetails.comments);
    }
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
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
        {currentVideoComments.map((currentVideoComment) => (
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
