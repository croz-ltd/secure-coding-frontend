import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import React from 'react';
import './LoginPage.css';
import ErrorComponent from "../../components/ErrorMessage/ErrorMessage";
import { login } from "../../api/login";

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' })
});

const LoginPage = () => {
  const resolver = zodResolver(loginSchema);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver
  });

  /* eslint-disable */
  const onSubmit = (data: any) => {
    login(data.username, data.password);
  };

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Username:</label>
          <input {...register('username')} />
          {errors.username && <ErrorComponent message="Username is required." />}
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input type="password" {...register('password')} />
          {errors.password && <ErrorComponent message="Password is required." />}
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
