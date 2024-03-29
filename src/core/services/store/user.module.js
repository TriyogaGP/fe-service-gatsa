import ApiService from "@/core/services/api.service";

const token = localStorage.getItem('user_token')
// action types
export const GET_ADMINISTRATOR = "getAdministrator";
export const GET_ADMINISTRATOR_BY = "getAdministratorbyUID";
export const POST_ADMINISTRATOR = "postAdministrator";
export const GET_STRUKTURAL = "getStruktural";
export const GET_STRUKTURAL_BY = "getStrukturalbyUID";
export const POST_STRUKTURAL = "postStruktural";
export const GET_SISWASISWI = "getSiswaSiswi";
export const GET_SISWASISWI_BY = "getSiswaSiswibyUID";
export const POST_SISWASISWI = "postSiswaSiswi";
export const GET_NILAI = "getNilai";
export const POST_NILAI = "postNilai";
export const GET_WALI_KELAS = "getWaliKelas";
export const UPDATE_PERINGKAT = "updatePeringkat";
export const GET_JADWAL_MENGAJAR = "getJadwalMengajar";
export const POST_JADWAL_MENGAJAR = "postJadwalMengajar";
export const GET_LIST_SISWASISWI = "listSiswaSiswi";

// mutation types
export const SET_LOADINGTABLE = "SET_LOADINGTABLE";
export const SET_ADMINISTRATOR = "SET_ADMINISTRATOR";
export const SET_ADMINISTRATORBY = "SET_ADMINISTRATORBY";
export const SET_STRUKTURAL = "SET_STRUKTURAL";
export const SET_STRUKTURALBY = "SET_STRUKTURALBY";
export const SET_SISWASISWI = "SET_SISWASISWI";
export const SET_SISWASISWIBY = "SET_SISWASISWIBY";
export const SET_NILAI = "SET_NILAI";
export const SET_WALI_KELAS = "SET_WALI_KELAS";
export const SET_JADWAL_MENGAJAR = "SET_JADWAL_MENGAJAR";
export const SET_LIST_SISWASISWI = "SET_LIST_SISWASISWI";

const state = {
  loadingtable: false,
  dataAdministrator: [],
  dataAdministratorBy: null,
  dataStruktural: [],
  dataStrukturalBy: null,
  dataSiswaSiswi: [],
  dataSiswaSiswiBy: null,
  dataNilai: [],
  dataWaliKelas: [],
  dataJadwalMengajar: [],
  listSiswaSiswi: [],
}

const mutations = {
  [SET_LOADINGTABLE](state, data) {
    state.loadingtable = data
  },
  [SET_ADMINISTRATOR](state, data) {
    state.dataAdministrator = data
  },
  [SET_ADMINISTRATORBY](state, data) {
    state.dataAdministratorBy = data
  },
  [SET_STRUKTURAL](state, data) {
    state.dataStruktural = data
  },
  [SET_STRUKTURALBY](state, data) {
    state.dataStrukturalBy = data
  },
  [SET_SISWASISWI](state, data) {
    state.dataSiswaSiswi = data
  },
  [SET_SISWASISWIBY](state, data) {
    state.dataSiswaSiswiBy = data
  },
  [SET_NILAI](state, data) {
    state.dataNilai = data
  },
  [SET_WALI_KELAS](state, data) {
    state.dataWaliKelas = data
  },
  [SET_JADWAL_MENGAJAR](state, data) {
    state.dataJadwalMengajar = data
  },
  [SET_LIST_SISWASISWI](state, data) {
    state.listSiswaSiswi = data
  },
}

const getters = {
  administratorAll(state) {
    return state.dataAdministrator;
  },
  administratorBy(state) {
    return state.dataAdministratorBy;
  },
  strukturalAll(state) {
    return state.dataStruktural;
  },
  strukturalBy(state) {
    return state.dataStrukturalBy;
  },
  siswasiswiAll(state) {
    return state.dataSiswaSiswi;
  },
  siswasiswiBy(state) {
    return state.dataSiswaSiswiBy;
  },
  nilai(state) {
    return state.dataNilai;
  },
  waliKelas(state) {
    return state.dataWaliKelas;
  },
  jadwalMengajarAll(state) {
    return state.dataJadwalMengajar;
  },
  listSiswaSiswiAll(state) {
    return state.listSiswaSiswi;
  },
}

