<template>
  <div class="container">
    <h1>Admin Dashboard</h1>
    <div class="row">
      <div class="col-md-4" v-for="user in users" :key="user._id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ user.email }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Role: {{ user.role }}</h6>
            <p class="card-text">Registered At: {{ user.createdAt }}</p>
            <button class="btn btn-primary" @click="promoteUser(user.email)">Promote</button>
            <button class="btn btn-danger" @click="deleteUser(user.email)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['users']),
  },
  methods: {
    ...mapActions(['fetchUsers', 'promoteUser', 'deleteUser']),
  },
  async created() {
    await this.fetchUsers();
  },
};
</script>

<style scoped>
</style>