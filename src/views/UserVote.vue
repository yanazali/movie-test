<template>
  <div class="container px-4 mb-4">
    <div class="bg-white p-4">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(req, idx) in data.rows" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ req.UserId_vote.UserLogin }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      data: []
    };
  },
  created() {
    if (!this.token) {
      this.$router.push("/login");
    }
    if (this.movieId) {
      this.getInitData();
    }
  },
  computed: {
    movieId() {
      return this.$route.params.id || "";
    }
  },
  methods: {
    getInitData() {
      this.$store
        .dispatch("movie/actionMovie", {
          url: `movie/user/vote`,
          method: "get",
          params: {
            MovieId: this.movieId
          }
        })
        .then(res => {
          this.data = res.respond.data;
        });
    }
  }
};
</script>
