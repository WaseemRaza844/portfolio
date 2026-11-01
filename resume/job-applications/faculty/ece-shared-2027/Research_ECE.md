# Research Statement: Reliable Intelligence for Wireless, Sensing and Networked Systems

> Waseem Raza, PhD | Academic Research Vision | 2027

## Research question and established foundation

My research addresses a recurring engineering problem: how can a model make reliable decisions when measurements are imperfect, training examples are limited, and operating conditions change? In wireless networks, those changes include propagation environments, traffic demand, user distribution, and equipment behavior. In wearable sensing, they include differences among people, devices, and everyday movements. The common scientific questions are whether a model generalizes, when adaptation helps, and how an intelligent system should respond when it cannot trust its own prediction.

My doctorate in Electrical and Computer Engineering at the University of Oklahoma focused on AI/ML for wireless networks. I developed approaches for data-efficient radio-propagation prediction, transfer and generative modeling, and network failure detection and correction. I have reported work in peer-reviewed venues including IEEE VTC, IEEE PIMRC, and journals in communications and intelligent sensing. Related projects use smartwatch accelerometer and gyroscope streams for activity recognition, which has extended my interest in trustworthy time-series models beyond telecommunications.

My experience at AT&T Labs, Futurewei, and AT&T reinforced a lesson that motivates this program: a strong model on a curated benchmark is not necessarily dependable in a real system. Labels may be incomplete, observations change with time, and the cost of a wrong action can be larger than a small gain in average accuracy. I intend to build a research agenda around testable advances in reliable learning, reproducible engineering evaluation, and intelligent sensing and communications.

## Research direction 1: Data-efficient propagation and digital twins

High-fidelity radio planning and optimization require models that work across locations and deployment conditions, even when detailed field measurements are scarce. My prior research on wireless propagation investigated learning from simulated and measured data, generative augmentation, and domain-aware transfer learning. One question I want to pursue further is how to select training information and uncertainty measures so that an adaptation helps a target environment rather than making its predictions worse.

The proposed work begins with controlled benchmarks comparing analytical propagation estimates, interpretable machine learning, and compact deep models across held-out environments. I would study which features of a source cell or deployment indicate useful transfer, when synthetic samples improve performance, and how confidence should be reported when the target setting differs from training. Extensions could couple prediction with data-driven network configuration or simulation-based digital twins, where a model's uncertainty informs how aggressively a controller should act.

The near-term outputs would be reproducible baselines, transparent performance comparisons, and methods for identifying beneficial transfer or augmentation. Where collaborators and facilities permit, limited over-the-air validation using lawful and authorized measurements could test those results beyond simulation. The initial program would not depend on a proprietary operator dataset or the purchase of an extensive RF laboratory.

## Research direction 2: Network resilience and intelligent control

Automated networks must detect failures, identify plausible causes, and make corrective decisions under interference, traffic variation, and service constraints. My work on outage detection, cell-outage compensation, and reinforcement-learning-based self-healing provides a foundation for studying the reliability of such decisions.

One line of research would compare supervised anomaly detectors and simple statistical monitoring under realistic label imbalance and changing traffic. A second would investigate optimization or learning-based responses to simulated network failures, balancing coverage, fairness, and constraints on unaffected users. The contribution I would seek is not a black-box policy that merely wins a simulation benchmark, but a method whose operating limits, data requirements, and failure modes are identifiable.

This research lends itself to industry collaboration because practitioners face precisely these tradeoffs. My prior industry appointments can inform relevant questions and workflows, but I would seek new, properly authorized partnerships rather than assume access to company data or equipment.

## Research direction 3: Robust learning from sensor and physiological time series

Wearable inertial sensors are a practical domain in which to study model reliability. My work on wrist-worn activity patterns has involved accelerometer and gyroscope measurements, temporal classification, user-to-user variability, and challenging false-positive events. These conditions make it possible to test how windowing, feature choice, personalization, and uncertainty estimation affect actual errors rather than a single average score.

I would investigate data-efficient models and evaluation protocols for cross-user sensing and networked cyber-physical applications. Student projects could begin with authorized or open datasets, compare a simple feature-based classifier with a compact deep model, and analyze errors by participant or activity type. Later studies could test transfer, limited personalization, or reliability-aware abstention, with careful attention to privacy and potential misuse. New human-subject data collection would occur only after appropriate review, consent, and data safeguards.

This direction creates opportunities to collaborate with faculty in embedded systems, signal processing, human-centered computing, biomedical engineering, and sensor integration. It does not presume expertise in clinical diagnosis, custom device fabrication, or semiconductor processing.

## Building a funded and student-inclusive program

My first priority would be to establish a small set of experimental platforms that can support several linked questions without repeatedly rebuilding the infrastructure. A shared repository, clean baseline models, documented evaluation splits, and reproducible simulation scripts would provide a productive entry point for undergraduate research. Newer students could reproduce a baseline or implement a data-quality check; more experienced students could formulate a controlled comparison, develop a method, and lead a poster, capstone, or publication-ready study when appropriate.

During the first year, I would create research briefs for two tracks: robust wireless prediction and reliable sensor/time-series learning. I would identify collaborators across communications, computing, sensing, and controls, and align the work with the available laboratory and teaching resources. Over the next two to three years, I would develop externally fundable questions around robust AI for wireless and cyber-physical systems, practical network autonomy, and trustworthy sensing. Potential sponsors include federal agencies and relevant industry programs, with proposal targets chosen after matching project scope to program priorities and institutional capabilities. I would not represent the program as already funded.

The long-term aim is a coherent research group that connects algorithm design to engineering evidence: models that learn from limited data, reveal when the world has changed, and help systems act carefully in response. I want students to take part in that process, from asking a question and writing the first test to defending the final conclusion.
