import './NotificationPanel.css';
import instance from '../../Constants/axiosConstants';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined';

function NotificationPanel(props) {
    const Role = localStorage.getItem('role');

    const dispatch = useDispatch();
    const isNotification = useSelector((state) => state.showNotification);

    const [notificationData, setNotificationData] = useState([]);

    const handleShowNotification = () => {
        dispatch({ type: 'SHOW_NOTIFICATION' });
    };

    const handleGetNotification = () => {
        instance
            .get(`/api/${Role}/notifications/all`)
            .then((response) => {
                setNotificationData(response);
            })
            .catch((err) => {});
    };

    useEffect(() => {
        handleGetNotification();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleNotificationRead = (id) => {
        const body = {
            id
        };
        if (id !== undefined) {
            instance
                .patch(`/api/${Role}/notifications/update`, body)
                .then((response) => {
                    handleGetNotification();
                })
                .catch((err) => {});
        } else {
            instance
                .patch(`/api/${Role}/notifications/update`)
                .then((response) => {
                    handleGetNotification();
                })
                .catch((err) => {});
        }
    };

    return (
        <>
            <div
                onClick={handleShowNotification}
                className={isNotification.show_notification ? 'overlay' : null}
            ></div>
            <div
                className={
                    isNotification.show_notification
                        ? 'notificationPanel open'
                        : 'notificationPanel'
                }
            >
                <div className="innerNotificationPanel">
                    <div className="notificationsCards">
                        <div className="close_and_all">
                            <div className="closeNotification">
                                <i
                                    onClick={handleShowNotification}
                                    className="fa fa-times"
                                    aria-hidden="true"
                                ></i>
                            </div>
                            <div className="allNotification">
                                <p>All Notification</p>
                            </div>
                            <div
                                onClick={() => handleNotificationRead()}
                                className="clearAll"
                            >
                                <p>Read All</p>
                            </div>
                        </div>
                        <div className="notificationsCard">
                            {notificationData.length > 0 ? (
                                notificationData.map((nd) => {
                                    return (
                                        <Accordion
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            expandIcon={<ExpandMoreIcon />}
                                            // onClick={() =>
                                            //     handleNotificationRead(nd?._id)
                                            // }
                                            // className={`notificationPoint ${
                                            //     nd?.isNotificationRead &&
                                            //     'conditionalFilter_Sidebar'
                                            // }`}
                                            // style={{
                                            //     display: 'flex',
                                            //     flexDirection: 'column'
                                            // }}
                                        >
                                            <AccordionSummary
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography
                                                    style={{ fontSize: '14px' }}
                                                >
                                                    {nd?.notificationTitle}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    <p
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'column'
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: nd?.notificationData
                                                        }}
                                                    />
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    );
                                })
                            ) : (
                                <div className="no_new_notification">
                                    <p>
                                        Nothing here yet! Please Check again
                                        later!.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotificationPanel;
