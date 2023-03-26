<template>
  <div id="app">
    <router-view name="navbar" />
    <router-view />
    <loader v-if="isLoading" />
  </div>
</template>

<script>
export default {
  components: {
    loader: () =>
      import(
        /* webpackChunkName: "c-loader" */
        "@/components/Loader/Loader.vue"
      ),
  },
  computed: {
    isLoading() {
      return this.$store.getters["loader/isLoading"];
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
