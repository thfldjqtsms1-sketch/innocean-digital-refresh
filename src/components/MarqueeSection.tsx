import { motion } from 'framer-motion';

const MarqueeSection = () => {
  const brands = [
    "현대", "기아", "제네시스", "카카오", "삼성", "LG", "SK", "CJ", "네이버", "쿠팡"
  ];

  return (
    <section className="py-16 overflow-hidden border-y border-border/30">
      <div className="relative">
        {/* First Row */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((brand, index) => (
            <span
              key={index}
              className="mx-12 text-4xl md:text-5xl lg:text-6xl font-bold text-muted/30 hover:text-primary/50 transition-colors cursor-default font-korean"
            >
              {brand}
            </span>
          ))}
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default MarqueeSection;
