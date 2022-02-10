import React from 'react';
import styles from './L_Testimonial.module.css';
import heartIcon from '../../../../assets/images/LandingPage/heart.svg';
import clientImg from '../../../../assets/images/LandingPage/client.png';
import testimonialStars from '../../../../assets/images/LandingPage/testimonial-star.svg';
export default function L_Testimonial() {
    const testimonialStar = [1, 2, 3, 4, 5];
    const testimonialCards = [1, 2, 3];
    return (
        <>
            <div className={`${styles.testimonial_title}`}>
                <h2 className="L_h2">
                    {' '}
                    <img
                        src={heartIcon}
                        alt=""
                        className={`${styles.testimonial_title_img}`}
                    />
                    by <span className="span_pink">startups</span> & enterprises
                </h2>
            </div>
            <div className={`${styles.testimonial_cards_wrap}`}>
                {testimonialCards.map(() => {
                    return (
                        <div className={`${styles.testimonial_main_card}`}>
                            <div className={`${styles.testimonial_star_row}`}>
                                {testimonialStar?.map((value) => {
                                    return <img src={testimonialStars}></img>;
                                })}
                            </div>
                            <div className={`${styles.testimonial_des}`}>
                                "Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ea, nam magnam exercitationem
                                sint excepturi optio."
                            </div>
                            <div
                                className={`${styles.testimonial_client_info_row}`}
                            >
                                <div
                                    className={`${styles.testimonial_client_img}`}
                                >
                                    <img src={clientImg} alt="" />
                                </div>
                                <div
                                    className={`${styles.testimonial_client_info}`}
                                >
                                    <h5>Jaquon Hart</h5>
                                    <p>
                                        Digital Marketing Executive, Hypebeast
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
