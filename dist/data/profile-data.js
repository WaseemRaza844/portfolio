/*
  Shared identity and role-specific portfolio settings.

  Add a future profile here, then tag certifications, projects, and publications
  in data.js with the same profile id. One record can belong to many profiles.
*/
window.PROFILE_DATA = {
  shared: {
    name: "Dr Waseem Raza, PhD",
    shortName: "Waseem Raza",
    currentRole: "Machine Learning Engineer",
    currentOrganization: "AT&T",
    location: "New Jersey, United States",
    image: "../assets/images/profile-placeholder.png",
    links: {
      linkedin: "https://www.linkedin.com/in/waseem-raza-phd-9a737858/",
      scholar:  "https://scholar.google.com/citations?user=d58Drr0AAAAJ&hl=en",
      orcid:    "https://orcid.org/0000-0002-5544-2637",
      github:   "https://github.com/WaseemRaza844"
    },
    education: [
      { degree: "PhD, Electrical and Computer Engineering", school: "University of Oklahoma, Norman, Oklahoma, USA", period: "09/2019-07/2025" },
      { degree: "MSc, Telecommunication Engineering",       school: "University of Engineering and Technology, Taxila, Pakistan",             period: "08/2014–08/2016" },
      { degree: "BSc, Telecommunication Engineering",       school: "University of Engineering and Technology, Taxila, Pakistan",             period: "11/2010–06/2014" }
    ],
    academic: {
      dissertationFocus: "Artificial Intelligence and Machine Learning for Wireless Networks, with emphasis on resilient learning, data-efficient modeling, network optimization, propagation and digital-twin modeling, self-healing cellular networks, and reliable AI under real-world variability.",
      researchInterests: [
        "AI/ML for wireless and 5G/6G networks",
        "Reliable and robust machine learning",
        "Network optimization, self-healing, and intelligent automation",
        "Propagation modeling and wireless digital twins",
        "Transfer learning, domain adaptation, and generative augmentation",
        "Reinforcement learning for autonomous network control",
        "Wearable intelligence and human-centered sensing"
      ],
      teachingAreas: [
        "Wireless Communications",
        "Digital and Analog Communication Systems",
        "5G/6G and Emerging Wireless Networks",
        "Machine Learning and Artificial Intelligence",
        "Signals and Systems",
        "Digital Signal Processing",
        "Computer Programming",
        "Data Science and Experimental Methods"
      ],
      selectedCoursework: [
        "Telecommunication Technology / LTE Networks",
        "Emerging Topics in LTE-Advanced and 5G",
        "Advanced Machine Learning / Computer Vision",
        "Testbed Design for Emerging Cellular Networks",
        "Numerical Analysis",
        "Information Theory and Probability",
        "Digital Signal Processing"
      ],
      mentoring: [
        "Mentored undergraduate and graduate researchers on machine-learning implementation, wireless-network experimentation, simulation, data analysis, and technical writing.",
        "Supported Bachelor’s and Master’s thesis/project work in communications and wireless systems, including research methodology, experiment planning, manuscript preparation, and presentation.",
        "Advised students on senior/capstone projects, academic planning, and technical career development.",
        "Developed assignments, laboratory material, and implementation-oriented exercises connecting communication theory with practical engineering systems."
      ],
      service: [
        "Contributed to curriculum development and course-content alignment with engineering program and industry needs.",
        "Supported departmental accreditation and quality-assurance documentation, examination processes, and academic administration.",
        "Reviewed research manuscripts and student technical reports and provided publication-oriented feedback.",
        "Participated in research seminars, paper-review meetings, student orientations, technical workshops, and academic events.",
        "Assisted research teams with proposal preparation, literature synthesis, experimental planning, and documentation."
      ],
      honors: [
        { year: "2024", title: "William H. Barkow Scholarship", organization: "University of Oklahoma, Electrical and Computer Engineering" },
        { year: "2024", title: "Clyde L. Farrar Endowment Scholarship", organization: "University of Oklahoma" },
        { year: "2023", title: "P.H. Robinson Fellowship", organization: "University of Oklahoma" },
        { year: "2023", title: "FAS-Charles Forgan Scholarship", organization: "University of Oklahoma" },
        { year: "2022", title: "Nettie Vincent Boggs Graduate Endowment", organization: "University of Oklahoma" },
        { year: "2022", title: "SHS-Paul D. Massad Scholarship", organization: "University of Oklahoma" },
        { year: "2021", title: "Cleo Cross Memorial Scholarship", organization: "University of Oklahoma" },
        { year: "2021", title: "Marjorie Haskell Engineering Scholarship", organization: "University of Oklahoma" },
        { year: "2019", title: "Fully Funded PhD / Graduate Research Assistantship", organization: "University of Oklahoma" }
      ]
    },
    experience: [
      {
        id: "att-current",
        period: "2025–Present",
        role: "Machine Learning Engineer",
        organization: "AT&T · Contractor via Innovatix",
        profiles: ["generic", "genai", "aiml", "faculty"],
        generic: "Developing applied ML systems for critical network operations, including root-cause diagnostics, intelligent prioritization, workflow automation, and reliable decision support.",
        genai: "Developing ML and early GenAI capabilities for network diagnostics and operational decision support, connecting unstructured operational data with reliable automation workflows.",
        faculty: "Translating machine-learning research into operational telecommunications systems, with emphasis on reliability, domain adaptation, and responsible decision support."
      },
      {
        id: "impac",
        period: "2024",
        role: "Data Scientist and AI/ML Engineer",
        organization: "Impac Exploration Services",
        profiles: ["generic", "genai", "aiml"],
        generic: "Built LLM-assisted analytical workflows, cloud ML pipelines, and automated data preparation for large-scale geochemical datasets.",
        genai: "Applied LLM-based pipelines to unstructured scientific data and integrated the resulting workflows with Azure Databricks, Functions, and Synapse Analytics."
      },
      {
        id: "industry-research",
        period: "2022–2024",
        role: "Advanced-Degree Research Intern",
        organization: "AT&T Labs · Futurewei",
        profiles: ["generic", "aiml", "faculty"],
        generic: "Worked on 5G/NTN analysis, network intelligence, mobility, statistical modeling, and transfer learning for wireless systems.",
        faculty: "Conducted industry research on 5G/NTN systems, network measurements, statistical analysis, and transfer learning for CSI compression and emerging wireless technologies."
      },
      {
        id: "ou-research",
        period: "2019–2025",
        role: "Graduate Research Assistant",
        organization: "AI4Networks · University of Oklahoma",
        profiles: ["generic", "aiml", "faculty"],
        generic: "Designed data-driven methods for wireless-network modeling, outage management, RAN optimization, and resilient automation.",
        faculty: "Led research in AI-enabled wireless networks, propagation modeling, network resilience, digital twins, optimization, and wearable sensing while contributing to experimental platforms and student research."
      },
      {
        id: "teaching",
        period: "12/2017–09/2019",
        role: "Lecturer, Department of Technology",
        organization: "University of Lahore, Pakistan",
        profiles: ["faculty"],
        faculty: "Taught undergraduate Electrical Engineering Technology courses including Computer Programming, Communication Systems, and Wireless Communication; mentored student projects and contributed to curriculum, accreditation, examinations, and academic advising."
      },
      {
        id: "comsats-research-associate",
        period: "06/2016–12/2017",
        role: "Research Associate, ComSens Lab",
        organization: "COMSATS University Islamabad, Pakistan",
        profiles: ["faculty"],
        faculty: "Conducted research in wireless communications, mentored Bachelor’s and Master’s students, reviewed technical manuscripts, assisted research-proposal development, and coordinated lab research discussions."
      },
      {
        id: "uet-research-scholar",
        period: "08/2014–02/2016",
        role: "Full-Time Research Scholar, Communication Systems Lab",
        organization: "University of Engineering and Technology, Taxila, Pakistan",
        profiles: ["faculty"],
        faculty: "Supported teaching and laboratory instruction in communication systems, digital communications, and wireless communications while contributing to research, assignments, grading, and curriculum support."
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
    aiml: {
      label: "AI/ML & Data Science",
      eyebrow: "APPLIED MACHINE LEARNING · DATA SCIENCE · RELIABLE AI",
      professionalTitle: "Machine Learning Engineer · Applied AI & Data Science",
      motto: "Turning complex data into reliable models, measurable decisions, and useful systems.",
      intro: "I am Waseem Raza, PhD, a machine-learning engineer and researcher working across applied AI, data science, and production-oriented analytics. My experience spans classification, domain adaptation, time-series modeling, cloud data workflows, model evaluation, and intelligent automation across telecommunications, scientific data, and research environments.",
      designations: ["Machine Learning Engineer", "Applied AI Engineer", "Data Scientist", "AI/ML Researcher"],
      proof: [
        ["CURRENT ROLE", "Machine Learning Engineer", "AT&T · Applied ML for network operations"],
        ["CURRENT FOCUS", "Applied ML · Data · Evaluation", "Reliable models, diagnostics, and decision-support workflows"],
        ["ENGINEERING BASE", "Python · Cloud · MLOps", "From data preparation and experimentation to deployable systems"]
      ],
      skills: [
        ["Applied Machine Learning", "Classification, regression, anomaly detection, deep learning, transfer learning, and model evaluation."],
        ["Data Science & Analytics", "Data preparation, feature engineering, exploratory analysis, time-series modeling, validation, and visualization."],
        ["Reliable ML Systems", "Domain adaptation, robustness, error analysis, distribution shift, reproducibility, and performance assessment."],
        ["Engineering & MLOps", "Python, SQL, Azure, Databricks, APIs, Docker, CI/CD, data pipelines, and production-oriented ML workflows."]
      ],
      certificationIds: ["stanford-machine-learning", "google-cloud-data-analytics", "ibm-genai-engineering", "aws-bedrock-professional"],
      projectIds: ["financial-ml", "cloud-computer-vision", "lakehouse-pipeline", "wearable-intelligence"],
      publicationIds: ["resilient-propagation-2024", "medication-adherence-2026", "outage-management-2024"],
      closingTitle: "Interested in applied AI that performs reliably in real environments?",
      closingText: "I welcome conversations about machine learning, data science, reliable AI, model evaluation, intelligent automation, and ML engineering roles that connect rigorous analysis with practical systems."
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

// WIRELESS_CERTIFICATES_V1: add to existing relevant homepage selections only.
(function () {
  const ids = ["ai-for-telecommunications", "4g-network-fundamentals", "business-considerations-5g-edge-iot-ai"];
  for (const key of ["faculty"]) {
    const variant = window.PROFILE_DATA?.variants?.[key];
    if (variant && Array.isArray(variant.certificationIds)) {
      for (const id of ids) {
        if (!variant.certificationIds.includes(id)) variant.certificationIds.push(id);
      }
    }
  }
})();
