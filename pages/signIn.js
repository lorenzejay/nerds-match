import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Layout from "../components/layout";
import PaddingWrapper from "../components/paddingWrapper";
import { useAuth } from "../hooks/useAuth";

const SignIn = () => {
  const auth = useAuth();
  const { user, login, loginWithGoogle } = auth;

  console.log(user);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    await dispatch(login(email, password));
  };

  useEffect(() => {
    if (user !== null) {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <Layout>
      <PaddingWrapper className="w-full flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center justify-center w-full lg:w-1/2"
        >
          <h1>Login</h1>
          <input
            placeholder="email"
            type="name"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-opacity-10 border-black outline-none px-5 py-1 mt-3"
          />
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2 border-opacity-10 border-black outline-none px-5 py-1 mt-3"
          />
          <button onClick={() => dispatch(loginWithGoogle)}>Sign in with Google</button>
          <button type="submit" className="text-white bg-gray-800 mt-3">
            Submit
          </button>
        </form>
      </PaddingWrapper>
    </Layout>
  );
};

export default SignIn;
