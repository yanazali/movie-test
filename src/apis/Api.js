import axios from "axios";
import config from "../config";
export default function (payload) {
  axios.defaults.baseURL = config("api.baseUrl");
  axios.defaults.timeout = config("api.timeout");
  // axios.defaults.withCredentials = true

  return new Promise((resolve, reject) => {
    axios(payload)
      .then((result) => {
        if (resolve) resolve(result.data);
      })
      .catch((error) => {
        if (reject) reject(error);
      });
  });
}

export function setHeaderToken(token) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

export function removeHeaderToken() {
  delete axios.defaults.headers.common["Authorization"];
}
