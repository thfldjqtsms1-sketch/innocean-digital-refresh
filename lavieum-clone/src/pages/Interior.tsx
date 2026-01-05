import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Interior.css';

const Interior = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="interior-page">
            <section className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="page-hero-content" data-aos="fade-up">
                    <p className="page-subtitle">INTERIOR</p>
                    <h1 className="page-title">인테리어</h1>
                </div>
            </section>

            <section className="interior-intro">
                <div className="section-container">
                    <div className="interior-intro-text" data-aos="fade-up">
                        <p className="interior-label">REFINED RESIDENTIAL ART</p>
                        <h2 className="interior-title">
                            기능과 감성의<br />
                            정제된 주거예술
                        </h2>
                        <p className="interior-desc">
                            섬세한 디테일과 고급 마감재가 만들어내는<br />
                            프리미엄 주거 공간
                        </p>
                    </div>
                </div>
            </section>

            <section className="interior-showcase">
                <div className="showcase-item" data-aos="fade-up">
                    <div className="showcase-image" data-cursor="VIEW">
                        <div className="image-placeholder">LIVING ROOM</div>
                    </div>
                    <div className="showcase-info">
                        <span className="showcase-label">LIVING</span>
                        <h3>거실</h3>
                        <p>
                            넓은 창을 통해 쏟아지는 자연광과<br />
                            한강의 아름다운 풍경이 어우러지는<br />
                            여유로운 거실 공간
                        </p>
                    </div>
                </div>

                <div className="showcase-item reverse" data-aos="fade-up">
                    <div className="showcase-image" data-cursor="VIEW">
                        <div className="image-placeholder">KITCHEN</div>
                    </div>
                    <div className="showcase-info">
                        <span className="showcase-label">KITCHEN</span>
                        <h3>주방</h3>
                        <p>
                            최신 빌트인 가전과<br />
                            프리미엄 마감재가 적용된<br />
                            효율적인 주방 공간
                        </p>
                    </div>
                </div>

                <div className="showcase-item" data-aos="fade-up">
                    <div className="showcase-image" data-cursor="VIEW">
                        <div className="image-placeholder">BEDROOM</div>
                    </div>
                    <div className="showcase-info">
                        <span className="showcase-label">BEDROOM</span>
                        <h3>침실</h3>
                        <p>
                            편안한 휴식을 위한<br />
                            프라이빗한 침실 공간
                        </p>
                    </div>
                </div>
            </section>

            <section className="materials-section">
                <div className="section-container">
                    <div className="materials-header" data-aos="fade-up">
                        <h2>PREMIUM MATERIALS</h2>
                        <div className="title-divider"></div>
                    </div>
                    <div className="materials-grid">
                        <div className="material-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="material-icon">🪨</div>
                            <h4>천연 대리석</h4>
                            <p>이탈리아산 고급 마감재</p>
                        </div>
                        <div className="material-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="material-icon">🚿</div>
                            <h4>프리미엄 욕실</h4>
                            <p>수입 욕실 브랜드</p>
                        </div>
                        <div className="material-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="material-icon">🍳</div>
                            <h4>빌트인 가전</h4>
                            <p>최신 스마트 가전</p>
                        </div>
                        <div className="material-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="material-icon">🪟</div>
                            <h4>시스템 창호</h4>
                            <p>고단열 하이퍼포먼스</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Interior;
