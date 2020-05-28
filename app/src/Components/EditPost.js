import React, { useState,  } from "react";
import { useHistory} from 'react-router-dom';
import  {axiosWithAuth}  from "../Utils/AxiosWithAuth";

const lableStyle = {
fontSize: '1.2rem'
}

const initialPostValues = {
  title: '',
  location: '',
  description: '',
  img: '',
}


export default function EditPost({info, savedID }){
  const [editBlogPost, setEditBlogPost] = useState(initialPostValues)
 
  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 
  
  const history = useHistory();
 
    

  const editBlog = newEdit  => {
    axiosWithAuth()
    .put(`/stories/${savedID}`, newEdit)
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



  const onEditBlogPostSubmit = (evt) => {
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
                <h4 style={lableStyle}>Edit Post Here</h4>
                
              <div>
                <label style={lableStyle}> Title:&nbsp;
                  <input
                  type='text'
                  name='title'
                  value={editBlogPost.title}
                  onChange={onContentChange} />
                </label>

              <div>
                <label style={lableStyle}> Location:&nbsp;
                  <input
                    type='text'
                    name='location'
                    value={editBlogPost.location}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div>
                <label style={lableStyle}> Description:&nbsp;
                  <input
                    type='text'
                    name='description'
                    value={editBlogPost.description}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div>
                <label style={lableStyle}> Image:&nbsp;
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
