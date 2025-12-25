import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-50" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      <div className="container mx-auto px-6 lg:px-12 pt-32 pb-20 relative z-10">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-20">
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-muted-foreground text-lg mb-6"
            >
              브랜드 경험 디자인 스튜디오
            </motion.p>
            
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 font-korean"
            >
              새로운 경험을 설계하고
              <br />
              <span className="text-primary neon-text">브랜드의 가능성</span>을
              <br />
              바꿉니다.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="#work"
                className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:gap-5 transition-all duration-300 group glow"
              >
                프로젝트 보기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Featured Work Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[45%] relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/40" />
              <div className="absolute inset-0 flex items-end p-8">
                <div className="relative">
                  <div className="w-32 h-40 relative">
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-2 bg-background/80 rounded-full blur-sm" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-32 bg-background/20 backdrop-blur-sm rounded-t-full" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-8 left-8 text-background">
                <p className="text-sm font-medium opacity-70">카카오</p>
                <p className="text-lg font-bold">새로운 연결의 시작</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Big Logo */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          <h2 className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-black tracking-tighter leading-none">
            <span className="text-foreground">MO</span>
            <span className="text-primary">TIF</span>
          </h2>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">스크롤</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown className="w-5 h-5 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
