import React, { useState, useEffect } from "react";
// import axios from 'axios';
import  {axiosWithAuth}  from "../Utils/AxiosWithAuth";
import * as yup from 'yup'
import loginSchema from '../Validation/loginSchema'
import { useHistory } from 'react-router-dom';
<<<<<<< HEAD
// import styled from "styled-components";
=======

>>>>>>> f42cac04feedee493f49b33d19cccf24131fd81e

const initialLoginValues = {
  username: '',
  password: '',
}

const initialLoginErrors = {
  username: '',
  password: '',
}

const initialCredentials = []

const initialDisabled = true

const formStyle = {
  height: '500px',
  backgroundColor: '#212529',
  borderRadius: '50px',
  padding: '2%',
  display: 'flex',
  boxShadow: '3px 3px 15px 5px rgba(0,0,0,0.66)'
}

const labelStyle = {
  color: 'white',
  marginTop: '2%'
}

const textDivStyle = {
display: 'flex',
flexDirection: 'column',
margin: '3%'

}
const buttonStyle = {
marginTop: '10%',
width: '50%',
alignSelf: 'center',
fontSize: '2rem',
}
const inputStyle = {
height: '25px',
marginBottom: '10%'
}

export default function Login(props){

  const [credentials, setCredentials] = useState(initialCredentials)
  const [loginValues, setLoginValues] = useState(initialLoginValues)
  const [loginErrors, setLoginErrors] = useState(initialLoginErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 
  const { push } = useHistory();
  const postLogin = userLogin  => {
    
    axiosWithAuth()
    .post('https://expatjournal-one.herokuapp.com/api/auth/login', userLogin)
      .then(res => {
        console.log(res)
        setCredentials([res.data, ...credentials])
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('user_id', JSON.stringify(res.data));
          push('/userpage');
          window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoginValues(initialLoginValues)
      })
  }


  useEffect(()=> {
    loginSchema.isValid(loginValues)
    .then(valid => {
      setDisabled(!valid)
    })
  }, [loginValues])


  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
 
  const onLoginChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    yup
      .reach(loginSchema, name)
      .validate(value)
      .then(valid => {
        setLoginErrors({
          ...loginErrors,
          [name]: ''
        })
      })
      .catch(err => {
        setLoginErrors({
          ...loginErrors,
          [name]: err.errors[0]
        })
      })

    setLoginValues({
      ...loginValues,
      [name]: value
    })

  }

  const onLoginSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      username: loginValues.username.trim(),
      password: loginValues.password.trim(),
    }
    console.log(newUser)
    postLogin(newUser)
  }

        return (
          
            <form style={formStyle}  onSubmit={onLoginSubmit}>
              <div style={textDivStyle}>
              <h1 style={labelStyle}>Login!</h1>
                <label style={labelStyle}> Username:&nbsp;
                  <input
                  style={inputStyle}
                  type='text'
                  name='username'
                  placeholder='Enter a username'
                  value={loginValues.username}
                  onChange={onLoginChange} />
                </label>
                {/* <div>{loginErrors.username}</div> */}

              <div>
                <label style={labelStyle}> Password:&nbsp;
                  <input
                    style={inputStyle}
                    type='password'
                    name='password'
                    placeholder='Enter a password'
                    value={loginValues.password}
                    onChange={onLoginChange} />  
                </label>
                {/* <div>{loginErrors.password}</div> */}
              </div>
              <button style={buttonStyle} disabled={disabled}>Login</button>
              
            </div>
             
          </form>
          
            
    );
  }


