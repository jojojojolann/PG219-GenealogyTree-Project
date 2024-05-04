<template>
    <div>
        <h1>Admin Dashboard</h1>
    </div>
    <ul>
        <li v-for="user in users" :key="user.id">
            {{ user.email }} - {{ user.role }}
            <button @click="deleteUser(user._id)">Delete</button>
            <button @click="promoteUser(user._id)">Promote</button>
        </li>
    </ul>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            users: []
        };
    },
    methods: {
        fetchUsers() {
            axios.get('/api/users/all', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                this.users = response.data;
            })
            .catch(error => {
                console.error(error);
                if (error.response && error.response.status === 403) {
                    alert('You are not authorized to view this page');
                }
            });
        }
    },
    created() {
        this.fetchUsers();
    }
};
</script>

<style></style>