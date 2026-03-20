import React, { useState, useEffect, useMemo } from 'react';
import Layout from '@/components/layout/Layout';
import Card from '@/components/ui/Card';
import Textarea from '@/components/ui/Textarea';
import Input from '@/components/ui/Input';

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

type ShotType = 'full-body' | 'mid-shot' | 'extreme-close-up';

interface SceneDefinition {
  id: string;
  name: string;
  nameZh: string;
  icon: string;
  category: string;
  template: string;
  tags: string[];
}

interface ScenePromptOutput {
  scene_type: string;
  scene_template: string;
  shot_type: string;
  base_identity: string;
  full_prompt: string;
  scene_tags: string[];
  mood_keywords: string[];
}

// Constants
const SHOT_DESCRIPTIONS: Record<ShotType, string> = {
  'full-body': 'Full body shot, head to toe visible, complete figure in frame, environmental context visible',
  'mid-shot': 'Mid shot from waist up, upper body and face clearly visible, tighter framing',
  'extreme-close-up': 'Extreme close-up shot, shoulders and face, intimate framing, detailed facial features'
};

const SHOT_TYPE_LABELS: Record<ShotType, string> = {
  'full-body': '全身 (Full body)',
  'mid-shot': '中景 (Mid shot)',
  'extreme-close-up': '特寫 (Extreme close-up)'
};

const BASE_IDENTITY_STATEMENT = 'Same exact person from the identity lock. All physical features preserved.';

const SCENES: SceneDefinition[] = [
  {
    id: 'city-vlogging',
    name: 'City Vlogging',
    nameZh: '城市街頭 Vlog',
    icon: '🏙️',
    category: 'Urban',
    template: 'Scene: Walking down a busy city street holding a phone at arm\'s length, vlogging directly to camera, minimalist chic outfit, wearing large, thin gold hoop earrings, urban background with depth of field blur, daytime.',
    tags: ['urban', 'vlogging', 'city', 'street', 'phone', 'daytime']
  },
  {
    id: 'car-selfie',
    name: 'Car Selfie',
    nameZh: '車內自拍',
    icon: '🚗',
    category: 'Indoor',
    template: 'Scene: Sitting in the driver\'s seat of a modern car, taking a selfie, natural window light from the left, minimalist chic outfit, relaxed confident, elegant, sophisticated, poised, calm, stylish expression, steering wheel partially visible.',
    tags: ['car', 'selfie', 'indoor', 'natural-light', 'portrait']
  },
  {
    id: 'gym-entry',
    name: 'Gym Entry',
    nameZh: '健身房入場',
    icon: '💪',
    category: 'Lifestyle',
    template: 'Scene: Walking into a modern gym, gym bag over shoulder, minimalist chic athletic wear, overhead fluorescent mixed with natural light, confident, elegant, sophisticated, poised, calm, stylish energy, mid-stride motion.',
    tags: ['gym', 'fitness', 'athletic', 'lifestyle', 'motion']
  },
  {
    id: 'podcast-recording',
    name: 'Podcast Recording',
    nameZh: 'Podcast 錄製',
    icon: '🎙️',
    category: 'Work',
    template: 'Scene: Seated at a podcast desk with professional microphone, headphones around neck, minimalist chic, warm studio lighting, sound panels in background, engaged confident, elegant, sophisticated, poised, calm, stylish expression.',
    tags: ['podcast', 'studio', 'work', 'professional', 'audio']
  },
  {
    id: 'cafe-working',
    name: 'Cafe Working',
    nameZh: '咖啡廳工作',
    icon: '☕',
    category: 'Lifestyle',
    template: 'Scene: Seated at a coffee shop table with laptop open, minimalist chic, warm ambient cafe lighting, shallow depth of field, coffee cup visible, focused and confident, elegant, sophisticated, poised, calm, stylish demeanor.',
    tags: ['cafe', 'work', 'laptop', 'lifestyle', 'ambient-light']
  },
  {
    id: 'mirror-selfie',
    name: 'Mirror Selfie',
    nameZh: '鏡子自拍',
    icon: '🪞',
    category: 'Indoor',
    template: 'Scene: Standing in front of a large mirror, phone held at chest level, minimalist chic outfit fully visible, large, thin gold hoop earrings, clean interior background, natural room lighting.',
    tags: ['mirror', 'selfie', 'indoor', 'reflection', 'portrait']
  },
  {
    id: 'dramatic-portrait',
    name: 'Dramatic Portrait',
    nameZh: '戲劇肖像',
    icon: '🎭',
    category: 'Portrait',
    template: 'Scene: Extreme close-up from shoulders up, confident, elegant, sophisticated, poised, calm, stylish emotional expression, eyes glistening with intensity, dramatic directional lighting, shallow depth of field, cinematic mood.',
    tags: ['portrait', 'dramatic', 'cinematic', 'close-up', 'lighting']
  },
  {
    id: 'night-city-street',
    name: 'Night City Street',
    nameZh: '夜間城市街道',
    icon: '🌃',
    category: 'Urban',
    template: 'Scene: Walking through a neon-lit city street at night, colorful reflections on skin, minimalist chic, neon bokeh background, cinematic night photography, confident, elegant, sophisticated, poised, calm, stylish stride.',
    tags: ['urban', 'night', 'neon', 'city', 'cinematic']
  },
  {
    id: 'home-office',
    name: 'Home Office',
    nameZh: '家庭辦公',
    icon: '🏠',
    category: 'Work',
    template: 'Scene: Seated at a clean minimal desk with monitor and plants, minimalist chic casual wear, natural window light from the side, productive confident, elegant, sophisticated, poised, calm, stylish focus, modern interior.',
    tags: ['home', 'office', 'work', 'minimal', 'natural-light']
  },
  {
    id: 'rooftop-sunset',
    name: 'Rooftop Sunset',
    nameZh: '天台日落',
    icon: '🌅',
    category: 'Outdoor',
    template: 'Scene: Standing on a rooftop terrace during golden hour, cityscape panorama behind, minimalist chic, large, thin gold hoop earrings, warm sunset light wrapping around face, candid confident, elegant, sophisticated, poised, calm, stylish pose, wind slightly moving hair.',
    tags: ['rooftop', 'sunset', 'golden-hour', 'outdoor', 'cityscape']
  }
];

