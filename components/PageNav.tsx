"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCourseNeighbors } from "@/data/course-flow";

export default function PageNav() {
  const pathname = usePathname();
  const { prev, next } = getCourseNeighbors(pathname);

  if (pathname === "/") {
    if (!next) return null;

    return (
      <nav className="page-nav page-nav--home" aria-label="Начать курс">
        <div className="inner">
          <Link className="page-nav-start" href={next.href}>
            <span className="page-nav-start-label">НАЧНЕМ</span>
            <span className="page-nav-start-next">
              {next.kanji && <span className="kj">{next.kanji}</span>}
              {next.label}
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </nav>
    );
  }

  if (!prev && !next) return null;

  return (
    <nav className="page-nav" aria-label="Навигация по курсу">
      <div className="inner page-nav-row">
        {prev ? (
          <Link className="page-nav-link page-nav-prev" href={prev.href}>
            <span className="page-nav-arrow" aria-hidden="true">
              ←
            </span>
            <span className="page-nav-text">
              {prev.kanji && <span className="kj">{prev.kanji}</span>}
              {prev.label}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="page-nav-link page-nav-next" href={next.href}>
            <span className="page-nav-text">
              {next.kanji && <span className="kj">{next.kanji}</span>}
              {next.label}
            </span>
            <span className="page-nav-arrow" aria-hidden="true">
              →
            </span>
          </Link>
        ) : (
          <span />
        )}
      </div>
    </nav>
  );
}
