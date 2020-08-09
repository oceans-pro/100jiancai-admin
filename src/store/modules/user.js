import {getUserInfo, logout} from '@/request/auth'
import {login} from '@/request/auth'
import {resetRouter} from '@/router'
import Cookies from 'js-cookie'
import {FLAG_LOGIN, JSESSIONID} from '@/const'

const getDefaultState = function() {
  return {
    name: '',
    nickname: '',
    avatar: '',
    userInfo: {},
    permissions: [],
  }
}
const state = getDefaultState()
const mutations = {
  // 常用的单独列出
  RESET_STATE(state) {
    Object.assign(state, getDefaultState())
  },
  SET_NAME(state, name) {
    state.name = name
  },
  SET_NICKNAME(state, nickname) {
    state.nickname = nickname
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  SET_PERMISSIONS(state, permissions) {
    state.permissions = permissions
  },
}

const actions = {

  login({commit}, userInfo) { // actions
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login(username.trim(), password) // api
        .then((response) => {
          Cookies.set(FLAG_LOGIN, 1)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getInfo({commit}) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then((data) => {
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          const {username, avatar, nickname, roles} = data
          commit('SET_USER_INFO', data)
          commit('SET_NAME', username)
          commit('SET_NICKNAME', nickname)
          commit('SET_AVATAR', avatar)
          // -- 封装权限
          let allPermissions = []
          roles.forEach(role => {
            const localPermissions = role.permissions.map(p => p.permission)
            allPermissions = allPermissions.concat(...localPermissions)
          })
          const permissions = Array.from(new Set(allPermissions))
          commit('SET_PERMISSIONS', permissions)
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout({commit, state}) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          resetRouter()
          Cookies.remove(FLAG_LOGIN)
          Cookies.remove()
          commit('RESET_STATE')
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  RESET_COOKIES({commit, state}) {
    return new Promise((resolve, reject) => {
      Cookies.remove(FLAG_LOGIN)
      Cookies.remove(JSESSIONID)
      commit('RESET_STATE')
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
}
