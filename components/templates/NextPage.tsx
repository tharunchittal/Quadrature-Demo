import Link from "next/link";
import Footer from "@/components/system/Footer";
import { nextAfter } from "@/components/system/site";

/** The close of every sub-page: the next page in reading order at poster size, then the footer. */
export default function NextPage({ current }: { current: string }) {
  const next = nextAfter(current);
  return (
    <>
      <nav className="next-page" aria-label="Next page">
        <span className="mono dim">Next</span>
        <Link href={next.href} className="next-link display" data-reveal>
          <span>{next.label}</span>
          <span className="next-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </nav>
      <Footer />
    </>
  );
}
