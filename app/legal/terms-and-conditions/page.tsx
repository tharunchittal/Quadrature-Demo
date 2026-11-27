import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = { title: "Terms and conditions · Quadrature concept demo" };

export default function TermsPage() {
  return (
    <LegalPage
      path="/legal/terms-and-conditions"
      title="Terms"
      lede="The terms that govern quadrature.ai are published there. This concept demo is a design study and is not covered by them."
      source="https://www.quadrature.ai/legal/terms-and-conditions/"
      sections={[
        {
          title: "Who publishes quadrature.ai",
          body: (
            <p>
              Quadrature Capital Limited, a limited company registered in England and Wales with registered number
              09516131. Registered office: The Leadenhall Building, 122 Leadenhall Street, London EC3V 4AB.
            </p>
          ),
        },
        {
          title: "What the terms cover",
          body: (
            <p>
              The user agreement for quadrature.ai covers the limited right to use the site, its security, ownership
              of content, the commitments users make, privacy, the site being provided as is, and general
              conditions.
            </p>
          ),
        },
        {
          title: "About this demo",
          body: (
            <p>
              This is an unofficial concept redesign. It is not affiliated with Quadrature Capital, collects nothing,
              and is not indexed by search engines.
            </p>
          ),
        },
      ]}
    />
  );
}
