
import './NotificationPanel.css';
import instance from "../../Constants/axiosConstants";
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function NotificationPanel(props) {

    console.log(props);

    const Role = localStorage.getItem('role');
    
    const [isNotification, setIsnotification] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    
    useEffect(() => {
        setIsnotification(props.isNotification);
    },[props])

    const notificationPanel = () => {
        setIsnotification(!props.isNotification);
    }

    const handleGetNotification = () => {
        instance.get(`/api/${Role}/notifications/all?type=push`)
            .then(response => {
                setNotificationData(response);
            })
            .catch(err => {
            })
    }

    useEffect(() => {
        handleGetNotification();
    }, [])

    const handleNotificationRead = (id) => {
        console.log(id);
        if (id != undefined) {
            instance.patch(`/api/${Role}/notifications/update`, id)
                .then(response => {
                    handleGetNotification();
                })
                .catch(err => {

                })
        }
        else {
            instance.patch(`/api/${Role}/notifications/update`)
                .then(response => {
                    handleGetNotification();
                })
                .catch(err => {
                })
        }
    }

    return (
        <>
            <div className={isNotification ? 'overlay' : null} ></div>
            <div className={isNotification ? 'notificationPanel open' : 'notificationPanel'}>
                <div className="innerNotificationPanel">
                    <div className="notificationsCards">
                        <div className="close_and_all">
                            <div className="closeNotification">
                                <i onClick={() => notificationPanel(props.isNotification)} className="fa fa-times" aria-hidden="true"></i>
                            </div>
                            <div className="allNotification">
                                {/* <div className="allNotificationText"> */}
                                <p>All Notification</p>
                                {/* </div> */}
                            </div>
                            <div onClick={() => handleNotificationRead()} className="clearAll">
                                <p>Clear All</p>
                            </div>
                        </div>
                        <div className="notificationsCard">
                            {
                                notificationData.length > 0 ?
                                    notificationData.map((nd) => {
                                        return (
                                            <div onClick={() => handleNotificationRead(nd?._id)} className={`notificationPoint ${nd?.isNotificationRead && 'conditionalFilter_Sidebar'}`}>
                                                {/* <div className="notificationPointIn"> */}
                                                <ul>
                                                    <li className={`notificationPointLi ${nd?.isNotificationRead && 'conditionalColor_Sidebar'}`}>
                                                        <p>{nd?.notificationTitle}</p>
                                                        <p>{nd?.notificationData}</p>
                                                    </li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                    :
                                    <div className="no_new_notification">
                                        <p>No New Notification</p>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationPanel;

