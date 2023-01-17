import Link from "next/link";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout, router } = useAuth();
  const noProtectorReq = ["/", "/login", "/signup"];

  return (
    <>
      <nav className="flex justify-between items-center p-6 border border-b  ">
        <div className="text-2xl font-bold">BLOG-POST</div>
        {!noProtectorReq.includes(router.pathname) && user ? (
          <div className="flex gap-4">
            <p>{user.email}</p>

            <div
              className={`cursor-pointer ${
                router.pathname.includes("/") ? "text-blue-500" : ""
              }`}
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              LogOut
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/login"
              className={
                router.pathname == "/" || router.pathname == "/login"
                  ? "text-blue-500"
                  : ""
              }
            >
              LogIn
            </Link>
            <Link
              href="/signup"
              className={router.pathname == "/signup" ? "text-blue-500" : ""}
            >
              SignUp
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