const actions = {
  [GET_ADMINISTRATOR](context, data) {
    return new Promise((resolve, reject) => {
      context.commit('SET_LOADINGTABLE', true)
      ApiService.get(`user/admin?page=${data.page}&limit=${data.limit}${data.keyword ? `&keyword=${data.keyword}` : ''}`, token)
      .then((response) => {
          context.commit('SET_LOADINGTABLE', false)
          context.commit('SET_ADMINISTRATOR', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          context.commit('SET_LOADINGTABLE', false)
          reject(error);
        })
    });
  },
  [GET_ADMINISTRATOR_BY](context, uid) {
    return new Promise((resolve, reject) => {
      ApiService.get(`user/admin/${uid}`, token)
      .then((response) => {
          context.commit('SET_ADMINISTRATORBY', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [POST_ADMINISTRATOR](context, bodyData) {
    return new Promise((resolve, reject) => {
      ApiService.post(`user/admin`, token, bodyData)
      .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [GET_STRUKTURAL](context, data) {
    return new Promise((resolve, reject) => {
      context.commit('SET_LOADINGTABLE', true)
      ApiService.get(`user/struktural?page=${data.page}&limit=${data.limit}${data.keyword ? `&keyword=${data.keyword}` : ''}`, token)
      .then((response) => {
          context.commit('SET_LOADINGTABLE', false)
          context.commit('SET_STRUKTURAL', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          context.commit('SET_LOADINGTABLE', false)
          reject(error);
        })
    });
  },
  [GET_STRUKTURAL_BY](context, uid) {
    return new Promise((resolve, reject) => {
      ApiService.get(`user/struktural/${uid}`, token)
      .then((response) => {
          context.commit('SET_STRUKTURALBY', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [POST_STRUKTURAL](context, bodyData) {
    return new Promise((resolve, reject) => {
      ApiService.post(`user/struktural`, token, bodyData)
      .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [GET_SISWASISWI](context, data) {
    return new Promise((resolve, reject) => {
      context.commit('SET_LOADINGTABLE', true)
      ApiService.get(`user/siswasiswi?page=${data.page}&limit=${data.limit}${data.keyword ? `&keyword=${data.keyword}` : ''}${typeof data.kelas !== 'undefined' || data.kelas ? `&kelas=${data.kelas}` : ''}`, token)
      .then((response) => {
          context.commit('SET_LOADINGTABLE', false)
          context.commit('SET_SISWASISWI', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          context.commit('SET_LOADINGTABLE', false)
          reject(error);
        })
    });
  },
  [GET_SISWASISWI_BY](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.get(`user/siswasiswi/${data.uid}${data.mapel ? `?mapel=${data.mapel}` : ''}`, token)
      .then((response) => {
          context.commit('SET_SISWASISWIBY', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [POST_SISWASISWI](context, bodyData) {
    return new Promise((resolve, reject) => {
      ApiService.post(`user/siswasiswi`, token, bodyData)
      .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [GET_NILAI](context, data) {
    return new Promise((resolve, reject) => {
      let url
      if(typeof data.idUser !== 'undefined'){
        url = `?idUser=${data.idUser}&kelas=${data.kelas}&mapel=${data.mapel}`
      }else{
        url = `?kelas=${data.kelas}&mapel=${data.mapel}`
      }
      ApiService.get(`user/nilai${url}`, token)
      .then((response) => {
          context.commit('SET_NILAI', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [POST_NILAI](context, bodyData) {
    return new Promise((resolve, reject) => {
      ApiService.post(`user/nilai`, token, bodyData)
      .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [GET_WALI_KELAS](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.get(`user/walikelas?page=${data.page}&kelas=${data.kelas}&roleID=${data.roleID}`, token)
      .then((response) => {
          context.commit('SET_WALI_KELAS', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [UPDATE_PERINGKAT](context, kelas) {
    return new Promise((resolve, reject) => {
      ApiService.get(`user/update-peringkat?kelas=${kelas}`, token)
      .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
  [GET_JADWAL_MENGAJAR](context, data) {
    return new Promise((resolve, reject) => {
      context.commit('SET_LOADINGTABLE', true)
      ApiService.get(`user/jadwal?page=${data.page}&limit=${data.limit}${data.keyword ? `&keyword=${data.keyword}` : ''}`, token)
      .then((response) => {
          context.commit('SET_LOADINGTABLE', false)
          context.commit('SET_JADWAL_MENGAJAR', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          context.commit('SET_LOADINGTABLE', false)
          reject(error);
        })
    });
  },
  [POST_JADWAL_MENGAJAR](context, bodyData) {
    return new Promise((resolve, reject) => {
      ApiService.post(`user/jadwal`, token, bodyData)
      .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
      });
  },
  [GET_LIST_SISWASISWI](context, data) {
    return new Promise((resolve, reject) => {
      ApiService.get(`user/list-siswasiswi?kelas=${data.kelas}${data.keyword ? `&keyword=${data.keyword}` : ''}`, token)
      .then((response) => {
          context.commit('SET_LIST_SISWASISWI', response.data.result)
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        })
    });
  },
}

export default {
  namespaced: true,
  actions,
  state,
  mutations,
  getters,
}