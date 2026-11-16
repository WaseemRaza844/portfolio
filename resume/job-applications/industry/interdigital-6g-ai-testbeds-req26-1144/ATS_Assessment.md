# InterDigital REQ26-1144 — Evidence-Based Resume Match

This is a transparent human-authored rubric, not InterDigital's ATS score, not a probability of interview, and not a third-party screening result. Weights sum to 100. Credit 1 = directly supported; partial credit reflects related evidence with limitations. Assessment uses the supplied posting and existing resume sources. Actual hiring thresholds and filters are unknown.

| Qualification | Weight | Credit | Evidence / limitation |
|---|---:|---:|---|
| PhD in relevant discipline | 8 | 100% | PhD, ECE |
| AI/ML implementation and evaluation | 12 | 100% | AT&T, Futurewei, doctoral models |
| Wireless and cross-layer architecture | 12 | 85% | RAN experience; core architecture familiarity, limited integration evidence |
| Working prototypes and testbeds | 12 | 90% | TurboRAN, SyntheticNET; no verified full-stack open-source core integration |
| Python/C/C++/Linux | 8 | 90% | Skills established; Python strongest |
| ML frameworks | 5 | 100% | PyTorch, TensorFlow |
| Debugging and systems integration | 7 | 80% | Research software and operational pipelines; limited full-stack cellular integration |
| Communication and collaboration | 6 | 100% | Publications, industry teams, mentoring |
| Cellular platforms/SDRs | 5 | 60% | TurboRAN; specific OAI/Open5GS/SDR hands-on not established |
| Core architecture concepts | 5 | 80% | Knowledge of core/RAN and sessions; not deployment |
| Agentic/GenAI | 5 | 90% | Portfolio RAG and multi-agent toolchains |
| Physical AI/sensing/digital twins | 4 | 75% | Wearable sensing and digital twins; no CARLA/ROS evidence |
| Distributed protocols | 3 | 35% | TCP/IP fundamentals; specialized protocols unverified |
| Simulation | 3 | 85% | Custom Python system-level simulator, MATLAB |
| Cloud/reproducibility | 3 | 80% | Git, Docker, CI/CD, Azure; Kubernetes familiarity |
| Research output | 2 | 100% | Peer-reviewed research |

**Estimated evidence alignment: 87.3/100.** This score measures the candidate's documented fit, not keyword stuffing. The required qualifications are weighted most heavily. The automated PDF test separately checks page count, extraction, and key phrases.

## Interview preparation priorities

1. Deploy a small Open5GS + OAI or other compatible 5G SA environment if resources allow; document registration, PDU session, UPF traffic and performance.
2. Prepare TurboRAN and SyntheticNET diagrams, your exact contributions, components, interfaces, experimental conditions and results.
3. Refresh 5G core functions AMF/SMF/UPF/PCF/NEF, QoS flow mapping and service-based interfaces; explain edge placement.
4. Build a small reproducible agentic network-diagnostics demonstration with nonproprietary data and testable metrics.
5. Study one system-level/link-level simulator and transport/application protocols relevant to the position. Only add named tools to resume once actually used.
6. Prepare examples of debugging and integrating components. No assumed 3GPP contributions, patents, or prior end-to-end commercial 6G deployment.
