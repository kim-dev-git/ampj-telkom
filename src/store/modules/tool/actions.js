import Tool from "@/apis/Tool"
import Vue from 'vue'
import { fb, db } from '@/firebase'

Vue.use(fb)

export const getTools = ({ commit }) => {
  //Tool.all()
  //.then(response => {
  //  commit('SET_TOOLS', response)
  //})
  commit('SET_LOADING', true, { root: true })
  let refference = db.collection('listProducts')
  let array = []
  refference.onSnapshot(snap => {
    array = []
    snap.forEach(doc => {
      const obj = doc.data()
      obj.id = doc.id
      array.push(obj)
    })
    commit('SET_TOOLS', array)
  })
  commit('SET_LOADING', false, { root: true })
}

export const getTool = ({ commit }, id) => {
  Tool.show(id)
  .then(response => {
    commit('SET_TOOL', response)
  })
} 

export const addTool = ({ commit, dispatch }, { id, data }) => {
  commit('SET_LOADING', true, { root: true })
  data.qty = 0
  Tool.store(id, data).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `${id} berhasil ditambahkan`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const addStock = ({ commit, dispatch }, { id, qty }) => {
  commit('SET_LOADING', true, { root: true })
  Tool.update(id, qty).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: 'Stok berhasil ditambah'
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}