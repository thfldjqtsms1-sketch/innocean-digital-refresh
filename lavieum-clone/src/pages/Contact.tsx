import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './Contact.css';

const Contact = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="contact-page">
            <section className="page-hero">
                <div className="page-hero-bg"></div>
                <div className="page-hero-content" data-aos="fade-up">
                    <p className="page-subtitle">CONTACT</p>
                    <h1 className="page-title">방문예약</h1>
                </div>
            </section>

            <section className="contact-info">
                <div className="section-container">
                    <div className="contact-grid">
                        <div className="contact-left" data-aos="fade-right">
                            <p className="contact-label">CONSULTATION</p>
                            <h2 className="contact-title">
                                라비움 한강<br />
                                상담 예약
                            </h2>
                            <p className="contact-desc">
                                전문 상담사가 친절하게<br />
                                안내해 드립니다.
                            </p>
                            <a href="tel:1533-1195" className="contact-phone">
                                ☎ 1533-1195
                            </a>
                        </div>

                        <div className="contact-right" data-aos="fade-left">
                            <form className="contact-form">
                                <div className="form-group">
                                    <label>이름</label>
                                    <input type="text" placeholder="이름을 입력해주세요" />
                                </div>
                                <div className="form-group">
                                    <label>연락처</label>
                                    <input type="tel" placeholder="연락처를 입력해주세요" />
                                </div>
                                <div className="form-group">
                                    <label>관심 평형</label>
                                    <select>
                                        <option>선택해주세요</option>
                                        <option>45㎡</option>
                                        <option>59㎡</option>
                                        <option>84㎡</option>
                                        <option>102㎡</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>문의사항</label>
                                    <textarea placeholder="문의사항을 입력해주세요" rows={4}></textarea>
                                </div>
                                <button type="submit" className="submit-btn">상담 신청하기</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <section className="visit-info">
                <div className="section-container">
                    <div className="visit-header" data-aos="fade-up">
                        <h3>견본주택 안내</h3>
                        <div className="title-divider"></div>
                    </div>
                    <div className="visit-details" data-aos="fade-up" data-aos-delay="200">
                        <div className="visit-item">
                            <span className="visit-label">주소</span>
                            <p>서울시 마포구 합정동 (견본주택)</p>
                        </div>
                        <div className="visit-item">
                            <span className="visit-label">운영시간</span>
                            <p>10:00 ~ 19:00 (연중무휴)</p>
                        </div>
                        <div className="visit-item">
                            <span className="visit-label">주차</span>
                            <p>무료주차 가능</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Contact;
