import ApiService from "@/core/services/api.service";

const state = {
}

const actions = {
  AuthLogin: function ({commit}, data) {
    return new Promise((resolve, reject) => {
      ApiService.postLogin(`auth/login`, data)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
    });
  }
}

export default {
  namespaced: true,
  actions,
  state
}