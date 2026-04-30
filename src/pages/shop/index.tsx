import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/shop/ProductCard';
import { shopCategories, TELEGRAM_HANDLE } from '@/lib/shopConfig';

const ShopPage = () => {
  const [activeTab, setActiveTab] = useState(shopCategories[0].id);
  const activeCategory = shopCategories.find((c) => c.id === activeTab)!;

  return (
    <Layout
      title="商店 - 0xShinyui"
      description="Web3 空投腳本與空投基建資源，透過 Telegram 聯繫購買"
      canonical="/shop"
    >
      <div className="min-h-screen py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Page header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-600 bg-clip-text text-transparent">
              商店
            </h1>
            <p
              className="text-xl max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--text-muted)' }}
            >
              Web3 空投腳本與基建資源，所有商品透過 Telegram 聯繫購買
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex gap-1 mb-10 p-1 rounded-xl inline-flex"
            style={{ backgroundColor: 'var(--card-background)' }}
          >
            {shopCategories.map((category) => {
              const isActive = category.id === activeTab;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className="px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive
                      ? 'var(--accent-gold)'
                      : 'transparent',
                    color: isActive ? '#0b0e11' : 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-primary)';
                      e.currentTarget.style.backgroundColor =
                        'var(--border-color)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {category.title}
                </button>
              );
            })}
          </div>

          {/* Active category subtitle */}
          <p
            className="mb-8 text-base"
            style={{ color: 'var(--text-muted)' }}
          >
            {activeCategory.subtitle}
          </p>

          {/* Product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCategory.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Bottom notice */}
          <div className="mt-16 text-center">
            <div
              className="inline-block p-6 rounded-2xl border-2 border-dashed max-w-2xl"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'var(--card-background)',
              }}
            >
              <div className="text-3xl mb-3">🛡️</div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                交易須知
              </h3>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                所有交易透過 Telegram 私訊完成，確認付款後交付商品。
                有任何問題歡迎直接聯繫 {TELEGRAM_HANDLE}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;
