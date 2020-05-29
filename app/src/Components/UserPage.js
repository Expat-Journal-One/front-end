import React, { useState, useEffect } from "react";
import UserPost from './UserPost';
import CreatePost from './CreatePost';
import { axiosWithAuth } from "../Utils/AxiosWithAuth";

import styled from 'styled-components'

const StyledContainer = styled.div`
display:flex;
flex-direction:column;
`

const StyledBigDiv = styled.div`
display:flex;
justify-content:space-evenly;
width: 100%;
height: 100%;
flex-wrap:wrap;
flex-direction:row;
`
const StyledDiv = styled.div`
display:flex;
height:auto;
width: 45%;
flex-wrap:wrap;
flex-direction:row;

:last-child:nth-child(even){
  flex-grow: -1;
  max-width: 94%;
}
:last-child:nth-child(odd){
  flex-grow: 1;
  max-width: 93%;
}
`

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
          <StyledContainer>
        <h2 style={{textShadow: '3px 3px 2px rgba(100, 100, 100, 1)'}}>Welcome to the UserPage</h2>
            <CreatePost/>
            <StyledBigDiv>
              {
                posts.slice(0).reverse().map(post => {
                  return(
                    <StyledDiv>
                    <UserPost info={post} key={post.id}/>
                    </StyledDiv>
                  )
                })  
              }
              </StyledBigDiv>
            </StyledContainer> 
    );
  }
        