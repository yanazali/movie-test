import router from "@/router";
import api from "../../apis/Api";
// import { allMixin } from "@/mixins/allMixin.js";

export default {
  namespaced: true,
  state: {
    movieList: [],
  },
  getters: {
    getMovieList(state) {
      return state.movieList;
    },
  },
  mutations: {
    setMovieList(state, payload) {
      state.movieList = payload;
    },
  },
  actions: {
    actionMovie({ dispatch }, payload) {
      dispatch("setLoading", true);
      let token = sessionStorage.getItem("token");
      return new Promise((resolve, reject) => {
        api({
          method: payload.method,
          url: payload.url,
          data: payload.data,
          params: payload.params,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            resolve(res);
            dispatch("setLoading", false);
          })
          .catch((err) => {
            reject(err);
            dispatch("setLoading", false);
            return false;
          });
      });
    },
    getMovieList({ commit, dispatch }, payload) {
      dispatch("setLoading", true);
      let token = sessionStorage.getItem("token");
      api({
        method: "get",
        url: payload.url,
        params: payload.params,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => {
          if (res.respond.status == "success") {
            commit("setMovieList", res.respond.data);
          } else if (res.respond.status == "forbidden") {
            // allMixin.methods.removeSession()
            router.push(`/login`).catch(() => {});
          }
          dispatch("setLoading", false);
        })
        .catch((err) => {
          console.log("authjs=err" + err);
          dispatch("setLoading", false);
          return false;
        });
    },
    getMovie({ dispatch }, payload) {
      dispatch("setLoading", true);
      let token = sessionStorage.getItem("token");
      return new Promise((resolve, reject) => {
        api({
          method: "get",
          url: payload.url,
          params: payload.params,
          headers: {
            Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            resolve(res);
            if (res.respond.status == "success") {
              // commit("setMovie", res.respond.data);
            } else if (res.respond.status == "forbidden") {
              // allMixin.methods.removeSession()
              router.push(`/login`).catch(() => {});
            }
            dispatch("setLoading", false);
          })
          .catch((err) => {
            reject(err);
            console.log("authjs=err" + err);
            dispatch("setLoading", false);
            return false;
          });
      });
    },
    upload({ dispatch }, payload) {
      dispatch("setLoading", true);
      let token = sessionStorage.getItem("token");
      return new Promise((resolve, reject) => {
        api({
          method: "post",
          url: "movie/set",
          data: payload,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "multipart/form-data",
          },
        })
          .then((res) => {
            resolve(res);
            dispatch("setLoading", false);
          })
          .catch((err) => {
            console.log("authjs=err" + err);
            reject(err);
            dispatch("setLoading", false);
            return false;
          });
      });
    },

    setLoading({ commit }, payload) {
      commit("loader/setLoading", payload, {
        root: true,
      });
    },
  },
};
