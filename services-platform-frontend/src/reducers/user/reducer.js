const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
const isLogedIn = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : {},
  token: token ? token : undefined,
  isLogedIn: user ? true : false,
};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "ADD_USER":
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        user: payload,
        token: state.token,
        isLogedIn: true,
      };
    case "ADD_TOKEN":
      localStorage.setItem("token", JSON.stringify(payload));
      return {
        user: state.user,
        token: payload,
        isLogedIn: true,
      };
    case "REMOVE_USER":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        user: {},
        token: undefined,
        isLogedIn: false,
      };
    default:
      return state;
  }
};

export default userReducer;
