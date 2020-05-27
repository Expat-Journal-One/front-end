import React, { useState, useEffect } from "react";
import axios from 'axios'
import Post from './Post'
export default function Home() {
  
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
            <h1>Home Page!</h1>
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
