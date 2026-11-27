import Scramble from "@/components/ui/Scramble";

type Props = { num: string; title: string; note?: string };

/** Full-width rule that draws in, number at left, scrambled title centred, a short note at right. */
export default function SectionHead({ num, title, note }: Props) {
  return (
    <div className="section-head">
      <span className="rule" data-reveal aria-hidden="true" />
      <div className="section-head-row">
        <span className="mono dim">§ {num}</span>
        <Scramble as="h2" className="section-title display" text={title} />
        <span className="mono dim section-note">{note}</span>
      </div>
      <span className="rule" data-reveal style={{ ["--i" as string]: 1 }} aria-hidden="true" />
    </div>
  );
}
