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
      title: "System Design Case-Study Portfolio",
      category: "Guided Project",
      date: "2026 · In progress",
      summary: "Documented architecture studies that translate product requirements into scalable services, data models, APIs, caching strategies, and reliability tradeoffs.",
      skills: ["System Design", "APIs", "Distributed Systems", "Scalability"],
      featured: true
    },
    {
      title: "Agentic AI and RAG Applications",
      category: "Portfolio Project",
      date: "2026 · In progress",
      summary: "Practical experiments with retrieval, tool-using agents, orchestration, memory, evaluation, and multi-agent workflows.",
      skills: ["LangGraph", "CrewAI", "AutoGen", "RAG", "Vector Databases"],
      featured: true
    },
    {
      title: "Financial ML and Forecasting",
      category: "Portfolio Project",
      date: "2024–2025",
      summary: "Credit-risk and loan-default modeling alongside time-series forecasting workflows for financial data.",
      skills: ["Python", "Machine Learning", "Time Series", "Model Evaluation"],
      featured: true
    },
    {
      title: "Cloud Computer Vision",
      category: "Guided Project",
      date: "2025",
      summary: "Real-time object detection, vehicle counting, and image-classification workflows using cloud-native AI services.",
      skills: ["Computer Vision", "Streaming", "Google Cloud AutoML", "Python"],
      featured: false
    },
    {
      title: "AI-Ready Lakehouse Pipeline",
      category: "Portfolio Project",
      date: "2024",
      summary: "An Azure Databricks data pipeline designed for analytics and downstream machine-learning workloads.",
      skills: ["Azure", "Databricks", "Spark", "Data Engineering"],
      featured: false
    }
  ],
  publications: [
    {
      year: "2026",
      title: "Real-World Medication Adherence Monitoring Using Hybrid Neural Networks and Smartwatches",
      venue: "HealthINF · Accepted",
      summary: "Wearable AI for continuous, real-world medication-intake monitoring.",
      topics: ["Wearable AI", "Deep Learning", "Health Monitoring"],
      featured: true
    },
    {
      year: "2025",
      title: "On Multi-Parameter Optimization and Proactive Reliability in Cellular Networks",
      venue: "Journal article",
      summary: "Data-driven optimization and proactive reliability for future cellular-network operation.",
      topics: ["Optimization", "Reliability", "Cellular Networks"],
      featured: true
    },
    {
      year: "2024",
      title: "An AI-Driven Framework for Enhancing Resilience in Propagation Models to Enable Digital Twin",
      venue: "IEEE PIMRC",
      summary: "Robust, data-driven propagation modeling for wireless-network digital twins.",
      topics: ["Digital Twins", "Generative AI", "Propagation Modeling"],
      featured: true
    },
    {
      year: "2024",
      title: "Data-Driven Intelligent Outage Management for High Shadowing Environments in 5G&B Networks",
      venue: "IEEE SmartNets",
      summary: "Intelligent outage detection and management in challenging radio environments.",
      topics: ["Outage Management", "5G", "Machine Learning"],
      featured: false
    },
    {
      year: "2022",
      title: "Toward a Hybrid RF/Optical Lunar Communication System (LunarComm)",
      venue: "IEEE Network",
      summary: "A hybrid architecture for sustainable, high-data-rate lunar connectivity.",
      topics: ["Lunar Communications", "RF/FSO", "Network Architecture"],
      url: "https://arxiv.org/abs/2203.15899",
      featured: false
    },
    {
      year: "2022",
      title: "Towards Positioning Error Impact Characterization and Minimization in User-Centric RAN",
      venue: "IEEE WCNC",
      summary: "Data-driven characterization and optimization for user-centric radio access networks.",
      topics: ["User-Centric RAN", "Positioning", "Optimization"],
      featured: false
    },
    {
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
