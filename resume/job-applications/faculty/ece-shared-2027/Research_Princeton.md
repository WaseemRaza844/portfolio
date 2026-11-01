# Research Interests: Reliable AI for Networked and Sensing Systems

> Waseem Raza, PhD | Princeton University | Electrical and Computer Engineering

## Research direction

My research seeks to make intelligent engineering systems more dependable when observations are incomplete, data are scarce, and operating conditions shift. In my PhD work at the University of Oklahoma, I examined these problems in wireless networks: predicting radio propagation across environments, learning from simulated and measured data, transferring models between cells, and detecting or responding to network outages. Subsequent work on wearable inertial sensing extends the same methodological questions to time-series measurements that vary substantially between users.

My contributions so far are primarily at the level of **algorithms, measurements, modeling, and networked-system optimization**. Princeton's ECE search welcomes candidates across the field while identifying devices and device integration as a special priority. My strongest prospective contribution would be complementary research at the interface of sensing hardware, reliable inference, communication links, and adaptive systems. I would not characterize my record as semiconductor fabrication, materials synthesis, or device manufacturing research.

## Research thrust 1: Data-efficient models grounded in physical systems

Propagation modeling is a useful example of the tension between learned representations and physical evidence. A model trained on simulated radio conditions may offer good average predictions but fail after a change in environment, geometry, or user distribution. My research on generative modeling and transfer learning investigated how to reduce that gap.

I propose studying data-efficient learning methods that use physical structure and calibrated uncertainty to make predictions across related but distinct engineering settings. Immediate directions include evaluating domain shift in wireless propagation, testing source-domain selection for transfer, and comparing domain-informed augmentation with simple, interpretable baselines. These questions can inform simulation-based digital twins and measurement-driven optimization, providing a disciplined route from a learned model toward a trustworthy engineering decision.

The work could also be extended to sensor measurements when collaboration provides device characterization data, but such an extension would require identifying the relevant device physics and experimental evidence rather than assuming a model transfers automatically.

## Research thrust 2: Reliability of sensing and networked inference

My work with smartwatch inertial signals has shown how everyday activities, person-to-person differences, and recording choices can affect recognition. A model may be impressive on familiar observations and unreliable on new movements or subjects. This motivates research on cross-user adaptation, uncertainty-aware acceptance, signal quality, and the computational constraints of lightweight inference.

At Princeton, I would be interested in collaboration with faculty working on sensing, integrated systems, biomedical devices, and cyber-physical systems. A possible joint question is how errors introduced at the device, acquisition, communication, and inference stages interact in an end-to-end sensing system. I would bring expertise in signal processing, temporal learning, experimental design, and validation. Collaborators with device fabrication or integration expertise would provide the corresponding hardware perspective.

Concrete studies could begin with authorized existing measurements, compare simple signal-processing and ML baselines, and evaluate robustness to sensor orientation, missing samples, or device variability. More ambitious work could explore co-design of sensing and inference strategies with device experts. These are proposed directions, not claims of completed device-integration experiments.

## Research thrust 3: Adaptive communication and resilient systems

Reliable sensing depends on more than a classifier. Devices may operate through noisy links, constrained power budgets, shifting traffic, or incomplete observations. My earlier studies of cellular network outage detection, propagation prediction, and self-healing suggest opportunities to investigate adaptive communication policies that take uncertainty and service constraints seriously.

I would study how measurement uncertainty and predicted operating conditions can guide network reconfiguration or inference decisions, with explicit tradeoffs among accuracy, robustness, computational cost, and user fairness. Small reproducible simulations could establish the methods before partnership-driven testbed evaluations. This line also connects to intelligent edge and networked cyber-physical systems.

## Program development and impact

My initial research strategy would combine established software and simulation assets with carefully designed, publicly reproducible experiments. I would prioritize scholarly questions in robust ML, communications, and sensing for which my previous publications and industry experience provide a credible foundation. In parallel, I would seek substantive collaborations with Princeton researchers whose device characterization, fabrication, or system-integration expertise complements my own.

Students could enter through reproducible baselines, signal and network measurements, uncertainty evaluation, and increasingly independent model development. Over time I would pursue external research support and partnerships appropriate to the research questions, including federal programs and industry collaborations. My interest in Princeton is the possibility of connecting algorithmic intelligence to genuine device and systems constraints within a strong interdisciplinary ECE environment, rather than treating AI as a substitute for understanding the underlying engineering.
