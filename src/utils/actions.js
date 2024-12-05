export const loginUser = (token) => {
    return {
      type: "LOGIN_USER",
      payload: token,
    };
  };
  
  export const logoutUser = () => {
    return {
      type: "LOGOUT_USER",
    };
  };
  