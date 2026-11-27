import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = { title: "Scam warning · Quadrature concept demo" };

export default function ScamPage() {
  return (
    <LegalPage
      path="/scam-warning"
      title="Scam warning"
      lede="Third parties have falsely claimed to be affiliated with, or endorsed by, Quadrature. Quadrature does not offer financial services to the public."
      source="https://www.quadrature.ai/scam-warning/"
      sourceNote="Report suspicious activity using the contact details on Quadrature’s official notice."
      sections={[
        {
          title: "What is happening",
          body: (
            <p>
              Quadrature has been made aware of fraudulent activity by third parties claiming to be affiliated with,
              or endorsed by, Quadrature Capital Limited and its affiliated entities, for example offering
              purported cryptocurrency and other investment services or opportunities in Quadrature&rsquo;s name.
            </p>
          ),
        },
        {
          title: "What Quadrature does not do",
          body: (
            <p>
              Quadrature does not offer any investment management, advisory, brokerage or other financial services
              to, or accept deposits or subscriptions from, the general public in any form. Anyone offering you such
              services in Quadrature&rsquo;s name is likely to be fraudulent; do not interact with them.
            </p>
          ),
        },
        {
          title: "The only official website",
          body: (
            <>
              <p>
                Quadrature&rsquo;s only official website is quadrature.ai. Impersonating domains and websites may
                look similar but have nothing to do with Quadrature. Do not give information or money to anyone
                behind them. Known examples include:
              </p>
              <ul className="legal-list mono">
                <li>quadrature.vip</li>
                <li>quadrature-ai.vip</li>
              </ul>
              <p>This concept demo is not an official Quadrature site either.</p>
            </>
          ),
        },
        {
          title: "If you have been affected",
          body: (
            <p>
              If you believe you have been a victim of fraud or any other crime, contact your local law enforcement
              authorities and, where appropriate, financial regulators.
            </p>
          ),
        },
      ]}
    />
  );
}
