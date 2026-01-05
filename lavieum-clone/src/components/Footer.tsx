import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-container">
                    <div className="footer-brand">
                        <Link to="/" className="footer-logo">
                            <span className="footer-logo-main">LA VIE:UM</span>
                            <span className="footer-logo-sub">HAN RIVER</span>
                        </Link>
                        <p className="footer-tagline">한강을 품은 LIMITED FINE DWELLING</p>
                    </div>

                    <div className="footer-links">
                        <div className="footer-col">
                            <h4>PLANNING</h4>
                            <Link to="/planning">사업개요</Link>
                            <Link to="/brand">브랜드 소개</Link>
                        </div>
                        <div className="footer-col">
                            <h4>RESIDENCE</h4>
                            <Link to="/view">한강뷰</Link>
                            <Link to="/interior">인테리어</Link>
                            <Link to="/amenity">어메니티</Link>
                        </div>
                        <div className="footer-col">
                            <h4>CONTACT</h4>
                            <Link to="/location">위치안내</Link>
                            <Link to="/contact">방문예약</Link>
                        </div>
                    </div>

                    <div className="footer-contact">
                        <p className="contact-label">상담문의</p>
                        <a href="tel:1533-1195" className="contact-phone">1533-1195</a>
                        <p className="contact-address">서울시 마포구 합정동</p>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-container">
                    <p className="copyright">
                        © 2024 LA VIE:UM HANGANG. All rights reserved.
                    </p>
                    <p className="disclaimer">
                        본 사이트는 학습/참고 목적으로 제작된 클론 사이트입니다.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
