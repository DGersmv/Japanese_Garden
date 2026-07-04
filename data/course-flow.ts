import { navigation } from "@/data/navigation";

export type CoursePage = {
  href: string;
  label: string;
  kanji?: string;
};

export const courseFlow: CoursePage[] = [
  { href: "/", label: "Главная" },
  ...navigation.map(({ href, kanji, label }) => ({ href, kanji, label })),
];

export function getCourseNeighbors(pathname: string): {
  prev: CoursePage | null;
  next: CoursePage | null;
} {
  const index = courseFlow.findIndex((page) => page.href === pathname);
  if (index === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: index > 0 ? courseFlow[index - 1] : null,
    next: index < courseFlow.length - 1 ? courseFlow[index + 1] : null,
  };
}
