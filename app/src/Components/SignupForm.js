import React, { useState, useEffect } from "react";
import { axiosWithAuth } from '../Utils/AxiosWithAuth';
import * as yup from 'yup'
import formSchema from '../Validation/formSchema'
import { useHistory } from 'react-router-dom';
import regBG from './img/regBG.jpg'




const formStyle = {
  height: '625px',
  backgroundColor: '#212529',
  borderRadius: '50px',
  padding: '2%',
  display: 'flex',
  boxShadow: '3px 3px 15px 5px rgba(0,0,0,0.66)'
}

const labelStyle = {
  color: 'white',
  marginTop: '1%'
}

const textDivStyle = {
display: 'flex',
flexDirection: 'column',
margin: '1%'

}
const buttonStyle = {
marginTop: '10%',
width: '50%',
alignSelf: 'center',
fontSize: '2rem',
}
const inputStyle = {
height: '25px',
width:'75%'
}
const initialSignupValues = {
  name: '',
  username: '',
  email: '',
  password: '',
}

const initialSignupErrors = {
  name: '',
  username: '',
  email: '',
  password: '',
}

const initialCredentials = []

const initialDisabled = true

export default function Signup(){

  const [credentials, setCredentials] = useState(initialCredentials)
  const [signupValues, setSignupValues] = useState(initialSignupValues)
  const [signupErrors, setSignupErrors] = useState(initialSignupErrors)
  const [disabled, setDisabled] = useState(initialDisabled)


  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 
  const { push } = useHistory();
  const postSignup = userSignup => {
    axiosWithAuth()
    .post('https://expatjournal-one.herokuapp.com/api/auth/register', userSignup)
      .then(res => {
        setCredentials([res.data, ...credentials])
        push('/Login');
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
        console.log(userSignup)
      })
      .finally(() => {
        setSignupValues(initialSignupValues)
      })
  }

  useEffect(()=> {
    formSchema.isValid(signupValues)
    .then(valid => {
      setDisabled(!valid)
    })
  }, [signupValues])


  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////

  const onSignupChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setSignupErrors({
          ...signupErrors,
          [name]: ''
        })
      })
      .catch(err => {
        setSignupErrors({
          ...signupErrors,
          [name]: err.errors[0]
        })
      })

    setSignupValues({
      ...signupValues,
      [name]: value
    })
  }

  const onSignupSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      username: signupValues.username.trim(),
      password: signupValues.password.trim(),
    }
    postSignup(newUser)
  }
        return (
          
            <form style={formStyle} onSubmit={onSignupSubmit}>
              <div style={textDivStyle}>
              <h1 style={labelStyle}>Signup!</h1>
              <label style={labelStyle}> Name:&nbsp;
                  <input
                  style={inputStyle}
                  type='text'
                  name='name'
                  value={signupValues.name}
                  onChange={onSignupChange} />
                </label>
                <div>{signupErrors.name}</div>

                <label style={labelStyle}> Username:&nbsp;
                  <input
                  style={inputStyle}
                  type='text'
                  name='username'
                  value={signupValues.username}
                  onChange={onSignupChange} />
                </label>
                <div>{signupErrors.username}</div>

                <label style={labelStyle}> Email:&nbsp;
                  <input
                  style={inputStyle}
                  type='email'
                  name='email'
                  value={signupValues.email}
                  onChange={onSignupChange} />
                </label>
                <div>{signupErrors.email}</div>

              
                <label style={labelStyle}> Password:&nbsp;
                  <input
                  style={inputStyle}
                    type='password'
                    name='password'
                    value={signupValues.password}
                    onChange={onSignupChange} />  
                </label>
                <div>{signupErrors.password}</div>
              <button style={buttonStyle} disabled={disabled}>Sign up</button>
            </div>
          </form>
    );
  }


