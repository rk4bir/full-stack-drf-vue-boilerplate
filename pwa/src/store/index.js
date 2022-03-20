import Vue from 'vue'
import Vuex from 'vuex'

import { ISAUTHENTICATED, USER } from "../services/core/config"
import { loginUser, logoutUser } from "../services/core/auth"
import { getProfile } from '../services/user'


Vue.use(Vuex)

const getLocalProfile = () => {
  let user = localStorage.getItem(USER)
  if ( user ) {
    try {
      return JSON.parse(user)
    } catch(e) {
      return null
    }
  }
  return null
}

export default new Vuex.Store({
  state: {
    user: getLocalProfile(),
    isAuthenticated: localStorage.getItem(ISAUTHENTICATED) == "true" ? true : false,
  },
  getters: {
    getUserProfile(state) {
      return state.user
    }
  },
  mutations: {
    updateUser(state, data) {
      state.user = data
      localStorage.setItem(USER, JSON.stringify(data))
    },
    loginSuccess(state, user) {
      state.user = user
      state.isAuthenticated = true
      localStorage.setItem(ISAUTHENTICATED, true)
      localStorage.setItem(USER, JSON.stringify(user))
    },
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem(ISAUTHENTICATED)
      localStorage.removeItem(USER)
    }
  },
  actions: {
    async fetchUser(context, username) {
      const { commit }  = context
      const { status, data } = await getProfile(username)
      if (status == 200) {
        commit("updateUser", data)
        return data
      }
      return null
    },
    login({ commit }, { username, password }) {
      return loginUser(username, password)
        .then( async () => {
          const { status, data } = await getProfile(username)
          if ( status == 200 ) {
            commit("loginSuccess", data)
            return Promise.resolve();
          } else {
            return Promise.reject("Couldn't fetch profile!");
          }
        })
        .catch(err => {
          commit("logout")
          return Promise.reject(err);
        })
    },
    logout({ commit }) {
      logoutUser();
      commit('logout');
    },
  },
  modules: {
  }
})
