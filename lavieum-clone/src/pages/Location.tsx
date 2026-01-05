import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Location.css';

const Location = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="location-page">
            <section className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="page-hero-content" data-aos="fade-up">
                    <p className="page-subtitle">LOCATION</p>
                    <h1 className="page-title">위치안내</h1>
                </div>
            </section>

            <section className="location-info">
                <div className="section-container">
                    <div className="location-main" data-aos="fade-up">
                        <p className="location-label">ADDRESS</p>
                        <h2 className="location-address">서울시 마포구 합정동</h2>
                        <p className="location-detail">합정역 도보 2분 초역세권</p>
                    </div>

                    <div className="location-features">
                        <div className="loc-feature" data-aos="fade-up" data-aos-delay="100">
                            <div className="loc-feature-icon">🚇</div>
                            <h3>합정역 도보 2분</h3>
                            <p>2호선, 6호선 더블 역세권</p>
                        </div>
                        <div className="loc-feature" data-aos="fade-up" data-aos-delay="200">
                            <div className="loc-feature-icon">🌊</div>
                            <h3>한강 문화권역</h3>
                            <p>망원한강공원 인접</p>
                        </div>
                        <div className="loc-feature" data-aos="fade-up" data-aos-delay="300">
                            <div className="loc-feature-icon">🏙️</div>
                            <h3>서울 중심 입지</h3>
                            <p>여의도, 강남, 홍대 접근 용이</p>
                        </div>
                        <div className="loc-feature" data-aos="fade-up" data-aos-delay="400">
                            <div className="loc-feature-icon">✨</div>
                            <h3>K-컬처 성지</h3>
                            <p>상수동, 연남동 문화거리</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="map-section">
                <div className="map-placeholder">
                    <p>지도 영역</p>
                    <span>서울시 마포구 합정동</span>
                </div>
            </section>
        </main>
    );
};

export default Location;
