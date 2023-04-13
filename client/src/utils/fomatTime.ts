export default function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const newSeconds = seconds % 60
  return `${minutes}min e ${newSeconds < 10 ? '0' : ''}${newSeconds}seg`
}
