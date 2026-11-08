import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import Toast from "../../Alert/Toast";
import ConfirmDialog from "../../Modal/ConfirmDialog";
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
  const [pendingDelete, setPendingDelete] = useState(null);
  const [notice, setNotice] = useState({ show: false, msg: "" });
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
      setNotice({ show: true, msg: "Please log in to post comments" });
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
  const deleteComment = (commentId) => setPendingDelete(commentId);
  const confirmDelete = () => {
    const commentId = pendingDelete;
    setPendingDelete(null);
    deleteCommentApi(commentId).then(() => {
      const updatedBackendComments = backendComments?.filter(
        (backendComment) => backendComment?.id !== commentId
      );
      setBackendComments(updatedBackendComments);
    });
  };

  return (
    <section className="mt-2" aria-label="Comments">
      <h2 className="mb-4 text-lg font-semibold">
        {currentRootComments.current?.length || 0} Comments
      </h2>
      <CommentForm submitLabel="Comment" handleSubmit={addComment} />
      <div className="mt-8 flex flex-col gap-6">
        {commentsDetails.isFetching ? (
          Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex gap-3" aria-hidden="true">
              <div className="skeleton h-9 w-9 shrink-0 !rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-3 w-1/4" />
                <div className="skeleton h-4 w-3/4" />
              </div>
            </div>
          ))
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

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete comment?"
        message="This can't be undone."
        confirmLabel="Delete"
        danger
        onCancel={() => setPendingDelete(null)}
        onConfirm={confirmDelete}
      />
      {notice.show && <Toast msg={notice.msg} show={setNotice} />}
    </section>
  );
};

export default Comments;
