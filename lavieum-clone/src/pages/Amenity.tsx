import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Amenity.css';

const Amenity = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="amenity-page">
            <section className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="page-hero-content" data-aos="fade-up">
                    <p className="page-subtitle">AMENITY</p>
                    <h1 className="page-title">어메니티</h1>
                </div>
            </section>

            <section className="amenity-intro">
                <div className="section-container">
                    <div className="amenity-intro-text" data-aos="fade-up">
                        <p className="amenity-label">NOT A FLAT LIFE</p>
                        <h2 className="amenity-title">
                            HIGH-END LIFESTYLE<br />
                            AMENITIES
                        </h2>
                        <p className="amenity-desc">
                            트렌디한 감성의 하이엔드 라이프스타일 어메니티<br />
                            일상을 특별하게 만드는 프리미엄 커뮤니티 시설
                        </p>
                    </div>
                </div>
            </section>

            <section className="amenity-list">
                <div className="section-container">
                    <div className="amenity-grid">
                        <div className="amenity-card featured" data-aos="fade-up" data-cursor="EXPLORE">
                            <div className="amenity-bg"></div>
                            <div className="amenity-content">
                                <span className="amenity-floor">38F</span>
                                <h3>스카이 라운지</h3>
                                <p>
                                    휴식과 담소, 사색과 영감을 위한<br />
                                    하이엔드 럭셔리 공간이자<br />
                                    한강뷰의 낮과 밤, 예술적 풍경의 극치
                                </p>
                            </div>
                        </div>

                        <div className="amenity-card" data-aos="fade-up" data-aos-delay="100" data-cursor="EXPLORE">
                            <div className="amenity-bg"></div>
                            <div className="amenity-content">
                                <span className="amenity-floor">1F</span>
                                <h3>라운지 & 미팅룸</h3>
                                <p>
                                    개인업무, 회의, 스터디 등을<br />
                                    편안한 분위기에서 자유롭게 이용 가능한<br />
                                    트렌디하고 감각적인 공간
                                </p>
                            </div>
                        </div>

                        <div className="amenity-card" data-aos="fade-up" data-aos-delay="200" data-cursor="EXPLORE">
                            <div className="amenity-bg"></div>
                            <div className="amenity-content">
                                <span className="amenity-floor">B2</span>
                                <h3>스크린 골프</h3>
                                <p>
                                    날씨나 계절에 구애받지 않고<br />
                                    여가와 건강을 즐기는<br />
                                    실제 필드 느낌 재현의 최신 시스템 제공
                                </p>
                            </div>
                        </div>

                        <div className="amenity-card" data-aos="fade-up" data-aos-delay="300" data-cursor="EXPLORE">
                            <div className="amenity-bg"></div>
                            <div className="amenity-content">
                                <span className="amenity-floor">B1</span>
                                <h3>듀플렉스 로비 & 라운지</h3>
                                <p>
                                    입주민과 방문객 모두를 위한<br />
                                    취향과 비즈니스 모임 등<br />
                                    소사이어티 공간이자 소통의 자유로운 시간
                                </p>
                            </div>
                        </div>

                        <div className="amenity-card" data-aos="fade-up" data-aos-delay="400" data-cursor="EXPLORE">
                            <div className="amenity-bg"></div>
                            <div className="amenity-content">
                                <span className="amenity-floor">B1</span>
                                <h3>피트니스 센터</h3>
                                <p>
                                    최신 운동 기구와<br />
                                    쾌적한 환경의<br />
                                    프리미엄 피트니스 공간
                                </p>
                            </div>
                        </div>

                        <div className="amenity-card" data-aos="fade-up" data-aos-delay="500" data-cursor="EXPLORE">
                            <div className="amenity-bg"></div>
                            <div className="amenity-content">
                                <span className="amenity-floor">1F</span>
                                <h3>게스트룸</h3>
                                <p>
                                    방문객을 위한<br />
                                    프라이빗한<br />
                                    숙박 공간
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Amenity;
