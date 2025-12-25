import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

const locations = [
  { city: "서울", country: "대한민국", type: "본사" },
  { city: "부산", country: "대한민국", type: "지사" },
  { city: "대전", country: "대한민국", type: "지사" },
  { city: "광주", country: "대한민국", type: "지사" },
  { city: "대구", country: "대한민국", type: "지사" },
  { city: "제주", country: "대한민국", type: "지사" },
];

const GlobalSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="values" className="py-32 relative overflow-hidden">
      {/* Background World Map Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 1000 500"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <pattern id="dots" patternUnits="userSpaceOnUse" width="20" height="20">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium mb-4 font-korean"
          >
            전국 네트워크
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-korean"
          >
            대한민국 어디서나
            <br />
            <span className="text-primary neon-text">브랜드의 가능성</span>을 실현합니다.
          </motion.h2>
        </div>

        {/* Location Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-16">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group"
            >
              <div className="p-6 rounded-2xl glass hover:border-primary/50 transition-all duration-300 text-center card-hover">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-1 font-korean">{location.city}</h3>
                <p className="text-sm text-muted-foreground font-korean">{location.country}</p>
                <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-korean">
                  {location.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:gap-5 transition-all duration-300 group glow font-korean"
          >
            네트워크 보기
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalSection;
