import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import getters from '@/store/getters'
import tagsView from '@/store/modules/tagsView'
import permission from '@/store/modules/permission'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    tagsView,
    user,
    permission,
  },
  getters,
})

export default store
