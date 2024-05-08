<template>
  <div class="container">
    <h1>Admin Dashboard</h1>
    <div class="row">
      <div class="col-md-3" v-for="user in localUsers" :key="user._id">
        <div class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">{{ user.email }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Role: {{ user.role }}</h6>
            <p class="card-text">Created: {{ user.date }}</p>
            <button class="btn btn-primary m-1" v-if="user.email !== currentUserEmail" @click="promoteUser(user.email)">Promote</button>
            <button class="btn btn-danger" v-if="user.email !== currentUserEmail" @click="deleteUser(user.email)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      localUsers: [],
    };
  },
  computed: {
    users() {
      return this.$store.state.Auth.users;
    },
    currentUserEmail() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user ? user.email : '';
    },
  },
  methods: {
    ...mapActions(['fetchUsers', 'promoteUser', 'deleteUser']),
  },
  async created() {
    await this.fetchUsers();
    this.localUsers = this.users;
  },
};
</script>

<style scoped>
</style>