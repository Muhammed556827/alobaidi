import type { ReactNode } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

type Props = {
  children: ReactNode;
};

export default function SectionPage({ children }: Props) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAFAFA]">
      <Navbar />
      <div className="pt-18 sm:pt-20">{children}</div>
      <Footer />
    </main>
  );
}
