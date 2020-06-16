import Vue from 'vue'
import { fb, db } from '@/firebase'
import router from '@/router'
//import { firestoreAction } from 'vuexfire'
import * as api from './apis.js'

Vue.use(fb)

/// User
export const getUser = ({ commit, dispatch }, user) => {
  commit('SET_LOADING', true)
  api.show('users', user.uid)
  .then(result => {
    commit('SET_USER', result)
    var role = result.role
    var value = null
    if (role === 'Teknisi') { value = result.team }
    else if (role === 'Team Leader' || role === 'Super Admin') { value = result.uid }
    dispatch('team/getTeams', { role, value })
  })
  commit('SET_LOADING', false)
}
export const userLogout = ({ commit }) => {
  commit('SET_LOADING', true)
  fb.auth().signOut().then(() => {
    location.href = "/masuk"
  })
  .catch((err) => {
    console.log('Error at userLogout: ', err)
  })
  commit('SET_LOADING', false)
}
export const userLogin = ({ commit }, payload) => {
  commit('SET_LOADING', true, { root: true })
  fb.auth().signInWithEmailAndPassword(payload.email, payload.password).then(() => {
    router.push('/')
  })
  .catch(err => {
    var errCode = err.code
    var errMessage = err.message
    if (errCode === 'auth/wrong-password') {
      alert('Kata sandi salah.')
    } else {
      alert(errMessage)
    }
    console.log('Error at userLogin: ', err)
  })
  commit('SET_LOADING', false, { root: true })
}

/// Notification
export const addNotification = ({ commit }, notification) => {
  commit('PUSH_NOTIFICATION', notification)
}
export const removeNotification = ({ commit }, notification) => {
  commit('REMOVE_NOTIFICATION', notification)
}
