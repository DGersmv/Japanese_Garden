"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/data/navigation";

export default function RailNav() {
  const pathname = usePathname();

  return (
    <aside className="rail">
      <Link className="brand" href="/">
        <span className="hanko" aria-hidden="true">
          庭
        </span>
        <span className="brand-name">
          Японский сад
          <small>краткий курс · рекомендации и принципы</small>
        </span>
      </Link>
      <nav aria-label="Модули курса">
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={pathname === item.href ? "active" : undefined}
          >
            <span className="kj">{item.kanji}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="foot">
        6 модулей · 18 уроков
        <br />
        + раздел «Шесть столпов»
        <br />
        для ландшафтных дизайнеров,
        <br />
        начинающих с нуля
      </div>
    </aside>
  );
}
