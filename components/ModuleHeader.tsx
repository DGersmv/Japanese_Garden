import { ReactNode } from "react";

type ModuleHeaderProps = {
  kanji: string;
  label: string;
  title: string;
  intro: string;
  children?: ReactNode;
};

export default function ModuleHeader({
  kanji,
  label,
  title,
  intro,
  children,
}: ModuleHeaderProps) {
  return (
    <div className="mod-head">
      <div className="mod-spine" aria-hidden="true">
        {kanji}
      </div>
      <div>
        <div className="mod-label">{label}</div>
        <h2>{title}</h2>
        <p className="mod-intro">{intro}</p>
        {children}
      </div>
    </div>
  );
}
