import React, { useState } from "react";
import { useHistory} from 'react-router-dom';
import  {axiosWithAuth}  from "../Utils/AxiosWithAuth";

const initialPostValues = {
  title: '',
  location: '',
  description: '',
  img: '',
}

export default function EditPost({info}){

  const [editBlogPost, setEditBlogPost] = useState(initialPostValues)
 


  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 
  const history = useHistory();
  const editBlog = newEdit  => {
    
 
    axiosWithAuth()
    .put(`/stories/${info.id}`, newEdit)
      .then(res => {
        console.log(editBlogPost)
        setEditBlogPost(res.data)
       
        history.push('/userpage');
        window.location.reload();
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setEditBlogPost(initialPostValues)
      })
  }

  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////
  //////////////// EVENT HANDLERS ////////////////

    const onContentChange = evt => {
    const name = evt.target.name
    const value = evt.target.value
   

    setEditBlogPost({
      ...editBlogPost,
      [name]: value,
    })

  }

  const onEditBlogPostSubmit = evt => {
    evt.preventDefault()

    const newEditBlogPost = {
      title: editBlogPost.title.trim(),
      location: editBlogPost.location.trim(),
      description:editBlogPost.description.trim(),
      image:editBlogPost.img,
    }
    editBlog(newEditBlogPost)
  }

        return (
          
            <form onSubmit={onEditBlogPostSubmit}>
                <h2>Edit Post Here</h2>
                
              <div>
                <label> Title:&nbsp;
                  <input
                  type='text'
                  name='title'
                  value={editBlogPost.title}
                  onChange={onContentChange} />
                </label>

              <div>
                <label> Location:&nbsp;
                  <input
                    type='text'
                    name='location'
                    value={editBlogPost.location}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div>
                <label> Description:&nbsp;
                  <input
                    type='text'
                    name='description'
                    value={editBlogPost.description}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div>
                <label> Image:&nbsp;
                  <input
                    type='text'
                    name='img'
                    value={editBlogPost.img} 
                    onChange={onContentChange} />  
                </label>
              </div>
              <button onClick={onContentChange}>Re Create Story</button>
              
            </div>
             
          </form>
          
            
    );
  }
