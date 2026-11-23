export type ProjectStatus = 'shipped' | 'in-progress';

export interface Project {
  title: string;
  status: ProjectStatus;
  featured?: boolean;
  description: string;
  highlights?: string[]; // evidence lines shown on featured cards
  outcome?: { value: string; label: string; context: string };
  visual?:
    | { kind: 'screenshot'; src: string; width: number; height: number; alt: string; caption: string }
    | { kind: 'architecture'; steps: { title: string; detail: string }[]; caption: string };
  progress?: { done: string; next: string }; // in-progress projects only
  tags: string[];
  links?: {
    github?: string;
    demo?: string;
    writeup?: string;
  };
}

export const projects: Project[] = [
  {
    title: 'Autonomous Web Agent',
    status: 'shipped',
    featured: true,
    outcome: {
      value: '90%',
      label: 'benchmark task success',
      context: '19 of 21 runs across 7 tasks, including public sites. A small benchmark, not a production success rate.',
    },
    visual: {
      kind: 'screenshot',
      src: '/images/writing/autonomous-web-agent-benchmark.png',
      width: 1024,
      height: 837,
      alt: 'Web Agent benchmark dashboard showing 19 successful runs out of 21 and per-task results.',
      caption: 'Benchmark dashboard · open full-size image',
    },
    description:
      'A general-purpose autonomous web agent that runs multi-step browser workflows from a high-level goal.',
    highlights: [
      'Reduced accessibility-tree perception, a provider-agnostic LLM client (Anthropic- and OpenAI-compatible), and a Playwright executor',
      'A robust reliability layer featuring retry/recovery, loop detection, and step budgets',
      'Structured per-step observability and benchmark measuring task success and recovery rate (90% across 7 tasks including public sites)',
      'Optional confirmation gate to require human approval before any sensitive action runs',
    ],
    tags: ['Python', 'Playwright', 'LLM', 'Agentic AI'],
    links: {
      github: 'https://github.com/AbhijeetP21/autonomous-web-agent-v2.1',
      writeup: '/writing/autonomous-web-agent',
    },
  },
  {
    title: 'ClipSync',
    status: 'shipped',
    featured: true,
    outcome: {
      value: 'Serverless',
      label: 'cross-device clipboard sync',
      context: 'Text, files, and links stay in sync with per-user data isolation and no custom backend to operate.',
    },
    visual: {
      kind: 'architecture',
      steps: [
        { title: 'Your devices', detail: 'Next.js client + authentication' },
        { title: 'Supabase', detail: 'Postgres + Row Level Security' },
        { title: 'Live updates', detail: 'Realtime events sync signed-in devices' },
      ],
      caption: 'Simplified architecture · authenticated sync',
    },
    description:
      'A secure, serverless real-time clipboard manager that syncs text, files, and links across devices instantly, with no custom backend to operate or patch.',
    highlights: [
      'Postgres Row Level Security enforces per-user data isolation at the database layer',
      'Supabase Realtime channels push clipboard changes across devices in milliseconds',
      'Fully serverless: auth, storage, and sync without a single backend server',
    ],
    tags: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Vercel'],
    links: {
      github: 'https://github.com/AbhijeetP21/ClipSync',
      demo: 'https://clipsync.abhijeetpachpute.com',
      writeup: '/writing/clipsync',
    },
  },
  {
    title: 'Multi-Agent Data Wrangler',
    status: 'shipped',
    featured: true,
    outcome: {
      value: 'Auditable',
      label: 'data transformations',
      context: 'Each transform is validated, scored, and ranked, with an execution trail and explicit failure recovery.',
    },
    visual: {
      kind: 'screenshot',
      src: '/projects/multi-agent-data-wrangler/demo.png',
      width: 2706,
      height: 1520,
      alt: 'Data Wrangler interface with pipeline configuration, CSV upload, and the profiling-to-output pipeline.',
      caption: 'Pipeline interface · open full-size image',
    },
    description:
      'An auditable data-transformation system modeled as a graph: specialized agents profile data, generate candidate transforms, validate, score, and rank them.',
    highlights: [
      'Distinct agents for profiling, candidate generation, validation, scoring, and ranking',
      'DAG-based execution with a full audit trail for every transform',
      'Structured failure recovery instead of silent data drops',
    ],
    tags: ['Python', 'Streamlit', 'Pydantic', 'Multi-Agent', 'Data Engineering'],
    links: {
      github: 'https://github.com/AbhijeetP21/multi-agent-data-wrangler',
      demo: 'https://multi-agent-data-wrangler.streamlit.app/',
      writeup: '/writing/multi-agent-data-wrangler',
    },
  },
  {
    title: 'SynapticaAI — Neurosymbolic LLM Orchestrator',
    status: 'shipped',
    featured: true,
    outcome: {
      value: '91.5%',
      label: 'routing accuracy',
      context: 'Measured across GSM8K, MBPP, and TruthfulQA. Model tiers escalate when domain validation fails.',
    },
    visual: {
      kind: 'architecture',
      steps: [
        { title: 'Route the query', detail: 'Math, code, or general expert' },
        { title: 'Start small', detail: 'Run the smallest model tier' },
        { title: 'Validate the answer', detail: 'Escalate to a larger tier on failure' },
      ],
      caption: 'Simplified architecture · validated routing',
    },
    description:
      'An orchestration engine that routes each query to a math, code, or general expert and starts on the smallest model tier, escalating to larger models only when the answer fails validation. Started as a team project; I built v2 with the API, live visualizer, and cloud experts.',
    highlights: [
      'Hybrid router combining symbolic query features with a lightweight neural classifier: 91.5% routing accuracy across GSM8K, MBPP, and TruthfulQA',
      'Small → medium → large tiered escalation, gated by domain-specific validators for math, code, and general answers',
      'v2: FastAPI backend, Next.js visualizer that shows each routing decision, validation path, and cost, and cloud experts (Gemini, Groq) via LiteLLM, all in Docker',
    ],
    tags: ['Python', 'FastAPI', 'Next.js', 'LiteLLM', 'LLM Routing'],
    links: {
      github: 'https://github.com/AbhijeetP21/SynapticaAI-v2.0',
    },
  },
  {
    title: 'Dinodash',
    status: 'shipped',
    description:
      'A C++/Raylib survival game compiled to WebAssembly: one native engine running across two runtimes.',
    tags: ['C++', 'Raylib', 'WebAssembly'],
    links: {
      github: 'https://github.com/AbhijeetP21/Dinodash',
      demo: 'https://abhijeetp21.github.io/Dinodash-play/',
      writeup: '/writing/dinodash-web-runtime',
    },
  },
  {
    title: 'Good Bowls',
    status: 'shipped',
    description:
      'Full-stack restaurant e-commerce: custom bowl builder, Stripe checkout, user auth, and an admin dashboard.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redux'],
    links: {
      github: 'https://github.com/AbhijeetP21/Good_Bowls',
      demo: 'https://good-bowls.vercel.app',
      writeup: '/writing/good-bowls-ecommerce',
    },
  },
  {
    title: 'Custom Unix Shell',
    status: 'shipped',
    description:
      'A Unix shell in C: piping, I/O redirection, background execution, logical operators, and command history.',
    tags: ['C', 'Operating Systems'],
    links: {
      github: 'https://github.com/AbhijeetP21/Custom-Unix-Shell',
    },
  },
  {
    title: 'AI Prompt + RAG Toolkit',
    status: 'shipped',
    description:
      'Analytics dashboard with natural-language querying over CSVs via lightweight retrieval and the Gemini API.',
    tags: ['RAG', 'Gemini API', 'Analytics'],
    links: {
      writeup: '/writing/rag-optimization-techniques',
    },
  },
  {
    title: 'Healthcare RAG System',
    status: 'in-progress',
    description:
      'Retrieval-augmented question answering over synthetic FHIR records with a PHI-detection stage and an eval harness scoring answer faithfulness/groundedness.',
    progress: {
      done: 'FHIR ingestion and chunking, PHI detection pass',
      next: 'Evaluation framework and faithfulness scoring',
    },
    tags: ['Python', 'LangChain', 'OpenAI', 'FHIR', 'Evals'],
  },
];
