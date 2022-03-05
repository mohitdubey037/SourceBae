
import React from 'react'
import styles from './NoDataComponent.module.css'
import paperPlane from '../../assets/images/DeveloperRequest/paperPlane.svg'
import SizedBox from '../SizedBox/SizedBox'

export default function NoDataComponent({ style }) {
  return (
    <div style={style} className={styles.mainContainer} >
      <img src={paperPlane} style={{ height: '100px', width: '100px' }} />
      <SizedBox height={'20px'} />
      <span className={styles.heading} >Aww shucks</span>
      <SizedBox height={'8px'} />
      <span className={styles.subText} >We can't seem to find what you're looking for. </span>
    </div>
  )
}
