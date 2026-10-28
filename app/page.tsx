import { JsonLd } from '@/components/seo/json-ld';
import { site } from '@/lib/content';
import { faqJsonLd, organizationJsonLd, webPageJsonLd } from '@/lib/seo';
import { Navbar } from '@/components/sections/navbar';
import { Hero } from '@/components/sections/hero';
import { WhoWeAre } from '@/components/sections/who-we-are';
import { WorksWith } from '@/components/sections/works-with';
import { Capabilities } from '@/components/sections/capabilities';
import { Work } from '@/components/sections/work';
import { Products } from '@/components/sections/products';
import { CoreServices } from '@/components/sections/core-services';
import { Industries } from '@/components/sections/industries';
import { Testimonials } from '@/components/sections/testimonials';
import { Principles } from '@/components/sections/principles';
import { Approach } from '@/components/sections/approach';
import { FAQ } from '@/components/sections/faq';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          webPageJsonLd({
            name: 'Agentiq BD — AI Agents, Automation & Software in Bangladesh',
            description: site.description,
            path: '/',
          }),
          faqJsonLd(),
        ]}
      />
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <Capabilities />
        <WorksWith />
        <Work />
        <Products />
        <CoreServices />
        <Industries />
        <Testimonials />
        <Principles />
        <Approach />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
