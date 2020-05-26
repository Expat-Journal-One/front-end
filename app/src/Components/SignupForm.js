import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as yup from 'yup'
import formSchema from '../Validation/formSchema'

const initialSignupValues = {
  username: '',
  password: '',
}

const initialSignupErrors = {
  username: '',
  password: '',
}

const initialCredentials = []

const initialDisabled = true

export default function Signup(props){

  const [credentials, setCredentials] = useState(initialCredentials)
  const [signupValues, setSignupValues] = useState(initialSignupValues)
  const [signupErrors, setSignupErrors] = useState(initialSignupErrors)
  const [disabled, setDisabled] = useState(initialDisabled)


  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 

  const postSignup = userSignup => {
    axios.post('https://expatjournal-one.herokuapp.com/api/auth/register', userSignup)
      .then(res => {
        initialCredentials([res.data, ...credentials])
      })
      .catch(err => {
        console.log(err)
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
      name: signupValues.username.trim(),
      password: signupValues.password.trim(),
    }
    console.log(newUser)
    postSignup(newUser)
  }

        return (
          
            <form onSubmit={onSignupSubmit}>
              <div>
                <label> Username:
                  <input
                  type='text'
                  name='username'
                  value={signupValues.username}
                  onChange={onSignupChange} />
                </label>
                <div>{signupErrors.username}</div>

              <div>
                <label> Password:
                  <input
                    type='password'
                    name='password'
                    value={signupValues.password}
                    onChange={onSignupChange} />  
                </label>
                <div>{signupErrors.password}</div>
              </div>
              <button disabled={disabled}>Sign up</button>
            </div>
          </form>
            
    );
  }


