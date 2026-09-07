import React from 'react';
import { Phone, Mail, MapPin, Globe, CodeXml, PanelsTopLeft, Smartphone, Server, Database, Workflow, FlaskConical, Cloud } from 'lucide-react';
// lucide-react v1 dropped brand marks, so the LinkedIn glyph comes from the
// portfolio's own icon set.
import { GitHubIcon, LinkedInIcon } from '~/app/_components/icons';

const Tech = ({ children }: { children: React.ReactNode }) => (
  <span className="text-emerald-700">{children}</span>
);

export default function ResumePDF() {
  return (
    <div className="bg-white h-[297mm] w-[210mm] mx-auto overflow-hidden text-xs leading-tight flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-3 pb-1">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">NATTHAWAT NARIN</h1>
            <h2 className="text-lg mb-3 opacity-90">Senior Software Engineer | Full-Stack Developer | Backend Developer</h2>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs">
              <div className="flex items-center gap-2">
                <Phone size={12} />
                <span>+66 95-291-4822</span>
              </div>
              <div className="flex items-center gap-2">
                <span>LINE: na10tthawat</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={12} />
                <span>tah.nthw@gmail.com</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <LinkedInIcon size={12} />
                <a href="https://www.linkedin.com/in/tah-natthawat/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100">tah-natthawat</a>
              </div> */}
              <div className="flex items-center gap-2">
                <GitHubIcon size={12} />
                <a href="https://github.com/nthw-dev" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100">github.com/nthw-dev</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={12} />
                <a href="https://nthw-dev.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-blue-100">nthw.dev</a>
              </div>
            </div>
          </div>
          <div className="w-20 h-20 overflow-hidden rounded-full ml-4">
            <img src="/images/profile.jpeg" alt="Profile" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Left Column - Main Content */}
        <div className="w-3/4 p-3 space-y-2">
          {/* Summary */}
          <section>
            <h3 className="text-sm font-bold text-blue-600 border-b border-blue-200 pb-1 mb-1">PROFESSIONAL SUMMARY</h3>
            <p className="text-xs leading-snug text-gray-700">
              <b>Software Engineer</b> with <b>5+ years</b> of full-stack experience since <b>2020</b>, specializing in FinTech, <b>banking</b>, and <b>crypto</b>.
              Expertise in <b>backend development and system design</b>, with hands-on experience across mobile applications, websites, DevOps, server management, and CI/CD pipelines.
              Quick to adopt new technologies and continuously improve <b>development processes</b>, with a strong appetite for <b>challenging</b> work.
            </p>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-sm font-bold text-blue-600 border-b border-blue-200 pb-1 mb-1">PROFESSIONAL EXPERIENCE</h3>
            <div className="space-y-2">
              <div className="border-l-3 border-blue-300 pl-3">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-xs text-gray-800">Senior Backend Developer</h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">01/2025 - Present</span>
                </div>
                <p className="text-blue-600 text-xs font-medium flex items-center gap-1">Arise by Infinitas Co., Ltd. <span className="text-gray-500 font-normal">(<b>Outsource</b> via GetLinks &rarr; N7 Labs)</span> <MapPin size={10} className="ml-1" /> Bangkok, Thailand</p>
                <p className="text-xs mt-1 text-gray-700"><b>Projects:</b> digital lending platforms for a <b>leading Thai commercial bank</b> and a <b>new virtual bank</b></p>
                <ul className="text-xs mt-1 space-y-0.5 text-gray-700">
                  <li>• Build <b>30+</b> RESTful API endpoints in <Tech>Go</Tech> (<Tech>Gin</Tech>, <Tech>Bun</Tech>, <Tech>PostgreSQL</Tech>, <Tech>AWS S3</Tech>, <Tech>Redis</Tech>, <Tech>Gotenberg</Tech>) for bill generation, reminder, and repayment flows</li>
                  <li>• Build <b>14+</b> <Tech>Kafka</Tech> consumers to process billing and repayment events asynchronously</li>
                  <li>• Build <b>4</b> <Tech>Airflow</Tech> DAGs to schedule recurring bill reminder jobs, with <Tech>AWS S3</Tech> for document storage</li>
                  <li>• Write unit and integration tests, maintaining test coverage above <b>80%</b></li>
                  <li>• Build regulatory reporting pipelines as <b>10</b> <Tech>AWS Glue</Tech> jobs in <Tech>Python</Tech> using <Tech>Spark SQL</Tech></li>
                  <li>• Load-test APIs and <Tech>Kafka</Tech> consumers with <Tech>k6</Tech> against WireMock-stubbed dependencies, profiling TPS, CPU, memory, and database behavior to remove bottlenecks and support <b>20k–100k</b> users</li>
                </ul>
              </div>

              <div className="border-l-3 border-blue-300 pl-3">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-xs text-gray-800">Senior Full-Stack Developer</h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">02/2024 - 12/2024</span>
                </div>
                <p className="text-blue-600 text-xs font-medium flex items-center gap-1">AATECH SOLUTION CO., LTD. <span className="text-gray-500 font-normal">(<b>Freelance</b>)</span> <Globe size={10} className="ml-1" /> Remote (100%)</p>
                <p className="text-xs mt-1 text-gray-700"><b>Sole developer</b> from backend, web, and mobile through deployment</p>
                <ul className="text-xs mt-1 space-y-0.5 text-gray-700">
                  <li>• <b>TX-Service Laos</b> — payment gateway for the Lao market with QR deposits and bank withdrawals across <b>35+</b> RESTful endpoints in <Tech>Go</Tech> (<Tech>Gin</Tech>, <Tech>PostgreSQL</Tech>, <Tech>Redis</Tech>), with <Tech>RFC 9421</Tech> (<Tech>Ed25519</Tech>) webhook verification, <Tech>SQS FIFO</Tech> event processing, and a <Tech>Next.js</Tech> admin dashboard</li>
                  <li>• <b><a href="https://metanetcorporation.com/portfolio-item/smart-hire-ai/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Smart Hire AI</a></b> — hiring platform where candidates answer interview questions and the <Tech>ChatGPT API</Tech> analyzes their responses, built in <Tech>Next.js</Tech> and <Tech>Tailwind CSS</Tech>, running all server-side logic in the app itself rather than a separate API service, for faster development</li>
                  <li>• <b>North HR</b> — an employee management system built as a <Tech>Flutter</Tech> mobile app, a <Tech>Next.js</Tech> back-office (<Tech>Tailwind CSS</Tech>), and a <Tech>NestJS</Tech> API (<Tech>Prisma</Tech>, <Tech>PostgreSQL</Tech>) exposing <b>50+</b> RESTful API endpoints: location-based check-in/check-out via the <Tech>Google Maps API</Tech>, push notifications through <Tech>Firebase Cloud Messaging</Tech>, and file storage on <Tech>AWS S3</Tech> with e-signed documents viewable by link</li>
                  <li>• <b><a href="https://giftme.tech/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">GiftMe</a></b> — donation platform for streamers, with SCB bank QR code payment integration, built in <Tech>Next.js</Tech> with a <Tech>NestJS</Tech> backend exposing <b>40+</b> RESTful endpoints</li>
                  <li>• Deployed all of them with <Tech>Docker</Tech> behind <Tech>Nginx Proxy Manager</Tech>, delivered by <Tech>GitHub Actions</Tech> to <Tech>AWS</Tech>, <Tech>DigitalOcean</Tech>, or <Tech>Firebase App Distribution</Tech> for mobile deployment</li>
                </ul>
              </div>

              <div className="border-l-3 border-blue-300 pl-3">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-xs text-gray-800">Full-Stack Developer</h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">05/2022 - 10/2023</span>
                </div>
                <p className="text-blue-600 text-xs font-medium flex items-center gap-1">Xspring Digital Co., Ltd. <span className="text-gray-500 font-normal">(<b>Full-time</b>)</span> <MapPin size={10} className="ml-1" /> Bangkok, Thailand</p>
                <p className="text-xs mt-1 text-gray-700"><b>Project:</b> <a href="https://trade.xspringdigital.com/en" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Xspring Digital</a>, a crypto trading and ICO portal (<a href="https://apps.apple.com/th/app/xspring/id6478192213" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">iOS</a> / <a href="https://play.google.com/store/apps/details?id=com.xspring.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">Android</a>)</p>
                <ul className="text-xs mt-1 space-y-0.5 text-gray-700">
                  <li>• Migrated the system from a monolithic to a microservices architecture, building RESTful services in <Tech>Node.js</Tech> (<Tech>Fastify</Tech>) and <Tech>Go</Tech> (<Tech>Fiber</Tech>) with <Tech>Redis</Tech> caching and <Tech>RabbitMQ</Tech> for ledger balance updates</li>
                  <li>• Built the trade, KYC, notification, and back-office UIs in <Tech>Nuxt.js</Tech> (<Tech>Sass</Tech>) and <Tech>Flutter</Tech></li>
                  <li>• Integrated external providers —  <b>AppMan</b> and <b>NDID</b> for KYC, <b>Coinbase</b> for trading, and <b>Fireblocks</b> for the cold wallet dashboard</li>
                  <li>• Built a public trading API documented with <Tech>OpenAPI</Tech> for programmatic access</li>
                  <li>• Wrote <Tech>Kubernetes</Tech> manifests (Deployment, Service, ConfigMap) to deploy each new service</li>
                  <li>• Mentored junior developers, improving code quality and maintainability</li>
                </ul>
              </div>

              <div className="border-l-3 border-blue-300 pl-3">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-semibold text-xs text-gray-800">Full-Stack Developer</h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">08/2021 - 04/2022</span>
                </div>
                <p className="text-blue-600 text-xs font-medium flex items-center gap-1">Blockfint Co., Ltd. <span className="text-gray-500 font-normal">(<b>Full-time</b>)</span> <MapPin size={10} className="ml-1" /> Bangkok, Thailand</p>
                <p className="text-xs mt-1 text-gray-700"><b>Project:</b> Thinker Loan, home, and personal loan platform for a <b>Thai commercial bank</b></p>
                <ul className="text-xs mt-1 space-y-0.5 text-gray-700">
                  <li>• Built RESTful microservices in <Tech>Go</Tech> <Tech>net/http</Tech>, exposed through <Tech>GraphQL</Tech> with <Tech>gRPC</Tech></li>
                  <li>• Built a real-time chat system in the <Tech>Next.js</Tech> web app over <Tech>WebSocket</Tech></li>
                  <li>• See full experience history on <a href="https://www.linkedin.com/in/tah-natthawat/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800">LinkedIn</a></li>
                  {/* <li>• Built the web app in <Tech>Next.js</Tech> and the mobile app in React Native</li> */}
                  {/* <li>• Built and maintained CI/CD pipelines for new microservices using <Tech>Kubernetes</Tech> and <Tech>GitLab CI/CD</Tech></li> */}
                </ul>
              </div>

            </div>
          </section>
        </div>

        {/* Right Column - Sidebar */}
        <div className="w-1/4 bg-gray-50 p-3 space-y-2">
          {/* Skills */}
          <section>
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">TECHNICAL SKILLS</h3>
            <div className="space-y-2">
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <CodeXml size={12} className="text-blue-700" />
                  <h4 className="font-semibold text-xs text-blue-700">Programming Languages</h4>
                </div>
                <p className="text-xs text-gray-700">TypeScript, Go, Dart, Python, Kotlin</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <PanelsTopLeft size={12} className="text-blue-700" />
                  <h4 className="font-semibold text-xs text-blue-700">Frontend Frameworks</h4>
                </div>
                <p className="text-xs text-gray-700">React, Next.js, Vue.js, Nuxt.js, Tailwind CSS</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Smartphone size={12} className="text-blue-700" />
                  <h4 className="font-semibold text-xs text-blue-700">Mobile Frameworks</h4>
                </div>
                <p className="text-xs text-gray-700">Flutter</p>
                {/* <p className="text-xs text-gray-700">Flutter, React Native</p> */}
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Server size={12} className="text-blue-700" />
                  <h4 className="font-semibold text-xs text-blue-700">Backend & API</h4>
                </div>
                <p className="text-xs text-gray-700">Go (Gin, Fiber), Node.js (Fastify, NestJS), Python (Django), Kotlin (Spring Boot), GraphQL, gRPC</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <FlaskConical size={12} className="text-blue-700" />
                  <h4 className="font-semibold text-xs text-blue-700">Testing Tools</h4>
                </div>
                <p className="text-xs text-gray-700">Go (Testify, Mockery, Ginkgo, Gomega), TypeScript (Jest, Playwright), k6</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Database size={12} className="text-blue-700" />
                  <h4 className="font-semibold text-xs text-blue-700">Databases</h4>
                </div>
                <p className="text-xs text-gray-700">PostgreSQL, MySQL, MongoDB, Redis</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Workflow size={12} className="text-blue-700" />
                  <h4 className="font-semibold text-xs text-blue-700">Messaging &amp; Data</h4>
                </div>
                <p className="text-xs text-gray-700">Kafka, RabbitMQ, AWS SQS, Airflow, Spark SQL</p>
              </div>
              <div className="bg-white p-2 rounded shadow-sm">
                <div className="flex items-center gap-2 mb-1">
                  <Cloud size={12} className="text-blue-700" />
                  <h4 className="font-semibold text-xs text-blue-700">DevOps & Cloud</h4>
                </div>
                <p className="text-xs text-gray-700">Docker, Kubernetes, AWS, Firebase, GitHub Actions, GitLab CI/CD, Cloudflare</p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">EDUCATION</h3>
            <div className="bg-white p-3 rounded shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded">
                  <img src="/images/sut.gif" alt="SUT Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-gray-800">B.Eng. in Computer Engineering</h4>
                  <p className="text-xs text-gray-600">Suranaree University of Technology</p>
                  <p className="text-xs text-gray-500">2017 - 2021</p>
                  {/* <p className="text-xs text-gray-500">2017 - 2021 | GPA: 2.86</p> */}
                </div>
              </div>
            </div>
          </section>


          {/* Languages */}
          <section>
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">LANGUAGES</h3>
            <div className="bg-white p-3 rounded shadow-sm">
              <p className="text-xs font-medium">Thai | English</p>
            </div>
          </section>

          {/* Interests */}
          {/* <section>
            <h3 className="text-sm font-bold text-gray-800 border-b border-gray-300 pb-1 mb-2">INTERESTS</h3>
            <div className="bg-white p-3 rounded shadow-sm space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium bg-blue-50 px-2 py-1 rounded border-l-3 border-blue-400">BANK</span>
                <span className="text-xs font-medium bg-blue-50 px-2 py-1 rounded border-l-3 border-blue-400">Finance</span>
                <span className="text-xs font-medium bg-blue-50 px-2 py-1 rounded border-l-3 border-blue-400">Crypto</span>
              </div>
            </div>
          </section> */}
        </div>
      </div>
    </div>
  );
}