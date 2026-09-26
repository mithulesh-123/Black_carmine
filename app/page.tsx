import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { Technology } from "@/components/Technology";
import { Studio } from "@/components/Studio";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Marquee />
      <Services />
      <Work />
      <Process />
      <Technology />
      <Studio />
      <Contact />
    </main>
  );
}
