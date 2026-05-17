import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ComposedChart,
} from "recharts";

const revenueTrend = [
  { year: "2018", revenue: 10.9, rd: 1.58 },
  { year: "2019", revenue: 11.8, rd: 1.97 },
  { year: "2020", revenue: 14.0, rd: 2.20 },
  { year: "2021", revenue: 18.6, rd: 2.55 },
  { year: "2022", revenue: 21.2, rd: 3.25 },
  { year: "2023", revenue: 27.6, rd: 3.98 },
  { year: "2024", revenue: 28.3, rd: 4.30 },
  { year: "2025", revenue: 32.7, rd: 4.70 },
  { year: "2026E", revenue: 36.5, rd: 5.10 },
  { year: "2027E", revenue: 42.0, rd: 5.60 },
  { year: "2028E", revenue: 48.0, rd: 6.10 },
  { year: "2029E", revenue: 52.0, rd: 6.50 },
  { year: "2030E", revenue: 57.0, rd: 6.90 },
];

const marketShareEUV = [{ name: "ASML", value: 100 }];
const marketShareDUVi = [
  { name: "ASML", value: 90 },
  { name: "Nikon", value: 10 },
  { name: "SMEE", value: 0.1 },
];
const marketShareDryDUV = [
  { name: "ASML", value: 55 },
  { name: "Nikon", value: 25 },
  { name: "Canon", value: 18 },
  { name: "SMEE", value: 2 },
];

const euvLayersByNode = [
  { node: "N7+ (2019)", logic: 5, dram: 0 },
  { node: "N5 / 5LPP", logic: 14, dram: 1 },
  { node: "N3 / 3GAE", logic: 19, dram: 5 },
  { node: "N2 / SF2", logic: 26, dram: 8 },
  { node: "A16 / SF1.4", logic: 30, dram: 12 },
  { node: "A14 / SF1.0", logic: 34, dram: 16 },
];

const toolPrice = [
  { tool: "Canon NIL FPA-1200NZ2C", price: 25 },
  { tool: "ArF Dry (NXT/NSR)", price: 35 },
  { tool: "KrF (Legacy)", price: 18 },
  { tool: "DUV Immersion NXT:2050i", price: 90 },
  { tool: "DUV Immersion NXT:2100i", price: 110 },
  { tool: "EUV NXE:3800E (0.33NA)", price: 200 },
  { tool: "High-NA EXE:5000 (0.55NA)", price: 380 },
  { tool: "Hyper-NA HXE (0.75NA, ~2030)", price: 500 },
];

const backlogTrend = [
  { q: "Q4 2021", backlog: 26.2 },
  { q: "Q4 2022", backlog: 38.9 },
  { q: "Q4 2023", backlog: 39.0 },
  { q: "Q4 2024", backlog: 35.9 },
  { q: "Q1 2025", backlog: 35.4 },
  { q: "Q2 2025", backlog: 33.8 },
  { q: "Q3 2025", backlog: 33.0 },
  { q: "Q4 2025", backlog: 38.8 },
];

const radarComparison = [
  { metric: "해상도", EUV: 9, HighNA: 10, NIL: 8, DUVSAQP: 6 },
  { metric: "Throughput", EUV: 9, HighNA: 7, NIL: 3, DUVSAQP: 8 },
  { metric: "Overlay", EUV: 9, HighNA: 10, NIL: 4, DUVSAQP: 7 },
  { metric: "결함밀도", EUV: 9, HighNA: 8, NIL: 3, DUVSAQP: 8 },
  { metric: "마스크 비용", EUV: 6, HighNA: 5, NIL: 2, DUVSAQP: 8 },
  { metric: "전력효율", EUV: 4, HighNA: 3, NIL: 9, DUVSAQP: 7 },
  { metric: "Logic 적용성", EUV: 10, HighNA: 10, NIL: 1, DUVSAQP: 7 },
  { metric: "Memory 적용성", EUV: 9, HighNA: 8, NIL: 5, DUVSAQP: 8 },
];

const chinaCatchup = [
  { milestone: "13.5nm 광원 안정 출력 (250W+)", asml: 2010, china: 2028 },
  { milestone: "Mo/Si 다층 미러 양산 품질", asml: 2012, china: 2030 },
  { milestone: "EUV pellicle / mask blank 자급", asml: 2018, china: 2031 },
  { milestone: "EUV 양산 first wafer", asml: 2018, china: 2030 },
  { milestone: "0.55 High-NA 광학계", asml: 2023, china: 2035 },
];

const rdCumulative = [
  { year: "1995", cum: 0.5 },
  { year: "2000", cum: 2.5 },
  { year: "2005", cum: 6.5 },
  { year: "2010", cum: 12.0 },
  { year: "2015", cum: 21.0 },
  { year: "2020", cum: 33.0 },
  { year: "2024", cum: 51.0 },
  { year: "2025", cum: 56.0 },
];

const marginTrend = [
  { year: "2018", gross: 46.0, op: 27.1, net: 23.7 },
  { year: "2019", gross: 44.7, op: 23.6, net: 21.9 },
  { year: "2020", gross: 48.6, op: 29.0, net: 25.4 },
  { year: "2021", gross: 52.7, op: 36.3, net: 31.6 },
  { year: "2022", gross: 50.5, op: 30.7, net: 26.6 },
  { year: "2023", gross: 51.3, op: 32.8, net: 28.4 },
  { year: "2024", gross: 51.3, op: 31.9, net: 26.8 },
  { year: "2025", gross: 52.8, op: 34.6, net: 29.4 },
];

const COLORS = ["#60a5fa", "#a78bfa", "#f472b6", "#fbbf24", "#34d399", "#f87171"];

const fontStack = '"Pretendard", "Pretendard Variable", "Noto Sans KR", -apple-system, BlinkMacSystemFont, system-ui, sans-serif';

