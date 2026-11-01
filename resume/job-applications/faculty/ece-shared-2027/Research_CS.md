# Research Statement: Reliable Machine Learning and Reproducible Computing

> Waseem Raza, PhD | Computer Science and Software Engineering

## Core agenda

My research begins with a practical computing question: when do algorithms that appear to work on a benchmark stop working on new data? I study reliable machine learning for time-series and network measurements, with attention to data scarcity, distribution shift, evaluation design, and the software needed to reproduce a result. The work connects algorithms and data science to networked systems and intelligent sensing.

My PhD in Electrical and Computer Engineering at the University of Oklahoma developed methods for modeling wireless environments with limited measured data, transferring learning across related conditions, and detecting or compensating for network failures. I also study smartwatch activity-recognition signals, where variation among participants presents a different but related generalization problem. Research and engineering experience at AT&T Labs, Futurewei, and AT&T added practical experience with ML workflows, imperfect labels, model evaluation, and software used for operational analysis.

## Track 1: Reliable learning with limited, changing data

A first track would examine how small-data classifiers and regression systems behave when test distributions differ from training. Students could reproduce a baseline using scikit-learn, establish appropriate train/test partitions, compare it with a compact neural model, and test augmentation or transfer under controlled shifts. A useful contribution may be a method that improves predictions, but it may also be an evaluation protocol that reveals when an apparent improvement is caused by data leakage or a misleading split.

A longer-term direction is reliability-aware inference: rather than forcing a confident label from every input, can a lightweight method identify when there is insufficient evidence? Network anomaly detection and wearable activity recognition provide concrete datasets for this question. I would measure calibration, error under shift, computational cost, and false positives, not only accuracy.

## Track 2: Software and algorithms for intelligent networked systems

A second track would study network reliability as a reproducible software and data-analysis problem. An undergraduate could implement a tool that analyzes public or simulated traffic traces, develop anomaly-detection baselines, add automated tests and a small visual interface, and document performance changes under missing data or altered traffic. An advanced student could compare a rule-based response with a constrained optimization or learning-based policy in simulation.

This line would connect programming, data structures, software testing, data science, and networks through authentic projects. I would also look for collaborators in cybersecurity and software engineering where robust monitoring and well-documented evaluation are useful, without claiming that my prior teaching has included every area of the CS curriculum.

## Engaging undergraduate researchers

A sustainable applied-computing program should let a first-year student contribute without already knowing deep learning. I would define short entry projects such as data-cleaning tests, baseline reproduction, visualization or API documentation. After learning the workflow, students could own a bounded research question, write an experiment plan, implement and test code using Git, and report both positive and negative results.

The shared infrastructure would consist of a small open-source codebase, versioned experiments, curated public datasets, and predictable review milestones. Senior students could mentor junior contributors and develop individual projects into conference submissions or demonstrations when the evidence warrants. Responsible data handling would be included from the outset; proprietary industry records and new human-subject datasets would not be used without proper authorization.

## Scholarly development and collaborations

I would sustain peer-reviewed research in reliable ML and intelligent systems, seeking collaborations around sensor data, computer networks, and applied analytics. Near-term goals would be a reproducible benchmark and student-authored extensions in each track. Over time, I would pursue external support where questions and faculty resources justify it. The objective is a credible program that balances scholarly output with undergraduate teaching and gives students an opportunity to build software that others can understand and evaluate.
