import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Planning.css';

const Planning = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="planning-page">
            <section className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="page-hero-content" data-aos="fade-up">
                    <p className="page-subtitle">PLANNING</p>
                    <h1 className="page-title">사업개요</h1>
                </div>
            </section>

            <section className="planning-overview">
                <div className="section-container">
                    <div className="overview-header" data-aos="fade-up">
                        <h2>PROJECT OVERVIEW</h2>
                        <div className="title-divider"></div>
                    </div>

                    <div className="overview-grid">
                        <div className="overview-item" data-aos="fade-up" data-aos-delay="100">
                            <span className="overview-label">사업명</span>
                            <p className="overview-value">라비움 한강</p>
                        </div>
                        <div className="overview-item" data-aos="fade-up" data-aos-delay="200">
                            <span className="overview-label">위치</span>
                            <p className="overview-value">서울시 마포구 합정동</p>
                        </div>
                        <div className="overview-item" data-aos="fade-up" data-aos-delay="300">
                            <span className="overview-label">규모</span>
                            <p className="overview-value">지하 5층 ~ 지상 38층</p>
                        </div>
                        <div className="overview-item" data-aos="fade-up" data-aos-delay="400">
                            <span className="overview-label">세대수</span>
                            <p className="overview-value">아파트 + 오피스텔</p>
                        </div>
                        <div className="overview-item" data-aos="fade-up" data-aos-delay="500">
                            <span className="overview-label">시공사</span>
                            <p className="overview-value">SK에코플랜트</p>
                        </div>
                        <div className="overview-item" data-aos="fade-up" data-aos-delay="600">
                            <span className="overview-label">입주예정</span>
                            <p className="overview-value">2027년 예정</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="unit-types">
                <div className="section-container">
                    <div className="overview-header" data-aos="fade-up">
                        <h2>UNIT TYPES</h2>
                        <div className="title-divider"></div>
                    </div>

                    <div className="unit-grid">
                        <div className="unit-card" data-aos="fade-up" data-aos-delay="100">
                            <div className="unit-size">45㎡</div>
                            <div className="unit-count">16세대</div>
                        </div>
                        <div className="unit-card" data-aos="fade-up" data-aos-delay="200">
                            <div className="unit-size">59㎡</div>
                            <div className="unit-count">24세대</div>
                        </div>
                        <div className="unit-card" data-aos="fade-up" data-aos-delay="300">
                            <div className="unit-size">84㎡</div>
                            <div className="unit-count">32세대</div>
                        </div>
                        <div className="unit-card" data-aos="fade-up" data-aos-delay="400">
                            <div className="unit-size">102㎡</div>
                            <div className="unit-count">18세대</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Planning;
