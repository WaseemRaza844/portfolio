/*
  Shared identity and role-specific portfolio settings.

  Add a future profile here, then tag certifications, projects, and publications
  in data.js with the same profile id. One record can belong to many profiles.
*/
window.PROFILE_DATA = {
  shared: {
    name: "Waseem Raza, PhD",
    shortName: "Waseem Raza",
    currentRole: "Machine Learning Engineer",
    currentOrganization: "AT&T",
    location: "New Jersey, United States",
    image: "../assets/images/profile-placeholder.png",
    links: {
      linkedin: "https://www.linkedin.com/in/waseem-raza-phd-9a737858/",
      scholar: "https://scholar.google.com/citations?user=d58Drr0AAAAJ&hl=en",
      orcid: "https://orcid.org/0000-0002-5544-2637",
      github: "https://github.com/WaseemRaza844"
    },
    education: [
      { degree: "PhD, Electrical and Computer Engineering", school: "University of Oklahoma", period: "2026" },
      { degree: "MSc, Telecommunication Engineering", school: "UET Taxila", period: "2014–2016" },
      { degree: "BSc, Telecommunication Engineering", school: "UET Taxila", period: "2010–2014" }
    ],
    experience: [
      {
        id: "att-current",
        period: "2025–Present",
        role: "Machine Learning Engineer",
        organization: "AT&T · Contractor via Innovatix",
        profiles: ["generic", "genai", "faculty"],
        generic: "Developing applied ML systems for critical network operations, including root-cause diagnostics, intelligent prioritization, workflow automation, and reliable decision support.",
        genai: "Developing ML and early GenAI capabilities for network diagnostics and operational decision support, connecting unstructured operational data with reliable automation workflows.",
        faculty: "Translating machine-learning research into operational telecommunications systems, with emphasis on reliability, domain adaptation, and responsible decision support."
      },
      {
        id: "impac",
        period: "2024",
        role: "Data Scientist and AI/ML Engineer",
        organization: "Impac Exploration Services",
        profiles: ["generic", "genai"],
        generic: "Built LLM-assisted analytical workflows, cloud ML pipelines, and automated data preparation for large-scale geochemical datasets.",
        genai: "Applied LLM-based pipelines to unstructured scientific data and integrated the resulting workflows with Azure Databricks, Functions, and Synapse Analytics."
      },
      {
        id: "industry-research",
        period: "2022–2024",
        role: "Advanced-Degree Research Intern",
        organization: "AT&T Labs · Futurewei",
        profiles: ["generic", "faculty"],
        generic: "Worked on 5G/NTN analysis, network intelligence, mobility, statistical modeling, and transfer learning for wireless systems.",
        faculty: "Conducted industry research on 5G/NTN systems, network measurements, statistical analysis, and transfer learning for CSI compression and emerging wireless technologies."
      },
      {
        id: "ou-research",
        period: "2019–2025",
        role: "Graduate Research Assistant",
        organization: "AI4Networks · University of Oklahoma",
        profiles: ["generic", "faculty"],
        generic: "Designed data-driven methods for wireless-network modeling, outage management, RAN optimization, and resilient automation.",
        faculty: "Led research in AI-enabled wireless networks, propagation modeling, network resilience, digital twins, optimization, and wearable sensing while contributing to experimental platforms and student research."
      },
      {
        id: "teaching",
        period: "Earlier",
        role: "Lecturer",
        organization: "Engineering and Technology Programs",
        profiles: ["faculty"],
        faculty: "Taught and mentored undergraduate engineering students in communications, programming, and foundational engineering subjects."
      }
    ]
  },
  variants: {
    genai: {
      label: "GenAI & Agentic AI",
      eyebrow: "GENERATIVE AI · AGENTIC SYSTEMS · APPLIED ML",
      professionalTitle: "Machine Learning Engineer · Generative AI & Agentic Systems",
      motto: "Building grounded AI systems that reason, retrieve, and act.",
      intro: "I am Waseem Raza, PhD, a machine-learning engineer expanding production-oriented expertise in Generative AI and agentic systems. My work combines retrieval, tool use, orchestration, evaluation, cloud ML, and system-design judgment with experience delivering data-driven solutions in operational environments.",
      designations: ["Machine Learning Engineer", "GenAI Application Builder", "Agentic AI Practitioner", "Applied ML Engineer"],
      proof: [
        ["CURRENT ROLE", "Machine Learning Engineer", "AT&T · Applied AI for network operations"],
        ["CURRENT FOCUS", "RAG · Agents · Evaluation", "Grounded, tool-using and measurable AI workflows"],
        ["ENGINEERING BASE", "ML Systems · Cloud · MLOps", "Reliable implementation beyond isolated model calls"]
      ],
      skills: [
        ["Agentic Systems", "Tool use, planning, state, orchestration, multi-step workflows, and human oversight."],
        ["Retrieval & Grounding", "RAG, embeddings, vector databases, semantic search, knowledge bases, and document pipelines."],
        ["LLM Applications", "Prompt engineering, structured generation, summarization, extraction, evaluation, and responsible AI."],
        ["Production Foundation", "Python, APIs, Azure, AWS Bedrock, Docker, CI/CD, data engineering, and system design."]
      ],
      certificationIds: ["ibm-rag-agentic-ai", "aws-bedrock-professional", "ibm-genai-engineering", "genai-fundamentals", "system-design-masterclass"],
      projectIds: ["agentic-ai-rag", "meeting-minutes-llm", "unstructured-document-extraction", "system-design-portfolio", "lakehouse-pipeline"],
      publicationIds: ["resilient-propagation-2024", "medication-adherence-2026"],
      closingTitle: "Interested in reliable GenAI and agentic systems?",
      closingText: "I welcome conversations about applied Generative AI, retrieval, agents, evaluation, intelligent automation, and ML engineering roles where systems must perform reliably in the real world."
    },
    faculty: {
      label: "Faculty & Academic",
      eyebrow: "AI-ENABLED SYSTEMS · WIRELESS NETWORKS · WEARABLE INTELLIGENCE",
      professionalTitle: "Researcher & Engineering Educator · AI, Wireless Systems & Wearable Intelligence",
      motto: "Research and teaching at the intersection of AI and connected systems.",
      intro: "I am Waseem Raza, PhD, an engineer, researcher, and educator whose work spans AI-enabled wireless networks, resilient automation, propagation modeling, optimization, and wearable intelligence. My academic approach connects rigorous modeling with experimental validation and industry-relevant systems.",
      designations: ["Researcher", "Engineering Educator", "AI for Wireless Specialist", "Applied ML Scientist"],
      proof: [
        ["EDUCATION", "PhD in ECE", "University of Oklahoma"],
        ["RESEARCH", "AI · Wireless · Wearables", "Reliable data-driven connected systems"],
        ["TRANSLATION", "Academia + Industry", "AT&T Labs · Futurewei · AI4Networks"]
      ],
      skills: [
        ["AI for Wireless Networks", "Propagation modeling, digital twins, outage management, RAN optimization, and autonomous networks."],
        ["Reliable Learning Systems", "Domain adaptation, transfer learning, generative augmentation, robustness, and data-scarce modeling."],
        ["Wearable Intelligence", "Continuous activity recognition and health monitoring from wrist-worn inertial sensors."],
        ["Teaching & Mentoring", "Communications, programming, machine learning, experimental methods, and research development."]
      ],
      certificationIds: ["stanford-machine-learning", "genai-fundamentals", "aws-bedrock-professional"],
      projectIds: ["syntheticnet", "turboran", "wearable-intelligence"],
      publicationIds: ["medication-adherence-2026", "multiparameter-reliability-2025", "resilient-propagation-2024", "outage-management-2024", "lunarcomm-2022", "positioning-ran-2022"],
      closingTitle: "Open to academic collaboration and faculty opportunities.",
      closingText: "I welcome discussions on research collaboration, teaching, student mentorship, and academic roles spanning artificial intelligence, wireless systems, resilient networks, and wearable sensing."
    }
  }
};
