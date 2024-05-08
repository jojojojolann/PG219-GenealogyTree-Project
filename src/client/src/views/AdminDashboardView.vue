<template>
  <br>
  <div class="container">
    <h1>Admin Dashboard</h1>
    <br>
    <div class="row">
      <div class="col-md-3" v-for="user in localUsers" :key="user._id">
        <div class="card mb-2">
          <div class="card-body">
            <h5 class="card-title">{{ user.email }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Role: {{ user.role }}</h6>
            <p class="card-text">Created: {{ user.date }}</p>
            <button class="btn btn-info text-white m-1" v-if="user.email == currentUserEmail" disabled>This you</button>
            <button class="btn btn-primary m-1" v-if="user.email !== currentUserEmail && user.email === megaAdmin" 
            @click="promoteUser(user.email)">Promote</button>
            <button class="btn btn-primary m-1" v-if="user.email !== currentUserEmail && user.email === 'admin@admin.com'" 
            disabled>Super Admin</button>
            <button class="btn btn-danger m-1" v-if="user.email !== currentUserEmail && user.email !== 'admin@admin.com' && user.role === 'admin'" 
            disabled>Admin</button>
            <button class="btn btn-danger m-1" v-if="user.email !== currentUserEmail && user.role !== 'admin'" 
            @click="deleteUser(user.email)" disa>Delete</button>
            <button class="btn btn-danger m-1" v-if="user.email !== currentUserEmail && megaAdmin && user.role === 'admin'" 
            @click="demoteUser(user.email)">Demote</button>
            <button class="btn btn-primary m-1 text-white" v-if="user.email !== currentUserEmail && user.role !== 'admin'" 
            @click="promoteUser(user.email)">Promote</button>
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
    megaAdmin() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user.email === 'admin@admin.com') {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions(['fetchUsers', 'promoteUser', 'deleteUser', 'demoteUser']),
  },
  async created() {
    await this.fetchUsers();
    this.localUsers = this.users;
  },
};
</script>

<style scoped>
</style>