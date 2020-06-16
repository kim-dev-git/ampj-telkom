export const SET_REQUESTS = (state, requests) => {
  state.requests = requests
}

export const SET_REQUEST = (state, request) => {
  state.request = request
}

export const SET_REQUEST_ITEMS = (state, items) => {
  state.request.items = items
}