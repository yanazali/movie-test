import api, { setHeaderToken } from "@/apis/Api";

// import router from "@/router";

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    login({ dispatch }, payload) {
      dispatch("setLoading", true);
      return new Promise((resolve, reject) => {
        api({
          method: "post",
          url: `auth/login`,
          data: payload,
          withCredentials: false,
          headers: {},
        })
          .then((res) => {
            resolve(res);
            if (res.respond.status == "success") {
              sessionStorage.setItem("token", res.respond.accessToken);
              setHeaderToken(res.respond.accessToken);

              var base64Url = res.respond.accessToken.split(".")[1];
              var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
              var jsonPayload = decodeURIComponent(
                window
                  .atob(base64)
                  .split("")
                  .map(function (c) {
                    return (
                      "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                  })
                  .join("")
              );
              sessionStorage.setItem(
                "user_login",
                JSON.stringify(JSON.parse(jsonPayload))
              );
            }
            dispatch("setLoading", false);
          })
          .catch((err) => {
            reject(err);
            dispatch("setLoading", false);
            return false;
          });
      });
    },
    register({ dispatch }, payload) {
      dispatch("setLoading", true);
      return new Promise((resolve, reject) => {
        api({
          method: "post",
          url: `register`,
          data: payload,
          withCredentials: false,
          headers: {},
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
    setLoading({ commit }, payload) {
      commit("loader/setLoading", payload, {
        root: true,
      });
    },
  },
};
