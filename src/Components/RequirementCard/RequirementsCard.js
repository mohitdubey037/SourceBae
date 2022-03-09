import React, { useState } from 'react';
import IconNText from '../../Components/IconNText/IconNText';
import Tag from '../../Components/Tag/Tag';
import styles from '../../Routes/MainLandingPage/Components/Navbar/LNavbar.module.css';
import moneyBag from '../../assets/images/RequirementsListing/noto_money-bag.png';
import clock from '../../assets/images/RequirementsListing/flat-color-icons_clock.png';
import people from '../../assets/images/RequirementsListing/people.png';
import document from '../../assets/images/RequirementsListing/document.png';
import './RequirementsCard.css';
import Modal from 'react-responsive-modal';
import SizedBox from '../../Components/SizedBox/SizedBox';
import cross from '../../assets/images/RequirementsListing/boldCancel.png';

export default function RequirementsList(props) {
    let {
        des = '',
        showButton = '',
        buttonTitle = '',
        data = {},
        isSelected,
        onApplyClick = () => {}
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
                    <span className="tag">{`experience: ${
                        generateExperienceStr(developerExperienceRequired) || ''
                    } year`}</span>
                </div>
                <button
                    onClick={() => onApplyClick(_id)}
                    id={'RequirementsListCTA'}
                    style={{ display: showButton ? 'block' : 'none' }}
                    className={`${styles.L_login} ${
                        styles.nav_Lbutton
                    } ${'RequirementsListCTA'}`}
                >
                    <span>{buttonTitle}</span>
                </button>
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
                    text={`${
                        generateResourcesStr(numberOfResourcesRequired) || ''
                    } resources`}
                />
            </div>
            <div className="tagsContainer">
                {developerTechnologiesRequired?.map((tech, index) => (
                    <Tag key={tech?._id} title={tech?.technologyName || ''} />
                ))}
            </div>

            <Modal
                classNames={{
                    modal: 'modalRoot'
                }}
                showCloseIcon={false}
                open={open}
                onClose={onCloseModal}
                center
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
                    <div className="modalJD">{`${
                        data?.jobDescription || ''
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
                                ₹{averageBudget || ''}/month
                            </div>
                        </div>
                        <div className="grid-item">
                            <div className="gridLabel">experience</div>
                            <SizedBox height="12px" />
                            <div className="gridValue">
                                {developerExperienceRequired || ''} year
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
            </Modal>
        </div>
    );
}
