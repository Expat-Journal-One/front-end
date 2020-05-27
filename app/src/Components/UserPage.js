import React, { useState, useEffect } from "react";
import axios from 'axios'
import Post from './Post'
export default function UserPage() {

  const [posts, setPosts] = useState([])
  useEffect(()=> {
    axios.get('https://expatjournal-one.herokuapp.com/api/stories')
    .then(res => {
      console.log(res.data)
        setPosts(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])
  




        return (
          <div>
            <h2>Welcome to UserPage</h2>
              {
                posts.map(post => {
                  return(
                    <Post info={post}/>
                  )
                })
                
              }
            </div> 
    );
}  

