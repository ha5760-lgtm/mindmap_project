import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ComposedChart } from 'recharts';

const KOREAN_FONT = "'Pretendard', 'Noto Sans KR', -apple-system, BlinkMacSystemFont, system-ui, sans-serif";

const tooltipStyle = {
  backgroundColor: '#0f172a',
  border: '1px solid #334155',
  borderRadius: '8px',
  fontFamily: KOREAN_FONT,
  fontSize: '12px',
  color: '#e2e8f0'
};
const legendStyle = { fontFamily: KOREAN_FONT, fontSize: '12px', color: '#cbd5e1' };
const axisStyle = { fontFamily: KOREAN_FONT, fontSize: '11px', fill: '#94a3b8' };

const COLORS = {
  tsmc: '#ef4444',
  samsung: '#3b82f6',
  intel: '#22d3ee',
  smic: '#a78bfa',
  others: '#64748b',
  accent1: '#f59e0b',
  accent2: '#10b981',
  accent3: '#ec4899',
  accent4: '#8b5cf6'
};

const revenueData = [
  { year: '2018', tsmc: 34.2, samsung: 11.0, intel: 0 },
  { year: '2019', tsmc: 34.6, samsung: 13.5, intel: 0 },
  { year: '2020', tsmc: 45.5, samsung: 16.5, intel: 0 },
  { year: '2021', tsmc: 56.8, samsung: 18.9, intel: 0 },
  { year: '2022', tsmc: 75.9, samsung: 20.0, intel: 0 },
  { year: '2023', tsmc: 69.3, samsung: 14.7, intel: 18.9 },
  { year: '2024', tsmc: 90.0, samsung: 14.5, intel: 17.5 },
  { year: '2025', tsmc: 122.4, samsung: 14.0, intel: 18.2 },
  { year: '2026E', tsmc: 152, samsung: 18, intel: 21 },
  { year: '2027E', tsmc: 178, samsung: 24, intel: 26 },
  { year: '2028E', tsmc: 205, samsung: 30, intel: 32 },
  { year: '2030E', tsmc: 260, samsung: 42, intel: 45 }
];

const marketShareData = [
  { name: 'TSMC', value: 71.0, color: COLORS.tsmc },
  { name: 'Samsung Foundry', value: 6.8, color: COLORS.samsung },
  { name: 'SMIC', value: 5.1, color: COLORS.smic },
  { name: 'UMC', value: 4.2, color: '#f97316' },
  { name: 'GlobalFoundries', value: 3.6, color: '#84cc16' },
  { name: 'HuaHong', value: 2.6, color: '#06b6d4' },
  { name: 'Others', value: 6.7, color: COLORS.others }
];

const operatingMarginData = [
  { quarter: '4Q23', tsmc: 41.6, samsung: -15, intel: -28 },
  { quarter: '1Q24', tsmc: 42.0, samsung: -18, intel: -56 },
  { quarter: '2Q24', tsmc: 42.5, samsung: -12, intel: -65 },
  { quarter: '3Q24', tsmc: 47.5, samsung: -14, intel: -136 },
  { quarter: '4Q24', tsmc: 49.0, samsung: -16, intel: -54 },
  { quarter: '1Q25', tsmc: 48.5, samsung: -20, intel: -50 },
  { quarter: '2Q25', tsmc: 49.6, samsung: -18, intel: -42 },
  { quarter: '3Q25', tsmc: 50.6, samsung: -14, intel: -38 },
  { quarter: '4Q25', tsmc: 54.0, samsung: -10, intel: -32 }
];

const capexData = [
  { year: '2021', tsmc: 30.0, samsung: 35.0, intel: 18.7 },
  { year: '2022', tsmc: 36.3, samsung: 35.8, intel: 24.8 },
  { year: '2023', tsmc: 30.4, samsung: 38.0, intel: 25.8 },
  { year: '2024', tsmc: 30.0, samsung: 30.0, intel: 23.9 },
  { year: '2025', tsmc: 42.0, samsung: 22.0, intel: 18.0 },
  { year: '2026E', tsmc: 54.0, samsung: 25.0, intel: 21.0 }
];

const nodeRevenueMix2025 = [
  { node: '3nm (N3)', value: 24, color: '#ef4444' },
  { node: '5nm (N5/N4)', value: 36, color: '#f59e0b' },
  { node: '7nm (N7)', value: 14, color: '#eab308' },
  { node: '16/12nm', value: 8, color: '#22c55e' },
  { node: '28nm 이상', value: 18, color: '#06b6d4' }
];

const platformMix = [
  { year: '2020', HPC: 30, Smartphone: 49, IoT: 7, Auto: 4, DCE: 6, Others: 4 },
  { year: '2021', HPC: 39, Smartphone: 44, IoT: 8, Auto: 4, DCE: 3, Others: 2 },
  { year: '2022', HPC: 42, Smartphone: 39, IoT: 9, Auto: 5, DCE: 2, Others: 3 },
  { year: '2023', HPC: 43, Smartphone: 38, IoT: 8, Auto: 6, DCE: 2, Others: 3 },
  { year: '2024', HPC: 51, Smartphone: 35, IoT: 6, Auto: 5, DCE: 1, Others: 2 },
  { year: '2025', HPC: 58, Smartphone: 29, IoT: 5, Auto: 5, DCE: 1, Others: 2 }
];

const cowosData = [
  { year: '2023', capacity: 15 },
  { year: '2024', capacity: 38 },
  { year: '2025', capacity: 75 },
  { year: '2026E', capacity: 130 },
  { year: '2027E', capacity: 180 },
  { year: '2028E', capacity: 230 }
];

const roadmapData = [
  { node: 'N7', year: 2018, density: 100, type: 'FinFET' },
  { node: 'N5', year: 2020, density: 175, type: 'FinFET' },
  { node: 'N3', year: 2022, density: 290, type: 'FinFET' },
  { node: 'N2', year: 2025.5, density: 355, type: 'GAA Nanosheet' },
  { node: 'N2P', year: 2026.5, density: 365, type: 'GAA Nanosheet' },
  { node: 'A16', year: 2027, density: 400, type: 'GAA + BSPDN' },
  { node: 'A14', year: 2028, density: 450, type: 'GAA Gen2 + BSPDN' },
  { node: 'A12', year: 2029, density: 510, type: 'GAA Gen2 + BSPDN' }
];

const moatRadar = [
  { dimension: '공정 기술', tsmc: 95, samsung: 70, intel: 75 },
  { dimension: 'Yield 학습곡선', tsmc: 95, samsung: 55, intel: 50 },
  { dimension: 'IP 생태계 (OIP)', tsmc: 95, samsung: 60, intel: 35 },
  { dimension: '고객 신뢰', tsmc: 98, samsung: 50, intel: 30 },
  { dimension: '패키징 (CoWoS)', tsmc: 95, samsung: 45, intel: 50 },
  { dimension: '자본 효율성', tsmc: 90, samsung: 55, intel: 30 },
  { dimension: '인력 파이프라인', tsmc: 90, samsung: 75, intel: 65 }
];

const customerMix = [
  { name: 'Apple', value: 22, color: '#94a3b8' },
  { name: 'NVIDIA', value: 21, color: '#22c55e' },
  { name: 'Broadcom/기타', value: 11, color: '#a78bfa' },
  { name: 'MediaTek', value: 9, color: '#f59e0b' },
  { name: 'Qualcomm', value: 8, color: '#ef4444' },
  { name: 'AMD', value: 7, color: '#3b82f6' },
  { name: 'Intel', value: 6, color: '#06b6d4' },
  { name: '기타 511개사', value: 16, color: '#64748b' }
];

const fcfRoeData = [
  { year: '2020', fcf: 8.5, roe: 30, oi: 42 },
  { year: '2021', fcf: 6.5, roe: 30, oi: 41 },
  { year: '2022', fcf: 10.0, roe: 39, oi: 49 },
  { year: '2023', fcf: 8.5, roe: 26, oi: 42 },
  { year: '2024', fcf: 27.0, roe: 30, oi: 46 },
  { year: '2025', fcf: 31.0, roe: 35, oi: 51 }
];

