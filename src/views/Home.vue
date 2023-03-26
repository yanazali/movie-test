<template>
  <div class="home">
    <div class="container mt-4">
      <div class="row">
        <div class="col-12">
          <div style="text-align: left; border-right: 1px solid black">
            <label>Selamat datang</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {},
  created() {
    let token = sessionStorage.getItem("token");
    if (!token) {
      this.$router.push("/login");
    }
  },
};
</script>
