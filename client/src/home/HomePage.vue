<template>
    <div>
        <h1>Home</h1>
        <p>Your role is: <strong>{{currentUser.role}}</strong>.</p>
        <p>This page can be accessed by all authenticated users.</p>
        <div>

            <div class="form-group">
                <button class="btn btn-primary">
                    <span>A - all</span>
                </button>
                <button class="btn btn-primary" :disabled="!isAdmin">
                    <span>A - admin only</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { userService, authenticationService } from '@/_services';
import {Role} from "../_helpers/role";

export default {
    data () {
        return {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    },
    created () {
        userService.getById(this.currentUser.id).then(user => this.userFromApi = user);
    },
  computed: {
    isAdmin () {
      return this.currentUser && this.currentUser.role === Role.Admin;
    }
  },
};
</script>