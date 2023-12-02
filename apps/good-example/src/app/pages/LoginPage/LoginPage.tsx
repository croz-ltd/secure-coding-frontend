import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { useNavigate } from "react-router-dom";

import React from 'react';
import ErrorComponent from "../../components/ErrorMessage/ErrorMessage";
import { login } from "../../api/auth";
import { LoginPageStyles } from "@owasp-guidelines-frontend/shared-lib";

const loginSchema = z.object({
  username: z.string().min(1, { message: 'Required' }),
  password: z.string().min(1, { message: 'Required' })
});

const LoginPage = () => {
  const resolver = zodResolver(loginSchema);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm({
    resolver,
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const onSubmit = (data: any) => {
    login(data.username, data.password)
      .then(() => {
        navigate("/home");
      }).catch((error) => {
      setError("root.serverError", { type: "custom", message: error})
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
        {errors.root?.serverError && <ErrorComponent message={errors.root.serverError.message ?? ""} />}
        <button className={LoginPageStyles.loginButton} type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
