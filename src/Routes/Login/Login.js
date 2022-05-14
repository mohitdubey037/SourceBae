/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../Login/login.css';
import styles from './login.module.css'
import { useParams } from 'react-router';
import instance from '../../Constants/axiosConstants';
import axios from 'axios';
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
  const [showRoleOptions, setshowRoleOptions] = useState(false)

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
        if (isRequirement) props.history.push(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
        // else props.history.replace(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
        else props.history.replace(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
      } else if (role === CLIENT) {
        setLoading(false);
        // props.history.push(CLIENTROUTES.DEVELOPER_REQUESTS);
        props.history.push(CLIENTROUTES.DEVELOPER_REQUESTS);
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
        props.history.replace(AGENCYROUTES.DEVELOPER_REQUIREMENT_LIST);
      } else if (tempRole === CLIENT) {
        props.history.replace(CLIENTROUTES.DEVELOPER_REQUESTS);
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
            <HalfCard role={role} />
          </div>
          <div className='flex flex-col w-1/2 h-100vh p-3' >

            <div className='flex justify-between items-center' >
              <div style={{ height: '100px', width: '250px' }} >
                <img src={Images.sourceBaeLogo} alt="logo" />
              </div>
              <div className='flex mr-4 mt-4 relative ' >
                <Bold1827 text={'Login As\xa0'} />
                <div
                  className='flex cursor-pointer flex-col'
                  onMouseOver={() => setshowRoleOptions(true)}
                  onMouseLeave={() => setshowRoleOptions(false)}
                >
                  <div className='flex' >
                    <Bold1827 text={`${role === AGENCY ? 'an\xa0' + role : 'a\xa0' + role}`} style={{ textTransform: 'capitalize', color: colors.PRIMARY_PINK }} />
                    <SizedBox width={'8px'} />
                    <img src={Images.downArrowPink} alt="picker" />
                  </div>
                  {showRoleOptions && <div className='absolute -top-2 -right-2 p-2' >
                    <div className='rounded-md py-1 w-28 flex items-center flex-col mt-9 bg-f9f9f9 border border-1e1e1e' >
                      <div
                        className={`${role === AGENCY && 'bg-primary-pink-300'} w-full justify-center flex py-2`}
                        onClick={() => handleChangeToggle(AGENCY)}
                      >
                        <SemiBold1624 text={'Agency'} />
                      </div>
                      <div
                        className={`${role === CLIENT && 'bg-primary-pink-300'} w-full justify-center flex py-2`}
                        onClick={() => handleChangeToggle(CLIENT)}
                      >
                        <SemiBold1624 text={'Client'} />
                      </div>
                    </div>
                  </div>
                  }
                </div>
              </div>
            </div>

            <SizedBox height={'3%'} />
            <div className='flex justify-center' >
              <Bold3248 text={'Welcome!'} />
              {/* <div className={`${styles.L_animated_text}`}>
                <div className='flex w-80 bg-red-900' >
                  <p className='font-Mulish-Bold w-80 bg-red-400' >Welcome !</p>
                  <p className='font-Mulish-Bold w-80' >स्वागत !</p>
                  <p className='font-Mulish-Bold w-80' >!خوش آمدید</p>
                  <p className='font-Mulish-Bold w-80' >Bienvenida!</p>
                  <p className='font-Mulish-Bold w-80' >Receber!</p>
                </div>
              </div> */}
            </div>

            <SizedBox height={'8%'} />
            <div className='flex justify-center'>
              <div className='w-4/5 bg-f9f9f9 border rounded-md border-1e1e1e items-center justify-center flex p-3 cursor-pointer' >
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
                    onChange={(e) => { handleChange(e) }}
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
                    onChange={(e) => { handleChange(e) }}
                  />
                  <img
                    src={Images.eye} alt="perso"
                    className='absolute top-1/3 right-4 h-5 w-5 cursor-pointer'
                    onClick={showPassword}
                  />
                </div>

                <div className='w-4/5 justify-end flex' >
                  <Regular1218
                    text={'Forgot Password?'}
                    onClick={onForgotPassword}
                    style={{ cursor: 'pointer', textAlign: 'end', marginTop: '3%', color: colors.PRIMARY_PINK }}
                  />
                </div>

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
