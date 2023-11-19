import React from "react";
import { Comment } from "../../api/types";
import { CommentStyles } from "@owasp-guidelines-frontend/shared-lib";

type CommentProps = {
  comment: Comment
}

export const CommentComponent = (props: CommentProps) => {
  //TODO: Dodaj pravog korisnika - bbes
  const commentUser = "commentUser";
  return (
    <div className={CommentStyles.comment}>
      <div className={CommentStyles.commentHeader}>
        <span className={CommentStyles.commentUser}>{commentUser}</span>
        <span className={CommentStyles.commentDate}>{props.comment.creationDate}</span>
      </div>
      <p className={CommentStyles.commentText}>{props.comment.text}</p>
    </div>
  );
}
