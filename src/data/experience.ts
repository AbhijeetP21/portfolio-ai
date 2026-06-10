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
    date: 'May 2025 – Aug 2025',
    location: 'Logan, UT (Remote), USA',
    title: 'AI Software Engineer (Summer\'25 Intern)',
    company: 'AVI Human Services',
    description: 'Built applied GenAI tools used by state administrators.',
    bullets: [
      'Shipped a real-time AI analytics dashboard (React, Node.js, Gemini API, Docker, AWS) over a 50,000+ student-record dataset, giving staff faster performance insights.',
      'Designed a RAG prompt-optimization pipeline for curriculum generation, improving content relevance by ~40%.',
      'Built REST APIs with Redis caching and MySQL tuning to hold responses under concurrent load.',
    ],
    color: 'accent',
  },
  {
    date: 'Jun 2025 – Present',
    location: 'Salt Lake City, UT, USA',
    title: 'IT Systems & Security Intern',
    company: 'University of Utah • VP for Research',
    description: 'Securing research infrastructure for a $650M+ annual research enterprise.',
    bullets: [
      'Automated endpoint and security workflows in Python with enterprise tools (Intune, Tanium, BeyondTrust), improving compliance ~60% across a $650M+ research environment.',
      'Built device-provisioning pipelines (imaging, configuration, full-disk encryption) for 70+ endpoints.',
      'Diagnosed and resolved system, identity, and network issues across Windows/macOS, Active Directory, and Entra ID using root-cause analysis.',
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
      'Built a QR-code warranty verification system (Java, Spring Boot, REST) serving 45,000+ products and cutting manual errors by 30%.',
      'Implemented real-time analytics with async retrieval (CompletableFuture) and MySQL-backed dashboards; tuned queries and HikariCP pooling to cut response time 40%.',
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
