/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import './PasswordReset.css';
import instance from '../../Constants/axiosConstants';
import { useLocation } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';
import HalfCard from '../../Components/HalfCard/HalfCard';
import { Images } from '../../assets/images';
import { Bold4265, SemiBold1421, SemiBold2030 } from '../../Components/Text/Texts';
import { passwordResetStrs } from '../../Constants/strings';
import colors from '../../Constants/colors';
import ButtonFilled from '../../Components/Button/ButtonFilled';
import SizedBox from '../../Components/SizedBox/SizedBox';
import { toast } from 'react-toastify';

const ForgotPassword = (props) => {

  const search = useLocation().search;
  const token = new URLSearchParams(search).get('token');
  let role = new URLSearchParams(search).get('role');

  const [hidePassword, SetPasswordStatus] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    password: '',
    passwordRetype: '',
    token: token
  });

  const showPassword = (e) => {
    SetPasswordStatus((prevCheck) => !prevCheck);
  };

  //Methods

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const changePassword = () => {
    if (form.password === '') return toast.info('You need to enter a Password')
    if (form.password !== form.passwordRetype) return toast.error(passwordResetStrs.notMatchError)
    setLoading(true);
    instance
      .patch(`/api/${role}/auths/reset-password`, form)
      .then((response) => {
        setLoading(false);
        props.history.push(`/login/${role}`);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex w-full h-full">
          <div className='flex w-1/2 h-100vh' >
            <HalfCard role={role} />
          </div>
          <div className='flex w-1/2 justify-center items-center' >
            <div className='flex flex-col justify-center items-center w-3/4' >
              <div style={{ height: '100px', width: '250px' }} >
                <img src={Images.sourceBaeLogo} alt="logo" />
              </div>
              <SizedBox height={'40px'} />
              <Bold4265 text={passwordResetStrs.heading} style={{ letterSpacing: '-1px' }} />
              <SizedBox height={'14px'} />
              <SemiBold1421 text={passwordResetStrs.description} style={{ color: colors.BLACK_700, opacity: '0.5', textAlign: 'center', width: '60%' }} />
              <SizedBox height={'28px'} />
              <SemiBold2030 text={passwordResetStrs.passwordLabel} style={{ width: '100%' }} />
              <SizedBox height={'8px'} />
              <input
                type={hidePassword ? 'password' : 'text'}
                name="password"
                required
                id="filled-number"
                placeholder={passwordResetStrs.placeHolder}
                className='bg-f9f9f9 w-full border border-1e1e1e rounded-md p-3'
                onChange={(e) => { handleChange(e) }}
              />
              <SizedBox height={'50px'} />
              <SemiBold2030 text={passwordResetStrs.passwordLabel2} style={{ width: '100%' }} />
              <SizedBox height={'8px'} />
              <input
                type={hidePassword ? 'password' : 'text'}
                name="passwordRetype"
                required
                id="filled-number"
                placeholder={passwordResetStrs.placeHolder}
                className='bg-f9f9f9 w-full border border-1e1e1e rounded-md p-3'
                onChange={(e) => { handleChange(e) }}
              />
              <SizedBox height={'80px'} />
              <ButtonFilled label={passwordResetStrs.passwordReset} onClick={changePassword} />
            </div>
          </div>
        </div>

        // <div className="mainLoginPage">
        //     <div className="innerLoginPage">
        //         <div className="ForgetContent">
        //             <div className="HeadingForgetPassword">
        //                 Reset Password{' '}
        //             </div>
        //             <div className="mainLoginForm">
        //                 <div
        //                     style={{ marginTop: '0px' }}
        //                     className="loginForm"
        //                 >
        //                     <p
        //                         style={{
        //                             marginLeft: '-7rem',
        //                             marginBottom: '10px'
        //                         }}
        //                     >
        //                         Enter New Password Here
        //                     </p>
        //                     <Input
        //                         className={classes.inputs}
        //                         placeholder="Enter a Password"
        //                         variant="outlined"
        //                         type={
        //                             hidePassword
        //                                 ? 'password'
        //                                 : 'text'
        //                         }
        //                         value={form.password}
        //                         disableUnderline={true}
        //                         required
        //                         fullWidth
        //                         name="password"
        //                         autoComplete="password"
        //                         autoFocus
        //                         onChange={(e) => {
        //                             handleChange(e);
        //                         }}
        //                         endAdornment={
        //                             <InputAdornment position="end">
        //                                 {hidePassword ? (
        //                                     <VisibilityTwoToneIcon
        //                                         fontSize="small"
        //                                         className={
        //                                             classes.passwordEye
        //                                         }
        //                                         onClick={
        //                                             showPassword
        //                                         }
        //                                     />
        //                                 ) : (
        //                                     <VisibilityOffTwoToneIcon
        //                                         fontSize="small"
        //                                         className={
        //                                             classes.passwordEye
        //                                         }
        //                                         onClick={
        //                                             showPassword
        //                                         }
        //                                     />
        //                                 )}
        //                             </InputAdornment>
        //                         }
        //                     />
        //                     <button
        //                         onClick={() => changePassword()}
        //                         type="submit"
        //                     >
        //                         Change Password
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
      )}
    </div>
  );
};

export default ForgotPassword;
