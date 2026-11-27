"use client";

import { useState } from "react";

type Props = { index: number; name: string; is: string; not: string };

/**
 * A value that turns over to show what it does not mean.
 * Hover or focus previews on desktop; the button pins it (and is the only control on touch).
 */
export default function ValueCard({ index, name, is, not }: Props) {
  const [flipped, setFlipped] = useState(false);
  const id = `value-${name.toLowerCase()}`;

  return (
    <li className={`value ${flipped ? "is-flipped" : ""}`} data-reveal style={{ ["--i" as string]: index }}>
      <div className="value-inner">
        <div className="value-face value-front" aria-hidden={flipped}>
          <span className="mono dim">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="display value-name" id={id}>
            {name}
          </h3>
          <p className="value-text">{is}</p>
        </div>
        <div className="value-face value-back" aria-hidden={!flipped}>
          <span className="mono">It doesn&rsquo;t mean</span>
          <p className="value-not">{not}</p>
        </div>
      </div>
      <button
        type="button"
        className="value-toggle mono"
        aria-pressed={flipped}
        aria-describedby={id}
        onClick={() => setFlipped((f) => !f)}
      >
        {flipped ? "← What it means" : "What it doesn’t mean →"}
      </button>
    </li>
  );
}
