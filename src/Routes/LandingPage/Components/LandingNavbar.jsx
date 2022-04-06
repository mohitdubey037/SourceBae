import styles from './LandingNavbar.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import { brandLogo } from '../Logos';
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
                {/* <MenuIcon htmlColor="#554dde" /> */}
                <Link to="/">Home</Link>
                <Link to="/">Services</Link>
                <Link to="/">About Us</Link>
                <Link to="/">
                    <button type="button" className={styles.nav_login_btn}>
                        Login
                    </button>
                </Link>
                <Link to="/">
                    <span className={styles.nav_signup_btn}>Sign Up</span>
                </Link>
            </div>
        </div>
    );
};

export default LandingNavbar;
