import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Lightbulb, TrendingUp, Palette, Megaphone } from 'lucide-react';

const services = [
  {
    icon: Lightbulb,
    title: "브랜드 전략",
    description: "데이터 기반의 브랜드 전략으로 시장을 선도합니다.",
    color: "from-yellow-500/20 to-orange-500/20",
  },
  {
    icon: Palette,
    title: "크리에이티브 디자인",
    description: "혁신적인 크리에이티브로 브랜드 경험을 설계합니다.",
    color: "from-pink-500/20 to-purple-500/20",
  },
  {
    icon: Megaphone,
    title: "디지털 마케팅",
    description: "디지털 채널을 통한 통합 마케팅 캠페인을 진행합니다.",
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: TrendingUp,
    title: "데이터 분석",
    description: "빅데이터 분석으로 마케팅 효과를 극대화합니다.",
    color: "from-green-500/20 to-emerald-500/20",
  },
];

const ExpertiseSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="expertise" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-dark" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={headerRef}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium mb-4 font-korean"
            >
              비즈니스 솔루션
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-korean"
            >
              방대한 데이터와 기술,
              <br />
              생각하지 못한
              <br />
              <span className="text-primary neon-text">크리에이티브</span>로
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted-foreground text-lg mb-8 max-w-md font-korean"
            >
              새로운 브랜드 경험을 만듭니다. 고객의 비즈니스 목표 달성을 위해 전략부터 실행까지 원스톱 솔루션을 제공합니다.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              href="#"
              className="inline-flex items-center gap-3 text-primary font-semibold hover:gap-5 transition-all duration-300 group font-korean"
            >
              자세히 보기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {/* Right - Service Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <div className={`p-6 md:p-8 rounded-2xl bg-gradient-to-br ${service.color} border border-border/50 hover:border-primary/50 transition-all duration-500 card-hover h-full`}>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-korean">{service.title}</h3>
                    <p className="text-muted-foreground font-korean">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
