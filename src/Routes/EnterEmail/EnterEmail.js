import React, { useState } from 'react';
import { useParams, useHistory } from "react-router";
import "./EnterEmail.css";
import instance from '../../Constants/axiosConstants';
import { Images } from '../../assets/images';
import { Bold4265, SemiBold1624, SemiBold2030 } from '../../Components/Text/Texts';
import colors from '../../Constants/colors';
import SizedBox from '../../Components/SizedBox/SizedBox';
import ButtonFilled from '../../Components/Button/ButtonFilled';
import { USERROUTES } from '../../Navigation/CONSTANTS';
import { emailRegex } from '../../shared/helper';
import { toast } from 'react-toastify';


function EnterEmail(props) {
  let { role } = useParams();

  const [loading, setLoading] = useState(false);
  const history = useHistory()

  const [state, setState] = useState({
    userEmail: '',
    resetThrough: 'email'
  });

  const sendVerificationLink = () => {
    // if (!emailRegex.test(state.userEmail.toString())) return toast.error('Please enter valid Email')
    setLoading(true);
    instance.post(`/api/${role}/auths/send-forget-password-link`, state)
      .then(response => {
        setLoading(false)
        props.history.push(`/login/${role}`)
      })
      .catch(err => {
        setLoading(false);
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value
    })
  }

  return (
    <div className='flex flex-col h-screen w-full justify-center' >
      <div className='flex justify-between h-24 bg-f9f9f9 absolute top-0 w-screen' >
        <div style={{ height: '96px', width: '250px', cursor: 'pointer' }} >
          <img src={Images.sourceBaeLogo} alt="logo" onClick={() => history.push(USERROUTES.HOME)} />
        </div>
      </div>

      <div className='w-full' >
        <Bold4265 text={'Reset Password'} style={{ width: '100%', textAlign: 'center' }} />
        <SizedBox height={'18px'} />
        <SemiBold1624
          text={'Don’t worry !! we are here to help you, just put down your mail'}
          style={{ width: '100%', textAlign: 'center', color: colors.BLACK_500, opacity: .5 }}
        />
        <SemiBold1624
          text={'in box and we are sending you a reset password link.'}
          style={{ width: '100%', textAlign: 'center', color: colors.BLACK_500, opacity: .5 }}
        />

        <SizedBox height={'18%'} />
        <div className='w-full justify-center flex' >
          <div className='flex flex-col w-1/2' >
            <SemiBold2030 text={'Enter your registerd email id'} />
            <SizedBox height={'10px'} />
            <input
              type="text"
              name="userEmail"
              id="email"
              required
              placeholder='yourname@domail.com'
              autoComplete='email'
              className='border-1e1e1e rounded-md p-3 border text-base font-Mulish-Regular'
              onChange={e => handleChange(e)}
            />
            <SizedBox height={'70px'} />
            <div className='flex justify-between items-center' >
              <div className='flex items-center cursor-pointer' onClick={() => history.goBack()} >
                <img src={Images.longArrow} alt="back arrow" />
                <SizedBox width={'12px'} />
                <SemiBold1624 text={'Back To Login'} />
              </div>
              <ButtonFilled label={'Send'} onClick={sendVerificationLink} />
            </div>
          </div>
        </div>

      </div>

    </div>
    // <>
    //     <div className="image_and_forgot">
    //         <div className="forgot_parent">
    //             <Back name="Forgot Password" />
    //         </div>
    //         <img className={`Image1_hireAgency ${role === "client" && 'conditional_colorChange'}`} src={UpImage} alt="upImage" />
    //         <img className={`Image2_hireAgency ${role === "client" && 'conditional_colorChange'}`} src={DownImage} alt="downImage" />
    //         {loading ? <Spinner />
    //             :
    //             <Container component="main">
    //                 <CssBaseline />
    //                 <div className={classes.paper}>
    //                     <img src={lock} alt="" style={{ width: "2rem" }} />
    //                     <Typography component="h2" variant="h5" style={{ color: "#707070", fontFamily: "Segoe UI Semibold"}}>
    //                         Send Link
    //                     </Typography>
    //                     <form className={classes.form} noValidate>
    //                         <TextField
    //                             margin="normal"
    //                             required
    //                             fullWidth
    //                             id="email"
    //                             placeholder="Enter Email"
    //                             name="userEmail"
    //                             autoComplete="email"
    //                             autoFocus
    //                             onChange={(e) => handleChange(e)}
    //                             style={{ color: "#707070" }}
    //                         />
    //                     </form>
    //                     <div className="submitButton submitButton_enterEmail">
    //                         <button onClick={() => sendVerificationLink()}>Submit</button>
    //                     </div>
    //                 </div>
    //             </Container>
    //         }
    //     </div>
    // </>
  )
}

export default EnterEmail;