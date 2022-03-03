import React from 'react'
import Modal from 'react-responsive-modal'
import styles from './DetailsModal.module.css'
import Tag from '../../Components/Tag/Tag'
import SizedBox from '../../Components/SizedBox/SizedBox'

export default function DetailsModal({ open, onCloseModal }) {

  let descrip = 'The user interface (UI) is the point of human-computer interaction and communication in a device.The user interface (UI) is the point of human-computer interaction and communication in a device.'

  return (
    <Modal
      center
      open={open}
      showCloseIcon={false}
      onClose={onCloseModal}
      classNames={{ modal: styles.modalRoot }}
    >
      <div className={styles.modalContainer} >

        <span className={styles.requirementPlaceHolder}>
          your requirement
        </span>

        <SizedBox height={'14px'} />
        <div>
          <span className={styles.requirementTitle}  >
            react js developer
          </span>
        </div>

        <SizedBox height={'12px'} />
        <div className={styles.experienceTag} >
          <span className={styles.experience}>
            experience - 1 year
          </span>
        </div>

        <SizedBox height={'22px'} />
        <div>
          <span className={styles.label} >description</span>
          <SizedBox height={'12px'} />
          <span className={styles.description} >{descrip}</span>
        </div>

        <SizedBox height={'22px'} />
        <div>
          <span className={styles.label} >Skill</span>
          <SizedBox height={'12px'} />
          <div className={styles.tagsContainer} >
            <Tag title={'node js'} />
            <Tag title={'node js'} />
            <Tag title={'node js'} />
            <Tag title={'node js'} />
            <Tag title={'node js'} />
          </div>
        </div>

        <SizedBox height={'22px'} />
        <div className={styles.bugdetAndType} >
          <div>
            <span className={styles.label} >Budget</span>
            <SizedBox height={'12px'} />
            <span className={styles.description} >₹1500-₹3400 per month</span>
          </div>
          <div>
            <span className={styles.label} >Types</span>
            <SizedBox height={'12px'} />
            <span className={styles.description} >6 month contract</span>
          </div>
        </div>

      </div>
    </Modal>
  )
}
