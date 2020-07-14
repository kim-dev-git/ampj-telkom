import Team from "@/apis/Team"
import Vue from 'vue'
import { fb, db } from '@/firebase'

Vue.use(fb)

export const getTeams = ({ commit }, { role, value }) => {
  if(role === 'Plaza' || role === 'Super Admin') { return }
  commit('SET_LOADING', true, { root: true })
  Team.all(role, value).then(response => {
    const arr = []
    response.forEach(team => {
      Team.members(team.id).then(members => {
        team.members = members
        arr.push(team)
      })
      Team.bag(team.id).then(members => {
        team.bag = members
        arr.push(team)
      })
    })
    commit('SET_TEAMS', arr)
  })
  //let refference = db.collection('listProducts')
  //let array = []
  //refference.onSnapshot(snap => {
  //  array = []
  //  snap.forEach(doc => {
  //    const obj = doc.data()
  //    obj.id = doc.id
  //    array.push(obj)
  //  })
  //  commit('SET_TOOLS', array)
  //})
  commit('SET_LOADING', false, { root: true })
}

export const getTeam = ({ commit }, id) => {
  Team.show(id).then(response => {
    Team.members(id).then(members => {
      response.members = members
      commit('SET_TEAM', response)
    })
  })
} 

export const addTeam = ({ commit, dispatch }, { id, data }) => {
  commit('SET_LOADING', true, { root: true })
  Team.store(id, data).then(() => {
    dispatch('getTeams', { role: 'Team Leader', value: data.tlID })
    dispatch('addNotification', {
      type: 'success',
      message: `Tim ${id} berhasil ditambahkan`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const getTechnicians = ({ commit }) => {
  Team.technician().then(response => {
    commit('SET_TECHNICIANS', response)
  })
}

export const addMember = ({ commit, dispatch }, { id, uid, name }) => {
  commit('SET_LOADING', true, { root: true })
  Team.addMember(id, uid, name).then(() => {
    dispatch('addNotification', {
      type: 'success',
      message: `${name} masuk ke tim ${id}`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const deleteMember = ({ commit, dispatch }, { uid, teamID }) => {
  commit('SET_LOADING', true, { root: true })
  Team.remove(uid, teamID).then(() => {
    dispatch('getTeam', teamID)
    dispatch('addNotification', {
      type: 'success',
      message: `Teknisi dihapus dari tim ${teamID}`
    }, { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}