import Vue from 'vue';
import Vuex from 'vuex';

import api from './api.module';
import auth from './auth.module';
import authUser from './authUser.module';
import upload from './upload.module';

import state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    api,
    auth,
    authUser,
    upload,
  },
});
