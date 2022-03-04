import React from 'react'
import styles from './DeveloperCard.module.css'
import cross from '../../assets/images/OtherIcons/crossInCircle.svg'
import downArrow from '../../assets/images/OtherIcons/downArrow.svg'
import SizedBox from '../../Components/SizedBox/SizedBox'
import Button from '../../Components/Button/Button'
import colors from '../../Constants/colors'

const DeveloperCard = (props) => {

  const getTechnologies = (data) => {
    let result = '';
    Array.isArray(data) && data.forEach(
      (item, index) =>
      (result =
        result +
        item.technologyName +
        (data?.length !== index + 1 && ', '))
    );
    return result;
  };

  return (
    <div className={styles.mainContainer} >

      <div className={styles.nameBar} >
        <div className={styles.name} >{`${props?.data?.developerId?.firstName} ${props?.data?.developerId?.lastName}`}</div>
        <img src={cross} onClick={props.onDelete} style={{ cursor: 'pointer' }} />
      </div>

      <SizedBox height={'16px'} />
      <span className={styles.techLabel} >Techstack</span>
      <div>
        <span className={styles.techDescription} >{getTechnologies(props?.data?.developerId?.developerTechnologies)}</span>
        {/* <span className={styles.viewMore} >View More</span>
        <img src={downArrow} className={styles.downArrow} style={{ cursor: 'pointer' }} /> */}
      </div>

      <SizedBox height={'16px'} />
      <div className={styles.experienceDiv} >
        <div>
          <span className={styles.techLabel} >experience</span>
          <span className={styles.techDescription} >{props?.data?.developerId?.developerExperience}</span>
        </div>
        <div>
          <span className={styles.techLabel} >budget</span>
          <span className={styles.techDescription} >{`₹${props?.data?.developerId?.developerPriceRange}/ month`}</span>
        </div>
      </div>

      <SizedBox height={'12px'} />
      <div className={styles.buttonContainer} >
        <Button
          name={'Accepted'}
          onClick={props.onAccept}
          buttonExtraStyle={{ ...buttonExtraStyle }, { backgroundColor: props.data == 'maq1' ? 'rgba(0, 123, 64, 0.12)' : '#015F9A', border: 'none' }}
          buttonTextStyle={{ ...buttonTextStyle }, { color: props.data == 'maq1' ? '#007B40' : '#ffffff' }}
        />
      </div>

    </div>
  )
}

const buttonExtraStyle = {
  backgroundColor: '#015F9A',
  width: 'min-content',
  padding: '4px 12px 6px 12px',
  borderRadius: '6px'
}

const buttonTextStyle = {
  fontFamily: 'Segoe UI',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center',
  textTransform: 'capitalize',
}

export default DeveloperCard