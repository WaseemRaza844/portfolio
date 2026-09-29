/* Guided, portfolio, professional, and research projects. */
window.PORTFOLIO_DATA = window.PORTFOLIO_DATA || {};

window.PORTFOLIO_DATA.projectGroups = [
  {
    "id": "academic-research",
    "title": "Academic & Research Projects",
    "description": "Doctoral, university, and experimental research spanning wireless networks, resilient AI, simulation platforms, and wearable intelligence."
  },
  {
    "id": "guided",
    "title": "Basic Guided Projects",
    "description": "Focused implementation exercises used to strengthen practical skills with AI/ML tools, cloud services, LLM workflows, and applied engineering."
  },
  {
    "id": "coursera-portfolio",
    "title": "Coursera & Portfolio Projects",
    "description": "Course-connected and self-directed portfolio work demonstrating system design, Agentic AI, data engineering, machine learning, and end-to-end implementation."
  }
];

window.PORTFOLIO_DATA.projects = [
  {
    "id": "system-design-portfolio",
    "profiles": [
      "generic",
      "genai"
    ],
    "title": "System Design Case-Study Portfolio",
    "category": "Guided Project",
    "date": "2026 · In progress",
    "summary": "Documented architecture studies that translate product requirements into scalable services, data models, APIs, caching strategies, and reliability tradeoffs.",
    "home": {
      "badge": "Architecture / System Design",
      "problem": "Translate ambiguous product requirements into architectures that remain scalable, reliable, and explainable under realistic traffic and data constraints.",
      "implementation": "Documented case studies cover service boundaries, APIs, storage models, caching, consistency, capacity assumptions, and availability tradeoffs across distributed-system designs.",
      "architectureUrl": "https://github.com/WaseemRaza844/system-design-masterclass",
      "caseStudyUrl": "./projects.html#system-design-portfolio"
    },
    "skills": [
      "System Design",
      "APIs",
      "Distributed Systems",
      "Scalability"
    ],
    "featured": true,
    "group": "coursera-portfolio",
    "status": "In progress"
  },
  {
    "id": "agentic-ai-rag",
    "profiles": [
      "generic",
      "genai"
    ],
    "title": "Agentic AI and RAG Applications",
    "category": "Portfolio Project",
    "date": "2026 · In progress",
    "summary": "Practical experiments with retrieval, tool-using agents, orchestration, memory, evaluation, and multi-agent workflows.",
    "home": {
      "badge": "GenAI / Agentic Systems",
      "problem": "Build grounded AI workflows that can retrieve context, use tools, maintain state, and complete multi-step tasks without relying on a single unconstrained model call.",
      "implementation": "Hands-on implementations explore RAG, vector retrieval, LangGraph-style orchestration, tool-using agents, memory, evaluation, and multi-agent workflow patterns.",
      "architectureUrl": "https://github.com/WaseemRaza844/agentic-ai-projects-by-was",
      "caseStudyUrl": "./projects.html#agentic-ai-rag"
    },
    "skills": [
      "LangGraph",
      "CrewAI",
      "AutoGen",
      "RAG",
      "Vector Databases"
    ],
    "featured": true,
    "group": "coursera-portfolio",
    "status": "In progress"
  },
  {
    "id": "financial-ml",
    "profiles": [
      "generic",
      "finance",
      "aiml"
    ],
    "title": "Financial ML and Forecasting",
    "category": "Portfolio Project",
    "date": "2024–2025",
    "summary": "Credit-risk and loan-default modeling alongside time-series forecasting workflows for financial data.",
    "skills": [
      "Python",
      "Machine Learning",
      "Time Series",
      "Model Evaluation"
    ],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed"
  },
  {
    "id": "cloud-computer-vision",
    "profiles": [
      "generic",
      "aiml"
    ],
    "title": "Cloud Computer Vision",
    "category": "Guided Project",
    "date": "2025",
    "summary": "Real-time object detection, vehicle counting, and image-classification workflows using cloud-native AI services.",
    "skills": [
      "Computer Vision",
      "Streaming",
      "Google Cloud AutoML",
      "Python"
    ],
    "featured": false,
    "group": "guided",
    "status": "Completed"
  },
  {
    "id": "lakehouse-pipeline",
    "profiles": [
      "generic",
      "genai",
      "aiml"
    ],
    "title": "AI-Ready Lakehouse Pipeline",
    "category": "Portfolio Project",
    "date": "2024",
    "summary": "An Azure Databricks data pipeline designed for analytics and downstream machine-learning workloads.",
    "skills": [
      "Azure",
      "Databricks",
      "Spark",
      "Data Engineering"
    ],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed"
  },
  {
    "id": "meeting-minutes-llm",
    "profiles": [
      "genai"
    ],
    "title": "Automated Meeting Minutes Generator with LLMs",
    "category": "Guided Project",
    "date": "2025",
    "summary": "A workflow that transcribes meetings, produces structured summaries, and extracts decisions and action items for downstream collaboration.",
    "skills": [
      "Python",
      "Speech-to-Text",
      "LLM Summarization",
      "Workflow Automation"
    ],
    "featured": false,
    "group": "guided",
    "status": "Completed"
  },
  {
    "id": "unstructured-document-extraction",
    "profiles": [
      "genai"
    ],
    "title": "LLM-Based Extraction from Unstructured Documents",
    "category": "Guided Project",
    "date": "2025",
    "summary": "Document intelligence pipeline for extracting entities, fields, and tables from reports, invoices, and contracts.",
    "skills": [
      "LLMs",
      "OCR",
      "Named Entity Recognition",
      "Data Integration"
    ],
    "featured": false,
    "group": "guided",
    "status": "Completed"
  },
  {
    "id": "syntheticnet",
    "profiles": [
      "generic",
      "faculty",
      "wireless"
    ],
    "title": "SyntheticNET: 3GPP-Compliant Network Simulation",
    "category": "Research Project",
    "date": "2020–2024",
    "summary": "Python-based simulation environment for realistic mobility, propagation, and data-driven experimentation in cellular networks.",
    "home": {
      "badge": "Research / Simulation",
      "problem": "Wireless-AI research requires repeatable network data that preserves realistic mobility, propagation, and cellular-system behavior when measured data is sparse or costly.",
      "implementation": "A Python-based, 3GPP-aligned simulation environment supports controlled data generation and large-scale experimentation for propagation, optimization, digital-twin, and resilience studies.",
      "caseStudyUrl": "./projects.html#syntheticnet"
    },
    "skills": [
      "Python",
      "3GPP",
      "Simulation",
      "Wireless Networks"
    ],
    "featured": true,
    "group": "academic-research",
    "status": "Research completed",
    "resourceLinks": [
      {
        "label": "Peer-Reviewed Article (Computer Communications 2025)",
        "url": "https://doi.org/10.1016/j.comcom.2025.108129"
      },
      {
        "label": "View on Google Scholar",
        "url": "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=d58Drr0AAAAJ&citation_for_view=d58Drr0AAAAJ:g5m5HwL7SMYC"
      }
    ]
  },
  {
    "id": "turboran",
    "profiles": [
      "generic",
      "faculty",
      "wireless"
    ],
    "title": "TurboRAN Experimental Platform",
    "category": "Research Infrastructure",
    "date": "2020–2024",
    "summary": "Multi-band, multi-tier experimental platform supporting evaluation of emerging AI-enabled radio-access-network solutions.",
    "skills": [
      "5G Testbeds",
      "RAN",
      "Experiment Design",
      "Network Measurement"
    ],
    "featured": false,
    "group": "academic-research",
    "status": "Research completed",
    "resourceLinks": [
      {
        "label": "Proactive Reliability Paper (Sensors 2025)",
        "url": "https://doi.org/10.3390/s25030807"
      },
      {
        "label": "Inter-Frequency Self-Optimization (IEEE TCCN)",
        "url": "https://doi.org/10.1109/TCCN.2022.3152510"
      }
    ]
  },
  {
    "id": "wearable-intelligence",
    "profiles": [
      "faculty",
      "healthcare",
      "aiml"
    ],
    "title": "Wearable Intelligence for Health Monitoring",
    "category": "Research Project",
    "date": "2024–2026",
    "summary": "Deep-learning methods for continuous recognition of medication and dietary activities from wrist-worn inertial sensors.",
    "skills": [
      "Wearable AI",
      "Time Series",
      "Deep Learning",
      "Smartwatch Sensing"
    ],
    "featured": false,
    "group": "academic-research",
    "status": "Active research",
    "resourceLinks": [
      {
        "label": "HEALTHINF 2026 Paper",
        "url": "https://orcid.org/0000-0002-5544-2637"
      }
    ]
  },
  {
    "id": "propagation-digital-twins",
    "profiles": [
      "generic",
      "faculty",
      "wireless"
    ],
    "title": "Propagation Models & Digital Twins",
    "category": "Research Project",
    "date": "2024",
    "summary": "Research on robust, data-driven radio-propagation modeling for wireless digital twins, including domain-informed generative learning and resilience under distribution shift.",
    "skills": [
      "Propagation Modeling",
      "Digital Twins",
      "GANs",
      "Domain Adaptation",
      "Wireless AI"
    ],
    "featured": false,
    "group": "academic-research",
    "status": "Research completed",
    "resourceLinks": [
      {
        "label": "IEEE PIMRC Digital Twin Paper",
        "url": "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=d58Drr0AAAAJ&citation_for_view=d58Drr0AAAAJ:B3FOqHG5BCQC"
      },
      {
        "label": "Domain-Informed GANs (IEEE VTC)",
        "url": "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=d58Drr0AAAAJ&citation_for_view=d58Drr0AAAAJ:b0M2c_1WBrUC"
      }
    ]
  }
];
