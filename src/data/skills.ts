export type SkillTier = 'daily' | 'comfortable' | 'familiar';

export interface SkillGroup {
  title: string;
  items: { name: string; tier: SkillTier }[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: 'AI / ML Engineering',
    items: [
      { name: 'LLM applications (RAG, agents)', tier: 'daily' },
      { name: 'LangChain', tier: 'daily' },
      { name: 'OpenAI / Gemini APIs', tier: 'daily' },
      { name: 'Prompt design & evals', tier: 'daily' },
      { name: 'Playwright automation', tier: 'comfortable' },
      { name: 'PyTorch', tier: 'comfortable' },
      { name: 'OpenCV / CNNs', tier: 'comfortable' },
      { name: 'Vector search & embeddings', tier: 'comfortable' },
      { name: 'TensorFlow', tier: 'familiar' },
    ],
  },
  {
    title: 'Systems & Backend',
    items: [
      { name: 'Python', tier: 'daily' },
      { name: 'TypeScript / Next.js / React', tier: 'daily' },
      { name: 'PostgreSQL / MySQL', tier: 'daily' },
      { name: 'Node.js / Express', tier: 'comfortable' },
      { name: 'Java / Spring Boot', tier: 'comfortable' },
      { name: 'C / C++', tier: 'comfortable' },
      { name: 'Redis', tier: 'comfortable' },
      { name: 'MongoDB', tier: 'comfortable' },
      { name: 'Kotlin', tier: 'familiar' },
    ],
  },
  {
    title: 'Infra & Security',
    items: [
      { name: 'Docker', tier: 'daily' },
      { name: 'AWS (EC2 / S3 / Lambda)', tier: 'comfortable' },
      { name: 'CI/CD (GitHub Actions)', tier: 'comfortable' },
      { name: 'Supabase', tier: 'comfortable' },
      { name: 'Endpoint security (Intune, Tanium)', tier: 'comfortable' },
      { name: 'Digital forensics / Nmap / Wireshark', tier: 'comfortable' },
      { name: 'Kubernetes', tier: 'familiar' },
      { name: 'ISO 27001', tier: 'familiar' },
    ],
  },
];