const Card = ({ title, subtitle, children, className = "" }) => (
  <div className={`bg-slate-900/70 backdrop-blur border border-slate-800 rounded-2xl p-6 shadow-xl ${className}`}>
    {title && (
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-100 tracking-tight">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);

const Stat = ({ label, value, sub, accent = "text-blue-400" }) => (
  <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
    <div className="text-xs text-slate-400 mb-1">{label}</div>
    <div className={`text-2xl font-bold ${accent}`}>{value}</div>
    {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
  </div>
);

const Highlight = ({ children, tone = "blue" }) => {
  const toneMap = {
    blue: "border-blue-500/40 bg-blue-500/10 text-blue-100",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-100",
    emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-100",
    rose: "border-rose-500/40 bg-rose-500/10 text-rose-100",
  };
  return <div className={`border-l-4 rounded-r-lg p-4 my-3 ${toneMap[tone]}`}>{children}</div>;
};

const SectionTitle = ({ num, title, sub }) => (
  <div className="mb-6">
    <div className="flex items-baseline gap-3">
      <span className="text-blue-400 font-mono text-sm">{num}</span>
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
    </div>
    {sub && <p className="text-sm text-slate-400 mt-1">{sub}</p>}
    <div className="h-px bg-gradient-to-r from-blue-500/40 via-slate-700 to-transparent mt-3" />
  </div>
);

const tooltipStyle = {
  backgroundColor: "#0f172a",
  border: "1px solid #334155",
  borderRadius: 8,
  fontSize: 12,
  fontFamily: fontStack,
};

export default function ASMLMoatDashboard() {
  const [tab, setTab] = useState("all");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-slate-900 text-slate-200" style={{ fontFamily: fontStack }}>
      <div className="max-w-7xl mx-auto px-4 py-10">

        <header className="mb-10">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3 flex-wrap">
            <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
              가치투자 · 심층분석
            </span>
            <span>2026.05 작성 · Photolithography 도메인 전제</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            ASML의 경제적 해자
          </h1>
          <p className="text-lg text-slate-400 mt-3">
            "30년의 시간"이라는 해자 — EUV 생태계의 비대칭성과 장기 보유 가치 평가
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs">
            {[
              { id: "all", label: "전체" },
              { id: "tech", label: "기술 해부" },
              { id: "compete", label: "경쟁자 비교" },
              { id: "moat", label: "해자 정량화" },
              { id: "outlook", label: "전망" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-3 py-1.5 rounded-full border transition ${
                  tab === t.id
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-200"
                    : "bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </header>

        <Card className="mb-10 border-blue-500/30 bg-gradient-to-br from-blue-950/40 to-slate-900/60">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <span className="text-blue-400">▎</span>핵심 요약
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Stat label="EUV 시장 점유율" value="100%" sub="ASML 단독 공급" accent="text-blue-400" />
            <Stat label="DUV Immersion 점유율" value="~90%" sub="2025 매출 기준" accent="text-purple-400" />
            <Stat label="2025 매출" value="€32.7B" sub="YoY +16%" accent="text-emerald-400" />
            <Stat label="2025 백로그" value="€38.8B" sub="2027까지 가시성" accent="text-amber-400" />
            <Stat label="High-NA 1대 가격" value="$380M" sub="A380 2대 무게 165톤" accent="text-rose-400" />
            <Stat label="누적 R&D" value="≈€56B" sub="1995–2025 자체 추정" accent="text-cyan-400" />
            <Stat label="순이익률 (2025)" value="29.4%" sub="순이익 €9.6B" accent="text-emerald-400" />
            <Stat label="직원 수 (2025)" value="43,520" sub="+ 임시직 689명" accent="text-blue-400" />
          </div>

          <Highlight tone="blue">
            <p className="text-sm leading-relaxed">
              <strong className="text-white">투자 결론(요약):</strong> ASML의 해자는 단일 지표(시장점유율·특허·규모)로
              환원되지 않는다. 이는 <strong>① CO₂ + Sn LPP 광원, ② Zeiss 다층 Mo/Si 반사 광학계, ③ Twinscan 듀얼 스테이지,
              ④ Holistic Lithography 소프트웨어 스택, ⑤ 5,300+ 설치 베이스의 서비스 네트워크</strong>가 <strong>30년의 시간 위에
              중첩된 lollapalooza</strong>이다. Buffett 식으로 말하면 "$200B와 30년을 줘도 경쟁자가 다시 만들 수 없는"
              종류의 해자에 해당하며, 자본·시간·인재·생태계가 동시에 충족되어야 하는 <strong>4중 결합 자산</strong>이다.
              단기 변동성(중국 익스포저, 사이클, High-NA 램프)이 있지만 2030년대 중반까지 EUV 의존도 심화 추세는 구조적이며,
              포지션 빌딩의 주된 리스크는 기술이 아니라 <strong>밸류에이션과 지정학</strong>이다.
            </p>
          </Highlight>
        </Card>

        {(tab === "all" || tab === "tech") && (
          <section className="mb-12">
            <SectionTitle
              num="01"
              title="기술적 해자의 심층 해부"
              sub="EUV는 '광학'이 아니라 '플라즈마 핵공학 + 진공 정밀제어 + 거대 SI'의 결합이다"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Card title="① 13.5nm 광원의 물리적 난이도 (LPP)" subtitle="CO₂ MOPA + Sn droplet">
                <ul className="text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>13.5nm</strong>는 Sn IX–XIV 이온의 4d–4f / 4p–4d / 4d–5p 천이에서 나오는 좁은 EUV 밴드.
                    이 좁은 in-band(2%) 영역에 에너지를 집중시키는 것이 본질적 난제.</li>
                  <li>• <strong>50 kHz</strong>로 직경 ~30 µm <strong>Sn 액적</strong>을 진공으로 사출,
                    pre-pulse(ps Nd:YAG)로 mist화한 뒤 main pulse(CO₂ MOPA, ~30 kW급, ~250 mJ/pulse)로 조사.</li>
                  <li>• 플라즈마 온도 30–50 eV(≈수십만 K) — <strong>태양 표면보다 높은</strong> 다중이온 비평형 플라즈마를
                    초당 5만 번 안정 재현.</li>
                  <li>• Conversion Efficiency 5–6% 수준에 도달까지 20년 — Cymer/ASML이 사실상 단독 도달.
                    Gigaphoton(Komatsu) 도전 실패.</li>
                </ul>
                <Highlight tone="amber">
                  <p className="text-xs">
                    <strong>현장 엔지니어 관점</strong>: 광원의 <strong>dose stability</strong>가 wafer-level CDU를 결정한다.
                    250W → 350W → 500W로 끌어올리는 데 ASML이 매년 1–2nm의 process latitude를 제공할 수 있는 이유는
                    광원 자체가 이미 <strong>10년 학습 곡선</strong>의 결과이기 때문이다.
                  </p>
                </Highlight>
              </Card>

              <Card title="② Zeiss SMT 독점 광학계" subtitle="Mo/Si 다층 박막 반사거울 + 무흠결 면형">
                <ul className="text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• EUV는 <strong>모든 매질에 흡수</strong> → 굴절 광학(렌즈) 불가, 전 경로 진공 + 반사 광학.</li>
                  <li>• <strong>Mo/Si 다층 미러</strong> 40~50쌍 적층, 각 층 두께 nm 단위 제어. 표면 거칠기 RMS ~50 pm
                    (수소 원자 직경의 절반).</li>
                  <li>• <strong>Zeiss SMT</strong>는 ASML이 24.9% 지분 보유(2016년 €1B 투자) — 사실상 captive supplier.
                    Berliner Glas(블랭크 폴리싱) 인수도 보강.</li>
                  <li>• High-NA(0.55) 시 anamorphic 4×/8× 광학계, slit 모양 변경, mask reflectivity 손실 보상 필요 →
                    Zeiss와의 30년 공동 개발사 없이 재현 불가.</li>
                </ul>
              </Card>

              <Card title="③ Cymer 인수(2013)와 수직통합" subtitle="$2.5B 광원 인수 — 결정적 결단">
                <p className="text-sm text-slate-300 leading-relaxed">
                  2013년 ASML은 <strong>광원 자체의 control</strong>이 EUV 양산의 병목임을 인지하고 $2.5B에 Cymer를 인수.
                  이로써 <strong>광원-광학-스테이지-소프트웨어</strong>의 system-level co-optimization이 가능해졌다.
                  광원만 외부 의존했다면 수율 ramp이 5년 이상 지연됐을 것이다. 실제 조정 노하우(droplet timing,
                  EUV collector mirror lifetime, Sn debris mitigation)는 <strong>특허보다는 영업비밀+공정 know-how</strong>로 보호.
                </p>
              </Card>

              <Card title="④ Holistic Lithography — 보이지 않는 해자" subtitle="YieldStar + 계산리소그래피 + Brion">
                <ul className="text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• 단순 노광이 아니라 <strong>scanner ↔ metrology(YieldStar) ↔ track(TEL) ↔ OPC/SMO 소프트웨어</strong>의 closed loop.</li>
                  <li>• <strong>Brion Technologies</strong> 인수(2007, $270M) → 계산리소그래피(SMO, OPC, ILT)의 디퍼런시에이터.</li>
                  <li>• 스캐너 1대 = HW + 다년간의 SW 라이선스 + 매일 발생하는 fingerprint 보정 데이터.
                    <strong> 이전이 사실상 불가능한 구조</strong>.</li>
                  <li>• 2025년 IBM(설치 베이스) 매출 €8.2B (+26% YoY) — 서비스/업그레이드의 long-tail이 강화 중.</li>
                </ul>
              </Card>

              <Card title="⑤ 1대당 가격의 의미" className="md:col-span-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={toolPrice} layout="vertical" margin={{ left: 40 }}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 11 }} unit="M" />
                    <YAxis type="category" dataKey="tool" stroke="#94a3b8" tick={{ fontSize: 11 }} width={220} />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${v}M`, "장비당 가격"]} />
                    <Bar dataKey="price" fill="#60a5fa" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <Highlight tone="blue">
                  <p className="text-sm">
                    1대 $380M의 High-NA EUV는 <strong>단순 장비가 아니라 5–10년 서비스 계약의 진입권</strong>이다.
                    설치 후 5년간 누적 서비스/업그레이드는 본체가의 30–50%에 달한다. ASML이 <strong>판매 시점이 아니라
                    "설치 베이스 누적"에서 진짜 가치</strong>를 창출함을 의미.
                  </p>
                </Highlight>
              </Card>
            </div>
          </section>
        )}

        {(tab === "all" || tab === "compete") && (
          <section className="mb-12">
            <SectionTitle
              num="02"
              title="Canon Nanoimprint(NIL) 정밀 비교"
              sub="FPA-1200NZ2C — 위협인가, 보완재인가?"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card title="Canon NIL의 본질" subtitle="원리: '광학 없이' 마스크를 레지스트에 직접 임프린트">
                <ul className="text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>14nm half-pitch</strong> 패턴 가능, Canon 주장 5nm node 등가.</li>
                  <li>• 1대당 가격 ~$25M, EUV 대비 <strong>10분의 1</strong>, 전력 ~10분의 1.</li>
                  <li>• 단일 마스크로 다층 패터닝 가능 → 메모리 반복 구조에 이론상 적합.</li>
                  <li>• 2024.9 Texas Institute for Electronics(TIE)에 첫 출하. Kioxia가 가장 적극, SK Hynix는 평가 중.</li>
                </ul>
              </Card>

              <Card title="치명적 한계 — Logic/HBM 코어 적용 불가" subtitle="공정 엔지니어 관점">
                <ul className="text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>결함밀도</strong>: 양산 요구 &lt;0.1 def/cm² 대비 현재 1–10 def/cm² 수준.
                    Quartz template의 입자 손상이 <strong>영구적 결함</strong>으로 누적.</li>
                  <li>• <strong>Throughput</strong>: J-FIL 기준 ~20 WPH. EUV NXE:3800E는 220 WPH, EXE:5200B는 200+ WPH.</li>
                  <li>• <strong>Overlay</strong>: soft stamp NIL ≈ 1 µm급 / EUV ≤ 1 nm. Logic의 50+ 마스크 정렬 불가.</li>
                  <li>• <strong>마스크 수명·비용</strong>: 1:1 imprint 마스크가 마모. EUV는 1:4 reduction이라 마스크 1장으로 수만 장 wafer.</li>
                  <li>• <strong>Logic의 3D 비반복 패턴</strong>(M0/M1)에 사실상 부적합. NAND/일부 DRAM 비핵심 layer에서만 가능성.</li>
                </ul>
              </Card>
            </div>

            <Card title="기술별 정량 비교 (Radar)" subtitle="0–10 정성 평가, 자체 점수">
              <ResponsiveContainer width="100%" height={420}>
                <RadarChart data={radarComparison}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="metric" tick={{ fill: "#cbd5e1", fontSize: 11 }} />
                  <PolarRadiusAxis stroke="#475569" tick={{ fill: "#64748b", fontSize: 10 }} />
                  <Radar name="EUV 0.33NA" dataKey="EUV" stroke="#60a5fa" fill="#60a5fa" fillOpacity={0.25} />
                  <Radar name="High-NA 0.55" dataKey="HighNA" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.25} />
                  <Radar name="Canon NIL" dataKey="NIL" stroke="#fbbf24" fill="#fbbf24" fillOpacity={0.2} />
                  <Radar name="DUV+SAQP" dataKey="DUVSAQP" stroke="#34d399" fill="#34d399" fillOpacity={0.2} />
                  <Legend wrapperStyle={{ fontSize: 12, fontFamily: fontStack }} />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadarChart>
              </ResponsiveContainer>
              <Highlight tone="amber">
                <p className="text-sm">
                  <strong>Canon이 EUV를 포기한 이유</strong>는 광학기술 부족이 아니라, <strong>광원·광학·스테이지·SW의
                  system integration</strong>을 capex와 시간으로 따라잡기 불가능하다고 판단했기 때문. 대신 NIL이라는
                  <strong> 완전히 다른 axis</strong>로 회피한 것이 NIL의 본질이다. 결과적으로 NIL은 <strong>Logic·HBM 코어
                  레이어에 진입할 수 없는 보완재</strong>로 정착.
                </p>
              </Highlight>
            </Card>
          </section>
        )}

        {(tab === "all" || tab === "compete") && (
          <section className="mb-12">
            <SectionTitle
              num="03"
              title="Nikon — '광학은 있지만 생태계가 없다'"
              sub="2007 ArFi 패배 → EUV 미참여 → ArFi 재도전(2027)"
            />

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="md:col-span-2">
                <Card title="2025 노광기 시장 점유율 (매출 기준)" subtitle="Bits&Chips, Dataintelo 등 종합">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-2 text-center">EUV (전체)</p>
                      <ResponsiveContainer width="100%" height={140}>
                        <PieChart>
                          <Pie data={marketShareEUV} dataKey="value" innerRadius={30} outerRadius={55} label={(e) => `${e.value}%`}>
                            <Cell fill="#60a5fa" />
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <p className="text-center text-xs text-blue-300 font-bold">ASML 100%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-2 text-center">DUV Immersion</p>
                      <ResponsiveContainer width="100%" height={140}>
                        <PieChart>
                          <Pie data={marketShareDUVi} dataKey="value" innerRadius={30} outerRadius={55} label={(e) => `${e.value}%`}>
                            {marketShareDUVi.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <p className="text-center text-xs text-purple-300 font-bold">ASML ~90%</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-2 text-center">Dry DUV</p>
                      <ResponsiveContainer width="100%" height={140}>
                        <PieChart>
                          <Pie data={marketShareDryDUV} dataKey="value" innerRadius={30} outerRadius={55} label={(e) => `${e.value}%`}>
                            {marketShareDryDUV.map((_, i) => (<Cell key={i} fill={COLORS[i]} />))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                      <p className="text-center text-xs text-amber-300 font-bold">3사 분점</p>
                    </div>
                  </div>
                </Card>
              </div>
              <Card title="Nikon 핵심 사실" subtitle="Bits&Chips, Nikon IR FY2024">
                <ul className="text-xs text-slate-300 space-y-2">
                  <li>• <strong>FY2024 ArFi 11대 판매</strong>, FY2025 H1 0대.</li>
                  <li>• Precision Equipment 매출 ~¥180B (≈$1.2B).</li>
                  <li>• 2027년 신형 ArFi 프로토타입 목표.</li>
                  <li>• EUV에는 미참여. <strong>2000년대 초 EUV-LLC 이탈</strong>이 결정적.</li>
                  <li>• NSR-S636E(2023.12 발표): MMO &lt;2.1nm, ≥275 WPH — 단일 spec은 우수.</li>
                </ul>
              </Card>
            </div>

            <Card title="왜 Nikon은 ASML에 졌는가? — 5가지 구조적 패배 요인">
              <div className="grid md:grid-cols-5 gap-3 text-xs">
                {[
                  { t: "① 듀얼 스테이지", d: "ASML Twinscan 2001 vs Nikon 단일 스테이지 → throughput 격차 확대" },
                  { t: "② Immersion 타이밍", d: "ASML이 TSMC와 2004년 immersion 양산 첫 도입 → 7년 학습 격차" },
                  { t: "③ EUV-LLC 이탈", d: "Intel·Samsung·TSMC equity 투자(2012) ASML 집중 → Nikon 자금/맵 단절" },
                  { t: "④ Holistic stack", d: "Brion·HMI·Cymer·Berliner Glas → 시스템 통합. Nikon은 광학 단일축." },
                  { t: "⑤ 고객 lock-in", d: "TSMC 14nm 이후 ASML 표준화. process recipe 이전 비용이 막대." },
                ].map((x, i) => (
                  <div key={i} className="bg-slate-950/60 border border-slate-800 rounded-lg p-3">
                    <p className="text-rose-300 font-bold mb-1">{x.t}</p>
                    <p className="text-slate-300 leading-relaxed">{x.d}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        )}

        {(tab === "all" || tab === "compete") && (
          <section className="mb-12">
            <SectionTitle
              num="04"
              title="중국 SMEE / Huawei — 위협의 정확한 크기"
              sub="국가급 동원에도 불구한 '시간의 격차'"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card title="현재 상황 (2025년 말)" subtitle="Reuters, FT, SCMP, TrendForce 종합">
                <ul className="text-sm text-slate-300 space-y-2 leading-relaxed">
                  <li>• <strong>SMEE SSA600/20</strong>: 90nm ArF 양산. <strong>SSA800-10W (28nm DUV immersion)</strong>는
                    2023.12부터 SMIC 시험 인도, 양산 적격 여부 불명확.</li>
                  <li>• <strong>Yuliangsheng/SiCarrier</strong>: ASML NXT:1950i(2008년급)에 해당하는 immersion 시작 단계.</li>
                  <li>• <strong>Huawei + 하얼빈공대 LDP EUV</strong>: 2025 mid 100–150W 출력, 양산 250W 미달.
                    Shenzhen prototype "first light" 보고(2025.12), 실측 throughput·overlay 미공개.</li>
                  <li>• Tsinghua <strong>SSMB(synchrotron 기반 EUV)</strong>: 연구 단계, 양산성 무관.</li>
                  <li>• ASML China 매출: 2025 Q3 기준 매출의 <strong>~42%</strong> — 미·중·EU 익스포저 리스크.</li>
                </ul>
              </Card>

              <Card title="자체 EUV 따라잡기 갭" subtitle="자체 추정">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={chinaCatchup} layout="vertical" margin={{ left: 100 }}>
                    <CartesianGrid stroke="#1e293b" />
                    <XAxis type="number" stroke="#94a3b8" tick={{ fontSize: 10 }} domain={[2005, 2040]} />
                    <YAxis type="category" dataKey="milestone" stroke="#94a3b8" tick={{ fontSize: 10 }} width={180} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 11, fontFamily: fontStack }} />
                    <Bar dataKey="asml" fill="#60a5fa" name="ASML 달성년도" />
                    <Bar dataKey="china" fill="#f87171" name="중국 예상 도달" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Highlight tone="rose">
              <p className="text-sm leading-relaxed">
                <strong>핵심 인사이트</strong>: 중국이 "EUV first-light"에 도달했다는 사실 자체는 사실이지만,
                <strong> first-light ≠ 양산</strong>. ASML조차 2010년 first-light → 2018 양산 도입까지 8년 걸렸다.
                LDP는 LPP보다 광원 출력 한계가 본질적(전극 수명, debris 문제)이며, <strong>Mo/Si 다층 미러·EUV pellicle·EUV
                resist·mask blank</strong>의 글로벌 공급망(미국/일본/독일/오스트리아) 전체를 자급해야 함. 미국 BIS 규제(2022.10,
                2023.10, 2024)는 <strong>Tier 3 부품(EV Group, IMS Nanofabrication 등 오스트리아 monopoly)</strong>까지
                차단하므로, 중국의 <strong>commercially viable</strong> EUV 양산은 자체 평가로 <strong>2030년대 초·중반 이후</strong>가
                현실적. 그 사이 ASML은 Hyper-NA로 한 세대 더 도약.
              </p>
            </Highlight>
          </section>
        )}

        {(tab === "all" || tab === "compete") && (
          <section className="mb-12">
            <SectionTitle
              num="05"
              title="인접 WFE 업체와의 비교 — 노광이 왜 특별한가"
              sub="AMAT, LRCX, TEL, KLA — 모두 '복수 공급자' 구조이지만 노광만 단일"
            />

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-400 border-b border-slate-800">
                      <th className="py-2 pr-4">공정 영역</th>
                      <th className="py-2 pr-4">주요 공급자</th>
                      <th className="py-2 pr-4">시장 구조</th>
                      <th className="py-2 pr-4">진입장벽 본질</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {[
                      { a: "Lithography (EUV)", b: "ASML", c: "단독 (100%)", d: "광원+광학+SI 30년 누적" },
                      { a: "Lithography (DUV)", b: "ASML, Nikon, Canon, SMEE", c: "ASML 90%", d: "동일하게 누적" },
                      { a: "Etch", b: "LRCX, TEL, AMAT", c: "3사 경쟁", d: "재료·플라즈마 노하우" },
                      { a: "Deposition (CVD/PVD/ALD)", b: "AMAT, LRCX, TEL, ASMI", c: "다공급자", d: "재료/precursor" },
                      { a: "Track (coater/dev)", b: "TEL", c: "사실상 단독 (~90%)", d: "ASML scanner 통합 표준" },
                      { a: "Metrology/Inspection", b: "KLA, ASML(YieldStar), AMAT", c: "KLA dominant", d: "광학+AI 조합" },
                      { a: "Ion Implant", b: "AMAT, AIBT", c: "AMAT 80%", d: "에너지 제어" },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                        <td className="py-2 pr-4 font-mono text-xs">{r.a}</td>
                        <td className="py-2 pr-4">{r.b}</td>
                        <td className="py-2 pr-4 text-blue-300">{r.c}</td>
                        <td className="py-2 pr-4 text-slate-400 text-xs">{r.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Highlight tone="emerald">
                <p className="text-sm">
                  <strong>해자 비대칭성</strong>: 다른 모든 WFE 영역은 <strong>복수 공급자 + 부분 대체 가능</strong>한 반면,
                  노광(특히 EUV)은 단일 공급자 + 무대체. AMAT/LRCX가 노광 진입을 시도하지 않는 이유는 광학·광원·정밀
                  스테이지·SW의 30년 누적이 <strong>인접 WFE 기술과 거의 무관한 별도의 기술 트리</strong>이기 때문.
                </p>
              </Highlight>
            </Card>
          </section>
        )}

        {(tab === "all" || tab === "moat") && (
          <section className="mb-12">
            <SectionTitle
              num="06"
              title="해자의 깊이를 입증하는 정량적 증거"
              sub="매출 추이, R&D 누적, 마진 추세, 백로그, IBM"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card title="매출 & R&D (2018–2030E)" subtitle="2026 가이던스 €34–39B 중간값, 이후 모델">
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={revenueTrend}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" stroke="#94a3b8" tick={{ fontSize: 11 }} unit="B" />
                    <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" tick={{ fontSize: 11 }} unit="B" />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`€${v}B`]} />
                    <Legend wrapperStyle={{ fontSize: 11, fontFamily: fontStack }} />
                    <Bar yAxisId="left" dataKey="revenue" fill="#60a5fa" name="매출 (€B)" radius={[4, 4, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="rd" stroke="#fbbf24" strokeWidth={2} name="R&D (€B)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </Card>

              <Card title="누적 R&D 투자" subtitle="해자의 시간 차원 — '시간이 곧 자본'">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={rdCumulative}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="B" />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`€${v}B`, "누적 R&D"]} />
                    <Area dataKey="cum" stroke="#a78bfa" fill="#a78bfa" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
                <p className="text-xs text-slate-500 mt-2">
                  자체 추정. ASML annual reports 기반. EUV-LLC 시기 외부 자금(Intel/Samsung/TSMC equity €4B+) 미포함 시
                  실제 누적 투입은 더 큼.
                </p>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card title="백로그 — 2027까지의 가시성" subtitle="ASML 분기 보고서 기반 €B">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={backlogTrend}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="q" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="B" />
                    <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`€${v}B`, "백로그"]} />
                    <Bar dataKey="backlog" fill="#34d399" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>

              <Card title="마진 추이 — 구조적 우상향" subtitle="2018–2025 (단위: %)">
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={marginTrend}>
                    <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                    <XAxis dataKey="year" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                    <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit="%" domain={[20, 60]} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 11, fontFamily: fontStack }} />
                    <Line type="monotone" dataKey="gross" stroke="#60a5fa" strokeWidth={2} name="매출총이익률" />
                    <Line type="monotone" dataKey="op" stroke="#a78bfa" strokeWidth={2} name="영업이익률" />
                    <Line type="monotone" dataKey="net" stroke="#34d399" strokeWidth={2} name="순이익률" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <Card title="설치 베이스 long-tail 경제학">
              <div className="grid md:grid-cols-3 gap-4">
                <Stat label="2025 IBM 매출" value="€8.2B" sub="+26% YoY" accent="text-emerald-400" />
                <Stat label="설치 베이스 (대략)" value="5,300+" sub="누적 출하" accent="text-blue-400" />
                <Stat label="High-NA 5년 누적 서비스" value="≈$100M+" sub="$380M 본체 대비 25–30%" accent="text-amber-400" />
              </div>
              <Highlight tone="emerald">
                <p className="text-sm">
                  ASML의 IBM 매출은 <strong>가장 사이클에 무관한 부분</strong>이다. EUV/High-NA 1대당 연간 서비스 매출은
                  $5–10M으로 추정되며, 10년 사용 시 본체가의 50–80%가 service annuity로 전환. 이는 <strong>razor-and-blades</strong>
                  구조 + <strong>switching cost 해자</strong>를 동시에 형성. Buffett 식 표현: "한 번 팔면 10년간 캐시카우" —
                  사실상 SaaS-like 구조.
                </p>
              </Highlight>
            </Card>
          </section>
        )}

        {(tab === "all" || tab === "outlook") && (
          <section className="mb-12">
            <SectionTitle
              num="07"
              title="중기 전망 (2025–2032)"
              sub="A16/N2/SF2의 EUV 의존도 심화 + High-NA 램프 + HBM4/4E"
            />

            <Card title="노드별 EUV 마스크 레이어 수" subtitle="TheElec, TrendForce, TSMC IR 종합">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={euvLayersByNode}>
                  <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="node" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: fontStack }} />
                  <Bar dataKey="logic" fill="#60a5fa" name="Logic EUV 레이어" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="dram" fill="#f472b6" name="DRAM EUV 레이어" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <Highlight tone="blue">
                <p className="text-sm">
                  <strong>Logic 의존도 심화</strong>: N5 14층 → N3 19층 → N2 26층 → A16 30층(추정) → A14 34층(추정).
                  매 노드 전환마다 <strong>EUV 1대당 wafer 수율 effort가 증가</strong> → ASML scanner 1대의 가치 ↑.
                  <strong>DRAM</strong>: 1a/1b/1c node에서 EUV 5–8층, HBM4(1c-base) 이후 도입 가속. Samsung/SK Hynix 모두
                  1c→1d transition에 추가 EUV 발주.
                </p>
              </Highlight>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card title="High-NA 램프 일정" subtitle="ASML EUV 로드맵">
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• <strong>EXE:5000</strong> (150 WPH): Intel(2024년 D1X 첫 인도), TSMC, Samsung 시험 운용 중.</li>
                  <li>• <strong>EXE:5200B</strong> (200 WPH): 2025.7 첫 출하, Intel 14A 양산 라인 투입(2026).</li>
                  <li>• <strong>EXE:5400</strong>: 2028 (~300 WPH 목표).</li>
                  <li>• <strong>EXE:5600</strong>: 2030 (high-transmission, low-PFR illuminator).</li>
                  <li>• 양산 전환: <strong>Intel 14A → TSMC A14 → Samsung SF1.4</strong> 순. 2027–2028이 변곡점.</li>
                  <li>• 2028년 High-NA 매출 비중: EUV 매출의 <strong>1/4</strong> (ASML 가이던스).</li>
                </ul>
              </Card>

              <Card title="Hyper-NA & 지정학" subtitle="2030+ HXE 시리즈">
                <ul className="text-sm text-slate-300 space-y-2">
                  <li>• <strong>NA 0.75</strong>(폴라리제이션 한계까지) — Zeiss/imec 공동 검토. ~2030 HXE first model 추정.</li>
                  <li>• 1대당 가격 자체 추정 <strong>$500M+</strong>, 단일 시스템이 mid-cap 회사 시총.</li>
                  <li>• <strong>대만 유사사태</strong> 시: TSMC 가동 중단 → 글로벌 logic 30% 동결. ASML도 단기 매출 손실.
                    그러나 <strong>대체 capacity 구축이 ASML scanner 수요 폭증</strong>을 야기 → 비대칭 회복력.</li>
                  <li>• <strong>미·중 디커플링 강화 시</strong>: ASML China 매출(~42%) 감소, 그러나 미·EU·일·한·대만 capex 증가로 보완.</li>
                </ul>
              </Card>
            </div>
          </section>
        )}

        {(tab === "all" || tab === "outlook") && (
          <section className="mb-12">
            <SectionTitle
              num="08"
              title="장기 전망 (2032–2040)"
              sub="Post-EUV 패러다임 시나리오 + ASML self-cannibalization"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Card title="Beyond EUV 후보 기술 평가">
                <table className="w-full text-xs">
                  <thead className="text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="text-left py-2">기술</th>
                      <th className="text-left py-2">유망도</th>
                      <th className="text-left py-2">ASML 위협</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    {[
                      { t: "Hyper-NA EUV (0.75)", p: "★★★★★", r: "ASML 본인" },
                      { t: "DSA (Directed Self-Assembly)", p: "★★", r: "보완재" },
                      { t: "Multi-beam e-beam", p: "★★", r: "마스크에 한정" },
                      { t: "X-ray lithography", p: "★", r: "미미" },
                      { t: "Nanoimprint (Canon)", p: "★★", r: "비핵심 layer 한정" },
                      { t: "Synchrotron / SSMB EUV", p: "★", r: "연구 단계" },
                    ].map((r, i) => (
                      <tr key={i} className="border-b border-slate-800/50">
                        <td className="py-2">{r.t}</td>
                        <td className="py-2 text-amber-300">{r.p}</td>
                        <td className="py-2 text-slate-400">{r.r}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>

              <Card title="자기잠식(Self-cannibalization) 능력">
                <p className="text-sm leading-relaxed text-slate-300">
                  ASML은 이미 <strong>NXE → EXE → HXE</strong>의 self-cannibalization 사이클을 학습했다. EUV-LLC 시기
                  ASML이 <strong>Cymer 인수 + Zeiss 지분 + Brion 인수</strong>로 수직통합한 것은 <strong>다음 세대 패러다임
                  전환을 외부에 빼앗기지 않기 위한 사전 포석</strong>이었다. Buffett의 표현을 빌리면, "ASML은 자신의 해자를
                  매년 더 깊게 파는 회사"다.
                </p>
                <Highlight tone="amber">
                  <p className="text-xs">
                    <strong>Disruption 시나리오</strong>: silicon 자체 한계(carbon nanotube, 2D materials)에서도
                    <strong> 패터닝 자체는 여전히 필요</strong>하므로 ASML 유효성 유지. 양자컴퓨팅도 superconducting/photonic
                    qubit 모두 photolithography 의존. <strong>ASML의 진짜 위협은 "logic 수요 자체의 소멸"이지 기술 대체가 아니다</strong>.
                  </p>
                </Highlight>
              </Card>
            </div>

            <Card title="Elon Musk Terafab(2026.3 발표) 영향" className="mt-6">
              <p className="text-sm text-slate-300 leading-relaxed">
                Tesla/SpaceX/xAI/Intel의 Terafab 프로젝트(Austin, $20–25B 1단계, 풀스케일 분석가 추정 $5T)는 "전 세계 fab의
                2%만 우리 수요를 채울 수 있다"는 Musk 발언으로 출발. <strong>Intel 14A 노드 채택</strong>. 분석에 따르면
                80% yield 가정 시 <strong>logic fab만 126개, 총 $3.78T 자본 필요</strong>. <strong>ASML scanner 수요는 폭증</strong>
                (High-NA 한 fab당 15–25대) — 수직통합 시도가 결과적으로 ASML에 <strong>새로운 거대 발주처</strong>를 추가.
                Terafab은 ASML의 위협이 아니라 <strong>강력한 추가 lever</strong>. 다만 실현 가능성은 별개 이슈(자본·인력·시간 제약).
              </p>
            </Card>
          </section>
        )}

        {(tab === "all" || tab === "moat") && (
          <section className="mb-12">
            <SectionTitle
              num="09"
              title="Buffett · Munger 관점에서의 ASML 해자"
              sub="Lollapalooza — 다중 해자의 중첩"
            />

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
              {[
                { t: "Intangible Assets", border: "border-emerald-500/30", text: "text-emerald-300", items: ["30년 누적 know-how", "특허 16,000+", "영업비밀(droplet timing 등)"] },
                { t: "Switching Costs", border: "border-blue-500/30", text: "text-blue-300", items: ["fab당 process recipe lock-in", "TEL track 통합", "OPC/SMO model 전이비용"] },
                { t: "Network/Ecosystem", border: "border-purple-500/30", text: "text-purple-300", items: ["Zeiss·Cymer·TRUMPF captive", "imec 공동연구 30년", "TSMC/Samsung/Intel 공동개발"] },
                { t: "Scale/Cost", border: "border-amber-500/30", text: "text-amber-300", items: ["연 R&D €5B+", "5,300+ 설치 베이스", "60+ 국가 서비스망"] },
                { t: "Time Itself", border: "border-rose-500/30", text: "text-rose-300", items: ["Cymer 1986 창업", "Zeiss EUV 1990s 시작", "1대 ramp 6–9개월"] },
              ].map((p, i) => (
                <div key={i} className={`bg-slate-950/60 border rounded-xl p-4 ${p.border}`}>
                  <p className={`font-bold text-sm mb-2 ${p.text}`}>{p.t}</p>
                  <ul className="text-xs text-slate-300 space-y-1">
                    {p.items.map((x, j) => (<li key={j}>• {x}</li>))}
                  </ul>
                </div>
              ))}
            </div>

            <Card>
              <h3 className="text-lg font-bold text-white mb-3">사고실험: "$200B와 30년이 있다면 ASML을 재현할 수 있는가?"</h3>
              <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-rose-300">자본 측면</strong>: $200B는 R&D만으로는 충분. ASML 누적 R&D ≈ €56B.
                  그러나 자본은 <strong>Zeiss SMT 같은 captive partner를 만들지 못한다</strong>. Carl Zeiss는 1846년 창업,
                  EUV 광학 핵심 노하우는 1990년대부터 imec 공동 연구. <strong>돈으로 시간을 압축할 수 없는 영역</strong>.
                </p>
                <p>
                  <strong className="text-amber-300">시간 측면</strong>: 30년은 EUV 한 세대를 따라잡기에는 충분. 그러나 ASML은
                  그 30년 동안 <strong>매년 자기 해자를 더 파고 있음</strong>. Hyper-NA(2030), post-Hyper-NA(2040)까지 로드맵이
                  가시화되어 있어, 추격자는 항상 한 세대 뒤.
                </p>
                <p>
                  <strong className="text-emerald-300">인재·생태계 측면</strong>: 광학·플라즈마·정밀스테이지·계산리소그래피
                  4개 도메인의 <strong>cross-disciplinary 인력 4만명</strong>을 한 곳에 집결시키는 것은 자본 문제가 아님.
                  Eindhoven-Veldhoven-Aachen-Jena의 고밀도 공학 클러스터 자체가 자산.
                </p>
                <Highlight tone="rose">
                  <p className="text-sm">
                    <strong>결론(Munger 어조)</strong>: "Show me the incentive and I'll show you the outcome." EUV는
                    <strong> 한 회사가 30년 동안 정확한 incentive를 받은 결과</strong>이다. Intel·Samsung·TSMC가 €4B 직접
                    투자(2012)했고, 정부 보조금이 있었으며, 인재가 모였다. 이 incentive 구조 자체를 다른 곳에서 재현할
                    가능성은 낮다. <strong>따라서 ASML의 해자는 본질적으로 'replicable한 기술'이 아니라 'replicable하지 않은
                    역사'에 있다.</strong>
                  </p>
                </Highlight>
              </div>
            </Card>
          </section>
        )}

        <section className="mb-12">
          <SectionTitle num="★" title="투자 시사점 — 장기 보유 가치투자자 관점" />

          <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 to-slate-900/60">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Stat label="해자의 성격" value="복합형" sub="Time + Network + Switching + Scale + Intangible" accent="text-emerald-400" />
              <Stat label="Disruption 위험" value="낮음" sub="대체 기술 모두 보완재 수준" accent="text-blue-400" />
              <Stat label="주된 리스크" value="지정학·밸류에이션" sub="기술·경쟁이 아니라" accent="text-amber-400" />
            </div>

            <h3 className="text-lg font-bold text-white mb-3">버킷별 결론</h3>
            <div className="space-y-3 text-sm text-slate-300">
              <Highlight tone="emerald">
                <p>
                  <strong>① 코어 보유:</strong> ASML은 "monopolistic + secularly growing + high-margin + asset-light"의
                  교과서적 결합. 10년+ 보유 시 EUV/High-NA/Hyper-NA 사이클을 모두 캡처. 현재 가이던스(2026 €34–39B → 2030
                  €44–60B 시나리오)는 보수적 가정에도 <strong>연 10–12% top-line CAGR</strong> 시사.
                </p>
              </Highlight>
              <Highlight tone="amber">
                <p>
                  <strong>② 진입 타이밍:</strong> EUV 매출은 내재적으로 사이클이 있음(고객 capex 패턴). 2024년 dip → 2025년
                  반등 → 2026 가이던스 견조 → 2028 High-NA 본격 ramp이 다음 leg. 사이클 dip(매출 YoY -5% 이상, 백로그 €30B
                  이하)에서 <strong>분할 매수가 합리적</strong>.
                </p>
              </Highlight>
              <Highlight tone="rose">
                <p>
                  <strong>③ 모니터링 지표:</strong> ① 백로그/매출 비율(현재 1.2x, 1.0x 이하면 경계), ② IBM 매출 YoY(서비스
                  long-tail), ③ China 매출 비중(40% → 25%로 자연 감소 진행 중), ④ High-NA 출하 대수(2025 5대 → 2027 ~30대
                  목표), ⑤ R&D/매출 비율(현재 14%, 10% 미만은 incremental 해자 약화 신호).
                </p>
              </Highlight>
              <Highlight tone="blue">
                <p>
                  <strong>④ Photolithography 엔지니어 도메인 인사이트:</strong> 사용자께서 9년간 직접 다뤄본 것처럼,
                  ASML 장비는 <strong>fab 안에서 가장 'tweak이 어려운 자산'</strong>이다. fingerprint, focus tilt, slit
                  uniformity 같은 보정은 ASML 엔지니어 없이는 안정화 불가. 이것이 IR 자료에 나오지 않는 진짜 switching cost이며,
                  동시에 <strong>주가 변동성을 견딜 수 있게 해주는 가장 강한 conviction의 근거</strong>이다. '내가 매일 만지는
                  장비를 다른 회사가 만들 수 없다'는 직감은 정확하며, 이는 Buffett의 "circle of competence" 원칙에서 가장
                  모범적인 투자 사례에 해당한다.
                </p>
              </Highlight>
            </div>
          </Card>
        </section>

        <footer className="text-center text-xs text-slate-500 border-t border-slate-800 pt-6">
          <p className="mb-2">
            출처: ASML 6-K filings (SEC), ASML Annual Reports 2023/2024/2025, Reuters, FT, Nikkei Asia, Bloomberg,
            SemiAnalysis, TrendForce, SCMP, Tom's Hardware, EE Times, Bits&Chips, imec, SPIE, AIP, Cymer/LLNL whitepapers,
            TSMC/Samsung/Intel IR, Stiftung Neue Verantwortung DPC 2024.
          </p>
          <p className="text-slate-600">
            본 분석은 사용자(Samsung Electronics 9년 photolithography 엔지니어, 장기 가치투자자)를 위한 교육적 리서치이며
            투자 권유가 아닙니다. 추정·시나리오 수치는 본문에 명시. 작성일: 2026년 5월.
          </p>
        </footer>
      </div>
    </div>
  );
}
