export const formatDate = (date: string | null): string | undefined => {
  if (!date) return
  
  const year = date.substring(0, 4)
  const month = date.substring(5, 7)
  const day = date.substring(8, 10)

  return `${day}/${month}/${year}`
}