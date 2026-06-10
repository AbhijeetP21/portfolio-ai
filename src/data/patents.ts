export interface Publication {
  title: string;
  venue: string;
  year: string;
  link: string;
}

export interface PatentItem {
  title: string;
  reference: string;
  link?: string;
}

export interface Award {
  title: string;
  organization: string;
}

export const publications: Publication[] = [
  {
    title: 'TASA: Virtual AI Assistant with Multilevel Authentication',
    venue: 'IEEE ICCUBEA',
    year: '2023',
    link: 'https://ieeexplore.ieee.org/document/10392101/',
  },
  {
    title: 'Image-Dev: Advanced Text to Image AI Model',
    venue: 'IEEE PuneCon',
    year: '2022',
    link: 'https://ieeexplore.ieee.org/document/10014718',
  },
];

export const patents: PatentItem[] = [
  {
    title: 'TASA: Virtual Assistant With Face Authentication',
    reference: '202221066577',
    link: 'https://iprsearch.ipindia.gov.in/publicsearch',
  },
  {
    title: 'Safety H-Shield: Wearable Security Device',
    reference: '202221048969',
    link: 'https://iprsearch.ipindia.gov.in/publicsearch',
  },
  {
    title: 'Adhunik Scarecrow: Secured Farming Engine',
    reference: 'Indian Patent Office',
    link: 'https://iprsearch.ipindia.gov.in/publicsearch',
  },
];

export const awards: Award[] = [
  {
    title: 'Best Innovator & Best Cybersecurity Expert',
    organization: 'Department of Computer Engineering, RMDSSOE',
  },
  {
    title: 'Smart India Hackathon 2022 Finalist',
    organization: 'SIH1019',
  },
  {
    title: 'First Runner Up',
    organization: 'Innovation Thinking & Ideation Competition',
  },
  {
    title: 'Cybersecurity Awareness Program',
    organization: 'Pune Cyber Police Cell',
  },
];
