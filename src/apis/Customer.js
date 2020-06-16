import * as Api from './Api'
import * as firebase from 'firebase'

const END_POINT = "listCustomers"
const date = firebase.firestore.FieldValue.serverTimestamp()

export default {
  all() {
    return Api.all(END_POINT)
  },
  logs(id) {
    return Api.all(`${END_POINT}/${id}/logs`)
  },
  show(id) {
    return Api.show(END_POINT, id)
  },
  store(id, data) {
    data.createdAt = date
    return Api.update(END_POINT, id, data)
  },
  update(id, qty) {
    const inc = firebase.firestore.FieldValue.increment
    const updateQty = { qty: inc(Number(qty)) }
    return Api.update(END_POINT, id, updateQty)
  },
  remove(id) {
    return Api.remove(END_POINT, id)
  },
  dispatch(id, teamID) {
    const data = {
      status: 'Dispatch',
      team: teamID
    }
    const key = (new Date().getTime() / 1000).toFixed(0)
    return Promise.all([
      Api.update(END_POINT, id, data),
      Api.update(`${END_POINT}/${id}/logs`, key, { createdAt: date, desc: `Dispatch ke tim ${teamID}` }),
      Api.update('listTeams', teamID, { working: id })
    ])
  },
  otw(id, teamID) {
    const key = (new Date().getTime() / 1000).toFixed(0)
    return Promise.all([
      Api.update(END_POINT, id, { status: 'Berangkat'} ),
      Api.update(`${END_POINT}/${id}/logs`, key, { createdAt: date, desc: `Tim ${teamID} berangkat` })
    ])
  },
  arrived(id, teamID) {
    const key = (new Date().getTime() / 1000).toFixed(0)
    return Promise.all([
      Api.update(END_POINT, id, { status: 'Tiba'} ),
      Api.update(`${END_POINT}/${id}/logs`, key, { createdAt: date, desc: `Tim ${teamID} tiba di lokasi` })
    ])
  },
  decision(id, teamID, decision, problem) {
    const key = (new Date().getTime() / 1000).toFixed(0)
    var q1 = Api.update(END_POINT, id, { status: decision} )
    if(decision === 'OGP') { var q2 =  Api.update(`${END_POINT}/${id}/logs`, key, { createdAt: date, desc: `OGP` }) }
    else { var q2 =  Api.update(`${END_POINT}/${id}/logs`, key, { createdAt: date, desc: `Terjadi kendala (${problem})` }) }
    var q3 = Api.update('listTeams', teamID, { working: null })

    const promises = [q1, q2]
    if(decision === 'Kendala')
      promises.push(q3)
    
    return Promise.all(promises)
  },
  setting(id) {
    const key = (new Date().getTime() / 1000).toFixed(0)
    return Promise.all([
      Api.update(END_POINT, id, { status: 'Setting'} ),
      Api.update(`${END_POINT}/${id}/logs`, key, { createdAt: date, desc: `Proses setting` })
    ])
  },
  installed(id, teamID) {
    const key = (new Date().getTime() / 1000).toFixed(0)
    return Promise.all([
      Api.update(END_POINT, id, { status: 'Terpasang'} ),
      Api.update(`${END_POINT}/${id}/logs`, key, { createdAt: date, desc: `Berhasil dipasang` }),
      Api.update('listTeams', teamID, { working: null })
    ])
  },
}