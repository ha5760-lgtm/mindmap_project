import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ScatterChart, Scatter, ZAxis, Cell } from 'recharts';
import { Sparkles, Code2, Brain, Briefcase, Users, AlertTriangle, CheckCircle2, TrendingUp, Zap, Shield, DollarSign, Clock, Target, BookOpen, Rocket, Filter, ChevronRight, Star, Flame, Eye } from 'lucide-react';

export default function ClaudeTrendsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [personaFilter, setPersonaFilter] = useState('all');
  const [validationFilter, setValidationFilter] = useState('all');

  const revenueData = [
    { date: '2025-01', arr: 1 },
    { date: '2025-08', arr: 5 },
    { date: '2025-12', arr: 9 },
    { date: '2026-02', arr: 14 },
    { date: '2026-03', arr: 19 },
    { date: '2026-04', arr: 30 },
  ];

  const productivityData = [
    { metric: 'Claude 사용 비중', before: 28, after: 59 },
    { metric: '생산성 향상 (%)', before: 20, after: 50 },
    { metric: 'PR merge (%)', before: 100, after: 167 },
    { metric: '연속 도구 호출', before: 9.8, after: 21.2 },
  ];

  const costData = [
    { stage: 'Base', cost: 3.0 },
    { stage: '+ Batch', cost: 1.5 },
    { stage: '+ Cache', cost: 0.15 },
    { stage: '+ Haiku', cost: 0.06 },
  ];

  const personaRadar = [
    { feature: 'Claude Code', dev: 95, research: 50, creator: 30, solo: 60, knowledge: 40 },
    { feature: 'Cowork', dev: 30, research: 90, creator: 70, solo: 95, knowledge: 85 },
    { feature: 'Skills', dev: 80, research: 85, creator: 60, solo: 75, knowledge: 70 },
    { feature: 'MCP', dev: 90, research: 70, creator: 50, solo: 80, knowledge: 60 },
    { feature: 'Routines', dev: 60, research: 80, creator: 75, solo: 90, knowledge: 65 },
    { feature: 'Projects', dev: 50, research: 95, creator: 80, solo: 70, knowledge: 90 },
  ];

  const techniques = [
    { name: 'CLAUDE.md 표준화', validation: 95, impact: 90, persona: ['dev', 'research', 'solo'], category: 'validated', desc: 'Boris Cherny ~2.5K 토큰. 팀 공유 + git 커밋' },
    { name: 'git worktree 5-병렬', validation: 90, impact: 85, persona: ['dev'], category: 'validated', desc: 'Boris의 시그니처 패턴. 5개 터미널 + checkout' },
    { name: 'Spec-driven development', validation: 92, impact: 88, persona: ['dev', 'knowledge'], category: 'validated', desc: 'Red Hat: 사양이 곧 코드 품질' },
    { name: 'Verification loop', validation: 95, impact: 95, persona: ['dev'], category: 'validated', desc: 'Boris "가장 중요한 한 가지"' },
    { name: 'Plan Mode → Auto-Accept', validation: 88, impact: 80, persona: ['dev'], category: 'validated', desc: '큰 작업: 합의 후 자동 진행' },
    { name: 'Hooks for non-negotiables', validation: 90, impact: 75, persona: ['dev'], category: 'validated', desc: 'PostToolUse: lint/format 강제' },
    { name: 'financial-services 플러그인', validation: 90, impact: 95, persona: ['research'], category: 'validated', desc: 'DCF, LBO, S&P/FactSet 통합' },
    { name: 'Skills 2.0', validation: 85, impact: 90, persona: ['dev', 'research', 'solo', 'knowledge'], category: 'validated', desc: 'progressive disclosure, A/B 평가' },
    { name: 'Prompt caching (90% 절감)', validation: 95, impact: 95, persona: ['dev', 'research', 'solo'], category: 'validated', desc: '자동 캐싱 (2026-02)' },
    { name: 'Multi-agent (research only)', validation: 75, impact: 90, persona: ['research'], category: 'validated', desc: '+90.2% 단 토큰 15x' },
    { name: '/ultrareview', validation: 85, impact: 85, persona: ['dev'], category: 'validated', desc: 'Anthropic: 16% → 54%' },
    { name: 'Cowork 9-step 투자', validation: 80, impact: 90, persona: ['research'], category: 'validated', desc: 'Adyen 사례 15분' },
    { name: 'Routines (cron + webhook)', validation: 80, impact: 85, persona: ['research', 'solo', 'creator'], category: 'validated', desc: '클라우드 실행' },
    { name: 'Korean MCP 스택', validation: 75, impact: 85, persona: ['solo', 'creator'], category: 'validated', desc: 'Naver/Kakao/TMAP' },
    { name: '4-Level 투자 워크플로', validation: 80, impact: 90, persona: ['research'], category: 'validated', desc: 'Claude.ai → Project → Skills → Cowork' },
    { name: 'Agent Teams', validation: 65, impact: 75, persona: ['dev'], category: 'emerging', desc: '2026-02 — 별개 세션 통신' },
    { name: 'Channels', validation: 50, impact: 70, persona: ['solo', 'creator'], category: 'emerging', desc: 'Telegram/Discord 깨움' },
    { name: 'Voice agents (LiveKit)', validation: 45, impact: 65, persona: ['solo'], category: 'emerging', desc: '공식 plugin' },
    { name: 'Managed Agents', validation: 60, impact: 80, persona: ['dev', 'solo'], category: 'emerging', desc: 'harness를 hosted로' },
    { name: '/loop', validation: 55, impact: 60, persona: ['dev'], category: 'emerging', desc: '/loop 5m /babysit' },
    { name: 'Excel + PPT shared', validation: 70, impact: 70, persona: ['knowledge'], category: 'emerging', desc: 'Excel 분석이 PPT에 자동 반영' },
    { name: '무비판적 vibe coding', validation: 25, impact: 50, persona: ['dev', 'solo'], category: 'hype', desc: 'CodeRabbit 1.7x 결함, XSS 2.74x' },
    { name: 'MCP 5개 동시 활성화', validation: 20, impact: 30, persona: ['dev'], category: 'hype', desc: '25K 사전 소비' },
    { name: 'Output style/persona', validation: 10, impact: 20, persona: ['creator'], category: 'hype', desc: '2026-04 deprecated' },
    { name: '무한 agentic loop', validation: 15, impact: 35, persona: ['dev'], category: 'hype', desc: 'context rot 70/85/90%' },
    { name: 'Multi-agent everywhere', validation: 30, impact: 40, persona: ['dev'], category: 'hype', desc: 'Cognition: coding엔 부적합' },
  ];

  const personas = [
    { id: 'all', name: '전체', icon: Sparkles },
    { id: 'dev', name: '개발자', icon: Code2 },
    { id: 'research', name: '리서처', icon: Brain },
    { id: 'creator', name: '크리에이터', icon: BookOpen },
    { id: 'solo', name: '1인 창업자', icon: Briefcase },
    { id: 'knowledge', name: '지식 노동자', icon: Users },
  ];

  const validationCategories = [
    { id: 'all', name: '전체' },
    { id: 'validated', name: '검증됨' },
    { id: 'emerging', name: '떠오름' },
    { id: 'hype', name: 'Hype 위험' },
  ];

  const filteredTechniques = useMemo(() => {
    return techniques.filter(t => {
      const personaMatch = personaFilter === 'all' || t.persona.includes(personaFilter);
      const validationMatch = validationFilter === 'all' || t.category === validationFilter;
      return personaMatch && validationMatch;
    });
  }, [personaFilter, validationFilter]);

  const top10Actions = [
    { rank: 1, name: 'financial-services + Cowork', roi: 5, time: '2시간', area: '가치투자' },
    { rank: 2, name: 'CLAUDE.md 3개 표준화', roi: 5, time: '3시간', area: '전 영역' },
    { rank: 3, name: 'Korean MCP 스택', roi: 5, time: '1시간', area: '학원/조사' },
    { rank: 4, name: 'git worktree 5-병렬', roi: 4, time: '1시간', area: '사이드' },
    { rank: 5, name: 'Cache+Batch+Haiku 95% 절감', roi: 4, time: '4시간', area: 'LangGraph' },
    { rank: 6, name: '분기 실적 리뷰 Skill', roi: 4, time: '6시간', area: '투자 자동화' },
    { rank: 7, name: 'Cowork 학원 운영', roi: 4, time: '4시간', area: '영어학원' },
    { rank: 8, name: '/ultrareview + Hook', roi: 3, time: '2시간', area: '코딩' },
    { rank: 9, name: 'Routines 시장 리포트', roi: 3, time: '3시간', area: '투자' },
    { rank: 10, name: 'Multi-agent 분기 research', roi: 3, time: '6시간', area: '분기 1회' },
  ];

  const thisWeek = [
    { day: '월', task: 'CLAUDE.md 3개 만들기', detail: '~/work/litho, ~/business/academy, ~/invest', time: '1시간' },
    { day: '수', task: 'financial-services + Adyen 9-step', detail: 'TSM: yfinance → DCF → 메모', time: '2시간' },
    { day: '목', task: 'Korean MCP + 학원 routine', detail: 'zeikar/kimcp + 매일 8시 트렌드', time: '1.5시간' },
    { day: '금', task: 'Prompt caching 검증', detail: 'LangGraph + Haiku 70% 라우팅', time: '1시간' },
    { day: '토', task: 'Boris 5-tab 병렬', detail: '5개 git checkout + iTerm2 알림', time: '2시간' },
  ];

  const tabs = [
    { id: 'overview', name: '개요', icon: Sparkles },
    { id: 'models', name: '모델', icon: Brain },
    { id: 'features', name: '핵심 기능', icon: Zap },
    { id: 'matrix', name: 'Hype × 검증', icon: Target },
    { id: 'persona', name: '페르소나', icon: Users },
    { id: 'security', name: '보안', icon: Shield },
    { id: 'action', name: '실행 계획', icon: Rocket },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100" style={{ fontFamily: '"Pretendard", "Noto Sans KR", -apple-system, sans-serif' }}>
      <div className="border-b border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
            <span className="px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700">REPORT · 2026-05-04</span>
            <span className="hidden sm:inline">함영민님 맞춤 전략 보고서</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-violet-300 via-indigo-300 to-cyan-300 bg-clip-text text-transparent leading-tight">
            Claude 생산성 트렌드 2026
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 mt-3 max-w-3xl">
            2025년 말 ~ 2026년 5월의 검증된 패턴, 떠오르는 트렌드, Hype 함정을 균형있게.
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="px-3 py-1 rounded-full text-xs bg-violet-950/50 border border-violet-800/50 text-violet-300">Claude Code</span>
            <span className="px-3 py-1 rounded-full text-xs bg-indigo-950/50 border border-indigo-800/50 text-indigo-300">Claude.ai</span>
            <span className="px-3 py-1 rounded-full text-xs bg-cyan-950/50 border border-cyan-800/50 text-cyan-300">Agent SDK</span>
            <span className="px-3 py-1 rounded-full text-xs bg-emerald-950/50 border border-emerald-800/50 text-emerald-300">MCP</span>
            <span className="px-3 py-1 rounded-full text-xs bg-amber-950/50 border border-amber-800/50 text-amber-300">Skills 2.0</span>
            <span className="px-3 py-1 rounded-full text-xs bg-pink-950/50 border border-pink-800/50 text-pink-300">Cowork</span>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-20 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    activeTab === tab.id 
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  <Icon size={14} />
                  {tab.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-violet-950/40 to-indigo-950/40 border border-violet-800/30 p-5 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Flame size={18} className="text-amber-400" />
                <h2 className="text-lg font-semibold">한 줄 요약</h2>
              </div>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed">
                <span className="text-violet-300 font-medium">2026년 Claude 생태계의 진짜 변화는 모델이 아니라 "harness 엔지니어링"</span>이다. 
                Skills + Plugins + Agent Teams + Routines가 합쳐지면서 "프롬프트 잘 쓰기"에서 
                <span className="text-cyan-300"> "context를 어떻게 적재/격리/검증하는가"</span>로 생산성의 축이 이동했다. 
                Anthropic 자체 측정 PR merge 처리량 <span className="text-emerald-400 font-mono">+67%</span>, 
                도구 호출 체인 <span className="text-emerald-400 font-mono">9.8 → 21.2회</span>.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <KPICard icon={DollarSign} label="Anthropic ARR" value="$30B" sub="2026-04, vs $1B (2025-01)" color="emerald" />
              <KPICard icon={Code2} label="Claude Code 매출" value="$2.5B+" sub="WAU 6주만에 2배" color="violet" />
              <KPICard icon={Zap} label="비용 절감 가능" value="95%" sub="Cache+Batch+Haiku 스택" color="cyan" />
              <KPICard icon={TrendingUp} label="한국 사용 순위" value="Top 5" sub="Anthropic Economic Index" color="amber" />
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className="font-semibold text-zinc-100">Anthropic 매출 궤적</h3>
                  <p className="text-xs text-zinc-500 mt-0.5">15개월 만에 30배 — AI 인프라 capex 사이클 핵심 지표</p>
                </div>
                <span className="text-xs text-zinc-600">출처: Bloomberg</span>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="date" stroke="#71717a" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#71717a" style={{ fontSize: '11px' }} unit="B" />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }} />
                  <Line type="monotone" dataKey="arr" stroke="#a78bfa" strokeWidth={3} dot={{ fill: '#a78bfa', r: 5 }} activeDot={{ r: 7 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h3 className="font-semibold text-zinc-100 mb-1">Anthropic 내부 생산성 (12개월)</h3>
              <p className="text-xs text-zinc-500 mb-4">132 엔지니어 설문 + 200,000 transcript 분석</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={productivityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis type="number" stroke="#71717a" style={{ fontSize: '11px' }} />
                  <YAxis type="category" dataKey="metric" stroke="#71717a" style={{ fontSize: '10px' }} width={120} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="before" fill="#52525b" name="이전" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="after" fill="#a78bfa" name="현재" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <InsightCard 
                icon={CheckCircle2} 
                color="emerald" 
                title="검증된 5가지" 
                items={[
                  "CLAUDE.md ~2.5K 토큰 + git 커밋",
                  "git worktree 5-병렬 (Boris 본인)",
                  "Skills + Hooks + Subagents 3-layer",
                  "Prompt caching 90% 절감",
                  "/ultrareview — PR 리뷰 16% → 54%"
                ]} 
              />
              <InsightCard 
                icon={AlertTriangle} 
                color="rose" 
                title="피해야 할 5가지" 
                items={[
                  "무비판적 vibe coding (1.7x 결함)",
                  "MCP 5개 동시 (25K 사전 소비)",
                  "Multi-agent everywhere (Cognition 경고)",
                  "Sonnet 5/Opus 5 떡밥 추격",
                  "Output style 만지작 (deprecated)"
                ]} 
              />
            </div>
          </div>
        )}

        {activeTab === 'models' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-2">모델 라인업 (2026년 5월)</h2>
              <p className="text-sm text-zinc-400 mb-4">가격 · 속도 · 코딩 능력의 trade-off</p>
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <table className="w-full text-sm min-w-[600px]">
                  <thead className="text-xs text-zinc-500 border-b border-zinc-800">
                    <tr>
                      <th className="text-left py-2 px-3">모델</th>
                      <th className="text-right py-2 px-3">$/M in</th>
                      <th className="text-right py-2 px-3">$/M out</th>
                      <th className="text-right py-2 px-3">SWE</th>
                      <th className="text-left py-2 px-3">영민님 용도</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Haiku 4.5', in: '$1', out: '$5', swe: '73.3%', use: '학원 CS, 분류, 시세, 서브에이전트', color: '#10b981' },
                      { name: 'Sonnet 4.5', in: '$3', out: '$15', swe: '77.2%', use: '일상 코딩, 문서 분석', color: '#3b82f6' },
                      { name: 'Sonnet 4.6', in: '$3', out: '$15', swe: '~80%', use: '대형 코드베이스 (1M context)', color: '#6366f1' },
                      { name: 'Opus 4.5', in: '$5', out: '$25', swe: '~82%', use: '복잡 추론, deep research', color: '#a855f7' },
                      { name: 'Opus 4.6', in: '$5', out: '$25', swe: '~84%', use: '장기 horizon agent', color: '#c026d3' },
                      { name: 'Opus 4.7', in: '$5', out: '$25', swe: '~86%', use: '/ultrareview, 마이그레이션', color: '#e11d48' },
                    ].map((m, i) => (
                      <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                        <td className="py-3 px-3 font-medium" style={{ color: m.color }}>{m.name}</td>
                        <td className="text-right py-3 px-3 font-mono text-zinc-300">{m.in}</td>
                        <td className="text-right py-3 px-3 font-mono text-zinc-300">{m.out}</td>
                        <td className="text-right py-3 px-3 font-mono text-zinc-400">{m.swe}</td>
                        <td className="py-3 px-3 text-xs text-zinc-400">{m.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h3 className="font-semibold mb-2">비용 스택 시뮬레이션</h3>
              <p className="text-xs text-zinc-500 mb-3">Sonnet 4.5 base $3/M → 95% 절감</p>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={costData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis dataKey="stage" stroke="#71717a" style={{ fontSize: '11px' }} />
                  <YAxis stroke="#71717a" style={{ fontSize: '11px' }} unit="$" />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }} />
                  <Bar dataKey="cost" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-xl bg-amber-950/20 border border-amber-800/30 p-4 sm:p-5">
              <div className="flex gap-3">
                <Star size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-amber-200 mb-1">영민님 권장 라우팅 (70/20/10)</p>
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    <span className="text-emerald-300">Haiku 70%</span> (분류·추출·일상 응대) → 
                    <span className="text-blue-300"> Sonnet 20%</span> (코딩·문서) → 
                    <span className="text-purple-300"> Opus 10%</span> (분기 deep research). 
                    실제 사례: $80/월 → $24/월 (70% 절감).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-1">Claude Code 핵심 12 기능</h2>
              <p className="text-sm text-zinc-400 mb-5">2024-11 MCP부터 2026-04 Routines까지의 진화</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { num: 1, name: 'MCP', date: '2024-11', desc: '외부 도구 연결, 권한 모델', hot: false },
                  { num: 2, name: 'Subagents', date: '2025-07', desc: '병렬 탐색, isolated context', hot: false },
                  { num: 3, name: 'Hooks', date: '2025-09', desc: 'Pre/Post tool, 약 24종', hot: false },
                  { num: 4, name: 'Plugins', date: '2025-10', desc: 'Skills+hooks+subagents 1-click', hot: true },
                  { num: 5, name: 'Skills 2.0', date: '2025-10', desc: 'progressive disclosure', hot: true },
                  { num: 6, name: 'Plan Mode', date: '2025 후반', desc: '합의 → Auto-Accept', hot: false },
                  { num: 7, name: 'Agent Teams', date: '2026-02', desc: 'Subagents 간 메시지 가능', hot: true },
                  { num: 8, name: '--worktree', date: '2026 초', desc: '충돌 없이 5-병렬', hot: true },
                  { num: 9, name: '/loop', date: '2026 초', desc: '/loop 5m /babysit', hot: false },
                  { num: 10, name: 'Routines', date: '2026-04', desc: 'cron + webhook 클라우드', hot: true },
                  { num: 11, name: 'Channels', date: '2026 RP', desc: 'Telegram/Discord 깨움', hot: true },
                  { num: 12, name: 'Skill-creator', date: '2026-01', desc: 'Skills 자동 최적화', hot: false },
                ].map(f => (
                  <div key={f.num} className="rounded-lg bg-zinc-800/40 border border-zinc-700/50 p-3 hover:border-violet-700/50 transition">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-zinc-600 font-mono w-6">#{f.num}</span>
                      <span className="font-medium text-zinc-100">{f.name}</span>
                      {f.hot && <Flame size={12} className="text-amber-400" />}
                      <span className="text-xs text-zinc-600 ml-auto">{f.date}</span>
                    </div>
                    <p className="text-xs text-zinc-400 ml-8">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h3 className="text-lg font-bold mb-1">5단계 Context 계층 (2026 표준)</h3>
              <p className="text-sm text-zinc-400 mb-4">Context Engineering = 결과 품질의 60%</p>
              <div className="space-y-2">
                {[
                  { layer: 'Always resident', name: 'CLAUDE.md', desc: '프로젝트 계약, 빌드 명령', color: 'bg-violet-600', size: '~2.5K' },
                  { layer: 'Path-loaded', name: 'Rules', desc: '언어/디렉토리/파일 종류별', color: 'bg-indigo-600', size: '동적' },
                  { layer: 'On-demand', name: 'Skills', desc: 'description만 시스템, 호출 시 fetch', color: 'bg-cyan-600', size: '필요시' },
                  { layer: 'Isolated', name: 'Subagents', desc: 'heavy 탐색, 병렬 리서치', color: 'bg-emerald-600', size: '독립' },
                  { layer: 'Never in context', name: 'Hooks', desc: '결정론적 스크립트, 차단', color: 'bg-amber-600', size: '0 토큰' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                    <div className={`w-1 h-12 rounded ${l.color}`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-zinc-500 uppercase tracking-wide">{l.layer}</span>
                        <span className="font-semibold text-zinc-100">{l.name}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">{l.desc}</p>
                    </div>
                    <span className="text-xs text-zinc-500 font-mono shrink-0">{l.size}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-rose-950/20 border border-rose-800/30">
                <p className="text-xs text-rose-300">
                  ⚠️ <span className="font-semibold">Context rot 임계점:</span> 70% 정밀도 하락 · 85% 환각 증가 · 90% erratic. 
                  /compact 또는 /clear 강제. 5개 MCP 동시 = 25K(12.5%) 사전 소비.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-blue-950/30 to-indigo-950/30 border border-blue-800/30 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={18} className="text-blue-400" />
                <h3 className="font-bold text-blue-100">Boris Cherny 본인의 워크플로</h3>
              </div>
              <p className="text-xs text-blue-200/70 mb-4">Anthropic Head of Claude Code · 2026-01-02 thread, 8M views</p>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  '터미널 5개 동시, 각각 별도 git checkout (worktree X). iTerm2 알림.',
                  'claude.ai/code 브라우저 5-10개. --teleport로 모바일 ↔ 데스크탑.',
                  'Opus 4.5 + thinking을 거의 모든 코딩에 (속도보다 품질).',
                  'CLAUDE.md ~2.5K. PR에 @.claude 태그로 학습사항 누적.',
                  '--dangerously-skip-permissions 거의 안 씀. /permissions 사전 허용.',
                  '"가장 중요한 한 가지: Claude에게 자기 결과 검증 수단 주기."',
                ].map((tip, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-blue-400 shrink-0">▸</span>
                    <p className="text-zinc-300 leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-blue-200/50 mt-4 italic">
                "시작한 세션의 10-20%는 잘 안 풀려서 폐기한다." — Boris Cherny
              </p>
            </div>
          </div>
        )}

        {activeTab === 'matrix' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-2">기술 매트릭스 — Hype × 검증도</h2>
              <p className="text-sm text-zinc-400 mb-5">26개 기술 · 페르소나 + 검증도 필터링</p>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter size={14} className="text-zinc-500" />
                  <span className="text-xs text-zinc-500 mr-1">페르소나:</span>
                  {personas.map(p => {
                    const Icon = p.icon;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPersonaFilter(p.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition ${
                          personaFilter === p.id 
                            ? 'bg-violet-600 text-white' 
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                        }`}
                      >
                        <Icon size={12} />
                        {p.name}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter size={14} className="text-zinc-500" />
                  <span className="text-xs text-zinc-500 mr-1">검증도:</span>
                  {validationCategories.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setValidationFilter(c.id)}
                      className={`px-2.5 py-1 rounded-full text-xs transition ${
                        validationFilter === c.id 
                          ? c.id === 'validated' ? 'bg-emerald-600 text-white' : c.id === 'emerging' ? 'bg-amber-600 text-white' : c.id === 'hype' ? 'bg-rose-700 text-white' : 'bg-zinc-700 text-white'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <ResponsiveContainer width="100%" height={350}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                  <XAxis 
                    type="number" 
                    dataKey="validation" 
                    name="검증도" 
                    domain={[0, 100]}
                    stroke="#71717a" 
                    style={{ fontSize: '11px' }}
                    label={{ value: '검증도 →', position: 'bottom', fill: '#71717a', style: { fontSize: 11 } }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="impact" 
                    name="영향력" 
                    domain={[0, 100]}
                    stroke="#71717a" 
                    style={{ fontSize: '11px' }}
                    label={{ value: '영향력 →', angle: -90, position: 'insideLeft', fill: '#71717a', style: { fontSize: 11 } }}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', fontSize: '12px' }}
                    content={({ payload }) => {
                      if (payload && payload[0]) {
                        const d = payload[0].payload;
                        return (
                          <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-2 max-w-xs">
                            <p className="font-semibold text-sm">{d.name}</p>
                            <p className="text-xs text-zinc-400 mt-1">{d.desc}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter data={filteredTechniques}>
                    {filteredTechniques.map((entry, i) => (
                      <Cell 
                        key={i} 
                        fill={entry.category === 'validated' ? '#10b981' : entry.category === 'emerging' ? '#f59e0b' : '#f43f5e'} 
                      />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-2 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className="text-zinc-400">검증됨 ({techniques.filter(t => t.category === 'validated').length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-zinc-400">떠오름 ({techniques.filter(t => t.category === 'emerging').length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <span className="text-zinc-400">Hype 위험 ({techniques.filter(t => t.category === 'hype').length})</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-zinc-500 px-1">필터 결과: {filteredTechniques.length}개</p>
              {filteredTechniques.map((t, i) => (
                <div 
                  key={i} 
                  className={`rounded-xl border p-4 transition ${
                    t.category === 'validated' ? 'bg-emerald-950/15 border-emerald-800/30 hover:border-emerald-700/50' :
                    t.category === 'emerging' ? 'bg-amber-950/15 border-amber-800/30 hover:border-amber-700/50' :
                    'bg-rose-950/15 border-rose-800/30 hover:border-rose-700/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`shrink-0 w-1 h-12 rounded ${
                      t.category === 'validated' ? 'bg-emerald-500' :
                      t.category === 'emerging' ? 'bg-amber-500' :
                      'bg-rose-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h4 className="font-semibold text-zinc-100">{t.name}</h4>
                        <div className="flex gap-1.5 flex-wrap shrink-0">
                          {t.persona.map(p => {
                            const persona = personas.find(x => x.id === p);
                            if (!persona) return null;
                            return (
                              <span key={p} className="text-xs px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                                {persona.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-400 mt-1.5 leading-relaxed">{t.desc}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                        <span>검증도 {t.validation}</span>
                        <span>·</span>
                        <span>영향력 {t.impact}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'persona' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h2 className="text-xl font-bold mb-2">페르소나별 기능 활용 강도</h2>
              <p className="text-sm text-zinc-400 mb-4">5개 페르소나 × 6개 핵심 기능</p>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={personaRadar}>
                  <PolarGrid stroke="#3f3f46" />
                  <PolarAngleAxis dataKey="feature" stroke="#a1a1aa" style={{ fontSize: '11px' }} />
                  <PolarRadiusAxis stroke="#52525b" style={{ fontSize: '10px' }} />
                  <Radar name="개발자" dataKey="dev" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} />
                  <Radar name="리서처" dataKey="research" stroke="#a855f7" fill="#a855f7" fillOpacity={0.15} />
                  <Radar name="크리에이터" dataKey="creator" stroke="#ec4899" fill="#ec4899" fillOpacity={0.15} />
                  <Radar name="1인 창업자" dataKey="solo" stroke="#f97316" fill="#f97316" fillOpacity={0.15} />
                  <Radar name="지식노동자" dataKey="knowledge" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.15} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: Code2, color: 'blue', name: '개발자', hot: 'git worktree 5-병렬, Spec-driven, /ultrareview', warn: 'vibe coding 프로덕션 (1.7x 결함)' },
                { icon: Brain, color: 'purple', name: '리서처', hot: 'financial-services 플러그인, Cowork 9-step', warn: '세션 간 메모리 없음 → running document' },
                { icon: BookOpen, color: 'pink', name: '크리에이터', hot: 'Cowork article 분석, 한국어 톤 모방', warn: '페르소나 프롬프트로 정중한 거부 덮기' },
                { icon: Briefcase, color: 'orange', name: '1인 창업자', hot: 'Cowork 영수증, Routines 학부모 카톡', warn: '카톡 자동 응답 = injection 표면' },
                { icon: Users, color: 'cyan', name: '지식노동자', hot: 'Excel + PPT shared, Skills brand', warn: 'Cowork desktop only (Linux X)' },
                { icon: Sparkles, color: 'violet', name: '비기술자', hot: 'Atlassian/Box/Notion Skills, native install', warn: '권한 모델 이해 필수' },
              ].map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="rounded-xl bg-zinc-900/40 border border-zinc-800 p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={18} className={`text-${p.color}-400`} />
                      <h3 className="font-semibold">{p.name}</h3>
                    </div>
                    <div className="space-y-2.5">
                      <div>
                        <p className="text-xs text-emerald-400 font-medium mb-1">🔥 핫 트렌드</p>
                        <p className="text-xs text-zinc-300 leading-relaxed">{p.hot}</p>
                      </div>
                      <div>
                        <p className="text-xs text-rose-400 font-medium mb-1">⚠️ 주의</p>
                        <p className="text-xs text-zinc-400 leading-relaxed">{p.warn}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-xl bg-gradient-to-br from-rose-950/30 to-pink-950/30 border border-rose-800/30 p-4 sm:p-6">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <span>🇰🇷</span> 한국 사용자 인사이트
              </h3>
              <div className="space-y-3 text-sm">
                <p className="text-zinc-300 leading-relaxed">
                  Anthropic 공식: <span className="text-rose-300">"Korean users are among Claude's most active globally, ranking in the top five"</span>. 
                  Claude Code 한국 WAU <span className="font-mono text-emerald-400">6배 증가 (4개월)</span>. 
                  <span className="text-rose-300">현재 글로벌 1위 Claude Code 사용자가 한국 개발자.</span>
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  <span className="text-amber-300 font-semibold">2026-04-27 KED Global:</span> "한국 유료 생성형 AI 시장에서 처음으로 Claude가 ChatGPT 추월".
                </p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  <div className="bg-zinc-900/40 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 mb-1">공식 레퍼런스 고객</p>
                    <p className="text-sm text-zinc-200">SK Telecom, Law&Company (변호사 효율 1.7배)</p>
                  </div>
                  <div className="bg-zinc-900/40 rounded-lg p-3">
                    <p className="text-xs text-zinc-500 mb-1">한국 특화 MCP</p>
                    <p className="text-sm text-zinc-200 font-mono text-xs">zeikar/kimcp · isnow890/naver-search-mcp · winterjung/mcp-korean-spell</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-rose-950/20 border border-rose-800/40 p-4 sm:p-6">
              <div className="flex items-start gap-3">
                <Shield size={24} className="text-rose-400 shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-rose-100">보안 — 영민님이 무조건 알아야 할 것</h2>
                  <p className="text-sm text-rose-200/70 mt-1">2025-12 ~ 2026-04 발견된 주요 위협</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                { name: 'Prompt injection — Claudy Day', source: 'Oasis Security 2026-03', scope: 'claude.ai default 세션 — MCP 없이도 history 탈취', fix: 'URL 파라미터 신뢰 X, 패치 버전 사용', severity: 'critical' },
                { name: 'MCP RCE (4 attack family)', source: 'OX Security 2026', scope: 'MCP SDK 전체. 200K vulnerable instances. 150M+ download 영향.', fix: '공식 GitHub MCP Registry만, typosquatting 주의', severity: 'critical' },
                { name: 'Hooks/Settings injection', source: 'Check Point', scope: 'untrusted repo → .claude/settings.json hook 자동 실행', fix: '처음 보는 repo는 시작 전 검사', severity: 'high' },
                { name: 'Skill supply chain', source: '커뮤니티 분석', scope: '24 CVE, 655 malicious skill 보고', fix: '신뢰 마켓플레이스 + 코드 리뷰', severity: 'high' },
                { name: 'Excessive agency (OWASP LLM06)', source: 'OWASP', scope: '권한 과다 부여', fix: 'least-privilege MCP, /permissions 사전 허용', severity: 'medium' },
                { name: 'CVE-2025-54794/54795', source: 'CVSS 7.7/8.7', scope: 'path bypass, command injection', fix: '패치됨 — 최신 버전', severity: 'medium' },
              ].map((threat, i) => (
                <div key={i} className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4">
                  <div className="flex items-start gap-3">
                    <div className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${
                      threat.severity === 'critical' ? 'bg-rose-900/50 text-rose-300 border border-rose-800' :
                      threat.severity === 'high' ? 'bg-orange-900/50 text-orange-300 border border-orange-800' :
                      'bg-amber-900/50 text-amber-300 border border-amber-800'
                    }`}>
                      {threat.severity.toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-zinc-100">{threat.name}</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">{threat.source}</p>
                      <p className="text-sm text-zinc-300 mt-2">{threat.scope}</p>
                      <div className="flex items-start gap-2 mt-2 p-2 rounded-lg bg-emerald-950/20 border border-emerald-800/30">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-emerald-200">{threat.fix}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl bg-amber-950/20 border border-amber-800/30 p-4 sm:p-6">
              <h3 className="font-bold mb-3 text-amber-100">📊 AI vs 인간 코드 (CodeRabbit 2025-12-17)</h3>
              <p className="text-xs text-amber-200/70 mb-4">470 PR 분석 — David Loker (Director of AI)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="bg-zinc-900/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-rose-400">1.7x</p>
                  <p className="text-xs text-zinc-400 mt-1">major 이슈</p>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-rose-500">2.74x</p>
                  <p className="text-xs text-zinc-400 mt-1">XSS 취약점</p>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3 text-center col-span-2 sm:col-span-1">
                  <p className="text-2xl font-bold text-orange-400">1.5-2x</p>
                  <p className="text-xs text-zinc-400 mt-1">전체 보안 취약점</p>
                </div>
              </div>
              <p className="text-sm text-zinc-300 mt-4 italic leading-relaxed">
                "AI coding tools dramatically increase output, but they also introduce predictable, measurable weaknesses."
              </p>
            </div>

            <div className="rounded-xl bg-emerald-950/20 border border-emerald-800/30 p-4 sm:p-6">
              <h3 className="font-bold mb-3 text-emerald-100 flex items-center gap-2">
                <CheckCircle2 size={18} /> 보안 기준선 (영민님 기본 설정)
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  '/permissions로 자주 쓰는 안전 명령 사전 허용 → --dangerously-skip-permissions 절대 금지',
                  'PostToolUse hook으로 자동 lint/format',
                  'Stop hook으로 audit log 작성',
                  '--worktree 격리로 main checkout 보호',
                  '1시간 cache TTL은 base input의 2x — 비용 모니터링',
                  'MCP는 필요할 때만 활성화 (5개 동시 = 25K 사전 소비)',
                ].map((item, i) => (
                  <div key={i} className="flex gap-2 text-zinc-300">
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'action' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-gradient-to-br from-violet-950/40 to-indigo-950/40 border border-violet-700/40 p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-1">
                <Rocket size={20} className="text-violet-300" />
                <h2 className="text-xl font-bold">이번 주 시도해볼 5가지</h2>
              </div>
              <p className="text-sm text-violet-200/70 mb-5">월~토 일정. 즉시 실행. 누적 ~7.5시간.</p>
              <div className="space-y-3">
                {thisWeek.map((d, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-zinc-900/60 border border-zinc-700/50">
                    <div className="shrink-0 w-10 h-10 rounded-lg bg-violet-600/20 border border-violet-600/40 flex items-center justify-center">
                      <span className="text-violet-300 font-bold text-sm">{d.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h4 className="font-semibold text-zinc-100">{d.task}</h4>
                        <span className="text-xs text-zinc-500 shrink-0 font-mono">{d.time}</span>
                      </div>
                      <p className="text-xs text-zinc-400 mt-1 font-mono">{d.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h3 className="text-lg font-bold mb-1">Top 10 우선순위 액션</h3>
              <p className="text-sm text-zinc-400 mb-4">함영민님 프로필 기준 ROI 정렬</p>
              <div className="space-y-2">
                {top10Actions.map((a, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30 hover:border-violet-700/50 transition">
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      a.rank <= 3 ? 'bg-amber-900/50 text-amber-300 border border-amber-700' :
                      a.rank <= 6 ? 'bg-violet-900/40 text-violet-300 border border-violet-700/50' :
                      'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }`}>
                      {a.rank}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <h4 className="font-medium text-zinc-100 text-sm">{a.name}</h4>
                        <div className="flex items-center gap-2 shrink-0">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={10} className={j < a.roi ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'} />
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 mt-1 text-xs text-zinc-500">
                        <span><Clock size={10} className="inline mr-1" />{a.time}</span>
                        <span>·</span>
                        <span>{a.area}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-zinc-900/50 border border-zinc-800 p-4 sm:p-6">
              <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                <Target size={18} className="text-cyan-400" /> 결정 임계치
              </h3>
              <p className="text-sm text-zinc-400 mb-4">이걸 보면 다음 단계로</p>
              <div className="space-y-2.5">
                {[
                  { trigger: 'Cache hit rate > 70%', action: '1시간 TTL + Batch API 추가' },
                  { trigger: 'Routine 3개 안정 운영', action: 'Anthropic Managed Agents 신청' },
                  { trigger: '한 분기 Skills 5개 자체 제작', action: '커뮤니티 marketplace 게시' },
                  { trigger: 'Cowork 월 10시간+ 절약', action: 'Max 5x ($100/월) 업그레이드' },
                  { trigger: 'LangGraph 동일 시스템 프롬프트', action: '즉시 cache_control (90% 절감)' },
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-zinc-800/30 border border-zinc-700/30">
                    <ChevronRight size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <div className="flex-1 text-sm">
                      <span className="text-zinc-200">{r.trigger}</span>
                      <span className="text-zinc-500 mx-2">→</span>
                      <span className="text-cyan-300">{r.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-emerald-950/30 to-teal-950/30 border border-emerald-800/30 p-4 sm:p-6">
              <h3 className="font-bold mb-2 text-emerald-100">💡 영민님의 LangGraph 자산 활용</h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                이미 LangGraph 사용 중이시라면, Claude Agent SDK의 query()가 LangGraph의 StateGraph와 
                <span className="text-emerald-300 font-medium"> 보완 관계</span>입니다.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                <div className="bg-zinc-900/50 rounded-lg p-3">
                  <p className="text-xs text-emerald-400 font-medium mb-1">LangGraph 우월</p>
                  <p className="text-xs text-zinc-300">단계 정해진 워크플로 — 데이터 → DCF → 시나리오 → 메모</p>
                </div>
                <div className="bg-zinc-900/50 rounded-lg p-3">
                  <p className="text-xs text-cyan-400 font-medium mb-1">Agent SDK 우월</p>
                  <p className="text-xs text-zinc-300">탐색적 리서치 — breadth-first 분기 답변</p>
                </div>
              </div>
              <p className="text-sm text-emerald-200 mt-4 font-medium">
                결론: LangGraph는 버리지 마세요. Skills로 Claude Code 안에서 LangGraph 호출하는 hybrid가 2026 표준.
              </p>
            </div>

            <div className="rounded-xl bg-zinc-900/30 border border-zinc-800 p-4 sm:p-6">
              <h3 className="font-bold mb-2 flex items-center gap-2 text-zinc-300">
                <Eye size={16} /> 정직한 한계 (Caveats)
              </h3>
              <div className="space-y-1.5 text-xs text-zinc-500">
                {[
                  '시점: 2026-05-04 기준. Anthropic은 2-3주마다 새 기능 출시',
                  'Skills 2.0 측정은 Anthropic 자체 — 50% discount 권장',
                  'CodeRabbit 470 PR 분석은 트렌드 방향성으로만',
                  'Multi-agent 90.2%는 research eval 한정',
                  '한국 enterprise 공식: SK Telecom, Law&Company만 명명',
                  '가격은 모델 업데이트마다 변동',
                ].map((c, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-zinc-700">·</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-600">
          <p>함영민님 맞춤 전략 보고서 · 2026-05-04 작성</p>
          <p className="mt-1">Sources: Anthropic Engineering Blog · Bloomberg · CodeRabbit · OX Security · KED Global</p>
        </div>
      </div>
    </div>
  );
}

function KPICard({ icon: Icon, label, value, sub, color }) {
  const colors = {
    emerald: 'from-emerald-950/40 to-emerald-900/20 border-emerald-800/30',
    violet: 'from-violet-950/40 to-violet-900/20 border-violet-800/30',
    cyan: 'from-cyan-950/40 to-cyan-900/20 border-cyan-800/30',
    amber: 'from-amber-950/40 to-amber-900/20 border-amber-800/30',
  };
  const iconColors = {
    emerald: 'text-emerald-400',
    violet: 'text-violet-400',
    cyan: 'text-cyan-400',
    amber: 'text-amber-400',
  };
  return (
    <div className={`rounded-xl bg-gradient-to-br ${colors[color]} border p-3 sm:p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={14} className={iconColors[color]} />
        <span className="text-xs text-zinc-500">{label}</span>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-zinc-100">{value}</p>
      <p className="text-xs text-zinc-500 mt-1">{sub}</p>
    </div>
  );
}

function InsightCard({ icon: Icon, color, title, items }) {
  const colors = {
    emerald: 'bg-emerald-950/20 border-emerald-800/30 text-emerald-300',
    rose: 'bg-rose-950/20 border-rose-800/30 text-rose-300',
  };
  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${colors[color]}`}>
      <div className="flex items-center gap-2 mb-3">
        <Icon size={18} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-sm text-zinc-300 flex gap-2">
            <span className="text-zinc-500 shrink-0">{i + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
