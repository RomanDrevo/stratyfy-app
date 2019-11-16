<template>
  <div>
    <h2 v-if="!selectedUser">Add user: </h2>
    <form v-if="!selectedUser" @submit.prevent="onSubmit">
      <div class="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          v-model.trim="$v.username.$model"
          name="username" class="form-control"
          :class="{ 'is-invalid': submitted && $v.username.$error }"
        />
        <div v-if="submitted && !$v.username.required" class="invalid-feedback">
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
          <span>Create user</span>
        </button>
      </div>
      <div v-if="error" class="alert alert-danger">{{error}}</div>
    </form>
  </div>
</template>

<script>

import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'AddUserForm',
  data() {
    return {
      userFromApi: null,
      interval: null,
      username: '',
      password: '',
      submitted: false,
      selectedUser: null,
    };
  },
  validations: {
    username: { required },
    password: { required },
  },
  computed: {
    ...mapGetters(['loading', 'error', 'currentUser', 'successMessage']),
  },
  methods: {
    ...mapActions([
      'createUser',
    ]),
    onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.createUser({ email: this.username, password: this.password });

      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style scoped>

</style>