const MOOD_KEYWORDS = ['confident', 'elegant', 'sophisticated', 'poised', 'calm', 'stylish'];

export default function SceneGeneratorPage() {
  // State
  const [identityJSON, setIdentityJSON] = useState('');
  const [parsedIdentity, setParsedIdentity] = useState<BaseIdentity | null>(null);
  const [selectedScene, setSelectedScene] = useState<string>('city-vlogging');
  const [shotType, setShotType] = useState<ShotType>('full-body');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [parseError, setParseError] = useState('');
  const [sceneFilter, setSceneFilter] = useState('');

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

  // Generate scene prompt
  const generateScenePrompt = (): ScenePromptOutput => {
    if (!parsedIdentity || !parsedIdentity.identity) {
      throw new Error('No valid identity data');
    }

    const scene = SCENES.find(s => s.id === selectedScene);
    if (!scene) throw new Error('Scene not found');

    const identityOnly = { identity: parsedIdentity.identity };
    const shotDescription = SHOT_DESCRIPTIONS[shotType];

    return {
      scene_type: `${scene.name} ${SHOT_TYPE_LABELS[shotType]}`,
      scene_template: scene.template,
      shot_type: shotDescription,
      base_identity: JSON.stringify(identityOnly, null, 2),
      full_prompt: `${scene.template} ${shotDescription}. ${BASE_IDENTITY_STATEMENT}. Same exact person from the identity lock. All physical features preserved. Render style and quality consistent with base identity specifications.`,
      scene_tags: scene.tags,
      mood_keywords: MOOD_KEYWORDS
    };
  };

  // Handle generate button
  const handleGenerate = () => {
    if (!parsedIdentity || !parsedIdentity.identity) {
      setParseError('請先輸入有效的 identity JSON');
      return;
    }

    try {
      const output = generateScenePrompt();
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

  // Get selected scene details
  const selectedSceneDetails = useMemo(() => {
    return SCENES.find(s => s.id === selectedScene);
  }, [selectedScene]);

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

  // Filter scenes
  const filteredScenes = useMemo(() => {
    if (!sceneFilter) return SCENES;

    const filter = sceneFilter.toLowerCase();
    return SCENES.filter(scene =>
      scene.name.toLowerCase().includes(filter) ||
      scene.nameZh.includes(filter) ||
      scene.category.toLowerCase().includes(filter) ||
      scene.tags.some(tag => tag.toLowerCase().includes(filter))
    );
  }, [sceneFilter]);

  return (
    <Layout
      title="場景提示詞生成器 - 0xShinyui"
      description="根據人物 identity JSON 生成專業場景提示詞，支援 10 種預設場景和 3 種拍攝距離"
      canonical="/scene-generator"
    >
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              🎬 場景提示詞生成器
            </h1>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-muted)' }}
            >
              從 AI 提示詞生成器的輸出創建專業場景提示詞
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

              {/* Scene Selector */}
              <Card padding="lg">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  🎬 選擇場景
                </h2>

                {/* Search/Filter */}
                <div className="mb-4">
                  <Input
                    value={sceneFilter}
                    onChange={(e) => setSceneFilter(e.target.value)}
                    placeholder="搜尋場景..."
                  />
                </div>

                {/* Scene Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {filteredScenes.map((scene) => (
                    <button
                      key={scene.id}
                      onClick={() => setSelectedScene(scene.id)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedScene === scene.id ? '' : 'opacity-60 hover:opacity-80'
                      }`}
                      style={{
                        borderColor: selectedScene === scene.id ? 'var(--accent-gold)' : 'var(--border-color)',
                        backgroundColor: selectedScene === scene.id ? 'rgba(240, 185, 11, 0.1)' : 'var(--card-background)',
                      }}
                    >
                      <div className="text-2xl mb-1">{scene.icon}</div>
                      <div className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                        {scene.nameZh}
                      </div>
                      <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                        {scene.name}
                      </div>
                    </button>
                  ))}
                </div>

                {filteredScenes.length === 0 && (
                  <div className="text-center py-6" style={{ color: 'var(--text-muted)' }}>
                    <p>沒有找到符合的場景</p>
                  </div>
                )}
              </Card>

              {/* Shot Type Selector */}
              <Card padding="lg">
                <h2
                  className="text-xl font-semibold mb-4"
                  style={{ color: 'var(--accent-gold)' }}
                >
                  📏 拍攝距離
                </h2>

                <div className="grid grid-cols-3 gap-4">
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
                        {type === 'full-body' ? '🧍‍♂️' : type === 'mid-shot' ? '🧍' : '🔍'}
                      </div>
                      <div className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                        {SHOT_TYPE_LABELS[type]}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg text-sm" style={{ backgroundColor: 'var(--hover-background)' }}>
                  <p style={{ color: 'var(--text-muted)' }}>
                    目前選擇: <span style={{ color: 'var(--accent-gold)' }}>{SHOT_DESCRIPTIONS[shotType]}</span>
                  </p>
                </div>
              </Card>

              {/* Scene Preview */}
              {selectedSceneDetails && (
                <Card padding="lg">
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: 'var(--accent-gold)' }}
                  >
                    ⚙️ 場景預覽
                  </h2>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                        場景名稱:
                      </span>
                      <p className="mt-1" style={{ color: 'var(--text-primary)' }}>
                        {selectedSceneDetails.icon} {selectedSceneDetails.nameZh} ({selectedSceneDetails.name})
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                        場景描述:
                      </span>
                      <p className="mt-1 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {selectedSceneDetails.template}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>
                        場景標籤:
                      </span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedSceneDetails.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 rounded text-xs"
                            style={{
                              backgroundColor: 'var(--hover-background)',
                              color: 'var(--text-secondary)',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              )}

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
                🚀 生成場景提示詞 JSON
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

                  {/* Selected Scene Info */}
                  {selectedSceneDetails && (
                    <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--hover-background)' }}>
                      <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                        選擇的場景:
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--accent-gold)' }}>
                        {selectedSceneDetails.icon} {selectedSceneDetails.name}
                      </p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                        {SHOT_TYPE_LABELS[shotType]}
                      </p>
                    </div>
                  )}

                  {/* Mood Keywords */}
                  <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--hover-background)' }}>
                    <h3 className="text-sm font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                      情緒關鍵詞:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {MOOD_KEYWORDS.map((keyword) => (
                        <span
                          key={keyword}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: 'rgba(240, 185, 11, 0.2)',
                            color: 'var(--accent-gold)',
                          }}
                        >
                          {keyword}
                        </span>
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
                      {generatedOutput || '// 點擊「生成場景提示詞 JSON」查看結果...'}
                    </pre>
                  </div>

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
                      💡 此 JSON 可用於生成場景提示詞，適合角色場景圖、生活方式照片等用途。
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
              <li>• 從 10 種預設場景中選擇一種，每種場景都包含固定的穿搭風格（minimalist chic）</li>
              <li>• 選擇拍攝距離：全身、中景、特寫</li>
              <li>• 所有場景都包含統一的情緒關鍵詞：confident, elegant, sophisticated, poised, calm, stylish</li>
              <li>• 點擊生成後複製 JSON，可用於 Midjourney、Stable Diffusion 等工具</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
