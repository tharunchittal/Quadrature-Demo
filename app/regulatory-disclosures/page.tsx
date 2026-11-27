import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = { title: "Regulatory disclosures · Quadrature concept demo" };

const DOCS: [string, string][] = [
  ["Tax strategy", "https://www.quadrature.ai/files/downloads/tax-strategy-jan-26.pdf"],
  ["Modern slavery transparency statement", "https://www.quadrature.ai/files/downloads/modern-slavery-statement-2025.pdf"],
  ["Directors’ section 172 statement", "https://www.quadrature.ai/files/downloads/directors-section-172-statement.pdf"],
];

export default function DisclosuresPage() {
  return (
    <LegalPage
      path="/regulatory-disclosures"
      title="Disclosures"
      lede="Quadrature adheres to the requirements of all applicable regulatory authorities in the jurisdictions in which it operates."
      source="https://www.quadrature.ai/regulatory-disclosures/"
      sourceNote="The documents below are Quadrature’s own, hosted on quadrature.ai."
      sections={[
        {
          title: "Documents",
          body: (
            <ul className="docs">
              {DOCS.map(([name, href]) => (
                <li key={name}>
                  <a href={href} target="_blank" rel="noreferrer">
                    <span className="display doc-name">{name}</span>
                    <span className="mono dim">PDF ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          ),
        },
      ]}
    />
  );
}
