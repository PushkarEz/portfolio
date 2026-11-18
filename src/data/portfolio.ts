export type ProjectStatus = 'Live' | 'Experimental' | 'In Progress' | 'Learning' | 'Competition';

export type ProjectCategory = 'All' | 'AI & Security' | 'Voice & RAG' | 'Learning';

export interface ProjectItem {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  status: ProjectStatus;
  category: Exclude<ProjectCategory, 'All'> | 'Competition';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  showInMainGrid: boolean;
  problem: string;
  solution: string;
  features: string[];
  approach: string[];
  learned: string[];
  limitations: string[];
  walkthroughType:
    | 'phishguard-preview'
    | 'cipherx-walkthrough'
    | 'pdf-rag-walkthrough'
    | 'python-viz-walkthrough'
    | 'ev-parking-overview';
}

export type StackCategory = 'All' | 'Programming' | 'AI & Machine Learning' | 'Backend & APIs' | 'Tools';

export interface StackItem {
  name: string;
  category: Exclude<StackCategory, 'All'>;
  stage: 'Used in Projects' | 'Currently Learning';
  note: string;
  brandColor: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  subtitle: string;
  summary: string;
  details: string[];
  tags: string[];
  kind: 'education' | 'exploration' | 'hackathon' | 'ai' | 'future';
  projectSlug?: string;
}

export interface QuoteItem {
  text: string;
  author: string;
  source: string;
}

export const PROFILE = {
  name: 'Pushkar',
  fullName: 'Pushkar Shinde',
  brandMark: 'PushkarEz',
  location: 'Pune, India',
  shortMeta: "be e&tc '27 · python · ai",
  avatarPath: '/avatar.jpg',
  resumeUrl: '/resume.pdf',
  email: 'pushkarshinde08@gmail.com',
  githubUsername: 'PushkarEz',
  socials: {
    github: 'https://github.com/PushkarEz',
    linkedin: 'https://www.linkedin.com/in/pushkar-shinde1608/',
    x: 'https://x.com/PushkarEz16',
    instagram: 'https://www.instagram.com/pushkar.ez/',
  },
  education: {
    degree: 'B.E. Electronics & Telecommunication Engineering',
    college: 'Navsahyadri Group of Institutes, Pune',
    university: 'Savitribai Phule Pune University',
    expectedGraduation: '2027',
    status: 'Final Year',
  },
};

