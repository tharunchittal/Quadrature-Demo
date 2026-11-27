"use client";

import { useState } from "react";

export type Step = { name: string; length: string; body: string[] };

/** The four stages as a stepper: one at a time, arrow keys move between them. */
export default function HiringSteps({ steps }: { steps: Step[] }) {
  const [i, setI] = useState(0);
  const step = steps[i];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") setI((v) => Math.min(steps.length - 1, v + 1));
    if (e.key === "ArrowLeft") setI((v) => Math.max(0, v - 1));
  };

  return (
    <div className="steps">
      <div className="steps-rail" role="tablist" aria-label="Hiring stages" onKeyDown={onKey}>
        {steps.map((s, n) => (
          <button
            key={s.name}
            role="tab"
            id={`step-tab-${n}`}
            aria-selected={n === i}
            aria-controls="step-panel"
            tabIndex={n === i ? 0 : -1}
            className={`step-tab ${n === i ? "is-on" : ""} ${n < i ? "is-done" : ""}`}
            onClick={() => setI(n)}
          >
            <span className="step-bar" aria-hidden="true" />
            <span className="mono dim">Stage {n + 1}</span>
            <span className="display step-name">{s.name}</span>
            <span className="mono dim">{s.length}</span>
          </button>
        ))}
      </div>
      <div id="step-panel" role="tabpanel" aria-labelledby={`step-tab-${i}`} className="step-panel" key={i}>
        {step.body.map((p) => (
          <p key={p} className="body">
            {p}
          </p>
        ))}
        <div className="step-nav">
          <button type="button" className="btn btn-line" disabled={i === 0} onClick={() => setI(i - 1)}>
            <span className="btn-arrow" aria-hidden="true">←</span>
            <span className="btn-label">Previous</span>
          </button>
          <button
            type="button"
            className="btn btn-solid"
            disabled={i === steps.length - 1}
            onClick={() => setI(i + 1)}
          >
            <span className="btn-label">Next stage</span>
            <span className="btn-arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
