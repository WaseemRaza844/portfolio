/* Edit this file to add certifications, publications, and projects.
   Set featured: true to include an item on the landing page. */
window.PORTFOLIO_DATA = {
  settings: {
    typography: {
      preset: "executive", // executive, modern, or classic
      size: "medium" // small, medium, or large
    },
    learning: {
      showTakeaways: false,
      showEmptyPaths: false
    }
  },
  domainAreas: [
    { id: "genai", title: "Generative & Agentic AI", description: "LLM applications, retrieval, orchestration, agents, evaluation, and responsible AI." },
    { id: "system-design", title: "System Design & Software Architecture", description: "Scalable services, distributed systems, architecture tradeoffs, and reliability." },
    { id: "ml-data", title: "Machine Learning & Data Science", description: "Traditional machine learning, analytics, data platforms, and model evaluation." },
    { id: "cloud-devops", title: "Cloud, DevOps & Software Engineering", description: "Cloud-native development, containers, automation, deployment, and operations." },
    { id: "wireless", title: "Wireless Communications & Networks", description: "Radio systems, cellular networks, signal processing, and communication technologies." }
  ],
  certifications: [
    {
      id: "system-design-masterclass",
      profiles: ["generic", "genai"],
      domain: "system-design",
      title: "System Design Masterclass",
      issuer: "Packt / Coursera",
      status: "In progress",
      completionDate: "Target: 2026",
      summary: "Architecture case studies covering scalable feeds, distributed data flows, caching, consistency, availability, and engineering tradeoffs.",
      takeaway: "Translate product requirements into explicit capacity assumptions, service boundaries, data models, and defensible architecture tradeoffs.",
      skills: ["System Design", "Distributed Systems", "Scalability", "Caching"],
      certificateUrl: "",
      links: { coursera: "", linkedin: "", github: "" },
      courses: [
        { title: "Design Instagram Newsfeed", completionDate: "Completed", takeaway: "Designed feed generation, fan-out, storage, caching, and availability paths.", skills: ["Feed Design", "Caching", "Fan-out"], certificateUrl: "" },
        { title: "System Architecture Assessments", completionDate: "In progress", takeaway: "Practice comparing architectural choices against scale, reliability, latency, and consistency requirements.", skills: ["Architecture Tradeoffs", "Reliability"], certificateUrl: "" }
      ],
      featured: true
    },
    {
    id: "aws-bedrock-professional",
    profiles: ["generic", "genai", "faculty"],
    domain: "genai",
    title: "AWS Generative AI and AI Agents with Amazon Bedrock",
    issuer: "AWS / Coursera",

    status: "Completed",
    completionDate: "August 2026",

    summary:
      "Three-course professional certificate focused on developing, customizing, optimizing, and automating generative AI applications and intelligent agents with Amazon Bedrock.",

    takeaway:
      "Build and deploy generative AI applications using foundation models, knowledge bases, LangChain, Amazon Q Developer, and Amazon Bedrock agent capabilities.",

    skills: [
      "Amazon Bedrock",
      "Generative AI",
      "AI Agents",
      "Foundation Models",
      "Knowledge Bases",
      "Retrieval-Augmented Generation",
      "LangChain",
      "Amazon Q Developer",
      "Model Customization",
      "Prompt Engineering",
      "Natural Language Processing",
      "Text Generation",
      "Summarization",
      "Generative AI Application Development"
    ],

    certificateUrl:
      "./certificates/genai/aws-bedrock/aws-generative-ai-agents-amazon-bedrock.pdf",

    links: {
      coursera:
        "https://coursera.org/verify/professional-cert/XMNOUZNOW9M0",
      linkedin: "",
      github: ""
    },

    courses: [
          {
            title: "Getting Started with AWS Generative AI for Developers",

            status: "Completed",
            modulesCompleted: 2,
            modulesTotal: 2,
            completionDate: "August 2026",

            summary:
              "Foundation course covering generative AI concepts, language models, prompt engineering, and AWS services for developers.",

            takeaway:
              "Established the foundations needed to design and evaluate generative AI applications on AWS.",

            skills: [
              "AWS Generative AI",
              "Foundation Models",
              "Large Language Models",
              "Prompt Engineering",
              "Natural Language Processing"
            ],

            certificateUrl:
              "./certificates/genai/aws-bedrock/c1-getting-started-aws-generative-ai.pdf"
          },

      {
        title: "Generative AI Applications with Amazon Bedrock",
        completionDate: "Completed",

        takeaway:
          "Developed generative AI applications with Amazon Bedrock using foundation models, knowledge bases, LangChain, and application-oriented architecture patterns.",

        skills: [
          "Amazon Bedrock",
          "Generative AI Applications",
          "Knowledge Bases",
          "LangChain",
          "Retrieval-Augmented Generation",
          "Text Generation",
          "Summarization"
        ],

        certificateUrl:
          "./certificates/genai/aws-bedrock/c2-generative-ai-applications-bedrock.pdf"
      },

      {
        title: "Amazon Bedrock Customization, Optimization & Automation",
        completionDate: "Completed",

        takeaway:
          "Applied advanced Amazon Bedrock capabilities for model customization, application optimization, workflow automation, and intelligent-agent development.",

        skills: [
          "Amazon Bedrock",
          "AI Agents",
          "Model Customization",
          "Generative AI Optimization",
          "Workflow Automation",
          "Amazon Q Developer",
          "Agentic AI"
        ],

        certificateUrl:
          "./certificates/genai/aws-bedrock/c3-bedrock-customization-optimization-automation.pdf"
      }
    ],

    featured: true
  },
    {
      id: "ibm-genai-engineering",
      profiles: ["generic", "genai"],
      domain: "genai",
      title: "IBM Generative AI Engineering Professional Certificate",
      issuer: "IBM / Coursera",
      status: "In progress",
      completionDate: "Target: 2026",
      summary: "Applied development of generative-AI systems, from LLM foundations through retrieval, orchestration, evaluation, and agents.",
      takeaway: "Design grounded, tool-using GenAI applications and evaluate them as complete systems rather than isolated model calls.",
      skills: ["LLMs", "RAG", "LangChain", "Fine-tuning", "AI Agents"],
      certificateUrl: "",
      links: { coursera: "", linkedin: "", github: "" },
      courses: [
        { title: "Develop Generative AI Applications: Get Started", completionDate: "Completed", takeaway: "Built practical GenAI applications with Python, Flask, Gradio, prompt engineering, and LangChain.", skills: ["Python", "Flask", "Gradio", "LangChain"], certificateUrl: "" },
        { title: "Build RAG Applications: Get Started", completionDate: "Completed", takeaway: "Connected retrieval pipelines to LLM applications for grounded responses.", skills: ["RAG", "Embeddings", "Retrieval"], certificateUrl: "" },
        { title: "Vector Databases for RAG: An Introduction", completionDate: "Completed", takeaway: "Applied vector storage, similarity search, chunking, and retrieval concepts.", skills: ["Vector Databases", "Similarity Search"], certificateUrl: "" },
        { title: "Fundamentals of Building AI Agents", completionDate: "Completed", takeaway: "Designed agents that plan, use tools, maintain state, and complete multi-step tasks.", skills: ["AI Agents", "Tool Use", "Planning"], certificateUrl: "" },
        { title: "Agentic AI with LangChain and LangGraph", completionDate: "In progress", takeaway: "Orchestrated stateful agent workflows with explicit control flow and evaluation points.", skills: ["LangGraph", "LangChain", "Agent Orchestration"], certificateUrl: "" }
      ],
      featured: true
    },
    {
      id: "ibm-devops",
      profiles: ["generic", "genai"],
      domain: "cloud-devops",
      title: "IBM DevOps and Software Engineering Professional Certificate",
      issuer: "IBM / Coursera",
      status: "In progress",
      completionDate: "Target: 2026",
      summary: "Production software practices spanning cloud-native development, automation, deployment, and operations.",
      takeaway: "Build, package, test, and deploy maintainable services through repeatable cloud-native engineering workflows.",
      skills: ["Docker", "Kubernetes", "OpenShift", "CI/CD", "Microservices"],
      certificateUrl: "",
      links: { coursera: "", linkedin: "", github: "" },
      courses: [
        { title: "Introduction to Cloud Computing", completionDate: "Completed", takeaway: "Applied cloud service, deployment, and infrastructure concepts.", skills: ["Cloud Computing", "IaaS", "PaaS"], certificateUrl: "" },
        { title: "Linux Commands and Shell Scripting", completionDate: "Completed", takeaway: "Automated repeatable development and operations tasks through shell workflows.", skills: ["Linux", "Bash", "Automation"], certificateUrl: "" },
        { title: "Python Project for AI and Application Development", completionDate: "Completed", takeaway: "Structured Python applications and exposed functionality through web services.", skills: ["Python", "Flask", "Testing"], certificateUrl: "" },
        { title: "Introduction to Containers with Docker, Kubernetes and OpenShift", completionDate: "In progress", takeaway: "Package and orchestrate portable services across container platforms.", skills: ["Docker", "Kubernetes", "OpenShift"], certificateUrl: "" }
      ],
      featured: true
    },
    {
      id: "genai-fundamentals",
      profiles: ["genai", "faculty"],
      domain: "genai",
      title: "Generative AI Fundamentals Specialization",
      issuer: "IBM / Coursera",
      status: "Completed",
      completionDate: "Completed",
      summary: "Five-course foundation in generative AI, prompt engineering, LLMs, and practical enterprise applications.",
      takeaway: "Understand how generative models work, where they create value, and how to apply them responsibly.",
      skills: ["Generative AI", "Prompt Engineering", "LLMs", "Responsible AI"],
      certificateUrl: "",
      links: { coursera: "", linkedin: "", github: "" },
      courses: [
        { title: "Generative AI: Introduction and Applications", completionDate: "Completed", takeaway: "Evaluated generative-AI capabilities, limitations, and application patterns.", skills: ["Generative AI", "Use Cases"], certificateUrl: "" },
        { title: "Generative AI: Prompt Engineering Basics", completionDate: "Completed", takeaway: "Designed structured prompts and iterative prompting workflows.", skills: ["Prompt Engineering", "LLMs"], certificateUrl: "" },
        { title: "Generative AI: Elevate Your Data Science Career", completionDate: "Completed", takeaway: "Connected GenAI capabilities with practical data-science workflows.", skills: ["Data Science", "Generative AI"], certificateUrl: "" }
      ],
      featured: false
    },
    {
      id: "stanford-machine-learning",
      profiles: ["generic", "faculty"],
      domain: "ml-data",
      title: "Machine Learning",
      issuer: "Stanford University / Coursera",
      status: "Completed",
      completionDate: "Completed",
      summary: "Core supervised and unsupervised learning, model evaluation, optimization, and practical ML system development.",
      takeaway: "Select, train, diagnose, and improve machine-learning models using principled evaluation.",
      skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Optimization"],
      certificateUrl: "",
      links: { coursera: "", linkedin: "", github: "" },
      courses: [
        { title: "Machine Learning", completionDate: "Completed", takeaway: "Applied regression, classification, clustering, anomaly detection, and model diagnostics.", skills: ["Regression", "Classification", "Clustering"], certificateUrl: "" }
      ],
      featured: false
    },
    {
      id: "google-cloud-data-analytics",
      profiles: ["generic"],
      domain: "ml-data",
      title: "Google Cloud Data Analytics Professional Certificate",
      issuer: "Google Cloud / Coursera",
      status: "Completed",
      completionDate: "Completed",
      summary: "Cloud data transformation, analysis, visualization, and decision support using Google Cloud tools.",
      takeaway: "Turn raw cloud data into governed, queryable, and decision-ready analytical outputs.",
      skills: ["SQL", "BigQuery", "Data Analytics", "Visualization"],
      certificateUrl: "",
      links: { coursera: "", linkedin: "", github: "" },
      courses: [
        { title: "Introduction to Data Analytics in Google Cloud", completionDate: "Completed", takeaway: "Mapped analytical questions to cloud data workflows and services.", skills: ["Google Cloud", "Analytics"], certificateUrl: "" },
        { title: "Data Management and Storage", completionDate: "Completed", takeaway: "Selected storage and governance patterns for analytical workloads.", skills: ["Data Management", "Cloud Storage"], certificateUrl: "" },
        { title: "Data Transformation", completionDate: "Completed", takeaway: "Prepared and transformed data for reliable analysis.", skills: ["SQL", "BigQuery", "Data Transformation"], certificateUrl: "" }
      ],
      featured: false
    }
  ],
  projects: [
    {
      id: "system-design-portfolio",
      profiles: ["generic", "genai"],
      title: "System Design Case-Study Portfolio",
      category: "Guided Project",
      date: "2026 · In progress",
      summary: "Documented architecture studies that translate product requirements into scalable services, data models, APIs, caching strategies, and reliability tradeoffs.",
      skills: ["System Design", "APIs", "Distributed Systems", "Scalability"],
      featured: true
    },
    {
      id: "agentic-ai-rag",
      profiles: ["generic", "genai"],
      title: "Agentic AI and RAG Applications",
      category: "Portfolio Project",
      date: "2026 · In progress",
      summary: "Practical experiments with retrieval, tool-using agents, orchestration, memory, evaluation, and multi-agent workflows.",
      skills: ["LangGraph", "CrewAI", "AutoGen", "RAG", "Vector Databases"],
      featured: true
    },
    {
      id: "financial-ml",
      profiles: ["generic", "finance"],
      title: "Financial ML and Forecasting",
      category: "Portfolio Project",
      date: "2024–2025",
      summary: "Credit-risk and loan-default modeling alongside time-series forecasting workflows for financial data.",
      skills: ["Python", "Machine Learning", "Time Series", "Model Evaluation"],
      featured: false
    },
    {
      id: "cloud-computer-vision",
      profiles: ["generic"],
      title: "Cloud Computer Vision",
      category: "Guided Project",
      date: "2025",
      summary: "Real-time object detection, vehicle counting, and image-classification workflows using cloud-native AI services.",
      skills: ["Computer Vision", "Streaming", "Google Cloud AutoML", "Python"],
      featured: false
    },
    {
      id: "lakehouse-pipeline",
      profiles: ["generic", "genai"],
      title: "AI-Ready Lakehouse Pipeline",
      category: "Portfolio Project",
      date: "2024",
      summary: "An Azure Databricks data pipeline designed for analytics and downstream machine-learning workloads.",
      skills: ["Azure", "Databricks", "Spark", "Data Engineering"],
      featured: false
    },
    {
      id: "meeting-minutes-llm",
      profiles: ["genai"],
      title: "Automated Meeting Minutes Generator with LLMs",
      category: "Guided Project",
      date: "2025",
      summary: "A workflow that transcribes meetings, produces structured summaries, and extracts decisions and action items for downstream collaboration.",
      skills: ["Python", "Speech-to-Text", "LLM Summarization", "Workflow Automation"],
      featured: false
    },
    {
      id: "unstructured-document-extraction",
      profiles: ["genai"],
      title: "LLM-Based Extraction from Unstructured Documents",
      category: "Guided Project",
      date: "2025",
      summary: "Document intelligence pipeline for extracting entities, fields, and tables from reports, invoices, and contracts.",
      skills: ["LLMs", "OCR", "Named Entity Recognition", "Data Integration"],
      featured: false
    },
    {
      id: "syntheticnet",
      profiles: ["generic", "faculty", "wireless"],
      title: "SyntheticNET: 3GPP-Compliant Network Simulation",
      category: "Research Project",
      date: "2020–2024",
      summary: "Python-based simulation environment for realistic mobility, propagation, and data-driven experimentation in cellular networks.",
      skills: ["Python", "3GPP", "Simulation", "Wireless Networks"],
      featured: true
    },
    {
      id: "turboran",
      profiles: ["generic", "faculty", "wireless"],
      title: "TurboRAN Experimental Platform",
      category: "Research Infrastructure",
      date: "2020–2024",
      summary: "Multi-band, multi-tier experimental platform supporting evaluation of emerging AI-enabled radio-access-network solutions.",
      skills: ["5G Testbeds", "RAN", "Experiment Design", "Network Measurement"],
      featured: false
    },
    {
      id: "wearable-intelligence",
      profiles: ["faculty", "healthcare"],
      title: "Wearable Intelligence for Health Monitoring",
      category: "Research Project",
      date: "2024–2026",
      summary: "Deep-learning methods for continuous recognition of medication and dietary activities from wrist-worn inertial sensors.",
      skills: ["Wearable AI", "Time Series", "Deep Learning", "Smartwatch Sensing"],
      featured: false
    }
  ],
  publications: [
    {
      id: "medication-adherence-2026",
      profiles: ["generic", "faculty", "healthcare"],
      year: "2026",
      title: "Real-World Medication Adherence Monitoring Using Hybrid Neural Networks and Smartwatches",
      venue: "HealthINF · Accepted",
      summary: "Wearable AI for continuous, real-world medication-intake monitoring.",
      topics: ["Wearable AI", "Deep Learning", "Health Monitoring"],
      featured: true
    },
    {
      id: "multiparameter-reliability-2025",
      profiles: ["generic", "faculty", "wireless"],
      year: "2025",
      title: "On Multi-Parameter Optimization and Proactive Reliability in Cellular Networks",
      venue: "Journal article",
      summary: "Data-driven optimization and proactive reliability for future cellular-network operation.",
      topics: ["Optimization", "Reliability", "Cellular Networks"],
      featured: true
    },
    {
      id: "resilient-propagation-2024",
      profiles: ["generic", "faculty", "wireless"],
      year: "2024",
      title: "An AI-Driven Framework for Enhancing Resilience in Propagation Models to Enable Digital Twin",
      venue: "IEEE PIMRC",
      summary: "Robust, data-driven propagation modeling for wireless-network digital twins.",
      topics: ["Digital Twins", "Generative AI", "Propagation Modeling"],
      featured: true
    },
    {
      id: "outage-management-2024",
      profiles: ["generic", "faculty", "wireless"],
      year: "2024",
      title: "Data-Driven Intelligent Outage Management for High Shadowing Environments in 5G&B Networks",
      venue: "IEEE SmartNets",
      summary: "Intelligent outage detection and management in challenging radio environments.",
      topics: ["Outage Management", "5G", "Machine Learning"],
      featured: false
    },
    {
      id: "lunarcomm-2022",
      profiles: ["generic", "faculty", "wireless"],
      year: "2022",
      title: "Toward a Hybrid RF/Optical Lunar Communication System (LunarComm)",
      venue: "IEEE Network",
      summary: "A hybrid architecture for sustainable, high-data-rate lunar connectivity.",
      topics: ["Lunar Communications", "RF/FSO", "Network Architecture"],
      url: "https://arxiv.org/abs/2203.15899",
      featured: false
    },
    {
      id: "positioning-ran-2022",
      profiles: ["generic", "faculty", "wireless"],
      year: "2022",
      title: "Towards Positioning Error Impact Characterization and Minimization in User-Centric RAN",
      venue: "IEEE WCNC",
      summary: "Data-driven characterization and optimization for user-centric radio access networks.",
      topics: ["User-Centric RAN", "Positioning", "Optimization"],
      featured: false
    },
    {
      id: "rf-energy-harvesting-2020",
      profiles: ["generic", "faculty", "wireless"],
      year: "2020",
      title: "Unification of RF Energy Harvesting Schemes under Mixed Rayleigh–Rician Fading Channels",
      venue: "AEÜ – International Journal of Electronics and Communications",
      summary: "Unified analysis of energy-harvesting cooperative-relaying schemes.",
      topics: ["Energy Harvesting", "Cooperative Relaying", "Wireless"],
      url: "https://doi.org/10.1016/j.aeue.2020.153244",
      featured: false
    }
  ]
};
