import { useEffect, useRef } from 'react';
import styles from './IntroSection.module.css';
const IntroSection = () => {
    const headingRef = useRef(null);
    const headingRefWeb = useRef(null);
    let headingCounter = 0;
    let headingCounterWeb = 0;
    let headingText = "India's #1 Marketplace For Hiring Remote Developer";
    let webHeadingText =
        "India's Leading Marketplace For Hiring Remote Developer";
    var speed = 50;
    function typeWriterHeading() {
        if (headingCounter < headingText.length) {
            headingRef.current.innerHTML += headingText.charAt(headingCounter);
            headingCounter++;
            setTimeout(typeWriterHeading, speed);
        }
    }
    function typeWriterHeadingWeb() {
        if (headingCounterWeb < webHeadingText.length) {
            headingRefWeb.current.innerHTML +=
                webHeadingText.charAt(headingCounterWeb);
            headingCounterWeb++;
            setTimeout(typeWriterHeadingWeb, speed);
        } else {
            // headingRefWeb.current.styles.minHeight = 'unset';
            if (headingRefWeb.current)
                headingRefWeb.current.style.minHeight = 'unset';
        }
    }

    useEffect(() => {
        if (headingRef.current) {
            typeWriterHeading();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headingRef]);
    useEffect(() => {
        if (headingRefWeb.current) {
            typeWriterHeadingWeb();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [headingRefWeb]);
    return (
        <section className={styles.intro_section}>
            <div className={styles.intro_section_heading}>
                <span className={styles.intro_heading} ref={headingRef}></span>
                <span
                    className={styles.intro_heading_web}
                    ref={headingRefWeb}
                ></span>
            </div>
            <div className={styles.intro_section_subheading}>
                <span className={styles.intro_section_subtitle}>
                    SourceBae is a Marketplace that connects you with IT
                    Agencies and Dedicated Remote Developers from around the
                    world.
                </span>
                <span className={styles.intro_section_subtitle_web}>
                    SourceBae is a Marketplace that connects you with IT
                    Agencies and Dedicated Remote Developers from around the
                    world. We make it easy for you to find an agency to build
                    MVP at a fixed cost or hire Developers on a monthly
                    contract.
                </span>
            </div>
        </section>
    );
};

export default IntroSection;