const yieldRamp = [
  { month: 'M+0', tsmcN3: 55, samsung3GAE: 15, intel18A: 25 },
  { month: 'M+3', tsmcN3: 65, samsung3GAE: 20, intel18A: 35 },
  { month: 'M+6', tsmcN3: 75, samsung3GAE: 25, intel18A: 45 },
  { month: 'M+9', tsmcN3: 80, samsung3GAE: 30, intel18A: 55 },
  { month: 'M+12', tsmcN3: 85, samsung3GAE: 35, intel18A: 60 },
  { month: 'M+18', tsmcN3: 90, samsung3GAE: 50, intel18A: 65 },
  { month: 'M+24', tsmcN3: 92, samsung3GAE: 60, intel18A: 70 }
];

const scenarioData = [
  { scenario: 'A. TSMC 압도 유지', probability: 55, share2030: 72, color: '#10b981' },
  { scenario: 'B. Intel 18A/14A 부분 성공', probability: 25, share2030: 60, color: '#f59e0b' },
  { scenario: 'C. Samsung SF2P 회복', probability: 12, share2030: 62, color: '#3b82f6' },
  { scenario: 'D. 대만 위기', probability: 5, share2030: 30, color: '#ef4444' },
  { scenario: 'E. Terafab 충격', probability: 3, share2030: 58, color: '#a78bfa' }
];

