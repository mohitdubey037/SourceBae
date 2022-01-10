import './NotificationPanel.css';
import instance from "../../Constants/axiosConstants";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'

function NotificationPanel(props) {
    const Role = localStorage.getItem('role');

    const dispatch = useDispatch();
    const isNotification = useSelector((state) => state.showNotification);

    const [notificationData, setNotificationData] = useState([]);
   
    const handleShowNotification = () => {
        dispatch({type: 'SHOW_NOTIFICATION'});
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
        const body = {
            id
        }
        if (id != undefined) {
            instance.patch(`/api/${Role}/notifications/update`, body)
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
            <div onClick={handleShowNotification} className={isNotification.show_notification ? 'overlay' : null} ></div>
            <div className={isNotification.show_notification ? 'notificationPanel open' : 'notificationPanel'}>
                <div className="innerNotificationPanel">
                    <div className="notificationsCards">
                        <div className="close_and_all">
                            <div className="closeNotification">
                                <i onClick={handleShowNotification} className="fa fa-times" aria-hidden="true"></i>
                            </div>
                            <div className="allNotification">
                                <p>All Notification</p>
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