export const QUOTES: QuoteItem[] = [
  {
    text: 'Machines take me by surprise with great frequency.',
    author: 'Alan Turing',
    source: 'Father of Computer Science',
  },
  {
    text: 'Artificial intelligence is the new electricity.',
    author: 'Andrew Ng',
    source: 'AI Pioneer',
  },
  {
    text: 'The rise of powerful AI will be either the best, or the worst thing, ever to happen to humanity. We do not yet know which.',
    author: 'Stephen Hawking',
    source: 'Theoretical Physicist',
  },
  {
    text: 'There is nothing artificial about AI. AI is made by humans.',
    author: 'Fei-Fei Li',
    source: 'AI Researcher',
  },
  {
    text: 'The first ultraintelligent machine is the last invention that man need ever make.',
    author: 'I. J. Good',
    source: 'Mathematician',
  },
  {
    text: 'The Intelligence Age has begun.',
    author: 'Sam Altman',
    source: 'OpenAI CEO',
  },
  {
    text: 'We can only see a short distance ahead, but we can see plenty there that needs to be done.',
    author: 'Alan Turing',
    source: '',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    slug: 'phishguard',
    title: 'PhishGuard — AI-Powered URL Security Analyzer',
    shortTitle: 'PhishGuard',
    subtitle: 'AI-powered URL security analyzer.',
    description:
      'Analyzes suspicious URLs with VirusTotal, explains threats via Groq AI, and includes breach, password, and extension features.',
    status: 'Live',
    category: 'AI & Security',
    technologies: ['Python', 'Flask', 'VirusTotal', 'Groq API'],
    liveUrl: 'https://bytex.onrender.com/',
    showInMainGrid: true,
    problem:
      'Everyday users regularly encounter unfamiliar or shortened links and struggle to judge whether a URL is safe—or make sense of raw technical scan outputs.',
    solution:
      'PhishGuard pairs multi-engine URL reputation lookups from the VirusTotal API with plain-language threat explanations generated via the Groq API, alongside email breach, password security, browser extension, and cybersecurity learning features.',
    features: [
      'Suspicious URL inspection using VirusTotal API',
      'AI-generated threat explanations in simple language via Groq AI',
      'Email breach checking & password security utilities',
      'Browser extension & cybersecurity awareness features',
    ],
    approach: [
      'Built a Flask backend to coordinate external API requests cleanly from server-side routes.',
      'Combined structured VirusTotal indicators with Groq-powered readable summaries.',
      'Deployed the web application on Render for live testing.',
    ],
    learned: [
      'Structuring multi-API Flask endpoints and handling timeouts and errors gracefully.',
      'Translating raw security metadata into approachable user-facing explanations.',
      'Deploying a Python Flask application to production hosting.',
    ],
    limitations: [
      'Relies on third-party API availability and free-tier rate limits (VirusTotal & Groq).',
      'Intended as a preliminary inspection and awareness tool.',
    ],
    walkthroughType: 'phishguard-preview',
  },
  {
    slug: 'cipherx',
    title: 'CipherX — AI Voice Assistant',
    shortTitle: 'CipherX',
    subtitle: 'Local LLM voice assistant & automation.',
    description:
      'Local Python desktop voice assistant pairing speech recognition (ASR), TTS, and Ollama for spoken replies and OS automation.',
    status: 'Experimental',
    category: 'Voice & RAG',
    technologies: ['Python', 'Ollama', 'ASR', 'TTS'],
    showInMainGrid: true,
    problem:
      'Exploring how a voice-driven desktop assistant can run locally with open models rather than depending solely on cloud-hosted AI services.',
    solution:
      'CipherX links Python speech recognition (ASR) and text-to-speech (TTS) modules with local Ollama inference for spoken replies and system automation like screenshots, file opening, browser control, and YouTube automation.',
    features: [
      'Voice interaction loop (ASR input, local response, TTS output)',
      'Opening local files and desktop applications',
      'Browser control & YouTube automation',
      'Screenshot capture & local Ollama LLM responses',
    ],
    approach: [
      'Separated audio input, deterministic command routing, and Ollama inference inside a modular Python loop.',
      'Tuned concise prompt outputs so responses sound natural when read aloud via TTS.',
    ],
    learned: [
      'Latency trade-offs between speech capture, local LLM generation, and TTS playback.',
      'Balancing direct OS command triggers with open-ended conversational prompts.',
    ],
    limitations: [
      'Experimental local desktop project—requires a local Python environment and Ollama rather than a web URL.',
      'Speech recognition accuracy varies with microphone hardware and ambient noise.',
    ],
    walkthroughType: 'cipherx-walkthrough',
  },
  {
    slug: 'pdf-chat',
    title: 'PDF Chat RAG',
    shortTitle: 'PDF Chat RAG',
    subtitle: 'Document question-answering pipeline.',
    description:
      'Document Q&A pipeline exploring PDF extraction, chunking, Sentence Transformers, FAISS search, and Ollama.',
    status: 'In Progress',
    category: 'Voice & RAG',
    technologies: ['Python', 'FAISS', 'Embeddings', 'Ollama'],
    showInMainGrid: true,
    problem:
      'Long PDFs are slow to search manually, while pasting full documents directly into an LLM prompt hits context limits and increases hallucinations.',
    solution:
      'A Retrieval-Augmented Generation pipeline that extracts PDF text, splits it into chunks, generates dense embeddings with Sentence Transformers, indexes them in FAISS, and passes relevant chunks to Ollama.',
    features: [
      'PDF text extraction & overlapping chunking',
      'Vector embeddings using Sentence Transformers',
      'Similarity search backed by FAISS',
      'Context-grounded answer generation via Ollama',
    ],
    approach: [
      'Broke the RAG pipeline into inspectable stages so retrieval quality can be evaluated step by step.',
      'Used FAISS for fast local vector indexing without external database overhead.',
    ],
    learned: [
      'How chunk size and overlap directly shape retrieval precision.',
      'Practical behavior of dense vector similarity vs. keyword matching.',
    ],
    limitations: [
      'Currently in progress—actively refining retrieval accuracy and document edge cases.',
      'Image-only or scanned PDFs require separate OCR preprocessing.',
    ],
    walkthroughType: 'pdf-rag-walkthrough',
  },
  {
    slug: 'python-visualizer',
    title: 'Python Execution Visualizer',
    shortTitle: 'Python Visualizer',
    subtitle: 'Visual code execution learning tool.',
    description:
      'Learning-focused Python tool built to visually explain step-by-step code execution and variable state.',
    status: 'Learning',
    category: 'Learning',
    technologies: ['Python'],
    showInMainGrid: true,
    problem:
      'For learners starting out in Python, control flow and changing variable states happen invisibly in memory.',
    solution:
      'A focused learning application designed to step through execution and show how Python code behaves line by line.',
    features: [
      'Step-by-step execution clarity',
      'Tracking variable state changes across lines',
      'Focused on beginner comprehension',
    ],
    approach: [
      'Prioritized clarity over IDE complexity so learners can build an accurate mental model of execution.',
    ],
    learned: [
      'Deeper understanding of Python execution flow and state tracking.',
      'Designing simple educational developer tools.',
    ],
    limitations: [
      'Built as a focused learning project rather than a general-purpose debugger.',
    ],
    walkthroughType: 'python-viz-walkthrough',
  },
  {
    slug: 'ev-parking',
    title: 'EV Parking System',
    shortTitle: 'EV Parking System',
    subtitle: 'COEP Project Competition entry.',
    description:
      'A student competition project involving an EV Parking System, presented at the COEP Project Competition.',
    status: 'Competition',
    category: 'Competition',
    technologies: ['Engineering Design', 'COEP'],
    showInMainGrid: false,
    problem:
      'Exploring structured parking concepts tailored for electric vehicles in an academic competition setting.',
    solution:
      'Designed and presented an EV Parking System concept at the COEP Project Competition.',
    features: [
      'Student competition project focused on EV Parking System design',
      'Presented and demonstrated at the COEP Project Competition',
    ],
    approach: [
      'Framed the problem, structured the concept, and presented the demonstration to evaluators.',
    ],
    learned: [
      'Communicating technical concepts clearly under competition evaluation.',
    ],
    limitations: [
      'Academic competition entry—documented strictly as presented.',
    ],
    walkthroughType: 'ev-parking-overview',
  },
];

