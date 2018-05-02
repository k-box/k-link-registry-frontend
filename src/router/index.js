import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import auth from "@/utils/auth";

Vue.use(Router);

// Routes that require authentication will have the property
// `meta.requiresAuth=true`. Routes that require admin permission will have
// the property `meta.requiresAdmin`.

export default new Router({
  base: document.querySelector('meta[name="base"]').getAttribute("content"),
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      beforeEnter: function(to, from, next) {
        auth
          .loggedIn()
          .then(() => {
            next({ path: "/app" });
          })
          .catch(() => {
            document.title = "Login";
            next();
          });
      }
    }
  ]
});
