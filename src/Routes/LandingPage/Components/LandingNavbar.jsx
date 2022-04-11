import styles from './LandingNavbar.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import { brandLogo } from '../Logos';
import { Link } from 'react-router-dom';
import './Split.css';
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
                {/* <div className="gui-split-button">
                    <button>View Cart</button>
                    <span
                        class="gui-popup-button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        title="Open for more actions"
                        tabindex="-1"
                    >
                        <svg aria-hidden="true" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
                        </svg>
                        <ul class="gui-popup">
                            <li>
                                <button tabindex="0">
                                    <svg aria-hidden="true" viewBox="0 0 24 24">
                                        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                    </svg>
                                    Checkout
                                </button>
                            </li>
                            <li>
                                <button tabindex="-1">
                                    <svg aria-hidden="true" viewBox="0 0 24 24">
                                        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                                    </svg>
                                    Quick Pay
                                </button>
                            </li>
                            <li>
                                <button tabindex="-1">
                                    <svg aria-hidden="true" viewBox="0 0 24 24">
                                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
                                    </svg>
                                    Save for later
                                </button>
                            </li>
                        </ul>
                    </span>
                </div> */}
                <Link to="/">
                    <span className={styles.nav_signup_btn}>Sign Up</span>
                </Link>
            </div>
        </div>
    );
};

export default LandingNavbar;