export const TECH_STACK: StackItem[] = [
  {
    name: 'Python',
    category: 'Programming',
    stage: 'Used in Projects',
    note: 'Core language for AI experiments, Flask backends, and automation scripts.',
    brandColor: '#3776AB',
  },
  {
    name: 'JavaScript',
    category: 'Programming',
    stage: 'Used in Projects',
    note: 'Interactive web frontends and UI behavior.',
    brandColor: '#F7DF1E',
  },
  {
    name: 'HTML',
    category: 'Programming',
    stage: 'Used in Projects',
    note: 'Semantic structure for Flask templates and web pages.',
    brandColor: '#E34F26',
  },
  {
    name: 'CSS',
    category: 'Programming',
    stage: 'Used in Projects',
    note: 'Responsive layouts, custom styling, and clean interfaces.',
    brandColor: '#1572B6',
  },
  {
    name: 'NumPy',
    category: 'AI & Machine Learning',
    stage: 'Used in Projects',
    note: 'Numerical arrays and vector math foundations for Python AI workflows.',
    brandColor: '#4DABCF',
  },
  {
    name: 'Pandas',
    category: 'AI & Machine Learning',
    stage: 'Used in Projects',
    note: 'Structured data handling and tabular preprocessing in Python.',
    brandColor: '#8B5CF6',
  },
  {
    name: 'Ollama',
    category: 'AI & Machine Learning',
    stage: 'Used in Projects',
    note: 'Running local open LLMs for CipherX and PDF Chat.',
    brandColor: '#A78BFA',
  },
  {
    name: 'RAG',
    category: 'AI & Machine Learning',
    stage: 'Currently Learning',
    note: 'Retrieval-Augmented Generation workflows for document Q&A.',
    brandColor: '#60A5FA',
  },
  {
    name: 'FAISS',
    category: 'AI & Machine Learning',
    stage: 'Currently Learning',
    note: 'Vector similarity indexing for semantic search in PDF Chat.',
    brandColor: '#38BDF8',
  },
  {
    name: 'Sentence Transformers',
    category: 'AI & Machine Learning',
    stage: 'Currently Learning',
    note: 'Dense text embeddings for semantic retrieval.',
    brandColor: '#818CF8',
  },
  {
    name: 'Groq API',
    category: 'AI & Machine Learning',
    stage: 'Used in Projects',
    note: 'Fast LLM inference powering threat explanations in PhishGuard.',
    brandColor: '#F55036',
  },
  {
    name: 'Flask',
    category: 'Backend & APIs',
    stage: 'Used in Projects',
    note: 'Lightweight Python web backend powering PhishGuard.',
    brandColor: '#A3A3A3',
  },
  {
    name: 'FastAPI',
    category: 'Backend & APIs',
    stage: 'Currently Learning',
    note: 'Exploring typed, async Python APIs for AI backends.',
    brandColor: '#009688',
  },
  {
    name: 'REST APIs',
    category: 'Backend & APIs',
    stage: 'Used in Projects',
    note: 'Connecting external services like VirusTotal and Groq.',
    brandColor: '#60A5FA',
  },
  {
    name: 'Supabase',
    category: 'Backend & APIs',
    stage: 'Currently Learning',
    note: 'Exploring hosted Postgres storage and auth.',
    brandColor: '#3ECF8E',
  },
  {
    name: 'Git',
    category: 'Tools',
    stage: 'Used in Projects',
    note: 'Version control across experiments and builds.',
    brandColor: '#F05032',
  },
  {
    name: 'GitHub',
    category: 'Tools',
    stage: 'Used in Projects',
    note: 'Hosting code and iterating in public.',
    brandColor: '#A3A3A3',
  },
  {
    name: 'VS Code',
    category: 'Tools',
    stage: 'Used in Projects',
    note: 'Daily editor for Python and web development.',
    brandColor: '#007ACC',
  },
  {
    name: 'Postman',
    category: 'Tools',
    stage: 'Used in Projects',
    note: 'Testing API requests, headers, and responses.',
    brandColor: '#FF6C37',
  },
];

