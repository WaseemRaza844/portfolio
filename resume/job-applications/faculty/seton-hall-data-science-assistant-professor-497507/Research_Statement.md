# Research Statement: Reliable, Data-Efficient Machine Learning for Data Science

> Waseem Raza, PhD | Assistant Professor in Data Science | Seton Hall University

## Research foundation and agenda

My research addresses a recurring limitation of machine learning: models trained on finite, convenient datasets may fail when the data distribution, users, operating environment, or measurement quality changes. I study how to produce useful predictions with limited labeled data while evaluating robustness, uncertainty, and error modes. This agenda is rooted in my PhD in Electrical and Computer Engineering at the University of Oklahoma, focused on AI/ML for reliable and resilient wireless networks, and extends naturally to broader data science questions in time-series learning, anomaly detection, generative modeling, and responsible deployment.

My prior research includes data-efficient radio propagation estimation, domain-adaptive and generative learning, network outage detection and optimization, and wearable inertial-sensor activity recognition. The work draws on statistical validation, synthetic data, transfer learning, deep neural networks, and reproducible simulation. My peer-reviewed publication record includes work on propagation-model resilience and network optimization, while collaborative health-sensing research brings additional questions about cross-participant generalization and false alarms. Industry experience at AT&T Labs, Futurewei and AT&T has reinforced a fundamental principle: the best model is not necessarily the most complex model, but the one whose empirical behavior, assumptions, and limitations can be explained.

At Seton Hall, I propose a coherent research program with three mutually reinforcing directions: **reliable learning under data scarcity and distribution shift; trustworthy sensing and time-series inference; and data-centric intelligence for operational systems**. Each direction can support original publications, collaborative grants, graduate thesis work, and bounded undergraduate research experiences.

## Direction 1: Robust and data-efficient machine learning

Many organizations cannot collect extensive labeled examples for every operating condition. A model developed using data from one environment may transfer poorly to another. My prior generative and transfer-learning work on wireless propagation provides a foundation for analyzing when synthetic examples improve learning, when adaptation causes negative transfer, and how reliability can be quantified before deployment.

I would develop evaluation frameworks spanning simple statistical baselines, tree ensembles, compact neural networks, transfer learning, and generative augmentation. Studies would systematically vary sample availability and distribution shift, measuring prediction quality, calibration, uncertainty, computational cost, and performance across distinct populations or environments. A specific line of inquiry is selective prediction: identifying instances on which the model should abstain because available evidence is insufficient. This can create methodological contributions beyond any one application domain and support reproducible benchmarks and reusable evaluation software.

## Direction 2: Trustworthy time-series and sensor data science

Time-series measurements from wearable devices and networked systems present challenges in segmentation, temporal dependence, heterogeneous users, missing data, and false alarms. My recent research on smartwatch-based medication and dietary activity recognition provides a practical test bed for studying these issues without requiring a large hardware laboratory. In related work, event-level decoding and reliability criteria have reduced false alarms while making sensitivity-retention tradeoffs measurable.

I would investigate event-based representations, cross-subject evaluation, lightweight sequence learning, reliability thresholds, and adaptation to new users or contexts. Student-accessible investigations might compare segmentation methods, inspect the distribution of errors among users, or test whether abstention improves the reliability of a downstream decision. New human-subject studies would require appropriate institutional review, consent, and secure management; early research would prioritize open or properly authorized datasets. Potential collaborations span computing, engineering, health, and human-centered research.

## Direction 3: Data-driven diagnostics, anomaly detection and reliable operations

Complex operational systems generate fragmented and heterogeneous data: logs, events, sensor streams, text, and contextual metadata. My work with telecommunications diagnostic data and Azure-based analytical pipelines has shown the importance of careful labels, data integration, error analysis, and stakeholder-defined metrics. At AT&T, a root-cause classification effort improved automated classification performance from approximately 20% to 80%; this operational experience motivates broader research on trustworthy diagnostics rather than claims to a proprietary dataset or system.

I would explore interpretable anomaly detection, learning with incomplete labels, drift-aware evaluation, and human-in-the-loop diagnosis. Open and synthetic network or infrastructure datasets could support studies comparing classical statistical methods, supervised learning, and compact generative models. This direction is a promising basis for interdisciplinary capstones and collaborations with public-service or industrial partners, with explicit privacy and data-use controls.

## Student mentorship, publications and funding trajectory

A faculty research group should provide a transparent path from classroom learning to original scholarship. I would recruit students with different levels of preparation and structure projects as successive contributions: reproducing a baseline; designing one controlled test; documenting results and limitations; and, where warranted, extending the work toward a workshop, conference, or journal publication. Shared repositories, code reviews, scheduled milestones, clear authorship expectations, and frequent technical discussions would make participation sustainable.

**In year one**, I would establish reusable benchmark datasets and software for robust ML and time-series evaluation, mentor initial student teams, and pursue collaborations with faculty in Mathematics, Computer Science, Data Science and Engineering. **In years two and three**, I would advance the most promising methods into peer-reviewed studies and develop external research proposals. Plausible opportunities to investigate include NSF programs supporting foundational AI, data science, and undergraduate research, as well as interdisciplinary and industry partnerships when research objectives align. These are prospective targets; I do not claim existing awards or committed institutional funding.

My goal is a research program recognized for rigorous and reproducible data science, grounded methodological contributions, and meaningful student coauthorship. Seton Hall's emphasis on teaching, mentorship, scholarship, and ethical development offers a context in which robust AI research can serve both disciplinary discovery and students' development as responsible computing professionals.
