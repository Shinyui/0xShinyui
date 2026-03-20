import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Textarea from '@/components/ui/Textarea';

// TypeScript interfaces
interface BaseIdentity {
  _meta?: {
    prompt_version?: string;
    generated_at?: string;
    field_count?: number;
  };
  identity?: {
    gender?: string;
    age?: string;
    ethnicity?: string;
    faceShape?: string;
    eyeColor?: string;
    eyeShape?: string;
    noseType?: string;
    lipShape?: string;
    distinguishingMarks?: string;
    hairColor?: string;
    hairTexture?: string;
    hairStyle?: string;
    skinTexture?: string;
    skinTone?: string;
    makeup?: string;
    bodyType?: string;
    facialExpression?: string;
    gazeDirection?: string;
  };
  style?: Record<string, any>;
  personality?: Record<string, any>;
  technicalSpecs?: Record<string, any>;
}

type ShotType = 'close-up' | 'mid-shot' | 'full-body';

interface ReferenceSheetOutput {
  task: string;
  instruction: string;
  base_identity: string;
  shot_type: string;
  output_format: {
    layout: string;
    total_images: number;
    background: string;
    spacing: string;
    labels: {
      position: string;
      style: string;
      color: string;
      format: string[];
    };
  };
  angles_mapping: Record<string, string>;
  lighting: {
    type: string;
    consistency: string;
    shadows: string;
  };
  skin_rendering: {
    detail: string;
    visible_pores: boolean;
    natural_texture: boolean;
    no_smoothing: boolean;
    no_filters: boolean;
  };
  camera: {
    lens: string;
    distortion: string;
    color_profile: string;
    resolution: string;
    sharpness: string;
  };
  rules: string[];
  quality: string;
}

// Constants
const SHOT_TYPE_DESCRIPTIONS: Record<ShotType, string> = {
  'close-up': 'close-up (head and shoulders only, facial details focus)',
  'mid-shot': 'mid-shot (waist up, upper body visible)',
  'full-body': 'full-body (entire body head to toe, full frame)'
};

const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  'close-up': '近景 (Close-up)',
  'mid-shot': '中景 (Mid-shot)',
  'full-body': '全身 (Full-body)'
};

const ANGLES_MAPPING = {
  'IMG1': 'front view (eye level)',
  'IMG2': 'left 45 degree angle',
  'IMG3': 'left profile 90 degrees',
  'IMG4': 'right 45 degree angle',
  'IMG5': 'right profile 90 degrees',
  'IMG6': 'back 180 degree view',
  'IMG7': 'high angle looking down 30 degrees',
  'IMG8': 'low angle looking up 30 degrees',
  'IMG9': 'three-quarter natural candid angle'
};

const BACKGROUND_OPTIONS = [
  'neutral soft gray studio background',
  'clean white seamless background',
  'black studio backdrop',
  'gradient gray background',
  'natural outdoor blurred background'
];

