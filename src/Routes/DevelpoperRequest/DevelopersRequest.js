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
import { AGENCY } from '../../shared/constants';
import instance from '../../Constants/axiosConstants';
import NoDataComponent from '../../Components/NoData/NoDataComponent';
import Spinner from '../../Components/Spinner/Spinner';


let page = 1
const DevelopersRequest = () => {

  const clientId = localStorage.getItem('userId') || '';
  const [nextPage, setnextPage] = useState(page)
  const [modalData, setmodalData] = useState({})
  const [confirmationModalType, setconfirmationModalType] = useState('');
  const [fetchedDevelopers, setfetchedDevelopers] = useState([])
  const [isLoading, setisLoading] = useState(false)

  const role = AGENCY;

  useEffect(() => {
    hireDevApi()
  }, [])


  const hireDevApi = async () => {
    setisLoading(true)
    // const url = `/api/${role}/hire-developers/all`;
    const url = `/api/client/hire-developers/all?clientId=61e541916343484c6752efc0&page=${nextPage}`;
    let params = {
      clientId,
      page: nextPage
    }
    instance
      .get(url)
      .then((res) => {
        setfetchedDevelopers([...fetchedDevelopers, ...res?.docs])
        setnextPage(res?.nextPage)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setisLoading(false));
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
                      {/* <div className={styles.showMorebtn}>
                      <Button
                        onClick={() => { }}
                        name={'Load More'}
                        buttonExtraStyle={buttonExtraStyle}
                        buttonTextStyle={buttonTextStyle}
                      />
                    </div> */}
                    </ListingContainer>
                  </>
                ))
                :
                <NoDataComponent />
            }
            <div className={styles.showMorebtn}>
              {
                nextPage &&
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
    </div >
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
