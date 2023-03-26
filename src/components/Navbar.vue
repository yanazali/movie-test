<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="navbar-nav">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </li>
    </div>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/movie-list" class="nav-link">Movie List</router-link>
      </li>
    </div>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/history" class="nav-link">History</router-link>
      </li>
    </div>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link to="/report" class="nav-link">Report</router-link>
      </li>
    </div>
    <div class="navbar-nav ml-auto">
      <li class="nav-item">
        <button
          @click="onLogoutClick"
          class="btn btn-success btn-sm btn-block text-white"
          type="submit"
        >
          Logout
        </button>
      </li>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    onLogoutClick: function () {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user_login");
      this.$swal({
        text: "Logout Berhasil",
        icon: "success",
        confirmButtonText: "Ok",
      });
      this.$router.push("/login");
    },
  },
};
</script>
