import React, { useState, useEffect } from "react";

import axios from 'axios'
import UserPost from './UserPost'
import CreatePost from './CreatePost'
export default function UserPage() {

import UserPost from './UserPost';
import { useHistory} from 'react-router-dom';
import { axiosWithAuth } from "../Utils/AxiosWithAuth";

export default function UserPage() {
  const history = useHistory();
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

            <h2>Welcome to UserPage</h2>
            <CreatePost/>

            <h2>Welcome to the UserPage</h2>

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
          