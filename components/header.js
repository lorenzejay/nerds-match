import React from "react";
import Link from "next/link";
import PaddingWrapper from "./paddingWrapper";
import { useAuth } from "../hooks/useAuth";
const Header = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  return (
    <PaddingWrapper>
      <header className="flex items-center justify-between">
        <h2>Logo</h2>
        <ul className="flex flex-row justify-around w-72">
          <li>
            <Link href="/signIn">Sign In</Link>
          </li>
          <li>
            <Link href="/signUp">Sign Up</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          {user && (
            <li>
              <button onClick={logout}>logout</button>
            </li>
          )}
        </ul>
      </header>
    </PaddingWrapper>
  );
};

export default Header;
