import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
};

const StatItem = ({ value, suffix, label, delay }: StatItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="text-center p-6 md:p-8"
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
        <span className="text-gradient">
          <AnimatedCounter value={value} />
        </span>
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="text-muted-foreground font-medium font-korean">{label}</p>
    </motion.div>
  );
};

const stats = [
  { value: 150, suffix: "+", label: "완료 프로젝트" },
  { value: 50, suffix: "+", label: "클라이언트" },
  { value: 12, suffix: "년", label: "업력" },
  { value: 35, suffix: "+", label: "전문 인력" },
  { value: 98, suffix: "%", label: "고객 만족도" },
];

const StatsSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />
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
            회사 정보
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-korean"
          >
            브랜드를 성장시키는 힘
            <br />
            <span className="text-primary neon-text">숫자</span>로 증명합니다.
          </motion.h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <StatItem key={index} {...stat} delay={index * 0.1} />
          ))}
        </div>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        />
      </div>
    </section>
  );
};

export default StatsSection;
