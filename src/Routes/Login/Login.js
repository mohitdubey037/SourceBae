/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../Login/login.css';
import { useParams } from 'react-router';
import instance from '../../Constants/axiosConstants';
import { logoURL } from '../../Constants/logoLink';
import axios from 'axios';
import downImage1_agency from '../../assets/images/Newestdashboard/Login/Path11.svg';
import downImage2_agency from '../../assets/images/Newestdashboard/Login/Path12.svg';
import upImage1_agency from '../../assets/images/Newestdashboard/Login/Path13.svg';
import upImage2_agency from '../../assets/images/Newestdashboard/Login/Path14.svg';
import downImage1_client from '../../assets/images/Newestdashboard/Login/Path11_client.svg';
import downImage2_client from '../../assets/images/Newestdashboard/Login/Path12_client.svg';
import upImage1_client from '../../assets/images/Newestdashboard/Login/Path13_client.svg';
import upImage2_client from '../../assets/images/Newestdashboard/Login/Path14_client.svg';
import dotImage from '../../assets/images/Newestdashboard/Login/ab_01.png';
import googleImg from '../../assets/images/Newestdashboard/Login/Icon_google.svg';

import { InputAdornment, TextField } from '@material-ui/core';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import Spinner from '../../Components/Spinner/Spinner';
import cookie from 'react-cookies';
import SizedBox from '../../Components/SizedBox/SizedBox'
import ButtonFilled from '../../Components/Button/ButtonFilled'
import ButtonOutlined from '../../Components/Button/ButtonOutlined'
import firebase from '../../firebase';
import { CLIENT, AGENCY, CONTENT } from '../../shared/constants';
import { toast } from 'react-toastify';
import {
  AGENCYROUTES,
  CLIENTROUTES,
  USERROUTES
} from '../../Navigation/CONSTANTS';

import * as mui from '././../../shared/muiConstants';
import HalfCard from '../../Components/HalfCard/HalfCard';
import { Bold1827, Bold3248, SemiBold1624, Regular1624, Regular1218 } from '../../Components/Text/Texts';
import colors from '../../Constants/colors';
import { Images } from '../../assets/images';

const { useStyles } = mui;

