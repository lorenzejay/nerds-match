import React from "react";
import Link from "next/link";
import PaddingWrapper from "./paddingWrapper";
import { useAuth } from "../hooks/useAuth";

const Header = () => {
  const auth = useAuth();
  const { user, logout } = auth;

  return (
    <PaddingWrapper>
      <header className="flex items-center justify-between h-24">
        <h2 className="font-bold text-2xl">Nerds Match</h2>
        {!user ? (
          <ul className="flex flex-row justify-around w-72">
            <li>
              <Link href="/signIn">Sign In</Link>
            </li>
            <li>
              <Link href="/signUp">Sign Up</Link>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-row justify-around w-72">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>

            <li>
              <button onClick={logout}>logout</button>
            </li>
          </ul>
        )}
      </header>
    </PaddingWrapper>
  );
};

export default Header;
