import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        {
            title: 'PLANNING',
            titleKr: '사업안내',
            submenu: [
                { name: '사업개요', path: '/planning' },
                { name: '브랜드 소개', path: '/brand' },
            ]
        },
        {
            title: 'RESIDENCE',
            titleKr: '주거공간',
            submenu: [
                { name: '한강뷰', path: '/view' },
                { name: '인테리어', path: '/interior' },
                { name: '어메니티', path: '/amenity' },
            ]
        },
        {
            title: 'LOCATION',
            titleKr: '입지환경',
            submenu: [
                { name: '위치안내', path: '/location' },
            ]
        },
        {
            title: 'CONTACT',
            titleKr: '상담문의',
            submenu: [
                { name: '방문예약', path: '/contact' },
            ]
        },
    ];

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="nav">
                <Link to="/" className="logo">
                    <span className="logo-main">LA VIE:UM</span>
                    <span className="logo-sub">HAN RIVER</span>
                </Link>

                <ul className="nav-menu">
                    {menuItems.map((item, index) => (
                        <li key={index} className="nav-item">
                            <span className="nav-title">
                                <span className="nav-title-en">{item.title}</span>
                                <span className="nav-title-kr">{item.titleKr}</span>
                            </span>
                            <ul className="nav-submenu">
                                {item.submenu.map((sub, subIndex) => (
                                    <li key={subIndex}>
                                        <Link
                                            to={sub.path}
                                            className={location.pathname === sub.path ? 'active' : ''}
                                        >
                                            {sub.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                <div className="nav-right">
                    <a href="tel:1533-1195" className="phone-btn">
                        <span>☎</span> 1533-1195
                    </a>
                    <button
                        className="mobile-menu-btn"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                {menuItems.map((item, index) => (
                    <div key={index} className="mobile-menu-section">
                        <h3>{item.title}</h3>
                        {item.submenu.map((sub, subIndex) => (
                            <Link
                                key={subIndex}
                                to={sub.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {sub.name}
                            </Link>
                        ))}
                    </div>
                ))}
            </div>
        </header>
    );
};

export default Header;
