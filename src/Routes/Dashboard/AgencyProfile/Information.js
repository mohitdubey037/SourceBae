import React, { useState } from 'react';
import './Information.css';
import moment from 'moment';
import instance from '../../../Constants/axiosConstants';
import { AGENCY } from '../../../shared/constants';
import * as helper from '../../../shared/helper';
import { toast } from 'react-toastify';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@material-ui/core/TextField';
function Information(props) {
    const Role = localStorage.getItem('role');
    const day = moment(`${props?.data?.incorporationDate}`).format(
        'MM-DD-YYYY'
    );

    const handleErrorsValidation = (url) => {
        if (!helper.validateLink(url)) {
            toast.error('Incorrect url provided.');
            return false;
        } else {
            return true;
        }
    };

    const [arr, setArr] = useState([
        {
            title: 'Agency Name',
            inputValue: `${props?.data.agencyName}`,
            disabled: false
        },
        {
            title: 'Date of Incorporation',
            inputValue: `${day}`,
            disabled: false
        },
        {
            title: 'Director Name',
            inputValue: `${props?.data?.ownerName}`,
            disabled: false
        },
        {
            title: 'Agency Email Id',
            inputValue: `${props.data.agencyEmail}`,
            disabled: props?.id ? true : false
        },
        {
            title: 'Agency Website',
            inputValue: `${props?.data?.socialPlatformDetails[0]?.platformLink}`,
            disabled: false
        },
        {
            title: 'Team Size',
            inputValue: `${props?.data?.agencyTeamSize}`,
            disabled: false
        },
        {
            title: 'Fixed Budget',
            inputValue: `${props?.data?.agencyMonthlyBudget}₹-${
                props?.data?.agencyMonthlyBudget + 2 * 1000
            }₹`,
            disabled: props?.id ? true : false
        },
        {
            title: 'Contact Number',
            inputValue: `${props?.data?.agencyPhone}`,
            disabled: props?.id ? true : false
        }
    ]);

    const [inDate, setInDate] = useState(new Date());
    const [isDisabled, setIsdisabled] = useState(true);

    const handleDisabled = () => {
        setIsdisabled(false);
    };
    const handleDisabledSave = () => {
        setIsdisabled(true);
        updateAgency();
    };

    const handleDisabledCancel = () => {
        setIsdisabled(true);
    };

    const permanentDisable = (name) => {
        if (
            name === 'Director Name' ||
            name === 'Agency Website' ||
            name === 'Team Size' ||
            name === 'Date of Incorporation'
        ) {
            return false;
        } else return true;
    };
    const handleChange = (event) => {
        let { name, value } = event.target;
        let temp = [...arr];
        let index = temp.findIndex((item) => item.title === name);
        if (name === 'Team Size') {
            if (helper.noTextNumber(value) && value.length <= 3) {
                temp[index].inputValue = value;
            } else {
                return;
            }
        }
        temp[index].inputValue = value;
        setArr(temp);
    };

    React.useEffect(() => {
        let temp = [...arr];
        let index = temp.findIndex(
            (item) => item.title === 'Date of Incorporation'
        );
        arr[index].inputValue = moment(inDate).format('YYYY-MM-DD');
        setArr(temp);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inDate]);

    const updateAgency = () => {
        const ay = arr.find((a) => a.title === 'Agency Website');
        if (handleErrorsValidation(ay.inputValue) === true) {
            const id = localStorage.getItem('userId');
            instance.patch(`/api/${Role}/agencies/update/${id}`, {
                agencyTeamSize: arr[5].inputValue,
                ownerName: arr[2].inputValue,
                agencyEmail: arr[3].inputValue,
                socialPlatformDetails: [
                    {
                        platformName: 'website',
                        platformLink: arr[4].inputValue
                    }
                ],
                incorporationDate: moment(inDate).format('YYYY-MM-DD')
            });
        }
    };
    return (
        <>
            <div className="mainInformation">
                <div className="innerInformation">
                    {Role === AGENCY
                        ? props.data.isAgencyVerified && (
                              <div className="editableBtn">
                                  <div className="information_parent">
                                      {/* <img src={Information_edit} alt="information_edit" /> */}
                                      <p>INFORMATION</p>
                                  </div>
                                  <i
                                      onClick={handleDisabled}
                                      class="fa fa-pencil-square-o Edit-icon_information"
                                      aria-hidden="true"
                                  ></i>
                              </div>
                          )
                        : null}
                    <div className="informationForm">
                        <div className="informationInputForm">
                            {/* <span className="informationBorder"></span> */}
                            {arr.map((value, index) => {
                                if (!value.disabled) {
                                    return (
                                        <div
                                            className="informationTitle"
                                            key={index}
                                        >
                                            <ul>
                                                <li>{value?.title}</li>
                                            </ul>
                                            {value.title ===
                                                'Date of Incorporation' &&
                                            !isDisabled ? (
                                                <LocalizationProvider
                                                    dateAdapter={AdapterDateFns}
                                                    style={{
                                                        display: 'flex',
                                                        flexDirection: 'column'
                                                    }}
                                                >
                                                    <DesktopDatePicker
                                                        inputFormat="dd/MM/yyyy"
                                                        value={inDate}
                                                        style={{ width: '1px' }}
                                                        onChange={(event) => {
                                                            setInDate(event);
                                                        }}
                                                        renderInput={(
                                                            params
                                                        ) => (
                                                            <TextField
                                                                style={{
                                                                    width: '20rem',
                                                                    outline:
                                                                        'none',
                                                                    border: 'none'
                                                                }}
                                                                {...params}
                                                                onKeyDown={(
                                                                    e
                                                                ) =>
                                                                    e.preventDefault()
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </LocalizationProvider>
                                            ) : (
                                                <input
                                                    style={{
                                                        outline: isDisabled
                                                            ? 'none'
                                                            : 'none',
                                                        border:
                                                            permanentDisable(
                                                                value?.title
                                                            ) || isDisabled
                                                                ? 'none'
                                                                : '1px solid #02044a'
                                                    }}
                                                    disabled={
                                                        permanentDisable(
                                                            value?.title
                                                        ) || isDisabled
                                                    }
                                                    type="text"
                                                    value={value?.inputValue}
                                                    name={value?.title}
                                                    onChange={(event) =>
                                                        handleChange(event)
                                                    }
                                                    id=""
                                                />
                                            )}
                                        </div>
                                    );
                                } else return '';
                            })}
                        </div>
                    </div>
                </div>
                {isDisabled ? null : (
                    <div className="handleButtons">
                        <div className="information_save_parent">
                            <div
                                onClick={handleDisabledCancel}
                                className="information_cancel"
                            >
                                <p>Cancel</p>
                            </div>
                        </div>
                        <div className="information_save_parent">
                            <div
                                onClick={handleDisabledSave}
                                className="information_save"
                            >
                                <p>Submit</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Information;
