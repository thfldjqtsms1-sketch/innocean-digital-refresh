import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, Globe } from 'lucide-react';

const navItems = [
  { label: '프로젝트', href: '#work' },
  { label: '서비스', href: '#expertise' },
  { label: '회사소개', href: '#about' },
  { label: '네트워크', href: '#values' },
  { label: '문의', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass py-4' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="text-2xl font-bold tracking-tight">
            <span className="text-foreground">MO</span>
            <span className="text-primary">TIF</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-300 line-decoration"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden lg:flex p-2 text-foreground/70 hover:text-primary transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden lg:flex p-2 text-foreground/70 hover:text-primary transition-colors">
              <Globe className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-foreground"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <div className="container mx-auto px-6 py-6 flex flex-col h-full">
              <div className="flex items-center justify-between">
                <a href="#" className="text-2xl font-bold tracking-tight">
                  <span className="text-foreground">MO</span>
                  <span className="text-primary">TIF</span>
                </a>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex flex-col justify-center flex-1 gap-8">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-4xl font-bold text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
