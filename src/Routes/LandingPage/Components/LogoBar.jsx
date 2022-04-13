import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

import styles from './LogoBar.module.css';
import { sequoia, innovation, innowrap, smartData, torinit } from '../Logos';

const LogoBar = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        rootMargin: '-100px 0px'
    });

    const variants = {
        show: { opacity: 1, duration: 1 }
    };
    useEffect(() => {
        if (inView) {
            // document.querySelector('body').classList.add('logo-bar-in-view');
            console.log(inView, 'inview');
        }
    }, [inView]);

    return (
        <section className={styles.logobar_container}>
            <div className={styles.logobar_intro_text}>
                <span className={styles.emphasize}>Many Businesses</span> Trust
                Us With Their Hiring And Project Distribution
            </div>

            <div className={styles.logo_row} ref={ref}>
                <motion.img
                    src={sequoia}
                    alt="sequoia"
                    style={{ opacity: 0 }}
                    animate={inView && 'show'}
                    variants={variants}
                />
                <motion.img
                    src={innovation}
                    alt="innovation"
                    style={{ opacity: 0 }}
                    animate={inView && 'show'}
                    variants={variants}
                />
                <motion.img
                    src={innowrap}
                    alt="innowrap"
                    style={{ opacity: 0 }}
                    animate={inView && 'show'}
                    variants={variants}
                />
                <motion.img
                    src={torinit}
                    alt="torinit"
                    style={{ opacity: 0 }}
                    animate={inView && 'show'}
                    variants={variants}
                />
                <motion.img
                    src={smartData}
                    alt="smartData"
                    style={{ opacity: 0 }}
                    animate={inView && 'show'}
                    variants={variants}
                />
            </div>
        </section>
    );
};

export default LogoBar;
