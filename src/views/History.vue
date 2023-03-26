<template>
  <div class="container-fluid px-4 mb-4">
    <div class="row mb-1">
      <div class="col-12">
        <div class="bg-white p-4">
          <div class="row align-items-center justify-content-between">
            <div class="col-12 col-sm-auto mb-3 ms-auto">
              <nav class="d-inline-flex align-items-center">
                <b-pagination
                  v-model="page"
                  :total-rows="movieHistory.count"
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
              <EmptyPlaceholder v-if="movieHistory.count == 0" />
              <table v-else class="table table-striped">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Artists</th>
                    <th>Genre</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(req, idx) in movieHistory.rows" :key="idx">
                    <td>{{ idx + 1 }}</td>
                    <td>{{ req.MovieId_view.Title }}</td>
                    <td>{{ req.MovieId_view.Description }}</td>
                    <td>{{ req.MovieId_view.Duration }}</td>
                    <td>{{ req.MovieId_view.Artists }}</td>
                    <td>{{ req.MovieId_view.Genres }}</td>
                    <td>
                      {{
                        req.createdAt.replace("T", " ").replace(".000Z", " ")
                      }}
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
      movieHistory: "movie/getMovieHistory",
    }),
  },
  methods: {
    getList() {
      this.$store.dispatch("movie/getMovieList", {
        url: `movie/history`,
        params: {
          page_number: this.page - 1,
          page_size: this.pageSize,
          order: this.order,
          stream: this.stream,
          search: this.search,
          UserId: this.user_login.UserId,
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
  },
};
</script>
