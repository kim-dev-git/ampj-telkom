export default (value) => {
  const currDate = new Date()
  const currYear = currDate.getFullYear()
  const date = new Date(value)
  const year = date.getFullYear()

  var currentDate = new Date(currDate).setHours(0, 0, 0, 0)
  var valueDate = new Date(value).setHours(0, 0, 0, 0)
  var time = new Date(value).toLocaleString(['id-ID'],{ timeStyle: 'short', hour12: true })

  if (currentDate === valueDate) {
    return time
  } else if (currYear === year) {
    return date.toLocaleString(
      ['id-ID'],
      {
        month: 'short',
        day: '2-digit'
      }
    )
  } else {
    return date.toLocaleString(
      ['id-ID'],
      {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      }
    )
  }
}