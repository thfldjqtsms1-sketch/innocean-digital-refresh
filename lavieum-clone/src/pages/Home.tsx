import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Home.css';

const Home = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: true,
            easing: 'ease-out-cubic',
        });
    }, []);

    return (
        <main className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <video
                        className="hero-video"
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/hero-bg.jpg"
                    >
                        <source src="/hero-video.mp4" type="video/mp4" />
                    </video>
                    <div className="hero-overlay"></div>
                </div>

                <div className="hero-content" data-aos="fade-up" data-aos-delay="300">
                    <p className="hero-subtitle">HERITAGE OF CRAFTSMANSHIP</p>
                    <h1 className="hero-title">
                        REFINED<br />
                        RESIDENTIAL<br />
                        ART OF<br />
                        FUNCTION<br />
                        AND EMOTION
                    </h1>
                    <div className="hero-line"></div>
                    <p className="hero-korean">마포 합정역, 한강 LIFE의 시작</p>
                </div>

                <div className="hero-scroll">
                    <span>SCROLL</span>
                    <div className="scroll-indicator"></div>
                </div>

                <div className="hero-skip">
                    <button>skip</button>
                </div>
            </section>

            {/* Brand Intro */}
            <section className="brand-intro">
                <div className="brand-marquee">
                    <div className="marquee-track">
                        <span>BECOME THE LA VIE:UM HAN RIVER</span>
                        <span>BECOME THE LA VIE:UM HAN RIVER</span>
                        <span>BECOME THE LA VIE:UM HAN RIVER</span>
                    </div>
                </div>
            </section>

            {/* Limited Fine Dwelling */}
            <section className="limited-section">
                <div className="section-container">
                    <div className="limited-header" data-aos="fade-up">
                        <h2 className="section-title-en">LIMITED FINE DWELLING</h2>
                        <div className="title-divider"></div>
                    </div>

                    <div className="limited-content">
                        <div className="limited-left" data-aos="fade-right" data-aos-delay="200">
                            <h3 className="limited-title-kr">
                                한강에 없던<br />
                                지금, 이곳, 이 자리
                            </h3>
                            <p className="limited-subtitle-en">The Only One Han River</p>
                        </div>
                        <div className="limited-right" data-aos="fade-left" data-aos-delay="400">
                            <p className="limited-desc">
                                가장 눈부시게 빛나는 새로운 서울에서<br />
                                예술처럼 승화된 인생의 기대와 마주한다<br /><br />
                                그리고 매일 영감으로 가득한 우아한 공간의 품격을 누리며<br />
                                일상의 아름다움을 조용하게 그려간다
                            </p>
                        </div>
                    </div>

                    <div className="limited-cards">
                        <div className="limited-card" data-aos="fade-up" data-aos-delay="100">
                            <span className="card-label">LIMITED</span>
                            <p className="card-desc">한정적, 절대적 가치</p>
                        </div>
                        <div className="card-divider" data-aos="fade-up" data-aos-delay="200"></div>
                        <div className="limited-card" data-aos="fade-up" data-aos-delay="300">
                            <span className="card-label">FINE</span>
                            <p className="card-desc">정교한 주거의 예술</p>
                        </div>
                        <div className="card-divider" data-aos="fade-up" data-aos-delay="400"></div>
                        <div className="limited-card" data-aos="fade-up" data-aos-delay="500">
                            <span className="card-label">DWELLING</span>
                            <p className="card-desc">삶의 본질을 담은 공간</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Han River View Section */}
            <section className="hanriver-section">
                <div className="hanriver-bg"></div>
                <div className="hanriver-content" data-aos="fade-up">
                    <p className="hanriver-subtitle">HAN RIVER, ITS ARTISTIC PANORAMIC VIEW</p>
                    <h2 className="hanriver-title">
                        한강,<br />
                        그 예술적<br />
                        파노라마뷰
                    </h2>
                    <div className="hanriver-features">
                        <div className="feature-box" data-aos="fade-up" data-aos-delay="200">
                            <span className="feature-label">SUNRISE</span>
                            <p className="feature-text">아침의 신비로운 한강</p>
                        </div>
                        <div className="feature-box" data-aos="fade-up" data-aos-delay="400">
                            <span className="feature-label">SUNSET</span>
                            <p className="feature-text">황혼의 낭만적인 한강</p>
                        </div>
                    </div>
                    <Link to="/view" className="hanriver-cta">VIEW MORE</Link>
                </div>
            </section>

            {/* Location Teaser */}
            <section className="location-teaser">
                <div className="section-container">
                    <div className="location-header" data-aos="fade-up">
                        <p className="location-subtitle">HAN RIVER, THE BEST CENTER</p>
                        <h2 className="location-title">
                            합정역 도보 2분<br />
                            초역세권의 프리미엄
                        </h2>
                    </div>
                    <div className="location-highlights">
                        <div className="highlight-item" data-aos="fade-up" data-aos-delay="100">
                            <div className="highlight-icon">🚇</div>
                            <h4>초역세권</h4>
                            <p>합정역 도보 2분거리</p>
                        </div>
                        <div className="highlight-item" data-aos="fade-up" data-aos-delay="200">
                            <div className="highlight-icon">🌊</div>
                            <h4>한강 문화권역</h4>
                            <p>화려한 한강 문화의 중심</p>
                        </div>
                        <div className="highlight-item" data-aos="fade-up" data-aos-delay="300">
                            <div className="highlight-icon">🏙️</div>
                            <h4>편리한 교통</h4>
                            <p>서울 도심 편리한 접근성</p>
                        </div>
                        <div className="highlight-item" data-aos="fade-up" data-aos-delay="400">
                            <div className="highlight-icon">✨</div>
                            <h4>K-컬처 라이프</h4>
                            <p>세계적 문화의 집결지</p>
                        </div>
                    </div>
                    <Link to="/location" className="location-cta" data-aos="fade-up" data-aos-delay="500">
                        위치 상세보기
                    </Link>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-bg"></div>
                <div className="cta-content" data-aos="fade-up">
                    <p className="cta-subtitle">THE COMPLETION OF LIFE</p>
                    <h2 className="cta-title">
                        한강을 품은<br />
                        LIMITED FINE DWELLING
                    </h2>
                    <p className="cta-brand">LA VIE:UM HANGANG</p>
                    <Link to="/contact" className="cta-button">상담 예약하기</Link>
                </div>
            </section>
        </main>
    );
};

export default Home;
