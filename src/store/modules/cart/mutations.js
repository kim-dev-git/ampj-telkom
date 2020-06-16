export const SET_CART = (state, cart) => {
  state.cart = cart
}

export const ADD_TO_CART = (state, { tool, qty }) => {

  let toolInCart = state.cart.find(item => {
    return item.tool.id === tool.id
  })

  if (toolInCart) {
    toolInCart.qty += 1
    return
  }
  state.cart.push({ tool, qty: 1 })
}

export const REMOVE_TOOL_FROM_CART = (state, id) => {
  state.cart = state.cart.filter(item => {
    return item.tool.id !== id
  })
}

export const CLEAR_CART_ITEMS = (state) => {
  state.cart = []
}
