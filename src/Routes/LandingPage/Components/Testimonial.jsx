import styles from './Testimonial.module.css';
import { step1, star, connectHeart } from '../Logos';
const TestimonialCard = () => {
    return (
        <div className={styles.testimonial_card}>
            <img
                className={styles.testimonial_card_image}
                src={step1}
                alt="testimonial"
            />
            <div className={styles.testimonial_card_text}>
                <span className={styles.testimonial_person_name}>John Doe</span>
                <span className={styles.testimonial_person_desc}>
                    CEO, Company
                </span>
            </div>
            <div className={styles.testimonial_with_star}>
                <div className={styles.testimonial_star}>
                    <img className={styles.star} src={star} alt="star" />
                    <img className={styles.star} src={star} alt="star" />
                    <img className={styles.star} src={star} alt="star" />
                    <img className={styles.star} src={star} alt="star" />
                    <img className={styles.star} src={star} alt="star" />
                </div>
                <div className={styles.testimonial_content}>
                    <span className={styles.testimonial_content_text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed euismod.
                    </span>
                </div>
            </div>
        </div>
    );
};

const TestimonialsSection = () => {
    return (
        <section className={styles.testimonials_section}>
            <div className={styles.testimonial_intro}>
                <div className={styles.heart_holder}>
                    <img src={connectHeart} alt="connect_heart" />
                </div>
                <div className={styles.testimonial_intro_text}>
                    By 50+ Startups & Enterprises
                </div>
            </div>
            <div className={styles.testimonial_container}>
                <TestimonialCard />
                <TestimonialCard />
            </div>
        </section>
    );
};

export default TestimonialsSection;
