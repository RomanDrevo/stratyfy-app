<template>
    <div>
        <h1>Users</h1>
        <p>Your role is: <strong>{{role}}</strong>.</p>
        <p>This page can be accessed by admin only.</p>
        <div>
            <div class="form-group">
              <h2>Users list: </h2>

              <ul class="list-group">
                <li class="list-group-item" v-for="user in usersList">{{user.email}}</li>
              </ul>
            </div>


          <h2>Add user: </h2>
          <form @submit.prevent="onSubmit">
            <div class="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" v-model.trim="$v.username.$model" name="username" class="form-control" :class="{ 'is-invalid': submitted && $v.username.$error }" />
              <div v-if="submitted && !$v.username.required" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" v-model.trim="$v.password.$model" name="password" class="form-control" :class="{ 'is-invalid': submitted && $v.password.$error }" />
              <div v-if="submitted && !$v.password.required" class="invalid-feedback">Password is required</div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary" :disabled="loading">
                <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                <span>Create</span>
              </button>
            </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
          </form>
        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { authenticationService } from '@/_services';
import { ROLE } from '../_helpers/role';
import { userService } from '../_services';
import { router } from '@/_helpers';


export default {
  data() {
    return {
      currentUser: authenticationService.getCurrentUser(),
      userFromApi: null,
      interval: null,
      admin: ROLE.admin,
      user: ROLE.user,
      usersList: [],
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: '',
    };
  },
  validations: {
    username: { required },
    password: { required },
  },
  created() {
    console.log('--curr user: ', this.currentUser);
    this.interval = setInterval(authenticationService.validateIsLoggedIn, 3000);
    // setTimeout(authenticationService.logout, 20 * 1000);
    if (this.currentUser) {
      userService.getAll().then(users => this.usersList = users.data);
    }
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.isAdmin;
    },
    role() {
      return this.currentUser && this.currentUser.isAdmin ? ROLE.admin : ROLE.user;
    },
  },
  methods: {
    getToCrud() {
      router.push('/users');
    },
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.loading = true;
      userService.createUser(this.username, this.password)
        .then((res) => {
          console.log('--newUser: ', res);
          if (res.data) {
            this.loading = false;
            this.usersList = [...this.usersList, res.data];
            this.username = '';
            this.password = '';
          }
        },
        (error) => {
          this.error = error;
          this.loading = false;
        });
    },
  },

};
</script>
