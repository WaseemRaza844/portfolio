# Research Statement: Trustworthy AI for Resilient Wireless Networks and Intelligent Healthcare Sensing

> Waseem Raza, PhD | Rutgers ECE Assistant Professor | 26FA1036

## Vision and prior contributions

My long-term research goal is to make AI-driven connected systems reliable when measurements are limited, conditions change, and incorrect predictions have meaningful consequences. This challenge appears in both next-generation wireless infrastructure and intelligent healthcare sensing: a propagation model trained in one environment may fail in another, while an activity recognizer trained on one person's movements may generate false alarms for another. I seek generalizable approaches to data-efficient learning, adaptation, uncertainty and rigorous systems-level evaluation that are grounded in engineering physics and operational requirements.

I completed my PhD in Electrical and Computer Engineering at the University of Oklahoma in July 2025, focusing on AI/ML for wireless-network resilience. My research addressed domain-informed generative learning and transfer learning for radio propagation, 3GPP-aligned network simulation, and learning-based network outage detection and optimization. This research contributed to peer-reviewed publications in wireless communications and networking, including IEEE PIMRC and work on proactive cellular reliability. Industry research at AT&T Labs and Futurewei extended my experience to 5G-NR and NR-NTN measurements, terminal cell selection, and channel-state-information compression. More recently, my machine learning engineering assignment supporting AT&T's E911 service assurance has reinforced the importance of robust validation and operational failure analysis. In parallel, wearable-sensing studies using wrist inertial measurements, neural sequence models and reliability-aware decoding have motivated a broader research direction in sensing and healthcare.

## Thrust 1 — Reliable and data-efficient AI for next-generation wireless infrastructure

**Research question:** How can AI-assisted RAN and network-management decisions remain trustworthy when measured data are sparse, environments shift, and communication resources are constrained?

My initial agenda would establish physically informed propagation and network-control benchmarks using 3GPP-aligned simulation and authorized measurements. I would compare conventional baselines with generative augmentation, transfer and domain-adaptive learning under carefully varied environmental shifts, mobility patterns and measurement sparsity. Evaluation would report not just average prediction error but also calibration, failure rates, computational complexity, and downstream consequences for coverage, interference and service resilience.

A second line would investigate uncertainty-aware network anomaly detection and recovery. Student-led experiments could compare rule-based and learned recovery policies under simulated outages or degraded connectivity, track service-level impacts, and identify conditions where an AI recommendation should be withheld or escalated. Longer term, these tools could support AI-native networking, digital twins, and context-aware optimization for emerging 6G systems, with realistic latency and resource budgets. I would seek collaborations in communications, cybersecurity and networked systems; open or synthetic benchmarks would make early research independent of proprietary infrastructure.

## Thrust 2 — Trustworthy sensing for healthcare and connected devices

**Research question:** How can sensor-based AI identify meaningful events while controlling false positives, cross-user degradation and uncertainty under realistic daily activities?

My prior smartwatch work explored inertial-sensor activity recognition for medication-taking gestures and dietary activities. Building on this foundation, I would investigate reliable temporal event detection, selective prediction, cross-person adaptation, and lightweight inference with quantifiable false-alarm burden. The initial studies would use existing authorized and public sensor datasets; student researchers could reproduce feature-based and neural baselines, perturb sampling or windowing conditions, and study generalization through participant-disjoint evaluation.

A longer-term direction involves networked sensing systems in which communications and inference interact. We would measure how missing or delayed packets, edge/cloud placement, changing sensing environments and compute budgets affect reliability. This creates natural collaboration opportunities across ECE, computer science and healthcare disciplines. Any new human-participant studies would proceed only after appropriate institutional review and consent. The objective is not to claim clinical validity prematurely, but to construct reproducible technical evidence about whether a detection system is dependable across realistic conditions.

## Cross-cutting methodology and interdisciplinary impact

Both research thrusts share three methodological questions: **when to adapt**, **how to quantify reliability**, and **how to evaluate the consequences of prediction error**. A common toolkit—physically informed modeling, transfer learning, generative augmentation, failure-mode analysis and uncertainty-aware decision rules—would allow algorithmic advances to transfer across domains without assuming that communication measurements and human activity signals are interchangeable.

The program aligns with Rutgers' strategic priorities in Physical and Virtual Infrastructure and Healthcare Technology. It also supports secure and resilient systems through attention to untrusted or missing observations, without asserting a prior record in specialized hardware security or robotics. Collaborations with faculty in networking, signal processing, AI, sensing and health technology could connect methodological work to compelling applications and larger proposals.

## Research plan, funding development and mentoring

In **year one**, I would establish two documented baseline repositories: one for propagation and network-resilience experiments, and one for wearable time-series event detection. I would recruit undergraduate and graduate researchers through project courses, independent study and faculty collaborations, assigning tractable tasks such as data auditing, simulation testing, metric design and model comparisons. Each project would require a clear research question, reproducible baseline, verification plan and discussion of limitations.

In **years two and three**, I would pursue novel adaptation and reliability methods, combine promising approaches with networked or physical prototypes where facilities permit, and submit peer-reviewed publications with student coauthors. I would develop proposals aligned with opportunities such as NSF communications/networking programs, trustworthy AI, cyber-physical systems and relevant health-technology initiatives, as well as industry partnerships where scientifically appropriate. These are *prospective funding targets*, not existing awards.

I would mentor through regular research meetings, reproducibility checklists, ethical data practices, explicit authorship discussions and milestones calibrated to student preparation. My measure of success is a sustainable program producing credible algorithms, reusable experimental tools, funded collaborations and graduates who know how to question, test and communicate AI-driven engineering systems.
