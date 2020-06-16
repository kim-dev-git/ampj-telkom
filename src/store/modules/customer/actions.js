import Customer from "@/apis/Customer"
import Vue from 'vue'
import { fb, db } from '@/firebase'

Vue.use(fb)

export const getCustomers = ({ commit }) => {
  commit('SET_LOADING', true, { root: true })
  let refference = db.collection('listCustomers')
  
  let array = []
  refference.onSnapshot(snap => {
    array = []
    snap.forEach(doc => {
      const obj = doc.data()
      obj.id = doc.id
      array.push(obj)
    })
    commit('SET_CUSTOMERS', array)
  })
  commit('SET_LOADING', false, { root: true })
}

export const getCustomer = ({ commit }, id) => {
  commit('SET_LOADING', true, { root: true })
  Customer.show(id).then(response => {
    Customer.logs(id).then(logs => {
      response.logs = logs
      commit('SET_CUSTOMER', response)
    })
  })
  commit('SET_LOADING', false, { root: true })
}

export const newCustomer = ({ commit, dispatch }, { data }) => {
  commit('SET_LOADING', true, { root: true })
  //var key = db.collection('listCustomers').doc()
  Customer.store(data.ktp, data).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `${data.name} ditambahkan ke pelanggan`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const dispatchTeam = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING', true, { root: true })
  Customer.dispatch(payload.id, payload.teamID).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `${payload.teamID} didispatch`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const statusOTW = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING', true, { root: true })
  Customer.otw(payload.id, payload.teamID).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `Status diubah menjadi berangkat`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const statusArrived = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING', true, { root: true })
  Customer.arrived(payload.id, payload.teamID).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `Status diubah menjadi tiba`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const statusDecision = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING', true, { root: true })
  Customer.decision(payload.id, payload.teamID, payload.decision, payload.problem).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `Status diubah menjadi ${payload.decision}`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const statusSetting = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING', true, { root: true })
  Customer.setting(payload.id).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `Status diubah menjadi setting`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const statusInstalled = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING', true, { root: true })
  Customer.installed(payload.id, payload.teamID).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `Status diubah menjadi terpasang`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}