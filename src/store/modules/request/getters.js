export const requestsByDate = (state) => {
  return state.requests.slice().sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
}

export const requestByRole = (state, getters) => {
  var result = []
  const datas = getters.requestsByDate
  var role = getters.user.role
  if(role === 'Teknisi') {
    const team = state.user.team
    datas.forEach(data => {
      if(data.team === team) { result.push(data) }
    })
  } else if(role === 'Team Leader') {
    const teams = state.teams
    teams.forEach(team => {
      datas.forEach(data => {
        if(data.team === team.id) { result.push(data) }
      })
    })
  } else {
    result = datas
  }

  return result
  
}