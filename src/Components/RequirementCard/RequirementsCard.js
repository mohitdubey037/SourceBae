import React, { useState } from 'react'
import IconNText from '../../Components/IconNText/IconNText'
import Tag from '../../Components/Tag/Tag'
import styles from '../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css'
import moneyBag from '../../assets/images/RequirementsListing/noto_money-bag.png'
import clock from '../../assets/images/RequirementsListing/flat-color-icons_clock.png'
import people from '../../assets/images/RequirementsListing/people.png'
import document from '../../assets/images/RequirementsListing/document.png'
import './RequirementsCard.css'
import Modal from 'react-responsive-modal'
import SizedBox from '../../Components/SizedBox/SizedBox'
import cross from '../../assets/images/RequirementsListing/boldCancel.png'

export default function RequirementsList({ des, showButton, buttonTitle }) {

  const [open, setOpen] = useState(false);
  const [modalData, setmodalData] = useState(des)

  const onCloseModal = () => setOpen(false);
  const onOpenModal = (data) => {
    setmodalData(preV => data)
    setOpen(true)
  }

  return (
    <div className='requirementCard' >
      <div className='headingContainer' >
        <div className='titleNTag' >
          <text className='headingText' >react js developer</text>
          <div onClick={() => onOpenModal(des)} ><img className='documentImg' src={document} /></div>
          <div className='verticalBar' />
          <text className='tag' >experience: 1 year</text>
        </div>
        <button id={'RequirementsListCTA'} style={{ display: showButton ? 'block' : 'none' }} className={`${styles.L_login} ${styles.nav_Lbutton} ${'RequirementsListCTA'}`} >
          <text>{buttonTitle}</text>
        </button>
      </div>
      <div className='insight' >
        <IconNText icon={moneyBag} text={'INR 1500-3400 per month'} />
        <div style={{ marginRight: '12px' }} />
        <IconNText icon={clock} text={'6 month contract'} />
        <div style={{ marginRight: '12px' }} />
        <IconNText icon={people} text={'2 resources'} />
      </div>
      <div className='tagContainer' >
        <Tag title={'Node JS'} />
        <Tag title={'Node JS'} />
        <Tag title={'Node JS'} />
      </div>

      <Modal classNames={{
        modal: 'modalRoot'
      }} showCloseIcon={false} open={open} onClose={onCloseModal} center>
        <div className='modalContainer' >
          <div className='modalHeading' >
            <div className='modalHeadingGrid1' >requirement posted by- Design chocolate </div>
            <img onClick={onCloseModal} src={cross} className='modalCancelButton' />
          </div>
          <SizedBox height='4px' />
          <div className='modalSubHeading' >react js developer</div>
          <SizedBox height='32px' />
          <div className='modalJDHeading' >Job discription :</div>
          <SizedBox height='12px' />
          <div className='modalJD' >{`${modalData.des}`}</div>
          <SizedBox height='30px' />
          <div class="grid-container">
            <div className="grid-item">
              <div className='gridLabel' >Time period</div>
              <SizedBox height='12px' />
              <div className='gridValue' >6 Month contract </div>
            </div>
            <div className="grid-item">
              <div className='gridLabel' >payment</div>
              <SizedBox height='12px' />
              <div className='gridValue' >₹1500-3400/Month</div>
            </div>
            <div className="grid-item">
              <div className='gridLabel' >Experince</div>
              <SizedBox height='12px' />
              <div className='gridValue' >1 year</div>
            </div>
            <div className="grid-item">
              <div className='gridLabel' >Resources required</div>
              <SizedBox height='12px' />
              <div className='gridValue' >2</div>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  )
}
