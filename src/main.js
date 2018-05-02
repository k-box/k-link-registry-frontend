import Vue from "vue";
import router from "./router";
import store from "./store";
import App from "./App";

console.log(
  "%cThanks for using the K-Registry! %c😊",
  // Nice big comic-sans-like font, because comic-sans
  // is never wrong.
  "font: 4em cursive; color: #dd4814;",
  // we use serif for the emoji, since it is more
  // likely to contain the graphical variant.
  "font: 5em serif;"
);

new Vue({
  el: "#app",
  store,
  router,
  template: "<App/>",
  components: { App }
});
