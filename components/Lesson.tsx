import { ReactNode } from "react";

type LessonProps = {
  id?: string;
  number: string;
  title: string;
  terms?: string;
  children: ReactNode;
};

export default function Lesson({ id, number, title, terms, children }: LessonProps) {
  return (
    <article className="lesson" id={id}>
      <div className="lesson-head">
        <span className="lesson-no">{number}</span>
        <div>
          <h3>{title}</h3>
          {terms && <div className="terms">{terms}</div>}
        </div>
      </div>
      {children}
    </article>
  );
}
