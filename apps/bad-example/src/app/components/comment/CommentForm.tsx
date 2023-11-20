import React from "react";
import {CommentFormStyles} from "@owasp-guidelines-frontend/shared-lib";
import {useMutation} from "@tanstack/react-query";
import {CreateCommentCommand} from "../../api/types";
import * as productApi from "../../api/product";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import ErrorComponent from "../ErrorMessage/ErrorMessage";

const commentSchema = z.object({
  text: z.string().min(1, {message: 'Required'})
});

type CommentFormProps = {
  id: number;
  onSubmit: () => void;
}

export const CommentForm = (props: CommentFormProps) => {
  const resolver = zodResolver(commentSchema);

  const mutation = useMutation({
    mutationKey: ["product", props.id],
    mutationFn: (createCommentCommand: CreateCommentCommand) => {
      return productApi.createComment(props.id, createCommentCommand);
    },
    onSuccess: () => {
      return props.onSubmit();
    }
  });

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver,
    defaultValues: {
      text: ""
    }
  });

  /* eslint-disable */
  const onSubmit = (data: any) => {
    mutation.mutate(data);
  }

  return (
    <form className={CommentFormStyles.commentForm} onSubmit={handleSubmit(onSubmit)}>
      <textarea placeholder="Type your comment here..."
                className={CommentFormStyles.commentFormTextarea} {...register('text')}/>
      {errors.text && <ErrorComponent message={errors.text.message ?? ""} />}
      <button type="submit" className={CommentFormStyles.commentFormButton}>Add Comment</button>
    </form>
  );
}
