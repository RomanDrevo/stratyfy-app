<style>

  .v--modal-box{
    height: auto!important;
    padding: 40px!important;
  }
</style>


<template>
    <div>
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-nav">
                <router-link to="/" class="nav-item nav-link">Home</router-link>
                <a @click="logout" class="nav-item nav-link">Logout</a>
            </div>
        </nav>
        <div class="jumbotron">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 offset-sm-3">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>

      <modal name="login-modal" :draggable="false" :clickToClose="false">
        <h2>Login</h2>
        <form class="login-form" @submit.prevent="onSubmit">
          <div  class="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              v-model.trim="$v.username.$model"
              name="username"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.username.$error }"
            />
            <div
              v-if="submitted && !$v.username.required"
              class="invalid-feedback"
            >
              Username is required
            </div>
          </div>
          <div class="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              v-model.trim="$v.password.$model"
              name="password"
              class="form-control"
              :class="{ 'is-invalid': submitted && $v.password.$error }"
            />
            <div v-if="submitted && !$v.password.required" class="invalid-feedback">
              Password is required
            </div>
          </div>
          <div class="form-group">
            <button class="btn btn-primary" :disabled="loading">
              <span class="spinner-border spinner-border-sm" v-show="loading"></span>
              <span>Login</span>
            </button>
          </div>
          <div v-if="error" class="alert alert-danger">{{error}}</div>
        </form>


      </modal>


    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app',
  data() {
    return {
      username: '',
      password: '',
      submitted: false,
      interval: null,
      logoutTimer: 15 * 1000,
    };
  },
  validations: {
    username: { required },
    password: { required },
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
    ...mapGetters(['loading', 'error', 'currentUser']),
  },
  mounted() {
    // const isLoggedIn = authenticationService.validateIsLoggedIn();

    if (!this.$store.state.isLoggedIn && this.$modal) {
      this.show();
    } else {
      this.hide();
    }
    if (this.currentUser) {
      setTimeout(this.logout, this.logoutTimer);
    }
  },
  updated() {
    if (!this.$store.state.isLoggedIn && this.$modal) {
      this.show();
    } else {
      this.hide();
    }
    if (this.currentUser) {
      setTimeout(this.logout, this.logoutTimer);
    }
  },
  methods: {
    ...mapActions([
      'login',
      'logout',
    ]),
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.login({ email: this.username, password: this.password });

      // setTimeout(this.logout, 60 * 1000);
    },
    show() {
      this.$modal.show('login-modal');
    },
    hide() {
      this.$modal.hide('login-modal');
    },
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>
