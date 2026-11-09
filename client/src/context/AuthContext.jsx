import { createContext, useReducer } from "react";

const AuthContext = createContext();

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    case "LOGOUT":
      localStorage.removeItem("user");
      return { ...state, user: null };

    case "UPDATE_USER":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };

    default:
      return state;
  }
};

const getInitialUser = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser || storedUser === "undefined") return null;
  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, {
    user: getInitialUser(),
  });

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
