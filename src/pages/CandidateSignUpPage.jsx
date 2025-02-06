import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../features/auth/authSlice';

const CandidateSignUpPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleSignUpForm = async (e) => {
      e.preventDefault();

      if(email == ''){
        setErrorMessage('*Please provide the Email');
      } else if(password == ''){
        setErrorMessage('*Please provide the Password');
      } else {
        try {
          const response = await dispatch(signUp({name, email, password})).unwrap()

          // console.log(response.user.temporaryRouteToken);
          navigate(`/verify-email/:${response?.user?.temporaryRouteToken}`)
        } catch (error) {
          console.log("signup error:", error);
          setErrorMessage(error);
        }
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
          <form className='login-form' onSubmit={handleSignUpForm}>
            <h1>Sign Up</h1>
            <div className='input-container'>
              <input 
                type='text'
                name='text'
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className='label-el'>Name</div>
            </div>
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
                <Link to='/candidate-login'>
                  Already have account please Login?
                </Link>
              </p>
            </div>
            <div className='error-msg-container'>  
              {errorMessage == '' ? null : (
                <p>{errorMessage}</p>
              )}
              {successMessage == '' ? null : (
                <p>{successMessage}</p>
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

export default CandidateSignUpPage
