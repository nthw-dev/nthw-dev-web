export const profile = {
  name: "Natthawat Narin",
  nickname: "Ta",
  title: "Senior Software Engineer",
  subtitle: "Backend & System Design · Full-Stack",
  tagline:
    "I build the systems money moves through — lending platforms, payment gateways, and crypto exchanges that stay correct under load.",
  location: "Bangkok, Thailand",
  phone: "+66 95-291-4822",
  email: "tah.nthw@gmail.com",
  website: "nthw.dev",
  websiteUrl: "https://nthw.dev",
  linkedin: "linkedin.com/in/ta-natthawat",
  linkedinHandle: "in/ta-natthawat",
  linkedinUrl: "https://www.linkedin.com/in/ta-natthawat/",
  line: "na10tthawat",
  lineQr: "/lineID_na10tthawat.JPG",
  github: "github.com/nthw-dev",
  githubHandle: "nthw-dev",
  githubUrl: "https://github.com/nthw-dev",
  resumeUrl: "/Natthawat_Narin_Resume.pdf",
  avatar: "/images/profile.jpeg",
} as const;

export const workingPhoto = {
  src: "/images/working.PNG",
  alt: "Natthawat at his desk, working across a wide monitor at night",
  width: 1086,
  height: 1448,
};

export const summary = [
  "Software engineer with 5+ years of full-stack experience since 2020, specializing in FinTech, banking, and crypto.",
  "Expertise in backend development and system design, with hands-on experience across mobile applications, websites, DevOps, server management, and CI/CD pipelines.",
  "Quick to adopt new technologies and continuously improve development processes, with a strong appetite for challenging work.",
];

export const stats = [
  { value: "5+", label: "Years building", detail: "shipping since 2020" },
  { value: "100k", label: "Users supported", detail: "load-tested capacity" },
  { value: "80%+", label: "Test coverage", detail: "unit + integration" },
  {
    value: "4",
    label: "Fintech domains",
    detail: "bank, lending, pay, crypto",
  },
];

export type Link = { label: string; url: string };

export type Experience = {
  role: string;
  company: string;
  place?: string;
  remote?: boolean;
  period: string;
  current?: boolean;
  context: string;
  links?: Link[];
  highlights: string[];
  stack: string[];
};

