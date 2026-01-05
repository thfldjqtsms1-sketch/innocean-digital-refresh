import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Brand.css';

const Brand = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="brand-page">
            <section className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="page-hero-content" data-aos="fade-up">
                    <p className="page-subtitle">BRAND</p>
                    <h1 className="page-title">브랜드 소개</h1>
                </div>
            </section>

            <section className="brand-meaning">
                <div className="section-container">
                    <div className="brand-intro-text" data-aos="fade-up">
                        <h2 className="brand-name">LA VIE:UM</h2>
                        <p className="brand-tagline">한강을 품은 LIMITED FINE DWELLING</p>
                    </div>

                    <div className="meaning-grid">
                        <div className="meaning-card" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="meaning-title">LIMITED</h3>
                            <p className="meaning-kr">한정적</p>
                            <p className="meaning-desc">
                                단 하나뿐인 절대적 가치<br />
                                희소성이 만드는 프리미엄
                            </p>
                        </div>
                        <div className="meaning-card" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="meaning-title">FINE</h3>
                            <p className="meaning-kr">정교한</p>
                            <p className="meaning-desc">
                                섬세한 디테일의 완성<br />
                                주거 예술의 정수
                            </p>
                        </div>
                        <div className="meaning-card" data-aos="fade-up" data-aos-delay="300">
                            <h3 className="meaning-title">DWELLING</h3>
                            <p className="meaning-kr">거주</p>
                            <p className="meaning-desc">
                                삶의 본질을 담은 공간<br />
                                일상이 예술이 되는 곳
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="brand-philosophy">
                <div className="philosophy-bg"></div>
                <div className="section-container">
                    <div className="philosophy-content" data-aos="fade-up">
                        <p className="philosophy-label">BRAND PHILOSOPHY</p>
                        <h2 className="philosophy-title">
                            기능과 감성의<br />
                            정제된 주거예술
                        </h2>
                        <p className="philosophy-desc">
                            라비움 한강은 단순한 주거공간을 넘어<br />
                            삶의 품격을 높이는 예술적 공간을 지향합니다.<br /><br />
                            한강의 아름다운 풍경과 함께<br />
                            일상이 특별해지는 순간을 선사합니다.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Brand;
