export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(
    ['id-ID'],
    {
      hour: '2-digit',
      minute: '2-digit'
    }
  )
}