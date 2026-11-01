# Research Statement: Reliable AI for Wireless and Intelligent Sensing Systems

> Waseem Raza, PhD | Assistant Professor of Electrical/Computer Engineering | University of Scranton

## Research foundation and direction

My research asks what happens when an intelligent engineering system must operate with limited observations, unfamiliar environments, or noisy measurements. A machine-learning model may perform well on the conditions used to train it, yet make poor decisions when a cell's radio environment changes or a wearable sensor moves differently on another person's wrist. I study ways to detect and reduce these failures while keeping models and experiments understandable.

My PhD in Electrical and Computer Engineering at the University of Oklahoma focused on AI/ML for wireless networks. I investigated data-efficient radio-propagation modeling, domain-aware transfer learning, generative augmentation, outage detection, and self-healing network optimization. This work has been reported in peer-reviewed communications venues, including IEEE PIMRC and IEEE VTC, and journals in network resilience. Related smartwatch research using accelerometer and gyroscope signals extends my work to the reliability of sensor-based activity recognition. Industry research and engineering at AT&T Labs, Futurewei, and AT&T has informed my interest in data quality, engineering constraints, and practical evaluation.

I propose a focused program in **trustworthy learning for wireless and sensor-based systems**. It connects EE and CE through communication models, signal processing, programming, and data-driven decision-making. It also fits a teaching-intensive department: research questions can be divided into reproducible, semester-sized experiments that undergraduates can enter without a large laboratory or a proprietary dataset.

## Direction 1: Data-efficient wireless modeling and network resilience

Wireless planning and management often require predictions about environments where only a small amount of measured data is available. My earlier work used physically informed simulation, generative modeling, and transfer learning to improve propagation estimates and investigated AI-based detection and compensation for network outages. An important next question is not simply whether a model produces a lower average error, but **when an adaptation from one environment helps another and how that decision can be trusted**.

I would develop a controlled benchmark combining analytical propagation estimates, compact learning models, and transfer or augmentation methods. Experiments would vary measurement sparsity and the difference between source and target environments, reporting prediction error, uncertainty, and computational cost. A related study would use simulated network outages to compare an interpretable rule-based response with an optimization or learning-based policy while recording coverage, fairness, and unintended impacts.

Students could begin by reproducing a propagation baseline, plotting errors across locations, or building tests for the evaluation code. More experienced students could investigate a new source-selection or reliability criterion and report whether it improves results across several held-out scenarios. The initial experimental system would use existing simulation resources and open or authorized data; any RF testbed extension would follow collaboration and available departmental facilities.

## Direction 2: Reliable AI for wearable and networked sensors

Sensor measurements offer a complementary setting for studying robustness. In my research on wrist-worn activity recognition, variations across users and everyday movements complicate model evaluation. This motivates questions about sampling, filtering, personalization, false positives, and how a system should respond when its predictions are poorly supported.

I would investigate lightweight signal-processing and machine-learning pipelines using open or appropriately authorized inertial-sensor data. One undergraduate project could compare feature-based methods with a compact neural model under leave-one-person-out testing. Another could evaluate how missing samples or different window lengths change classification errors. More advanced work could study selective predictions that abstain when sensor evidence is unreliable.

These methods also invite interdisciplinary questions at the interface of software, electronics, and robotics. For example, a joint capstone could evaluate a sensor-to-classifier pipeline within a robot or networked device, with a collaborator providing hardware expertise and students quantifying the effects of sensor quality and communication loss. Any new human-participant research would require appropriate institutional review and consent; the program would not depend on collecting new participants immediately.

## Undergraduate research, milestones, and sustainability

I would organize research as a small set of connected projects rather than unrelated demonstrations. In the **first year**, I would establish documented baselines for wireless propagation and sensor time-series classification, recruit students through independent study or course projects, and set clear milestones for each student. A new researcher could own data cleaning, test automation, or visualization; an experienced junior or senior could design a controlled comparison and take a lead role in a conference poster or paper where the evidence supports publication.

In **years two and three**, the strongest projects could lead to new methods in uncertainty-aware adaptation and reliable sensor inference. I would pursue collaborators across Scranton's Physics & Engineering programs, seek relevant external support through federal and industry opportunities, and scale activity in line with the department's 9–12 credit teaching load. Shared repositories, weekly project meetings, explicit authorship discussions, and carefully maintained datasets would allow work to continue across student cohorts.

I want the resulting research program to be recognized for credible engineering evidence as well as useful algorithms. For students, success would include learning to ask a clear question, implement a test that another person can repeat, and communicate both a result and its limitations. That is the kind of research culture I hope to contribute to Scranton.
