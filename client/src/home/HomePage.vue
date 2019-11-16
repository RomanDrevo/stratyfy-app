<template>
    <div>
        <h1>Home</h1>
        <p>Your role is: <strong>{{role}}</strong>.</p>
        <p>This page can be accessed by all authenticated users.</p>
        <div>

            <div class="form-group">
                <button class="btn btn-primary">
                    <span>A. Dumb button for all users</span>
                </button>
                <button @click="getToCrud" class="btn btn-primary" :disabled="!currentUser.isAdmin">
                    <span>B. Get to CRUD (admin only)</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import { ROLE } from '../_helpers/role';
import { router } from '@/_helpers';
import { mapGetters } from 'vuex';


export default {
  data() {
    return {
      userFromApi: null,
      // interval: null,
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

    // this.interval = setInterval(authenticationService.validateIsLoggedIn, 3000);
    // // setTimeout(authenticationService.logout, 60 * 1000);
  },
  // destroyed() {
  //   clearInterval(this.interval);
  // },
  computed: {
    ...mapGetters(['loading', 'error', 'currentUser']),
    role() {
      return this.currentUser && this.currentUser.isAdmin ? ROLE.admin : ROLE.user;
    },
  },
  methods: {
    getToCrud() {
      router.push('/users');
    },
  },
};
</script>
