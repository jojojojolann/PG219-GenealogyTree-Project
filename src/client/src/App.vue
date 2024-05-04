<template>
  <div id="app">
    <AppNavbar v-if="$route.meta.layout !== 'blank'"/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import AppNavbar from "./components/Navbar.vue";

export default {
  components: {
    AppNavbar
  }
}
</script>
