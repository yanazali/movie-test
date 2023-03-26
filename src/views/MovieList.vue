<template>
  <div class="container-fluid px-4 mb-4">
    <div class="row mb-1">
      <div class="col-12">
        <div class="bg-white p-4">
          <div class="row align-items-center justify-content-between">
            <div class="col-12 col-md-4 col-xl-2 mb-3">
              <router-link
                v-if="user_login.UserCode"
                to="/form-movie"
                class="btn btn-sm btn-green"
              >
                <i class="fa-fw fa fa-plus-square"></i> Add New Record
              </router-link>
            </div>
            <div class="col-12 col-sm-auto mb-3 ms-auto">
              <nav class="d-inline-flex align-items-center">
                <b-pagination
                  v-model="page"
                  :total-rows="movieList.count"
                  :per-page="pageSize"
                  prev-text="Prev"
                  next-text="Next"
                  @change="handlePageChange"
                  size="sm"
                ></b-pagination>
              </nav>
            </div>
          </div>

          <Filtering @klik="filter($event)" :order="listOrder" />

          <div class="mb-3">
            <div class="_panel-request">
              <EmptyPlaceholder v-if="movieList.count == 0" />
              <table v-else class="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Artists</th>
                    <th>Genre</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(req, idx) in movieList.rows" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ req.Title }}</td>
                    <td>{{ req.Description }}</td>
                    <td>{{ req.Duration }}</td>
                    <td>{{ req.Artists }}</td>
                    <td>{{ req.Genres }}</td>
                    <td>
                      <router-link
                        v-if="user_login.UserCode"
                        :to="{
                          name: 'edit-movie',
                          params: { id: req.MovieId },
                        }"
                        class="btn btn-sm btn-outline-secondary"
                      >
                        <i class="fa-fw fa fa-edit"></i> Edit
                      </router-link>
                      <button
                        v-if="user_login.UserCode"
                        @click.prevent="deleteMovie(req.MovieId)"
                        class="btn btn-sm btn-outline-secondary ms-2"
                      >
                        <i class="fa-fw fa fa-close"></i> Delete
                      </button>
                      <router-link
                        :to="{
                          name: 'view-movie',
                          params: { id: req.MovieId },
                        }"
                        class="btn btn-sm btn-outline-secondary ms-2"
                      >
                        <i class="fa-fw fa fa-eye"></i> View
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EmptyPlaceholder from "../components/EmptyPlaceholder.vue";
import Filtering from "../components/Filter.vue";

export default {
  components: {
    EmptyPlaceholder,
    Filtering,
  },
  data() {
    return {
      token: sessionStorage.getItem("token"),
      user_login: JSON.parse(sessionStorage.getItem("user_login")),
      page: 1,
      pageSize: 5,
      pageSizes: [5, 10, 20, 50],
      order: "createdAt",
      stream: "DESC",

      listOrder: [
        { id: "Title", name: "Movie Name" },
        { id: "createdAt", name: "Created Date" },
      ],
    };
  },
  created() {
    if (!this.token) {
      this.$router.push("/login");
    }
    this.getList();
  },
  computed: {
    ...mapGetters({
      movieList: "movie/getMovieList",
    }),
  },
  methods: {
    getList() {
      this.$store.dispatch("movie/getMovieList", {
        url: `movie/list`,
        params: {
          page_number: this.page - 1,
          page_size: this.pageSize,
          order: this.order,
          stream: this.stream,
          search: this.search,
        },
      });
    },
    handlePageChange(value) {
      this.page = value;
      this.getList();
    },
    handlePageSizeChange(event) {
      this.pageSize = parseInt(event.target.value);
      this.page = 1;
      this.getList();
    },
    filter(params) {
      this.pageSize = parseInt(params.max) || 10;
      this.order = params.order || "createdAt";
      this.stream = params.stream || "DESC";
      this.search = params.search || "";
      this.page = 1;
      this.getList();
    },
    deleteMovie(id) {
      if (window.confirm("Do you really want to delete?")) {
        this.$store
          .dispatch("movie/actionMovie", {
            url: "movie/delete/" + id,
            method: "delete",
            data: {},
          })
          .then((res) => {
            if (res.respond.status === "success") {
              this.$swal({
                text: res.respond.response,
                icon: "success",
                confirmButtonText: "Ok",
              });
              this.getList();
            } else {
              this.$swal({
                text: res.respond.response,
                icon: "warning",
                confirmButtonText: "Ok",
              });
            }
          });
      }
    },
  },
};
</script>
