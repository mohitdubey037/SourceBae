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
                <Link to="/">Home</Link>
                <div class="gui-split-button">
                    <button>Send</button>
                    <span
                        class="gui-popup-button"
                        aria-haspopup="true"
                        aria-expanded="false"
                        title="Open for more actions"
                    >
                        <svg aria-hidden="true" viewBox="0 0 20 20">
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                        <ul class="gui-popup">
                            <li>
                                <button>
                                    <svg aria-hidden="true" viewBox="0 0 24 24">
                                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Schedule for later
                                </button>
                            </li>
                            <li>
                                <button>
                                    <svg aria-hidden="true" viewBox="0 0 24 24">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Delete
                                </button>
                            </li>
                            <li>
                                <button>
                                    <svg aria-hidden="true" viewBox="0 0 24 24">
                                        <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                    Save draft
                                </button>
                            </li>
                        </ul>
                    </span>
                </div>
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
