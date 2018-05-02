<template>
  <div class="fullsize">
    <!-- Transparent overlay over the background image -->
    <div class="bgfade"></div>

    <div class="sign-in">
      <div class="branding">
        <img src="@/assets/img/klink-logo-web.svg" alt="Klink logo">
        <div class="platform">ICSD Network Registry</div>
      </div>

      <form @submit="submit" class="form-signin">
        <div v-if="wrong" class="notification is-warning">
          <strong>login.wrongCredentials</strong>
        </div>

        <h2 class="is-size-3 has-text-centered">login.title</h2>
        <input v-model="loginname" name="email" type="email" class="input is-medium is-shadowless"
        :placeholder="'login.email'" required autofocus>
        <input v-model="password" name="password" type="password" class="input is-medium is-shadowless"
        :placeholder="'login.password'" required>
        <button class="button is-medium is-fullwidth is-info" type="submit">login.submit</button>
        <div class="has-text-centered">
          <a class="button is-text is-fullwidth">login.forgot_password_link</a>
        </div>
      </form>
      <div class="has-text-centered">
        <a class="has-text-white">login.sign_up_link</a>
      </div>

    </div> <!-- /container -->
  </div>
</template>

<script>
import auth from "@/utils/auth";
import { mapState } from "vuex";

export default {
  name: "login",
  props: ["dependencies"],
  data: function() {
    return {
      wrong: false,
      loginname: "",
      password: ""
    };
  },
  mounted() {
    if (this.dependencies) this.setup();
  },
  watch: {
    dependencies: function(val) {
      if (val) this.setup();
    }
  },
  methods: {
    submit(event) {
      event.preventDefault();
      event.stopPropagation();

      let redirect = this.$route.query.redirect;
      if (redirect === "" || redirect === undefined || redirect === null) {
        redirect = "/applications/";
      }

      auth
        .login(this.loginname, this.password)
        .then(() => {
          this.$router.push({ path: redirect });
        })
        .catch(() => {
          this.wrong = true;
        });
    }
  }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
  margin: 0px;
  padding: 0px;
}

.fullsize {
  height: 100%;
  background: #0090ff url(//test.klink.asia/images/land.jpg) no-repeat center
    center fixed;
  background-size: cover;
  padding-top: 40px;
  padding-bottom: 40px;
}

.bgfade {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 144, 255, 0.85);
}

.sign-in {
  max-width: 330px;
  width: 80%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.form-signin {
  border: 1px solid black;
  border: none;
  border-radius: 3px;
  padding: 15px;
  background: rgba(255, 255, 255, 1);
  clear: both;

  h2 {
    margin-bottom: 10px;
  }
}

.branding {
  .platform {
    position: relative;
    top: 24px;
    transform: translate(0%, -50%);
    text-align: center;
    color: #fff;
  }
  img {
    float: left;
    margin-bottom: 10px;
    margin-right: 10px;
  }
}

.form-signin input[name="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[name="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.form-signin .input:focus {
  z-index: 2;
}
</style>
