import { useEffect, useState } from "react";
import { getUser } from "../../../services/userService";
import CommentForm from "./CommentForm";

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
    <div key={comment.id} className="flex gap-5">
      <div>
        <img
          src={`${commentAuthor?.profilePicture}`}
          alt="user"
          className="min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem] rounded-full border-[2px] border-pink-700 border-solid"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center text-[19px] gap-5">
          <div className="font-bold text-pink-800 tracking-wider	">
            {commentAuthor?.username}
          </div>
          <div>{new Date(comment?.createdAt).toLocaleDateString()}</div>
        </div>
        {!isEditing && <div className="comment-text">{comment.text}</div>}
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
        <div className="flex gap-5 items-center">
          {canReply && (
            <div
              className="text-sm text-gray-900 hover:text-gray-500 tracking-wider	 font-bold cursor-pointer
"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "replying" })
              }
            >
              Reply
            </div>
          )}
          {canEdit && (
            <div
              className="text-sm text-gray-900 hover:text-gray-500 tracking-wider font-bold cursor-pointer
"
              onClick={() =>
                setActiveComment({ id: comment.id, type: "editing" })
              }
            >
              Edit
            </div>
          )}
          {canDelete && (
            <div
              className="text-sm text-red-600 hover:text-red-900 tracking-wider	 font-bold cursor-pointer
"
              onClick={() => deleteComment(comment.id)}
            >
              Delete
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
            hasCancelButton
            handleSubmit={(text) => addComment(text, replyId)}
            handleCancel={() => {
              setActiveComment(null);
            }}
          />
        )}
        {replies?.length > 0 && (
          <div className="replies">
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
