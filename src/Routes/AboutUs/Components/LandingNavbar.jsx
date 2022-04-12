import styles from './LandingNavbar.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import {
    brandLogo,
    hireAgencySuitcase,
    hireDevAngles,
    listDevs,
    activeReq
} from '../Logos';
import { Link } from 'react-router-dom';
const LandingNavbar = () => {
    return (
        <div className={styles.landing_page_nav}>
            <div className={styles.nav_logo}>
                <img src={brandLogo} alt="logo" />
            </div>
            <div className={`${styles.nav_menu} ${styles.mobile}`}>
                <MenuIcon htmlColor="#554dde" />
            </div>
            <div className={`${styles.nav_menu_web}`}>
                <Link to="/">Home</Link>

                <div className={styles.services_dropdown}>
                    Services <i class="fa fa-caret-down"></i>
                    <div className={styles.dropdown_content}>
                        <Link to="/">
                            <div className={styles.dropdown_item}>
                                <img
                                    src={hireAgencySuitcase}
                                    alt="hire agency"
                                />{' '}
                                Hire Agency
                            </div>
                        </Link>
                        <Link to="/">
                            <div className={styles.dropdown_item}>
                                <img src={hireDevAngles} alt="hire developer" />{' '}
                                Hire Developer
                            </div>
                        </Link>
                        <Link to="/">
                            <div className={styles.dropdown_item}>
                                <img src={listDevs} alt="hire agency" /> List
                                Your Developer
                            </div>
                        </Link>
                        <Link to="/">
                            <div className={styles.dropdown_item}>
                                <img src={activeReq} alt="active requirement" />{' '}
                                Active Requirements
                            </div>
                        </Link>
                    </div>
                </div>
                <Link to="/about-us">About Us</Link>
                <Link to="/agency/login">
                    <button type="button" className={styles.nav_login_btn}>
                        Login
                    </button>
                </Link>

                <Link to="/agency/register">
                    <span className={styles.nav_signup_btn}>Sign Up</span>
                </Link>
            </div>
        </div>
    );
};

export default LandingNavbar;
