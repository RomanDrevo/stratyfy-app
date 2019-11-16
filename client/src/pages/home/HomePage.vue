<template>
    <div v-if="currentUser">
        <h1>Home</h1>
        <p>Your role is: <strong>{{role}}</strong>.</p>
        <p>This page can be accessed by all authenticated users.</p>
        <div>

            <div class="form-group">
                <button class="btn btn-primary btn-sm">
                    <span>A. Dumb button for all users</span>
                </button>
                <button
                  @click="getToCrud"
                  class="btn btn-primary btn-sm"
                  :disabled="!currentUser.isAdmin"
                >
                    <span>B. Get to CRUD (admin only)</span>
                </button>
            </div>
        </div>

    </div>
</template>

<script>
import { ROLE } from '../../_helpers/role';
import { router } from '@/_helpers';
import { mapGetters } from 'vuex';


export default {
  data() {
    return {
      userFromApi: null,
      admin: ROLE.admin,
      user: ROLE.user,
    };
  },
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
