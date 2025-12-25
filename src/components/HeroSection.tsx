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
              Creative Experience Company
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
                View Our Work
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
                <p className="text-sm font-medium opacity-70">NAVER</p>
                <p className="text-lg font-bold">네이버에서 스포티파이를</p>
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
          <svg
            viewBox="0 0 1840 263"
            className="w-full h-auto"
            fill="currentColor"
          >
            <path d="M65.5425 259.001H0V3.00079H65.5425V259.001Z" />
            <path d="M162.353 259.001H99.817V3.00079H156.34L256.758 168.259L253.752 3.00079H316.889V259.001H259.765L159.948 107.564L162.353 259.001Z" />
            <path d="M419.111 259.001H355.974V3.00079H412.497L512.915 168.259L510.51 3.00079H573.647V259.001H516.523L416.105 107.564L419.111 259.001Z" />
            <path d="M1328.89 259.001H1185.78V3.00079H1328.89V63.6956H1248.92V102.757H1326.48V161.048H1248.92V202.513H1328.89V259.001Z" />
            <path d="M1530.33 259.001L1517.7 225.949H1428.1L1414.27 259.001H1343.32L1447.35 3.00079H1499.66L1601.88 259.001H1530.33ZM1473.8 86.5313L1446.75 173.667H1500.26L1473.8 86.5313Z" />
            <path d="M1685.46 259.001H1622.33V3.00079H1678.85L1779.87 168.259L1776.86 3.00079H1840V259.001H1782.88L1683.06 108.165L1685.46 259.001Z" />
            <path d="M736.601 262.006C698.118 262.006 666.248 253.592 640.392 227.752C614.536 202.513 601.307 171.264 601.307 133.405C601.307 95.5454 614.536 63.6956 640.392 38.4562C666.248 13.2168 698.719 -0.00390625 736.601 -0.00390625C775.085 -0.00390625 807.556 12.6158 834.013 38.4562C860.471 64.2966 873.699 95.5454 873.699 132.804C873.699 170.062 860.471 201.311 834.013 227.151C807.556 253.592 775.085 262.006 736.601 262.006ZM737.203 58.2872C716.758 58.2872 700.523 65.4985 686.693 79.921C673.464 94.3435 666.85 111.771 666.85 132.804C666.85 154.437 673.464 172.466 687.294 186.888C701.124 201.311 717.961 208.522 738.405 208.522C758.248 208.522 774.484 201.311 787.712 186.888C800.941 172.466 807.556 155.038 807.556 134.005C807.556 112.372 800.941 94.9445 787.111 80.5219C773.882 65.4985 757.046 58.2872 737.203 58.2872Z" />
            <path d="M1030.64 209.423C1058.3 209.423 1078.75 195.602 1092.58 166.757H1161.73C1154.51 196.804 1138.88 221.442 1114.82 239.47C1090.77 258.099 1063.11 262.907 1031.24 262.907C993.359 262.907 961.49 253.893 935.033 228.052C908.575 202.212 895.346 170.963 895.346 133.705C895.346 96.4468 908.575 65.198 934.431 39.9585C960.288 14.7191 992.758 1.49844 1030.64 1.49844C1080.55 1.49844 1119.03 21.9304 1144.89 63.3952C1153.91 77.2168 1159.32 91.0383 1161.73 104.259H1092.58C1087.76 90.4374 1079.35 79.6205 1067.92 71.8083C1056.5 63.9961 1043.87 59.7895 1030.04 59.7895C1010.2 59.7895 993.961 67.0008 980.732 81.4233C967.503 95.8459 960.889 113.273 960.889 134.306C960.889 155.339 967.503 173.367 980.732 187.79C994.562 202.212 1010.8 209.423 1030.64 209.423Z" />
          </svg>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
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
