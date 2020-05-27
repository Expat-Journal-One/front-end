import React, { useState, useEffect } from "react";
import axios from 'axios';
import  {axiosWithAuth}  from "../Utils/AxiosWithAuth";
import * as yup from 'yup'
import loginSchema from '../Validation/loginSchema'
// import Post from './Post'
import { useHistory } from 'react-router-dom';

const initialPostValues = {
  title: '',
  location: '',
  description: '',
}

// const initialLoginErrors = {
//   username: '',
//   password: '',
// }



export default function CreatePost(props){

  const [createBlogPost, setCreateBlogPost] = useState(initialPostValues)
 




  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 

  const postBlog = newPost  => {
    
 
    axios.post('https://expatjournal-one.herokuapp.com/api/stories', newPost)
      .then(res => {
        console.log(newPost)
        setCreateBlogPost([res.data, ...createBlogPost])
        
      })
      .catch(err => {
        console.log(newPost)
        console.log(err)
      })
      .finally(() => {
        setCreateBlogPost(initialPostValues)
      })
  }


//   useEffect(()=> {
//     loginSchema.isValid(loginValues)
//     .then(valid => {
//       setDisabled(!valid)
//     })
//   }, [loginValues])  
  



  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
 
    const onContentChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    // yup
    //   .reach(loginSchema, name)
    //   .validate(value)
    //   .then(valid => {
    //     setLoginErrors({
    //       ...loginErrors,
    //       [name]: ''
    //     })
    //   })
    //   .catch(err => {
    //     setLoginErrors({
    //       ...loginErrors,
    //       [name]: err.errors[0]
    //     })
    //   })

    setCreateBlogPost({
      ...createBlogPost,
      [name]: value
    })

  }

  const onCreateBlogPostSubmit = evt => {
    evt.preventDefault()

    const newBlogPost = {
      title: createBlogPost.title.trim(),
      location: createBlogPost.location.trim(),
      description:createBlogPost.description.trim(),
    }
    // console.log(newUser)
    postBlog(newBlogPost)
  }

        return (
          
            <form onSubmit={onCreateBlogPostSubmit}>
              <div>
                <label> Title:&nbsp;
                  <input
                  type='text'
                  name='title'
                  value={createBlogPost.title}
                  onChange={onContentChange} />
                </label>
                {/* <div>{loginErrors.username}</div> */}

              <div>
                <label> Location:&nbsp;
                  <input
                    type='text'
                    name='location'
                    value={createBlogPost.location}
                    onChange={onContentChange} />  
                </label>
                {/* <div>{loginErrors.password}</div> */}
              </div>

              <div>
                <label> Description:&nbsp;
                  <input
                    type='text'
                    name='description'
                    value={createBlogPost.description}
                    onChange={onContentChange} />  
                </label>
                {/* <div>{loginErrors.password}</div> */}
              </div>
              <button>Create Story</button>
              
            </div>
             
          </form>
          
            
    );
  }
