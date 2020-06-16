import Cart from "@/apis/Cart"

export const getCart = ({ commit }, uid) => {
  commit('SET_LOADING', true, { root: true })
  Cart.all(uid).then(response => {
    commit('SET_CART', response)
  })
  commit('SET_LOADING', false, { root: true })
}

export const storeCart = ({ state, commit, dispatch }, payload) => { // payload: { uid, tool }

  let toolInCart = state.cart.find(item => {
    return item.tool.id === payload.tool.id
  })

  if (toolInCart) {
    var qty = toolInCart.qty + 1
  } else {
    var qty = 1
  }

  var data = { id:payload.tool.id, tool: payload.tool, qty: qty }
  const ref = "users/" + payload.uid + "/cart"

  //api.store(ref, data.tool.id, data)
  //.then(() => {
  //})

  commit('SET_LOADING', true, { root: true })
  Cart.store(payload.uid, data.tool.id, data).then(() => {
    //
  })
  commit('SET_LOADING', false, { root: true })
}

export const addToolToCart = ({ commit, dispatch }, { uid, tool }) => {
  var payload = {
    uid,
    tool
  }
  dispatch('storeCart', payload).then(() => {
    commit('ADD_TO_CART', { tool })
    dispatch('addNotification', {
      type: 'success',
      message: tool.name + ' ditambahkan ke pesanan'
    },
    { root: true })
  })

  
}

export const removeToolFromCart = ({ commit, dispatch }, { tool, uid }) => {
  commit('SET_LOADING', true, { root: true })
  Cart.remove(uid, tool.id).then(() => {
    commit('REMOVE_TOOL_FROM_CART', tool.id)
    dispatch('addNotification', {
      type: 'warning',
      message: tool.name + ' dihapus dari pesanan'
    },
    { root: true })
  })
  commit('SET_LOADING', false, { root: true })
}

export const clearCartItems = ({ dispatch, state }, { uid }) => {
  var items = state.cart
  items.forEach(item => {
    dispatch('removeToolFromCart', item, uid)
  })
}

export const clearCart = ({ }, uid) => {
  Cart.clear(uid)
}