import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
  initialText = "",
}) => {
  const [text, setText] = useState(initialText);
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form onSubmit={onSubmit} className="w-full">
      <label htmlFor="message" className="sr-only">
        Write comment
      </label>
      <textarea
        id="message"
        rows="2"
        className="field resize-y"
        placeholder="Add a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <div className="mt-2 flex justify-end gap-2">
        {hasCancelButton && (
          <button type="button" className="btn-ghost" onClick={handleCancel}>
            Cancel
          </button>
        )}
        <button className="btn-primary" disabled={isTextareaDisabled}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
