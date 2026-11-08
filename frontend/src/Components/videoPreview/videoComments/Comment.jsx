import { useEffect, useState } from "react";
import { getUser } from "../../../services/userService";
import CommentForm from "./CommentForm";
import Avatar from "../../Avatar/Avatar";

const actionBtn =
  "text-xs font-semibold text-muted transition-colors hover:text-ink";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  updateComment,
  deleteComment,
  addComment,
  parentId,
  currentUserId,
  authorId,
}) => {
  const [commentAuthor, setCommentAuthor] = useState(null);
  const [showReplies, setShowReplies] = useState(false);

  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "editing";
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  const canDelete = currentUserId === comment.userId && replies.length === 0;
  const canReply = Boolean(currentUserId);
  const canEdit = currentUserId === comment.userId;
  const replyId = parentId ? parentId : comment.id;

  useEffect(() => {
    if (authorId) {
      getUser(authorId).then((res) => {
        setCommentAuthor(res);
      });
    }
  }, []);

  return (
    <div className="flex gap-3">
      <Avatar
        src={commentAuthor?.profilePicture}
        name={commentAuthor?.username}
        className="h-9 w-9 text-sm"
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-semibold">
            {commentAuthor?.username || "User"}
          </span>
          <span className="text-xs text-muted">
            {new Date(comment?.createdAt).toLocaleDateString()}
          </span>
        </div>

        {!isEditing && (
          <p className="mt-0.5 whitespace-pre-line break-words text-sm">
            {comment.text}
          </p>
        )}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.text}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}

        <div className="mt-1 flex items-center gap-4">
          {canReply && (
            <button
              type="button"
              className={actionBtn}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </button>
          )}
          {canEdit && (
            <button
              type="button"
              className={actionBtn}
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </button>
          )}
          {canDelete && (
            <button
              type="button"
              className="text-xs font-semibold text-red-500 transition-colors hover:text-red-600"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </button>
          )}
        </div>

        {isReplying && (
          <div className="mt-2">
            <CommentForm
              submitLabel="Reply"
              hasCancelButton
              handleSubmit={(text) => addComment(text, replyId)}
              handleCancel={() => {
                setActiveComment(null);
              }}
            />
          </div>
        )}

        {replies.length > 0 && (
          <button
            type="button"
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
            aria-expanded={showReplies}
            onClick={() => setShowReplies(!showReplies)}
          >
            <span
              aria-hidden="true"
              className={
                "inline-block text-xs transition-transform " +
                (showReplies ? "rotate-180" : "")
              }
            >
              ▼
            </span>
            {replies.length} {replies.length === 1 ? "reply" : "replies"}
          </button>
        )}

        {showReplies && replies?.length > 0 && (
          <div className="mt-3 flex flex-col gap-4 border-l border-line pl-4">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
                authorId={reply?.userId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
