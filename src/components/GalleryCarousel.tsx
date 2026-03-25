import { useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import gallery01 from "@/assets/gallery/gallery-01.jpg";
import gallery02 from "@/assets/gallery/gallery-02.jpg";
import gallery03 from "@/assets/gallery/gallery-03.jpg";
import gallery04 from "@/assets/gallery/gallery-04.jpg";
import gallery05 from "@/assets/gallery/gallery-05.jpg";
import gallery06 from "@/assets/gallery/gallery-06.jpg";
import gallery07 from "@/assets/gallery/gallery-07.jpg";
import gallery08 from "@/assets/gallery/gallery-08.jpg";
import gallery09 from "@/assets/gallery/gallery-09.jpg";
import gallery10 from "@/assets/gallery/gallery-10.jpg";
import gallery11 from "@/assets/gallery/gallery-11.jpg";
import gallery12 from "@/assets/gallery/gallery-12.jpg";
import gallery13 from "@/assets/gallery/gallery-13.jpg";
import gallery14 from "@/assets/gallery/gallery-14.jpg";
import gallery15 from "@/assets/gallery/gallery-15.jpg";
import gallery16 from "@/assets/gallery/gallery-16.jpg";
import gallery17 from "@/assets/gallery/gallery-17.jpg";

const images = [gallery01, gallery02, gallery03, gallery04, gallery05, gallery06, gallery07, gallery08, gallery09, gallery10, gallery11, gallery12, gallery13, gallery14, gallery15, gallery16, gallery17];

const GalleryCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.5;

    const animate = () => {
      scrollPos += speed;
      // Reset when we've scrolled past the first set of images
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      scrollPos = el.scrollLeft;
      animationId = requestAnimationFrame(animate);
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicate images for seamless infinite scroll
  const allImages = [...images, ...images];

  return (
    <section className="py-16 overflow-hidden">
      <div className="container">
        <div
          ref={titleRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-sm font-semibold tracking-[0.3em] uppercase text-primary mb-3 font-display">
            Momentos
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground">
            Edições Anteriores
          </h2>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-hidden"
        style={{ scrollBehavior: "auto" }}
      >
        {allImages.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[300px] md:w-[400px] lg:w-[500px] aspect-[16/10] rounded-xl overflow-hidden"
          >
            <img
              src={img}
              alt={`AWS Community Day Brasil - Foto ${(i % images.length) + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default GalleryCarousel;