const Login = (props) => {
  const logoLink =
    'https://sourcebae.s3.amazonaws.com/image/1638354759751.svg';

  let isRequirement = props?.location?.state?.isAgencyRequirement;

  const classes = useStyles();
  let { role } = useParams();
  let { roles } = props;
  if (!role) {
    role = roles;
  }
  if (!(role === AGENCY || role === CLIENT))
    props.history.replace(USERROUTES.NOT_FOUND);

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState('');
  const [hidePassword, SetPasswordStatus] = useState(true);
  const [form, setForm] = useState({
    user: '',
    password: ''
  });

  const [token, setToken] = useState(null);
  const [device_token, setDevice_token] = useState('');

  useEffect(() => {
    if (window.Notification.permission === 'granted') {
      const messaging = firebase.messaging();
      messaging.getToken().then((token) => {
        setDevice_token(token);
      });
    }
  }, []);

  useEffect(() => {
    if (state !== '') {
      if (state === CLIENT) {
        props.history.push(CLIENTROUTES.LOGIN);
      } else if (state === AGENCY) {
        props.history.push(AGENCYROUTES.LOGIN);
      }
    }
  }, [state]);

  const showPassword = (e) => {
    SetPasswordStatus((prevCheck) => !prevCheck);
  };

  const handleChangeToggle = (name) => {
    setState(name);
  };

  //Methods

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === 'user') {
      setForm({
        ...form,
        [name]: value
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleImageClick = () => {
    window.location.href = '/';
  };

  const logIn = async (event) => {
    event.preventDefault();
    if (form.user === '' || form.password === '') {
      toast.error('Username and Password are required');
      return;
    }
    let apiRole = role;

    instance
      .post(`/api/${apiRole}/auths/login`, {
        ...form,
        notificationDeviceToken: device_token
      })
      .then(function (response) {
        cookie.save('Authorization', `Bearer ${response.accessToken}`, {
          path: '/'
        });
        setToken(cookie.load('Authorization'));
        localStorage.setItem('role', role);
        localStorage.setItem('userId', `${response._id}`);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `${token}`;
      if (role === AGENCY) {
        setLoading(false);
        if (isRequirement)
          props.history.push(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
        else props.history.replace(AGENCYROUTES.DASHBOARD);
      } else if (role === CLIENT) {
        setLoading(false);
        props.history.push(CLIENTROUTES.DASHBOARD);
      } else {
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    const tempRole = localStorage.getItem('role');
    const auth = cookie.load('Authorization');
    if (
      auth !== null &&
      auth !== undefined &&
      tempRole !== null &&
      tempRole !== undefined
    ) {
      if (tempRole === AGENCY) {
        props.history.replace(AGENCYROUTES.DASHBOARD);
      } else if (tempRole === CLIENT) {
        props.history.replace(CLIENTROUTES.DASHBOARD);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onForgotPassword = () => props.history.push(`/enter-email/${role}`)

  return (
    <div className='flex' >
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex w-full h-full">
          <div className='flex w-1/2 h-100vh' >
            <HalfCard />
          </div>
          <div className='flex flex-col w-1/2 h-100vh p-3' >

            <div className='flex justify-between items-center' >
              <div style={{ height: '100px', width: '250px' }} >
                <img src={Images.sourceBaeLogo} alt="logo" />
              </div>
              <div className='flex mr-4 mt-4' >
                <Bold1827 text={'Login As\xa0'} />
                <Bold1827 text={`${role === 'agency' ? 'an\xa0' + role : 'a\xa0' + role}`} style={{ textTransform: 'capitalize', color: colors.PRIMARY_PINK }} />
              </div>
            </div>

            <SizedBox height={'3%'} />
            <div className='flex justify-center' >
              <Bold3248 text='Welcome!' />
            </div>

            <SizedBox height={'8%'} />
            <div className='flex justify-center'>
              <div className='w-4/5 bg-f9f9f9 border rounded-md border-1e1e1e items-center justify-center flex p-3' >
                <img src={Images.googleLogo} height='24px' width='24px' />
                <SemiBold1624 text='Login with Google' style={{ color: 'rgba(29, 36, 52, 0.7)', marginLeft: '8px' }} />
              </div>
            </div>

            <SizedBox height={'6%'} />
            <div className='flex justify-center items-center' >
              <div className='border-b border-black w-1/5' />
              <SizedBox width={'30px'} />
              <Regular1624 text={'Or'} style={{ color: colors.PRIMARY_PINK }} />
              <SizedBox width={'30px'} />
              <div className='border-b border-black w-1/5' />
            </div>

            <div >
              <form
                onSubmit={logIn}
                style={{ marginTop: '6%' }}
                className="loginForm"
              >
                <div className='w-4/5 relative' >
                  <input
                    type="text"
                    name="user"
                    id="filled-number"
                    placeholder='Enter Email Id'
                    className='bg-f9f9f9 w-full border border-1e1e1e rounded-md p-3'
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <img
                    src={Images.person} alt="perso"
                    className='absolute top-1/3 right-4 h-5 w-5'
                  />
                </div>

                <SizedBox height='22px' />
                <div className='w-4/5 relative' >
                  <input
                    type={hidePassword ? 'password' : 'text'}
                    name="password"
                    id="filled-number"
                    placeholder='Enter Password'
                    className='bg-f9f9f9 w-full border border-1e1e1e rounded-md p-3'
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                  <img
                    src={Images.eye} alt="perso"
                    className='absolute top-1/3 right-4 h-5 w-5 cursor-pointer'
                    onClick={showPassword}
                  />
                </div>

                <Regular1218
                  text={'Forgot Password?'}
                  onClick={onForgotPassword}
                  style={{ cursor: 'pointer', width: '80%', textAlign: 'end', marginTop: '3%', color: colors.PRIMARY_PINK }}
                />

                <SizedBox height={'70px'} />
                <div className='flex justify-between w-4/5' >
                  <ButtonOutlined label={'Register'} onClick={() =>
                    props.history.replace(
                      role === AGENCY
                        ? AGENCYROUTES.REGISTER
                        : CLIENTROUTES.REGISTER
                    )} />
                  <ButtonFilled label={'Login'} onClick={logIn} />
                </div>

                {/* <div className="button_action_login">
                  <button
                    className={`submit_login ${role === CLIENT &&
                      'conditional_backgroundSubmit'
                      }`}
                    type="submit"
                  >
                    <p>{CONTENT.LOGIN}</p>
                  </button>
                  <div
                    className={`forgot-password_login ${role === CLIENT &&
                      'conditional_color'
                      }`}
                    onClick={() => props.history.push(`/enter-email/${role}`)}
                  >
                    <p>
                      {
                        CONTENT.FORGOT_PASSWORD
                      }
                    </p>
                  </div>
                </div> */}
              </form>
            </div>
            {/* <div className="or_login">
              <p>Or</p>
            </div>
            <div className="signup_toggle">
              <div className="signUpOption">
                <p>
                  {CONTENT.NO_ACCOUNT_MESSAGE}{' '}
                  <span
                    onClick={() =>
                      props.history.replace(
                        role === AGENCY
                          ? AGENCYROUTES.REGISTER
                          : CLIENTROUTES.REGISTER
                      )
                    }
                  >
                    {CONTENT.SIGN_UP}
                  </span>
                </p>
              </div>
            </div> */}

            <Regular1218
              text={'© 2021, Sourcebae Pvt. Ltd. All Rights Reserved.'}
              style={{ position: 'absolute', bottom: '24px', right: '24px' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default Login;
