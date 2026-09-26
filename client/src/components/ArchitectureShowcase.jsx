import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Network, Server, Cpu, Repeat, Database, ShieldCheck, 
  Zap, CheckCircle2, ArrowRight, Terminal, Layers, Activity, Sparkles 
} from 'lucide-react';
import { soundFX } from '../utils/audio';

const iconMap = { Server, Cpu, Repeat, Database, ShieldCheck };

export default function ArchitectureShowcase({ data, isReduced }) {
  const [activeStep, setActiveStep] = useState(0);
  const [activeTab, setActiveTab] = useState('code'); // 'code' | 'strategy'

  const defaultNodes = [
    {
      step: "01",
      id: "ingestion",
      title: "API Gateway & Secure Ingestion",
      shortTitle: "API Ingestion",
      subtitle: "Token Authentication, Rate Limiting & OpenAPI Spec",
      icon: Server,
      badge: "Ingestion Tier",
      metricLabel: "Target Latency",
      metricValue: "< 35ms",
      reliability: "99.9% Uptime",
      overview: "Serves as the resilient entry barrier for all external clients, hardware scanners (USB/Camera barcodes), and vendor integrations. Enforces strict parameter sanitation, CORS policy, and token authorization before requests touch the application core.",
      mechanisms: [
        { label: "Token-Based Authentication", desc: "Securing versioned RESTful routes with sanitized bearer tokens and granular role-based permissions." },
        { label: "Rate Limiting & Throttle Middleware", desc: "Guarding against burst traffic and DDoS attacks with Redis-backed throttle limiters (60 req/min per IP)." },
        { label: "Strict Schema Contract Validation", desc: "Decoupled Laravel FormRequest classes validating headers, payloads, and data types before controller execution." }
      ],
      techStack: ["RESTful API v1", "Swagger / OpenAPI", "Postman", "Bearer Tokens", "Throttle Middleware"],
      codeSnippet: `// app/Http/Requests/OrderIngestionRequest.php
public function authorize(): bool {
    return $this->user()->tokenCan('orders:create');
}

public function rules(): array {
    return [
        'order_ref'    => ['required', 'string', 'unique:orders,order_ref'],
        'barcode_data' => ['required', 'array', 'min:1'],
        'tenant_id'    => ['required', 'integer', 'exists:tenants,id']
    ];
}`,
      impact: "Prevents malformed data from penetrating the database, eliminates injection risks, and ensures predictable API payload ingestion across vendor hardware."
    },
    {
      step: "02",
      id: "core",
      title: "Laravel Core & Clean Architecture",
      shortTitle: "Laravel Core",
      subtitle: "PSR-12 Standards, SOLID Principles & Eloquent Optimization",
      icon: Cpu,
      badge: "Application Core",
      metricLabel: "Query Overhead",
      metricValue: "0 (N+1 Free)",
      reliability: "PSR-12 Verified",
      overview: "The processing heart of the application built on PHP 8.x and Laravel. Follows clean architecture by isolating business logic into dedicated Service and Repository layers, eliminating controller bloat.",
      mechanisms: [
        { label: "Elimination of N+1 Bottlenecks", desc: "Strictly requiring Eloquent Eager Loading (with(['relations'])) on all relational collections, slashing DB roundtrips from 100+ down to 2." },
        { label: "Service Layer Decoupling", desc: "Extracting complex calculations (tax calculation, attendee metrics, order totals) into pure testable domain services." },
        { label: "Dependency Injection & IoC", desc: "Binding repository interfaces to concrete implementations in Laravel's service container for testability and maintainability." }
      ],
      techStack: ["PHP 8.x", "Laravel", "Eloquent ORM", "Artisan CLI", "SOLID Design", "Service Layers"],
      codeSnippet: `// app/Services/AnalyticsService.php
public function getEventMetrics(int $eventId): EventDashboardDTO {
    // Eager load nested relations to completely eliminate N+1 queries
    $event = $this->eventRepo->findWithRelations($eventId, [
        'attendees.sessions',
        'metrics.growthIndicators'
    ]);
    
    return $this->calculator->computeEngagement($event);
}`,
      impact: "Dramatically cut database query counts by 85% across heavy dashboard endpoints and ensured a clean, scalable codebase."
    },
    {
      step: "03",
      id: "queues",
      title: "Asynchronous Redis Queues & Daemons",
      shortTitle: "Redis Queues",
      subtitle: "Non-Blocking Job Offloading & Batch Reconciliation",
      icon: Repeat,
      badge: "Async Processing",
      metricLabel: "Throughput",
      metricValue: "10k+ jobs/min",
      reliability: "Fault Tolerant",
      overview: "High-latency and resource-intensive operations are completely decoupled from the synchronous HTTP request/response cycle. Operations are pushed to Redis queues and processed by dedicated background workers.",
      mechanisms: [
        { label: "Non-Blocking Order Dispatch", desc: "External syncs, email dispatches, and inventory reconciliations are queued, responding to clients in under 50ms." },
        { label: "Exponential Backoff & Retries", desc: "Configured with retry backoff policies ($tries = 3, $backoff = [30, 90, 300]) and failover to dead-letter queues." },
        { label: "Supervised Worker Daemons", desc: "Background queue listeners supervised by system daemons, ensuring zero downtime even during high-burst spikes." }
      ],
      techStack: ["Redis Queues", "Worker Daemons", "Job Scheduling", "Supervisord", "Batch Processing"],
      codeSnippet: `// app/Jobs/ProcessBatchReconciliation.php
class ProcessBatchReconciliation implements ShouldQueue {
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $timeout = 120;
    public array $backoff = [30, 90, 300];

    public function handle(ReconciliationService $service): void {
        $service->reconcileBarcodeInventory($this->batchId);
    }
}`,
      impact: "Keeps client-facing endpoints instantly responsive under heavy load while guaranteeing eventual consistency across third-party vendor platforms."
    },
    {
      step: "04",
      id: "storage",
      title: "MySQL Storage & Composite Indexing",
      shortTitle: "MySQL & Cache",
      subtitle: "Normalized Relational Schemas & Multi-Tier Caching",
      icon: Database,
      badge: "Data Tier",
      metricLabel: "Query Speed",
      metricValue: "< 15ms avg",
      reliability: "B-Tree Indexed",
      overview: "Relational database architecture engineered for both transactional integrity (ACID) and rapid analytical reporting. Schemas feature composite compound indexes tailored specifically to common WHERE, JOIN, and ORDER BY access paths.",
      mechanisms: [
        { label: "Composite B-Tree Indexing", desc: "Creating targeted multi-column indexes on high-cardinality search paths to transform full-table scans into instant index seeks." },
        { label: "Multi-Tier Redis Caching", desc: "Caching frequently computed analytics and static taxonomies using Cache::tags() with automated cache invalidation on model updates." },
        { label: "Atomic Transaction Guarantees", desc: "Wrapping critical multi-table updates (order placement, inventory deduction) in DB::transaction() to prevent partial state corruption." }
      ],
      techStack: ["MySQL 8.0", "Composite Indexing", "Redis Caching", "ACID Transactions", "EXPLAIN Tuning"],
      codeSnippet: `// database/migrations/create_orders_table.php
Schema::table('orders', function (Blueprint $table) {
    // Composite index tuned for multi-dimensional status queries
    $table->index(['tenant_id', 'status', 'created_at'], 'idx_tenant_status_date');
});

// Cache::remember pattern with automated invalidation
return Cache::tags(['tenant_' . $tenantId])->remember($cacheKey, 3600, fn() => {
    return $this->queryAggregatedMetrics($tenantId);
});`,
      impact: "Reduced multi-dimensional dashboard query times from 2.8s to sub-15 milliseconds, handling complex business analytics seamlessly."
    },
    {
      step: "05",
      id: "testing",
      title: "PHPUnit Test Suite & AI-Assisted CI/CD",
      shortTitle: "Testing & TDD",
      subtitle: "Automated Regression Protection & Velocity Optimization",
      icon: ShieldCheck,
      badge: "Quality Assurance",
      metricLabel: "Test Coverage",
      metricValue: "Automated TDD",
      reliability: "Regression Free",
      overview: "Quality is engineered into every release through automated PHPUnit test suites covering calculation engines, permission boundaries, and API integration flows, augmented by AI tools for continuous refactoring.",
      mechanisms: [
        { label: "Automated Unit & Feature Tests", desc: "Authoring comprehensive PHPUnit tests covering business logic calculations, authentication gates, and database seed states." },
        { label: "Regression Protection", desc: "Every API response structure is asserted with assertJsonStructure() and assertStatus(200) to ensure zero breaking contracts." },
        { label: "AI-Assisted Engineering Velocity", desc: "Leveraging Cursor and Claude AI to generate edge-case test matrices, refactor legacy queries, and accelerate peer reviews." }
      ],
      techStack: ["PHPUnit", "TDD Testing", "Feature Tests", "AI Tools (Cursor, Claude)", "Peer Code Review"],
      codeSnippet: `// tests/Feature/OrderProcessingTest.php
public function test_high_throughput_order_ingestion(): void {
    Queue::fake();

    $response = $this->withToken($this->apiToken)
        ->postJson('/api/v1/orders', $this->validOrderPayload);

    $response->assertStatus(201)
        ->assertJsonPath('success', true);

    Queue::assertPushed(ProcessBatchReconciliation::class);
}`,
      impact: "Guaranteed enterprise code reliability, prevented regressions before deployment, and drastically accelerated debugging cycles using AI-assisted tooling."
    }
  ];

  const sourceNodes = (data && Array.isArray(data) && data.length > 0) ? data : defaultNodes;
  const nodes = sourceNodes.map(node => ({
    ...node,
    icon: (typeof node.icon === 'function') ? node.icon : (iconMap[node.iconName] || Server)
  }));

  const current = nodes[activeStep] || nodes[0];
  const CurrentIcon = current.icon;

  return (
    <section id="architecture" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col items-center text-center mb-14"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-3 shadow-md">
          <Network className="w-3.5 h-3.5" />
          <span>System Design Architecture</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          How I Architect <span className="gradient-text-cyan">High-Throughput</span> Systems
        </h2>
        <p className="text-slate-400 text-sm sm:text-base max-w-3xl mt-3 leading-relaxed">
          An end-to-end breakdown of my production-grade backend engineering pipeline — from sub-second API ingestion to resilient Redis queue workers and optimized MySQL schemas.
        </p>
      </motion.div>

      {/* Interactive Horizontal Pipeline Visualizer */}
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {nodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeStep === index;
            return (
              <button
                key={index}
                onClick={() => {
                  soundFX.playClick();
                  setActiveStep(index);
                }}
                onMouseEnter={() => soundFX.playHover()}
                className={`relative p-4 rounded-2xl border text-left transition-all duration-300 group cursor-pointer ${
                  isActive
                    ? 'glass-panel bg-gradient-to-b from-cyan-950/60 to-slate-900/90 border-cyan-500/70 shadow-[0_0_25px_rgba(6,182,212,0.25)] ring-1 ring-cyan-500/40'
                    : 'glass-panel bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/70'
                }`}
              >
                {/* Active indicator dot */}
                {isActive && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                    isActive
                      ? 'text-cyan-300 bg-cyan-950/80 border-cyan-500/50'
                      : 'text-slate-400 bg-slate-950/70 border-slate-800'
                  }`}>
                    {node.step}
                  </span>
                  <div className={`p-1.5 rounded-lg ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className={`text-xs font-bold tracking-tight line-clamp-1 ${isActive ? 'text-white' : 'text-slate-300'}`}>
                  {node.shortTitle}
                </div>
                <div className="text-[10px] font-mono text-slate-400 mt-1 line-clamp-1">
                  {node.badge}
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Main Active Stage Interactive Spec Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeStep}
          initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={isReduced ? { opacity: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="rounded-3xl glass-panel bg-gradient-to-b from-slate-900/90 to-[#090d18]/95 border border-slate-700/80 p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Header Banner */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-0.5 rounded-md">
                  STAGE {current.step}
                </span>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  {current.badge}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2.5 py-0.5 rounded-md">
                  <Activity className="w-3 h-3 animate-pulse" />
                  <span>{current.reliability}</span>
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <CurrentIcon className="w-7 h-7 text-cyan-400 shrink-0" />
                <span>{current.title}</span>
              </h3>
              <p className="text-cyan-300 font-mono text-xs sm:text-sm">
                {current.subtitle}
              </p>
            </div>

            {/* Performance KPI Badges */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-800/90 font-mono text-center">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">{current.metricLabel}</div>
                <div className="text-lg font-bold text-cyan-400 mt-0.5">{current.metricValue}</div>
              </div>
            </div>
          </div>

          {/* Body Content - Split Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Column: Mechanisms & Architecture Strategy */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Architectural Overview</span>
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {current.overview}
                </p>

                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Strategic Engineering Mechanisms
                </h4>
                <div className="space-y-3">
                  {current.mechanisms.map((mech, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-950/50 border border-slate-800/80 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-semibold text-white">{mech.label}</div>
                        <div className="text-xs text-slate-400 mt-0.5 leading-relaxed">{mech.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Primary Architecture Stack</div>
                <div className="flex flex-wrap gap-2">
                  {current.techStack.map((tech, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-950 border border-slate-800 text-cyan-300">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Code Blueprint & Impact Inspector */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
              <div>
                {/* View Mode Switcher */}
                <div className="flex items-center justify-between mb-3 border-b border-slate-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { soundFX.playClick(); setActiveTab('code'); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                        activeTab === 'code'
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Production Blueprint</span>
                    </button>
                    <button
                      onClick={() => { soundFX.playClick(); setActiveTab('strategy'); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
                        activeTab === 'strategy'
                          ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/50 shadow-sm'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Production Impact</span>
                    </button>
                  </div>
                  <span className="text-[11px] font-mono text-cyan-500/80">Production-Grade Blueprint</span>
                </div>

                {/* Tab 1: Code Blueprint */}
                {activeTab === 'code' && (
                  <div className="rounded-2xl bg-[#070b14] border border-slate-800 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/60 text-slate-500 text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                        <span className="ml-2 text-slate-400">architectural_implementation.php</span>
                      </div>
                      <span className="text-cyan-400/80">PSR-12 Clean</span>
                    </div>
                    <pre className="text-slate-300 leading-relaxed overflow-x-auto text-[11px] sm:text-xs">
                      <code>{current.codeSnippet}</code>
                    </pre>
                  </div>
                )}

                {/* Tab 2: Enterprise Impact */}
                {activeTab === 'strategy' && (
                  <div className="rounded-2xl bg-gradient-to-b from-slate-950/90 to-[#070b14] border border-slate-800 p-5 space-y-4">
                    <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                      <Zap className="w-4 h-4" />
                      <span>Measurable Production Outcome</span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {current.impact}
                    </p>
                    <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 font-mono text-xs text-slate-400">
                      <div className="flex items-center justify-between">
                        <span>Database Roundtrips:</span>
                        <span className="text-emerald-400 font-bold">Reduced by up to 85%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Concurrency Bottlenecks:</span>
                        <span className="text-emerald-400 font-bold">Completely Isolated</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Zero Breaking API Changes:</span>
                        <span className="text-cyan-300 font-bold">Swagger & OpenAPI Spec Enforced</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation CTA to next stage */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/60 text-xs font-mono">
                <span className="text-slate-500">Stage {activeStep + 1} of {nodes.length}</span>
                <button
                  onClick={() => {
                    soundFX.playClick();
                    setActiveStep((prev) => (prev + 1) % nodes.length);
                  }}
                  onMouseEnter={() => soundFX.playHover()}
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer group"
                >
                  <span>Next Stage: {nodes[(activeStep + 1) % nodes.length].shortTitle}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4 Summary Architecture Guarantees */}
      <motion.div
        initial={isReduced ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8"
      >
        <div className="p-4 rounded-2xl glass-panel bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Sub-Second Latency</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Tuned Eloquent queries, B-Tree indexes & Redis caching.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
            <Repeat className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Fault-Tolerant Queues</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Redis daemon workers with exponential backoff & failovers.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">Strict Standards</div>
            <div className="text-[11px] text-slate-400 mt-0.5">PSR-12, SOLID design & automated PHPUnit coverage.</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl glass-panel bg-slate-900/40 border border-slate-800/80 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white">AI-Assisted Velocity</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Accelerated refactoring & debugging using Cursor & Claude.</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
