import { ReactNode } from "react";

type DeepDiveProps = {
  summary: string;
  children: ReactNode;
};

export default function DeepDive({ summary, children }: DeepDiveProps) {
  return (
    <details className="deep">
      <summary>{summary}</summary>
      <div className="deep-body">{children}</div>
    </details>
  );
}

type DeepStepProps = {
  label: string;
  title: string;
  children: ReactNode;
};

export function DeepStep({ label, title, children }: DeepStepProps) {
  return (
    <div className="step">
      <b>
        <span>{label}</span>
        {title}
      </b>
      {children}
    </div>
  );
}
