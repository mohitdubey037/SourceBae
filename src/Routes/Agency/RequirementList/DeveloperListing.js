import React from 'react'
import styles from './DeveloperListing.module.css'
import Button from '../../../Components/Button/Button'
import SizedBox from '../../../Components/SizedBox/SizedBox';
import buttonStyles from '../../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css'

function DeveloperListing() {
  return (
    <div className={styles.developerListingContainer} >
      <text className={styles.heading} >developer listing</text>
      {Array(3).fill('maq')?.map(item => <DeveloperListinagCard />)}
      <SizedBox height={'33px'} />
      <div style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }} >
        <button className={`${buttonStyles.L_login} ${buttonStyles.nav_Lbutton} ${styles.applyBtn}`} >
          <text>Apply</text>
        </button>
      </div>
      <SizedBox height={'16px'} />
    </div>
  )
}

export const DeveloperListinagCard = () => (
  <div className={styles.DLCard} >
    <SizedBox height={'6px'} />
    <div className={styles.nameContainer} >
      <text className={styles.name} >Mujahid AQ</text>
      <input type={'checkbox'} ico />
    </div>
    <SizedBox height={'6px'} />
    <text className={styles.techText} >quantum, atomic, nuclear </text>
    <SizedBox height={'10px'} />
    <text className={styles.experienceText} >experience- 3+ years</text>
    <SizedBox height={'24px'} />
    <div style={{ pointerEvents: 'inherit' }} >
      <Button name='View Resume' buttonExtraStyle={{ borderColor: '#45A4EA', width: '110px' }} buttonTextStyle={buttonTextStyle} />
    </div>
  </div>
)

export const buttonTextStyle = ({
  fontFamily: 'Segoe UI',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '19px',
  textTransform: 'capitalize',
  color: '#45A4EA'
})

export default DeveloperListing