import Request from "@/apis/Request"
import Vue from 'vue'
import { fb, db } from '@/firebase'

Vue.use(fb)

export const getRequests = ({ commit }) => {
  commit('SET_LOADING', true, { root: true })
  //Request.all().then(response => {
  //  console.log('Action', response)
  //  commit('SET_REQUESTS', response)
  //})
  let refference = db.collection('listRequests')
  let array = []
  refference.onSnapshot(snap => {
    array = []
    snap.forEach(doc => {
      const obj = doc.data()
      obj.id = doc.id
      array.push(obj)
    })
    commit('SET_REQUESTS', array)
  })
  commit('SET_LOADING', false, { root: true })
}

export const getRequest = ({ commit, state }, id) => {
  commit('SET_LOADING', true, { root: true })
  Request.show(id).then(response => {
    Request.items(id).then(items => {
      items = items.slice().sort((a, b) => b.type.localeCompare(a.type))
      response.items = items
      commit('SET_REQUEST', response)
    })
  })
  commit('SET_LOADING', false, { root: true })
}

export const addRequest = ({ commit, dispatch }, { data, items, uid }) => {
  commit('SET_LOADING', true, { root: true })
  Request.store(data, items).then(() => {
    dispatch('cart/clearCart', uid, { root: true }).then(() => {
      commit('cart/CLEAR_CART_ITEMS', null, { root: true })
      dispatch('addNotification', {
        type: 'success',
        message: 'Pesanan berhasil dibuat'
      }, { root: true })
    })
  })
  commit('SET_LOADING', false, { root: true })
}

export const approveRequest = ({ commit, dispatch }, id) => {
  commit('SET_LOADING', true, { root: true })
  Request.approve(id).then(() => {
    dispatch('getRequest', id)
    dispatch('addNotification', {
      type: 'info',
      message: 'Pesanan telah disetujui'
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const readyRequest = ({ commit, dispatch }, id) => {
  commit('SET_LOADING', true, { root: true })
  Request.ready(id).then(() => {
    dispatch('getRequest', id)
    dispatch('addNotification', {
      type: 'info',
      message: 'Pesanan telah disiapkan'
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const doneRequest = ({ commit, dispatch }, id) => {
  commit('SET_LOADING', true, { root: true })
  Request.done(id).then(() => {
    dispatch('getRequest', id)
    dispatch('addNotification', {
      type: 'info',
      message: 'Pesanan telah diterima'
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}
