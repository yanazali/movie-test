import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const Navbar = () =>
  import(/* webpackChunkName: "Header" */ "@/components/Navbar.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    components: {
      navbar: Navbar,
      default: () =>
        import(
          /* webpackChunkName: "p-Home" */
          "@/views/Home"
        ),
    },
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "p-login" */
        "@/views/Login.vue"
      ),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(
        /* webpackChunkName: "p-register" */
        "@/views/Register.vue"
      ),
  },
  {
    path: "/movie-list",
    name: "movie-list",
    components: {
      navbar: Navbar,
      default: () =>
        import(
          /* webpackChunkName: "p-movie-list" */
          "@/views/MovieList"
        ),
    },
  },
  {
    path: "/form-movie",
    name: "form-movie",
    components: {
      navbar: Navbar,
      default: () =>
        import(
          /* webpackChunkName: "p-form-movie" */
          "@/views/FormMovie"
        ),
    },
  },
  {
    path: "/edit-movie/:id",
    name: "edit-movie",
    components: {
      navbar: Navbar,
      default: () =>
        import(
          /* webpackChunkName: "p-form-movie" */
          "@/views/FormMovie"
        ),
    },
  },
  {
    path: "/view-movie/:id",
    name: "view-movie",
    components: {
      navbar: Navbar,
      default: () =>
        import(
          /* webpackChunkName: "p-view-movie" */
          "@/views/DetailMovie"
        ),
    },
  },
  {
    path: "/history",
    name: "history",
    components: {
      navbar: Navbar,
      default: () =>
        import(
          /* webpackChunkName: "p-history" */
          "@/views/History"
        ),
    },
  },
  {
    path: "/user-vote",
    name: "user-vote",
    components: {
      navbar: Navbar,
      default: () =>
        import(
          /* webpackChunkName: "p-user-vote" */
          "@/views/UserVote"
        ),
    },
  },
  {
    path: "/report",
    name: "report",
    components: {
      navbar: Navbar,
      default: () =>
        import(
          /* webpackChunkName: "p-report" */
          "@/views/Report"
        ),
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
