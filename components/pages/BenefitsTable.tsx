"use client";

import { useState } from "react";

export type Benefit = { name: string; detail: string; group: "Time" | "Health" | "Money" | "Growth" | "Together" };

const GROUPS = ["All", "Time", "Health", "Money", "Growth", "Together"] as const;

/** Every benefit in one index, filterable by what it is for. */
export default function BenefitsTable({ items }: { items: Benefit[] }) {
  const [group, setGroup] = useState<(typeof GROUPS)[number]>("All");
  const shown = group === "All" ? items : items.filter((b) => b.group === group);

  return (
    <div className="benefits">
      <div className="filter" role="group" aria-label="Filter benefits">
        {GROUPS.map((g) => {
          const count = g === "All" ? items.length : items.filter((b) => b.group === g).length;
          return (
            <button
              key={g}
              type="button"
              className={`filter-btn mono ${group === g ? "is-on" : ""}`}
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
            >
              {g} <span className="dim">{count}</span>
            </button>
          );
        })}
      </div>
      <table className="benefit-table">
        <caption className="sr-only">Benefits{group !== "All" ? `: ${group}` : ""}</caption>
        <thead>
          <tr className="mono dim">
            <th scope="col">Benefit</th>
            <th scope="col">What it is</th>
            <th scope="col">For</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((b) => (
            <tr key={b.name}>
              <th scope="row" className="display benefit-name">
                {b.name}
              </th>
              <td className="benefit-detail">{b.detail}</td>
              <td className="mono dim">{b.group}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
