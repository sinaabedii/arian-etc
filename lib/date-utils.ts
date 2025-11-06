/**
 * Convert Gregorian date to Persian (Jalali) date
 */
export function toPersianDate(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Use Intl.DateTimeFormat for Persian calendar
  const formatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    calendar: 'persian'
  });
  
  return formatter.format(date);
}

/**
 * Convert Gregorian date to short Persian date
 */
export function toPersianDateShort(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  // Use Intl.DateTimeFormat for Persian calendar
  const formatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    calendar: 'persian'
  });
  
  return formatter.format(date);
}

/**
 * Get relative time in Persian (e.g., "2 روز پیش")
 */
export function getRelativeTime(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  
  if (diffMinutes < 60) {
    return `${diffMinutes} دقیقه پیش`;
  } else if (diffHours < 24) {
    return `${diffHours} ساعت پیش`;
  } else if (diffDays < 7) {
    return `${diffDays} روز پیش`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} هفته پیش`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} ماه پیش`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `${years} سال پیش`;
  }
}

/**
 * Format Persian date with time
 */
export function toPersianDateTime(dateString: string): string {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  
  const formatter = new Intl.DateTimeFormat('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    calendar: 'persian'
  });
  
  return formatter.format(date);
}
