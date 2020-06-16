import * as Api from './Api'
import * as firebase from 'firebase'

const END_POINT = "listProducts"

export default {
  all() {
    return Api.all(END_POINT)
  },
  show(id) {
    return Api.show(END_POINT, id)
  },
  store(id, data) {
    return Api.store(END_POINT, id, data)
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