const Stat = ({ label, value, sub, color = 'text-amber-400' }) => (
  <div className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-4">
    <div className="text-xs text-slate-400 mb-1">{label}</div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
    {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
  </div>
);

const Card = ({ title, subtitle, children, accent = 'border-slate-700' }) => (
  <div className={`bg-gradient-to-br from-slate-900/80 to-gray-950/80 border ${accent} rounded-2xl p-6 mb-6 backdrop-blur`}>
    {title && <h3 className="text-xl font-bold text-slate-100 mb-1">{title}</h3>}
    {subtitle && <div className="text-sm text-slate-400 mb-4">{subtitle}</div>}
    {children}
  </div>
);

const Highlight = ({ children, tone = 'amber' }) => {
  const tones = {
    amber: 'bg-amber-950/30 border-amber-700/40 text-amber-100',
    red: 'bg-red-950/30 border-red-700/40 text-red-100',
    blue: 'bg-blue-950/30 border-blue-700/40 text-blue-100',
    green: 'bg-emerald-950/30 border-emerald-700/40 text-emerald-100',
    purple: 'bg-purple-950/30 border-purple-700/40 text-purple-100',
    cyan: 'bg-cyan-950/30 border-cyan-700/40 text-cyan-100'
  };
  return (
    <div className={`border-l-4 ${tones[tone]} rounded-r-lg p-4 my-3`}>
      {children}
    </div>
  );
};

const Tag = ({ children, color = 'slate' }) => {
  const colors = {
    slate: 'bg-slate-800 text-slate-300 border-slate-600',
    red: 'bg-red-950 text-red-300 border-red-700',
    blue: 'bg-blue-950 text-blue-300 border-blue-700',
    cyan: 'bg-cyan-950 text-cyan-300 border-cyan-700',
    amber: 'bg-amber-950 text-amber-300 border-amber-700',
    green: 'bg-emerald-950 text-emerald-300 border-emerald-700'
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs rounded border ${colors[color]} mr-1`}>{children}</span>
  );
};

const ExecutiveSummary = () => (
  <Card title="Executive Summary — TSMC 해자의 본질" subtitle="결론 먼저: '단일 점유율 71%, 첨단노드 90%+, OPM 50%+' 의 의미" accent="border-amber-700/40">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <Stat label="2025 매출 (USD)" value="$122.4B" sub="+35.9% YoY" color="text-amber-400" />
      <Stat label="2025 영업이익률" value="50.8%" sub="4Q25 단독 54.0%" color="text-emerald-400" />
      <Stat label="Foundry 점유율" value="71%" sub="3Q25 TrendForce" color="text-red-400" />
      <Stat label="3nm/5nm 매출 비중" value="60%" sub="2025 wafer rev" color="text-cyan-400" />
      <Stat label="ROE" value="35.4%" sub="2025 연간" color="text-amber-400" />
      <Stat label="자본지출 (2025)" value="$42B" sub="2026 가이던스 $52~56B" color="text-blue-400" />
      <Stat label="HPC 매출 비중" value="58%" sub="2020 30% → 2025 58%" color="text-emerald-400" />
      <Stat label="고객 수" value="522사" sub="2024년 기준" color="text-purple-400" />
    </div>

    <Highlight tone="amber">
      <div className="font-semibold mb-2">한 줄 요약</div>
      TSMC는 <span className="text-amber-300 font-bold">"Pure-play 모델 × 학습곡선 × 패키징 캡티브 × 생태계 IP × 대만 클러스터"</span>의 5중 lollapalooza 해자를 보유한, 현존하는 세계 최강의 산업 자산이다.
      Photolithography 엔지니어 관점에서 보면 ASML이 도구의 해자라면 TSMC는 <span className="font-bold">'그 도구를 가장 빠르게 yield로 전환하는 능력'</span>의 해자이며, 양사는 정확히 보완 관계에 있다.
      그러나 ASML이 자본가벼움(asset-light)으로 무위험 통행료를 받는 반면, TSMC는 <span className="text-red-300">capital-intensive + 대만 지정학</span> 리스크를 동시에 짊어지는 구조 — 이것이 Buffett이 6개월 만에 매도한 이유의 본질이다.
    </Highlight>

    <div className="grid md:grid-cols-2 gap-4 mt-4">
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
        <div className="text-sm font-semibold text-emerald-300 mb-2">▲ TSMC가 가진 것</div>
        <ul className="text-sm text-slate-300 space-y-1.5">
          <li>• N3/N2 노드 단독 90%+ 점유 — Apple/NVIDIA/AMD/Qualcomm 모두 구속</li>
          <li>• CoWoS-L/S capacity 75K WPM (NVIDIA가 60% lock-in) — AI 가속기의 진짜 병목</li>
          <li>• OIP 생태계 — Cadence, Synopsys, ARM PDK가 TSMC 중심 표준화</li>
          <li>• 1987년 창업 이래 38년 누적 학습곡선 — 모방 불가능한 tribal knowledge</li>
          <li>• Hsinchu/Tainan/Kaohsiung 클러스터의 야간근무 엔지니어 밀도</li>
        </ul>
      </div>
      <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-4">
        <div className="text-sm font-semibold text-red-300 mb-2">▼ TSMC가 안고 있는 것</div>
        <ul className="text-sm text-slate-300 space-y-1.5">
          <li>• 대만 지정학 — silicon shield는 양날의 검</li>
          <li>• Top10 고객 76% 집중 (2024) — Apple+NVIDIA만 ~45%</li>
          <li>• Capex/매출 ~34% — 자본집약 비즈니스의 숙명</li>
          <li>• Arizona/Kumamoto/Dresden 분산은 GM 희석 (overseas fabs 2~3pp drag)</li>
          <li>• Intel 18A의 BSPDN 1세대 선행 — 기술 leapfrog 가능성 잠재</li>
        </ul>
      </div>
    </div>
  </Card>
);

const TechMoat = () => (
  <>
    <Card title="1. Pure-play Foundry 모델 — Morris Chang의 1987년 게임이론적 발명" accent="border-amber-700/40">
      <p className="text-slate-300 leading-relaxed mb-4">
        반도체 엔지니어 관점에서 IDM(Intel, Samsung)과 Pure-play(TSMC)의 차이는 단순한 비즈니스 모델 차이가 아니라 <span className="text-amber-300 font-semibold">고객의 IP를 다루는 신뢰 함수(trust function)</span>의 본질적 차이다.
        Samsung Foundry 엔지니어로 9년을 보낸 분이라면 정확히 알겠지만, "Samsung System LSI가 Exynos를 만들고 같은 회사 Foundry가 Qualcomm을 받는다"는 구조 자체가 fabless 입장에서 회피해야 할 이해충돌이다.
        Apple이 2014년 A8부터 TSMC로 완전히 옮긴 결정적 이유 역시 — 기술이 아니라 <span className="font-bold text-amber-200">"We don't compete with our customers"</span>라는 1987년 Morris Chang의 약속 때문이다.
      </p>
      <Highlight tone="amber">
        Pure-play의 게임이론적 의미: 고객(fabless)의 IP를 보호하는 것이 TSMC의 단일 평판 게임(repeated game)이고, IDM의 경우 매번 신호 게임(signaling game)이 된다.
        TSMC의 평판은 38년에 걸쳐 한 번도 깨지지 않았기에 — Apple, NVIDIA, AMD, Qualcomm, Broadcom 모두 핵심 IP를 맡길 수 있다. <br/>
        Intel Foundry가 2024~2025년 "Internal Foundry Model"로 firewall을 세우려는 이유, 그리고 Samsung Foundry를 분사하라는 압력이 끊임없이 나오는 이유가 모두 여기에 있다.
      </Highlight>
    </Card>

    <Card title="2. 공정 노드 진화 로드맵 (28nm → A12)" subtitle="GAAFET, BSPDN, NanoFlex Pro의 의미와 도입 시점">
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={roadmapData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="node" tick={axisStyle} />
          <YAxis yAxisId="left" tick={axisStyle} label={{ value: '논리밀도 (정규화)', angle: -90, position: 'insideLeft', style: { fontFamily: KOREAN_FONT, fill: '#94a3b8', fontSize: 11 } }} />
          <Tooltip contentStyle={tooltipStyle} labelStyle={legendStyle} itemStyle={legendStyle} />
          <Legend wrapperStyle={legendStyle} />
          <Bar yAxisId="left" dataKey="density" fill={COLORS.tsmc} name="논리 밀도 (정규화)" radius={[6, 6, 0, 0]} />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="grid md:grid-cols-3 gap-3 mt-5">
        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <div className="text-amber-400 font-bold mb-1">N2 (2nm) — 2025 H2 양산</div>
          <div className="text-xs text-slate-400 mb-2"><Tag color="cyan">GAA Nanosheet</Tag><Tag color="slate">NanoFlex</Tag></div>
          <p className="text-xs text-slate-300">FinFET 시대 종료. Samsung 3GAE 대비 3년 늦게 GAA 도입했지만 <span className="text-amber-300">defect density 곡선이 N3보다 빠르게 떨어진다</span>고 TSMC가 2026 NA Symposium에서 발표 — 보수적 도입의 보상.</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <div className="text-amber-400 font-bold mb-1">A16 (1.6nm) — 2027 양산</div>
          <div className="text-xs text-slate-400 mb-2"><Tag color="red">Super Power Rail (BSPDN)</Tag></div>
          <p className="text-xs text-slate-300">TSMC 첫 backside power delivery. <span className="text-red-300">Intel 18A보다 약 1.5~2년 늦은 도입</span>. 원래 2026년 양산 예정이었으나 2027년으로 1년 슬립. AI/HPC 데이터센터급 전용으로 포지셔닝.</p>
        </div>
        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-3">
          <div className="text-amber-400 font-bold mb-1">A14 (1.4nm) — 2028 양산</div>
          <div className="text-xs text-slate-400 mb-2"><Tag color="amber">2nd-gen Nanosheet</Tag><Tag color="slate">NanoFlex Pro</Tag></div>
          <p className="text-xs text-slate-300">N2 대비 속도 +10~15% / 전력 -25~30%. A13 (2029 optical shrink), A12 (2029 데이터센터급) 후속. <span className="text-emerald-300">High-NA EUV 미사용 — 보수적 전략 유지</span>.</p>
        </div>
      </div>

      <Highlight tone="blue">
        <div className="font-semibold mb-1">📐 Photolithography 관점 인사이트</div>
        Samsung 3GAE가 FinFET → GAA 전환을 <span className="text-cyan-300">2022년에 leapfrog</span>한 것은 기술적 도박이었고, 결과적으로 yield 30%대에서 시작해 4년이 지난 지금도 5nm 대형 고객을 대거 잃었다.
        TSMC는 N3까지 FinFET을 짜낸 후 N2에서 GAA 도입 — 즉 <span className="text-cyan-300">"GAA의 첫 번째 노드를 가장 정제된 NanoFlex 아키텍처로"</span> 진입한 것이다.
        이는 Photolithography 엔지니어가 익히 아는 <span className="text-cyan-300">"새 트랜지스터 + 새 EUV layer + 새 BSPDN을 한 번에 도입하지 않는다"</span>는 industry rule of thumb를 TSMC가 가장 엄격히 지킨 결과이며, A16에서 BSPDN을 도입할 때도 GAA 자체는 1세대를 그대로 사용하는 중첩 회피 전략이 인상적이다.
      </Highlight>
    </Card>

    <Card title="3. 신규 노드 Yield Ramp 비교 — 학습곡선이 곧 해자다" subtitle="(공개 정보 기반 추정 곡선; defect density 추정)">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={yieldRamp}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" tick={axisStyle} />
          <YAxis tick={axisStyle} label={{ value: 'Yield (%)', angle: -90, position: 'insideLeft', style: { fontFamily: KOREAN_FONT, fill: '#94a3b8', fontSize: 11 } }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={legendStyle} />
          <Line type="monotone" dataKey="tsmcN3" stroke={COLORS.tsmc} strokeWidth={3} dot={{ r: 4 }} name="TSMC N3 (실측 추정)" />
          <Line type="monotone" dataKey="samsung3GAE" stroke={COLORS.samsung} strokeWidth={3} dot={{ r: 4 }} name="Samsung 3GAE/SF3 (추정)" />
          <Line type="monotone" dataKey="intel18A" stroke={COLORS.intel} strokeWidth={3} dot={{ r: 4 }} name="Intel 18A (보고치 추정)" />
        </LineChart>
      </ResponsiveContainer>
      <Highlight tone="red">
        TSMC N3가 양산 6개월차에 75% yield에 도달한 반면, Samsung 3GAE는 18개월차에 50%에 그쳤다는 것이 업계의 합의된 추정.
        <span className="text-red-300 font-bold"> 이 학습곡선의 격차가 곧 fabless의 NRE 비용과 Time-to-Market 차이</span>로 이어지고, 그것이 곧 Qualcomm/NVIDIA가 4nm/5nm에서 Samsung을 떠난 결정적 이유다.
      </Highlight>
    </Card>

    <Card title="4. CoWoS — TSMC가 'AI 시대 진정한 병목'을 캡티브한 결정적 사건">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={cowosData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="year" tick={axisStyle} />
          <YAxis tick={axisStyle} label={{ value: 'CoWoS Capacity (K WPM)', angle: -90, position: 'insideLeft', style: { fontFamily: KOREAN_FONT, fill: '#94a3b8', fontSize: 11 } }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="capacity" fill="#f59e0b" radius={[8, 8, 0, 0]} name="월 capacity (K wafer)" />
        </BarChart>
      </ResponsiveContainer>
      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <div className="bg-slate-900/60 border border-amber-700/40 rounded-lg p-4">
          <div className="text-amber-300 font-bold mb-2">CoWoS Family</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• <span className="font-semibold text-slate-100">CoWoS-S (Silicon Interposer)</span> — H100/B200/MI300/Trainium2 대부분</li>
            <li>• <span className="font-semibold text-slate-100">CoWoS-L (Local Si Interposer + RDL)</span> — Blackwell B200/Rubin GR300 채택</li>
            <li>• <span className="font-semibold text-slate-100">CoWoS-R (RDL only)</span> — 비용 민감 ASIC</li>
            <li>• <span className="font-semibold text-slate-100">SoIC</span> — AMD MI300 (3D 적층)</li>
            <li>• <span className="font-semibold text-slate-100">CoPoS</span> — 차세대 panel-level (2027~)</li>
          </ul>
        </div>
        <div className="bg-slate-900/60 border border-amber-700/40 rounded-lg p-4">
          <div className="text-amber-300 font-bold mb-2">캡티브 동학</div>
          <p className="text-sm text-slate-300 leading-relaxed">
            NVIDIA가 2026 CoWoS capacity 60%+ 사전 확보(약 510K wafer/연), AMD ~80K, Google TPU ~80K (CoWoS 부족으로 4M → 3M 감산).
            <span className="text-amber-300 font-semibold"> "Wafer는 Intel/Samsung에 가도 패키징은 TSMC로 돌아온다"</span>는 구조 — 이것이 Intel 18A 첫 외부 고객조차 패키징은 TSMC를 쓰는 이유이며,
            진정한 의미에서 TSMC가 AI 가속기 시장의 <span className="text-red-300 font-semibold">"진짜 병목 자산(real chokepoint)"</span>을 점유하고 있다는 증거다.
          </p>
        </div>
      </div>
    </Card>

    <Card title="5. OIP (Open Innovation Platform) — 보이지 않는 가장 강한 해자">
      <p className="text-slate-300 leading-relaxed mb-3">
        TSMC OIP는 단순한 IP 라이브러리가 아니라 <span className="text-amber-300 font-semibold">Cadence, Synopsys, Ansys, ARM, Siemens EDA가 새 노드를 위한 PDK/IP를 가장 먼저, 가장 깊게 검증해주는 표준 플랫폼</span>이다.
        Samsung 엔지니어로서 Foundry가 외부 IP 벤더로부터 받는 동일한 노드 PDK 품질이 TSMC 대비 6~12개월 늦은 것을 직접 경험하셨을 것이다 — 이것은 노력의 문제가 아니라 <span className="font-semibold">생태계 임계질량(critical mass)</span>의 문제다.
      </p>
      <Highlight tone="green">
        OIP의 진정한 의미: fabless가 N2 design을 시작할 때 day-one에 검증된 ARM Cortex IP, HBM3E controller, SerDes PHY, Foundation IP가 모두 존재한다.
        Samsung Foundry/Intel Foundry는 이 모든 것을 자체적으로 채워야 하거나, IP 벤더가 후속 작업하길 기다려야 한다.
        <span className="text-emerald-300 font-bold"> 이것이 "Switching cost"의 본질</span> — 단순히 design rule을 다시 짜는 게 아니라 IP 생태계 전체를 다시 검증해야 한다는 것.
      </Highlight>
    </Card>
  </>
);

const Competitors = () => (
  <>
    <Card title="A. Samsung Foundry — 한 종합 평가" subtitle="삼성 출신 엔지니어의 시각에서, 가장 솔직하게" accent="border-blue-700/40">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Stat label="2025 매출 (추정)" value="$14.0B" sub="TSMC 대비 1/9" color="text-blue-400" />
        <Stat label="Foundry 점유율" value="6.8%" sub="3Q25 TrendForce" color="text-blue-400" />
        <Stat label="SF2 yield (1H25)" value="30~40%" sub="Exynos 2600 양산 직전" color="text-amber-400" />
        <Stat label="SF2 yield (4Q25)" value="55~60%" sub="EUV double patterning 후" color="text-emerald-400" />
      </div>

      <Highlight tone="blue">
        <div className="font-semibold mb-2">🇰🇷 Samsung Foundry의 진짜 약점은 기술이 아니다</div>
        Samsung Foundry는 ASML EUV 0.33NA 보유량, Photolithography 인력의 평균 경력, EDA 도구 라이선스 모두 TSMC와 동급이다.
        그럼에도 4nm/5nm에서 Qualcomm, NVIDIA, Tesla(구) 모두를 잃은 이유는 <span className="font-bold text-blue-300">"동일 회사 System LSI가 경쟁 fabless의 IP를 만지는 구조적 의심"</span>과
        <span className="font-bold text-blue-300"> "yield ramp가 늦어 first-mover 고객의 첫 1-2 분기 이익을 갉아먹는다"</span>는 두 가지 구조적 약점이다.
        SF2의 GAAFET 조기 도입(2022)은 기술적으로 옳은 베팅이었으나, "고객이 first-of-its-kind 노드의 yield 리스크를 떠안고 싶지 않다"는 fabless 심리를 과소평가했다.
      </Highlight>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-900/60 border border-blue-700/40 rounded-lg p-4">
          <div className="text-blue-300 font-bold mb-2">▲ 회복 신호 (2025~2026)</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• Tesla AI6 chip 16.5B$ deal (Taylor) — 2033까지 장기</li>
            <li>• Exynos 2600 자체 양산 안착 (Galaxy S26 Pro 채택)</li>
            <li>• SF2P 70% yield 보고 (4Q25, 일부 매체) — Qualcomm Snapdragon 8 Elite Gen 6 검토 중</li>
            <li>• SF2P AMD Venice EPYC 검토 보도 (확정 아님)</li>
            <li>• 가격: Exynos 2600 wafer가 TSMC N3 대비 ~33% 저렴</li>
          </ul>
        </div>
        <div className="bg-slate-900/60 border border-blue-700/40 rounded-lg p-4">
          <div className="text-blue-300 font-bold mb-2">▼ 구조적 한계</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• Taylor Texas fab — 4nm 계획 → 2nm 변경, 양산 2026 → 2027 슬립</li>
            <li>• CHIPS Act 보조금 $6.4B → $4.745B 26% 감액</li>
            <li>• Pyeongtaek 1.4nm pilot 라인 연기 (Q2 2025 → 2026)</li>
            <li>• System LSI 의존 — Exynos가 SF2 capacity의 1차 anchor (외부 고객 부족)</li>
            <li>• HBM이 Foundry capacity와 분리되어 있음 (TSMC는 베이스 다이를 N5/N4로 통합)</li>
          </ul>
        </div>
      </div>
    </Card>

    <Card title="B. Intel Foundry — IDM 2.0의 좌초와 18A의 도박" accent="border-cyan-700/40">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <Stat label="2025 IFS 매출" value="$18.2B" sub="대부분 internal" color="text-cyan-400" />
        <Stat label="2024 IFS 영업손실" value="-$13.4B" sub="2024년 누적" color="text-red-400" />
        <Stat label="Q1 2025 영업손실" value="-$2.3B" sub="OPM -50%" color="text-red-400" />
        <Stat label="18A 외부 고객" value="3사+" sub="MS, AWS, DoD" color="text-cyan-400" />
      </div>

      <Highlight tone="cyan">
        <div className="font-semibold mb-2">⚙️ 18A의 기술적 도박 — RibbonFET + PowerVia (BSPDN 1세대 양산)</div>
        Intel 18A는 <span className="text-cyan-300 font-bold">세계 최초로 BSPDN(PowerVia)을 양산 적용</span>하는 노드다. TSMC는 A16에서 1.5~2년 늦게 도입.
        만약 18A가 yield 65%+에서 안정화되면 — Intel은 Apple/NVIDIA가 가지 않는 한 미국 정부, Microsoft Maia, AWS Trainium 등 <span className="font-semibold">"미국 안보 카테고리"</span>를 캡티브할 수 있다.
        Pat Gelsinger 사임(2024.12)과 Lip-Bu Tan CEO 부임(2025.3), <span className="text-amber-300">미국 정부의 Intel 10% 지분 인수(2025.8)</span>는 모두 Intel Foundry를 "유사 국영기업"으로 재포지셔닝하는 시그널이다.
      </Highlight>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-slate-900/60 border border-cyan-700/40 rounded-lg p-4">
          <div className="text-cyan-300 font-bold mb-2">▲ Intel이 가진 카드</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• PowerVia BSPDN 양산 1세대 — TSMC 대비 1.5~2년 선행</li>
            <li>• Microsoft (Maia AI), AWS (AI Fabric) confirmed</li>
            <li>• 미국 정부 / DoD anchor 고객</li>
            <li>• CHIPS Act $7.86B + 정부 지분 10% (~$11B 가치)</li>
            <li>• Foveros / EMIB 자체 패키징 (CoWoS 우회 가능성)</li>
            <li>• <span className="text-amber-300 font-semibold">Tesla TeraFab의 14A 채택 (2026.4 발표)</span></li>
          </ul>
        </div>
        <div className="bg-slate-900/60 border border-cyan-700/40 rounded-lg p-4">
          <div className="text-cyan-300 font-bold mb-2">▼ Intel이 못 가진 것</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• Foundry 문화 — 내부 design 우선 DNA</li>
            <li>• OIP 동등 IP 생태계 부재 (Cadence/Synopsys 일부만)</li>
            <li>• PDK 품질과 design enablement 미성숙</li>
            <li>• Apple, NVIDIA, AMD, Qualcomm 대형 fabless 참여 부재</li>
            <li>• 2024 누적 손실 $13B — 분리/매각 압력 지속</li>
            <li>• CoWoS 우회 가능 packaging은 아직 검증 부족</li>
          </ul>
        </div>
      </div>

      <Highlight tone="amber">
        <div className="font-semibold mb-2">🏭 Tesla TeraFab + Intel 14A — 분기점이 될 수 있는 이벤트</div>
        2026년 4월 Musk가 Tesla Q1 2026 earnings call에서 "TeraFab은 Intel 14A를 사용할 것"이라고 명시.
        14A는 18A 다음 노드로 <span className="text-amber-300">High-NA EUV 채택 + 2세대 BSPDN</span> 예정.
        만약 14A가 양산 안착하고 TeraFab이 SpaceX 주도로 high-volume 단계까지 확장되면 — TSMC의 AI/HPC 매출 일부(특히 xAI/Tesla/SpaceX 영역, 추정 5~8B$/년)가 이전될 수 있다.
        다만 이는 <span className="font-semibold">2028년 이후의 시나리오</span>이며, 단기적으로 TSMC의 Apple/NVIDIA/AMD/Broadcom anchor를 흔들 수준은 아니다.
      </Highlight>
    </Card>

    <Card title="C. 3강 정량 비교 (정량 Snapshot)" accent="border-amber-700/40">
      <h4 className="text-slate-200 font-semibold mb-3">매출 추이 및 전망 (2018–2030E, USD billion)</h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="year" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={legendStyle} />
          <Line type="monotone" dataKey="tsmc" stroke={COLORS.tsmc} strokeWidth={3} dot={{ r: 4 }} name="TSMC" />
          <Line type="monotone" dataKey="samsung" stroke={COLORS.samsung} strokeWidth={2} dot={{ r: 3 }} name="Samsung Foundry (추정)" />
          <Line type="monotone" dataKey="intel" stroke={COLORS.intel} strokeWidth={2} dot={{ r: 3 }} name="Intel Foundry" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>

      <h4 className="text-slate-200 font-semibold mt-6 mb-3">분기별 영업이익률 비교 (%)</h4>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={operatingMarginData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="quarter" tick={axisStyle} />
          <YAxis tick={axisStyle} domain={[-150, 60]} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={legendStyle} />
          <Line type="monotone" dataKey="tsmc" stroke={COLORS.tsmc} strokeWidth={3} dot={{ r: 4 }} name="TSMC" />
          <Line type="monotone" dataKey="samsung" stroke={COLORS.samsung} strokeWidth={2} dot={{ r: 3 }} name="Samsung Foundry (추정)" />
          <Line type="monotone" dataKey="intel" stroke={COLORS.intel} strokeWidth={2} dot={{ r: 3 }} name="Intel Foundry" />
        </LineChart>
      </ResponsiveContainer>

      <h4 className="text-slate-200 font-semibold mt-6 mb-3">Capex 추이 (USD billion)</h4>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={capexData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="year" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={legendStyle} />
          <Bar dataKey="tsmc" fill={COLORS.tsmc} name="TSMC" radius={[4, 4, 0, 0]} />
          <Bar dataKey="samsung" fill={COLORS.samsung} name="Samsung Memory+Foundry" radius={[4, 4, 0, 0]} />
          <Bar dataKey="intel" fill={COLORS.intel} name="Intel" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <Highlight tone="red">
        Capex 절대규모만 보면 Samsung도 TSMC와 비슷해 보이지만, Samsung Capex의 70%는 메모리(DRAM/NAND)이고 Foundry는 ~$15B 미만.
        TSMC는 Capex 거의 100%가 logic foundry — <span className="text-red-300 font-bold">실제 logic 첨단노드 capex는 TSMC가 Samsung Foundry의 약 3배</span>다.
        이 차이가 누적된 8년치 결과가 곧 N3/N2 capacity 비율 90% vs 8%이다.
      </Highlight>
    </Card>

    <Card title="D. 해자 차원별 정량 평가 (Radar)" subtitle="7개 차원에서의 3사 비교 (정성+정량 통합 평가, 100=세계 최강)">
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={moatRadar}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="dimension" tick={{ fontFamily: KOREAN_FONT, fill: '#cbd5e1', fontSize: 12 }} />
          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={axisStyle} />
          <Radar name="TSMC" dataKey="tsmc" stroke={COLORS.tsmc} fill={COLORS.tsmc} fillOpacity={0.3} />
          <Radar name="Samsung Foundry" dataKey="samsung" stroke={COLORS.samsung} fill={COLORS.samsung} fillOpacity={0.2} />
          <Radar name="Intel Foundry" dataKey="intel" stroke={COLORS.intel} fill={COLORS.intel} fillOpacity={0.2} />
          <Legend wrapperStyle={legendStyle} />
          <Tooltip contentStyle={tooltipStyle} />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  </>
);

const MoatQuant = () => (
  <>
    <Card title="1. 시장 점유율 — Pure-play Foundry 단독 71%" accent="border-amber-700/40">
      <div className="grid md:grid-cols-2 gap-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={marketShareData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name} ${value}%`}
              outerRadius={110} fill="#8884d8" dataKey="value" style={{ fontFamily: KOREAN_FONT, fontSize: 11 }}>
              {marketShareData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div>
          <h4 className="text-slate-200 font-semibold mb-3">2025 매출 mix by node (TSMC)</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={nodeRevenueMix2025} cx="50%" cy="50%" labelLine={false}
                label={({ node, value }) => `${node} ${value}%`}
                outerRadius={95} fill="#8884d8" dataKey="value" style={{ fontFamily: KOREAN_FONT, fontSize: 11 }}>
                {nodeRevenueMix2025.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="text-xs text-slate-400 mt-2 text-center">7nm 이하 첨단노드: <span className="text-amber-300 font-bold">74%</span></div>
        </div>
      </div>
    </Card>

    <Card title="2. Platform Mix — Smartphone에서 HPC로의 대전환">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={platformMix}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="year" tick={axisStyle} />
          <YAxis tick={axisStyle} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={legendStyle} />
          <Area type="monotone" dataKey="HPC" stackId="1" stroke="#ef4444" fill="#ef4444" name="HPC" />
          <Area type="monotone" dataKey="Smartphone" stackId="1" stroke="#3b82f6" fill="#3b82f6" name="Smartphone" />
          <Area type="monotone" dataKey="IoT" stackId="1" stroke="#22d3ee" fill="#22d3ee" name="IoT" />
          <Area type="monotone" dataKey="Auto" stackId="1" stroke="#f59e0b" fill="#f59e0b" name="Automotive" />
          <Area type="monotone" dataKey="DCE" stackId="1" stroke="#a78bfa" fill="#a78bfa" name="DCE" />
          <Area type="monotone" dataKey="Others" stackId="1" stroke="#64748b" fill="#64748b" name="Others" />
        </AreaChart>
      </ResponsiveContainer>
      <Highlight tone="amber">
        2020년 HPC 30% → 2025년 58%, Smartphone 49% → 29%. <span className="text-amber-300 font-bold">5년 만에 plat mix가 완전히 뒤집혔다.</span>
        이는 Apple 비중 감소가 아니라 <span className="font-semibold">NVIDIA/AMD/Broadcom의 폭발적 성장</span>이 절대규모로 따라붙은 결과 — Apple은 절대 매출은 늘었지만 점유율이 25% → 22%로 희석.
        결과적으로 <span className="text-amber-300">"HPC platform 진입을 위해서는 TSMC 외에 대안이 사실상 없다"</span>는 단일 의존도가 형성됨.
      </Highlight>
    </Card>

    <Card title="3. 고객 Concentration & 수익성 지표">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-slate-200 font-semibold mb-3">2025 매출 by 핵심 고객 (추정)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={customerMix} cx="50%" cy="50%" labelLine={false}
                label={({ name, value }) => `${name} ${value}%`}
                outerRadius={110} fill="#8884d8" dataKey="value" style={{ fontFamily: KOREAN_FONT, fontSize: 11 }}>
                {customerMix.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h4 className="text-slate-200 font-semibold mb-3">FCF / ROE / OPM 추이</h4>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={fcfRoeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="year" tick={axisStyle} />
              <YAxis yAxisId="left" tick={axisStyle} />
              <YAxis yAxisId="right" orientation="right" tick={axisStyle} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend wrapperStyle={legendStyle} />
              <Bar yAxisId="left" dataKey="fcf" fill={COLORS.accent2} name="FCF (USD B)" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="roe" stroke={COLORS.tsmc} strokeWidth={2} name="ROE (%)" />
              <Line yAxisId="right" type="monotone" dataKey="oi" stroke={COLORS.accent1} strokeWidth={2} name="OPM (%)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      <Highlight tone="green">
        2025 FCF $31B (Capex $42B에도 불구), ROE 35.4%, OPM 50.8%.
        <span className="text-emerald-300 font-bold"> Capital-intensive 비즈니스에서 ROE 35%는 사실상 불가능한 숫자</span> — 압도적 시장점유율과 가격결정력이 자본을 회수하는 동학.
        Buffett-Munger 관점에서 보면 "high return on tangible capital" 그 자체이며, 동급의 자산집약 산업(steel, oil refining, airlines)과 차원이 다르다.
      </Highlight>
    </Card>

    <Card title="4. 비즈니스 모델 + 문화 해자">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
          <div className="text-amber-300 font-bold mb-2">📜 Morris Chang의 1987년 발명</div>
          <p className="text-sm text-slate-300 leading-relaxed">
            "We don't compete with our customers" — 단순한 슬로건이 아니라 <span className="text-amber-300">38년간 단 한 번도 깨지지 않은 신뢰의 결정체</span>.
            Apple, NVIDIA, Qualcomm이 <span className="font-semibold">직접 경쟁사가 아닌 Foundry</span>에 chip 설계를 맡길 수 있다는 사실 자체가 게임이론적으로 본 protocol-level trust.
          </p>
        </div>
        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
          <div className="text-amber-300 font-bold mb-2">🏘️ 대만 클러스터 효과</div>
          <p className="text-sm text-slate-300 leading-relaxed">
            Hsinchu Science Park 반경 30km 내 ASML 현장 인력, Cadence/Synopsys 응용 엔지니어, NTU/NCKU/NTHU 박사급 인력이 24/7 야간근무.
            TSMC per-employee revenue ~$1.6M, R&D engineer 1인당 R&D output이 Samsung Foundry 대비 1.5~2배.
            이것은 <span className="text-amber-300">자본으로 살 수 없는 사회·인구학적 자산</span>이다.
          </p>
        </div>
        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
          <div className="text-amber-300 font-bold mb-2">🎓 인재 파이프라인</div>
          <p className="text-sm text-slate-300 leading-relaxed">
            대만 STEM 졸업자의 ~30%가 반도체 산업으로 직진. 한국과 다르게 <span className="font-semibold">"공학 우대" 사회 합의</span>가 깔려 있고,
            VLSI Symposium / IEDM 발표량은 TSMC 단일 사가 Samsung+Intel 합산보다 많다 (2020년 이후).
            Mark Liu (전 chairman) → C.C. Wei (CEO) → Y.J. Mii (R&D head) 리더십 연속성도 Samsung의 잦은 사장 교체와 대조적.
          </p>
        </div>
        <div className="bg-slate-900/60 border border-slate-700 rounded-lg p-4">
          <div className="text-amber-300 font-bold mb-2">🍎 Apple 효과 — 공동 학습곡선</div>
          <p className="text-sm text-slate-300 leading-relaxed">
            2014년 A8부터 시작된 Apple-TSMC 협력은 단순한 매출 관계가 아니다.
            Apple이 "first customer of every node"가 되어주면서 TSMC가 매년 정확한 시점에 새 노드를 ramp할 수 있게 해주는 <span className="text-amber-300">상호 학습곡선의 anchor</span>.
            Apple 매출은 2014 $2B → 2025 ~$24B (12배). HPC가 대신 anchor로 부상한 지금도 Apple-TSMC 결속은 가장 깊다.
          </p>
        </div>
      </div>
    </Card>
  </>
);

const Outlook = () => (
  <>
    <Card title="중기 전망 (2025–2032, ~7년) — N2/A16/A14의 안착" accent="border-emerald-700/40">
      <div className="grid md:grid-cols-2 gap-4 mb-5">
        <div className="bg-slate-900/60 border border-emerald-700/40 rounded-lg p-4">
          <div className="text-emerald-300 font-bold mb-2">✅ 거의 확실한 시나리오 (Base case)</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• N2 양산 H2 2025 안착 (Apple A20, MediaTek Dimensity 첫 적용)</li>
            <li>• N2P 2026 H2 본격 ramp — AI 가속기/CPU anchor</li>
            <li>• A16 2027 양산 (BSPDN 첫 도입), A14 2028</li>
            <li>• CoWoS capacity 75K → 130K → 230K (2026~2028)</li>
            <li>• 2030 매출 $250~270B, Foundry 단독 점유율 70%+ 유지</li>
            <li>• Arizona Phase 2 (2nm) 2027 양산, Phase 3 (A16) 2028 착공</li>
          </ul>
        </div>
        <div className="bg-slate-900/60 border border-emerald-700/40 rounded-lg p-4">
          <div className="text-emerald-300 font-bold mb-2">⚠️ 중기 리스크 요인</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• Intel 18A의 Microsoft Maia/AWS Trainium 본격 ramp 시 — 미국 정부/하이퍼스케일러 일부 이전</li>
            <li>• Samsung SF2P가 2026~2027 yield 70%+ 안정화 시 중급 fabless 일부 회귀</li>
            <li>• Tesla TeraFab (2028~) Intel 14A 본격 시 — xAI/Tesla 영역 일부 이전</li>
            <li>• AI capex cycle 둔화 시 NVIDIA 위주 매출의 변동성 (28% 단일 고객)</li>
            <li>• High-NA EUV 도입 보수성이 A14 이후 격차 노출 가능 (Intel 14A는 H-NA 적용)</li>
            <li>• 대만 해협 긴장 고조 시 보험료/환율 영향</li>
          </ul>
        </div>
      </div>

      <Highlight tone="green">
        <div className="font-semibold mb-2">투자자 관점 핵심 판단</div>
        2025–2030 7년간 TSMC가 <span className="text-emerald-300 font-bold">Foundry 시장의 압도적 sole leader 지위를 유지할 확률은 75% 이상</span>.
        Intel 18A/14A가 일정 부분 외부 고객을 확보해도, AI HPC 시장의 전체 파이가 커지는 속도가 더 빨라 — TSMC 절대 매출은 계속 증가.
        다만 2027~2028 GM이 overseas fab 비중 확대로 56~58%로 일시 희석될 수 있고, 영업이익률은 48~52% 박스권으로 정상화 가능성.
      </Highlight>
    </Card>

    <Card title="장기 전망 (2032–2040, ~15년) — Post-GAAFET와 시스템 인테그레이터" accent="border-purple-700/40">
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-900/60 border border-purple-700/40 rounded-lg p-4">
          <div className="text-purple-300 font-bold mb-2">🔬 트랜지스터 다음 단계</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• <span className="font-semibold">CFET (Complementary FET)</span> — N/P 적층, 2030~2032 도입 예상</li>
            <li>• <span className="font-semibold">2D materials (MoS₂, WSe₂)</span> — IMEC/Samsung도 연구. TSMC 보수적</li>
            <li>• <span className="font-semibold">Monolithic 3D</span> — SoIC를 단일 die 안으로</li>
            <li>• 2030년 1조 트랜지스터 시대 → <span className="text-purple-300">chiplet 패키징이 design 그 자체가 됨</span></li>
            <li>• TSMC의 3DFabric (CoWoS + SoIC + InFO_PoP) 통합 플랫폼이 사실상 표준</li>
          </ul>
        </div>
        <div className="bg-slate-900/60 border border-purple-700/40 rounded-lg p-4">
          <div className="text-purple-300 font-bold mb-2">🌏 지정학과 분산</div>
          <ul className="text-sm text-slate-300 space-y-1.5">
            <li>• Arizona 12개 fab 계획 (2030 완성 시) — 2nm+ capacity의 ~30% 미국 분산</li>
            <li>• Kumamoto JASM Phase 2 — 6nm 특화, 자동차/IoT</li>
            <li>• Dresden ESMC — 자동차 MCU/Power IC</li>
            <li>• <span className="text-purple-300 font-semibold">2030년 이후 진정한 분산 효과</span> — silicon shield와 globalization 균형</li>
            <li>• 미·중 디커플링 심화 시 SMIC와의 mature node 경쟁 격화</li>
            <li>• Quantum/Photonic computing은 단기 위협 아님 (2035+ 변수)</li>
          </ul>
        </div>
      </div>
      <Highlight tone="purple">
        15년 시계에서 TSMC는 단순 wafer 제조사가 아니라 <span className="text-purple-300 font-bold">"시스템 인테그레이터(System Integrator)"</span>로 진화한다.
        Chiplet 패키징이 chip design의 본질이 되는 시대에, IP block 검증 + 패키징 + heterogeneous integration까지 통합 제공할 수 있는 사가 사실상 TSMC뿐이다.
        이것이 Buffett-Munger의 "moat that widens" 정의에 정확히 부합 — 시간이 지날수록 해자가 깊어지는 자산.
      </Highlight>
    </Card>

    <Card title="시나리오 분석 — 확률가중 점유율 예측" accent="border-amber-700/40">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={scenarioData} layout="vertical" margin={{ left: 100 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis type="number" tick={axisStyle} />
          <YAxis dataKey="scenario" type="category" tick={{ fontFamily: KOREAN_FONT, fill: '#cbd5e1', fontSize: 11 }} width={150} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={legendStyle} />
          <Bar dataKey="probability" fill={COLORS.accent1} name="확률 (%)" radius={[0, 6, 6, 0]} />
          <Bar dataKey="share2030" fill={COLORS.tsmc} name="2030 TSMC 점유율 가정 (%)" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div className="grid md:grid-cols-2 gap-3 mt-5">
        <div className="bg-slate-900/60 border border-emerald-700/40 rounded-lg p-3">
          <div className="text-emerald-300 font-bold mb-1">A. TSMC 압도 유지 (55%)</div>
          <p className="text-xs text-slate-300">N2/A16/A14 모두 일정대로. CoWoS bottleneck 지속. NVIDIA/Apple/AMD/Broadcom 전부 lock-in. 2030 점유율 70%+.</p>
        </div>
        <div className="bg-slate-900/60 border border-amber-700/40 rounded-lg p-3">
          <div className="text-amber-300 font-bold mb-1">B. Intel 18A/14A 부분 성공 (25%)</div>
          <p className="text-xs text-slate-300">MS Maia, AWS Trainium 안착. 미국 정부 anchor. TSMC 점유율 60%대로 점진 하락하지만 절대매출은 계속 증가.</p>
        </div>
        <div className="bg-slate-900/60 border border-blue-700/40 rounded-lg p-3">
          <div className="text-blue-300 font-bold mb-1">C. Samsung SF2P 회복 (12%)</div>
          <p className="text-xs text-slate-300">SF2P 70% yield 안착, Tesla AI6 + Qualcomm + AMD 일부 확보. 30~40% 가격 우위로 mid-tier fabless 회복. 점유율 12% → 18%까지.</p>
        </div>
        <div className="bg-slate-900/60 border border-red-700/40 rounded-lg p-3">
          <div className="text-red-300 font-bold mb-1">D. 대만 위기 (5%)</div>
          <p className="text-xs text-slate-300">봉쇄/유사사태 시 글로벌 GDP -2~10% 충격. Arizona/Kumamoto/Dresden은 충격 흡수하지만 첨단노드 capacity의 70%+ 일시 정지. 가장 tail risk.</p>
        </div>
        <div className="bg-slate-900/60 border border-purple-700/40 rounded-lg p-3 md:col-span-2">
          <div className="text-purple-300 font-bold mb-1">E. Terafab Intel 14A 대량 발주 (3%)</div>
          <p className="text-xs text-slate-300">SpaceX 주도 high-volume까지 14A 생산. xAI/Tesla/SpaceX 영역 +자체 수요로 5~8B$/년 → 점진적으로 TSMC HPC 수요 일부 잠식. 다만 Apple/NVIDIA 본격 이전은 비현실적.</p>
        </div>
      </div>
    </Card>
  </>
);

const FinalView = () => (
  <Card title="🎯 Buffett / Munger 관점 — TSMC 해자의 본질 평가" accent="border-amber-700/40">
    <div className="text-slate-300 leading-relaxed mb-4">
      Charlie Munger의 <span className="text-amber-300 font-bold">"lollapalooza effect"</span> 관점에서 TSMC는 다음 5개 요소가 동시에 중첩된 드문 자산이다:
    </div>
    <div className="grid md:grid-cols-5 gap-2 mb-5">
      <div className="bg-amber-950/40 border border-amber-700/40 rounded-lg p-3 text-center">
        <div className="text-amber-300 text-xs mb-1">1</div>
        <div className="text-sm text-slate-100 font-semibold">기술 학습곡선</div>
        <div className="text-xs text-slate-400 mt-1">38년 누적</div>
      </div>
      <div className="bg-amber-950/40 border border-amber-700/40 rounded-lg p-3 text-center">
        <div className="text-amber-300 text-xs mb-1">2</div>
        <div className="text-sm text-slate-100 font-semibold">Pure-play 신뢰</div>
        <div className="text-xs text-slate-400 mt-1">38년간 무패</div>
      </div>
      <div className="bg-amber-950/40 border border-amber-700/40 rounded-lg p-3 text-center">
        <div className="text-amber-300 text-xs mb-1">3</div>
        <div className="text-sm text-slate-100 font-semibold">OIP 생태계</div>
        <div className="text-xs text-slate-400 mt-1">Cadence/SNPS/ARM</div>
      </div>
      <div className="bg-amber-950/40 border border-amber-700/40 rounded-lg p-3 text-center">
        <div className="text-amber-300 text-xs mb-1">4</div>
        <div className="text-sm text-slate-100 font-semibold">자본 진입장벽</div>
        <div className="text-xs text-slate-400 mt-1">$300B+ 누적</div>
      </div>
      <div className="bg-amber-950/40 border border-amber-700/40 rounded-lg p-3 text-center">
        <div className="text-amber-300 text-xs mb-1">5</div>
        <div className="text-sm text-slate-100 font-semibold">대만 클러스터</div>
        <div className="text-xs text-slate-400 mt-1">사회·인구학적 자산</div>
      </div>
    </div>

    <Highlight tone="amber">
      <div className="font-bold mb-2">🧠 사고실험: "$300B와 30년이 주어지면 TSMC를 재현할 수 있는가?"</div>
      <p className="text-sm leading-relaxed">
        — <span className="font-semibold">불가능</span>하다. 자본은 fab을 짓지만, IP 생태계와 학습곡선과 신뢰는 시간이 만든다.
        Samsung은 30년+, $400B+ Capex를 쓰고도 7% 점유율에 머물러 있고 — Intel은 IDM의 DNA를 못 버려 IDM 2.0을 좌초시켰다.
        TSMC가 ASML EUV를 도입할 때마다 가장 먼저 가장 빠르게 yield를 올린 38년 누적의 tribal knowledge는 <span className="text-amber-300">capital만으로는 살 수 없는 진짜 해자</span>다.
      </p>
    </Highlight>

    <div className="grid md:grid-cols-2 gap-4 mt-5">
      <div className="bg-slate-900/60 border border-emerald-700/40 rounded-lg p-4">
        <div className="text-emerald-300 font-bold mb-2">✅ ASML과 TSMC의 차이</div>
        <p className="text-sm text-slate-300 leading-relaxed">
          ASML이 <span className="font-semibold">"asset-light, monopolistic toll booth"</span>라면 TSMC는 <span className="font-semibold">"capital-intensive, high return on tangible capital"</span>.
          ASML은 1조 wafer 생산되든 0.5조 wafer든 EUV 출하대수가 안정적 — 변동성 낮음. TSMC는 cycle에 노출되지만 동시에 <span className="text-emerald-300">cycle 중에도 capacity가 sold out</span>인 유일한 foundry.
          Buffett 관점: 둘 다 우수한 자산이지만 ASML이 더 "wonderful business at fair price"에 가깝고, TSMC는 "good business at wonderful price"의 성격이 더 강함.
        </p>
      </div>
      <div className="bg-slate-900/60 border border-red-700/40 rounded-lg p-4">
        <div className="text-red-300 font-bold mb-2">⚠️ Buffett이 6개월 만에 매도한 이유</div>
        <p className="text-sm text-slate-300 leading-relaxed">
          2022 Q3 $4.1B 매수 → 2023 Q1 86% 매도 → 2023 Q1 말 100% 매도. Buffett의 명시: <span className="text-red-300 font-semibold">"geopolitical tensions were a consideration"</span>.
          Buffett은 TSMC 비즈니스 자체는 "best-managed in the world"라고 인정. 문제는 위치(location).
          이는 <span className="font-semibold">기업 자체의 해자가 아니라 jurisdictional risk</span> — 1949년 이래 가장 큰 미·중 갈등 cycle에서 단일 섬에 자산이 집중된 리스크에 대한 Buffett의 "no fat pitch needed" 철학의 발현.
        </p>
      </div>
    </div>

    <div className="mt-6 bg-gradient-to-br from-amber-950/40 to-red-950/40 border border-amber-700/40 rounded-xl p-5">
      <div className="text-amber-300 font-bold text-lg mb-3">🎓 장기 보유 가치투자자를 위한 최종 결론</div>
      <ol className="text-sm text-slate-200 space-y-2 leading-relaxed">
        <li><span className="text-amber-300 font-bold">①</span> TSMC의 비즈니스 해자는 ASML 다음으로 강한 산업 자산이며, "moat that widens with time"의 정의에 부합한다.</li>
        <li><span className="text-amber-300 font-bold">②</span> 그러나 PER 22~28x 구간에서는 <span className="text-amber-300">기업 해자가 아닌 "지정학 할인율(geopolitical discount)"</span>이 valuation의 본질적 변수다.</li>
        <li><span className="text-amber-300 font-bold">③</span> Photolithography 엔지니어 관점에서 — <span className="font-semibold">Samsung Foundry/Intel Foundry의 추격 가능성을 과대평가하지 말 것</span>. 2025년 현재 단일노드 점유율 격차는 90%+ vs 5~7%로 사실상 monopoly에 가깝다.</li>
        <li><span className="text-amber-300 font-bold">④</span> AI capex cycle 둔화나 NVIDIA 단일 의존이 가장 큰 단기 변동성 요인. 다만 cycle 내에서도 OPM 40% 이하로 하락한 적 없음.</li>
        <li><span className="text-amber-300 font-bold">⑤</span> Position sizing 권고: <span className="text-amber-300 font-bold">portfolio의 5~10% 코어 위치, 대만 위기 시 -50~-70% drawdown 가능성을 인정한 상태에서 분할 매수</span>. Arizona/Kumamoto 분산이 본격적인 보험 효과를 내는 2028~2030 시점에 비중 추가 고려.</li>
      </ol>
    </div>

    <div className="mt-5 text-xs text-slate-500 italic">
      ※ 본 분석은 TSMC IR (4Q25 6-K, 2024 Annual Report 20-F), Intel 10-K/10-Q, TrendForce, Counterpoint, SemiAnalysis, IEEE/IEDM 발표, Reuters, Nikkei Asia, Tom's Hardware, Bloomberg 등 공개자료를 종합한 가치투자 관점 분석이며, 투자 권유가 아닙니다.
      A16/A14 출시 일정, Yield 곡선, Samsung SF2P 70% 도달, Tesla TeraFab 14A 채택 등 일부 데이터는 매체 보도 추정치를 포함하며 — 향후 분기 IR 자료를 통해 추적 검증이 필요합니다.
    </div>
  </Card>
);

export default function TSMCMoatAnalysis() {
  const [tab, setTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: '전체' },
    { id: 'tech', label: '기술 해부' },
    { id: 'compare', label: '경쟁자 비교' },
    { id: 'moat', label: '해자 정량화' },
    { id: 'outlook', label: '전망' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-gray-950 text-slate-100 p-4 md:p-8" style={{ fontFamily: KOREAN_FONT }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 border-b border-slate-700/50 pb-6">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <div className="px-3 py-1 bg-red-950/50 border border-red-700/50 rounded text-red-300 text-xs">DEEP DIVE</div>
            <div className="px-3 py-1 bg-amber-950/50 border border-amber-700/50 rounded text-amber-300 text-xs">VALUE INVESTING</div>
            <div className="px-3 py-1 bg-slate-800 border border-slate-700 rounded text-slate-300 text-xs">반도체 엔지니어 관점</div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">TSMC 경제적 해자 심층 분석</h1>
          <p className="text-slate-400 text-sm md:text-base">
            Pure-play Foundry 38년의 구조 · GAAFET / BSPDN / CoWoS 기술 해부 · Samsung·Intel과의 정밀 비교 · 2025–2040 시나리오
          </p>
          <div className="text-xs text-slate-500 mt-2">분석 시점: 2026년 5월 · TSMC FY2025 데이터 반영 · 직전 ASML 분석 시리즈 동일 디자인 시스템</div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 sticky top-2 z-10">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 text-sm rounded-lg transition border ${
                tab === t.id
                  ? 'bg-amber-600 border-amber-500 text-white shadow-lg shadow-amber-900/30'
                  : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
              style={{ fontFamily: KOREAN_FONT }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <>
            <ExecutiveSummary />
            <TechMoat />
            <Competitors />
            <MoatQuant />
            <Outlook />
            <FinalView />
          </>
        )}
        {tab === 'tech' && (
          <>
            <ExecutiveSummary />
            <TechMoat />
          </>
        )}
        {tab === 'compare' && <Competitors />}
        {tab === 'moat' && <MoatQuant />}
        {tab === 'outlook' && (
          <>
            <Outlook />
            <FinalView />
          </>
        )}

        <div className="mt-10 pt-6 border-t border-slate-700/50 text-center text-xs text-slate-500">
          © 2026 TSMC Deep-Dive Analysis · 가치투자자를 위한 한국어 인사이트 시리즈 · ASML → TSMC
        </div>
      </div>
    </div>
  );
}
