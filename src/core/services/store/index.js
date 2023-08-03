import Vue from 'vue';
import Vuex from 'vuex';

import api from './api.module';
import auth from './auth.module';
import user from './user.module';
import kelas from './kelas.module';
import setting from './setting.module';
import upload from './upload.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    auth,
    user,
    kelas,
    setting,
    upload,
  },
});
