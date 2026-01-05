import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './View.css';

const View = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="view-page">
            <section className="page-hero view-hero">
                <div className="page-hero-bg"></div>
                <div className="page-hero-content" data-aos="fade-up">
                    <p className="page-subtitle">HAN RIVER VIEW</p>
                    <h1 className="page-title">한강뷰</h1>
                </div>
            </section>

            <section className="view-intro">
                <div className="section-container">
                    <div className="view-intro-content" data-aos="fade-up">
                        <p className="view-label">HAN RIVER, ITS ARTISTIC PANORAMIC VIEW</p>
                        <h2 className="view-title">
                            한강,<br />
                            그 예술적 파노라마뷰
                        </h2>
                        <p className="view-desc">
                            일상에서 마주하는 한강의 풍경<br />
                            아침의 신비로운 물안개부터<br />
                            황혼의 낭만적인 노을까지<br />
                            매 순간이 예술이 됩니다.
                        </p>
                    </div>
                </div>
            </section>

            <section className="view-gallery">
                <div className="gallery-grid">
                    <div className="gallery-item large" data-aos="fade-up" data-cursor="SUNRISE">
                        <div className="gallery-overlay">
                            <span>SUNRISE</span>
                            <p>아침의 신비로운 한강</p>
                        </div>
                    </div>
                    <div className="gallery-item" data-aos="fade-up" data-aos-delay="100" data-cursor="DAYLIGHT">
                        <div className="gallery-overlay">
                            <span>DAYLIGHT</span>
                            <p>낮의 활기찬 한강</p>
                        </div>
                    </div>
                    <div className="gallery-item" data-aos="fade-up" data-aos-delay="200" data-cursor="SUNSET">
                        <div className="gallery-overlay">
                            <span>SUNSET</span>
                            <p>황혼의 낭만적인 한강</p>
                        </div>
                    </div>
                    <div className="gallery-item large" data-aos="fade-up" data-aos-delay="300" data-cursor="NIGHT">
                        <div className="gallery-overlay">
                            <span>NIGHT VIEW</span>
                            <p>밤의 화려한 야경</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="view-experience">
                <div className="section-container">
                    <div className="exp-grid">
                        <div className="exp-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="exp-number">38F</div>
                            <h3>스카이라운지에서 바라보는</h3>
                            <p>서울 전경과 한강 파노라마뷰</p>
                        </div>
                        <div className="exp-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="exp-number">270°</div>
                            <h3>파노라마 뷰</h3>
                            <p>한강과 도시가 어우러진 광활한 조망</p>
                        </div>
                        <div className="exp-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="exp-number">24H</div>
                            <h3>시시각각 변하는</h3>
                            <p>한강의 다양한 표정</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default View;
