import { useState, useEffect } from 'react';
import { generateTOTP, getRemainingSeconds } from '@/utils/totp';

/**
 * TOTP 驗證碼生成 Hook
 * @param secret - Base32 密鑰
 * @param timeStep - 時間步長（秒），預設 30
 * @returns { code: 驗證碼, isValid: 是否有效, timeLeft: 剩餘秒數 }
 */
export function useTOTP(
  secret: string,
  timeStep: number = 30
): {
  code: string;
  isValid: boolean;
  timeLeft: number;
} {
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [timeLeft, setTimeLeft] = useState(getRemainingSeconds(timeStep));

  useEffect(() => {
    // 初始化時立即生成一次
    if (secret.trim()) {
      const newCode = generateTOTP(secret, timeStep);
      setCode(newCode);
      setIsValid(newCode !== '錯誤');
    } else {
      setCode('');
      setIsValid(true);
    }

    // 每秒更新
    const interval = setInterval(() => {
      const remaining = getRemainingSeconds(timeStep);
      setTimeLeft(remaining);

      // 自動更新驗證碼
      if (secret.trim()) {
        const newCode = generateTOTP(secret, timeStep);
        setCode(newCode);
        setIsValid(newCode !== '錯誤');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secret, timeStep]);

  return { code, isValid, timeLeft };
}
