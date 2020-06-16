import * as Api from './Api'
import * as firebase from 'firebase'

const END_POINT = "absent"

export default {
  all() {
    return Api.all(END_POINT)
  },
  show(id) {
    return Api.show(END_POINT, id)
  },
  store(ref, id, data) {
    return Api.update(ref, id, data)
  },
  update(id, qty) {
    const inc = firebase.firestore.FieldValue.increment
    const updateQty = { qty: inc(Number(qty)) }
    return Api.update(END_POINT, id, updateQty)
  },
  remove(id) {
    return Api.remove(END_POINT, id)
  },
}