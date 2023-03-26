<template>
  <div class="container px-4 mb-4">
    <div class="bg-white p-4">
      <div class="p-3 p-sm-5 rounded-2 bg-light _panel-status">
        <div class="row align-items-center justify-content-between mb-2">
          <div class="col-12 col-sm-auto">Title :</div>
          <div class="col-12 col-sm-auto fw-bold">{{ data.Title }}</div>
        </div>
        <div class="row align-items-center justify-content-between mb-2">
          <div class="col-12 col-sm-auto">Description :</div>
          <div class="col-12 col-sm-auto fw-bold">{{ data.Description }}</div>
        </div>
        <div class="row align-items-center justify-content-between mb-2">
          <div class="col-12 col-sm-auto">Duration :</div>
          <div class="col-12 col-sm-auto fw-bold">{{ data.Duration }} min</div>
        </div>
        <div class="row align-items-center justify-content-between mb-2">
          <div class="col-12 col-sm-auto">Artists :</div>
          <div class="col-12 col-sm-auto fw-bold">{{ data.Artists }}</div>
        </div>
        <div class="row align-items-center justify-content-between mb-2">
          <div class="col-12 col-sm-auto">Genre :</div>
          <div class="col-12 col-sm-auto fw-bold">{{ data.Genre }}</div>
        </div>
        <div class="row align-items-center justify-content-between mb-2">
          <div class="col-12">
            <button
              @click.prevent="voteMovie()"
              class="btn btn-sm ms-2 m-3"
              :class="vote? 'btn-red':'btn-secondary'"
            >
              <i class="fa-fw fa fa-thumbs-up"></i>
              {{vote ? 'Unvote' : 'Vote'}}
            </button>
            <router-link
              :to="{                name: 'user-vote',
                params: { id: movieId },
              }"
              class="btn btn-sm btn-outline-secondary ms-2"
            >
              <i class="fa-fw fa fa-eye"></i> View User's Voted
            </router-link>
          </div>

          <div class="col-12 col-sm-auto fw-bold">
            <video
              v-if="data.File"
              id="video-pre"
              style="max-width: 50vw"
              :src="`${baseUrl}public/movie/get/${data.File}`"
              controls
            ></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "../config";

export default {
  data() {
    return {
      baseUrl: config("api.baseUrl"),
      token: sessionStorage.getItem("token"),
      user_login: JSON.parse(sessionStorage.getItem("user_login")),
      data: {
        Title: "",
        Description: "",
        Duration: "",
        Artists: "",
        Genres: "",
        File: ""
      },
      vote: false
    };
  },
  created() {
    if (!this.token) {
      this.$router.push("/login");
    }
    if (this.movieId) {
      this.getInitData();
      this.$store.dispatch("movie/actionMovie", {
        url: `viewers/add`,
        method: "post",
        data: {
          MovieId: this.movieId,
          UserId: this.user_login.UserId
        }
      });
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
        .dispatch("movie/getMovie", {
          url: `movie/detail`,
          params: {
            MovieId: this.movieId
          }
        })
        .then(res => {
          this.data = res.respond.data;

          this.$store
            .dispatch("movie/actionMovie", {
              url: `movie/vote`,
              method: "get",
              params: {
                MovieId: this.movieId,
                UserId: this.user_login.UserId
              }
            })
            .then(res => {
              console.log(res);
              if (res.respond.data) {
                this.vote = true;
              }
              // this.data = res.respond.data;
            });
        });
    },
    voteMovie() {
      this.$store
        .dispatch("movie/actionMovie", {
          url: `vote/add`,
          method: "post",
          data: {
            MovieId: this.movieId,
            UserId: this.user_login.UserId
          }
        })
        .then(res => {
          // console.log(res.respond.vote);
          this.vote = res.respond.vote;
        });
    }
  }
};
</script>
