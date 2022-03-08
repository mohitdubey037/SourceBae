import React from 'react'
import Modal from 'react-responsive-modal'
import styles from './DetailsModal.module.css'
import Tag from '../../Components/Tag/Tag'
import SizedBox from '../../Components/SizedBox/SizedBox'

export default function DetailsModal({ data, open, onCloseModal }) {


  const generateBudgetStr = budget => !budget?.min
    ? `Less than INR ${budget?.max ?? ''} per month`
    : `INR ${budget?.min ?? ''} - INR ${budget?.max ?? ''} per month`

  const generateExperienceStr = exp => !exp?.min
    ? `Less than ${exp?.max ?? ''}`
    : `${exp?.min ?? ''} - ${exp?.max ?? ''}`


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
            {data?.requirementName}
          </span>
        </div>

        <SizedBox height={'12px'} />
        <div className={styles.experienceTag} >
          <span className={styles.experience}>
            {`experience: ${generateExperienceStr(data?.developerExperienceRequired) || '0'} year`}
          </span>
        </div>

        <SizedBox height={'22px'} />
        <div>
          <span className={styles.label} >description</span>
          <SizedBox height={'12px'} />
          <span className={styles.description} >{data?.jobDescription}</span>
        </div>

        <SizedBox height={'22px'} />
        <div>
          <span className={styles.label} >Skill</span>
          <SizedBox height={'12px'} />
          <div className={styles.tagsContainer} >
            {
              data?.developerTechnologiesRequired?.map(item => (
                <Tag title={item?.technologyName} />
              ))
            }
          </div>
        </div>

        <SizedBox height={'22px'} />
        <div className={styles.bugdetAndType} >
          <div>
            <span className={styles.label} >Budget</span>
            <SizedBox height={'12px'} />
            <span className={styles.description} >{`₹${data?.averageBudget} per month`}</span>
          </div>
          <div>
            <span className={styles.label} >Types</span>
            <SizedBox height={'12px'} />
            <span className={styles.description} >{`${data?.contractPeriod} month contract`}</span>
          </div>
        </div>

      </div>
    </Modal>
  )
}
