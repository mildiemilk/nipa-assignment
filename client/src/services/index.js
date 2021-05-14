import axios from "axios"

const callService = async (url, options) => {
  options.headers = {
    Authorization: process.env.REACT_APP_TOKEN,
  }
  return axios({ url, ...options })
    .then((response) => response.data)
    .catch((e) => {
      alert(e)
      alert("Please reload(F5) this page")
    })
}

const apiService = {
  get: (url, options = {}) =>
    callService(url, {
      ...options,
      method: "GET",
    }),
  post: (url, options = {}) =>
    callService(url, {
      ...options,
      data: { ...options },
      method: "POST",
    }),
}

export default apiService
