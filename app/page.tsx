import { LenisProvider } from "@/components/LenisProvider";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Manifesto } from "@/components/Manifesto";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Process } from "@/components/Process";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <LenisProvider>
      <main className="relative bg-momentum-void text-momentum-chalk">
        <Nav />
        <Hero />
        <About />
        <Manifesto />
        <Services />
        <Work />
        <Process />
        <CTA />
        <Footer />
      </main>
    </LenisProvider>
  );
}
