import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import FeatureCard from '@/components/FeatureCard';

const ToolsPage = () => {
  const tools = [
    {
      id: 'ip',
      title: 'IP 地址查詢',
      description: '快速查看您的公網 IP 地址、瀏覽器資訊和訪問時間，幫助您了解網路連接狀態。',
      path: '/ip',
      icon: '🌐',
      color: '#3b82f6',
      features: ['即時 IP 顯示', '瀏覽器檢測', '時間戳記', '代理檢測']
    },
    {
      id: '2fa',
      title: '2FA 驗證碼生成器',
      description: '安全的雙因素驗證碼生成工具，支援 TOTP 標準，完全在本地運行保護您的隱私。',
      path: '/2fa',
      icon: '🔐',
      color: '#10b981',
      features: ['TOTP 標準', '本地運算', '即時更新', '安全可靠']
    },
    {
      id: 'ai-prompt',
      title: 'AI 人像提示詞生成器',
      description: '根據標準化字段生成高質量的圖像提示詞，支援 JSON 和自然語言格式輸出。',
      path: '/ai-prompt-generator',
      icon: '🎨',
      color: '#f0b90b',
      features: ['可折疊分類', 'JSON + 自然語言', '一鍵複製', '本地運算']
    },
    {
      id: 'multi-angle-reference',
      title: '多角度參考表生成器',
      description: '根據人物 identity JSON 生成 9 角度角色參考表提示詞，支援近景/中景/全身三種拍攝類型。',
      path: '/multi-angle-reference-sheet',
      icon: '📐',
      color: '#f0b90b',
      features: ['從 AI 生成器匯入', '三種拍攝類型', '固定 9 角度', 'JSON 格式輸出']
    },
    {
      id: 'macro-shot',
      title: 'Macro 特寫生成器',
      description: '根據人物 identity JSON 生成專業微距特寫提示詞，支援眼部和皮膚紋理兩種模式，使用 100mm macro lens 和 f/2.8 光圈參數。',
      path: '/macro-shot',
      icon: '🔍',
      color: '#f0b90b',
      features: ['從 AI 生成器匯入', '兩種 Macro 目標', '三種拍攝類型', '固定微距參數']
    },
    {
      id: 'scene-generator',
      title: '場景提示詞生成器',
      description: '根據人物 identity JSON 生成專業場景提示詞，支援 10 種預設場景和 3 種拍攝距離。',
      path: '/scene-generator',
      icon: '🎬',
      color: '#f0b90b',
      features: ['從 AI 生成器匯入', '10 種預設場景', '3 種拍攝距離', '場景標籤']
    }
  ];

  return (
    <Layout
      title="工具總覽 - 0xShinyui"
      description="實用工具集合，包含 IP 查詢和 2FA 驗證碼生成器等便民工具"
      canonical="/tools"
    >

      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* 頁面標題 */}
          <div className="text-center mb-16">
            <h1 
              className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            >
              🛠️ 工具總覽
            </h1>
            <p 
              className="text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              歡迎使用我們的實用工具集合！這裡提供各種便民工具，
              幫助您更高效地處理日常網路需求。
            </p>
          </div>

          {/* 工具卡片網格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <FeatureCard
                key={tool.id}
                id={tool.id}
                title={tool.title}
                description={tool.description}
                path={tool.path}
                icon={tool.icon}
                color={tool.color}
                features={tool.features}
                buttonText="立即使用"
                type="tool"
              />
            ))}
          </div>

          {/* 底部說明 */}
          <div className="mt-16 text-center">
            <div 
              className="inline-block p-6 rounded-2xl border-2 border-dashed max-w-2xl"
              style={{ 
                borderColor: "var(--border-color)",
                backgroundColor: "var(--card-background)"
              }}
            >
              <div className="text-3xl mb-3">🚀</div>
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                更多工具即將推出
              </h3>
              <p 
                className="text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                我們正在開發更多實用工具，敬請期待！如果您有任何建議或需求，歡迎與我們聯繫。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </Layout>
  );
};

export default ToolsPage;