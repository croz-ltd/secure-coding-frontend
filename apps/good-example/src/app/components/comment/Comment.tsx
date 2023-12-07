import React from "react";
import { Comment } from "../../api/types";
import { CommentStyles } from "@owasp-guidelines-frontend/shared-lib";

type CommentProps = {
  comment: Comment
}

export const CommentComponent = (props: CommentProps) => {
  return (
    <div className={CommentStyles.comment}>
      <div className={CommentStyles.commentHeader}>
        <span className={CommentStyles.commentUser}>{props.comment.creator.username}</span>
        <span className={CommentStyles.commentDate}>{props.comment.creationDate}</span>
      </div>
      { /* OWASP[210] */ }
      { /* OWASP[211] */ }
      <p className={CommentStyles.commentText}>{props.comment.text}</p>
    </div>
  );
}
