import React, { useState } from 'react';
import IconNText from '../../Components/IconNText/IconNText';
import Tag from '../../Components/Tag/Tag';
import styles from '../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';
import moneyBag from '../../assets/images/RequirementsListing/noto_money-bag.png';
import clock from '../../assets/images/RequirementsListing/flat-color-icons_clock.png';
import people from '../../assets/images/general/people.svg'
import document from '../../assets/images/RequirementsListing/document.png';
import borderedCircle from '../../assets/images/OtherIcons/borderedCircle.svg';
import './RequirementsCard.css';
import Modal from 'react-responsive-modal';
import SizedBox from '../../Components/SizedBox/SizedBox';
import cross from '../../assets/images/RequirementsListing/boldCancel.png';
import CustomSwitch from '../CustomSwitch/CustomSwitch';
import { CLIENT } from '../../shared/constants';
import instance from '../../Constants/axiosConstants';
import { Switch } from '@mui/material';
import { Bold1420, Medium1014, Medium1624, SemiBold1421 } from '../Text/Texts';
import { Images } from '../../assets/images';
import ButtonOutlined from '../Button/ButtonOutlined';
import colors from '../../Constants/colors.js'


export default function RequirementsList(props) {
  const role = CLIENT;
  let {
    des = '',
    showButton = '',
    buttonTitle = '',
    data = {},
    showToggle,
    isSelected,
    tab,
    showNote,
    onApplyClick = () => { }
  } = props;
  const [open, setOpen] = useState(false);
  const onCloseModal = () => setOpen(false);
  const onOpenModal = (data) => {
    setOpen(true);
  };
  let {
    averageBudget,
    contractPeriod,
    developerExperienceRequired,
    developerTechnologiesRequired,
    numberOfResourcesRequired,
    requirementName,
    isVisible,
    _id,
    client = {}
  } = data;

  const generateBudgetStr = (budget) =>
    !budget?.min
      ? `Less than INR ${budget?.max ?? ''} per month`
      : `INR ${budget?.min ?? ''} - INR ${budget?.max ?? ''} per month`;

  const generateExperienceStr = (exp) =>
    !exp?.min
      ? `Less than ${exp?.max ?? ''}`
      : `${exp?.min ?? ''} - ${exp?.max ?? ''}`;

  const generateResourcesStr = (res) =>
    !res?.min ? `${res}` : `${res?.min ?? ''} - ${res?.max ?? ''}`;

  const handleSwitch = (id, value) => {
    let url = `/api/${role}/hire-developers/update/${id}`;
    let body = {
      isVisible: value ? 2 : 1
    };
    instance.patch(url, body).then(() => {
      window.location.reload();
    });
  }

  return (
    <div
      style={{ borderColor: isSelected ? '#45A4EA' : null }}
      className="requirementCard"
    >
      <div className="headingContainer">
        <div className="titleNTag">
          <span className="headingText">{requirementName || ''}</span>
          <div onClick={() => onOpenModal(des)}>
            <img
              className="documentImg"
              src={document}
              alt="document_icon"
            />
          </div>
          <div className="verticalBar" />
          <span className="tag">{`experience: ${generateExperienceStr(developerExperienceRequired) || ''
            } year`}</span>
        </div>
        <div className='flex' >
          <Bold1420 text={'Tentative Start Date:-\xa0'} />
          <Bold1420 text={'Immediately'} style={{ color: colors.PURPLE_700 }} />
        </div>
      </div>
      <div className="insight">
        <IconNText
          icon={moneyBag}
          text={generateBudgetStr(averageBudget)}
        />
        <div style={{ marginRight: '12px' }} />
        <IconNText
          icon={clock}
          text={`${contractPeriod || ''} month contract`}
        />
        <div style={{ marginRight: '12px' }} />
        <IconNText
          icon={people}
          text={`${generateResourcesStr(numberOfResourcesRequired) || ''
            } resources`}
        />
      </div>
      <SizedBox height={'36px'} />
      <div className='px-4' >
        <Medium1624 text={'Technology Requirement'} />
        <SizedBox height={'14px'} />
        <div className="tagsContainer">
          {developerTechnologiesRequired?.map((tech, index) => (
            <Tag key={tech?._id} title={tech?.technologyName || ''} />
          ))}
        </div>
      </div>

      <SizedBox height={'36px'} />
      <div className='flex justify-between items-center px-4' >
        <div className='flex items-center' >
          <img src={borderedCircle} />
          <SizedBox height={'14px'} width={'14px'} />
          <div>
            <SemiBold1421 text={'Matching Ratio'} />
            <Medium1014
              text={'Your resources mathing ratio is 67% Add more developer to get better chance for onboardings'}
              style={{ color: colors.BLACK_500 }}
            />
          </div>
        </div>
        <ButtonOutlined
          label={'Apply'}
          onClick={() => onApplyClick(_id)}
          style={{ height: '40px', paddingInline: '64px' }}
          medium
        />
      </div>

      <SizedBox height={'30px'} />
      <div
        style={{ background: 'linear-gradient(90deg, #A1C4FD 0%, #C2E9FB 100%)' }}
        className={'h-9 rounded-b-md items-center flex px-8'}
      >
        <img src={Images.halfFilledSuitcase} />
        <SizedBox height={'10px'} width={'10px'} />
        <SemiBold1421 text={'56+ Agencies Review This gig'} />
      </div>

      {/* <Modal
        classNames={{
          modal: 'modalRoot'
        }}
        showCloseIcon={false}
        open={open}
        onClose={onCloseModal}
        center
        styles={{
          closeButton: { outline: 'none' }
        }}
      >
        <div className="modalContainer">
          <div className="modalHeading">
            <div className="modalHeadingGrid1">
              {requirementName || ''}
            </div>
            <img
              onClick={onCloseModal}
              src={cross}
              className="modalCancelButton"
              alt="cross"
            />
          </div>
          <SizedBox height="4px" />
          <div className="modalSubHeading">
            posted by- {client?.firstName || ''}{' '}
            {client?.lastName || ''}
          </div>
          <SizedBox height="32px" />
          <div className="modalJDHeading">job description :</div>
          <SizedBox height="12px" />
          <div className="modalJD">{`${data?.jobDescription || ''
            }`}</div>
          <SizedBox height="30px" />
          <div class="grid-container">
            <div className="grid-item">
              <div className="gridLabel">time period</div>
              <SizedBox height="12px" />
              <div className="gridValue">
                {contractPeriod || ''} month contract{' '}
              </div>
            </div>
            <div className="grid-item">
              <div className="gridLabel">payment</div>
              <SizedBox height="12px" />
              <div className="gridValue">
                {generateBudgetStr(averageBudget) || ''}
              </div>
            </div>
            <div className="grid-item">
              <div className="gridLabel">experience</div>
              <SizedBox height="12px" />
              <div className="gridValue">
                {generateExperienceStr(
                  developerExperienceRequired
                ) || ''}{' '}
                year
              </div>
            </div>
            <div className="grid-item">
              <div className="gridLabel">resources required</div>
              <SizedBox height="12px" />
              <div className="gridValue">
                {numberOfResourcesRequired || ''}
              </div>
            </div>
          </div>
        </div>
      </Modal> */}
      {showToggle &&
        <div className='requirementSwitch' >
          <Switch checked={isVisible} onClick={() => handleSwitch(_id, isVisible)} size="small" />
          <SizedBox width='4px' />
          <p>{isVisible ? 'Active' : 'Inactive'}</p>
        </div>
      }
    </div>
  );
}
