export const resumeProfile = {
  name: "Majitov Ferdavs",
  title: "AI Engineer & Senior Software Engineer",
  subtitle: "Distributed Systems & Multi-Agent AI Architect",
  experienceYears: "6+",
  location: "UTC+5 / UTC+1",
  email: "majitov.ferdavs@gmail.com",
  telegram: "https://t.me/ferchke7",
  telegramHandle: "@ferchke7",
  github: "https://github.com/ferchke7",
  githubHandle: "github.com/ferchke7",
  linkedin: "https://linkedin.com/in/ferdavs",
  linkedinHandle: "linkedin.com/in/ferdavs",
  summary:
    "AI Engineer & Senior Software Engineer with 6+ years in software development, building distributed systems with C#/.NET and Go, and delivering LLM integrations, RAG pipelines, and multi-agent automation.",
  
  telemetry: [
    { label: "Production Runtime", value: "6+ Years", desc: "Enterprise & High-Load" },
    { label: "Delivery Reliability", value: "99%+", desc: "Transactional Outbox/Inbox" },
    { label: "Latency Reduction", value: "-70%", desc: "PostgreSQL & API Tuning" },
    { label: "Detection Speedup", value: "-60%", desc: "OTel, Prometheus, Grafana" },
    { label: "Wolverine OSS PRs", value: "7 Merged", desc: "Kafka & EF Core Core Logic" },
    { label: "Cloud Architecture", value: "OCI Certified", desc: "Oracle Cloud Infrastructure" }
  ],

  skillClusters: [
    { name: "AI & RAG", value: 95 },
    { name: "C# / .NET", value: 98 },
    { name: "Go & Microservices", value: 92 },
    { name: "Kafka & Messaging", value: 96 },
    { name: "PostgreSQL & DBs", value: 94 },
    { name: "Cloud & DevOps", value: 88 }
  ],

  skillCategories: [
    {
      id: "ai",
      title: "AI Engineering & Multi-Agent",
      badge: "High Growth",
      skills: [
        { name: "LLM Integration", level: "Senior", tag: "Production" },
        { name: "RAG Pipelines", level: "Production", tag: "Grounding" },
        { name: "LangChain", level: "Advanced", tag: "Orchestration" },
        { name: "LangGraph", level: "Advanced", tag: "Stateful Workflows" },
        { name: "Multi-Agent Systems", level: "Production", tag: "Autonomous" },
        { name: "Multi-provider LLMs", level: "Advanced", tag: "Fallback & Routing" }
      ]
    },
    {
      id: "languages",
      title: "Languages & Frameworks",
      badge: "Core Stack",
      skills: [
        { name: "C#", level: "Staff/Senior", tag: ".NET 10/8/6" },
        { name: "ASP.NET Core", level: "Expert", tag: "Web APIs & Microservices" },
        { name: "Go (Golang)", level: "Senior", tag: "High-Throughput APIs" },
        { name: "Entity Framework Core", level: "Expert", tag: "EF Core & Dapper" },
        { name: "TypeScript / React", level: "Senior", tag: "Full-Stack UI" },
        { name: "Python", level: "Advanced", tag: "AI / Data / RAG" },
        { name: "Java / Spring Boot", level: "Intermediate+", tag: "Spring Boot 2/3" },
        { name: "Rust", level: "Foundational", tag: "Systems" }
      ]
    },
    {
      id: "architecture",
      title: "Architecture & Messaging",
      badge: "Enterprise",
      skills: [
        { name: "Distributed Systems", level: "Expert", tag: "High Load" },
        { name: "Microservices", level: "Expert", tag: "Modular" },
        { name: "Event-Driven Architecture", level: "Expert", tag: "EDA" },
        { name: "Domain-Driven Design", level: "Expert", tag: "DDD" },
        { name: "Kafka", level: "Senior", tag: "Event Streaming" },
        { name: "Wolverine & MassTransit", level: "Contributor", tag: "Transactional Messaging" },
        { name: "RabbitMQ & AWS SQS", level: "Senior", tag: "Queues" },
        { name: "gRPC & REST", level: "Expert", tag: "Protocols" },
        { name: "Outbox / Inbox Patterns", level: "Expert", tag: "Idempotency" }
      ]
    },
    {
      id: "storage",
      title: "Databases & Storage",
      badge: "High Scale",
      skills: [
        { name: "PostgreSQL", level: "Expert", tag: "Query Tuning & Indexing" },
        { name: "Redis", level: "Senior", tag: "Caching & PubSub" },
        { name: "Microsoft SQL Server", level: "Senior", tag: "Enterprise" },
        { name: "Oracle Database", level: "Advanced", tag: "OCI" },
        { name: "Amazon S3 & MinIO", level: "Senior", tag: "Object Storage" },
        { name: "Oracle Object Storage", level: "Advanced", tag: "Cloud Storage" }
      ]
    },
    {
      id: "devops",
      title: "DevOps, Cloud & Observability",
      badge: "Infrastructure",
      skills: [
        { name: "Docker & Containers", level: "Expert", tag: "Multi-stage" },
        { name: "Kubernetes", level: "Advanced", tag: "K8s Deployments" },
        { name: "AWS & OCI", level: "Certified", tag: "Cloud Architecture" },
        { name: "CI/CD Automation", level: "Senior", tag: "GitHub Actions / GitLab CI" },
        { name: "Prometheus & Grafana", level: "Senior", tag: "Metrics & Alerts" },
        { name: "OpenTelemetry (OTel)", level: "Senior", tag: "Distributed Tracing" },
        { name: "Linux Administration", level: "Senior", tag: "Production Systems" },
        { name: "JMeter", level: "Advanced", tag: "Stress & Load Testing" }
      ]
    }
  ],

  experience: [
    {
      period: "Apr 2026 – Present",
      company: "NDA (Contract)",
      role: "AI Engineer",
      type: "Remote",
      highlight: "Multi-Agent Workflows & Production RAG Pipelines",
      highlightsList: [
        "Integrated 4 external AI services with LangChain/LangGraph to automate complex requests through multi-agent workflows.",
        "Built a production RAG pipeline grounding LLM responses in internal and external company data.",
        "Led full-stack delivery of an AI-powered FinTech whiteboard with multi-provider LLM integration."
      ],
      stack: ["Go", "Python", "React", "TypeScript", "PostgreSQL", "LangChain", "LangGraph", "Docker", "Kubernetes"]
    },
    {
      period: "Mar 2024 – Apr 2026",
      company: "LS ELECTRIC",
      role: "Software Engineer",
      type: "On-site, South Korea",
      highlight: "99%+ Reliability & Kafka/Wolverine Infrastructure",
      highlightsList: [
        "Raised message delivery reliability to 99%+ with transactional Outbox/Inbox and idempotent event processing.",
        "Led feature delivery and technical coordination for Kafka/Wolverine services across automated production workflows.",
        "Integrated Prometheus, Grafana, and Microsoft Active Directory for observability and centralized access control."
      ],
      stack: ["C#", ".NET", "ASP.NET Core", "Java", "Spring Boot", "Kafka", "RabbitMQ", "Wolverine", "MassTransit", "Prometheus", "Grafana"]
    },
    {
      period: "Dec 2022 – Feb 2024",
      company: "KOBOTS",
      role: "Senior Software Engineer",
      type: "On-site, South Korea",
      highlight: "AI-driven Backend Serving Thousands of Daily Active Users",
      highlightsList: [
        "Designed an ASP.NET Core backend for AI-driven therapy serving thousands of daily active iOS and Android users.",
        "Optimized PostgreSQL queries, improving query performance by 40%.",
        "Optimized AWS infrastructure, reducing monthly cloud costs by 20%.",
        "Integrated 3 payment providers: Stripe, Google Pay, and Apple Pay.",
        "Integrated Firebase messaging, increasing user engagement by 25%."
      ],
      stack: ["C#", "ASP.NET Core", "PostgreSQL", "Redis", "Firebase", "AWS EC2/RDS/S3", "Docker", "REST API"]
    },
    {
      period: "Feb 2021 – Jun 2022",
      company: "PayPal (Contract)",
      role: "Software Engineer",
      type: "Remote",
      highlight: "Reduced Latency by 70% & Cut Detection Time by 60%",
      highlightsList: [
        "Reduced average latency by 70% by optimizing PostgreSQL queries and API endpoints.",
        "Cut production issue detection time by 60% with logging, Prometheus, Grafana, and OpenTelemetry tracing.",
        "Built high-throughput event-driven services using Go, Kafka, and PostgreSQL."
      ],
      stack: ["Go", "Kafka", "PostgreSQL", "Redis", "AWS", "gRPC", "Prometheus", "Grafana", "OpenTelemetry", "Docker"]
    },
    {
      period: "Jan 2020 – Feb 2021",
      company: "QIWI",
      role: "Golang Developer",
      type: "Remote",
      highlight: "High-Volume REST APIs & Automated CI Pipelines",
      highlightsList: [
        "Developed Go REST APIs with PostgreSQL, input validation, structured logging, error handling, unit tests, Docker, Git, and CI pipelines."
      ],
      stack: ["Go", "PostgreSQL", "Docker", "REST API", "Git", "CI/CD Pipelines", "Unit Testing"]
    }
  ],

  openSource: {
    title: "Wolverine (.NET Messaging Framework)",
    role: "Open Source Contributor",
    contribution: "Contributed 7 merged PRs enhancing Kafka and EF Core integration logic.",
    url: "https://github.com/JasperFx/wolverine",
    tags: [".NET", "Kafka", "EF Core", "Distributed Messaging", "Transactional Outbox"]
  },

  education: [
    {
      institution: "Chungnam National University",
      degree: "Bachelor of Arts, Asia Business; Minor in Computer Science",
      period: "2019 – 2023",
      location: "South Korea"
    }
  ],

  certifications: [
    {
      name: "Oracle Cloud Infrastructure (OCI) Architecture Certification",
      issuer: "Oracle Certification",
      year: "2026",
      tag: "Cloud Architecture"
    }
  ],

  languages: [
    { name: "English", level: "C1 Professional", code: "EN" },
    { name: "Uzbek", level: "Native", code: "UZ" },
    { name: "Korean", level: "C1 Professional", code: "KO" },
    { name: "Russian", level: "Native", code: "RU" }
  ]
};
