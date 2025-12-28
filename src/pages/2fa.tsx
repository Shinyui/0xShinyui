import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { useTOTP } from '@/hooks/useTOTP';

export default function TwoFAPage() {
  const [secret, setSecret] = useState('');
  const { code, isValid, timeLeft } = useTOTP(secret);

  const handleSecretChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecret(e.target.value);
  };

  return (
    <Layout
      title="2FA 驗證碼生成器 - 0xShinyui"
      description="安全的雙因素驗證碼生成工具"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1
          className="text-2xl sm:text-3xl font-bold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          2FA 驗證碼生成器
        </h1>

        <div className="space-y-6">
          {/* 輸入區域 */}
          <Card padding="lg">
            <h2
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--accent-gold)' }}
            >
              輸入 2FA 密鑰
            </h2>
            <Input
              type="text"
              value={secret}
              onChange={handleSecretChange}
              placeholder="請輸入您的 2FA 密鑰 (Base32 格式)"
              className="font-mono"
              isInvalid={!isValid && secret.trim() !== ''}
              error={
                !isValid && secret.trim() !== ''
                  ? '無效的密鑰格式，請檢查您的輸入'
                  : undefined
              }
            />
          </Card>

          {/* 驗證碼顯示區域 */}
          {code && isValid && (
            <Card padding="lg">
              <h2
                className="text-lg font-semibold mb-4"
                style={{ color: 'var(--accent-gold)' }}
              >
                當前驗證碼
              </h2>
              <div className="text-center">
                <div
                  className="text-4xl font-mono font-bold mb-2 tracking-wider"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {code}
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <div
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    剩餘時間：{timeLeft} 秒
                  </div>
                  <div
                    className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"
                    style={{ backgroundColor: 'var(--border-color)' }}
                  >
                    <div
                      className="h-full transition-all duration-1000 ease-linear"
                      style={{
                        backgroundColor:
                          timeLeft > 10 ? 'var(--accent-gold)' : '#ef4444',
                        width: `${(timeLeft / 30) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* 說明文字 */}
          <div
            className="p-4 rounded-lg border-l-4 bg-opacity-50"
            style={{
              backgroundColor: 'var(--card-background)',
              borderLeftColor: 'var(--accent-gold)',
            }}
          >
            <h3
              className="font-semibold mb-2"
              style={{ color: 'var(--accent-gold)' }}
            >
              使用說明
            </h3>
            <ul
              className="text-sm space-y-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              <li>
                • 輸入您從應用程式（如 Google Authenticator、Authy）獲得的
                2FA 密鑰
              </li>
              <li>
                • 密鑰通常是 Base32 格式的字串，包含字母 A-Z 和數字 2-7
              </li>
              <li>• 驗證碼每 30 秒自動更新一次</li>
              <li>
                •
                此工具完全在瀏覽器本地運行，不會將您的密鑰發送到任何服務器
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}