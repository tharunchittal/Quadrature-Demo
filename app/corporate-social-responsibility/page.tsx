import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = { title: "Corporate social responsibility · Quadrature concept demo" };

export default function CsrPage() {
  return (
    <LegalPage
      path="/corporate-social-responsibility"
      title="Responsibility"
      lede="Our processes, policies and actions should be aligned with the values and ethics we live by. We share what we do to be transparent, not to promote it."
      source="https://www.quadrature.ai/corporate-social-responsibility/"
      sourceNote="This demo summarises Quadrature’s corporate social responsibility statement. Read the full statement on quadrature.ai."
      sections={[
        {
          title: "Giving",
          body: (
            <>
              <p>
                Our founders, Greg Skinner and Suneil Setiya, are passionate about supporting causes that address
                three challenges: poverty, inequality and human suffering.
              </p>
              <p>
                Quadrature Charitable Foundation (QCF) was established in 2019 and is fully funded by the Quadrature
                Group through a proportion of trading profits. It operates as an independent charity governed by
                The Charity Commission. Beyond QCF, global partners have included Norwegian Refugee Council, UNICEF
                UK, International Medical Corps UK, The Access Project, Teach First, St Giles Trust and Clement
                James.
              </p>
            </>
          ),
        },
        {
          title: "Tax",
          body: (
            <p>
              Quadrature Capital Limited is the UK-based investment manager for the Group&rsquo;s trading vehicles,
              which are based in the Cayman Islands. Because the vehicles have been managed from the UK, their
              trading profits have been subject to UK corporation tax. The Group is a major UK taxpayer, with
              payments to date in excess of £5bn, and sets out its approach in its Tax Strategy.
            </p>
          ),
        },
        {
          title: "Data centres",
          body: (
            <p>
              Complex models and large-scale data mean growing demand for compute. Quadrature intends to offset all
              of its emissions, and moved the vast majority of its capacity to a site in Norway with multiple
              independent feeds from a nearby hydroelectric plant, so the energy consumed is drawn directly from a
              renewable source.
            </p>
          ),
        },
        {
          title: "Trading and climate",
          body: (
            <p>
              Quadrature applies market neutral strategies, targeting neutral exposures across markets and
              industry groups. It trades only in public markets, holds long and short positions in oil and gas
              stocks concurrently and for short periods, and directs climate impact through QCF rather than through
              exclusions.
            </p>
          ),
        },
        {
          title: "Workplace",
          body: (
            <p>
              Employees are offered an ethical pension fund with Aviva&rsquo;s Stewardship Life Fund. Offices are
              designed with carefully sourced, natural and non-combustible materials; food is sourced locally where
              possible; deliveries are bundled; waste is sorted for recycling; and the office is paperless by
              default.
            </p>
          ),
        },
        {
          title: "Diversity and inclusion",
          body: (
            <p>
              Diversity creates more varied approaches in teams. Quadrature hires from different backgrounds for
              work placements, internships and permanent roles, runs outreach for groups under-represented in
              finance and technology, seeks feedback on what it is like to work there, and trains managers to build
              healthy, trusting teams.
            </p>
          ),
        },
        {
          title: "Modern slavery",
          body: (
            <p>
              Quadrature takes a zero-tolerance approach to slavery and human trafficking in any form, within its
              business and its supply chain, and expects suppliers and service providers to meet the same
              standard.
            </p>
          ),
        },
      ]}
    />
  );
}
