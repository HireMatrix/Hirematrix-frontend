import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { verifyEmail } from '../features/auth/authSlice';

const VerifyEmailPage = () => {

  const user = useSelector(state => state.auth);
  const {token} = useParams();
  const lengthOfOtp = 6;
  const [otp, setOtp] = useState(new Array(lengthOfOtp).fill(""));
  const [authOtp, setAuthOtp] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if(inputRefs.current[0]){
      inputRefs.current[0].focus();
    }
  }, [])
  
  const handleVerifyEmailForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if(authOtp === undefined) {
      setErrorMessage('Please enter correct otp');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await dispatch(verifyEmail({token, authOtp})).unwrap();

      // console.log(response);
      setSuccessMessage(`*${response?.message}`);
      setErrorMessage('');
      navigate('/');
    } catch (error) {
      console.log('Verification Error: ', error);
      setErrorMessage(`*${error}`);
      setSuccessMessage('');
    }
  }

  const handleOtpInputChange = (index, e) =>  {
    const value = e.target.value;

    if(isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    const combinedOtp = newOtp.join("")
    // console.log(Number(combinedOtp));

    if(value && index < lengthOfOtp - 1 && inputRefs.current[index+1]) {
      inputRefs.current[newOtp.indexOf("")].focus();
    }

    if(combinedOtp.length === 6) {
      setAuthOtp(combinedOtp);
    }
  }
  const handleOtpInputClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    if(index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  }
  const handleOtpInputKeyDown = (index, e) => {
    if(e.key === 'Backspace' && !otp[index] && index > 0 && inputRefs.current[index-1]) {
      inputRefs.current[index-1].focus();
    }
  }

  return (
    <div className='login-page-main-container'>
      <div className='login-page-image'>
        <h1>
          Welcome to
        </h1>
        <h1>
          The HireMatix
        </h1>
      </div>
      <div className='auth-form-container'>
        <form className='login-form' onSubmit={handleVerifyEmailForm}>
          <p>we have sent you an verification token to this email address: {user?.user?.email}</p>
          <p>Please enter the code to continue</p>
          <div className='otp-main-container'>
            {
              otp.map((value, index) => (
                <div className='otp-input-container' key={index}>
                  <input
                    key={index}
                    value={value}
                    type='text'
                    ref={(input) => inputRefs.current[index] = input}
                    onChange={(e) => handleOtpInputChange(index, e)}
                    onClick={() => handleOtpInputClick(index)}
                    onKeyDown={(e) => handleOtpInputKeyDown(index, e)}
                    className='otp-input-el'
                  />
                </div>
              ))
            }
          </div>
          <div className='verify-error-msg-container'>
            {
              errorMessage === '' ? '' 
              : <p className='error-para'>
                {`*${errorMessage}`}
              </p>
            }
            {
              successMessage === '' ? '' 
              : <p className='success-para'>
                {`*${successMessage}`}
              </p>
            }
          </div>
          <div className='verify-login-btn'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default VerifyEmailPage
