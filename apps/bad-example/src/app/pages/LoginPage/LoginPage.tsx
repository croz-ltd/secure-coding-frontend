import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigate } from "react-router-dom";

import React from 'react';
import ErrorComponent from "../../components/ErrorMessage/ErrorMessage";
import { login } from "../../api/login";
import { LoginPageStyles } from "@owasp-guidelines-frontend/shared-lib";

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' }),
  rememberMe: z.boolean()
});

const LoginPage = () => {
  const resolver = zodResolver(loginSchema);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver,
    defaultValues: {
      password: "",
      username: "",
      rememberMe: true
    }
  });

  /* eslint-disable */
  const onSubmit = (data: any) => {
    login(data.username, data.password, data.rememberMe)
      .then(() => {
        navigate("/home");
      });
  };

  return (
    <div className={LoginPageStyles.loginPage}>
      <form className={LoginPageStyles.loginCard} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={LoginPageStyles.loginTitle}>Login</h2>
        <div className={LoginPageStyles.inputGroup}>
          <label className={LoginPageStyles.loginLabel}>Username:</label>
          <input className={LoginPageStyles.loginInput} {...register('username')} />
          {errors.username && <ErrorComponent message="Username is required." />}
        </div>
        <div className={LoginPageStyles.inputGroup}>
          <label className={LoginPageStyles.loginLabel}>Password:</label>
          <input className={LoginPageStyles.loginInput} type="password" {...register('password')} />
          {errors.password && <ErrorComponent message="Password is required." />}
        </div>
        <input type="checkbox" {...register('rememberMe')} style={{marginBottom: "1rem"}}/>
        <label>Remember me</label>
        <button className={LoginPageStyles.loginButton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
