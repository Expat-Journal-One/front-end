import React,{ useState } from "react";
import Post from './Post';
import axios from 'axios';

function Home (){
 const [posts, setPosts] =useState([])
 
   axios.get('https://expatjournal-one.herokuapp.com/api/stories')
       .then(res => {
           setPosts(res.data)
       })

/*componted did mount with a (event) => {
    event.preventDefault(); to stop the post from running like crazy. */

    
        return (
          <div>
            <h1>Home Page!</h1>
            
              <div>
              {
                posts.map(post => {
                  return(
                    <Post info={post}/>
                  )
                })
              }
            </div> 
            
            </div>
    );
            }
            

export default Home;