import { useContext } from "react";
import authContext from "../context/AuthContext";

const useAuth = () => {
  const auth = useContext(authContext);

  if (auth === undefined) {
    throw new Error("useAuth must be inside AuthProvider");
  }

  return auth;
};

export default useAuth;
