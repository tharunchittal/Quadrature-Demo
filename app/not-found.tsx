import Button from "@/components/system/Button";
import Footer from "@/components/system/Footer";

export default function NotFound() {
  return (
    <main data-scene="flat" className="page" id="content">
      <header className="page-hero">
        <p className="mono dim">Error 404 · 0b110010100</p>
        <h1 className="display page-title">Not found</h1>
        <div className="page-hero-foot">
          <p className="page-lede">This page doesn&rsquo;t exist. The integral of nothing is zero.</p>
          <div className="page-aside">
            <Button href="/">Back to the start</Button>
          </div>
        </div>
      </header>
      <Footer />
    </main>
  );
}
