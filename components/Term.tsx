import { glossary, type GlossaryId } from "@/data/glossary";

type TermProps = {
  id: GlossaryId;
  /** Полное пояснение при первом введении термина */
  intro?: boolean;
};

export default function Term({ id, intro }: TermProps) {
  const term = glossary[id];

  if (intro) {
    return (
      <>
        <b>{term.label}</b> (букв. — «{term.literal}») — {term.intro}
      </>
    );
  }

  return (
    <>
      <b>{term.label}</b>
      <span className="term-gloss">
        {" "}
        («{term.literal}» — {term.hint})
      </span>
    </>
  );
}
