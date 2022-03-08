import React, { useEffect, useState } from 'react';
import Back from '../../Components/Back/Back';
import Navbar from '../../Components/ClientNewestDashboard/Navbar/Navbar';
import styles from './DeveloperRequest.module.css';
import document from '../../assets/images/OtherIcons/detail.svg';
import SizedBox from '../../Components/SizedBox/SizedBox';
import DeveloperCard from './DeveloperCard';
import Button from '../../Components/Button/Button';
import DetailsModal from './DetailsModal';
import ConfirmationModal from './ConfirmationModal';
import { ACCEPT, DELETE } from './types';
import { AGENCY, CLIENT } from '../../shared/constants';
import instance from '../../Constants/axiosConstants';
import NoDataComponent from '../../Components/NoData/NoDataComponent';
import Spinner from '../../Components/Spinner/Spinner';


let page = 1
const DevelopersRequest = () => {

  const id = localStorage.getItem('userId') || '';
  const role = localStorage.getItem('role') || '';
  const [nextPage, setnextPage] = useState(page)
  const [modalData, setmodalData] = useState({})
  const [confirmationModalType, setconfirmationModalType] = useState('');
  const [fetchedDevelopers, setfetchedDevelopers] = useState([])
  const [isLoading, setisLoading] = useState(false)
  const [selectedDevs, setselectedDevs] = useState([])

  // const role = CLIENT;

  useEffect(() => {
    hireDevApi()
  }, [])

  const hireDevApi = async () => {
    setisLoading(true)
    const url = `/api/${role}/hire-developers/all?clientId=${id}`;
    instance
      .get(url)
      .then((res) => {
        const sharedDevsEntryOnly = res?.docs?.filter(item => item?.developersShared?.length)
        setfetchedDevelopers([...fetchedDevelopers, ...sharedDevsEntryOnly])
        setnextPage(res?.nextPage)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setisLoading(false));
  };

  const acceptMyDevsPatchCall = async (id) => {
    let url = `/api/${role}/hire-developers/share-developer/${id}`;
    let body = {
      clientId: id,
      developerIds: selectedDevs,
      developerStatus: '3'
    };
    instance
      .patch(url, body)
      .then((res) => { console.log(res, 'dfdgsddffdggs') })
      .catch((err) => console.log(err, 'u8r9we89fsa89d9'));
  };

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
    <div>
      <div className={styles.navbarDiv}>
        <Navbar />
      </div>
      <Back name={'Developer Request'} />

      {
        isLoading && (nextPage === 1)
          ? <Spinner />
          : <div className={styles.ListingContainer}>
            {
              fetchedDevelopers?.length
                ?
                fetchedDevelopers?.map((devs, index) => (
                  <>
                    <SizedBox height={'80px'} />
                    <ListingContainer
                      header={devs?.requirementName}
                      onClick={() => setmodalData(devs)}
                    >
                      <DeveloperListingTag label={'developer listing:'} />
                      <SizedBox height={'20px'} />
                      {
                        devs?.developersShared?.length
                          ?
                          <div className={styles.cardHolder}>
                            {devs?.developersShared?.map((item) => (
                              <div className={styles.cardContainer}>
                                <input type="checkbox" onChange={() => selectedMyDev(item?.developerId?._id)} />
                                <DeveloperCard
                                  data={item}
                                  onDelete={() =>
                                    setconfirmationModalType(DELETE)
                                  }
                                  onAccept={() =>
                                    setconfirmationModalType(ACCEPT)
                                  }
                                />
                              </div>
                            ))}
                          </div>
                          :
                          <div className={styles.noDevsShared} >No developers shared yet:(</div>
                      }
                      <div onClick={() => acceptMyDevsPatchCall(devs?._id)} >Apply</div>
                    </ListingContainer>
                  </>
                ))
                :
                <NoDataComponent heading={''} text={"Seems like you haven't shared any developers yet!"} />
            }
            <div className={styles.showMorebtn}>
              {
                !!fetchedDevelopers?.length && nextPage &&
                (
                  isLoading
                    ? <Spinner style={{ height: '60px' }} />
                    : <Button
                      name={'Load More'}
                      onClick={hireDevApi}
                      buttonExtraStyle={buttonExtraStyle}
                      buttonTextStyle={buttonTextStyle}
                    />
                )
              }
            </div>
          </div>
      }

      <DetailsModal data={modalData} open={Object.keys(modalData).length} onCloseModal={() => setmodalData({})} />

      <ConfirmationModal
        type={confirmationModalType}
        onCloseModal={() => setconfirmationModalType('')}
      />
    </div>
  );
};

const ListingContainer = (props) => (
  <div className={styles.RLContainer}>
    {props.children}
    <div className={styles.listingHeader}>
      {props.header}
      <img
        src={document}
        onClick={props.onClick}
        className={styles.headerIcon}
        alt="document"
      />
    </div>
  </div>
);

const buttonExtraStyle = {
  background: 'rgba(1, 95, 154, 0.12)',
  borderRadius: '6px',
  border: 'none',
  width: '100px',
  margin: '16px'
};

const buttonTextStyle = {
  fontFamily: 'Segoe UI',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '16px',
  letterSpacing: '0.4px',
  textTransform: 'capitalize',
  color: '#015F9A'
};

const DeveloperListingTag = ({ label }) => (
  <div>
    <span className={styles.listingLabel}>{label}</span>
  </div>
);


export default DevelopersRequest;
