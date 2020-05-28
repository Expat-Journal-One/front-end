import React, { useState } from "react";
import { useHistory} from 'react-router-dom';
import  {axiosWithAuth}  from "../Utils/AxiosWithAuth";

const formStyle = {
  height: 'auto',
  backgroundColor: 'rgba(33,37,41,.75)',
  borderRadius: '50px',
  padding: '2%',
  display: 'flex',
  boxShadow: '3px 3px 15px 5px rgba(0,0,0,0.66)',
  width: '33%',
  justifyContent:'center',
  alignItems:'center',
  textAlign: 'center',
  margin: '2% auto',
  flexDirection:'column',
}

const labelStyle = {
  display:'flex',
  flexDirection:'row',
  color: 'white',
  marginTop: '1%',
  
}

const textDivStyle = {
display: 'flex',
margin: '1%'

}
const buttonStyle = {
marginTop: '1%',
width: '25%',
alignSelf: 'center',
fontSize: '1.6rem',
}
const inputStyle = {
display:'flex',
height: '25px',
width:'100%',

}
const h3Style = {
  display:'flex',
  flexDirection:'row',
  color: 'white',
  marginBottom:'5%'
}










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
        setCreateBlogPost(newPost)
       
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
          
          
            <form style={formStyle} onSubmit={onCreateBlogPostSubmit}>
              <h3 style={h3Style}> Create a new Story</h3>
              <div style={textDivStyle}>
                <label style={labelStyle}> Title:&nbsp;
                  <input
                  style={inputStyle}
                  type='text'
                  name='title'
                  value={createBlogPost.title}
                  onChange={onContentChange} />
                </label>
                </div>

              <div style={textDivStyle}>
                <label style={labelStyle}> Location:&nbsp;
                  <input
                    style={inputStyle}
                    type='text'
                    name='location'
                    value={createBlogPost.location}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div style={textDivStyle}>
                <label style={labelStyle}> Description:&nbsp;
                  <input
                    style={inputStyle}
                    type='text'
                    name='description'
                    value={createBlogPost.description}
                    onChange={onContentChange} />  
                </label>
              </div>

              <div style={textDivStyle}>
                <label style={labelStyle}> Image:&nbsp;
                  <input
                    style={inputStyle}
                    type='text'
                    name='img'
                    value={createBlogPost.img} 
                    onChange={onContentChange} />  
                </label>
              </div>
              <button style={buttonStyle} onClick={onContentChange}>Create Story</button>
              
             
          </form>
                
    );
  }
