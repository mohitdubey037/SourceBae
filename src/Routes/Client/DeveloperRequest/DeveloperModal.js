/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import SizedBox from '../../../Components/SizedBox/SizedBox';
import instance from '../../../Constants/axiosConstants';
import { CLIENT } from '../../../shared/constants';
import ConfirmationModal from './ConfirmationModal';
import DeveloperCard from './DeveloperCard';
import styles from './DeveloperModal.module.css';
import infoIcon from './informationNew.svg';
import { ACCEPT, DELETE } from './types';
import { toast } from 'react-toastify';
import Select from 'react-select'

let limitReached = false;
export default function DeveloperModal({ modal, onCloseModal, selectedCard, tab }) {

  let allDeveloper = modal?.data?.developersShared
  const [developerIds, setDeveloperIds] = useState([]);
  const [confirmationModalType, setconfirmationModalType] = useState('');
  const [developersData, setdevelopersData] = useState([])
  const [allTechnologies, setallTechnologies] = useState([])
  const [selectedTechnology, setselectedTechnology] = useState([])

  const fetchTechnologies = () => {
    let url = `/api/${role}/technologies/all`
    instance.get(url)
      .then((res) => {
        let _temp = []
        res?.forEach(item => {
          _temp.push({
            label: item?.technologyName,
            value: item?._id
          })
        })
        setallTechnologies(_temp)
      })
      .catch((err) => {
        console.log(err)
      });
  }

  useEffect(() => {
    fetchTechnologies()
  }, [])


  const role = CLIENT;

  let requiredResources = modal?.data?.numberOfResourcesRequired;
  //if developerStatus = 3 then it means required resource is accepted

  const selectedMyDev = (newDevId, doAdd) => {

    limitReached = false;
    let updatedDev = []
    if (doAdd) {
      let acceptedDevs = developerIds?.filter(
        (item) => item.developerStatus === 3
      );

      if (acceptedDevs?.length >= requiredResources) {
        toast.error(
          'Only ' + requiredResources + ' developers are required'
        );
        limitReached = true;
        updatedDev = developerIds
        return;
      }
      updatedDev = developerIds?.map((item) => {
        if (item.developerId === newDevId) {
          if (item.developerStatus === 1 || item.developerStatus === 2) {
            item.developerStatus = 3;
            item.isUpdated = true
          } else {
            item.developerStatus = 1;
            delete item?.isUpdated
          }
        }

        return item;
      });
    } else {
      updatedDev = developerIds?.map((item) => {
        if (item.developerId === newDevId) {
          if (item.developerStatus === 1 || item.developerStatus === 2) {
            item.developerStatus = 3;
            item.isUpdated = true
          } else {
            item.developerStatus = 1;
            delete item?.isUpdated
          }
        }

        return item;
      });
    }

    setDeveloperIds(updatedDev);
  };


  useEffect(() => {
    requiredResources = modal?.data?.numberOfResourcesRequired;
  }, [modal?.data?.numberOfResourcesRequired]);
  useEffect(() => {
    setDeveloperIds(
      allDeveloper?.map((item) => ({
        developerStatus: item?.developerStatus,
        developerId: item?.developerId?._id,
        agencyId: item?.agencyId
      }))
    );
    tab !== 2
      ? setdevelopersData(() => allDeveloper?.filter(ele => ele?.developerStatus !== 3))
      : setdevelopersData(() => allDeveloper?.filter(ele => (ele?.developerStatus === 3 || ele.developerStatus === 1)))
  }, [allDeveloper]);


  const acceptMyDevsPatchCall = async () => {
    let url = `/api/${role}/hire-developers/share-developer/${selectedCard}`;
    let body = {
      updateStatusByClient: '1',
      developerIds: developerIds
    };
    instance.patch(url, body).then(() => {
      window.location.reload();
    });
  };

  function checkedOrNot(developerId) {
    let checked = false;
    if (!limitReached)
      developerIds?.forEach((item) => {
        if (item.developerId === developerId) {
          if (item.developerStatus === 3) {
            checked = true;
          }
        }
      });

    return checked;
  }

  const filterDevsOnTech = (tech) => {

    if (!tech) return tab !== 2
      ? setdevelopersData(() => allDeveloper?.filter(ele => ele?.developerStatus !== 3))
      : setdevelopersData(() => allDeveloper?.filter(ele => (ele?.developerStatus === 3 || ele.developerStatus === 1)))

    let _temp = developersData?.filter(item => item?.developerId?.developerTechnologies.some(ele => ele?.technologyName == tech.label))
    setdevelopersData(_temp)
  }

  return (
    <Modal
      center
      open={modal?.open}
      showCloseIcon={false}
      onClose={() => { onCloseModal(); setselectedTechnology([]) }}
      classNames={{ modal: styles.modalRoot }}
      styles={{
        closeButton: { outline: 'none' }
      }}
    >
      <div className={styles.modalContainer}>
        <div className={styles.header_holder}>
          <DeveloperListingTag label={'developer listing:'} />
          {developersData?.length > 0 && (
            <button
              className={styles.apply_now}
              onClick={() => setconfirmationModalType(ACCEPT)}
            >
              Accept
            </button>
          )}
        </div>
        <div className='w-1/4 mb-3' >
          <Select
            options={allTechnologies}
            placeholder={"Technologies"}
            value={selectedTechnology}
            onChange={tech => {
              setselectedTechnology(tech)
              filterDevsOnTech(tech || null)
            }}
            isClearable
          />
        </div>

        <SizedBox height={'20px'} />
        {developersData?.length ? (
          <div className={styles.cardHolder}>
            {developersData?.map((item) => {
              const isNotShortlistedByClient =
                item?.developerSharedBy === 2 ? false : true;

              let titleText = '';
              if (item?.developerSharedBy === 2) {
                if (item?.isAnswered) {
                  if (item?.developerStatus === 1)
                    titleText =
                      'Agency rejected';
                  else if (item?.developerStatus === 3)
                    titleText =
                      'Agency accepted';
                } else {
                  if (item?.isAnswered === false)
                    if (item?.developerStatus === 2)
                      titleText =
                        "Waiting for Agency's response";
                }
              }
              let isChecked = checkedOrNot(
                item?.developerId?._id
              );
              return (
                <div className={styles.cardContainer}>
                  {isNotShortlistedByClient ? (
                    <input
                      type="checkbox"
                      onChange={() =>
                        selectedMyDev(
                          item?.developerId?._id,
                          !isChecked
                        )
                      }
                      className={
                        styles.developer_checkbox
                      }
                      checked={isChecked}
                    />
                  ) : (
                    <span
                      className={
                        styles.developer_checkbox
                      }
                      title={titleText}
                    >
                      {' '}
                      <img
                        width={20}
                        src={infoIcon}
                        alt=""
                      />
                    </span>
                  )}
                  <DeveloperCard
                    data={item}
                    developerIds={developerIds}
                    onDelete={() =>
                      setconfirmationModalType(DELETE)
                    }
                    onAccept={() =>
                      setconfirmationModalType(ACCEPT)
                    }
                    titleText={titleText}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.noDevsShared}>
            No developers shared yet:
          </div>
        )}
      </div>

      <ConfirmationModal
        type={confirmationModalType}
        onAffirmation={() =>
          confirmationModalType === ACCEPT
            ? acceptMyDevsPatchCall()
            : {}
        }
        onCloseModal={() => setconfirmationModalType('')}
      />
    </Modal>
  );
}

export const DeveloperListingTag = ({ label }) => (
  <div>
    <span className={styles.listingLabel}>{label}</span>
  </div>
);
