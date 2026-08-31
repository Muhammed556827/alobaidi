import SectionPage from "@/components/site/SectionPage";
import Gallery from "@/components/gallery/Gallery";

export const metadata = {
  title: "Gallery | Alobaidi Group Painting",
  description: "Browse completed painting projects from Alobaidi Group Painting.",
};

export default function GalleryPage() {
  return (
    <SectionPage>
      <Gallery />
    </SectionPage>
  );
}
