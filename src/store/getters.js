export const loading = (state) => {
  return state.loading
}

export const user = (state) => {
  return state.user
}
export const menus = (state) => {
  var user = state.user
  var menus = state.menus
  var filtered = menus.filter(menu => menu.access.includes(user.role))
  return filtered
}