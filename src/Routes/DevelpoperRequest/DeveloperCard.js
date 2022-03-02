import React from 'react'
import styles from './DeveloperCard.module.css'
import cross from '../../assets/images/OtherIcons/crossInCircle.svg'
import downArrow from '../../assets/images/OtherIcons/downArrow.svg'
import SizedBox from '../../Components/SizedBox/SizedBox'
import Button from '../../Components/Button/Button'
import colors from '../../Constants/colors'

const DeveloperCard = (props) => {
  return (
    <div className={styles.mainContainer} >

      <div className={styles.nameBar} >
        <div className={styles.name} >Mujahid AQ</div>
        <img src={cross} onClick={props.onDelete} />
      </div>

      <SizedBox height={'16px'} />
      <span className={styles.techLabel} >Techstack</span>
      <div>
        <span className={styles.techDescription} >Quantum physics, atomic physics, nuclear physics</span>
        <span className={styles.viewMore} >View More</span>
        <img src={downArrow} className={styles.downArrow} />
      </div>

      <SizedBox height={'16px'} />
      <div className={styles.experienceDiv} >
        <div>
          <span className={styles.techLabel} >experience</span>
          <span className={styles.techDescription} >1</span>
        </div>
        <div>
          <span className={styles.techLabel} >budget</span>
          <span className={styles.techDescription} >₹1200000000/ month</span>
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