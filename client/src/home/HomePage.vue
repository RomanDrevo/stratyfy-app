<template>
    <div>
        <h1>Home</h1>
        <p>Your role is: <strong>{{role}}</strong>.</p>
        <p>This page can be accessed by all authenticated users.</p>
        <div>

            <div class="form-group">
                <button @click="show" class="btn btn-primary">
                    <span>A. Dumb button for all users</span>
                </button>
                <button @click="getToCrud" class="btn btn-primary" :disabled="!isAdmin">
                    <span>B. Get to CRUD (admin only)</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import { authenticationService } from '@/_services';
import { ROLE } from '../_helpers/role';
import { router } from '@/_helpers';


export default {
  data() {
    return {
      currentUser: authenticationService.getCurrentUser(),
      userFromApi: null,
      interval: null,
      admin: ROLE.admin,
      user: ROLE.user,
    };
  },

  created() {

    // redirect to home if already logged in
    // if (authenticationService.currentUserValue) {
    //   return router.push('/');
    // }
    //
    // // get return url from route parameters or default to '/'
    // this.returnUrl = this.$route.query.returnUrl || '/';

    this.interval = setInterval(authenticationService.validateIsLoggedIn, 3000);
    // setTimeout(authenticationService.logout, 60 * 1000);
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
    show() {
      this.$modal.show('hello-world');
    },
  },
};
</script>
