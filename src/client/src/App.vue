<template>
  <div id="app">
    <AppNavbar/>
    <router-view/>
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


<style>
</style>
