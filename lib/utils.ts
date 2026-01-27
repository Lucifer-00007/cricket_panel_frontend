import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateTime: string | undefined): string {
  if (!dateTime) return '---'

  try {
    let isoString = dateTime

    // Handle DD/MM/YYYY HH:mm format
    if (dateTime.includes('/') && dateTime.includes(' ')) {
      const [datePart, timePart] = dateTime.split(' ')
      const [day, month, year] = datePart.split('/')
      isoString = `${year}-${month}-${day}T${timePart}:00.000Z`
    }

    // Handle non-ISO strings
    if (!dateTime.includes('T')) {
      isoString = new Date(dateTime).toISOString()
    }

    const date = new Date(isoString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    
    let hours = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12 || 12

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`
  } catch {
    return '---'
  }
}
