import type { Metadata } from "next";
import RailNav from "@/components/RailNav";
import PageNav from "@/components/PageNav";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Японский сад — краткий курс: рекомендации и принципы",
  description:
    "Курс от философии созерцания к рабочему проекту японского сада для ландшафтных дизайнеров",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" data-scroll-behavior="smooth">
      <body>
        <RailNav />
        {children}
        <PageNav />
      </body>
    </html>
  );
}
