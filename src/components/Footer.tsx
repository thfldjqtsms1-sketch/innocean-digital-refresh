import { Instagram, Linkedin, Youtube, Twitter } from 'lucide-react';

const footerLinks = {
  company: [
    { label: '회사 소개', href: '#' },
    { label: '팀 소개', href: '#' },
    { label: '채용', href: '#' },
    { label: '뉴스', href: '#' },
  ],
  services: [
    { label: '브랜드 전략', href: '#' },
    { label: '크리에이티브 디자인', href: '#' },
    { label: '디지털 마케팅', href: '#' },
    { label: '데이터 분석', href: '#' },
  ],
  resources: [
    { label: '케이스 스터디', href: '#' },
    { label: '블로그', href: '#' },
    { label: '프레스킷', href: '#' },
    { label: '문의하기', href: '#' },
  ],
};

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const Footer = () => {
  return (
    <footer className="py-20 relative overflow-hidden border-t border-border/50">
      {/* Background */}
      <div className="absolute inset-0 bg-background" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="text-2xl font-bold tracking-tight inline-block mb-6">
              <span className="text-foreground">MO</span>
              <span className="text-primary">TIF</span>
            </a>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs font-korean">
              새로운 경험을 설계하고 브랜드의 가능성을 바꿉니다.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-6 font-korean">회사</h4>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-korean"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 font-korean">서비스</h4>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-korean"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 font-korean">자료</h4>
            <ul className="space-y-4">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm font-korean"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-korean">
            © 2024 MOTIF Creative. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-korean">
              개인정보처리방침
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-korean">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
