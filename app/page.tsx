import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { Manifesto } from '@/components/sections/manifesto';
import { Capabilities } from '@/components/sections/capabilities';
import { AIEmployees } from '@/components/sections/ai-employees';
import { Workflows } from '@/components/sections/workflows';
import { BusinessSystems } from '@/components/sections/business-systems';
import { Industries } from '@/components/sections/industries';
import { Approach } from '@/components/sections/approach';
import { Principles } from '@/components/sections/principles';
import { Origin } from '@/components/sections/origin';
import { FAQ } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Manifesto />
        <Capabilities />
        <AIEmployees />
        <Workflows />
        <BusinessSystems />
        <Industries />
        <Approach />
        <Principles />
        <Origin />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
