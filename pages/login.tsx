import React, { useEffect, useState } from "react";
import Head from "next/head";
import Input from "../components/Atomic/Input";
import styles from "../styles/pages/Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/actions.auth";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../components/Atomic/Button";

const Login = () => {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const dispatch = useDispatch();
  const { loading, loginError, user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  // redirect to dashboard if loading is successful
  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem("xt@k#n", user.token);
      localStorage.setItem("iin-user", JSON.stringify(user));
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleLogin = async () => {
    const loginValidation = yup.object().shape({
      email: yup
        .string()
        .required("Email is required")
        .email("Not a valid email"),
      password: yup.string().min(4).max(8).required("Password is required"),
    });

    try {
      await loginValidation.validate(formData);
      setErrors({});
    } catch (error: any) {
      setErrors({
        [error.path]: error.message,
      });
      return;
    }

    dispatch(login(formData));
  };

  return (
    <div>
      <Head>
        <title>Login - iinact</title>
        <meta name="description" content="Login to practice and master" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div
          className={
            styles.loginContainer +
            " h-screen w-screen flex justify-center items-center bg-slate-100"
          }
        >
          <div className="absolute top-0 left-0 p-4 text-white italic font-bold text-2xl md:text-3xl">
            iinact
          </div>
          <div className="shadow-lg bg-white rounded-md overflow-hidden w-72 md:w-1/3">
            <div className="text-xl font-semibold p-2 bg-slate-300 text-slate-600">
              Log In
            </div>
            <div className="px-2">
              <Input
                required
                parentClasses="my-2"
                name="email"
                type="text"
                label="Email"
                placeholder="iamcool@gmail.com"
                errorMessage={errors.email}
                setFormState={setFormData}
              />
              <Input
                required
                parentClasses="my-2"
                name="password"
                type="password"
                label="Password"
                placeholder="******"
                errorMessage={errors.password}
                setFormState={setFormData}
              />

              <div className="flex flex-col items-center my-4">
                <Link href="/signup" passHref>
                  <div className="mb-2 text-sm text-semibold text-red-400 cursor-pointer">
                    Don&apos;t have an account?
                  </div>
                </Link>
                <Button
                  title="Enter"
                  classes="w-full"
                  loading={loading}
                  onClick={handleLogin}
                />
              </div>
            </div>
            {loginError && (
              <div className="w-full flex items-center justify-center h-8 text-center bg-red-400 text-slate-100">
                {loginError === "ER_DUP_ENTRY"
                  ? "Account already exists"
                  : loginError}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
