<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand text-white" href="/home">MyTree</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink"
                            role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Account
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <li><router-link to="/login-register" class="dropdown-item"
                                    v-if="!isAuthenticated">Login</router-link></li>
                            <li><router-link to="/admin-dashboard" class="dropdown-item" 
                                    v-if="isAdmin">Dashboard</router-link></li>
                            <li><router-link to="/" class="dropdown-item" @click.prevent="logoutUser"
                                    v-if="isAuthenticated">Logout</router-link></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    computed: {
        ...mapGetters(['isAuthenticated', 'isAdmin'])
    },
    methods: {
        ...mapActions(['logout']),
        checkAuth() {
            console.log(this.isAuthenticated);
        },
        logoutUser() {
            console.log("Logging out...");
            this.logout().then(() => {
                console.log('Logged out. Current token:', this.$store.state.token);
                this.checkAuth();
            });
        }

    },
    mounted() {
        this.checkAuth();
    },
    name: "AppNavbar",
};
</script>


<style>
body {
    background-color: #2c7056;
    color: white;
}

.navbar {
    background-color: rgba(0, 0, 0, 0.25);
}

.navbar .dropdown-menu {
    right: 0;
    left: auto;
    width: auto;
    text-align: center;
}

.navbar .dropdown-item {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
}

.dropdown-menu {
    --bs-dropdown-zindex: 1000;
    --bs-dropdown-padding-x: 0;
    --bs-dropdown-padding-y: 0.5rem;
    --bs-dropdown-spacer: 0.125rem;
    --bs-dropdown-font-size: 1rem;
    --bs-dropdown-min-width: 0rem;
    --bs-dropdown-color: var(--bs-body-color);
    --bs-dropdown-bg: var(--bs-body-bg);
    --bs-dropdown-border-color: var(--bs-border-color-translucent);
    --bs-dropdown-border-radius: var(--bs-border-radius);
    --bs-dropdown-border-width: var(--bs-border-width);
    --bs-dropdown-inner-border-radius: calc(var(--bs-border-radius) - var(--bs-border-width));
    --bs-dropdown-divider-bg: var(--bs-border-color-translucent);
    --bs-dropdown-divider-margin-y: 0.5rem;
    --bs-dropdown-box-shadow: var(--bs-box-shadow);
    --bs-dropdown-link-color: var(--bs-body-color);
    --bs-dropdown-link-hover-color: var(--bs-body-color);
    --bs-dropdown-link-hover-bg: var(--bs-tertiary-bg);
    --bs-dropdown-link-active-color: #fff;
    --bs-dropdown-link-active-bg: #2c7056;
    --bs-dropdown-link-disabled-color: var(--bs-tertiary-color);
    --bs-dropdown-item-padding-x: 1rem;
    --bs-dropdown-item-padding-y: 0.25rem;
    --bs-dropdown-header-color: #6c757d;
    --bs-dropdown-header-padding-x: 1rem;
    --bs-dropdown-header-padding-y: 0.5rem;
    position: absolute;
    z-index: var(--bs-dropdown-zindex);
    display: none;
    min-width: var(--bs-dropdown-min-width);
    padding: var(--bs-dropdown-padding-y) var(--bs-dropdown-padding-x);
    margin: 0;
    font-size: var(--bs-dropdown-font-size);
    color: var(--bs-dropdown-color);
    text-align: left;
    list-style: none;
    background-color: var(--bs-dropdown-bg);
    background-clip: padding-box;
    border: var(--bs-dropdown-border-width) solid var(--bs-dropdown-border-color);
    border-radius: var(--bs-dropdown-border-radius);
}
</style>