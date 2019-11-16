<template>
    <div>
        <h1>Users</h1>
        <p>Your role is: <strong>{{role}}</strong>.</p>
        <p>This page can be accessed by admin only.</p>
        <div>
            <div class="form-group">
              <h2>Users list: </h2>
              <ul class="list-group">
                <li class="list-group-item" v-for="user in usersList">
                  <div>{{user.email}}</div>
                  <div>
                    <button @click="selectUser(user)" type="button" class="btn btn-info btn-sm">
                      Edit
                    </button>
                    <button @click="deleteUser(user)" type="button" class="btn btn-danger btn-sm">
                      Remove
                    </button>
                  </div>

                </li>
              </ul>
            </div>
          <div v-if="successMessage" class="alert alert-info">{{successMessage}}</div>

          <AddUserForm />


          <modal name="edit-user-modal" :draggable="false" :clickToClose="false">
            <h2>Edit user: </h2>
            <form>
              <div class="form-group">
                <label htmlFor="username">Email</label>
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
                <button @click="onEdit" class="btn btn-primary btn-info" :disabled="loading">
                  <span class="spinner-border spinner-border-sm" v-show="loading"></span>
                  <span>Update user</span>
                </button>
              </div>
              <div v-if="error" class="alert alert-danger">{{error}}</div>
            </form>
            <div v-if="successMessage" class="alert alert-info">{{successMessage}}</div>
            <button class="btn btn-primary btn-sm" @click="hide">Close</button>
          </modal>


        </div>
    </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapGetters } from 'vuex';
import { ROLE } from '../../_helpers/role';
import AddUserForm from './components/AddUserForm';


export default {
  components: { AddUserForm },
  data() {
    return {
      userFromApi: null,
      interval: null,
      admin: ROLE.admin,
      user: ROLE.user,
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
  created() {
    if (this.currentUser) {
      this.fetchUsers(this.currentUser);
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
    ...mapGetters(['loading', 'error', 'currentUser', 'usersList', 'successMessage']),
  },

  methods: {
    ...mapActions([
      'fetchUsers',
      'createUser',
      'removeUser',
      'editUser',
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

    deleteUser(user) {
      this.removeUser(user);
    },

    selectUser(user) {
      this.selectedUser = user;
      this.show();
    },
    onEdit() {
      this.editUser({ ...this.selectedUser, newEmail: this.username });
    },
    show() {
      this.$modal.show('edit-user-modal');
    },
    hide() {
      this.$modal.hide('edit-user-modal');
    },
  },

};
</script>

<style scoped>
  .list-group-item{
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
</style>
