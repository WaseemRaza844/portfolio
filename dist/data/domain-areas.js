/* Domain headings and descriptions used on the Learning page. */
window.PORTFOLIO_DATA = window.PORTFOLIO_DATA || {};
window.PORTFOLIO_DATA.domainAreas = [  {
    "id": "genai",
    "title": "Generative & Agentic AI",
    "description": "LLM applications, retrieval, orchestration, agents, evaluation, and responsible AI."
  },
  {
    "id": "ml-data",
    "title": "AIML: Data Science & Analytics",
    "description": "Traditional machine learning, data analytics, data engineering platforms, and model development, testing and evaluation."
  },
  {
    "id": "wireless",
    "title": "Wireless Communications & Networks",
    "description": "Radio systems, cellular networks, signal processing, and communication technologies."
  },

  {
    "id": "cloud-devops",
    "title": "Cloud, DevOps & Software Engineering",
    "description": "Cloud platforms, software development, DevOps practices, cloud security, and cloud-based data analytics."
  },
    {
    "id": "system-design",
    "title": "System Design & Software Architecture",
    "description": "Scalable services, distributed systems, architecture tradeoffs, and reliability."
  },
  {
    "id": "cybersecurity",
    "title": "Cybersecurity",
    "description": "Cloud security, threat detection, incident response, risk management, and secure system operations."
  },
  {
    "id": "product-management",
    "title": "Management: Project, AI Product",
    "description": "AI product strategy, stakeholder alignment, product delivery, and responsible adoption of generative AI."
  },
  {
    "id": "quantum-compute",
    "title": "Quantum Computing",
    "description": "AI product strategy, stakeholder alignment, product delivery, and responsible adoption of generative AI."
  }

];

// WIRELESS_CERTIFICATES_V1: reuse an existing domain; otherwise append it.
if (!window.PORTFOLIO_DATA.domainAreas.some(area => area.id === "wireless")) {
  window.PORTFOLIO_DATA.domainAreas.push({
    id: "wireless",
    title: "Wireless Networks & Telecommunications",
    description: "Cellular networks, AI for telecommunications, and 5G applications."
  });
}
