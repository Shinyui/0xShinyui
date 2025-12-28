/**
 * 日期格式化工具函數
 */

/**
 * 格式化日期為台灣時間
 * @param date - Date 物件或 ISO 字串
 * @param format - 格式類型（'full' | 'date' | 'time'）
 * @returns 格式化後的字串
 */
export function formatTaiwanDate(
  date: Date | string,
  format: 'full' | 'date' | 'time' = 'full'
): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Taipei',
  };

  switch (format) {
    case 'full':
      options.year = 'numeric';
      options.month = '2-digit';
      options.day = '2-digit';
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.second = '2-digit';
      break;
    case 'date':
      options.year = 'numeric';
      options.month = '2-digit';
      options.day = '2-digit';
      break;
    case 'time':
      options.hour = '2-digit';
      options.minute = '2-digit';
      options.second = '2-digit';
      break;
  }

  return dateObj.toLocaleString('zh-TW', options);
}

/**
 * 獲取相對時間描述（如「3 天前」）
 * @param date - Date 物件或 ISO 字串
 * @returns 相對時間字串
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 30) {
    return formatTaiwanDate(dateObj, 'date');
  } else if (diffDays > 0) {
    return `${diffDays} 天前`;
  } else if (diffHours > 0) {
    return `${diffHours} 小時前`;
  } else if (diffMins > 0) {
    return `${diffMins} 分鐘前`;
  } else {
    return '剛剛';
  }
}
