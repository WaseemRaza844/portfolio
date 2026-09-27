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
    "skills": [
      "Python",
      "3GPP",
      "Simulation",
      "Wireless Networks"
    ],
    "featured": true,
    "group": "academic-research",
    "status": "Research completed"
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
    "status": "Research completed"
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
    "status": "Active research"
  }
];
