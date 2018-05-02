import cookie from "./cookie";
import store from "@/store";
import router from "@/router";

function parseToken(token) {
  let path = store.state.baseURL;
  if (path === "") path = "/";
  document.cookie = `auth=${token}; max-age=86400; path=${path}`;

  //  store.commit("setJWT", token);
}

function loggedIn() {
  return new Promise((resolve, reject) => {
    let request = new window.XMLHttpRequest();
    request.open("GET", `${store.state.apiURL}/auth/session`, true);
    if (!store.state.noAuth)
      request.setRequestHeader("Authorization", `Bearer ${cookie("auth")}`);

    request.onload = () => {
      if (request.status === 200) {
        parseToken(request.responseText);
        resolve();
      } else {
        reject(new Error(request.responseText));
      }
    };
    request.onerror = () => reject(new Error("Could not finish the request"));
    request.send();
  });
}

function login(user, password) {
  let data = { loginname: user, password: password };
  return new Promise((resolve, reject) => {
    let request = new window.XMLHttpRequest();
    request.open("POST", `${store.state.apiURL}/auth/session`, true);

    request.onload = () => {
      var jsonResponse = JSON.parse(request.responseText);
      if (request.status === 200) {
        parseToken(jsonResponse.token);
        resolve();
      } else {
        reject(jsonResponse.error);
      }
    };
    request.onerror = () => reject(new Error("Could not finish the request"));
    request.send(JSON.stringify(data));
  });
}

// logout deletes the cookie and navigates to the login page
function logout() {
  let path = store.state.baseURL;
  if (path === "") path = "/";
  document.cookie = `auth=''; max-age=0; path=${path}`;
  router.push({ path: "/login" });
}

export default {
  loggedIn: loggedIn,
  login: login,
  logout: logout
};
