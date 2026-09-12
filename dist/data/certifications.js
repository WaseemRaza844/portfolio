/*
  Certifications and their nested courses.

  VS Code navigation:
  - Press Ctrl+Shift+O (Cmd+Shift+O on macOS), then type CERT_.
  - In Outline, disable Show Properties and keep Show Variables enabled.
  - Fold or unfold each // #region block from the editor gutter.
*/
(function registerCertifications() {
  // #region 01 — System Design Masterclass
  const CERT_01_systemDesignMasterclass = {
    "id": "system-design-masterclass",
    "profiles": [
      "generic",
      "genai"
    ],
    "domain": "system-design",
    "title": "System Design Masterclass",
    "issuer": "Packt / Coursera",
    "status": "In progress",
    "completionDate": "Target: 2026",
    "summary": "Architecture case studies covering scalable feeds, distributed data flows, caching, consistency, availability, and engineering tradeoffs.",
    "takeaway": "Translate product requirements into explicit capacity assumptions, service boundaries, data models, and defensible architecture tradeoffs.",
    "skills": [
      "System Design",
      "Distributed Systems",
      "Scalability",
      "Caching"
    ],
    "certificateUrl": "",
    "links": {
      "coursera": "",
      "linkedin": "",
      "github": ""
    },
    "courses": [
      {
        "title": "Design Instagram Newsfeed",
        "completionDate": "Completed",
        "takeaway": "Designed feed generation, fan-out, storage, caching, and availability paths.",
        "skills": [          "Feed Design",         "Caching",          "Fan-out"        ],
        "certificateUrl": ""
      },
      {
        "title": "System Architecture Assessments",
        "completionDate": "In progress",
        "takeaway": "Practice comparing architectural choices against scale, reliability, latency, and consistency requirements.",
        "skills": [          "Architecture Tradeoffs",          "Reliability"        ],
        "certificateUrl": ""
      }
    ],
    "featured": true
  };
  // #endregion System Design Masterclass

  // #region 02 — AWS Generative AI and AI Agents with Amazon Bedrock
  const CERT_02_awsBedrockProfessional = {
    "id": "aws-bedrock-professional",
    "profiles": [
      "generic",
      "genai",
      "faculty"
    ],
    reportedProgress: {
    completed: 3,
    total: 3
    },
    "domain": "genai",
    "title": "AWS Generative AI and AI Agents with Amazon Bedrock",
    "issuer": "AWS/Coursera",
    "status": "Completed",
    "completionDate": "08/2026",
    "summary": "Three-course professional certificate focused on developing, customizing, optimizing, and automating generative AI applications and intelligent agents with Amazon Bedrock.",
    "takeaway": "Build and deploy generative AI applications using foundation models, knowledge bases, LangChain, Amazon Q Developer, and Amazon Bedrock agent capabilities.",
    "skills": [
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
    "certificateUrl": "./certificates/genai/aws-bedrock/aws-generative-ai-agents-amazon-bedrock.pdf",
    "links": {
      "coursera": "https://coursera.org/verify/professional-cert/XMNOUZNOW9M0",
      "linkedin": "",
      "github": ""
    },
    "courses": [
      {
        "title": "Getting Started with AWS Generative AI for Developers",
        "status": "Completed",
        "modulesCompleted": 2,
        "modulesTotal": 2,
        "completionDate": "08/2026",
        "summary": "Foundation course covering generative AI concepts, language models, prompt engineering, and AWS services for developers.",
        "takeaway": "Established the foundations needed to design and evaluate generative AI applications on AWS.",
        "skills": [
          "AWS Generative AI",
          "Foundation Models",
          "Large Language Models",
          "Prompt Engineering",
          "Natural Language Processing"
        ],
        "certificateUrl": "./certificates/genai/aws-bedrock/c1-getting-started-aws-generative-ai.pdf"
      },
      {
        "title": "Generative AI Applications with Amazon Bedrock",
        "completionDate": "Completed",
        "takeaway": "Developed generative AI applications with Amazon Bedrock using foundation models, knowledge bases, LangChain, and application-oriented architecture patterns.",
        "skills": [
          "Amazon Bedrock",
          "Generative AI Applications",
          "Knowledge Bases",
          "LangChain",
          "Retrieval-Augmented Generation",
          "Text Generation",
          "Summarization"
        ],
        "certificateUrl": "./certificates/genai/aws-bedrock/c2-generative-ai-applications-bedrock.pdf"
      },
      {
        "title": "Amazon Bedrock Customization, Optimization & Automation",
        "completionDate": "Completed",
        "takeaway": "Applied advanced Amazon Bedrock capabilities for model customization, application optimization, workflow automation, and intelligent-agent development.",
        "skills": [
          "Amazon Bedrock",
          "AI Agents",
          "Model Customization",
          "Generative AI Optimization",
          "Workflow Automation",
          "Amazon Q Developer",
          "Agentic AI"
        ],
        "certificateUrl": "./certificates/genai/aws-bedrock/c3-bedrock-customization-optimization-automation.pdf"
      }
    ],
    "featured": true
  };
  // #endregion AWS Generative AI and AI Agents with Amazon Bedrock

  // #region 03 — IBM Generative AI Engineering Professional Certificate
  const CERT_03_ibmGenaiEngineering = {
    "id": "ibm-genai-engineering",
    "profiles": ["generic", "genai", "faculty"],
    "domain": "genai",
    "title": "IBM Generative AI Engineering Professional Certificate",
    "issuer": "IBM / Coursera",
    "status": "In progress",
    "completionDate": "Date to update",

    "reportedProgress": {
      "completed": 13,
      "total": 16
    },

    "summary": "Sixteen-course professional certificate developing job-ready skills across AI foundations, Python application development, machine learning, deep learning, NLP, transformer architectures, LLM fine-tuning, RAG, LangChain, and AI agents.",

    "takeaway": "Build and evaluate production-oriented generative AI applications by combining Python software engineering, data and ML foundations, transformer modeling, parameter-efficient fine-tuning, preference optimization, retrieval, and agentic workflows.",

    "skills": [
      "Generative AI Engineering",
      "Large Language Models",
      "Transformer Architectures",
      "Prompt Engineering",
      "RAG",
      "LangChain",
      "AI Agents",
      "Hugging Face",
      "PyTorch",
      "Keras",
      "Scikit-learn",
      "Python",
      "Flask",
      "Gradio",
      "PEFT",
      "LoRA",
      "QLoRA",
      "RLHF",
      "DPO",
      "PPO",
      "NLP",
      "Machine Learning",
      "Deep Learning",
      "Vector Databases"
    ],

    "certificateUrl": "",

    "links": {
      "coursera": "",
      "linkedin": "",
      "github": ""
    },

    "courses": [
      {
        "title": "Introduction to Artificial Intelligence (AI)",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Introduces AI applications, machine learning, deep learning, neural networks, generative AI, organizational use cases, and responsible solution design.",
        "takeaway": "Connected fundamental AI capabilities with practical use cases, business value, risk mitigation, and ethical solution design.",
        "skills": [
          "Artificial Intelligence",
          "Machine Learning",
          "Deep Learning",
          "Neural Networks",
          "Generative AI",
          "Responsible AI"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Generative AI: Introduction and Applications",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Explores generative AI concepts, common models, tools, modalities, capabilities, and applications across industries.",
        "takeaway": "Distinguished generative from discriminative AI and evaluated suitable models and modalities for real-world applications.",
        "skills": [
          "Generative AI",
          "Foundation Models",
          "ChatGPT",
          "Text Generation",
          "Image Generation",
          "Use-Case Analysis"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Generative AI: Prompt Engineering Basics",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Covers prompt-engineering principles, best practices, tools, patterns, context management, and techniques for producing effective model responses.",
        "takeaway": "Developed structured prompts and iterative evaluation practices for clearer, more reliable generative AI outputs.",
        "skills": [
          "Prompt Engineering",
          "Prompt Patterns",
          "Context Management",
          "AI Workflows",
          "ChatGPT",
          "Evaluation"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Python for Data Science, AI & Development",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Builds Python foundations through data structures, control flow, functions, exceptions, object-oriented programming, NumPy, Pandas, APIs, and web scraping.",
        "takeaway": "Applied Python and its data ecosystem to acquire, transform, analyze, and automate data-driven workflows.",
        "skills": [
          "Python",
          "NumPy",
          "Pandas",
          "Jupyter",
          "REST APIs",
          "Web Scraping",
          "Object-Oriented Programming"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Developing AI Applications with Python and Flask",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Develops tested and deployable Python applications using modules, packaging, PEP 8, unit testing, Flask routing, error handling, CRUD operations, and IBM AI services.",
        "takeaway": "Structured AI applications as maintainable Python services and deployed them through Flask-based web interfaces.",
        "skills": [
          "Python",
          "Flask",
          "REST APIs",
          "Unit Testing",
          "Application Deployment",
          "IBM Cloud",
          "Software Development Lifecycle"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Building Generative AI-Powered Applications with Python",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Builds generative AI applications and chatbots using LLMs, RAG, Hugging Face, LangChain, speech services, Flask, Gradio, and basic front-end technologies.",
        "takeaway": "Integrated language, retrieval, and speech capabilities into user-facing Python generative AI applications.",
        "skills": [
          "Python",
          "LLM Applications",
          "RAG",
          "LangChain",
          "Hugging Face",
          "Flask",
          "Gradio",
          "Speech-to-Text",
          "Text-to-Speech"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Data Analysis with Python",
        "status": "In progress",
        "completionDate": "",
        "summary": "Covers data cleaning, preparation, exploratory analysis, statistical relationships, visualization, feature engineering, regression modeling, and evaluation using Python.",
        "takeaway": "Apply an end-to-end analytical workflow that converts raw datasets into validated predictive insights.",
        "skills": [
          "Pandas",
          "NumPy",
          "SciPy",
          "Matplotlib",
          "Data Cleaning",
          "EDA",
          "Regression",
          "Scikit-learn",
          "Model Evaluation"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Machine Learning with Python",
        "status": "In progress",
        "completionDate": "",
        "summary": "Covers supervised and unsupervised learning, regression, classification, clustering, dimensionality reduction, feature engineering, model validation, and optimization.",
        "takeaway": "Build and evaluate end-to-end machine-learning solutions using appropriate algorithms, metrics, and validation strategies.",
        "skills": [
          "Machine Learning",
          "Scikit-learn",
          "Regression",
          "Classification",
          "Clustering",
          "Dimensionality Reduction",
          "Feature Engineering",
          "Model Evaluation"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Introduction to Deep Learning & Neural Networks with Keras",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Introduces neurons and deep networks, training challenges, Keras models, regression and classification, CNNs, RNNs, transformers, and model evaluation.",
        "takeaway": "Selected and implemented neural architectures suited to image, sequence, regression, and classification problems.",
        "skills": [
          "Deep Learning",
          "Keras",
          "Neural Networks",
          "CNNs",
          "RNNs",
          "Transformers",
          "Transfer Learning",
          "Model Evaluation"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Generative AI and LLMs: Architecture and Data Preparation",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Examines RNNs, transformers, VAEs, GANs, diffusion models, major LLM families, tokenization, numericalization, padding, and PyTorch NLP data loaders.",
        "takeaway": "Prepared text data and matched generative architectures with language, image, and multimodal modeling requirements.",
        "skills": [
          "LLM Architectures",
          "Transformers",
          "RNNs",
          "VAEs",
          "GANs",
          "Diffusion Models",
          "Tokenization",
          "PyTorch",
          "NLP Data Pipelines"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Gen AI Foundational Models for NLP & Language Understanding",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Develops numerical text representations, Word2Vec with CBOW and Skip-gram, N-gram and feedforward language models, and encoder-decoder RNNs for sequence transformation.",
        "takeaway": "Built foundational NLP representations and neural language models progressing from embeddings to sequence-to-sequence architectures.",
        "skills": [
          "NLP",
          "Embeddings",
          "Word2Vec",
          "CBOW",
          "Skip-gram",
          "N-grams",
          "Encoder-Decoder Models",
          "PyTorch"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Generative AI Language Modeling with Transformers",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Covers attention, positional encoding, masking, encoder- and decoder-based language models, and transformer applications for classification and translation using PyTorch and Hugging Face.",
        "takeaway": "Implemented core transformer components and applied pretrained architectures to practical NLP tasks.",
        "skills": [
          "Transformers",
          "Attention",
          "Positional Encoding",
          "Masking",
          "BERT",
          "GPT",
          "PyTorch",
          "Hugging Face"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Generative AI Engineering and Fine-Tuning Transformers",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Applies pretrained transformer models to downstream language tasks and covers inference, training, PEFT, LoRA, and QLoRA using Hugging Face and PyTorch.",
        "takeaway": "Adapted pretrained LLMs efficiently through task-specific fine-tuning and parameter-efficient methods.",
        "skills": [
          "LLM Fine-Tuning",
          "PEFT",
          "LoRA",
          "QLoRA",
          "Hugging Face",
          "PyTorch",
          "Transfer Learning",
          "Inference"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Generative AI Advance Fine-Tuning for LLMs",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Covers instruction tuning, reward modeling, LLMs as policies, RLHF, direct preference optimization, proximal policy optimization, scoring functions, and dataset tokenization.",
        "takeaway": "Compared alignment strategies and applied preference- and reward-based techniques for advanced LLM adaptation.",
        "skills": [
          "Instruction Tuning",
          "Reward Modeling",
          "RLHF",
          "DPO",
          "PPO",
          "Hugging Face",
          "Reinforcement Learning",
          "LLM Alignment"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Fundamentals of AI Agents Using RAG and LangChain",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Combines in-context learning, advanced prompting, LangChain tools, chat models, chains, agents, PyTorch, Hugging Face, embeddings, and RAG application development.",
        "takeaway": "Built grounded, tool-using AI agents by combining retrieval, language models, LangChain components, and structured prompts.",
        "skills": [
          "AI Agents",
          "RAG",
          "LangChain",
          "Prompt Engineering",
          "Embeddings",
          "Hugging Face",
          "PyTorch",
          "Tool Use"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Project: Generative AI Applications with RAG and LangChain",
        "status": "In progress",
        "completionDate": "",
        "summary": "Capstone project creating a real-world RAG application with document embeddings, a vector database, retriever, LangChain question-answering workflow, LLM, and Gradio interface.",
        "takeaway": "Integrate the complete retrieval and generation stack into a demonstrable, interview-ready application.",
        "skills": [
          "RAG",
          "LangChain",
          "Vector Databases",
          "Embeddings",
          "Document Retrieval",
          "LLM Applications",
          "Gradio",
          "Capstone Development"
        ],
        "certificateUrl": ""
      }
    ],

    "featured": true
  };
  // #endregion IBM Generative AI Engineering Professional Certificate

  // #region 04 — IBM DevOps and Software Engineering Professional Certificate
const CERT_04_ibmDevops = {
  id: "ibm-devops",

  /*
   * published:
   * true  = eligible to appear on the website
   * false = stored here but hidden everywhere
   */
  published: true,

  /*
   * Controls which portfolio variants may display this certification.
   */
  profiles: [
    "generic",
    "genai"
  ],

  domain: "cloud-devops",

  title: "IBM DevOps and Software Engineering Professional Certificate",
  issuer: "IBM / Coursera",

  status: "In progress",
  reportedProgress: {
    completed: 10,
    total: 15
  },

  /*
   * Replace this when you establish a target month.
   * Example: "Target: December 2026"
   */
  completionDate: "Target date to be updated",

  summary:  "A 15-course professional certificate covering software engineering, DevOps culture, Agile and Scrum, Python application development, Linux, Git and GitHub, cloud-native architecture, containers, microservices, serverless computing, automated testing, CI/CD, application security, monitoring, and observability.",
  takeaway: "Develop and operate cloud-native applications through the complete software lifecycle—from requirements, source control, and Python development to containers, automated testing, CI/CD, security, deployment, monitoring, and production operations.",
  skills: ["DevOps", "Software Engineering", "Cloud-Native Development",    "CI/CD",    "Docker",    "Kubernetes",    "OpenShift",    "Microservices",    "Serverless Computing",    "Python",    "Linux",    "Bash",    "Git",    "GitHub",    "Agile Development",    "Scrum",
    "Test-Driven Development",    "Behavior-Driven Development",    "Application Security",    "Monitoring and Observability",    "Prometheus",    "Grafana",    "Infrastructure as Code"
  ],

  /*
   * Add the final professional certificate PDF here after
   * completing all 15 courses.
   */
  certificateUrl: "",

  links: {
    coursera:
      "https://www.coursera.org/professional-certificates/devops-and-software-engineering",
    linkedin: "",
    github: ""
  },

  courses: [
    {
      title:  "Introduction to DevOps",
      status: "Completed",
      completionDate: "Completed",
      summary:  "Introduces DevOps culture, shared responsibility, resilient software, cloud-native development, continuous integration, continuous delivery, and deployment automation.",
      takeaway: "Applied the cultural and engineering principles that connect software development and operations through automation and shared ownership.",
      skills: ["DevOps", "CI/CD", "Cloud-Native Computing", "Microservices", "Test-Driven Development", "Behavior-Driven Development"],
      certificateUrl: ""
    },

    {
      title: "Introduction to Cloud Computing",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Covers cloud characteristics, service and deployment models, infrastructure components, cloud-native systems, serverless computing, and major cloud platforms.",
      takeaway:
        "Compared cloud service and deployment models and connected them with modern application development and infrastructure decisions.",
      skills: [
        "Cloud Computing",
        "IaaS",
        "PaaS",
        "SaaS",
        "Public Cloud",
        "Private Cloud",
        "Hybrid Cloud",
        "Cloud Infrastructure"
      ],
      certificateUrl: ""
    },

    {
      title: "Introduction to Agile Development and Scrum",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Covers Agile practices, Scrum roles and events, user stories, product backlogs, sprint planning, Kanban, estimation, and progress measurement.",
      takeaway:
        "Planned iterative software delivery using user stories, product backlogs, sprint plans, Kanban boards, and Scrum practices.",
      skills: [
        "Agile Development",
        "Scrum",
        "User Stories",
        "Sprint Planning",
        "Kanban",
        "Product Backlogs",
        "Agile Project Management"
      ],
      certificateUrl: ""
    },

    {
      title: "Introduction to Software Engineering",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Introduces software-engineering principles, the software development lifecycle, programming concepts, development tools, architectures, design patterns, and software roles.",
      takeaway:
        "Connected requirements, design, development, testing, deployment, and maintenance within a structured software-engineering lifecycle.",
      skills: [
        "Software Engineering",
        "Software Development Lifecycle",
        "Software Architecture",
        "Software Design",
        "Design Patterns",
        "Python",
        "Web Development"
      ],
      certificateUrl: ""
    },

    {
      title: "Getting Started with Git and GitHub",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Covers distributed version control, Git repositories and branches, GitHub collaboration, pull requests, merge operations, and open-source workflows.",
      takeaway:
        "Used Git and GitHub to manage source history, develop through branches, and collaborate through pull requests and merges.",
      skills: [
        "Git",
        "GitHub",
        "Version Control",
        "Branching",
        "Pull Requests",
        "Open Source",
        "Collaborative Development"
      ],
      certificateUrl: ""
    },

    {
      title: "Hands-on Introduction to Linux Commands and Shell Scripting",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Covers Linux architecture, file and networking commands, Bash scripting, environment variables, pipes, filters, package management, and scheduled jobs.",
      takeaway:
        "Automated repeatable development and operational tasks using Linux commands, Bash scripts, pipelines, environment variables, and cron.",
      skills: [
        "Linux",
        "Bash",
        "Shell Scripting",
        "Linux Commands",
        "Automation",
        "Cron",
        "Package Management",
        "File Systems"
      ],
      certificateUrl: ""
    },

    {
      title: "Python for Data Science, AI & Development",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Develops Python foundations through data structures, control flow, functions, exception handling, object-oriented programming, APIs, web scraping, NumPy, and Pandas.",
      takeaway:
        "Built practical Python programs and data workflows using core language features, APIs, notebooks, NumPy, and Pandas.",
      skills: [
        "Python",
        "Pandas",
        "NumPy",
        "Jupyter",
        "REST APIs",
        "Web Scraping",
        "Object-Oriented Programming"
      ],
      certificateUrl: ""
    },

    {
      title: "Developing AI Applications with Python and Flask",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Covers Python application development, modules, packaging, unit testing, coding standards, Flask routing, error handling, CRUD operations, and deployment.",
      takeaway:
        "Structured, tested, packaged, and deployed Python and AI-enabled web applications using Flask.",
      skills: [
        "Python",
        "Flask",
        "REST APIs",
        "Unit Testing",
        "Application Packaging",
        "Application Deployment",
        "PEP 8"
      ],
      certificateUrl: ""
    },

    {
      title: "Introduction to Containers w/ Docker, Kubernetes & OpenShift",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Introduces containerization and cloud-native deployment using Docker, Kubernetes, OpenShift, Istio, YAML manifests, pods, services, and ReplicaSets.",
      takeaway:
        "Containerized applications and deployed declaratively managed workloads using Docker, Kubernetes, OpenShift, and YAML.",
      skills: [
        "Docker",
        "Kubernetes",
        "OpenShift",
        "Containers",
        "YAML",
        "Istio",
        "Cloud-Native Deployment"
      ],
      certificateUrl: ""
    },

    {
      title: "Application Development using Microservices and Serverless",
      status: "Completed",
      completionDate: "Completed",
      summary:
        "Covers microservice architecture, REST APIs, API documentation, Docker-based services, serverless computing, and cloud deployment.",
      takeaway:
        "Designed and deployed independently scalable services using REST APIs, containers, microservices, and serverless technologies.",
      skills: [
        "Microservices",
        "Serverless Computing",
        "REST APIs",
        "Docker",
        "OpenShift",
        "API Gateway",
        "Swagger",
        "Postman"
      ],
      certificateUrl: ""
    },

    {
      title: "Introduction to Test and Behavior Driven Development",
      status: "In progress",
      completionDate: "Target date to be updated",
      summary:
        "Covers unit testing, test-driven development, behavior-driven development, assertions, fixtures, mocks, test coverage, and automated testing.",
      takeaway:
        "Create maintainable software by defining expected behavior and automated tests before or alongside implementation.",
      skills: [
        "Test-Driven Development",
        "Behavior-Driven Development",
        "Unit Testing",
        "Test Automation",
        "Mock Objects",
        "Test Fixtures",
        "Code Coverage"
      ],
      certificateUrl: ""
    },

    {
      title: "Continuous Integration and Continuous Delivery (CI/CD)",
      status: "In progress",
      completionDate: "Target date to be updated",
      summary:
        "Covers continuous integration and delivery, Infrastructure as Code, GitHub Actions, Jenkins, Terraform, OpenShift Pipelines, and Argo CD.",
      takeaway:
        "Automate application integration, infrastructure provisioning, testing, and deployment through repeatable CI/CD pipelines.",
      skills: [
        "CI/CD",
        "Continuous Integration",
        "Continuous Delivery",
        "GitHub Actions",
        "Jenkins",
        "Terraform",
        "Infrastructure as Code",
        "Argo CD"
      ],
      certificateUrl: ""
    },

    {
      title: "Application Security for Developers and DevOps Professionals",
      status: "In progress",
      completionDate: "Target date to be updated",
      summary:
        "Covers security by design, defensive coding, OWASP principles, threat modeling, container vulnerability scanning, penetration testing, and DevSecOps.",
      takeaway:
        "Integrate application-security controls and vulnerability assessment throughout development and deployment workflows.",
      skills: [
        "Application Security",
        "DevSecOps",
        "Secure Coding",
        "OWASP",
        "Threat Modeling",
        "Vulnerability Scanning",
        "Security Testing",
        "Kali Linux"
      ],
      certificateUrl: ""
    },

    {
      title: "Monitoring and Observability for Development and DevOps",
      status: "In progress",
      completionDate: "Target date to be updated",
      summary:
        "Covers monitoring, Golden Signals, logging, metrics, tracing, telemetry, cloud-native observability, Prometheus, Grafana, OpenTelemetry, and Instana.",
      takeaway:
        "Instrument and diagnose distributed applications using logs, metrics, traces, dashboards, and cloud-native observability platforms.",
      skills: [
        "Monitoring",
        "Observability",
        "Prometheus",
        "Grafana",
        "OpenTelemetry",
        "Logging",
        "Distributed Tracing",
        "Instana"
      ],
      certificateUrl: ""
    },

    {
      title: "DevOps Capstone Project",
      status: "In progress",
      completionDate: "Target date to be updated",
      summary:
        "Integrates Agile planning, microservices, containers, serverless technologies, automated testing, CI/CD, security, and cloud deployment in a complete project.",
      takeaway:
        "Deliver an end-to-end cloud-native application through Agile planning, development, testing, automation, security, and deployment.",
      skills: [
        "DevOps",
        "Agile Development",
        "Microservices",
        "Kubernetes",
        "OpenShift",
        "Test-Driven Development",
        "CI/CD",
        "Cloud Deployment"
      ],
      certificateUrl: ""
    }
  ],

  /*
   * true  = may appear on the main landing page
   * false = appears only in the Learning archive/variants
   *
   * published:false overrides featured:true.
   */
  featured: true
};
  // #endregion IBM DevOps and Software Engineering Professional Certificate

  // #region 05 — Generative AI Fundamentals Specialization
  const CERT_05_genaiFundamentals = {
    "id": "genai-fundamentals",
    "profiles": [
      "genai",
      "faculty"
    ],
    "domain": "genai",
    "title": "Generative AI Fundamentals Specialization",
    "issuer": "IBM / Coursera",
    "status": "Completed",
    "completionDate": "Completed",
    "summary": "Five-course foundation in generative AI, prompt engineering, LLMs, and practical enterprise applications.",
    "takeaway": "Understand how generative models work, where they create value, and how to apply them responsibly.",
    "skills": [
      "Generative AI",
      "Prompt Engineering",
      "LLMs",
      "Responsible AI"
    ],
    "certificateUrl": "",
    "links": {
      "coursera": "",
      "linkedin": "",
      "github": ""
    },
    "courses": [
      {
        "title": "Generative AI: Introduction and Applications",
        "completionDate": "Completed",
        "takeaway": "Evaluated generative-AI capabilities, limitations, and application patterns.",
        "skills": [
          "Generative AI",
          "Use Cases"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Generative AI: Prompt Engineering Basics",
        "completionDate": "Completed",
        "takeaway": "Designed structured prompts and iterative prompting workflows.",
        "skills": [
          "Prompt Engineering",
          "LLMs"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Generative AI: Elevate Your Data Science Career",
        "completionDate": "Completed",
        "takeaway": "Connected GenAI capabilities with practical data-science workflows.",
        "skills": [
          "Data Science",
          "Generative AI"
        ],
        "certificateUrl": ""
      }
    ],
    "featured": false
  };
  // #endregion Generative AI Fundamentals Specialization

  // #region 06 — Machine Learning
  const CERT_06_stanfordMachineLearning = {
    "id": "stanford-machine-learning",
    "profiles": [
      "generic",
      "faculty"
    ],
    "domain": "ml-data",
    "title": "Machine Learning",
    "issuer": "Stanford University / Coursera",
    "status": "Completed",
    "completionDate": "Completed",
    "summary": "Core supervised and unsupervised learning, model evaluation, optimization, and practical ML system development.",
    "takeaway": "Select, train, diagnose, and improve machine-learning models using principled evaluation.",
    "skills": [
      "Supervised Learning",
      "Unsupervised Learning",
      "Model Evaluation",
      "Optimization"
    ],
    "certificateUrl": "",
    "links": {
      "coursera": "",
      "linkedin": "",
      "github": ""
    },
    "courses": [
      {
        "title": "Machine Learning",
        "completionDate": "Completed",
        "takeaway": "Applied regression, classification, clustering, anomaly detection, and model diagnostics.",
        "skills": [
          "Regression",
          "Classification",
          "Clustering"
        ],
        "certificateUrl": ""
      }
    ],
    "featured": false
  };

  // #endregion Machine Learning

  // #region Machine Learning and Reinforcement Learning in Finance
  const CERT_ML_FINANCE = {
    id: "ml-reinforcement-learning-finance",
    published: false,

    profiles: [
      "finance"
    ],

    domain: "ml-data",

    title: "Machine Learning and Reinforcement Learning in Finance Specialization",
    issuer: "New York University / Coursera",
    status: "In progress",

    reportedProgress: {
      completed: 0,
      total: 4
    },

    completionDate: "Target date to be updated",

    summary:
      "An applied machine-learning specialization focused on financial prediction, portfolio management, trading, risk modeling, market dynamics, and reinforcement-learning methods for finance.",

    takeaway:
      "Select, implement, and evaluate machine-learning and reinforcement-learning methods for practical financial problems involving trading, portfolio optimization, market modeling, derivatives, and risk.",

    skills: [
      "Machine Learning for Finance",
      "Reinforcement Learning",
      "Financial Modeling",
      "Portfolio Management",
      "Financial Trading",
      "Risk Modeling",
      "Predictive Modeling",
      "Supervised Learning",
      "Unsupervised Learning",
      "Statistical Machine Learning",
      "Market Dynamics",
      "Derivatives",
      "TensorFlow",
      "Scikit-learn",
      "Python"
    ],

    certificateUrl: "",

    links: {
      coursera:
        "https://www.coursera.org/specializations/machine-learning-reinforcement-finance",
      linkedin: "",
      github: ""
    },

    courses: [
      {
        title: "Guided Tour of Machine Learning in Finance",
        status: "In progress",
        completionDate: "Target date to be updated",

        /*
        * Informational field retained in the data.
        * Your current renderer does not display percentages.
        */
        progressPercent: 44,

        summary:
          "Introduces the machine-learning landscape through financial applications, including supervised learning, bank-failure prediction, model selection, and performance evaluation.",

        takeaway:
          "Frame financial problems as machine-learning tasks and select suitable supervised, unsupervised, or reinforcement-learning methods.",

        skills: [
          "Machine Learning",
          "Financial Analytics",
          "Supervised Learning",
          "Regression",
          "Classification",
          "Artificial Neural Networks",
          "TensorFlow",
          "Scikit-learn",
          "Model Evaluation",
          "Predictive Modeling"
        ],

        certificateUrl: ""
      },

      {
        title: "Fundamentals of Machine Learning in Finance",
        status: "In progress",
        completionDate: "Target date to be updated",
        progressPercent: 24,

        summary:
          "Examines supervised, unsupervised, and reinforcement-learning algorithms for financial problems, including portfolio analysis and trading-strategy development.",

        takeaway:
          "Implement and evaluate machine-learning methods for financial datasets, portfolio construction, and trading applications.",

        skills: [
          "Machine Learning",
          "Portfolio Management",
          "Unsupervised Learning",
          "Dimensionality Reduction",
          "Decision Trees",
          "Financial Trading",
          "Exploratory Data Analysis",
          "Correlation Analysis",
          "Python",
          "Scikit-learn"
        ],

        certificateUrl: ""
      },

      {
        title: "Reinforcement Learning in Finance",
        status: "In progress",
        completionDate: "Target date to be updated",
        progressPercent: 16,

        summary:
          "Applies reinforcement learning to portfolio optimization, optimal trading, option valuation, risk management, and financial-market dynamics.",

        takeaway:
          "Formulate financial decisions as sequential optimization problems and solve them using reinforcement-learning methods such as Q-learning.",

        skills: [
          "Reinforcement Learning",
          "Q-Learning",
          "Portfolio Optimization",
          "Optimal Trading",
          "Option Pricing",
          "Risk Management",
          "Markov Models",
          "Financial Modeling",
          "Market Dynamics"
        ],

        certificateUrl: ""
      },

      {
        title: "Overview of Advanced Methods of Reinforcement Learning in Finance",
        status: "Not started",
        completionDate: "Target date to be updated",
        progressPercent: 0,

        summary:
          "Explores inverse reinforcement learning, market impact, price dynamics, option pricing, high-frequency trading, cryptocurrency markets, and credit-risk applications.",

        takeaway:
          "Evaluate advanced reinforcement-learning approaches for complex financial markets, trading systems, and risk-related decisions.",

        skills: [
          "Advanced Reinforcement Learning",
          "Inverse Reinforcement Learning",
          "High-Frequency Trading",
          "Market Impact",
          "Market Liquidity",
          "Credit Risk",
          "Cryptocurrency Trading",
          "Derivatives",
          "Financial Modeling"
        ],

        certificateUrl: ""
      }
    ],

    featured: false
  };
  // #endregion Machine Learning and Reinforcement Learning in Finance

  // #region Deep Learning for Healthcare
  const CERT_DEEP_LEARNING_HEALTHCARE = {
    id: "deep-learning-healthcare",
    published: true,

    profiles: [
      "healthcare",
      "faculty"
    ],

    domain: "ml-data",

    title: "Deep Learning for Healthcare Specialization",
    issuer: "University of Illinois Urbana-Champaign / Coursera",
    status: "In progress",

    /*
    * Update these two numbers after confirming completion.
    */
    reportedProgress: {
      completed: 0,
      total: 3
    },

    completionDate: "Target date to be updated",

    summary:
      "An advanced specialization covering health-data processing, neural-network methods, and the development of deep-learning solutions for real-world medical and healthcare applications.",

    takeaway:
      "Design, train, evaluate, and apply deep-learning models to healthcare data through programming assignments, practical experiments, and application-focused projects.",

    skills: [
      "Deep Learning",
      "Healthcare AI",
      "Health Informatics",
      "Health Data Processing",
      "Artificial Neural Networks",
      "Convolutional Neural Networks",
      "Recurrent Neural Networks",
      "Autoencoders",
      "Generative Models",
      "Medical Image Analysis",
      "Supervised Learning",
      "Unsupervised Learning",
      "Predictive Modeling",
      "Model Evaluation",
      "PyTorch",
      "Jupyter Notebooks"
    ],

    certificateUrl: "",

    links: {
      coursera:
        "https://www.coursera.org/specializations/deep-learning-healthcare",
      linkedin: "",
      github: ""
    },

    courses: [
      {
        title: "Health Data Science Foundation",
        status: "In progress",
        completionDate: "Target date to be updated",

        modulesCompleted: 0,
        modulesTotal: 4,

        summary:
          "Introduces health-data processing and foundational supervised and unsupervised machine-learning methods for healthcare applications.",

        takeaway:
          "Prepare and analyze healthcare data and evaluate foundational machine-learning approaches for medical problems.",

        skills: [
          "Health Data Processing",
          "Health Informatics",
          "Healthcare AI",
          "Machine Learning",
          "Supervised Learning",
          "Unsupervised Learning",
          "Model Evaluation",
          "Artificial Neural Networks"
        ],

        certificateUrl: ""
      },

      {
        title: "Deep Learning Methods for Healthcare",
        status: "In progress",
        completionDate: "Target date to be updated",

        modulesCompleted: 0,
        modulesTotal: 4,

        summary:
          "Develops practical deep-learning models for healthcare data using neural networks, programming laboratories, written assignments, and an applied project.",

        takeaway:
          "Develop and evaluate deep-learning models that address practical healthcare and medical-data problems.",

        skills: [
          "Deep Learning",
          "Convolutional Neural Networks",
          "Recurrent Neural Networks",
          "Autoencoders",
          "Embeddings",
          "Medical Image Analysis",
          "Dimensionality Reduction",
          "Model Deployment",
          "PyTorch"
        ],

        certificateUrl: ""
      },

      {
        title: "Advanced Deep Learning Methods for Healthcare",
        status: "In progress",
        completionDate: "Target date to be updated",

        modulesCompleted: 0,
        modulesTotal: 4,

        summary:
          "Examines advanced neural, graph-based, generative, and data-synthesis methods for complex healthcare-data applications.",

        takeaway:
          "Apply advanced deep-learning and generative-model architectures to healthcare prediction, network analysis, and synthetic-data problems.",

        skills: [
          "Advanced Deep Learning",
          "Graph Neural Methods",
          "Graph Theory",
          "Generative AI",
          "Generative Models",
          "Data Synthesis",
          "Autoencoders",
          "Predictive Modeling",
          "Network Analysis",
          "Health Informatics"
        ],

        certificateUrl: ""
      }
    ],

    featured: false
  };
  // #endregion Deep Learning for Healthcare

  // #region 07 — Google Cloud Data Analytics Professional Certificate
  const CERT_07_googleCloudDataAnalytics = {
    "id": "google-cloud-data-analytics",
    "profiles": [
      "generic"
    ],
    "domain": "ml-data",
    "title": "Google Cloud Data Analytics Professional Certificate",
    "issuer": "Google Cloud / Coursera",
    "status": "Completed",
    "completionDate": "Completed",
    "summary": "Cloud data transformation, analysis, visualization, and decision support using Google Cloud tools.",
    "takeaway": "Turn raw cloud data into governed, queryable, and decision-ready analytical outputs.",
    "skills": [
      "SQL",
      "BigQuery",
      "Data Analytics",
      "Visualization"
    ],
    "certificateUrl": "",
    "links": {
      "coursera": "",
      "linkedin": "",
      "github": ""
    },
    "courses": [
      {
        "title": "Introduction to Data Analytics in Google Cloud",
        "completionDate": "Completed",
        "takeaway": "Mapped analytical questions to cloud data workflows and services.",
        "skills": [
          "Google Cloud",
          "Analytics"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Data Management and Storage",
        "completionDate": "Completed",
        "takeaway": "Selected storage and governance patterns for analytical workloads.",
        "skills": [
          "Data Management",
          "Cloud Storage"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Data Transformation",
        "completionDate": "Completed",
        "takeaway": "Prepared and transformed data for reliable analysis.",
        "skills": [
          "SQL",
          "BigQuery",
          "Data Transformation"
        ],
        "certificateUrl": ""
      },
      {
        "title": "The Power of Storytelling: How to Visualize Data in the Cloud",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Uses visualization design and narrative structure to communicate cloud-data insights effectively.",
        "takeaway": "Designed decision-oriented visualizations and dashboards that connect analysis with stakeholder needs.",
        "skills": [
          "Looker",
          "Data Visualization",
          "Dashboard Development",
          "Data Storytelling"
        ],
        "certificateUrl": ""
      },
      {
        "title": "Put It All Together: Prepare for a Cloud Data Analyst Job",
        "status": "Completed",
        "completionDate": "Completed",
        "summary": "Capstone course applying the cloud analytics lifecycle to acquire, prepare, analyze, visualize, and communicate data.",
        "takeaway": "Integrated Google Cloud analytics tools into an end-to-end, decision-focused data workflow.",
        "skills": [
          "Cloud Analytics",
          "BigQuery",
          "Looker",
          "Data Governance"
        ],
        "certificateUrl": ""
      }
    ],
    "featured": false
  };
  // #endregion Google Cloud Data Analytics Professional Certificate

  // #region 08 — Google Cloud Cybersecurity Professional Certificate
  const CERT_08_googleCloudCybersecurity = {
    "id": "google-cloud-cybersecurity",
    "profiles": ["generic"],
    "domain": "cybersecurity",
    "title": "Google Cloud Cybersecurity Professional Certificate",
    "issuer": "Google Cloud / Coursera",
    "status": "In progress",
    "completionDate": "Date to update",
    "reportedProgress": { "completed": 4, "total": 5 },
    "summary": "Cloud-security training covering risk management, threat prevention, detection, incident response, and recovery in Google Cloud environments.",
    "takeaway": "Develop secure cloud operations by combining identity controls, threat monitoring, vulnerability management, and structured incident response.",
    "skills": ["Google Cloud Security", "Security Command Center", "IAM", "Cloud Logging", "Threat Detection", "Incident Response", "Risk Management"],
    "certificateUrl": "",
    "links": { "coursera": "", "linkedin": "", "github": "" },
    "courses": [
      { "title": "Introduction to Security Principles in Cloud Computing", "status": "Status to verify", "completionDate": "", "summary": "Introduces cloud-security principles, shared responsibility, identity, data protection, and foundational risk concepts.", "takeaway": "Connected core security principles with cloud architecture and operational responsibilities.", "skills": ["Cloud Security", "Shared Responsibility", "IAM", "Data Protection"], "certificateUrl": "" },
      { "title": "Strategies for Cloud Security Risk Management", "status": "Status to verify", "completionDate": "", "summary": "Covers cloud risk identification, assessment, governance, and controls for reducing organizational exposure.", "takeaway": "Applied structured risk-management practices to cloud services and workloads.", "skills": ["Risk Assessment", "Security Governance", "Cloud Controls"], "certificateUrl": "" },
      { "title": "Cloud Security Risks: Identify and Protect Against Threats", "status": "Status to verify", "completionDate": "", "summary": "Examines cloud threats, vulnerabilities, preventive controls, and secure configuration practices.", "takeaway": "Mapped common cloud threats to preventive and protective security controls.", "skills": ["Threat Identification", "Vulnerability Management", "Secure Configuration"], "certificateUrl": "" },
      { "title": "Detect, Respond, and Recover from Cloud Cybersecurity Attacks", "status": "Status to verify", "completionDate": "", "summary": "Develops detection, investigation, response, and recovery practices for cybersecurity incidents in cloud environments.", "takeaway": "Connected monitoring evidence with incident containment, response, and service recovery.", "skills": ["Threat Detection", "Incident Response", "Cloud Logging", "Recovery"], "certificateUrl": "" },
      { "title": "Prepare for a Cloud Security Analyst Job", "status": "Status to verify", "completionDate": "", "summary": "Integrates cloud-security knowledge through practical analyst workflows and career-focused preparation.", "takeaway": "Consolidated technical and analytical practices used in entry-level cloud-security operations.", "skills": ["Security Analysis", "Documentation", "Operational Readiness"], "certificateUrl": "" }
    ],
    "featured": false
  };
  // #endregion Google Cloud Cybersecurity Professional Certificate

  // #region 09 — IBM AI Product Manager Professional Certificate
  const CERT_09_ibmAiProductManager = {
    "id": "ibm-ai-product-manager",
    "profiles": ["generic", "genai"],
    "domain": "product-management",
    "title": "IBM AI Product Manager Professional Certificate",
    "issuer": "IBM / Coursera",
    "status": "In progress",
    "completionDate": "Date to update",
    "reportedProgress": { "completed": 4, "total": 10 },
    "summary": "Professional program combining product-management practice with AI foundations, generative AI, stakeholder collaboration, and AI-powered product strategy.",
    "takeaway": "Frame AI capabilities as viable products by connecting user needs, stakeholder priorities, delivery planning, and responsible AI adoption.",
    "skills": ["AI Product Strategy", "Product Lifecycle", "Stakeholder Management", "Generative AI", "Prompt Engineering", "Roadmapping", "Agile Delivery", "Responsible AI"],
    "certificateUrl": "",
    "links": { "coursera": "", "linkedin": "", "github": "" },
    "courses": [
      { "title": "Product Management: An Introduction", "status": "Status to verify", "completionDate": "", "summary": "Introduces product-management responsibilities, customer needs, value propositions, and product lifecycle decisions.", "takeaway": "Established a product-centered framework for moving from customer problems to measurable outcomes.", "skills": ["Product Management", "Customer Discovery", "Value Proposition"], "certificateUrl": "" },
      { "title": "Product Management Foundations & Stakeholder Collaboration", "status": "Status to verify", "completionDate": "", "summary": "Develops foundational planning and collaboration practices for aligning product stakeholders.", "takeaway": "Structured stakeholder communication around shared product goals, constraints, and decisions.", "skills": ["Stakeholder Management", "Communication", "Product Planning"], "certificateUrl": "" },
      { "title": "Initial Product Strategy and Plan", "status": "Status to verify", "completionDate": "", "summary": "Covers market framing, product strategy, prioritization, roadmaps, and initial delivery planning.", "takeaway": "Translated product opportunities into an actionable strategy and prioritized roadmap.", "skills": ["Product Strategy", "Roadmapping", "Prioritization"], "certificateUrl": "" },
      { "title": "Developing and Delivering a New Product", "status": "Status to verify", "completionDate": "", "summary": "Examines execution from product definition through development, launch, and outcome assessment.", "takeaway": "Connected cross-functional product delivery with launch readiness and performance evaluation.", "skills": ["Product Delivery", "Agile", "Launch Planning"], "certificateUrl": "" },
      { "title": "Introduction to Artificial Intelligence", "status": "Status to verify", "completionDate": "", "summary": "Introduces AI concepts, applications, limitations, and the organizational context of AI-enabled products.", "takeaway": "Evaluated where AI creates product value and where technical or ethical limitations require controls.", "skills": ["Artificial Intelligence", "AI Applications", "Responsible AI"], "certificateUrl": "" },
      { "title": "Generative AI: Introduction and Applications", "status": "Status to verify", "completionDate": "", "summary": "Surveys generative AI concepts, modalities, foundation models, and practical business applications.", "takeaway": "Identified product opportunities for generative AI across text, image, code, and knowledge workflows.", "skills": ["Generative AI", "Foundation Models", "Use-Case Analysis"], "certificateUrl": "" },
      { "title": "Generative AI: Prompt Engineering Basics", "status": "Status to verify", "completionDate": "", "summary": "Introduces prompt patterns, context design, iteration, and evaluation for generative AI outputs.", "takeaway": "Designed clearer prompts and evaluation loops for reliable task-oriented model behavior.", "skills": ["Prompt Engineering", "Prompt Patterns", "Evaluation"], "certificateUrl": "" },
      { "title": "Generative AI: Foundation Models and Platforms", "status": "Status to verify", "completionDate": "", "summary": "Explores foundation-model capabilities and platforms used to build generative AI products.", "takeaway": "Compared model and platform choices against product requirements, risk, and operational constraints.", "skills": ["Foundation Models", "AI Platforms", "Model Selection"], "certificateUrl": "" },
      { "title": "Building AI-Powered Products", "status": "Status to verify", "completionDate": "", "summary": "Applies product-management methods to AI solution definition, development, evaluation, and responsible delivery.", "takeaway": "Integrated model capabilities, data requirements, user experience, and governance into AI product planning.", "skills": ["AI Product Development", "Data Strategy", "Governance"], "certificateUrl": "" },
      { "title": "Generative AI: Supercharge Your Product Manager Career", "status": "Status to verify", "completionDate": "", "summary": "Uses generative AI to improve product research, planning, communication, and career development workflows.", "takeaway": "Applied generative AI as a productivity aid while maintaining human review and product judgment.", "skills": ["AI-Assisted Product Management", "Career Development", "Productivity"], "certificateUrl": "" }
    ],
    "featured": false
  };
  // #endregion IBM AI Product Manager Professional Certificate

  // #region 10 — IBM RAG and Agentic AI Professional Certificate
  const CERT_10_ibmRagAndAgenticAi = {
    "id": "ibm-rag-agentic-ai",
    "profiles": ["generic", "genai", "faculty"],
    "domain": "genai",
    "title": "IBM RAG and Agentic AI Professional Certificate",
    "issuer": "IBM / Coursera",
    "status": "Completed",
    "completionDate": "February 2026",
    "reportedProgress": { "completed": 8, "total": 8 },
    "currentCurriculumCourses": 10,
    "summary": "Completed the original eight-course professional certificate in advanced RAG, multimodal AI, LangChain/LangGraph workflows, and autonomous multi-agent systems; Coursera later expanded the program to ten courses.",
    "curriculumNote": "Credential awarded February 14, 2026 for the complete eight-course curriculum. Coursera updated the program in March 2026 to add an MCP course and a new capstone, increasing the current curriculum to ten courses.",
    "takeaway": "Designed context-aware generative AI systems by combining retrieval pipelines, vector databases, multimodal models, tool calling, agent memory, conditional workflows, and multi-agent orchestration.",
    "skills": [
      "Retrieval-Augmented Generation",
      "Agentic AI",
      "LangChain",
      "LangGraph",
      "Vector Databases",
      "ChromaDB",
      "FAISS",
      "LlamaIndex",
      "Multimodal AI",
      "Tool Calling",
      "Prompt Engineering",
      "CrewAI",
      "AutoGen / AG2",
      "BeeAI",
      "Gradio",
      "Python",
      "Flask"
    ],
    "certificateUrl": "./certificates/genai/ibm-rag-agentic-ai/ibm-rag-agentic-ai-professional-certificate.pdf",
    "links": {
      "coursera": "https://coursera.org/verify/professional-cert/0CB713GHZC1B",
      "linkedin": "",
      "github": ""
    },
    "courses": [
      {
        "title": "Develop Generative AI Applications: Get Started",
        "status": "Completed",
        "completionDate": "By February 2026",
        "summary": "Develops modular generative AI applications using prompt engineering, LangChain templates, chains, agents, structured outputs, Flask, and model evaluation.",
        "takeaway": "Built flexible LLM applications by combining reusable LangChain components with structured prompting, model selection, and a Flask interface.",
        "skills": ["Prompt Engineering", "LangChain", "LLM Applications", "Model Evaluation", "JSON", "Flask"],
        "certificateUrl": ""
      },
      {
        "title": "Build RAG Applications: Get Started",
        "status": "Completed",
        "completionDate": "By February 2026",
        "summary": "Introduces practical RAG application development with document processing, embeddings, vector stores, LangChain, LlamaIndex, Python, and Gradio.",
        "takeaway": "Connected external knowledge with LLM generation through an end-to-end retrieval pipeline and interactive application interface.",
        "skills": ["RAG", "Embeddings", "Vector Databases", "LangChain", "LlamaIndex", "Gradio"],
        "certificateUrl": ""
      },
      {
        "title": "Vector Databases for RAG: An Introduction",
        "status": "Completed",
        "completionDate": "By February 2026",
        "summary": "Covers vector representations, similarity search, ChromaDB collections, database operations, recommendation workflows, and internal RAG mechanisms.",
        "takeaway": "Applied embeddings and similarity search to store, retrieve, and rank semantically relevant information for grounded generation.",
        "skills": ["Vector Databases", "ChromaDB", "Embeddings", "Similarity Search", "Database Management", "RAG"],
        "certificateUrl": ""
      },
      {
        "title": "Advanced RAG with Vector Databases and Retrievers",
        "status": "Completed",
        "completionDate": "By February 2026",
        "summary": "Builds advanced retrieval pipelines using FAISS, ChromaDB, HNSW indexing, LangChain, LlamaIndex retrievers, and Gradio interfaces.",
        "takeaway": "Improved retrieval quality by combining suitable vector indexes, advanced retrievers, orchestration components, and application-level evaluation.",
        "skills": ["Advanced RAG", "FAISS", "ChromaDB", "HNSW", "LlamaIndex", "LangChain", "Performance Tuning"],
        "certificateUrl": ""
      },
      {
        "title": "Build Multimodal Generative AI Applications",
        "status": "Completed",
        "completionDate": "By February 2026",
        "summary": "Develops applications that combine text, speech, image, and video using IBM Granite, Meta Llama, Whisper, DALL-E, Sora, Hugging Face, Flask, and Gradio.",
        "takeaway": "Integrated multiple data modalities and foundation models into coherent, user-facing generative AI workflows.",
        "skills": ["Multimodal AI", "IBM Granite", "Meta Llama", "OpenAI Whisper", "DALL-E", "Hugging Face", "Gradio"],
        "certificateUrl": ""
      },
      {
        "title": "Fundamentals of Building AI Agents",
        "status": "Completed",
        "completionDate": "By February 2026",
        "summary": "Introduces autonomous agents, reasoning, tool calling, chaining, data-analysis agents, visualization, database queries, and agent-focused prompt engineering.",
        "takeaway": "Built agents that select and use tools within structured workflows to complete analytical and application tasks.",
        "skills": ["AI Agents", "LangChain", "Tool Calling", "Agentic Workflows", "Data Analysis", "Data Visualization"],
        "certificateUrl": ""
      },
      {
        "title": "Agentic AI with LangChain and LangGraph",
        "status": "Completed",
        "completionDate": "By February 2026",
        "summary": "Builds stateful agentic systems with memory, conditional routing, iteration, Reflection, Reflexion, ReAct, collaborative agents, and Agentic RAG.",
        "takeaway": "Designed stateful and self-improving agent workflows that route tasks, retain context, invoke retrieval, and coordinate reasoning steps.",
        "skills": ["LangGraph", "LangChain", "Agentic RAG", "ReAct", "Reflection", "Memory", "Conditional Routing"],
        "certificateUrl": ""
      },
      {
        "title": "Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI",
        "status": "Completed",
        "completionDate": "By February 2026",
        "summary": "Compares agentic frameworks and implements structured multi-agent workflows using LangGraph, CrewAI, AG2/AutoGen, BeeAI, custom tools, and conversation-driven coordination.",
        "takeaway": "Selected and combined agent frameworks according to workflow state, collaboration, tool integration, and orchestration requirements.",
        "skills": ["Multi-Agent Systems", "LangGraph", "CrewAI", "AutoGen / AG2", "BeeAI", "Tool Calling", "Agent Orchestration"],
        "certificateUrl": ""
      },
      {
        "title": "Build AI Agents using MCP",
        "status": "Added after award",
        "completionDate": "",
        "summary": "A March 2026 curriculum addition covering MCP architecture, FastMCP servers, clients, tools, resources, prompts, STDIO/HTTP transports, permissions, and secure context-aware workflows.",
        "takeaway": "This course was added after the eight-course credential was awarded and is listed to document the current curriculum rather than claim completion.",
        "skills": ["Model Context Protocol", "FastMCP", "MCP Servers", "MCP Clients", "Authorization", "AI Security"],
        "certificateUrl": ""
      },
      {
        "title": "RAG and Agentic AI Capstone Project",
        "status": "Added after award",
        "completionDate": "",
        "summary": "A March 2026 curriculum addition integrating unstructured and multimodal data, vector databases, multi-agent systems, MCP tools, deployment, validation, and system testing.",
        "takeaway": "This capstone was added after the eight-course credential was awarded and is listed to distinguish the current curriculum from the completed version.",
        "skills": ["RAG", "Agentic AI", "Multimodal Data", "Vector Databases", "MCP", "System Testing", "Deployment"],
        "certificateUrl": ""
      }
    ],
    "featured": true
  };
  // #endregion IBM RAG and Agentic AI Professional Certificate

  window.PORTFOLIO_DATA.certifications = [
    CERT_01_systemDesignMasterclass,
    CERT_02_awsBedrockProfessional,
    CERT_03_ibmGenaiEngineering,
    CERT_04_ibmDevops,
    CERT_05_genaiFundamentals,
    CERT_06_stanfordMachineLearning,
    CERT_ML_FINANCE,
    CERT_DEEP_LEARNING_HEALTHCARE,
    CERT_07_googleCloudDataAnalytics,
    CERT_08_googleCloudCybersecurity,
    CERT_09_ibmAiProductManager,
    CERT_10_ibmRagAndAgenticAi
  ];
}());
