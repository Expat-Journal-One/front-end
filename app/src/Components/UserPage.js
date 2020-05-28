import React, { useState, useEffect } from "react";
import UserPost from './UserPost';
import CreatePost from './CreatePost';
import { axiosWithAuth } from "../Utils/AxiosWithAuth";
import EditPost from "./EditPost";

export default function UserPage() {
  
  const [posts, setPosts] = useState([])
  useEffect(()=> {
    axiosWithAuth()
    .get('/stories')
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

        <h2>Welcome to the UserPage</h2>
            <CreatePost/>
            
              {
                posts.map(post => {
                  return(
                    <UserPost info={post} key={post.id}/>
                  )
                })  
              }
            </div> 
    );
            }
        