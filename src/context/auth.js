import { createContext, useReducer, useEffect } from "react";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
};

const AuthContext = createContext({
  user: null,
  login: (data) => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
    case "RESET":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
      } else {
        initialState.user = decodedToken;
      }
    }
  }, []);

  function login(data) {
    localStorage.setItem("jwtToken", data);
    dispatch({
      type: "LOGIN",
      payload: jwtDecode(data),
    });
  }
  function reset(data) {
    dispatch({
      type: "RESET",
      payload: data,
    });
  }

  function logout() {
    localStorage.removeItem("jwtToken");
    dispatch({
      type: "LOGOUT",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout, reset }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
