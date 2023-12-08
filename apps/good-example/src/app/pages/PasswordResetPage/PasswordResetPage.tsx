import React from 'react';
import {PasswordResetStyles} from "@owasp-guidelines-frontend/shared-lib";
import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {passwordReset} from "../../api/auth";
import {useNavigate} from "react-router-dom";
import ErrorComponent from "../../components/ErrorMessage/ErrorMessage";

//TODO: prikaži ovaj error kada nisu jednaki passwordi - bbes
const passwordResetSchema = z.object({
  username: z.string().min(1, {message: 'Required'}),
  password: z.string().min(1, {message: 'Required'}),
  confirmPassword: z.string().min(1, {message: 'Required'}),
  questionOneAnswer: z.string().min(1, {message: 'Required'}),
  questionTwoAnswer: z.string().min(1, {message: 'Required'}),
  questionThreeAnswer: z.string().min(1, {message: 'Required'})
}).refine(schema => {
  return schema.password === schema.confirmPassword
}, "Password do not match.")

const PasswordResetPage = () => {
  const resolver = zodResolver(passwordResetSchema);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      questionOneAnswer: "",
      questionTwoAnswer: "",
      questionThreeAnswer: ""
    }
  });

  /* eslint-disable */
  // @ts-ignore
  const onSubmit = (data) => {
    delete data.confirmPassword;
    passwordReset(data).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className={PasswordResetStyles.passwordResetPage}>
      <form className={PasswordResetStyles.passwordResetCard} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={PasswordResetStyles.passwordResetTitle}>Password Reset</h2>
        <div className={PasswordResetStyles.passwordResetInputGroup}>
          <label className={PasswordResetStyles.passwordResetLabel}>Username: </label>
          <input className={PasswordResetStyles.passwordResetInput} {...register('username')}/>
          {errors.username && <ErrorComponent message="Required" />}
        </div>
        <div className={PasswordResetStyles.passwordResetInputGroup}>
          <label className={PasswordResetStyles.passwordResetLabel}>New Password:</label>
          <input className={PasswordResetStyles.passwordResetInput} type="password" {...register('password')}/>
          {errors.username && <ErrorComponent message="Required" />}
        </div>
        <div className={PasswordResetStyles.passwordResetInputGroup}>
          <label className={PasswordResetStyles.passwordResetLabel}>Confirm Password:</label>
          <input className={PasswordResetStyles.passwordResetInput} type="password" {...register('confirmPassword')}/>
          {errors.username && <ErrorComponent message="Required" />}
        </div>
        <div className={PasswordResetStyles.passwordResetInputGroup}>
          <label className={PasswordResetStyles.passwordResetLabel}>What was the first exam you failed?</label>
          <input className={PasswordResetStyles.passwordResetInput} {...register('questionOneAnswer')}/>
          {errors.username && <ErrorComponent message="Required" />}
        </div>
        <div className={PasswordResetStyles.passwordResetInputGroup}>
          <label className={PasswordResetStyles.passwordResetLabel}>What was the name of your first stuffed animal?</label>
          <input className={PasswordResetStyles.passwordResetInput} {...register('questionTwoAnswer')}/>
          {errors.username && <ErrorComponent message="Required" />}
        </div>
        <div className={PasswordResetStyles.passwordResetInputGroup}>
          <label className={PasswordResetStyles.passwordResetLabel}>Where were you when you had your first kiss?</label>
          <input className={PasswordResetStyles.passwordResetInput} {...register('questionThreeAnswer')}/>
          {errors.username && <ErrorComponent message="Required" />}
        </div>
        <button className={PasswordResetStyles.passwordResetButton} type="submit">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default PasswordResetPage;
