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
    "date": "2026",
    "summary": "Documented architecture studies that translate product requirements into scalable services, data models, APIs, caching strategies, and reliability tradeoffs.",
    "home": {
      "badge": "Architecture / System Design",
      "statusBadge": "Active Architecture",
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
    "status": "Active Architecture",
    "links": {
      "github": "https://github.com/WaseemRaza844/system-design-masterclass"
    },
    "architecture": "Requirements and traffic assumptions → service boundaries and APIs → data model and storage choices → caching and consistency strategy → reliability and capacity tradeoff review."
  },
  {
    "id": "agentic-ai-rag",
    "profiles": [
      "generic",
      "genai"
    ],
    "title": "Agentic AI and RAG Applications",
    "category": "Portfolio Project",
    "date": "2026",
    "summary": "Practical experiments with retrieval, tool-using agents, orchestration, memory, evaluation, and multi-agent workflows.",
    "home": {
      "badge": "GenAI / Agentic Systems",
      "statusBadge": "Active System",
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
    "status": "Active System",
    "links": {
      "github": "https://github.com/WaseemRaza844/agentic-ai-projects-by-was"
    },
    "architecture": "User task → retrieval/context layer → LangGraph-style state and routing → tool-using agents → memory/evaluation → grounded response or multi-agent handoff.",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/professional-cert/0CB713GHZC1B"
      }
    ]
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
    "title": "Cloud Computer Vision (GCP AutoML / Object Detection)",
    "category": "Guided Project",
    "date": "2025",
    "summary": "Implemented cloud-based computer-vision exercises for object detection, vehicle counting, and image classification using managed model workflows and Python-based inference.",
    "architecture": "Image/video input → preprocessing and frame sampling → managed AutoML/object-detection inference → class/count aggregation → result visualization and evaluation.",
    "skills": [
      "Computer Vision",
      "Object Detection",
      "Google Cloud AutoML",
      "Python",
      "Streaming",
      "Model Evaluation"
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
      "generic",
      "genai"
    ],
    "title": "Automated Audio Meeting Minutes with Whisper & GPT",
    "category": "Guided Project",
    "date": "2025",
    "summary": "Built a multimodal meeting workflow that converts recorded audio to text, generates a structured summary, and extracts decisions, owners, and action items.",
    "architecture": "Meeting audio → Whisper speech-to-text → transcript cleanup/chunking → GPT/LLM summarization → structured decisions and action items → shareable meeting-minutes output.",
    "skills": [
      "Python",
      "OpenAI Whisper",
      "Speech-to-Text",
      "GPT / LLMs",
      "Structured Output",
      "LLM Summarization",
      "Workflow Automation"
    ],
    "featured": false,
    "group": "guided",
    "status": "Completed",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/professional-cert/0CB713GHZC1B"
      }
    ]
  },
  {
    "id": "unstructured-document-extraction",
    "profiles": [
      "generic",
      "genai"
    ],
    "title": "OCR & Document Intelligence Extraction Pipeline",
    "category": "Guided Project",
    "date": "2025",
    "summary": "Implemented a document-intelligence workflow for extracting entities, key fields, and tables from reports, invoices, and contract-style documents.",
    "architecture": "Document/PDF input → OCR and text extraction → layout/table parsing → entity and field extraction → normalization/validation → structured JSON or tabular output.",
    "skills": [
      "OCR",
      "Document Intelligence",
      "LLMs",
      "Named Entity Recognition",
      "Table Extraction",
      "Structured Data",
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
  },
  {
    "id": "aws-bedrock-applied-genai",
    "profiles": ["generic", "genai", "aiml"],
    "title": "Amazon Bedrock Generative AI & Agent Workflows",
    "category": "Certification Project",
    "date": "2026",
    "summary": "Implemented credential-backed exercises for foundation-model prompting, Bedrock knowledge bases, RAG integration, model customization, workflow automation, and intelligent-agent development.",
    "architecture": "Prompt/task input → Amazon Bedrock foundation model → knowledge-base retrieval or LangChain orchestration → optional model customization/agent tools → evaluated application output.",
    "skills": ["Amazon Bedrock", "RAG", "Knowledge Bases", "LangChain", "AI Agents", "Prompt Engineering", "Amazon Q Developer"],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/professional-cert/XMNOUZNOW9M0"
      }
    ]
  },
  {
    "id": "genai-prompt-foundations",
    "profiles": ["generic", "genai", "faculty"],
    "title": "Prompt Engineering & Foundation Model Workflows",
    "category": "Certification Project",
    "date": "2026",
    "summary": "Applied prompt-engineering patterns, context design, model/platform comparison, and responsible-AI considerations across practical generative-AI exercises.",
    "architecture": "Task definition → prompt/context design → foundation-model selection → iterative response evaluation → responsible-use checks → refined task workflow.",
    "skills": ["Prompt Engineering", "Foundation Models", "IBM watsonx", "Hugging Face", "Responsible AI", "Context Design"],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/specialization/IPQKDOHF3IV2"
      }
    ]
  },
  {
    "id": "multi-agent-orchestration",
    "profiles": ["generic", "genai"],
    "title": "Multi-Agent Orchestration with LangGraph, CrewAI & AutoGen",
    "category": "Certification Project",
    "date": "2026",
    "summary": "Implemented stateful agent workflows with tool calling, memory, conditional routing, ReAct-style reasoning, and multi-agent coordination across LangGraph, CrewAI, AutoGen/AG2, and BeeAI.",
    "architecture": "User objective → task decomposition → state/memory layer → conditional routing → specialized tool-using agents → collaboration/handoff → synthesized result.",
    "skills": ["LangGraph", "CrewAI", "AutoGen / AG2", "BeeAI", "Tool Calling", "Agent Memory", "Multi-Agent Systems"],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/specialization/CEVQP0RYI532"
      }
    ]
  },
  {
    "id": "rag-vector-retrieval-stack",
    "profiles": ["generic", "genai"],
    "title": "RAG Retrieval Stack with ChromaDB, FAISS & LlamaIndex",
    "category": "Certification Project",
    "date": "2026",
    "summary": "Built retrieval exercises covering document processing, embeddings, vector storage, semantic search, advanced retrievers, and interactive RAG application flows.",
    "architecture": "Documents → chunking/embeddings → ChromaDB or FAISS vector index → similarity/advanced retrieval → LangChain/LlamaIndex orchestration → grounded LLM response.",
    "skills": ["RAG", "ChromaDB", "FAISS", "LlamaIndex", "LangChain", "Embeddings", "HNSW", "Gradio"],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/specialization/I7IDRI3160WV"
      }
    ]
  },
  {
    "id": "ai-telecom-optimization",
    "profiles": ["generic", "faculty", "wireless"],
    "title": "AI for Telecom Network & Security Optimization",
    "category": "Certification Project",
    "date": "2026",
    "summary": "Applied AI concepts to telecommunications network optimization, security analysis, and customer-experience improvement through a three-course specialization.",
    "architecture": "Telecom use case → network/security/customer data framing → AI-assisted analysis → optimization or service-improvement recommendation → operational interpretation.",
    "skills": ["AI for Telecommunications", "Network Optimization", "Telecom Security", "Customer Experience", "Python", "TensorFlow"],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/specialization/D8Y6MVC0XM51"
      }
    ]
  },
  {
    "id": "4g-cellular-analysis",
    "profiles": ["generic", "faculty", "wireless"],
    "title": "4G Cellular Network Fundamentals Lab",
    "category": "Certification Project",
    "date": "2026",
    "summary": "Consolidated LTE/4G architecture, cellular-network concepts, and telecommunications fundamentals into a structured network-analysis learning project.",
    "architecture": "4G architecture and protocol concepts → radio/core-network role mapping → mobility and service-flow analysis → cellular-system interpretation.",
    "skills": ["4G Networks", "LTE", "Cellular Networks", "Telecommunications"],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/DLW1YN474VZJ"
      }
    ]
  },
  {
    "id": "5g-edge-iot-ai-analysis",
    "profiles": ["generic", "faculty", "wireless"],
    "title": "5G + Edge + IoT + AI Architecture Analysis",
    "category": "Certification Project",
    "date": "2026",
    "summary": "Evaluated how 5G connectivity, edge computing, IoT, and AI interact in service architectures and business-oriented deployment scenarios.",
    "architecture": "Use-case requirements → 5G connectivity assumptions → edge placement → IoT data flow → AI processing layer → business and operational tradeoff analysis.",
    "skills": ["5G", "Edge Computing", "IoT", "Artificial Intelligence", "Architecture Analysis"],
    "featured": false,
    "group": "coursera-portfolio",
    "status": "Completed",
    "resourceLinks": [
      {
        "label": "View Verified Certificate / Credential",
        "url": "https://coursera.org/verify/SAUEVQXV5W71"
      }
    ]
  }
];
