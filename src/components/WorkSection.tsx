import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface WorkItemProps {
  title: string;
  client: string;
  category: string;
  color: string;
  index: number;
}

const WorkItem = ({ title, client, category, color, index }: WorkItemProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative"
    >
      <div 
        className="aspect-[4/3] rounded-2xl overflow-hidden card-hover cursor-pointer relative"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}80)` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-all duration-500" />
        
        {/* Content */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-xs md:text-sm font-medium text-background/70 uppercase tracking-wider">
              {category}
            </span>
            <div className="w-10 h-10 rounded-full bg-background/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowRight className="w-5 h-5 text-background" />
            </div>
          </div>
          <div>
            <p className="text-sm text-background/70 mb-2">{client}</p>
            <h3 className="text-xl md:text-2xl font-bold text-background">{title}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const works = [
  {
    title: "네이버에서 스포티파이를",
    client: "NAVER",
    category: "Campaign",
    color: "#22c55e",
  },
  {
    title: "Driving Innovation Forward",
    client: "Hyundai Motor",
    category: "Brand Experience",
    color: "#3b82f6",
  },
  {
    title: "The Art of Movement",
    client: "Genesis",
    category: "Digital Campaign",
    color: "#8b5cf6",
  },
  {
    title: "Urban Mobility Reimagined",
    client: "Kia",
    category: "Product Launch",
    color: "#f59e0b",
  },
  {
    title: "Connect Everything",
    client: "Samsung",
    category: "Integrated Campaign",
    color: "#ec4899",
  },
  {
    title: "Future of Entertainment",
    client: "LG Electronics",
    category: "Brand Strategy",
    color: "#06b6d4",
  },
];

const WorkSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="work" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-dark to-background" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium mb-4"
          >
            Featured Work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Our Latest
            <br />
            <span className="text-gradient">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-xl"
          >
            방대한 데이터와 기술, 생각하지 못한 크리에이티브로 새로운 브랜드 경험을 만듭니다.
          </motion.p>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {works.map((work, index) => (
            <WorkItem key={index} {...work} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 px-8 py-4 border border-foreground/20 text-foreground font-semibold rounded-full hover:bg-foreground hover:text-background transition-all duration-300 group"
          >
            View All Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
