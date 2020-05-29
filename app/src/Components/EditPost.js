import React, { useState,  } from "react";
import { useHistory} from 'react-router-dom';
import  {axiosWithAuth}  from "../Utils/AxiosWithAuth";

const labelStyle = {
// display:'flex',
fontSize: '1.4rem',
// textAlign: 'justify',
// alignSelf: 'flex-start'
}

const buttonStyle = {
display:'flex',
justifyContent:'center',
alignSelf:'center',
fontSize: '1.2rem',
background:'#3f3f44',
border: '2px double #f7f7f7',
width: '50%',
color: '#f7f7f7',
margin: '8% auto'


}
const inputStyle = {
width: '50%',
}

const initialPostValues = {
  title: '',
  location: '',
  description: '',
  img: '',
}


export default function EditPost({info, savedID }){
  const [editBlogPost, setEditBlogPost] = useState(initialPostValues)
 console.log(info)
  //////////////// HELPERS ////////////////
  //////////////// HELPERS ////////////////
  //////////////// HELPERS //////////////// 
  
  const history = useHistory();
 
    

  const editBlog = newEdit  => {
    axiosWithAuth()
    .put(`/stories/${savedID}`, newEdit)
      .then(res => {
        console.log(editBlogPost)
        setEditBlogPost(res.data )
       
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
                <h4 style={{fontSize: '1.4rem'}}>Edit Post Here</h4>
                
              <div>
                <label style={labelStyle}> Title:&nbsp;
                  <input
                  style={inputStyle}
                  type='text'
                  name='title'
                  value={editBlogPost.title}
                  onChange={onContentChange} />
                </label>

              <div>
                <label style={labelStyle}> Location:&nbsp;
                  <input
                  style={inputStyle}
                    type='text'
                    name='location'
                    value={editBlogPost.location}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div>
                <label style={labelStyle}> Description:&nbsp;
                  <input
                  style={inputStyle}
                    type='text'
                    name='description'
                    value={editBlogPost.description}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div>
                <label style={labelStyle}> Image:&nbsp;
                  <input
                  style={inputStyle}
                    type='text'
                    name='img'
                    value={editBlogPost.img} 
                    onChange={onContentChange} />  
                </label>
              </div>
              <button style={buttonStyle} onClick={onContentChange}>Re Create Story</button>
              
            </div>
             
          </form>
          
            
    );
  }
