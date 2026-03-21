import ScrollReveal from "./ScrollReveal";
import type { AboutData } from "@/lib/cms";

type Props = { about: AboutData };

const AboutSection = ({ about }: Props) => (
  <section id="sobre" className="section-padding bg-background">
    <div className="container-main">
      <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-center">
        <ScrollReveal className="md:col-span-2">
          <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
            <img
              src={about.imageUrl ?? "/images/about-community.jpg"}
              alt={about.imageAlt ?? "Comunidade AWS reunida"}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal className="md:col-span-3" delay={100}>
          <p className="section-subtitle">SOBRE O EVENTO</p>
          <h2 className="section-title">AWS Community Day Norte 2026</h2>
          <div className="space-y-4 text-aws-gray leading-[1.7]">
            {about.paragraph1 && <p>{about.paragraph1}</p>}
            {about.paragraph2 && <p>{about.paragraph2}</p>}
            {about.paragraph3 && <p>{about.paragraph3}</p>}
          </div>
        </ScrollReveal>
      </div>
    </div>
  </section>
);

export default AboutSection;
