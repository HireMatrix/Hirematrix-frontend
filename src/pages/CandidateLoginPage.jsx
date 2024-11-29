import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../features/auth/authSlice';
import "../styles/CandidateLoginPage.css";



const CandidateLoginPage = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // const authSlice = useSelector(state => state.auth);

  const handleLoginForm = async (e) => {
    e.preventDefault();

    if(email == ''){
      setErrorMessage('please provide the Email');
    } else if(password == ''){
      setErrorMessage('please provide the password')
    } else {
      const response = await dispatch(signIn({email, password}))
      
      if(response.type.includes('rejected')){
        setErrorMessage(response.payload);
        setSuccessMessage('');
      } else {
        setSuccessMessage(response.payload.message);
        console.log(response.payload);
        setErrorMessage('');
      }

    }
  }
  return (
    <div className='login-form-container'>
  <form className='login-form' onSubmit={handleLoginForm}>
    <div>
      <label htmlFor='email'>Email : </label>
      <input
        placeholder='Email'
        type='text'
        id='name'
        name='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div>
      <label htmlFor='password'>Password : </label>
      <input
        placeholder='Password'
        type='password'
        id='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
    <div className='error-msg-container'>
      {errorMessage == '' ? null : (
        <p>{errorMessage}</p>
      )}
      {successMessage == '' ? null : (
        <p>{successMessage}</p>
      )}
    </div>
    <div>
      <button type='submit'>Login</button>
    </div>
    <p>Login with</p>
    <div className='social-login-options'>
      <button type='button' className='google-login'>
        <img src='./src/assets/google-logo.png' alt='Google' />
        
      </button>
      <button type='button' className='linkedin-login'>
        <img src='./src/assets/linkedin-logo.png' alt='LinkedIn' />
       
      </button>
      <button type='button' className='github-login'>
        <img src='./src/assets/github-logo.png' alt='GitHub' />
      
      </button>
    </div>
  </form>
</div>

  )
}

export default CandidateLoginPage
