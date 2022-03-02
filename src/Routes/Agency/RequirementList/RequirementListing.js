import React from 'react';
import Back from '../../../Components/Back/Back';
import Navbar from '../../../Components/ClientNewestDashboard/Navbar/Navbar';
import styles from './RequirementListing.module.css';
import RequirementsCard from '../../../Components/RequirementCard/RequirementsCard';
import SearchAndFilter from '../../Dashboard/ActiveRequirements/SearchAndFilter';
import DeveloperListing from './DeveloperListing';
import SearchBar from '../../../Components/SearchBar/SearchBar';
import colors from '../../../Constants/colors';
import buttonStyles from '../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';
import RequirementFilter from '../../../Components/RequirementFilter/RequirementFilter';
import SizedBox from '../../../Components/SizedBox/SizedBox';

const RequirementListing = () => {
    let data =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pretium nibh pellentesque in egestas velit, risus turpis mi. Tempor sed morbi ut lobortis dictum ac fames. Aenean lobortis elementum tempus interdum odio aenean sollicitudin bibendum. Ac ante pulvinar ullamcorper sed dui cursus rutrum. Non morbi lorem netus tempor, id. Nullam erat donec facilisi vel amet ridiculus velit quis.';

    const onSearch = (text) => {};

    return (
        <div>
            <div className={styles.navbarDiv}>
                <Navbar />
            </div>
            <Back name="Active Requirement" />
            <div className={styles.searchBarContainer}>
                <div className={styles.searchBarStyle}>
                    <SearchBar
                        onChange={onSearch}
                        bgColor={colors.WHITE}
                        placeholder={'Type keyword here example “react js”'}
                    />
                </div>
                <SizedBox width={'30px'} />
                <button
                    className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.searchBtn}`}
                >
                    <text>Search</text>
                </button>
                <SizedBox width={'30px'} />
                <div style={{ width: '110px' }}>
                    <RequirementFilter />
                </div>
            </div>
            <div className={styles.partition}>
                <div className={styles.listContainer}>
                    {Array(6)
                        .fill('maq')
                        .map(() => (
                            <RequirementsCard
                                des={{ des: data }}
                                showButton={true}
                                buttonTitle={'Select'}
                            />
                        ))}
                </div>
                <div className={styles.optionsContainer}>
                    <DeveloperListing />
                </div>
            </div>
        </div>
    );
};

export default RequirementListing;
