import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, signIn } from '../features/auth/authSlice';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';

const CandidateLoginPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // const [date, setDate] = useState(new Date());

  // const authSlice = useSelector(state => state.auth);

  const handleLoginForm = async (e) => {
    e.preventDefault();

    if(email == ''){
      setErrorMessage('*Please provide the Email');
    } else if(password == ''){
      setErrorMessage('*Please provide the password')
    } else {
      try {
        const response = await dispatch(signIn({email, password})).unwrap()

        console.log(response);
        setSuccessMessage(`*${response.message}`);
        setErrorMessage('');
        navigate('/');
      } catch (error) {
        console.log("Sign in Error", error);
        setErrorMessage(`*${error}`);
        setSuccessMessage('');
      }

    }
  }

  const handleForgotPassword = async () => {
    if(email == ''){
      setErrorMessage('*Please provide the Email')
    } else {
      try {
        const response = await dispatch(forgotPassword({email})).unwrap();

        console.log(response);
        setSuccessMessage(`*${response.message}`);
        setErrorMessage('');
        // navigate('/');
      } catch (error) {
        console.log("Sign in Error", error);
        setErrorMessage(`*${error}`);
        setSuccessMessage('');
      }
    }

    
  }

  return (
    <div className='login-page-main-container'>
      <div className='login-page-image'>
        <h1>
          Welcome back to
        </h1>
        <h1>
          The HireMatix
        </h1>
      </div>
      <div className='auth-form-container'>
        <form className='login-form' onSubmit={handleLoginForm}>
          <h1>Login</h1>
          <div className='input-container login-input'>
            <input 
              type='text'
              id='name'
              name='email'
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='label-el'>Email</div>
          </div>
          <div className='input-container'>
            <input
              type='password'
              id='password'
              name='password'
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='label-el'>Password</div>
          </div>
          <div className='forgot-signup-msg-container'>
            <p>
              <Link onClick={handleForgotPassword}>
                Forgot password?
              </Link>
            </p>
            <p>
              <Link to='/candidate-signup'>
                Don't have an account?
              </Link>
            </p>
          </div>
          {/* <div className='date-picker'>
            <LocalizationProvider 
              dateAdapter={AdapterDayjs}>
              <DatePicker 
                label="Date of Birth"
              />
            </LocalizationProvider>
          </div> */}
          <div className='error-msg-container'>  
            {errorMessage == '' ? null : (
              <p className='error-para'>{errorMessage}</p>
            )}
            {successMessage == '' ? null : (
              <p className='success-para'>{successMessage}</p>
            )}
          </div>
          <div className='login-button'>
            <button type='submit'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CandidateLoginPage
