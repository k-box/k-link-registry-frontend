import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import getters from "./getters";

Vue.use(Vuex);

// shared state
const state = {
  apiURL: "http://localhost:8001/api/2.0",
  baseURL: document.querySelector('meta[name="base"]').getAttribute("content")
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state,
  getters,
  mutations
});
