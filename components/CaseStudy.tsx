import { ReactNode } from "react";

type CaseStudyProps = {
  kanji: string;
  title: string;
  dimension: string;
  strategy: ReactNode;
  items: ReactNode[];
  error: ReactNode;
};

export default function CaseStudy({
  kanji,
  title,
  dimension,
  strategy,
  items,
  error,
}: CaseStudyProps) {
  return (
    <article className="case">
      <div className="case-head">
        <span className="cj">{kanji}</span>
        <h4>{title}</h4>
        <span className="dim">{dimension}</span>
      </div>
      <div className="case-body">
        <p className="strategy">{strategy}</p>
        <ul>
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
        <div className="err">{error}</div>
      </div>
    </article>
  );
}
