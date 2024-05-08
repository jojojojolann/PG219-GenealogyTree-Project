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
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/api/users');
      this.users = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async promoteUser(email) {
      try {
        await axios.put(`http://localhost:3000/api/users/promote/${email}`);
        
        const user = this.users.find(user => user.email === email);
        user.role = 'admin';
      } catch (error) {
        console.error(error);
      }
    },
    async deleteUser(email) {
      try {
        await axios.delete(`http://localhost:3000/api/users/delete/${email}`);

        this.users = this.users.filter(user => user.email !== email);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
</style>