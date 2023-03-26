<template>
  <div class="container-fluid px-4 mb-4">
    <div class="row mb-1">
      <div class="col-12">
        <div class="bg-white p-4"></div>

        <form class="row" @submit.prevent="onSubmit">
          <div class="p-4">
            <div class="fs-6 fw-bold mb-3">
              <i class="fa-fw fa fa-file"></i>
              {{ formTitle }}
            </div>

            <div class="form-floating mb-2">
              <input
                v-model="form.Title"
                type="text"
                class="form-control form-control-sm bg-light"
                placeholder="."
                autocomplete="off"
                required
              />
              <label> <i class="fa-fw fa fa-edit"></i> Title * </label>
            </div>
            <div class="form-floating mb-2">
              <input
                v-model="form.Description"
                type="text"
                class="form-control form-control-sm bg-light"
                placeholder="."
                autocomplete="off"
                required
              />
              <label> <i class="fa-fw fa fa-edit"></i> Description * </label>
            </div>
            <div class="form-floating mb-2">
              <input
                v-model="form.Duration"
                type="number"
                class="form-control form-control-sm bg-light"
                placeholder="."
                autocomplete="off"
                required
              />
              <label> <i class="fa-fw fa fa-edit"></i> Duration * </label>
            </div>
            <div class="form-floating mb-2">
              <input
                v-model="form.Artists"
                type="text"
                class="form-control form-control-sm bg-light"
                placeholder="."
                autocomplete="off"
                required
              />
              <label> <i class="fa-fw fa fa-edit"></i> Artists * </label>
            </div>
            <div class="form-floating mb-2">
              <input
                v-model="form.Genres"
                type="text"
                class="form-control form-control-sm bg-light"
                placeholder="."
                autocomplete="off"
                required
              />
              <label> <i class="fa-fw fa fa-edit"></i> Genre * </label>
            </div>
            <div class="form-group text-start">
              <div>Select Video</div>
              <input
                type="file"
                accept="video/mp4, video/x-m4v, video/*"
                @change="handleFileUpload($event)"
              />
              <video
                id="video-preview"
                style="max-width: 50vw"
                controls
                v-show="file != ''"
              />
              <video
                v-if="form.File"
                id="video-pre"
                style="max-width: 50vw"
                :src="`http://localhost:9000/public/movie/get/${form.File}`"
                controls
              ></video>
            </div>

            <div class="d-flex mt-4">
              <button type="submit" class="btn btn-sm btn-red" title="Submit">
                <i class="fa-fw fa fa-save"></i> Submit
              </button>
              <router-link
                to="/movie-list"
                class="btn btn-sm btn-secondary ms-2"
              >
                <i class="fa-fw fa fa-close"></i> Cancel
              </router-link>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: sessionStorage.getItem("token"),
      user_login: JSON.parse(sessionStorage.getItem("user_login")),
      form: {
        Title: "",
        Description: "",
        Duration: "",
        Artists: "",
        Genres: "",
      },
      formTitle: "Add New Movie",
      url: "movie/add",
      method: "post",
      file: "",
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
    },
  },
  methods: {
    getInitData() {
      this.$store
        .dispatch("movie/getMovie", {
          url: `movie/detail`,
          params: {
            MovieId: this.movieId,
          },
        })
        .then((res) => {
          console.log(res.respond.data.File);
          this.form = res.respond.data;
          this.url = "movie/update";
          this.method = "put";
          this.formTitle = "Edit Movie";
        });
    },
    onSubmit() {
      const formData = new FormData();
      formData.append("upload", this.file);
      this.$store.dispatch("movie/upload", formData).then((res) => {
        this.form.File = res.images;
        this.$store
          .dispatch("movie/actionMovie", {
            data: this.form,
            url: this.url,
            method: this.method,
          })
          .then((res) => {
            if (res.respond.status == "success") {
              this.$swal({
                text: res.respond.response,
                icon: "success",
                confirmButtonText: "Ok",
              });
              this.form = {
                Title: "",
                Description: "",
                Duration: "",
                Artists: "",
                Genres: "",
              };
              this.$router.push("/movie-list");
            } else {
              this.$swal({
                text: res.respond.response,
                icon: "warning",
                confirmButtonText: "Ok",
              });
            }
          });
      });
    },
    previewVideo() {
      let video = document.getElementById("video-preview");
      let reader = new FileReader();

      reader.readAsDataURL(this.file);
      reader.addEventListener("load", function () {
        video.src = reader.result;
      });
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
      this.previewVideo();
      // if (event.target.files[0]) {
      //   this.file = event.target.files[0];
      // let formData = new FormData();
      // formData.append("upload", event.target.files[0]);
      // this.$store.dispatch("ticket/upload", formData).then(res => {
      //   this.setToDb(res.images);
      // });
      // }
    },
  },
};
</script>
