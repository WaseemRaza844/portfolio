# Research Plans and Undergraduate Involvement

> Waseem Raza, PhD | Assistant Professor of Computer Science | Susquehanna University

## A research question that students can enter

My research is concerned with a problem common to many computational systems: a model can perform well on a familiar dataset and fail when the data, users, or operating conditions change. I study how to recognize these failures, reduce dependence on large training sets, and make data-driven decisions more reliable. The question began in my doctoral work on AI/ML for wireless networks, where propagation, traffic patterns, and network conditions vary across locations and time. It now also informs my work with wearable sensor signals and time-series recognition.

This research has a natural place in computer science. It combines programming, algorithmic evaluation, statistical learning, data management, simulation, and responsible handling of evidence. It can also be pursued with modest resources. Many useful questions require no new hardware: a carefully chosen open dataset, a well-defined test split, a compact model, and enough discipline to compare results fairly. I would build a program around such experiments so that students can join at different stages of their education and make contributions that are useful to the next student.

My foundation includes peer-reviewed work on data-driven wireless propagation, generative augmentation, and network resilience, together with work on wearable activity monitoring. Research and engineering experience at AT&T Labs, Futurewei, and AT&T reinforced a lesson I want students to learn early: the largest model or highest headline score is not necessarily the best answer to a practical problem. Reliable baselines, clear assumptions, and careful failure analysis matter.

## Direction 1: Data-efficient and reliable machine learning

I want to investigate how learning systems behave when examples are limited or when the test population differs from the training population. Potential research questions include when synthetic data help rather than distort a classifier, whether a simple transfer-learning method is preferable to training a large model, and how to recognize predictions that are not well supported by the available data.

An undergraduate could begin by reproducing two approaches to classification on an open, modest-sized dataset. The student would document data cleaning, establish a baseline such as logistic regression or a tree-based model, and compare it with a compact neural network under identical test conditions. In a next stage, the student could hold out a user group or simulated environment, study the resulting error patterns, and test a targeted adaptation or uncertainty-estimation method. A more advanced project could investigate when a model should abstain from making a prediction rather than report an unreliable answer.

This direction extends my dissertation research on robust and data-efficient wireless modeling, including transfer and generative learning. It has broader relevance to machine learning education because it requires students to think critically about generalization, evaluation design, and the difference between statistical evidence and an appealing demonstration.

## Direction 2: Network data, anomaly detection, and reproducible simulation

Networking provides a useful setting for teaching and studying the interaction between algorithms and real systems. I would continue research on network reliability and performance, with an emphasis on datasets and simulations that students can reproduce without requiring access to proprietary telecommunications infrastructure.

One student project could build a small Python system to flag unusual behavior in public or simulated network measurements. The first task would be to define what counts as an anomaly and implement an interpretable statistical baseline. The next task would be to study false alarms, class imbalance, and changes in traffic patterns. Another project could simulate congestion or packet loss and compare a fixed control rule with a learned decision policy, reporting not only performance but also the cost of complexity. A student interested in software development could turn these experiments into a tested, documented command-line tool or a simple visualization interface.

The larger research question is how to keep intelligent network management understandable and dependable when observations are incomplete. My previous work on outage detection, propagation models, and network optimization provides a set of established methods and research questions. The projects would use open or synthetic data, not confidential industry records.

## Direction 3: Wearable sensing and trustworthy time-series analytics

Wearable inertial sensors create dense time series that are useful for studying activity recognition, but small datasets and person-to-person variability complicate evaluation. My research on smartwatch-based monitoring of daily activities and medication-taking gestures provides a foundation for computational projects involving segmentation, classification, cross-person generalization, and responsible data use.

For an undergraduate, a first project might compare how sampling and windowing decisions affect a simple activity classifier. Another could quantify which everyday movements cause false positives and build a dashboard to communicate these failures. Later students could compare lightweight personalization with a shared model or explore tradeoffs between accuracy, computational cost, and uncertainty. The emphasis would remain on understanding generalizable algorithms and measurement quality, rather than claiming clinical validity.

Existing datasets and properly authorized recordings would support early experiments. Any new human-subject work would proceed only with the required institutional review, consent procedures, data minimization, and secure data management. This area could also support collaborations with students interested in health sciences, mathematics, or human-centered computing.

## How undergraduates would participate

I would organize these directions as a sequence of achievable projects rather than expect every undergraduate to enter an open-ended research problem immediately.

**First stage: establish the evidence.** A student would learn the research question, read a short set of foundational papers, reproduce a baseline in a shared Git repository, and prepare a brief report showing that the experiment can be repeated. This stage gives newer students a legitimate contribution even if they are not yet ready to design a new algorithm.

**Second stage: test a bounded question.** The student would choose a single controlled change, such as a different data split, a feature representation, or a reliability threshold. We would agree on metrics before running the comparison and examine negative as well as positive results. Short weekly check-ins, milestone reviews, and a lab notebook would keep the work focused.

**Third stage: communicate and extend.** More experienced students could refine the method, contribute tests and documentation, and mentor newcomers. Depending on the scope, results could support an individual capstone, independent study, poster, workshop paper, or journal submission. A useful final outcome might also be a reusable dataset-processing tool or a robust teaching example; not every project needs to end in a publication to be valuable.

This structure is especially important with a three-course-per-semester teaching assignment. I would maintain a small number of related research questions, reuse a carefully documented software foundation, and scope projects so that supervision and progress are sustainable. A shared codebase and stable evaluation protocol would allow successive student cohorts to build on each other's work without starting from scratch.

## First steps at Susquehanna

During the first year, I would establish two accessible project tracks: one in reliable machine-learning evaluation and one in network or wearable time-series data. I would develop starter notebooks, clear project briefs, a small benchmark suite, and guidelines for code review and data handling. I would also meet colleagues to identify intersections with the Department of Mathematics and Computer Science and with other disciplines where students have questions that computing can help answer.

Over the following two years, I would extend the most promising student results into a coherent set of studies on distribution shift, model reliability, and lightweight adaptation. External funding would be pursued when the questions and student capacity justify it, rather than assuming an established laboratory or large grant. My objective is a modest but active research program that produces credible scholarship while giving undergraduates real experience in asking questions, writing software, testing claims, and presenting evidence.

The common thread is simple: I want students to see computing as a discipline in which a clear experiment and an honest interpretation are as valuable as a sophisticated algorithm. That principle connects the research I have already done to the kind of faculty-mentored work I hope to develop at Susquehanna.
