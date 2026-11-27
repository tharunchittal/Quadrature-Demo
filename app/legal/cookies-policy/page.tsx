import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = { title: "Cookie policy · Quadrature concept demo" };

export default function CookiesPage() {
  return (
    <LegalPage
      path="/legal/cookies-policy"
      title="Cookie policy"
      lede="This concept demo sets no cookies and runs no analytics. Quadrature’s own policy covers quadrature.ai."
      source="https://www.quadrature.ai/legal/cookies-policy/"
      sections={[
        {
          title: "This demo",
          body: (
            <p>
              The demo stores nothing in your browser. Fonts are served from the same origin, there is no analytics
              script, and no cookie banner is needed.
            </p>
          ),
        },
        {
          title: "What the policy covers",
          body: (
            <p>
              Quadrature&rsquo;s cookie policy explains what cookies are, why and how quadrature.ai uses them, the
              types it uses (strictly necessary, performance and functionality), how to manage or remove them, and
              how changes to the policy are made. It is read alongside Quadrature&rsquo;s privacy notice.
            </p>
          ),
        },
      ]}
    />
  );
}
