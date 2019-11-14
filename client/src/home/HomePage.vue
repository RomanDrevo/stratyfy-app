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
    console.log('--curr user: ', this.currentUser);
    this.interval = setInterval(authenticationService.validateIsLoggedIn, 3000);
    // setTimeout(authenticationService.logout, 60 * 1000);
    // if (this.currentUser) {
    //   userService.getAll();
    // }
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
  },
};
</script>
