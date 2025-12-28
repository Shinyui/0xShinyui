import { useState, useEffect, useCallback } from 'react';

/**
 * 倒計時 Hook
 * @param interval - 總時長（秒）
 * @param onTick - 每秒回調
 * @returns { timeLeft: 剩餘秒數, reset: 重置函數 }
 */
export function useTimer(
  interval: number,
  onTick?: (timeLeft: number) => void
): {
  timeLeft: number;
  reset: () => void;
} {
  const [timeLeft, setTimeLeft] = useState(interval);

  const reset = useCallback(() => {
    setTimeLeft(interval);
  }, [interval]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTimeLeft = prev <= 1 ? interval : prev - 1;
        onTick?.(newTimeLeft);
        return newTimeLeft;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [interval, onTick]);

  return { timeLeft, reset };
}
