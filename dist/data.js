/* Edit this file to add certifications, publications, and projects.
   Set featured: true to include an item on the landing page. */
window.PORTFOLIO_DATA = {
  certifications: [
    {
      title: "System Design Masterclass",
      issuer: "Packt / Coursera",
      status: "In progress",
      completionDate: "Target: 2026",
      summary: "Architecture case studies covering scalable feeds, distributed data flows, caching, consistency, availability, and engineering tradeoffs.",
      skills: ["System Design", "Distributed Systems", "Scalability", "Caching"],
      courses: ["Design Instagram Newsfeed", "System architecture assessments"],
      featured: true
    },
    {
      title: "IBM Generative AI Engineering Professional Certificate",
      issuer: "IBM / Coursera",
      status: "In progress",
      completionDate: "Target: 2026",
      summary: "Applied development of generative-AI systems, from LLM foundations through retrieval, orchestration, evaluation, and agents.",
      skills: ["LLMs", "RAG", "LangChain", "Fine-tuning", "AI Agents"],
      courses: ["Develop Generative AI Applications", "Build RAG Applications", "Vector Databases for RAG", "Fundamentals of Building AI Agents", "Agentic AI with LangGraph"],
      featured: true
    },
    {
      title: "IBM DevOps and Software Engineering Professional Certificate",
      issuer: "IBM / Coursera",
      status: "In progress",
      completionDate: "Target: 2026",
      summary: "Production software practices spanning cloud-native development, automation, deployment, and operations.",
      skills: ["Docker", "Kubernetes", "OpenShift", "CI/CD", "Microservices"],
      courses: ["Cloud Computing", "Linux and Shell Scripting", "Python and Flask", "Containers", "Application Deployment"],
      featured: true
    },
    {
      title: "Generative AI Fundamentals Specialization",
      issuer: "IBM / Coursera",
      status: "Completed",
      completionDate: "Completed",
      summary: "Five-course foundation in generative AI, prompt engineering, LLMs, and practical enterprise applications.",
      skills: ["Generative AI", "Prompt Engineering", "LLMs", "Responsible AI"],
      courses: ["Generative AI: Introduction and Applications", "Prompt Engineering Basics", "Generative AI: Elevate Your Data Science Career"],
      featured: false
    },
    {
      title: "Machine Learning",
      issuer: "Stanford University / Coursera",
      status: "Completed",
      completionDate: "Completed",
      summary: "Core supervised and unsupervised learning, model evaluation, optimization, and practical ML system development.",
      skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Optimization"],
      courses: ["Machine Learning"],
      featured: false
    },
    {
      title: "Google Cloud Data Analytics Professional Certificate",
      issuer: "Google Cloud / Coursera",
      status: "Completed",
      completionDate: "Completed",
      summary: "Cloud data transformation, analysis, visualization, and decision support using Google Cloud tools.",
      skills: ["SQL", "BigQuery", "Data Analytics", "Visualization"],
      courses: ["Introduction to Data Analytics in Google Cloud", "Data Management and Storage", "Data Transformation"],
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