export const experiences: Experience[] = [
  {
    role: "Senior Backend Developer",
    company: "Prior Solution Co., Ltd.",
    place: "Bangkok, Thailand",
    period: "01/2025 — Present",
    current: true,
    context:
      "Digital lending platforms for Krungthai NEXT and CLICX Bank — billing, reminders, and repayment at national bank scale.",
    links: [
      {
        label: "Krungthai NEXT",
        url: "https://krungthai.com/th/content/personal/krungthai-next",
      },
      { label: "CLICX Bank", url: "https://www.clicxbank.com/th/personal" },
    ],
    highlights: [
      "Built 30+ RESTful API endpoints in Go (Gin, Bun, PostgreSQL, AWS S3, Redis, Gotenberg) for bill generation, reminder, and repayment flows.",
      "Built 14+ Kafka consumers processing billing and repayment events asynchronously.",
      "Built 4 Airflow DAGs scheduling recurring bill reminder jobs, with AWS S3 for document storage.",
      "Wrote unit and integration tests, holding coverage above 80%.",
      "Built regulatory reporting pipelines as 10 AWS Glue jobs in Python using Spark SQL.",
      "Load-tested APIs and Kafka consumers with k6 against WireMock-stubbed dependencies — profiling TPS, CPU, memory, and database behavior to remove bottlenecks and support 20k–100k users.",
    ],
    stack: [
      "Go",
      "Gin",
      "Kafka",
      "PostgreSQL",
      "Redis",
      "Airflow",
      "AWS Glue",
      "Spark SQL",
      "k6",
    ],
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "AATECH SOLUTION CO., LTD.",
    place: "Remote (100%)",
    remote: true,
    period: "02/2024 — 12/2024",
    context: "Sole developer — backend, web, and mobile through to deployment.",
    links: [
      {
        label: "Smart Hire AI",
        url: "https://metanetcorporation.com/portfolio-item/smart-hire-ai/",
      },
      { label: "GiftMe", url: "https://giftme.tech/" },
      { label: "5v5 Laos", url: "https://5v5-powered.vercel.app/" },
    ],
    highlights: [
      "TX-Service Laos — payment gateway for the Lao market with QR deposits and bank withdrawals across 35+ RESTful endpoints in Go (Gin, PostgreSQL, Redis), with RFC 9421 (Ed25519) webhook verification, SQS FIFO event processing, and a Next.js admin dashboard.",
      "Smart Hire AI — hiring platform where candidates answer interview questions and the ChatGPT API analyzes their responses; built in Next.js and Tailwind CSS, running server-side logic in the app itself rather than a separate API service for faster delivery.",
      "North HR — employee management across a Flutter mobile app, a Next.js back-office, and a NestJS API (Prisma, PostgreSQL) exposing 50+ endpoints: location-based check-in/out via Google Maps API, push notifications through Firebase Cloud Messaging, and S3 file storage with e-signed documents viewable by link.",
      "GiftMe — donation platform for streamers with SCB bank QR payment integration, built in Next.js with a NestJS backend exposing 40+ endpoints.",
      "5v5 Laos — landing page for a Lao e-commerce marketplace, built in Next.js and Tailwind CSS, localized in Thai, Lao, and English, and responsive across every device.",
      "Deployed the four self-hosted apps with Docker behind Nginx Proxy Manager, delivered by GitHub Actions to AWS, DigitalOcean, or Firebase App Distribution.",
    ],
    stack: [
      "Go",
      "NestJS",
      "Next.js",
      "Flutter",
      "PostgreSQL",
      "AWS SQS",
      "Docker",
      "GitHub Actions",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Xspring Digital Co., Ltd.",
    place: "Bangkok, Thailand",
    period: "05/2022 — 10/2023",
    context:
      "Xspring Digital — a crypto trading and ICO portal on web, iOS, and Android.",
    links: [
      { label: "Web", url: "https://trade.xspringdigital.com/en" },
      {
        label: "iOS",
        url: "https://apps.apple.com/th/app/xspring/id6478192213",
      },
      {
        label: "Android",
        url: "https://play.google.com/store/apps/details?id=com.xspring.app",
      },
    ],
    highlights: [
      "Migrated the system from monolith to microservices, building RESTful services in Node.js (Fastify) and Go (Fiber) with Redis caching and RabbitMQ for ledger balance updates.",
      "Built the trade, KYC, notification, and back-office UIs in Nuxt.js (Sass) and Flutter.",
      "Integrated external providers — AppMan and NDID for KYC, Coinbase for trading, and Fireblocks for the cold wallet dashboard.",
      "Built a public trading API documented with OpenAPI for programmatic access.",
      "Wrote Kubernetes manifests (Deployment, Service, ConfigMap) to deploy each new service.",
      "Mentored junior developers, improving code quality and maintainability.",
    ],
    stack: [
      "Go",
      "Fiber",
      "Node.js",
      "Fastify",
      "Nuxt.js",
      "Flutter",
      "RabbitMQ",
      "Redis",
      "Kubernetes",
    ],
  },
  {
    role: "Full-Stack Developer",
    company: "Blockfint Co., Ltd.",
    place: "Bangkok, Thailand",
    period: "08/2021 — 04/2022",
    context:
      "Thinker Loan — home and personal loan platform for Kiatnakin Phatra Bank (KKP).",
    highlights: [
      "Built RESTful microservices in Go (net/http), exposed through GraphQL with gRPC.",
      "Built a real-time chat system in the Next.js web app over WebSocket.",
    ],
    stack: ["Go", "GraphQL", "gRPC", "Next.js", "WebSocket"],
  },
  {
    role: "Full-Stack Developer Internship",
    company: "Odd-e Thailand",
    place: "Bangkok, Thailand",
    period: "03/2021 — 08/2021",
    context:
      "Car rental platform for the Provincial Electricity Authority (PEA).",
    highlights: [
      "Built the site in Next.js with a Node.js (Express) API backed by PostgreSQL.",
    ],
    stack: ["Next.js", "Node.js", "Express", "PostgreSQL"],
  },
];

export type SkillGroup = { icon: string; title: string; items: string[] };

export const skills: SkillGroup[] = [
  {
    icon: "Code2",
    title: "Languages",
    items: ["TypeScript", "Go", "Dart", "Python", "Kotlin"],
  },
  {
    icon: "Server",
    title: "Backend & API",
    items: [
      "Go (Gin, Fiber)",
      "Node.js (Fastify, NestJS)",
      "Python (Django)",
      "Kotlin (Spring Boot)",
      "GraphQL",
      "gRPC",
    ],
  },
  {
    icon: "Layout",
    title: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "Tailwind CSS"],
  },
  { icon: "Smartphone", title: "Mobile", items: ["Flutter"] },
  {
    icon: "Database",
    title: "Databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
  },
  {
    icon: "Workflow",
    title: "Messaging & Data",
    items: ["Kafka", "RabbitMQ", "AWS SQS", "Airflow", "Spark SQL"],
  },
  {
    icon: "FlaskConical",
    title: "Testing",
    items: [
      "Testify",
      "Mockery",
      "Ginkgo",
      "Gomega",
      "Jest",
      "Playwright",
      "k6",
    ],
  },
  {
    icon: "Cloud",
    title: "DevOps & Cloud",
    items: [
      "Docker",
      "Kubernetes",
      "AWS",
      "Firebase",
      "GitHub Actions",
      "GitLab CI/CD",
      "Cloudflare",
    ],
  },
];

export const education = {
  degree: "B.Eng. in Computer Engineering",
  school: "Suranaree University of Technology",
  period: "2017 — 2021",
  logo: "/images/sut.gif",
  photos: [
    {
      src: "/images/study1.jpg",
      alt: "Graduation day at Suranaree University of Technology",
      width: 1170,
      height: 1460,
    },
    {
      src: "/images/study2.jpg",
      alt: "Graduation portrait on the university campus",
      width: 1170,
      height: 1450,
    },
  ],
};

export const languages = [
  { name: "Thai", level: "Native" },
  { name: "English", level: "Professional working" },
];

export const domains = [
  "Banking",
  "Digital Lending",
  "Payments",
  "Crypto & ICO",
  "HR Tech",
];
