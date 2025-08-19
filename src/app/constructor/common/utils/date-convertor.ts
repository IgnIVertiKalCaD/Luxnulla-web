export function generateDateForInput(date: Date): string {
  return Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date)
}
