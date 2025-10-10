export function formatSize(bytes: number): string {
  // Guard against invalid input
  if (typeof bytes !== 'number' || !isFinite(bytes) || bytes < 0) {
    return '0 KB';
  }

  const KB = 1024;
  const MB = KB * 1024;
  const GB = MB * 1024;

  const format = (value: number, unit: 'KB' | 'MB' | 'GB') => {
    // keep one decimal place, but drop trailing .0
    const rounded = Math.round(value * 10) / 10;
    return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded} ${unit}`;
  };

  if (bytes < KB) {
    // Anything less than 1KB is considered 0 KB per requirement restricting to KB/MB/GB
    return '0 KB';
  } else if (bytes < MB) {
    return format(bytes / KB, 'KB');
  } else if (bytes < GB) {
    return format(bytes / MB, 'MB');
  } else {
    return format(bytes / GB, 'GB');
  }
}


export const generateUUID =()=>crypto.randomUUID();