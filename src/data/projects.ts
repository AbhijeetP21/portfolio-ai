export type ProjectStatus = 'shipped' | 'in-progress';

export interface Project {
  title: string;
  status: ProjectStatus;
  featured?: boolean;
  description: string;
  highlights?: string[]; // evidence lines shown on featured cards
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
    title: 'SynapticaAI — LLM Gateway & API Infrastructure',
    status: 'in-progress',
    description:
      'OpenAI-compatible gateway with provider routing, semantic caching, request-level observability (latency, error rate, cache-hit rate), a live dashboard, and CI-gated evals.',
    progress: {
      done: 'Routing logic, semantic caching, and request logging skeleton',
      next: 'Live metrics dashboard and automated evaluation pipeline',
    },
    tags: ['Next.js', 'Redis', 'LLM', 'API Gateway', 'Evals'],
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
