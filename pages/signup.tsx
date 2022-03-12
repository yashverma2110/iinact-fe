import React, { useEffect, useState } from "react";
import Head from "next/head";
import Input from "../components/Input";
import styles from "../styles/Login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/auth/actions.auth";
import * as yup from "yup";
import Link from "next/link";
import { useRouter } from "next/router";

const Signup = () => {
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const dispatch = useDispatch();
  const { signupError, user } = useSelector((state: any) => state.auth);
  const router = useRouter();

  // redirect to dashboard if loading is successful
  useEffect(() => {
    if (user) {
      localStorage.setItem("xt@k#n", user.token);
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSignup = async () => {
    const signupValidation = yup.object().shape({
      firstName: yup.string().required("Required"),
      lastName: yup.string().required("Required"),
      email: yup
        .string()
        .required("Email is required")
        .email("Not a valid email"),
      password: yup.string().min(4).max(8).required("Password is required"),
    });

    try {
      await signupValidation.validate(formData);
      setErrors({});
    } catch (error: any) {
      setErrors({
        [error.path]: error.message,
      });
      return;
    }

    dispatch(signup(formData));
  };

  return (
    <div>
      <Head>
        <title>Sign Up - iinact</title>
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
              Sign Up
            </div>
            <div className="px-2">
              <div className="grid grid-cols-2">
                <Input
                  required
                  parentClasses="my-2"
                  name="firstName"
                  type="text"
                  label="First name"
                  placeholder="Cool"
                  errorMessage={errors.firstName}
                  setFormState={setFormData}
                />
                <Input
                  required
                  parentClasses="my-2"
                  name="lastName"
                  type="text"
                  label="Last name"
                  placeholder="Dude"
                  errorMessage={errors.lastName}
                  setFormState={setFormData}
                />
              </div>
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
                <Link href="/login" passHref>
                  <div className="mb-2 text-sm text-semibold text-red-400 cursor-pointer">
                    Already have an account?
                  </div>
                </Link>
                <button
                  className="w-full rounded-full shadow py-2 px-4 bg-red-400 text-white font-bold hover:animate-pulse text-xl md:w-1/2"
                  onClick={handleSignup}
                >
                  Create
                </button>
              </div>
            </div>
            {signupError && (
              <div className="w-full flex items-center justify-center h-8 text-center bg-red-400 text-slate-100">
                {signupError === "ER_DUP_ENTRY"
                  ? "Account already exists"
                  : signupError}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
