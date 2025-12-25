import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-surface-dark" />
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-30" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div ref={headerRef}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium mb-4"
            >
              문의하기
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-korean"
            >
              함께하세요.
              <br />
              <span className="text-primary neon-text">브랜드 경험</span>이 달라지면
              <br />
              모든 것이 달라집니다.
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <span className="font-korean">서울시 강남구 테헤란로 152 강남파이낸스센터</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <span>+82-2-1234-5678</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <span>hello@motif.kr</span>
              </div>
            </motion.div>
          </div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-10 rounded-3xl glass"
          >
            <h3 className="text-2xl font-bold mb-8 font-korean">프로젝트 문의</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block font-korean">이름</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="홍길동"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block font-korean">연락처</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block font-korean">이메일</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="example@company.com"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block font-korean">회사명</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors"
                  placeholder="회사명을 입력해주세요"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block font-korean">프로젝트 내용</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 bg-background/50 border border-border rounded-xl focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="프로젝트에 대해 알려주세요..."
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-all duration-300 group glow font-korean"
              >
                문의 보내기
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
