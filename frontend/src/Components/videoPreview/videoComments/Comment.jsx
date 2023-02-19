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
    <div className="flex gap-[6rem] relative">
      <div key={comment.id} className="flex gap-5">
        <div>
          <img
            src={`${
              commentAuthor?.profilePicture || "/images/defaultProfile.jpg"
            } `}
            alt="user profile"
            className="min-w-[2rem] min-h-[2rem] max-w-[2rem] max-h-[2rem] rounded-full border-[2px] border-pink-700 border-solid"
          />
        </div>
        <div className="flex flex-col gap-1">
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
          {showReplies && replies?.length > 0 && (
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
      {replies.length > 0 && (
        <div className="open-close-btn">
          <button
            className="bg-transparent text-pink-700 transition-all duration-500 text-md border border-2 border-pink-700 rounded-full w-6 h-6 absolute top-1 left-[18rem] hover:text-white hover:bg-pink-700 flex items-center justify-center"
            onClick={(e) => {
              setShowReplies(!showReplies);
              showReplies
                ? (e.target.style.transform = "rotate(0)")
                : (e.target.style.transform = "rotate(180deg)");
            }}
          >
            ▼
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
