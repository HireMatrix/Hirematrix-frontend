import React from 'react'

const CandidateSignUpPage = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    
    return (
      <div className='sign-up-form-container'>
        <form onSubmit={handleSignUpForm}>
          <div>
              <input htmlFor='name'>Name : </input>
              <input
                  type='text'
                  name='name'
                  id='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
              />
          </div>
        </form>
      </div>
    )
}

export default CandidateSignUpPage
