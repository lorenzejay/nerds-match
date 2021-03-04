import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import PaddingWrapper from "../components/paddingWrapper";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/layout";

const SignUp = () => {
  //gets the signUp function created in useAuth
  const auth = useAuth();
  const { signUp, user, error } = auth;

  useEffect(() => {
    if (user) {
      return router.push("/dashboard");
    }
  }, [auth]);

  //router
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //form success/errors
  const [formError, setFormError] = useState("");

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await signUp({ name, email, password });
        if (error === null) {
          router.push("/dashboard");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      setFormError("Passwords do not match");
    }
  };

  return (
    <Layout>
      <PaddingWrapper>
        {error && <p className="text-red-500 text-2xl">{error.message}</p>}
        <form className="flex lg:flex-col w-full" onSubmit={handleCreateAccount}>
          <h1>Sign Up</h1>
          {formError && <p>{formError}</p>}
          {/* {createAccountSuccess && <p>Successfully Created an account</p>}
        {createAccountError && <p>{createAccountError}</p>} */}
          <input
            placeholder="name"
            type="text"
            className="w-full  border-2 border-opacity-20 px-5 py-1 outline-none mt-2"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="email"
            type="text"
            className="w-full  border-2 border-opacity-20 px-5 py-1 outline-none mt-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            className="w-full border-2 border-opacity-20 px-5 py-1 outline-none mt-2"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="confirm password"
            type="password"
            className="w-full border-2 border-opacity-20 px-5 py-1 outline-none mt-2"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="text-white bg-gray-800 border-none rounded">
            create account
          </button>
        </form>
      </PaddingWrapper>
    </Layout>
  );
};

export default SignUp;
