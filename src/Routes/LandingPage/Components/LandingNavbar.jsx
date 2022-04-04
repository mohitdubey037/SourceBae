import styles from './LandingNavbar.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import { brandLogo } from '../Logos';
const LandingNavbar = () => {
    return (
        <div className={styles.landing_page_nav}>
            <div className={styles.nav_logo}>
                <img src={brandLogo} alt="logo" />
            </div>
            <div className={styles.nav_menu}>
                <MenuIcon htmlColor="#554dde" />
            </div>
        </div>
    );
};

export default LandingNavbar;
