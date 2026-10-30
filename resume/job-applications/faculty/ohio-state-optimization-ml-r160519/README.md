# Ohio State University — Optimization for Machine Learning — R160519

Job-specific faculty resume tailored from the reusable Faculty resume.

## Target
- Institution: The Ohio State University
- Units: Integrated Systems Engineering (ISE) and Electrical and Computer Engineering (ECE)
- Requisition: R160519
- Position: Assistant Professor, Tenure Track
- Area: Optimization for Machine Learning

## Tailoring strategy
The resume emphasizes established evidence in:
- optimization and AI-enabled decision-making,
- reinforcement learning and autonomous network control,
- robust ML under distribution shift and limited data,
- domain adaptation and transfer learning,
- scientific/domain-informed ML and digital twins,
- distributed/networked intelligent systems,
- research publication, teaching, mentoring, and industrial R&D.

It intentionally avoids presenting unsupported pure-OR methods as established expertise.

## Source and build
This is a preserved standalone LaTeX application resume from the earlier workflow. It remains separate from the profile-based Lafayette CV overlay, but is included in the unified application-resume build.

From the repository root, compile and validate the PDF directly into this folder:

```bash
python resume/build_tailored.py --job ohio-state-optimization-ml-r160519
```

The builder uses a temporary directory for LaTeX intermediates and writes only the final PDF and build report beside the source.

The PDF is stored beside the source. For future faculty applications, use the reusable profile-overlay workflow documented in `resume/resume-profiles/faculty/README.md`.
