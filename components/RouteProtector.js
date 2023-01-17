import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const RouteProtector = ({ children }) => {
  const { user, router } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
  return <>{user ? children : null}</>;
};

export default RouteProtector;
