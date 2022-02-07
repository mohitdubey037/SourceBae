import React from 'react';
import styles from './LHire.module.css';
import hireCard1 from '../../../../assets/images/LandingPage/card-1.png';
import hireCard2 from '../../../../assets/images/LandingPage/card-2.png';
import LButton from '../Button/LButton';
export default function LHire() {
    const hireCards = [
        {
            img: hireCard1,
            title: 'Agency',
            desc: [
                <span>
                    <span className="span_pink">
                        NDA Protected, ZERO commissions{' '}
                    </span>
                    or hidden costs
                </span>,
                'Thousand’s of reviews by clients',
                'Many compliance checks into the agency’s',
                'Hire Domain Expertise Agency',
                <span>
                    Save Time, Save cost,
                    <span className="span_pink"> HIRE IN 4 STEPS</span>
                </span>
            ],
            btn: 'Hire Agency'
        },
        {
            img: hireCard2,
            title: 'Developer',
            desc: [
                'Handpicked Agencies Bench resources',
                <span>
                    <span className="span_pink">Monthly Payments.</span> NDA
                    Protected
                </span>,
                'Engineers with experience at top brands in many industries',
                <span>
                    <span className="span_pink">
                        NO individual freelancers{' '}
                    </span>
                    , we only works with Registered IT agencies
                </span>,
                'Experienced engineers, Available from NEXT day'
            ],
            btn: 'Hire Deveploer'
        }
    ];
    return (
        <>
            {' '}
            <div>
                <h2 className={`${styles.hire_section_heading} L_h2`}>
                    Get hiring done with SourceBae.{' '}
                </h2>
                <span className="span_pink L_h2">Hire Now. </span>
            </div>
            <div className={`${styles.hire_cards_wrap}`}>
                {hireCards?.map((card, i) => {
                    return (
                        <div className={`${styles.hire_main_card}`}>
                            <div className={`${styles.hire_card_img}`}>
                                <img src={card.img} alt="" />
                            </div>
                            <div className={`${styles.hire_card_heading}`}>
                                <h2 className="L_h2">
                                    Hire{' '}
                                    <span className="span_pink">
                                        {card?.title}
                                    </span>{' '}
                                </h2>
                            </div>
                            <div className={`${styles.hire_card_description}`}>
                                <ul className={`${styles.hire_card_ul}`}>
                                    {card?.desc?.map((line) => {
                                        return <li>{line}</li>;
                                    })}
                                </ul>
                            </div>
                            <div className={`${styles.hire_card_btn} `}>
                                <LButton
                                    name={card.btn}
                                    className={`${styles.hire_card_btn}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
