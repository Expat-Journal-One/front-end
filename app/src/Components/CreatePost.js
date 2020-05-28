import React, { useState } from "react";
import { useHistory} from 'react-router-dom';
import  {axiosWithAuth}  from "../Utils/AxiosWithAuth";


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
  const history = useHistory();
  const postBlog = newPost  => {
    
 
    axiosWithAuth()
    .post(`/stories/`, newPost)
      .then(res => {
        console.log(createBlogPost)
        setCreateBlogPost(res.data)
        localStorage.setItem('token', JSON.stringify(res.data.token));
        localStorage.setItem('user_id', JSON.stringify(res.data.id));

        history.push('/userpage');
        window.location.reload();
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
      image:createBlogPost.img,
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
                    value={createBlogPost.img} 
                    onChange={onContentChange} />  
                </label>
              </div>
              <button onClick={onContentChange}>Create Story</button>
              
            </div>
             
          </form>
          
            
    );
  }
