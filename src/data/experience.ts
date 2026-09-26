export interface ExperienceItem {
  date: string;
  location: string;
  title: string;
  company: string;
  description: string;
  bullets: string[];
  color: string;
}

export const experiences: ExperienceItem[] = [
  {
    date: 'Jul 2025 – Present',
    location: 'Salt Lake City, UT, USA',
    title: 'AI Engineer',
    company: 'Paxel AI',
    description: 'Pharma sales intelligence startup. Building the governed AI assistant that lets field sales reps ask plain-English questions of their own sales data.',
    bullets: [
      'Built an intelligence catalog over a multi-million-row pharmaceutical sales dataset in Aurora PostgreSQL, mapping 8 business domains into one curated, cited, provider-agnostic knowledge layer that any service can build AI-native features on.',
      'Built the production AI assistant on it: a tool-calling agent that turns plain-English rep questions into SQL over their tenant\'s governed data, deployed on AWS ECS Fargate with Aurora behind RDS Proxy, streaming answers over Server-Sent Events.',
      'Designed the governed data and safety layer: 17 Postgres views that enforce tenant and per-rep row scoping inside the database, plus a SQL gate on Postgres\'s own parser (pglast) that permits only a single SELECT over an allowlist, so a model-written query can never reach a base table or issue a write.',
      'Built the eval harness (80 golden questions, 240 paraphrases, multi-turn journeys, an unseen set) that grades answers value by value: about 90% accuracy across 270 graded turns at a ~5s median response, backed by 890+ offline tests.',
    ],
    color: 'cyan',
  },
  {
    date: 'May 2025 – Aug 2025',
    location: 'Logan, UT (Remote), USA',
    title: 'AI Software Engineer (Summer\'25 Intern)',
    company: 'AVI Human Services',
    description: 'Built applied GenAI tools used by state administrators.',
    bullets: [
      'Shipped a real-time AI analytics dashboard (React, Node.js, Gemini API, Docker, AWS) over a 50,000+ student-record dataset, giving staff faster performance insights.',
      'Designed a LangChain pipeline with the Gemini API and vector embeddings for curriculum generation, with RAG prompt optimization improving content relevance by ~40%.',
      'Built fault-tolerant REST APIs with Redis caching and tuned MySQL indexes, holding median response times under 200ms under concurrent load.',
      'Added automated alerting and graceful degradation so queries stayed available during partial failures.',
    ],
    color: 'accent',
  },
  {
    date: 'Jun 2025 – May 2026',
    location: 'Salt Lake City, UT, USA',
    title: 'IT Systems & Security Intern',
    company: 'University of Utah • VP for Research',
    description: 'Securing research infrastructure for a $650M+ annual research enterprise.',
    bullets: [
      'Automated endpoint and security workflows in Python with enterprise tools (Intune, Tanium, BeyondTrust), improving compliance ~60% across a $650M+ research environment.',
      'Built device-provisioning pipelines (imaging, configuration, full-disk encryption) for 70+ endpoints.',
      'Diagnosed and resolved system, identity, and network issues across Linux/Windows/macOS, Active Directory, and Entra ID using root-cause analysis.',
    ],
    color: 'primary',
  },
  {
    date: 'Jul 2023 – Feb 2024',
    location: 'Pune, India',
    title: 'Software Developer Intern',
    company: 'eWarranty Solutions',
    description: '',
    bullets: [
      'Built a QR-code warranty verification system (Java, Kotlin, Spring Boot, REST APIs) serving 45,000+ products and cutting manual errors by 30%.',
      'Modeled the analytics pipeline as an async computation graph (CompletableFuture chains) over a read-optimized MySQL schema, decoupling query latency from write throughput; tuned queries and HikariCP pooling to cut response time 40%.',
    ],
    color: 'blue',
  },
  {
    date: 'May 2022 – Jul 2023',
    location: 'Pune, India',
    title: 'Research Assistant',
    company: 'Research & Innovation Cell • RMD Sinhgad (Savitribai Phule Pune University)',
    description: '',
    bullets: [
      'Supported research methodology design through literature reviews and synthesis of applied AI and cybersecurity papers.',
      'Trained 50+ students on statistical analysis, improving research accuracy by ~60% and contributing to publications and patents.',
      'Assisted in survey design, data collection, and analysis for peer-reviewed research projects.',
    ],
    color: 'slate',
  },
  {
    date: 'Jan 2022 – Jul 2022',
    location: 'Pune, India',
    title: 'Cyber Security Analyst (Intern)',
    company: 'ShellStrong Technologies',
    description: '',
    bullets: [
      'Resolved 7 high-priority digital forensic cases, implementing mitigations like MFA, encryption, and firewall hardening.',
      'Conducted vulnerability assessments using Nmap, Wireshark, and Metasploit, reducing compliance issues by 30%.',
      'Implemented ISO 27001-aligned information security protocols to minimize risk and improve security hygiene.',
    ],
    color: 'red',
  },
];