export default function MultiAngleReferenceSheetPage() {
  // State
  const [identityJSON, setIdentityJSON] = useState('');
  const [parsedIdentity, setParsedIdentity] = useState<BaseIdentity | null>(null);
  const [shotType, setShotType] = useState<ShotType>('close-up');
  const [backgroundColor, setBackgroundColor] = useState(BACKGROUND_OPTIONS[0]);
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [parseError, setParseError] = useState('');
  const [showRawJSON, setShowRawJSON] = useState(false);

  // Auto-load from localStorage on mount
  useEffect(() => {
    // Guard: Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aiPortraitGenerator_lastIdentity');
      if (saved) {
        setIdentityJSON(saved);
        try {
          const parsed = JSON.parse(saved);
          setParsedIdentity(parsed);
          setParseError('');
        } catch (err) {
          setParseError('已儲存的 JSON 格式無效，請重新輸入');
        }
      }
    }
  }, []);

  // Parse JSON when input changes
  const handleParseJSON = (value: string) => {
    setIdentityJSON(value);
    setParseError('');

    if (!value.trim()) {
      setParsedIdentity(null);
      return;
    }

    try {
      // Clean markdown code blocks if present
      let cleaned = value.trim();
      if (cleaned.startsWith('```')) {
        cleaned = cleaned.replace(/^```(?:json)?\n/, '').replace(/\n```$/, '');
      }

      const parsed = JSON.parse(cleaned);

      // Validate that it has at least identity data
      if (!parsed.identity || typeof parsed.identity !== 'object') {
        setParseError('JSON 必須包含 "identity" 物件');
        setParsedIdentity(null);
        return;
      }

      setParsedIdentity(parsed);
    } catch (err) {
      setParseError('JSON 格式錯誤：' + (err as Error).message);
      setParsedIdentity(null);
    }
  };

  // Load from localStorage button
  const handleLoadFromStorage = () => {
    const saved = localStorage.getItem('aiPortraitGenerator_lastIdentity');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setIdentityJSON(saved);
        setParsedIdentity(parsed);
        setParseError('');
      } catch (err) {
        setParseError('無法載入已儲存的資料');
      }
    } else {
      setParseError('沒有找到已儲存的 identity 資料。請先在 AI 提示詞生成器中生成並儲存。');
    }
  };

  // Generate reference sheet JSON
  const generateReferenceSheetJSON = (): ReferenceSheetOutput => {
    if (!parsedIdentity || !parsedIdentity.identity) {
      throw new Error('No valid identity data');
    }

    // Extract only the identity part for base_identity
    const identityOnly = {
      identity: parsedIdentity.identity
    };

    return {
      task: 'multi-angle character reference sheet generation',
      instruction: 'Preserve the exact facial identity, bone structure, skin texture, proportions, and realism from the uploaded image. This must be the same exact person in every frame. Do not beautify, stylize, or alter facial features.',
      base_identity: JSON.stringify(identityOnly, null, 2),
      shot_type: SHOT_TYPE_DESCRIPTIONS[shotType],
      output_format: {
        layout: '3x3 grid',
        total_images: 9,
        background: backgroundColor,
        spacing: 'clean evenly spaced grid, reference sheet style',
        labels: {
          position: 'top left corner of each frame',
          style: 'small clean sans-serif font',
          color: 'white text with subtle black shadow for visibility',
          format: ['IMG1', 'IMG2', 'IMG3', 'IMG4', 'IMG5', 'IMG6', 'IMG7', 'IMG8', 'IMG9']
        }
      },
      angles_mapping: ANGLES_MAPPING,
      lighting: {
        type: 'soft diffused studio lighting',
        consistency: 'identical lighting across all 9 images',
        shadows: 'natural soft shadows'
      },
      skin_rendering: {
        detail: 'ultra realistic',
        visible_pores: true,
        natural_texture: true,
        no_smoothing: true,
        no_filters: true
      },
      camera: {
        lens: '50mm neutral portrait lens',
        distortion: 'none',
        color_profile: 'true-to-life skin tones',
        resolution: '8k',
        sharpness: 'high detail'
      },
      rules: [
        'Keep exact identity from uploaded image',
        'Maintain identical outfit unless specified',
        'Do not change hair length or color',
        'Do not change body proportions',
        'No stylization',
        'No cartoon effect',
        'Pure photorealism'
      ],
      quality: 'hyper-realistic, studio reference sheet, character turnaround sheet'
    };
  };

  // Handle generate button
  const handleGenerate = () => {
    if (!parsedIdentity || !parsedIdentity.identity) {
      setParseError('請先輸入有效的 identity JSON');
      return;
    }

    try {
      const output = generateReferenceSheetJSON();
      setGeneratedOutput(JSON.stringify(output, null, 2));
    } catch (err) {
      setParseError('生成失敗：' + (err as Error).message);
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (!generatedOutput) {
      alert('請先生成 JSON！');
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedOutput);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      alert('複製失敗，請手動複製');
    }
  };

  // Identity summary for display
  const identitySummary = useMemo(() => {
    if (!parsedIdentity?.identity) return null;

    const id = parsedIdentity.identity;
    const parts: string[] = [];

    if (id.gender) parts.push(`性別: ${id.gender}`);
    if (id.age) parts.push(`年齡: ${id.age}`);
    if (id.ethnicity) parts.push(`種族: ${id.ethnicity}`);
    if (id.hairColor) parts.push(`髮色: ${id.hairColor}`);
    if (id.eyeColor) parts.push(`眼色: ${id.eyeColor}`);
    if (id.skinTone) parts.push(`膚色: ${id.skinTone}`);
    if (id.makeup) parts.push(`妝容: ${id.makeup}`);

    return parts.join(' | ');
  }, [parsedIdentity]);

  return (
    <Layout
      title="多角度參考表生成器 - 0xShinyui"
      description="根據人物 identity JSON 生成 9 角度角色參考表提示詞"
      canonical="/multi-angle-reference-sheet"
    >
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              📐 多角度參考表生成器
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              從 AI 提示詞生成器的輸出創建 9 角度角色參考表提示詞
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column - Input */}
            <div className="lg:col-span-2 space-y-6">
              {/* Identity Input Section */}
              <Card padding="lg">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="text-xl font-semibold"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    📥 Identity 輸入
                  </h2>
                  <button
                    onClick={handleLoadFromStorage}
                    className="py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200"
                    style={{
                      backgroundColor: 'var(--border-color)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    🔄 從 AI 生成器載入
                  </button>
                </div>

                <Textarea
                  value={identityJSON}
                  onChange={(e) => handleParseJSON(e.target.value)}
                  placeholder="將 AI 提示詞生成器的 JSON 輸出貼到這裡..."
                  rows={10}
                />

                {parseError && (
                  <div
                    className="mt-3 p-3 rounded-lg text-sm"
                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '3px solid #ef4444' }}
                  >
                    <p style={{ color: '#ef4444' }}>⚠️ {parseError}</p>
                  </div>
                )}

                {parsedIdentity?.identity && (
                  <div
                    className="mt-3 p-3 rounded-lg text-sm"
                    style={{ backgroundColor: 'rgba(23, 162, 184, 0.1)', borderLeft: '3px solid #17a2b8' }}
                  >
                    <p style={{ color: '#17a2b8' }}>✅ Identity 已載入</p>
                    {identitySummary && (
                      <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
                        {identitySummary}
                      </p>
                    )}
                  </div>
                )}
              </Card>

              {/* Shot Type Selector */}
              <Card padding="lg">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  🎬 拍攝類型
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(Object.keys(SHOT_TYPE_LABELS) as ShotType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setShotType(type)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        shotType === type ? '' : 'opacity-60'
                      }`}
                      style={{
                        borderColor: shotType === type ? 'var(--accent-gold)' : 'var(--border-color)',
                        backgroundColor: shotType === type ? 'rgba(240, 185, 11, 0.1)' : 'var(--card-background)',
                      }}
                    >
                      <div className="text-2xl mb-2">
                        {type === 'close-up' ? '👤' : type === 'mid-shot' ? '🧍' : '🧍‍♂️'}
                      </div>
                      <div className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {SHOT_TYPE_LABELS[type]}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--hover-background)' }}>
                  <p style={{ color: 'var(--text-muted)' }}>
                    目前選擇: <span style={{ color: 'var(--accent-gold)' }}>{SHOT_TYPE_DESCRIPTIONS[shotType]}</span>
                  </p>
                </div>
              </Card>

              {/* Optional Settings */}
              <Card padding="lg">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  ⚙️ 背景設定
                </h2>

                <div className="space-y-3">
                  {BACKGROUND_OPTIONS.map((option) => (
                    <label
                      key={option}
                      className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                      style={{
                        backgroundColor: backgroundColor === option ? 'rgba(240, 185, 11, 0.1)' : 'var(--hover-background)',
                        border: backgroundColor === option ? '1px solid var(--accent-gold)' : '1px solid transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name="background"
                        value={option}
                        checked={backgroundColor === option}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span style={{ color: 'var(--text-primary)' }}>{option}</span>
                    </label>
                  ))}
                </div>
              </Card>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={!parsedIdentity?.identity}
                className="w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none"
                style={{
                  backgroundColor: 'var(--accent-gold)',
                  color: 'var(--background)',
                }}
              >
                🚀 生成參考表 JSON
              </button>
            </div>

            {/* Right column - Output */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card padding="lg">
                  <h2
                    className="text-lg font-semibold mb-4"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    📤 輸出結果
                  </h2>

                  {/* Angles Preview */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                      9 角度配置:
                    </h3>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      {Object.entries(ANGLES_MAPPING).map(([key, value]) => (
                        <div
                          key={key}
                          className="p-2 rounded text-center"
                          style={{ backgroundColor: 'var(--hover-background)' }}
                        >
                          <div className="font-medium" style={{ color: 'var(--accent-gold)' }}>{key}</div>
                          <div className="mt-1" style={{ color: 'var(--text-muted)' }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Output JSON */}
                  <div
                    className="p-4 rounded-lg mb-4 overflow-x-auto"
                    style={{
                      backgroundColor: '#0b0e11',
                      maxHeight: '400px',
                      overflowY: 'auto',
                    }}
                  >
                    <pre
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}
                    >
                      {generatedOutput || '// 點擊「生成參考表 JSON」查看結果...'}
                    </pre>
                  </div>

                  {/* Toggle raw/base_identity view */}
                  {generatedOutput && (
                    <button
                      onClick={() => setShowRawJSON(!showRawJSON)}
                      className="w-full py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 mb-3"
                      style={{
                        backgroundColor: 'var(--border-color)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      {showRawJSON ? '👁️ 顯示完整 JSON' : '👤 顯示 base_identity'}
                    </button>
                  )}

                  {/* Copy button */}
                  <button
                    onClick={handleCopy}
                    disabled={!generatedOutput}
                    className="w-full py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: copySuccess ? '#17a58a' : '#28a745',
                      color: 'white',
                    }}
                  >
                    {copySuccess ? '✅ 已複製！' : '📋 複製 JSON'}
                  </button>

                  {/* Tips */}
                  <div
                    className="mt-4 p-3 rounded-lg text-sm"
                    style={{
                      backgroundColor: 'var(--hover-background)',
                      borderLeft: '3px solid var(--accent-gold)',
                    }}
                  >
                    <p style={{ color: 'var(--text-muted)' }}>
                      💡 此 JSON 可用於生成 9 角度角色參考表，適合角色設計、3D 建模等用途。
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          {/* Bottom info */}
          <div
            className="mt-12 p-6 rounded-lg"
            style={{
              backgroundColor: 'var(--card-background)',
              border: '2px dashed var(--border-color)',
            }}
          >
            <h3
              className="text-lg font-semibold mb-3"
              style={{ color: 'var(--accent-gold)' }}
            >
              💡 使用說明
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--text-muted)' }}>
              <li>• 從 AI 提示詞生成器複製 JSON，或使用「儲存 Identity」功能後在此工具中載入</li>
              <li>• 選擇拍攝類型：近景（頭肩）、中景（腰部以上）、全身（全身）</li>
              <li>• 9 個角度包括：正面、45°、側面、背面、俯視、仰視等</li>
              <li>• 點擊生成後複製 JSON，可用於 Midjourney、Stable Diffusion 等工具</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
