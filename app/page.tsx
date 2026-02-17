import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Pricing from "@/components/Pricing";
import BlogPreview from "@/components/BlogPreview";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <Services />
      <Pricing />
      <BlogPreview />
    </div>
  );
}
