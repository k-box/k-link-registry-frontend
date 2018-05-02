<template>
  <router-view></router-view>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "app",
  data() {
    return {
      loaded: false
    };
  },
  mounted() {
    // once everything is initialized, remove
    // loading animation.
    this.unload();
  },
  methods: {
    unload() {
      this.loaded = true;
      // Remove loading animation.
      let loading = document.getElementById("loading");
      loading.classList.add("done");
      // remove after fade out
      setTimeout(function() {
        loading.parentNode.removeChild(loading);
      }, 200);
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700&amp;subset=cyrillic-ext,latin-ext");

$family-sans-serif: "Montserrat", sans-serif;

@import "../node_modules/bulma/bulma.sass";
</style>
