import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

export default function GratingEncoderDeepDive() {
  const [activeSection, setActiveSection] = useState('principle');
  const [stagePos, setStagePos] = useState(0);
  const [animTime, setAnimTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimTime(t => t + 0.05);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // 회절 격자에서 위상 시프트 데이터
  const generatePhaseShiftData = () => {
    const data = [];
    const gratingPeriod = 1000; // nm
    for (let displacement = 0; displacement <= 4000; displacement += 20) {
      // ±1차 회절광의 위상차 = 4π * x / Λ
      const phaseDiff = (4 * Math.PI * displacement) / gratingPeriod;
      const signal = Math.cos(phaseDiff);
      data.push({
        x: displacement,
        signal: signal,
        phase: (phaseDiff / Math.PI).toFixed(2),
      });
    }
    return data;
  };

  // 환경 민감도 비교
  const sensitivityData = [
    { name: '온도\n(1°C 변화)', laser: 950, grating: 12, unit: 'pm' },
    { name: '습도\n(10% RH)', laser: 380, grating: 5, unit: 'pm' },
    { name: '압력\n(1 hPa)', laser: 270, grating: 3, unit: 'pm' },
    { name: '광원 주파수\n변동 (Δν/ν)', laser: 200, grating: 8, unit: 'pm' },
  ];

  // 오차 원인 분석
  const errorBudget = [
    { name: '주기적 비선형', value: 30, color: '#ef4444', desc: 'PBS 편광 누설' },
    { name: 'Abbe 오차', value: 50, color: '#f97316', desc: '회전-병진 결합' },
    { name: '격자 제조오차', value: 80, color: '#eab308', desc: '피치 변동' },
    { name: '온도 드리프트', value: 40, color: '#3b82f6', desc: '광학계 열팽창' },
    { name: '신호 보간', value: 25, color: '#8b5cf6', desc: 'AD 변환 비선형' },
    { name: '기타', value: 15, color: '#64748b', desc: '기계적 진동' },
  ];

  // 6-DOF 측정 데이터
  const dof6Data = [
    { dof: 'X', range: '300mm', resolution: 0.22, headCount: 2 },
    { dof: 'Y', range: '300mm', resolution: 0.22, headCount: 2 },
    { dof: 'Z', range: '300μm', resolution: 0.5, headCount: 4 },
    { dof: 'Rx', range: '±1.5mrad', resolution: 0.05, headCount: 4 },
    { dof: 'Ry', range: '±1.5mrad', resolution: 0.05, headCount: 4 },
    { dof: 'Rz', range: '±1.5mrad', resolution: 0.03, headCount: 4 },
  ];

  // 레이더 차트 (기술 특성 비교)
  const radarData = [
    { metric: '환경 강인성', laser: 30, grating: 95 },
    { metric: '분해능', laser: 70, grating: 95 },
    { metric: '측정 속도', laser: 80, grating: 90 },
    { metric: '컴팩트성', laser: 30, grating: 85 },
    { metric: '비용효율', laser: 25, grating: 70 },
    { metric: 'Long-stroke', laser: 95, grating: 80 },
    { metric: '다축 통합', laser: 50, grating: 95 },
  ];

  const phaseData = generatePhaseShiftData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6" style={{ fontFamily: "'Pretendard', 'Noto Sans KR', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css');
        .glow-amber { filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.5)); }
        .glow-cyan { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.5)); }
        .glow-pink { filter: drop-shadow(0 0 8px rgba(244, 114, 182, 0.5)); }
        .glow-green { filter: drop-shadow(0 0 8px rgba(74, 222, 128, 0.5)); }
        .glow-violet { filter: drop-shadow(0 0 8px rgba(167, 139, 250, 0.5)); }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <header className="mb-8 border-l-4 border-amber-400 pl-6">
          <div className="text-xs tracking-[0.3em] text-amber-400 mb-2">DEEP TECHNICAL ANALYSIS · 격자 인코더 심층분석</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
            Heterodyne <span className="text-amber-400">Grating Encoder</span>
          </h1>
          <p className="text-slate-400 text-lg">ASML 노광기 웨이퍼 스테이지의 심장 · 광학 원리부터 트러블슈팅까지</p>
        </header>

        {/* 핵심 사양 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">분해능 (3σ)</div>
            <div className="text-2xl font-bold text-amber-400">0.22 <span className="text-sm text-slate-400">nm</span></div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">광로 길이</div>
            <div className="text-2xl font-bold text-cyan-400">~15 <span className="text-sm text-slate-400">mm</span></div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">측정 갱신율</div>
            <div className="text-2xl font-bold text-pink-400">20 <span className="text-sm text-slate-400">kHz</span></div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">측정 자유도</div>
            <div className="text-2xl font-bold text-green-400">6 <span className="text-sm text-slate-400">DOF</span></div>
          </div>
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
            <div className="text-xs text-slate-500 mb-1">격자 피치</div>
            <div className="text-2xl font-bold text-violet-400">0.5~1 <span className="text-sm text-slate-400">μm</span></div>
          </div>
        </div>

        {/* 네비게이션 */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-800">
          {[
            { id: 'principle', label: '01 · 회절 원리', color: '#fbbf24' },
            { id: 'optics', label: '02 · 광학 구조', color: '#22d3ee' },
            { id: '6dof', label: '03 · 6-DOF 측정', color: '#a78bfa' },
            { id: 'errors', label: '04 · 오차원인', color: '#ef4444' },
            { id: 'asml', label: '05 · ASML 구현', color: '#f472b6' },
            { id: 'field', label: '06 · 현장 트러블슈팅', color: '#4ade80' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className="px-4 py-3 text-sm font-medium tracking-wide transition-all"
              style={{
                color: activeSection === tab.id ? tab.color : '#64748b',
                borderBottom: activeSection === tab.id ? `2px solid ${tab.color}` : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 섹션 1: 회절 원리 */}
        {activeSection === 'principle' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-amber-950/30 to-slate-900/60 border border-amber-800/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-3 text-amber-400">🔬 핵심 원리: 격자가 빛을 회절시키면 위치 정보가 위상에 새겨진다</h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                레이저 간섭계는 <span className="text-cyan-400 font-semibold">파장(λ)</span>을 길이의 기준으로 삼지만,
                격자 인코더는 <span className="text-amber-400 font-semibold">격자 피치(Λ)</span>를 길이의 기준으로 삼습니다.
                이 한 가지 차이가 모든 것을 바꿉니다.
              </p>
              <div className="bg-slate-950/80 rounded-lg p-5 font-mono text-sm leading-relaxed">
                <div className="text-slate-500 mb-2">회절 방정식 (격자 방정식):</div>
                <div className="text-amber-300 text-lg mb-3">Λ · (sin θᵢ + sin θₘ) = m · λ</div>
                <div className="text-slate-500 mb-2">격자가 x만큼 이동하면 m차 회절광의 위상은:</div>
                <div className="text-amber-300 text-lg mb-3">Δφₘ = 2π · m · x / Λ</div>
                <div className="text-slate-500 mb-2">±1차 회절광을 간섭시키면 (m=+1, m=-1):</div>
                <div className="text-pink-300 text-lg">Δφ = 4π · x / Λ <span className="text-slate-500 text-sm">← 한 주기 = Λ/2</span></div>
              </div>
            </div>

            {/* 회절 시각화 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">📐 회절 격자에서 일어나는 일</h3>
              <p className="text-sm text-slate-400 mb-4">아래 슬라이더로 격자를 움직여 보세요. ±1차 회절광의 위상이 변하면서 비트 신호가 시프트됩니다.</p>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-400">격자 위치 (스테이지 이동):</span>
                  <span className="text-amber-400 font-mono">{stagePos} nm (= {(stagePos / 500).toFixed(2)} × Λ/2)</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="10"
                  value={stagePos}
                  onChange={(e) => setStagePos(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
              </div>

              <svg viewBox="0 0 800 380" className="w-full bg-slate-950 rounded-lg border border-slate-800">
                {/* 입사빔 */}
                <line x1="400" y1="30" x2="400" y2="220" stroke="#22d3ee" strokeWidth="3" className="glow-cyan">
                  <animate attributeName="stroke-dasharray" values="0,200;200,0" dur="1s" repeatCount="indefinite"/>
                </line>
                <polygon points="400,220 395,213 405,213" fill="#22d3ee"/>
                <text x="410" y="120" fill="#22d3ee" fontSize="12" fontWeight="bold">입사빔</text>
                <text x="410" y="135" fill="#94a3b8" fontSize="10">(f₁, f₂ 두 주파수)</text>

                {/* 격자 */}
                <g transform={`translate(${stagePos * 0.06}, 0)`}>
                  <rect x="200" y="220" width="400" height="30" fill="#0f172a" stroke="#fbbf24" strokeWidth="2"/>
                  {Array.from({length: 40}, (_, i) => (
                    <rect key={i} x={200 + i * 10} y="220" width="5" height="30" fill="#fbbf24" opacity="0.7"/>
                  ))}
                </g>
                <text x="400" y="275" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">2D 회절 격자 (Λ = 1 μm)</text>
                <text x="400" y="290" textAnchor="middle" fill="#94a3b8" fontSize="10">웨이퍼 스테이지에 부착</text>

                {/* +1차 회절 */}
                <line x1="400" y1="220" x2="220" y2="30" stroke="#f472b6" strokeWidth="2.5" className="glow-pink">
                  <animate attributeName="stroke-dasharray" values="0,250;250,0" dur="1.2s" repeatCount="indefinite"/>
                </line>
                <text x="240" y="100" fill="#f472b6" fontSize="11" fontWeight="bold">+1차 회절</text>
                <text x="240" y="115" fill="#94a3b8" fontSize="10">위상: +2πx/Λ</text>

                {/* -1차 회절 */}
                <line x1="400" y1="220" x2="580" y2="30" stroke="#a78bfa" strokeWidth="2.5" className="glow-violet">
                  <animate attributeName="stroke-dasharray" values="0,250;250,0" dur="1.2s" repeatCount="indefinite"/>
                </line>
                <text x="560" y="100" fill="#a78bfa" fontSize="11" fontWeight="bold">-1차 회절</text>
                <text x="560" y="115" fill="#94a3b8" fontSize="10">위상: -2πx/Λ</text>

                {/* 회절 각도 표시 */}
                <path d="M 400 200 A 20 20 0 0 0 380 195" fill="none" stroke="#64748b" strokeWidth="1"/>
                <text x="370" y="210" fill="#64748b" fontSize="9">θ</text>

                {/* 위상차 박스 */}
                <rect x="50" y="300" width="700" height="70" fill="#0f172a" stroke="#fbbf24" strokeWidth="1" rx="6"/>
                <text x="70" y="320" fill="#fbbf24" fontSize="12" fontWeight="bold">±1차 회절광 사이의 위상차:</text>
                <text x="70" y="342" fill="#22d3ee" fontSize="14" fontFamily="monospace">Δφ = 4π · x / Λ</text>
                <text x="350" y="342" fill="#94a3b8" fontSize="11">
                  현재 위치 x = {stagePos} nm → Δφ = {((4 * Math.PI * stagePos) / 1000 / Math.PI).toFixed(3)}π
                </text>
                <text x="70" y="360" fill="#64748b" fontSize="10">한 주기(2π)당 격자 이동 = Λ/2 = 500 nm (광학적 분할로 sub-nm 분해)</text>
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-slate-950/60 rounded-lg p-4">
                  <div className="text-amber-400 font-semibold mb-2 text-sm">왜 ±1차를 쓰는가?</div>
                  <p className="text-xs text-slate-400">+1차와 -1차는 격자 이동에 대해 정반대 위상 변화를 보입니다. 두 빔을 간섭시키면 위상차가 2배가 되어 분해능이 두 배가 됩니다 (광학적 doubling).</p>
                </div>
                <div className="bg-slate-950/60 rounded-lg p-4">
                  <div className="text-cyan-400 font-semibold mb-2 text-sm">파장 vs 피치, 무엇이 기준?</div>
                  <p className="text-xs text-slate-400">레이저 간섭계: λ (공기 굴절률에 따라 변동). 격자 인코더: Λ (격자 자체에 새겨진 물리적 길이, 굴절률 무관). 굴절률 변화에 둔감한 본질적 이유.</p>
                </div>
                <div className="bg-slate-950/60 rounded-lg p-4">
                  <div className="text-pink-400 font-semibold mb-2 text-sm">광학적 분할 (Optical Subdivision)</div>
                  <p className="text-xs text-slate-400">기본은 Λ/2 = 500 nm 분해이지만, 더블 회절(이중 회절), 4-pass 구조, ±5차 회절 활용 등으로 Λ/4, Λ/8, Λ/20까지 분해능 향상 가능.</p>
                </div>
              </div>
            </div>

            {/* 위상 신호 차트 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-pink-400">📊 격자 이동에 따른 검출 신호</h3>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={phaseData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                  <XAxis dataKey="x" stroke="#64748b" tick={{ fontSize: 10 }} label={{ value: '격자 이동 거리 (nm)', position: 'insideBottom', offset: -5, fill: '#94a3b8' }}/>
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={[-1.2, 1.2]} label={{ value: '신호', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}/>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}/>
                  <Line type="monotone" dataKey="signal" stroke="#fbbf24" strokeWidth={2} dot={false}/>
                </LineChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-500 mt-2">한 주기 = Λ/2 = 500 nm. 정수 주기 카운팅 + 위상 보간(interpolation)으로 sub-nm 분해능 달성.</p>
            </div>
          </div>
        )}

        {/* 섹션 2: 광학 구조 */}
        {activeSection === 'optics' && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-cyan-800/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-3 text-cyan-400">⚙️ Encoder Head 내부 광학계</h2>
              <p className="text-slate-300 mb-4">
                Encoder Head는 광원에서 온 두 주파수 빔(f₁, f₂)을 격자에 입사시키고, 회절된 빔을 다시 받아 간섭시킨 뒤 신호를 검출하는 모든 광학 처리를 수행합니다.
                ASML이 사용하는 spatially separated heterodyne 방식을 중심으로 설명드립니다.
              </p>

              <svg viewBox="0 0 800 500" className="w-full bg-slate-950 rounded-lg border border-slate-800">
                {/* Encoder Head Box */}
                <rect x="100" y="40" width="600" height="280" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5,3" rx="6"/>
                <text x="400" y="30" textAnchor="middle" fill="#22d3ee" fontSize="13" fontWeight="bold">Encoder Head (고정, 진공 vessel 외부)</text>

                {/* 광섬유 입력 */}
                <rect x="20" y="100" width="60" height="30" fill="#0f172a" stroke="#fbbf24" strokeWidth="2" rx="3"/>
                <text x="50" y="118" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Fiber In</text>
                <text x="50" y="148" textAnchor="middle" fill="#94a3b8" fontSize="8">f₁, f₂</text>
                <line x1="80" y1="115" x2="130" y2="115" stroke="#fbbf24" strokeWidth="2" className="glow-amber"/>

                {/* PBS 1 */}
                <g transform="translate(150, 115) rotate(45)">
                  <rect x="-15" y="-2" width="30" height="4" fill="#94a3b8"/>
                </g>
                <text x="150" y="98" textAnchor="middle" fill="#cbd5e1" fontSize="9">PBS</text>
                <text x="150" y="160" textAnchor="middle" fill="#64748b" fontSize="8">편광 분리</text>

                {/* 입사빔 → 격자 */}
                <line x1="150" y1="115" x2="150" y2="380" stroke="#22d3ee" strokeWidth="2" className="glow-cyan"/>
                <text x="125" y="250" fill="#22d3ee" fontSize="9">f₁ ↓</text>
                
                {/* f₂ 경로 */}
                <line x1="150" y1="115" x2="350" y2="115" stroke="#f472b6" strokeWidth="2" className="glow-pink"/>
                <line x1="350" y1="115" x2="350" y2="380" stroke="#f472b6" strokeWidth="2" className="glow-pink"/>
                <text x="240" y="108" fill="#f472b6" fontSize="9">f₂ →</text>

                {/* 격자 (밖) */}
                <rect x="120" y="380" width="280" height="30" fill="#0f172a" stroke="#fbbf24" strokeWidth="2"/>
                {Array.from({length: 28}, (_, i) => (
                  <rect key={i} x={120 + i * 10} y="380" width="5" height="30" fill="#fbbf24" opacity="0.7"/>
                ))}
                <text x="260" y="435" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="bold">2D Diffraction Grating</text>
                <text x="260" y="448" textAnchor="middle" fill="#94a3b8" fontSize="9">웨이퍼 스테이지에 부착 · Λ ≈ 1 μm</text>

                {/* 회절광 반환 (입사 빔과 분리됨) */}
                <line x1="150" y1="380" x2="200" y2="115" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8"/>
                <line x1="350" y1="380" x2="280" y2="115" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.8"/>

                {/* QWP 1 & QWP 2 */}
                <rect x="195" y="200" width="10" height="40" fill="#a78bfa" opacity="0.6"/>
                <text x="200" y="195" textAnchor="middle" fill="#a78bfa" fontSize="8">QWP</text>
                <rect x="345" y="200" width="10" height="40" fill="#a78bfa" opacity="0.6"/>
                <text x="350" y="195" textAnchor="middle" fill="#a78bfa" fontSize="8">QWP</text>

                {/* Combiner / BS */}
                <g transform="translate(450, 115) rotate(-45)">
                  <rect x="-15" y="-2" width="30" height="4" fill="#94a3b8"/>
                </g>
                <text x="450" y="98" textAnchor="middle" fill="#cbd5e1" fontSize="9">BS</text>
                <text x="450" y="160" textAnchor="middle" fill="#64748b" fontSize="8">간섭 결합</text>

                {/* 결합 신호 */}
                <line x1="280" y1="115" x2="440" y2="115" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3,2" opacity="0.7"/>
                <line x1="450" y1="115" x2="550" y2="115" stroke="#fbbf24" strokeWidth="2" className="glow-amber"/>
                
                {/* Polarizer */}
                <rect x="555" y="100" width="6" height="30" fill="#22d3ee" opacity="0.6"/>
                <text x="558" y="95" textAnchor="middle" fill="#22d3ee" fontSize="8">P</text>

                {/* 광섬유 출력 */}
                <line x1="565" y1="115" x2="620" y2="115" stroke="#fbbf24" strokeWidth="2" className="glow-amber"/>
                <rect x="620" y="100" width="60" height="30" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" rx="3"/>
                <text x="650" y="118" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">Fiber Out</text>

                {/* 검출기 */}
                <line x1="680" y1="115" x2="730" y2="115" stroke="#a78bfa" strokeWidth="2"/>
                <rect x="730" y="95" width="50" height="40" fill="#0f172a" stroke="#a78bfa" strokeWidth="2" rx="4"/>
                <text x="755" y="115" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold">PD</text>
                <text x="755" y="128" textAnchor="middle" fill="#94a3b8" fontSize="8">검출기</text>

                {/* 신호 처리 */}
                <rect x="600" y="200" width="180" height="60" fill="#0f172a" stroke="#4ade80" strokeWidth="2" rx="4"/>
                <text x="690" y="220" textAnchor="middle" fill="#4ade80" fontSize="10" fontWeight="bold">Phase Meter</text>
                <text x="690" y="235" textAnchor="middle" fill="#94a3b8" fontSize="9">FPGA · Phase-Locked Loop</text>
                <text x="690" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">→ 위치값 (20 kHz)</text>

                {/* 참조 신호 */}
                <rect x="20" y="200" width="60" height="40" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" rx="4"/>
                <text x="50" y="220" textAnchor="middle" fill="#22d3ee" fontSize="9" fontWeight="bold">Ref PD</text>
                <text x="50" y="232" textAnchor="middle" fill="#94a3b8" fontSize="8">f₂ - f₁</text>
                <line x1="80" y1="220" x2="600" y2="230" stroke="#64748b" strokeWidth="1" strokeDasharray="3,2"/>
              </svg>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-950/60 border border-cyan-900/30 rounded-lg p-4">
                  <div className="text-cyan-400 font-semibold mb-2">핵심 컴포넌트</div>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div><span className="text-amber-400">PBS</span>: 편광 빔스플리터, f₁/f₂를 편광으로 분리</div>
                    <div><span className="text-amber-400">QWP</span>: 1/4 파장판, 직선 → 원편광 변환</div>
                    <div><span className="text-amber-400">Grating</span>: 입사빔을 ±1차로 회절</div>
                    <div><span className="text-amber-400">BS Combiner</span>: 두 회절빔을 다시 간섭시킴</div>
                    <div><span className="text-amber-400">Polarizer</span>: 결합된 빔의 편광 정렬</div>
                    <div><span className="text-amber-400">PD</span>: 광검출기, 비트 신호 → 전기신호</div>
                  </div>
                </div>
                <div className="bg-slate-950/60 border border-cyan-900/30 rounded-lg p-4">
                  <div className="text-cyan-400 font-semibold mb-2">Spatially Separated 의 핵심</div>
                  <div className="text-xs text-slate-300 leading-relaxed">
                    초기 헤테로다인은 f₁, f₂가 같은 광학 경로를 따라가서 (coaxial) PBS 누설로 인한 주기적 비선형 오차가 컸습니다.
                    <span className="text-amber-400 font-semibold"> 공간 분리(spatially separated) 설계</span>는 f₁과 f₂를 물리적으로 다른 경로로 보내서
                    PBS 크로스토크 없이 결합 직전에만 만나도록 했습니다. 
                    이로 인해 주기적 비선형 오차가 수십 pm 수준으로 감소했습니다.
                  </div>
                </div>
              </div>
            </div>

            {/* Littrow 구성 */}
            <div className="bg-slate-900/60 border border-amber-800/40 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">📐 Littrow 구성: 입사각 = 회절각</h3>
              <p className="text-sm text-slate-300 mb-4">
                Littrow 구성은 회절각이 입사각과 같아지는 특수 조건입니다. 입사빔과 -1차 회절빔이 같은 경로로 되돌아와서, 신호 강도가 최대화되고 컴팩트한 설계가 가능합니다.
              </p>

              <svg viewBox="0 0 800 320" className="w-full bg-slate-950 rounded-lg border border-slate-800">
                {/* 일반 회절 (좌측) */}
                <text x="200" y="30" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">일반 회절 (Non-Littrow)</text>
                <line x1="200" y1="50" x2="200" y2="200" stroke="#22d3ee" strokeWidth="2"/>
                <text x="180" y="130" fill="#22d3ee" fontSize="10">입사</text>
                <rect x="100" y="200" width="200" height="20" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5"/>
                {Array.from({length: 20}, (_, i) => (
                  <rect key={i} x={100 + i * 10} y="200" width="5" height="20" fill="#fbbf24" opacity="0.7"/>
                ))}
                <line x1="200" y1="200" x2="120" y2="80" stroke="#f472b6" strokeWidth="2"/>
                <line x1="200" y1="200" x2="280" y2="80" stroke="#a78bfa" strokeWidth="2"/>
                <text x="110" y="80" fill="#f472b6" fontSize="10">+1차</text>
                <text x="290" y="80" fill="#a78bfa" fontSize="10">-1차</text>
                <text x="200" y="265" textAnchor="middle" fill="#64748b" fontSize="10">θᵢ ≠ θₘ</text>
                <text x="200" y="280" textAnchor="middle" fill="#64748b" fontSize="9">광학계가 커지고 정렬 어려움</text>

                {/* Littrow (우측) */}
                <text x="600" y="30" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">Littrow 구성</text>
                <line x1="500" y1="80" x2="600" y2="200" stroke="#22d3ee" strokeWidth="2.5" className="glow-cyan"/>
                <text x="490" y="80" fill="#22d3ee" fontSize="10">입사</text>
                <rect x="500" y="200" width="200" height="20" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5"/>
                {Array.from({length: 20}, (_, i) => (
                  <rect key={i} x={500 + i * 10} y="200" width="5" height="20" fill="#fbbf24" opacity="0.7"/>
                ))}
                {/* -1차가 입사 경로로 되돌아옴 */}
                <line x1="600" y1="200" x2="500" y2="80" stroke="#a78bfa" strokeWidth="2" strokeDasharray="4,3" className="glow-violet"/>
                <text x="490" y="100" fill="#a78bfa" fontSize="10">-1차 반사</text>
                <text x="490" y="113" fill="#94a3b8" fontSize="9">(같은 경로)</text>
                <line x1="600" y1="200" x2="700" y2="80" stroke="#f472b6" strokeWidth="2" opacity="0.4"/>
                <text x="700" y="80" fill="#f472b6" fontSize="10" opacity="0.5">+1차</text>
                <text x="600" y="265" textAnchor="middle" fill="#fbbf24" fontSize="10">θᵢ = θ₋₁ (Λ·sin θ = λ/2)</text>
                <text x="600" y="280" textAnchor="middle" fill="#fbbf24" fontSize="9">컴팩트, 회절 효율 최대 (~98%)</text>
              </svg>

              <p className="text-xs text-slate-500 mt-4">
                💡 ASML 격자 인코더는 대부분 Littrow 또는 변형 Littrow 구성. 격자 피치(Λ)와 파장(λ)을 선택할 때 Λ ≈ λ가 되도록 설계됨 (예: λ=780nm, Λ=1μm).
              </p>
            </div>
          </div>
        )}

        {/* 섹션 3: 6-DOF 측정 */}
        {activeSection === '6dof' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-violet-950/30 to-slate-900/60 border border-violet-800/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-3 text-violet-400">🎯 6-DOF 동시 측정: 어떻게 단일 격자로 6축을 잡는가</h2>
              <p className="text-slate-300 leading-relaxed">
                웨이퍼 스테이지의 위치를 정확히 알려면 3개의 병진(X, Y, Z) + 3개의 회전(Rx, Ry, Rz) = 총 6자유도가 필요합니다.
                격자 인코더는 <span className="text-violet-400 font-semibold">4개의 측정 헤드를 스테이지 4 코너에 배치</span>하여 과결정(over-determined) 시스템을 만들고,
                기하학적 변환으로 6-DOF를 계산합니다.
              </p>
            </div>

            {/* 6-DOF 시각화 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-violet-400">📐 4-Head 배치와 6-DOF 측정 원리</h3>

              <svg viewBox="0 0 800 420" className="w-full bg-slate-950 rounded-lg border border-slate-800">
                {/* 웨이퍼 스테이지 격자 (위에서 본 그림) */}
                <rect x="200" y="100" width="400" height="250" fill="#0f172a" stroke="#fbbf24" strokeWidth="2"/>
                <pattern id="grating2d" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect x="0" y="0" width="2" height="20" fill="#fbbf24" opacity="0.4"/>
                  <rect x="0" y="0" width="20" height="2" fill="#fbbf24" opacity="0.4"/>
                </pattern>
                <rect x="200" y="100" width="400" height="250" fill="url(#grating2d)"/>
                <text x="400" y="225" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="bold">2D Grating</text>
                <text x="400" y="245" textAnchor="middle" fill="#94a3b8" fontSize="10">웨이퍼 스테이지 (위에서 본 그림)</text>

                {/* 4개의 Encoder Head */}
                {[
                  { x: 200, y: 100, label: 'H1', dx: -20, dy: -20 },
                  { x: 600, y: 100, label: 'H2', dx: 20, dy: -20 },
                  { x: 200, y: 350, label: 'H3', dx: -20, dy: 20 },
                  { x: 600, y: 350, label: 'H4', dx: 20, dy: 20 },
                ].map((h, i) => (
                  <g key={i}>
                    <circle cx={h.x + h.dx} cy={h.y + h.dy} r="18" fill="#0f172a" stroke="#a78bfa" strokeWidth="2"/>
                    <text x={h.x + h.dx} y={h.y + h.dy + 4} textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="bold">{h.label}</text>
                    <line x1={h.x + h.dx + (h.dx > 0 ? -15 : 15)} y1={h.y + h.dy + (h.dy > 0 ? -15 : 15)} x2={h.x} y2={h.y} stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3,2"/>
                  </g>
                ))}

                {/* 측정 축 라벨 */}
                <line x1="350" y1="225" x2="450" y2="225" stroke="#22d3ee" strokeWidth="2" markerEnd="url(#arrow)"/>
                <text x="460" y="230" fill="#22d3ee" fontSize="12" fontWeight="bold">X</text>
                <line x1="400" y1="275" x2="400" y2="175" stroke="#f472b6" strokeWidth="2" markerEnd="url(#arrow2)"/>
                <text x="395" y="170" fill="#f472b6" fontSize="12" fontWeight="bold">Y</text>
                
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L0,10 L10,5 z" fill="#22d3ee"/>
                  </marker>
                  <marker id="arrow2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                    <path d="M0,0 L0,10 L10,5 z" fill="#f472b6"/>
                  </marker>
                </defs>

                {/* 측정값 표 */}
                <rect x="50" y="30" width="280" height="50" fill="#0f172a" stroke="#475569" rx="4"/>
                <text x="60" y="48" fill="#94a3b8" fontSize="10">각 헤드가 측정하는 값:</text>
                <text x="60" y="62" fill="#22d3ee" fontSize="11" fontFamily="monospace">H1: (x1, y1, z1)</text>
                <text x="180" y="62" fill="#22d3ee" fontSize="11" fontFamily="monospace">H2: (x2, y2, z2)</text>
                <text x="60" y="76" fill="#22d3ee" fontSize="11" fontFamily="monospace">H3: (x3, y3, z3)</text>
                <text x="180" y="76" fill="#22d3ee" fontSize="11" fontFamily="monospace">H4: (x4, y4, z4)</text>

                {/* 변환 식 */}
                <rect x="470" y="30" width="290" height="50" fill="#0f172a" stroke="#a78bfa" rx="4"/>
                <text x="480" y="48" fill="#a78bfa" fontSize="10" fontWeight="bold">6-DOF 변환:</text>
                <text x="480" y="62" fill="#fbbf24" fontSize="10" fontFamily="monospace">X = (x1+x2+x3+x4)/4</text>
                <text x="480" y="74" fill="#fbbf24" fontSize="10" fontFamily="monospace">Rz = (y2-y1+y4-y3)/(2·d)</text>

                {/* 회전 표시 */}
                <path d="M 400 380 A 30 10 0 0 1 430 390" fill="none" stroke="#4ade80" strokeWidth="2"/>
                <polygon points="430,390 427,386 432,385" fill="#4ade80"/>
                <text x="445" y="395" fill="#4ade80" fontSize="10">Rz (yaw)</text>
              </svg>
            </div>

            {/* 6-DOF 사양 표 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">📋 ASML 노광기 6-DOF 측정 사양 (대표값)</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="text-left py-3 px-2 text-slate-400 text-xs">자유도</th>
                      <th className="text-left py-3 px-2 text-slate-400 text-xs">측정 범위</th>
                      <th className="text-left py-3 px-2 text-slate-400 text-xs">분해능 (nm/nrad)</th>
                      <th className="text-left py-3 px-2 text-slate-400 text-xs">측정 방식</th>
                      <th className="text-left py-3 px-2 text-slate-400 text-xs">관련 헤드</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 px-2 text-cyan-400 font-bold">X (병진)</td>
                      <td className="py-3 px-2 text-sm">300 mm</td>
                      <td className="py-3 px-2 text-sm">0.22 nm</td>
                      <td className="py-3 px-2 text-sm">In-plane 회절 (X 격자)</td>
                      <td className="py-3 px-2 text-sm">H1~H4 평균</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 px-2 text-pink-400 font-bold">Y (병진)</td>
                      <td className="py-3 px-2 text-sm">300 mm</td>
                      <td className="py-3 px-2 text-sm">0.22 nm</td>
                      <td className="py-3 px-2 text-sm">In-plane 회절 (Y 격자)</td>
                      <td className="py-3 px-2 text-sm">H1~H4 평균</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 px-2 text-violet-400 font-bold">Z (병진)</td>
                      <td className="py-3 px-2 text-sm">300~500 μm</td>
                      <td className="py-3 px-2 text-sm">0.5 nm</td>
                      <td className="py-3 px-2 text-sm">Out-of-plane (Michelson-type)</td>
                      <td className="py-3 px-2 text-sm">4개 헤드 평균</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 px-2 text-green-400 font-bold">Rx (회전)</td>
                      <td className="py-3 px-2 text-sm">±1.5 mrad</td>
                      <td className="py-3 px-2 text-sm">50 nrad</td>
                      <td className="py-3 px-2 text-sm">Z 차이 (Y축 기준)</td>
                      <td className="py-3 px-2 text-sm">(H1+H2) - (H3+H4)</td>
                    </tr>
                    <tr className="border-b border-slate-800/50">
                      <td className="py-3 px-2 text-amber-400 font-bold">Ry (회전)</td>
                      <td className="py-3 px-2 text-sm">±1.5 mrad</td>
                      <td className="py-3 px-2 text-sm">50 nrad</td>
                      <td className="py-3 px-2 text-sm">Z 차이 (X축 기준)</td>
                      <td className="py-3 px-2 text-sm">(H2+H4) - (H1+H3)</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 text-red-400 font-bold">Rz (yaw)</td>
                      <td className="py-3 px-2 text-sm">±1.5 mrad</td>
                      <td className="py-3 px-2 text-sm">30 nrad</td>
                      <td className="py-3 px-2 text-sm">X·Y in-plane 차이</td>
                      <td className="py-3 px-2 text-sm">4 헤드 cross-product</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Long/Short Stroke 설명 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3 text-cyan-400">📏 Long Stroke (In-plane, X·Y)</h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• 격자 평면 위에서 이동 → 회절 빔의 위상 변화 측정</li>
                  <li>• 측정 범위: 300mm (300mm 웨이퍼 노광 영역 커버)</li>
                  <li>• 분해능: 0.22 nm (3σ)</li>
                  <li>• 격자 피치 분할 방식으로 절대위치 트래킹</li>
                  <li>• 스테이지가 매우 빠르게 움직여도(>1m/s) 신호 유지</li>
                </ul>
              </div>
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-3 text-pink-400">📐 Short Stroke (Out-of-plane, Z)</h3>
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• 격자 표면과 헤드 사이의 수직 거리 측정</li>
                  <li>• Michelson-type 간섭계 원리 활용</li>
                  <li>• 측정 범위: 300~500μm (포커싱용)</li>
                  <li>• 분해능: 0.5 nm 수준</li>
                  <li>• 노광 중 웨이퍼 평탄도 보정 (Focus tracking)</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 섹션 4: 오차 원인 */}
        {activeSection === 'errors' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-red-950/30 to-slate-900/60 border border-red-800/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-3 text-red-400">⚠️ 오차 원인 분석: nm 단위에서 보이는 모든 것들</h2>
              <p className="text-slate-300 leading-relaxed">
                Sub-nm 측정에서는 모든 것이 오차원이 됩니다. 격자 인코더의 주요 오차 원인을 정량적으로 분석하고, 
                각각이 overlay 성능에 어떻게 영향을 주는지 파악하는 것이 영민님의 현장 트러블슈팅에 핵심입니다.
              </p>
            </div>

            {/* 오차 버짓 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-red-400">📊 오차 버짓 (Error Budget)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={errorBudget}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }}/>
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} label={{ value: '오차 (pm)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}/>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}/>
                  <Bar dataKey="value">
                    {errorBudget.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color}/>
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                {errorBudget.map((err, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm">
                    <div className="w-3 h-3 rounded" style={{ backgroundColor: err.color }}></div>
                    <span className="text-slate-300 font-medium">{err.name}:</span>
                    <span className="text-slate-400 text-xs">{err.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 오차 카드들 */}
            <div className="space-y-4">
              <div className="bg-slate-900/60 border-l-4 border-red-500 rounded p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">1️⃣</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-red-400 font-bold text-lg">주기적 비선형 오차 (Periodic Nonlinearity)</div>
                      <div className="text-xs bg-red-900/40 px-2 py-1 rounded">30~300 pm</div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-red-400 font-semibold">원인:</span> PBS에서 편광 분리가 완벽하지 않아 f₁ 신호가 f₂ 경로로 (혹은 그 반대로) 약간 누설됩니다. 이 누설이 격자 이동 주기(Λ/2)에 따라 사인파 형태로 더해지는 시스템적 오차입니다.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-red-400 font-semibold">크기:</span> 일반 PBS는 30 dB(0.1%) 누설 → ~λ/2048 ≈ 300 pm 오차. 고품질 PBS + Spatially separated 설계로 30 pm 이하 가능. 차세대 디퍼렌셜 헤테로다인 격자 인코더는 추가 보정 없이 30 pm 이하 주기적 비선형성을 보여주며 1시간 동안 100 pm 안정도를 달성했습니다.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="text-red-400 font-semibold">대응:</span> Spatially separated heterodyne 설계로 f₁, f₂를 광학적으로 분리. 잔여 오차는 calibration table로 보상.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border-l-4 border-orange-500 rounded p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">2️⃣</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-orange-400 font-bold text-lg">Abbe 오차 (회전-병진 결합)</div>
                      <div className="text-xs bg-orange-900/40 px-2 py-1 rounded">10~500 pm</div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-orange-400 font-semibold">원인:</span> 측정 빔 축과 실제 측정하려는 점(웨이퍼 위) 사이에 거리(Abbe arm)가 있을 때, 스테이지가 약간 기울어지면 측정값에 추가 오차가 발생합니다.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-orange-400 font-semibold">크기:</span> Abbe 오차 = arm × tan(θ). Arm이 1cm이고 회전이 1μrad이면 10 nm 오차 발생.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="text-orange-400 font-semibold">대응:</span> 다이렉트 입사 광경로 설계로 Abbe arm 최소화. ASML 특허에는 2차 회절 격자를 이용한 두 측정 데이터의 Abbe 오차가 서로 보상되도록 광경로와 스펙트럼을 정의해 전체 Abbe 오차를 감소시키거나 제거하는 방법이 있습니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border-l-4 border-yellow-500 rounded p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">3️⃣</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-yellow-400 font-bold text-lg">격자 제조 오차 (Grating Imperfections)</div>
                      <div className="text-xs bg-yellow-900/40 px-2 py-1 rounded">10~1000 pm</div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-yellow-400 font-semibold">원인:</span> 격자 피치(Λ)가 위치에 따라 미세하게 변하거나, 격자 라인이 완전히 직선이 아니거나, 표면이 평탄하지 않음.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-yellow-400 font-semibold">크기:</span> 일반 홀로그래픽 격자: 피치 변동 ~10 ppm → 300mm 위에서 3μm 오차(!). 정밀 격자: ~0.1 ppm → 30 nm. 최첨단 격자: ~0.01 ppm → 3 nm.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="text-yellow-400 font-semibold">대응:</span> Laser Interference Lithography(LIL)로 제작된 고정밀 격자 사용. <span className="text-yellow-400">In-situ self-calibration</span>: 두 스테이지의 상대 위치를 활용한 격자 오차 맵 작성 (ASML의 비밀 sauce 중 하나).
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border-l-4 border-blue-500 rounded p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">4️⃣</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-blue-400 font-bold text-lg">온도 드리프트 (Thermal Drift)</div>
                      <div className="text-xs bg-blue-900/40 px-2 py-1 rounded">100~5000 pm</div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-blue-400 font-semibold">원인:</span> 격자, 광학 부품, 헤드 마운트의 열팽창. 격자 재질(보통 Zerodur 또는 ULE 글라스) CTE: ~10⁻⁷/°C. 그래도 300mm × 0.01°C × 10⁻⁷ = 0.3 nm.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="text-blue-400 font-semibold">대응:</span> Zerodur/ULE/Cordierite 같은 ultra-low CTE 재질 사용. 챔버 온도 ±0.001°C 제어. 광경로 짧게 (15mm) 유지. 차세대 헤테로다인 격자 인코더는 Zerodur 같은 저열팽창 재질을 광학 vessel에 사용하고 챔버 안의 모든 광학 부품이 같은 온도장에 노출되도록 설계합니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border-l-4 border-violet-500 rounded p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">5️⃣</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-violet-400 font-bold text-lg">신호 보간 오차 (Interpolation Error)</div>
                      <div className="text-xs bg-violet-900/40 px-2 py-1 rounded">±1~15 nm</div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-violet-400 font-semibold">원인:</span> AD 변환기의 비선형, 광학 부품의 불완전성, 신호 처리 시스템의 비선형성. 보간 오차는 한 신호 주기 내의 분할(subdivision) 과정에서 발생합니다.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="text-violet-400 font-semibold">대응:</span> 고해상도 ADC(16-bit 이상), DSP 기반 phase-locked loop, FPGA 실시간 처리. 일반적으로 X-방향 보간 오차는 ±1 nm 수준, Z-방향은 ±15 nm 수준이며 정밀 정렬과 보정 알고리즘으로 감소시킵니다.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border-l-4 border-pink-500 rounded p-5">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">6️⃣</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-pink-400 font-bold text-lg">크로스토크 (Crosstalk)</div>
                      <div className="text-xs bg-pink-900/40 px-2 py-1 rounded">±3~14 nm</div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed mb-2">
                      <span className="text-pink-400 font-semibold">원인:</span> X축 측정 신호가 Y나 Z 채널로 누설되는 현상. 광학적/기하학적 misalignment, 광학 부품 결함, 회전-병진 결합으로 발생.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      <span className="text-pink-400 font-semibold">대응:</span> 선형 성분은 정확한 정렬과 보상 프로세스로 감소시킬 수 있고, 비선형(주기적) 크로스토크 성분은 X/Z 측정 시 각각 약 3 nm와 13 nm 수준으로 관찰됩니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 섹션 5: ASML 구현 */}
        {activeSection === 'asml' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-950/30 to-slate-900/60 border border-pink-800/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-3 text-pink-400">🏭 ASML의 실제 구현: NXT부터 EUV NXE까지</h2>
              <p className="text-slate-300 leading-relaxed">
                ASML이 헤테로다인 격자 인코더를 노광기에 도입한 것은 NXT:1950i (2009)이었고, 이후 NXT:2000i, NXT:2100i를 거쳐 EUV NXE:3400, NXE:3600D, 그리고 최신 High-NA NXE:5000으로 이어지며 격자 인코더가 표준이 되었습니다.
              </p>
            </div>

            {/* 환경 민감도 비교 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">🌡️ 환경 민감도: 레이저 간섭계 vs 격자 인코더</h3>
              <p className="text-sm text-slate-400 mb-4">동일 환경 변화에 대해 두 시스템이 받는 오차를 정량 비교</p>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={sensitivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 10 }}/>
                  <YAxis stroke="#64748b" tick={{ fontSize: 10 }} label={{ value: '유발 오차 (pm)', angle: -90, position: 'insideLeft', fill: '#94a3b8' }}/>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}/>
                  <Legend wrapperStyle={{ fontSize: '11px' }}/>
                  <Bar dataKey="laser" fill="#ef4444" name="레이저 간섭계"/>
                  <Bar dataKey="grating" fill="#fbbf24" name="격자 인코더"/>
                </BarChart>
              </ResponsiveContainer>
              <p className="text-xs text-slate-500 mt-2">💡 격자 인코더는 짧은 광로(~15mm)와 격자 기반 길이 기준으로 환경 변화에 ~50배 둔감합니다.</p>
            </div>

            {/* 레이더 차트 비교 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-cyan-400">📡 종합 성능 비교</h3>
              <ResponsiveContainer width="100%" height={350}>
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#334155"/>
                  <PolarAngleAxis dataKey="metric" tick={{ fill: '#94a3b8', fontSize: 11 }}/>
                  <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 9 }}/>
                  <Radar name="레이저 간섭계" dataKey="laser" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3}/>
                  <Radar name="격자 인코더" dataKey="grating" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.3}/>
                  <Legend wrapperStyle={{ fontSize: '12px' }}/>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155' }}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* ASML 진화 타임라인 */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-violet-400">📅 ASML 노광기에서의 격자 인코더 진화</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-cyan-900/40 border border-cyan-700/50 px-3 py-1 rounded text-xs text-cyan-300 font-bold whitespace-nowrap">2009</div>
                  <div className="flex-1">
                    <div className="text-cyan-400 font-semibold text-sm">NXT:1950i</div>
                    <div className="text-xs text-slate-400">최초로 격자 인코더 기반 스테이지 측정 시스템 도입. 175 wph throughput에서 2.5 nm overlay 달성. 32/22 nm 노드 진입.</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-amber-900/40 border border-amber-700/50 px-3 py-1 rounded text-xs text-amber-300 font-bold whitespace-nowrap">2013</div>
                  <div className="flex-1">
                    <div className="text-amber-400 font-semibold text-sm">NXT:1980i, NXT:2000i</div>
                    <div className="text-xs text-slate-400">개선된 격자 인코더 + dual stage. 1.6 nm overlay, 250 wph. 16/14 nm 노드 지원.</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-pink-900/40 border border-pink-700/50 px-3 py-1 rounded text-xs text-pink-300 font-bold whitespace-nowrap">2018</div>
                  <div className="flex-1">
                    <div className="text-pink-400 font-semibold text-sm">EUV NXE:3400B</div>
                    <div className="text-xs text-slate-400">EUV 시대 진입. 진공 챔버에 격자 인코더 적용. 7nm/5nm 노드 양산.</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-violet-900/40 border border-violet-700/50 px-3 py-1 rounded text-xs text-violet-300 font-bold whitespace-nowrap">2022</div>
                  <div className="flex-1">
                    <div className="text-violet-400 font-semibold text-sm">EUV NXE:3600D / NXE:3800E</div>
                    <div className="text-xs text-slate-400">개선된 격자 인코더로 3/5nm 양산 지원. 160 wph EUV. 1.1 nm overlay.</div>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="bg-green-900/40 border border-green-700/50 px-3 py-1 rounded text-xs text-green-300 font-bold whitespace-nowrap">2024~</div>
                  <div className="flex-1">
                    <div className="text-green-400 font-semibold text-sm">High-NA EUV (NXE:5000)</div>
                    <div className="text-xs text-slate-400">0.55 NA 시대. 더 작은 스테이지(half-field), 더 빠른 가속, 더 정밀한 6-DOF 격자 인코더 필요. Zero dead-zone 디자인 도입.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 공급망 */}
            <div className="bg-slate-900/60 border border-amber-800/40 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-amber-400">🏗️ ASML 격자 인코더 공급망 (영민님 투자 관점)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950/60 rounded-lg p-4">
                  <div className="text-amber-400 font-semibold mb-2">주요 공급사</div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li>• <span className="text-amber-400 font-semibold">Heidenhain</span> (독일, 비상장): 인코더 헤드 모듈 주요 공급. 정밀계측 글로벌 1위.</li>
                    <li>• <span className="text-amber-400 font-semibold">Zygo</span> (미국, Ametek 자회사): IPRO, ATHENA 시리즈. 광학 설계 IP.</li>
                    <li>• <span className="text-amber-400 font-semibold">Renishaw</span> (영국, RSW.L): 인코더 + 캘리브레이션 시스템.</li>
                    <li>• <span className="text-amber-400 font-semibold">Magnescale</span> (소니 그룹): 일본 정밀스테이지에 주로 공급.</li>
                  </ul>
                </div>
                <div className="bg-slate-950/60 rounded-lg p-4">
                  <div className="text-amber-400 font-semibold mb-2">격자 제조</div>
                  <ul className="text-xs text-slate-300 space-y-2">
                    <li>• <span className="text-amber-400 font-semibold">Schott / Zerodur</span>: 격자 기판 재료 공급 (저열팽창 글라스).</li>
                    <li>• <span className="text-amber-400 font-semibold">Carl Zeiss SMT</span>: ASML 자매기업, 광학계 종합 솔루션.</li>
                    <li>• <span className="text-amber-400 font-semibold">HORIBA / Inprentus</span>: 정밀 회절 격자 제조.</li>
                    <li>• <span className="text-amber-400 font-semibold">KRISS / NIST</span>: 격자 표준 보정.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-4 bg-amber-950/20 border-l-4 border-amber-500 rounded">
                <div className="text-amber-400 text-sm font-semibold mb-1">💡 투자 관점 인사이트</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  격자 인코더 시장은 독일·미국·영국·일본의 정밀계측 전문기업이 과점하는 시장입니다. 
                  한국에는 직접 경쟁자가 없으나, <span className="text-amber-400">삼성전자·SK하이닉스</span>가 ASML 노광기를 통해 간접적으로 이 기술의 최대 수혜자입니다. 
                  반도체 노광기 가격이 상승할수록(EUV 2~3억 달러, High-NA 4억 달러) 격자 인코더 시장도 함께 커집니다. 
                  Renishaw는 상장사이므로 투자 가능하지만 정밀계측 전체 매출에서 반도체 비중은 일부에 불과합니다.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 섹션 6: 현장 트러블슈팅 */}
        {activeSection === 'field' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-green-950/30 to-slate-900/60 border border-green-800/40 rounded-xl p-6">
              <h2 className="text-2xl font-bold mb-3 text-green-400">🔧 현장 트러블슈팅 가이드 (포토 공정 엔지니어 관점)</h2>
              <p className="text-slate-300 leading-relaxed">
                영민님이 ASML 노광기에서 실제로 마주칠 수 있는 격자 인코더 관련 이슈와 대응 방법입니다. 
                레이저 간섭계 시절의 트러블슈팅 패턴과는 완전히 다르므로 별도의 직관이 필요합니다.
              </p>
            </div>

            {/* 증상별 트러블슈팅 */}
            <div className="space-y-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🚨</div>
                  <div className="text-red-400 font-bold">증상 1: Overlay 측정값이 갑자기 drift됨</div>
                </div>
                <div className="space-y-2 text-sm text-slate-300 ml-9">
                  <div>
                    <span className="text-red-400 font-semibold">가능한 원인:</span>
                    <ul className="ml-4 mt-1 text-xs space-y-1 list-disc text-slate-400">
                      <li>격자 표면 오염(파티클, 결로) → 회절 효율 변동</li>
                      <li>인코더 헤드 온도 안정화 실패</li>
                      <li>광섬유 connector 열화 (광 강도 변화)</li>
                      <li>스테이지 클램핑 헐거워짐 → Abbe arm 증가</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold">대응:</span>
                    <ul className="ml-4 mt-1 text-xs space-y-1 list-disc text-slate-400">
                      <li>Stage diagnostics → Signal strength per head 체크 (H1~H4 중 어느 헤드가 낮은가)</li>
                      <li>격자 표면 cleanliness 인스펙션 (UV 검사)</li>
                      <li>인코더 시스템 self-calibration 절차 실행</li>
                      <li>온도 챔버 안정성 로그 확인 (±1mK 초과 여부)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">⚠️</div>
                  <div className="text-orange-400 font-bold">증상 2: 특정 위치에서만 위치 오차가 큼 (Field-specific error)</div>
                </div>
                <div className="space-y-2 text-sm text-slate-300 ml-9">
                  <div>
                    <span className="text-orange-400 font-semibold">가능한 원인:</span>
                    <ul className="ml-4 mt-1 text-xs space-y-1 list-disc text-slate-400">
                      <li>격자의 특정 영역에 스크래치 또는 결함</li>
                      <li>격자 기판의 국소 평탄도 이슈</li>
                      <li>특정 가속 패턴에서만 발생하는 dynamic 오차</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold">대응:</span>
                    <ul className="ml-4 mt-1 text-xs space-y-1 list-disc text-slate-400">
                      <li>Grating mapping (격자 전체 영역 calibration)</li>
                      <li>InterField/IntraField 분리 분석</li>
                      <li>스테이지 가속 프로파일 검토 (jerk 감소)</li>
                      <li>심각하면 격자 교체 (ASML SE 호출, 비용 큼)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">🌪️</div>
                  <div className="text-yellow-400 font-bold">증상 3: Stage Servo Error 빈발 (간헐적)</div>
                </div>
                <div className="space-y-2 text-sm text-slate-300 ml-9">
                  <div>
                    <span className="text-yellow-400 font-semibold">가능한 원인:</span>
                    <ul className="ml-4 mt-1 text-xs space-y-1 list-disc text-slate-400">
                      <li>외부 진동 (HVAC, 인접 장비, 공장 vibration)</li>
                      <li>인코더 신호 일시적 dropout (광학 표면 결로)</li>
                      <li>FPGA 신호 처리 latency 변동</li>
                      <li>전원 ground loop noise</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold">대응:</span>
                    <ul className="ml-4 mt-1 text-xs space-y-1 list-disc text-slate-400">
                      <li>Vibration sensor 데이터 확인 (시간상관)</li>
                      <li>CDA(Clean Dry Air) 공급 압력·dew point 체크</li>
                      <li>Encoder signal trace 모니터링 (oscilloscope mode)</li>
                      <li>인접 장비 가동 패턴과의 상관관계 분석</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">📉</div>
                  <div className="text-pink-400 font-bold">증상 4: Wafer-to-Wafer overlay 변동성 증가</div>
                </div>
                <div className="space-y-2 text-sm text-slate-300 ml-9">
                  <div>
                    <span className="text-pink-400 font-semibold">가능한 원인:</span>
                    <ul className="ml-4 mt-1 text-xs space-y-1 list-disc text-slate-400">
                      <li>스테이지 chuck의 wafer clamping 일관성 부족</li>
                      <li>격자 표면에 누적되는 outgassing 막</li>
                      <li>인코더 신호 보간 알고리즘 drift</li>
                      <li>EUV chamber 내부 진공도 변동</li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-green-400 font-semibold">대응:</span>
                    <ul className="ml-4 mt-1 text-xs space-y-1 list-disc text-slate-400">
                      <li>Wafer load/clamp 시퀀스 로그 분석</li>
                      <li>Periodic auto-calibration 주기 단축</li>
                      <li>주기적 격자 클리닝 PM 계획 검토</li>
                      <li>Reticle stage encoder 대비 wafer stage 차이 추세 분석</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 핵심 인사이트 */}
            <div className="bg-gradient-to-br from-amber-950/30 to-slate-900/60 border border-amber-800/40 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3 text-amber-400">💡 영민님께 드리는 9년차 시점의 인사이트</h3>
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <div>
                  <span className="text-amber-400 font-semibold">1. 격자 인코더는 "센서"이자 "기준"입니다.</span>{' '}
                  레이저 간섭계 시절에는 측정 기준이 진공 파장(고정값)이었지만, 격자 인코더에서는 <span className="text-amber-400">격자 그 자체가 기준</span>입니다. 
                  격자가 오염되거나 변형되면 "측정값"이 아니라 "기준"이 흔들리는 것이고, 이는 self-calibration으로도 잡기 어렵습니다.
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">2. CDA·온도·진동의 3대 환경관리가 더 critical해졌습니다.</span>{' '}
                  광로가 짧아서 환경 변동에 강한 것은 맞지만, 격자 표면 보호와 헤드 정렬은 오히려 더 민감해졌습니다. 
                  ASML SE가 "격자 매핑(grating mapping)" PM을 강조하는 이유입니다.
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">3. SEMES 같은 OEM 장비에서도 격자 인코더 도입이 가속 중입니다.</span>{' '}
                  Photo cleaner, coater/developer, inspection 장비 등에서도 nm급 스테이지 정밀도가 요구되면서 Heidenhain/Magnescale 인코더 사용이 늘고 있습니다. 
                  영민님이 다루시는 TEL, KLA 장비도 동일 추세.
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">4. High-NA EUV 시대의 새로운 도전.</span>{' '}
                  스테이지가 작아지고(half-field) 가속도가 더 커지면서, 격자 인코더 헤드 수·배치·신호처리 모두 재설계 진행 중. 
                  Zero dead-zone, 3-DOF/head 같은 차세대 격자 인코더 개념이 NXE:5000 양산기에 적용될 예정.
                </div>
                <div>
                  <span className="text-amber-400 font-semibold">5. 투자 테제와의 연결.</span>{' '}
                  ASML이 노광기 가격을 EUV → High-NA로 2배 올리는 이유 중 하나가 이런 측정 시스템의 정밀도 향상입니다. 
                  "Silicon Value" 관점에서 ASML의 해자(moat)는 단순히 광학뿐 아니라 이런 "마이크로 측정 정밀도" 통합 능력에 있습니다. 
                  격자 인코더 IP·공급망은 ASML이 직접 보유·통제하는 핵심 자산.
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-8 pt-6 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500">
            Heterodyne Grating Encoder Deep Dive · 광학 원리부터 ASML 트러블슈팅까지 · 
            <span className="text-slate-400 ml-1">함영민님을 위해 제작 (포토 공정 9년차 컨텍스트)</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
