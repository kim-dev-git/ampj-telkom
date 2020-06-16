export default (value) => {
  const date = new Date(value)
  return date.toLocaleString(
    ['id-ID'],
    {
      month: 'long',
      day: '2-digit',
      year: 'numeric'
    }
  )
}