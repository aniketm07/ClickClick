import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const setSessionCookie = async (token) => {
  if (token) {
    Cookies.set("session", token, { expires: 1 / 24 });
    Cookies.set("logged-in", true, { expires: 1 / 24 });
  }
};

export const removeSession = () => {
  Cookies.remove("session");
  Cookies.remove("logged-in");
};

export const getSession = () => {
  return Cookies.get("session");
};

export const getEmail = async () => {
  const token = getSession();
  if (token) {
    const decodedToken = jwtDecode(token);
    const email = decodedToken["email"];
    return email;
  }
};

export const isLoggedIn = () => {
  return Cookies.get("logged-in") === "true";
};

export const checkAlreadyLoggedIn = () => {
  return isLoggedIn() && getSession() !== undefined;
};
