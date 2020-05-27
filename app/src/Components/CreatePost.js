import React, { useState, useEffect } from "react";
import axios from 'axios';
import  {axiosWithAuth}  from "../Utils/AxiosWithAuth";
// import Post from './Post'
import { useHistory } from 'react-router-dom';

const initialPostValues = {
  title: '',
  location: '',
  description: '',
  img: '',
}




export default function CreatePost(){

  const [createBlogPost, setCreateBlogPost] = useState(initialPostValues)
 


  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 

  const postBlog = newPost  => {
    
 
    axios.post('https://expatjournal-one.herokuapp.com/api/stories', newPost)
      .then(res => {
        console.log(newPost)
        setCreateBlogPost([res.data, ...createBlogPost])
        localStorage.setItem('token', JSON.stringify(res.data.token));
        localStorage.setItem('user_id', JSON.stringify(res.data.id));
        
      })
      .catch(err => {
        console.log(newPost)
        console.log(err)
      })
      .finally(() => {
        setCreateBlogPost(initialPostValues)
      })
  }





  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////

    const onContentChange = evt => {
    const name = evt.target.name
    const value = evt.target.value
    // const src = evt.target.src


    // setCreateBlogPost({
    //     ...createBlogPost,
    //     [name]: src
    //   })

    setCreateBlogPost({
      ...createBlogPost,
      [name]: value,
    })

  }

  const onCreateBlogPostSubmit = evt => {
    evt.preventDefault()

    const newBlogPost = {
      title: createBlogPost.title.trim(),
      location: createBlogPost.location.trim(),
      description:createBlogPost.description.trim(),
      img:createBlogPost.img,
    }
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

              <div>
                <label> Location:&nbsp;
                  <input
                    type='text'
                    name='location'
                    value={createBlogPost.location}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div>
                <label> Description:&nbsp;
                  <input
                    type='text'
                    name='description'
                    value={createBlogPost.description}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div>
                <label> Image:&nbsp;
                  <input
                    type='text'
                    name='img'
                    value={createBlogPost.img} //most likely needs to be changed to src and not value

                    onChange={onContentChange} />  
                </label>
              </div>
              <button>Create Story</button>
              
            </div>
             
          </form>
          
            
    );
  }
