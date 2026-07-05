export type NavItem = {
  href: string;
  kanji: string;
  label: string;
};

export const navigation: NavItem[] = [
  { href: "/filosofiya", kanji: "心", label: "1 · Философия" },
  { href: "/shest-stolpov", kanji: "六", label: "Шесть столпов" },
  { href: "/kamen", kanji: "石", label: "2 · Камень" },
  { href: "/voda", kanji: "水", label: "3 · Вода" },
  { href: "/rasteniya", kanji: "木", label: "4 · Растения и мох" },
  { href: "/paletta-severa", kanji: "植", label: "Палитра севера" },
  { href: "/detali", kanji: "灯", label: "5 · Детали и МАФ" },
  { href: "/archicad", kanji: "図", label: "6 · Archicad + Enscape" },
  { href: "/rekomendacii", kanji: "道", label: "Рекомендации" },
  { href: "/process", kanji: "順", label: "Процесс проекта" },
];
