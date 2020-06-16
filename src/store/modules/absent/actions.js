import Absent from "@/apis/Absent"
import Vue from 'vue'
import { fb, db } from '@/firebase'

Vue.use(fb)

export const getAbsent = ({ commit }, payload) => {
  commit('SET_LOADING', true, { root: true })
  let refference = db.collection('absent').doc(payload.month).collection(payload.teamID)
  
  let array = []
  refference.onSnapshot(snap => {
    array = []
    snap.forEach(doc => {
      const obj = doc.data()
      obj.id = doc.id
      array.push(obj)
    })
    commit('SET_ABSENT', array)
  })
  commit('SET_LOADING', false, { root: true })
}

export const setAbsent = ({ commit, dispatch }, payload) => {
  commit('SET_LOADING', true, { root: true })
  var refference = `absent/${payload.month}/${payload.teamID}`
  const data = { [`${payload.day}`]: true }
  Absent.store(refference, payload.uid, data).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `Berhasil absen`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}