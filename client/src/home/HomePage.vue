<template>
    <div>
        <h1>Home</h1>
        <p>Your role is: <strong>{{role}}</strong>.</p>
        <p>This page can be accessed by all authenticated users.</p>
        <div>

            <div class="form-group">
                <button class="btn btn-primary">
                    <span>A - all users</span>
                </button>
                <button class="btn btn-primary" :disabled="!isAdmin">
                    <span>A - admin only</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { authenticationService } from '@/_services';
import { ROLE } from '../_helpers/role';

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
    // userService.getById(this.currentUser.id).then(user => this.userFromApi = user);
    this.interval = setInterval(authenticationService.validateIsLoggedIn, 3000);
    setTimeout(authenticationService.logout, 20 * 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.user.isAdmin;
    },
    role() {
      return this.currentUser && this.currentUser.user.isAdmin ? ROLE.admin : ROLE.user;
    },
  },
};
</script>
