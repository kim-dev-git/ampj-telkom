import * as Api from './Api'
import * as firebase from 'firebase'

const END_POINT = "listTeams"

export default {
  all(role, value) {
    var field = null
    if (role === 'Team Leader' || role === 'Super Admin') { field = 'tlID' }
    else if (role === 'Teknisi') { field = firebase.firestore.FieldPath.documentId() }
    return Api.allFilterBy(END_POINT, field, '==', value)
  },
  members(id) {
    return Api.all(`${END_POINT}/${id}/members`)
  },
  bag(id) {
    return Api.all(`${END_POINT}/${id}/bag`)
  },
  show(id) {
    return Api.show(END_POINT, id)
  },
  store(id, data) {
    return Api.store(END_POINT, id, data)
  },
  remove(uid, teamID) {
    const update = { team: null }
    return Api.update('users', uid, update).then(() => {
      return Api.remove(`${END_POINT}/${teamID}/members`, uid)
    })
  },
  technician() {
    var field = 'role'
    var value = 'Teknisi'
    return Api.allFilterBy('users', field, '==', value)
  },
  addMember(id, uid, name) {
    const ref = `${END_POINT}/${id}/members`
    const data = { uid, name }
    const update = { team: id }
    Api.update('users', uid, update)
    return Api.store(ref, uid, data)
  }
}