export const JOURNEY_ENTRIES: TimelineEntry[] = [
  {
    period: '2023',
    title: 'Started Engineering',
    subtitle: 'B.E. Electronics & Telecommunication · SPPU',
    summary:
      'Began B.E. Electronics & Telecommunication Engineering at Navsahyadri Group of Institutes, Pune.',
    details: [
      'Started building core engineering fundamentals (SGPA: 7.52 Sem 5, 8.76 Sem 6).',
      'Got curious about software, automation, and intelligent systems beyond hardware coursework.',
    ],
    tags: ['B.E. E&TC', 'SPPU', 'Pune'],
    kind: 'education',
  },
  {
    period: '2024 – 2025',
    title: 'Exploring Technology & Python',
    subtitle: 'Programming Foundations & Learning Tools',
    summary:
      'Started experimenting with Python, NumPy, Pandas, and learning builds.',
    details: [
      'Built Python Execution Visualizer to make step-by-step program behavior clearer.',
      'Focused on learning through small working prototypes.',
    ],
    tags: ['Python', 'NumPy', 'Pandas', 'Visualizer'],
    kind: 'exploration',
    projectSlug: 'python-visualizer',
  },
  {
    period: '2025',
    title: 'APIs, Web & Automation',
    subtitle: 'Backends & External Integrations',
    summary:
      'Explored web development, REST APIs, Flask backends, and cloud deployments.',
    details: [
      'Practiced wiring external APIs cleanly behind Python Flask routes.',
      'Turned local scripts into accessible web applications.',
    ],
    tags: ['Flask', 'REST APIs', 'HTML/CSS', 'JavaScript'],
    kind: 'exploration',
  },
  {
    period: '2025 – 2026',
    title: 'Hackathons, Competitions & PhishGuard',
    subtitle: 'Shipping & Demoing Projects',
    summary:
      'Built PhishGuard and presented projects at hackathons and technical competitions.',
    details: [
      'Built & deployed PhishGuard (Python, Flask, VirusTotal API, Groq API) live on Render.',
      'Shortlisted at Quantum Arena — 24-hour hackathon.',
      'Awarded a 25% scholarship at the Code4EdTech Hackathon.',
      'Presented an EV Parking System at the COEP Project Competition.',
    ],
    tags: ['PhishGuard', 'Quantum Arena', 'Code4EdTech', 'COEP'],
    kind: 'hackathon',
    projectSlug: 'phishguard',
  },
  {
    period: '2026',
    title: 'Exploring AI Engineering',
    subtitle: 'Local LLMs, Voice AI & RAG',
    summary:
      'Experimenting with local LLMs, Voice AI, RAG pipelines, Python APIs, and AI-powered apps.',
    details: [
      'Developing CipherX — a Python voice assistant integrating Ollama, ASR, and TTS.',
      'Building PDF Chat RAG Assistant using FAISS, Sentence Transformers, and Ollama.',
      'Learning FastAPI and Supabase for cleaner AI backends.',
    ],
    tags: ['Ollama', 'RAG', 'FAISS', 'Voice AI', 'FastAPI'],
    kind: 'ai',
    projectSlug: 'pdf-chat',
  },
  {
    period: '2027',
    title: 'The Next Chapter',
    subtitle: 'Expected B.E. Graduation',
    summary:
      'Expected B.E. graduation and continuing the journey toward AI engineering.',
    details: [
      'Currently in final year—sharpening Python, applied AI, and product-building skills.',
    ],
    tags: ['Class of 2027', 'AI Engineering'],
    kind: 'future',
  },
];

export const FALLBACK_GITHUB_REPOS = [
  {
    name: 'AutomatedResumeChecker',
    description: 'Python-based resume checking experiment.',
    language: 'Python',
    html_url: 'https://github.com/PushkarEz/AutomatedResumeChecker',
  },
  {
    name: 'Basic-Portfolio-Design',
    description: 'Early web portfolio design experiment.',
    language: 'HTML',
    html_url: 'https://github.com/PushkarEz/Basic-Portfolio-Design',
  },
  {
    name: 'Group-Tally',
    description: 'Collaborative group expense tracking repository.',
    language: 'Repository',
    html_url: 'https://github.com/PushkarEz/Group-Tally',
  },
  {
    name: 'utkarsh_camp',
    description: 'Public project repository.',
    language: 'Repository',
    html_url: 'https://github.com/PushkarEz/utkarsh_camp',
  },
];
