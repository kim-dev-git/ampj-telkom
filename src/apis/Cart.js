import * as Api from './Api'

//const END_POINT = "listProducts"

export default {
  all(uid) {
    return Api.all(`users/${uid}/cart`)
  },
  store(uid, id, data) {
    return Api.store(`users/${uid}/cart`, id, data)
  },
  remove(uid, id) {
    return Api.remove(`users/${uid}/cart`, id)
  },
  clear(uid) {
    return Api.all(`users/${uid}/cart`).then(res => {
      res.forEach(element => {
        Api.remove(`users/${uid}/cart`, element.id)
      })
    })
  }
}
