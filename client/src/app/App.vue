<style scoped>
  .xxx {
    border: 3px dashed red!important;
  }
</style>


<template>
    <div class="xxx">
        <nav class="navbar navbar-expand navbar-dark bg-dark">
            <div class="navbar-nav">
                <router-link to="/" class="nav-item nav-link">Home</router-link>
<!--                <a @click="logout" class="nav-item nav-link">Logout</a>-->
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
        <form @submit.prevent="onSubmit">
          <div  class="form-group">
            <label for="username">Username</label>
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
          <div v-if="$store.state.error" class="alert alert-danger">{{error}}</div>
        </form>

<!--        <button @click="login('user@lala.com', '1234')">Login x</button>-->

      </modal>


    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';
import { authenticationService } from '@/_services';
import { router } from '@/_helpers';

export default {
  name: 'app',
  data() {
    return {
      currentUser: null,
      username: '',
      password: '',
      submitted: false,
      loading: false,
      returnUrl: '',
      error: this.$store.state.error,
      interval: null,
      isLoggedIn: this.$store.state.isLoggedIn,
    };
  },
  validations: {
    username: { required },
    password: { required },
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.isAdmin;
    },
  },
  created() {
    // const isLoggedIn = authenticationService.validateIsLoggedIn();

    setTimeout(() => {
      if (!this.isLoggedIn) {
        this.show();
      }
    }, 100);

    this.interval = setInterval(authenticationService.validateIsLoggedIn, 3000);
    setTimeout(authenticationService.logout, 15 * 1000);
  },
  methods: {
    ...mapActions([
      'openLoginModal',
      'closeLoginModal',
      'login',
    ]),
    logout() {
      authenticationService.logout();
      router.push('/login');
    },
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;
      this.login({ email: this.username, password: this.password });
      // .then((res) => {
      //   if (res) {
      //     this.loading = false;
      //     this.username = '';
      //     this.password = '';
      //     this.hide();
      //   }
      // },
      // (error) => {
      //   this.error = error;
      //   this.loading = false;
      // });
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


