import { useRouter } from "next/router";
import RouteProtector from "../components/RouteProtector";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/globals.css";
import Navbar from "../components/Navbar";
const noProtectorReq = ["/", "/login", "/signup"];
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      <AuthContextProvider>
        <Navbar />
        {noProtectorReq.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <RouteProtector>
            <Component {...pageProps} />
          </RouteProtector>
        )}
      </AuthContextProvider>
    </>
  );
}

export default MyApp;
