import React, { useEffect, useState } from 'react';
import styles from './DeveloperListing.module.css';
import Button from '../../../Components/Button/Button';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import paperPlane from '../../../assets/images/DeveloperRequest/paperPlane.svg';
import buttonStyles from '../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';
import { useHistory } from 'react-router-dom';

function DeveloperListing({ item, onApply, selectedCard, ...props }) {
  const [selectedDevs, setselectedDevs] = useState([]);
  const history = useHistory();

  const getTechnologies = (data) => {
    let result = '';
    data.forEach(
      (item, index) =>
      (result =
        result +
        item.technologyName +
        (data?.length !== index + 1 && ', '))
    );
    return result;
  };

  useEffect(() => {
    let sharedDevs = [];
    item?.forEach((ele) => {
      ele.isDeveloperShared && sharedDevs.push(ele?._id);
    });
    setselectedDevs(sharedDevs);
  }, [item]);

  const isAlreadyShared = (id) => selectedDevs?.some((devId) => devId === id);

  const selectedMyDev = (newDevId) => {
    let isAlreadyChecked = selectedDevs?.some(
      (devId) => devId === newDevId
    );
    isAlreadyChecked
      ? setselectedDevs(() =>
        selectedDevs?.filter((devId) => devId !== newDevId)
      )
      : setselectedDevs([...selectedDevs, newDevId]);
  };

  return (
    <div className={styles.developerListingContainer}>
      <span className={styles.heading}>developer listing</span>
      {item?.length ? (
        <div style={{ minWidth: '260px' }} >
          {item?.map((person) => (
            <div className={styles.DLCard}>
              <SizedBox height={'6px'} />
              <div className={styles.nameContainer} style={{ pointerEvents: person?.isDeveloperShared ? 'none' : 'all' }}  >
                <span
                  className={styles.name}
                >{`${person?.firstName} ${person?.lastName}`}</span>
                <input
                  type={'checkbox'}
                  checked={isAlreadyShared(person?._id)}
                  onChange={() => selectedMyDev(person?._id)}
                />
              </div>
              <SizedBox height={'6px'} />
              <span className={styles.techText}>
                {getTechnologies(person?.developerTechnologies)}
              </span>
              <SizedBox height={'10px'} />
              <span
                className={styles.experienceText}
              >{`experience- ${person?.developerExperience} years`}</span>
              <SizedBox height={'24px'} />
              <div style={{ pointerEvents: 'inherit' }}>
                <Button
                  onClick={() =>
                    window.open(
                      person?.developerDocuments[0]
                        ?.documentLink
                    )
                  }
                  name="View Resume"
                  buttonExtraStyle={{
                    borderColor: '#45A4EA',
                    width: '110px'
                  }}
                  buttonTextStyle={buttonTextStyle}
                />
              </div>
            </div>
          ))}
          <SizedBox height={'16px'} />
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex'
            }}
          >
            <button
              onClick={() => onApply(selectedDevs)}
              className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`}
            >
              <span>Apply</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.paperPlane}>
          <img
            src={paperPlane}
            style={{ height: '140px', width: '140px' }}
            alt="no data"
          />
          {!selectedCard ? (
            <span className={styles.noDataMsg}>
              select one of the available requirement then select
              your developer
            </span>
          ) : (
            <>
              <p className={styles.noDataMsg} style={{ textTransform: 'unset', marginBottom: '20px' }}  >
                Looks like you haven't added any developers matches with the requirement
              </p>
              <button
                onClick={() => history.push('/add-developer')}
                className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`}
              >
                <span>Add Developers</span>
              </button>
            </>
          )}
        </div>
      )
      }
      <SizedBox height={'16px'} />
    </div >
  );
}

export const buttonTextStyle = {
  fontFamily: 'Segoe UI',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '19px',
  textTransform: 'capitalize',
  color: '#45A4EA'
};

export default DeveloperListing;
