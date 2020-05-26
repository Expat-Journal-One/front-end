import React, { useState, useEffect } from "react";
import axios from 'axios';
import * as yup from 'yup'
import loginSchema from '../Validation/loginSchema'
import Post from './Post'

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

export default function Login(props){

  const [credentials, setCredentials] = useState(initialCredentials)
  const [loginValues, setLoginValues] = useState(initialLoginValues)
  const [loginErrors, setLoginErrors] = useState(initialLoginErrors)
  const [disabled, setDisabled] = useState(initialDisabled)





  /////////////////



  const [posts, setPosts] =useState([])
  axios.get('https://expatjournal-one.herokuapp.com/api/stories')
      .then(res => {
          setPosts(res.data)
      })





  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 

  const postLogin = userLogin => {
    axios.post('https://expatjournal-one.herokuapp.com/api/auth/login', userLogin)
      .then(res => {
        setCredentials([res.data, ...credentials])
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

    setLoginValues({
      ...loginValues,
      [name]: value
    })
  }

  const onLoginSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      name: loginValues.username.trim(),
      password: loginValues.password.trim(),
    }
    console.log(newUser)
    postLogin(newUser)
  }

        return (
          
            <form onSubmit={onLoginSubmit}>
              <div>
                <label> Username:&nbsp;
                  <input
                  type='text'
                  name='username'
                  value={loginValues.username}
                  onChange={onLoginChange} />
                </label>
                <div>{loginErrors.username}</div>

              <div>
                <label> Password:&nbsp;
                  <input
                    type='password'
                    name='password'
                    value={loginValues.password}
                    onChange={onLoginChange} />  
                </label>
                <div>{loginErrors.password}</div>
              </div>
              <button disabled={disabled}>Login</button>
            </div>
            <div>
              {
                posts.map(post => {
                  return(
                    <Post info={post}/>
                  )
                })
              }
            </div>
          </form>
          
            
    );
  }

