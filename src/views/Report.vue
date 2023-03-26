<template>
  <div class="container px-4 mb-4">
    <div class="bg-white p-4">
      <h3>Most Voted Movie</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Movie Title</th>
            <th>Total Vote</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(req, idx) in data" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ req.Title }}</td>
            <td>{{ req.jml }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-white p-4">
      <h3>Most Viewed Movie</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Movie Title</th>
            <th>Total View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(req, idx) in dataView" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ req.Title }}</td>
            <td>{{ req.jml }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="bg-white p-4">
      <h3>Most Viewed Genre</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th>No</th>
            <th>Movie Genre</th>
            <th>Total View</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(req, idx) in dataViewGenre" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ req.Genres }}</td>
            <td>{{ req.jml }}</td>
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
      user_login: JSON.parse(sessionStorage.getItem("user_login")),
      data: [],
      dataView: [],
      dataViewGenre: [],
    };
  },
  created() {
    if (!this.token) {
      this.$router.push("/login");
    } else if (!this.user_login.UserCode) {
      this.$router.push("/");
    }
    this.getInitData();
  },
  methods: {
    getInitData() {
      this.$store
        .dispatch("movie/actionMovie", {
          url: `movie/most/voted`,
          method: "get",
        })
        .then((res) => {
          this.data = res.respond.data;
        });
      this.$store
        .dispatch("movie/actionMovie", {
          url: `movie/most/view`,
          method: "get",
        })
        .then((res) => {
          this.dataView = res.respond.data;
        });
      this.$store
        .dispatch("movie/actionMovie", {
          url: `movie/most/viewgenre`,
          method: "get",
        })
        .then((res) => {
          this.dataViewGenre = res.respond.data;
        });
    },
  },
};
</script>
