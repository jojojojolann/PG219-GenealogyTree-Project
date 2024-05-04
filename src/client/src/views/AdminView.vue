<template>
    <div class="Profile">
        <h4>Profile</h4>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">User Information</h5>
                <li class="list-group-item">Email: {{ user?.email }}</li>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters(['user'])
    },
    methods: {
        ...mapActions(['getProfile'])
    },
    created() {
        this.getProfile();
    }
};
</script>

<style></style>