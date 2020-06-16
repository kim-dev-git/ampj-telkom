export const requestsByDate = (state) => {
  return state.requests.slice().sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
}