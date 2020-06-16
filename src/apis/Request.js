import * as Api from './Api'
import * as firebase from 'firebase'
import Vue from 'vue'
import { fb, db } from '@/firebase'

Vue.use(fb)

const END_POINT = "listRequests"

export default {
  all() {
    return Api.rt(END_POINT)
  },
  listener() {
    (async () => {
      let refference = db.collection(END_POINT)
      let array = []
      refference.onSnapshot(snap => {
        array = []
        snap.forEach(doc => {
          const obj = doc.data()
          obj.id = doc.id
          array.push(obj)
        })
        console.log(array)
      })
    })
  },
  show(id) {
    return Api.show(END_POINT, id)
  },
  items(id) {
    return Api.all(`${END_POINT}/${id}/items`)
  },
  approve(id) {
    return Api.update(END_POINT, id, { status: "Sudah" })
  },
  ready(id) {
    return Api.update(END_POINT, id, { status: "Ready" })
  },
  done(id) {
    return Api.update(END_POINT, id, { status: "Selesai" })
  },
  store(data, items) {
    const inc = firebase.firestore.FieldValue.increment
    const date = firebase.firestore.FieldValue.serverTimestamp()
    data.createdAt = date

    return Api.store(END_POINT, null, data).then(key => {
      items.forEach(item => {
        Api.store(`${END_POINT}/${key}/items`, null, item)
        .then(() => {
          const refference = 'listProducts'
          const toolID = item.pID
          const updateQty = { qty: inc(Number(item.qty) * -1) }
          Api.update(refference, toolID, updateQty)
        })
      })
    })
  },
  update(id, data) {
    return Api.update(END_POINT, id, data)
  },
  remove(id) {
    return Api.remove(END_POINT, id)
  },
}