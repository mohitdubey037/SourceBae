// import React from 'react';
// import styles from './AboutUs.module.css';
// import {
//     LandingNavbar,
//     ConnectPlansSection,
//     FooterSection
// } from './Components/index';

// import { funding, foundation, team, projectCompleted, career } from './Logos';
// import Pic1 from '../../assets/images/AboutUs/familyPic1.jpg'
// import Pic2 from '../../assets/images/AboutUs/familyPic2.jpg'

// const QuoteBar = () => {
//     return (
//         <div className={styles.quote_bar}>
//             <div className={styles.quote_container}>
//                 <p>
//                     “Talent wins games, but teamwork and intelligence win
//                     championships”{' '}
//                 </p>
//                 <p>Michael Jordan</p>
//             </div>
//         </div>
//     );
// };

// const GallerySection = () => {
//     return (
//         <div className={styles.gallery_section}>
//             <div className={styles.gallery_left_side}>
//                 <img
//                     src={Pic1}
//                     alt="team"
//                 />
//             </div>
//             <div className={styles.gallery_right_side}>
//                 <img
//                     src={Pic2}
//                     alt="team"
//                 />
//                 <button type="button">
//                     <span>See More</span>
//                 </button>
//             </div>
//         </div>
//     );
// };

// const CenteredMessageStrip = () => {
//     return (
//         <div className={styles.centered_message_strip}>
//             <span className={styles.message_strip_text}>
//                 <span className={styles.emphasize_blue}> SourceBae </span> is
//                 the platform to solve all your Outsourcing problems.
//             </span>
//         </div>
//     );
// };

// const PointsColumnSection = () => {
//     return (
//         <section className={styles.points_column_section}>
//             <div className={`${styles.point_card} ${styles.point_card_1}`}>
//                 <div className={styles.point_number}>
//                     <span>o1</span>
//                 </div>
//                 <div className={styles.point_text}>
//                     <span>
//                         Our aim is to provide upcoming startups as well as big
//                         enterprises with competent and experienced developers
//                         who can handle the task at hand with utmost efficiency.
//                         SourceBae also aims to provide emerging It startups with
//                         a quick and easy way of generating revenue
//                     </span>
//                 </div>
//             </div>
//             <div className={`${styles.point_card} ${styles.point_card_2}`}>
//                 <div className={styles.point_number}>
//                     <span>o2</span>
//                 </div>
//                 <div className={styles.point_text}>
//                     <span>
//                         Outsourcing process can require a lot of effort and
//                         operational hassle. It is both time consuming as well as
//                         lacks proper credibility. SourceBae aids smooth
//                         onboarding of developers who fit right into your team.
//                     </span>
//                 </div>
//             </div>
//             <div className={`${styles.point_card} ${styles.point_card_3}`}>
//                 <div className={styles.point_number}>
//                     <span>o3</span>
//                 </div>
//                 <div className={styles.point_text}>
//                     <span>
//                         We ensure you get thoroughly verified resources from the
//                         multiple onboarded vendors. SourceBae streamlines the
//                         process of outsourcing into making it efficient and
//                         effective. It helps in making the process easy and avoid
//                         all the complications.
//                     </span>
//                 </div>
//             </div>
//         </section>
//     );
// };

// const StatsCardRow = () => {
//     return (
//         <section className={styles.stats_card_row}>
//             <div className={styles.stats_card}>
//                 <div className={styles.stats_icon}>
//                     <img src={foundation} alt="foundation" />
//                 </div>
//                 <div className={styles.stats_data}>
//                     <span className={styles.number}>2020</span>
//                     <span>Year of Foundation</span>
//                 </div>
//             </div>
//             <div className={styles.stats_card}>
//                 <div className={styles.stats_icon}>
//                     <img src={team} alt="team member" />
//                 </div>
//                 <div className={styles.stats_data}>
//                     <span className={styles.number}>30+</span>
//                     <span>Team member</span>
//                 </div>
//             </div>
//             <div className={styles.stats_card}>
//                 <div className={styles.stats_icon}>
//                     <img src={funding} alt="funding" />
//                 </div>
//                 <div className={styles.stats_data}>
//                     <span className={styles.number}>$1 M</span>
//                     <span>Seed funding raised</span>
//                 </div>
//             </div>
//             <div className={styles.stats_card}>
//                 <div className={styles.stats_icon}>
//                     <img src={projectCompleted} alt="project completed" />
//                 </div>
//                 <div className={styles.stats_data}>
//                     <span className={styles.number}>200+</span>
//                     <span>Project Completed Successfully</span>
//                 </div>
//             </div>
//         </section>
//     );
// };

// const CareersSection = () => {
//     return (
//         <section className={styles.careers_section}>
//             <div className={styles.career_heading}>
//                 <span className={styles.heading_text}>Careers</span>
//                 <span className={styles.heading_desc}>
//                     Shape Your Career With Us
//                 </span>
//             </div>
//             <div className={styles.career_content}>
//                 <div className={styles.career_card}>
//                     <img src={career} alt="team" />
//                 </div>
//                 <div className={styles.career_body}>
//                     Building a world-class product requires a world-class team.
//                     Our team has a very strong belief in the mission and works
//                     hard to redefine the future of outsourcing.
//                 </div>
//             </div>
//         </section>
//     );
// };
// export default function LandingPage() {
//     return (
//         <div className={styles.aboutus_page_wrapper}>
//             <LandingNavbar />
//             <QuoteBar />
//             <GallerySection />
//             <CenteredMessageStrip />
//             <PointsColumnSection />
//             <StatsCardRow />
//             <CareersSection />
//             <ConnectPlansSection />
//             <FooterSection />
//         </div>
//     );
// }

import React from 'react';
import L_CTA_Bottom from '../MainLandingPage/Components/CTA_Bottom/L_CTA_Bottom';
import L_Footer from '../MainLandingPage/Components/L_Footer/L_Footer';
import LNavbar from '../MainLandingPage/Components/Navbar/LNavbar';
import styles from './AboutUs.module.css';
import AboutBanner from './Components/About_Banner_Section/About_Banner';
import AboutInfo from './Components/About_Info/About_Info';
import AboutCareer from './Components/About_Career/About_Career';
import AboutProgressBar from './Components/About_ProgressBar/About_ProgressBar';


export default function AboutUs() {
    return (
        <div
            onClick={() =>
                (document.getElementById('pop-up').style.display = 'none')
            }
        >
            {' '}
            <div className={`${styles.landing_navbar}`}>
                <LNavbar />
            </div>
            <div className={`${styles.about_banner_wrap}`}>
                <AboutBanner />
            </div>
            <div className={`${styles.about_info_wrap}`}>
                <AboutInfo />
            </div>
            <div className={`${styles.about_progress_bar_wrap}`}>
                <AboutProgressBar />
            </div>
            <div className={`${styles.about_career_wrap}`}>
                <AboutCareer />
            </div>
            <div
                className={`${styles.about_CTA_bottom_padding} CTA_bottom_wrap`}
            >
                <L_CTA_Bottom />
            </div>
            <div className={'L_footer_wrap'}>
                <L_Footer />
            </div>
        </div>
    );
}
