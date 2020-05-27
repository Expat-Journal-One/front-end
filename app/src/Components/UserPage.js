import React, { useState, useEffect } from "react";
import axios from 'axios'
import Post from './Post'
export default function UserPage() {

  const [posts, setPosts] = useState([])
  axios.get('https://expatjournal-one.herokuapp.com/api/stories')
    .then(res => {
        setPosts(res.data)
    })


        return (
          <div>
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

