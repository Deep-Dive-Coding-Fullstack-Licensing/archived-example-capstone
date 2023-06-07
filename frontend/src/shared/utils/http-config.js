import axios from "axios";

export const httpConfig = axios.create();

httpConfig.interceptors.response.use(function ({data, headers}) {
  if (data.status === 200) {
    return data.data !== null
      ? {message: null, data: data.data, status: 200, type: " alert alert-success", headers: {...headers}}
      : {message: data.message, status: 200, type: " alert alert-success", data: null, headers: {...headers}};
  }
  return {message: data.message, status: data.status, type: "alert alert-danger", data: null, headers: {...headers}}

}, function (error) {
  // Do something with response error
  console.error(error);
  return Promise.reject(error);
});

httpConfig.interceptors.request.use(
  (config) => {
    const authorization = window.localStorage.getItem("authorization")
    if (authorization) {
      config.headers['authorization'] = authorization
    }
    return config
  }, (error) => {
    console.error(error);
    return Promise.reject(error);
  }
)