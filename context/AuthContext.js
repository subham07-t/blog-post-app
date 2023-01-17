import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  // path track
  const router = useRouter();

  // error handle
  const [alertActivate, setAlertActivate] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("something wrong here. Try again");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [idForUpdate, setIdForUpdate] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    setAlertActivate(false);
  };
  const handleMessage = (authCode) => {
    let alertMsg = authCode;
    alertMsg == "too-many-requests"
      ? setErrMsg(
          "credentials did not match please create an account or try again few min later"
        )
      : setErrMsg(alertMsg);
  };
  const value = {
    user,
    signup,
    login,
    logout,
    router,
    handleMessage,
    errMsg,
    setErrMsg,
    alertActivate,
    setAlertActivate,
    successAlert,
    setSuccessAlert,
    data,
    setData,
    updateMode,
    setUpdateMode,
    idForUpdate,
    setIdForUpdate,
    desc,
    setDesc,
    title,
    setTitle,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
