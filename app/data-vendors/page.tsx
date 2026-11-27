import type { Metadata } from "next";
import LegalPage from "@/components/templates/LegalPage";

export const metadata: Metadata = { title: "Data vendors · Quadrature concept demo" };

export default function DataVendorsPage() {
  return (
    <LegalPage
      path="/data-vendors"
      title="Data vendors"
      lede="We always welcome new sources of data, and would be keen to learn more if you have a dataset that could be useful for us."
      source="https://www.quadrature.ai/data-vendors/"
      sourceNote="Submissions go through the form on quadrature.ai. This demo lists what it asks so you can prepare."
      sections={[
        { title: "Your data", body: <p>A brief description of your data, with links to any additional content such as white papers or your website.</p> },
        { title: "Securities", body: <p>Which types of security the data is relevant to: bonds, equities, commodities or other. Whether it is linked to security identifiers: ISIN, SEDOL, CUSIP, ticker or other.</p> },
        { title: "Coverage", body: <p>Regions covered (EMEA, North America, South America, Asia Pacific), with country-level detail.</p> },
        { title: "History", body: <p>When the history starts, and whether it is point-in-time.</p> },
        { title: "Frequency", body: <p>How often the data is updated, from seconds to months, and the delay from source.</p> },
        { title: "Track record", body: <p>Whether you have worked with quantitative or discretionary funds before.</p> },
      ]}
    />
  );
}
