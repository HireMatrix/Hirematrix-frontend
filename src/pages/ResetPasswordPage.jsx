import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../features/auth/authSlice';

const ResetPasswordPage = () => {
  const user = useSelector(state => state.auth);
  const {token} = useParams();
  
  const [changePassword, setChangePassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(confirmPassword !== changePassword){
      setErrorMessage('passwords must match')
    } else {
      setErrorMessage('');
    }
  }, [confirmPassword])
  
  const handleResetPasswordForm = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if(confirmPassword !== changePassword){
      setErrorMessage('passwords must match');
      setSuccessMessage('');
      return;
    }

    try {
      const response = await dispatch(resetPassword({token, confirmPassword})).unwrap();

      console.log(response);
      setSuccessMessage(`*${response?.message}`);
      setErrorMessage('');
      navigate('/candidate-login');
    } catch (error) {
      console.log('Verification Error: ', error);
      setErrorMessage(`*${error}`);
      setSuccessMessage('');
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
        <form className='login-form' onSubmit={handleResetPasswordForm}>
          <p>Reset Account password</p>
          <p>{`Enter a new password for ${user?.user?.email}`}</p>
          <div className='input-container' style={{marginTop: '20px'}}>
            <input
              type='text'
              id='changePassword'
              name='changePassword'
              placeholder=' '
              value={changePassword}
              onChange={(e) => setChangePassword(e.target.value)}
            />
            <div className='label-el'>Change passwrod</div>
          </div>
          <div className='input-container login-input'>
            <input
              type='text'
              id='confirmPassword'
              name='confirmPassword'
              placeholder=' '
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className='label-el'>Change passwrod</div>
          </div>
          <div className='error-msg-container'>
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
          <div className='login-button'>
            <button type='submit'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ResetPasswordPage
