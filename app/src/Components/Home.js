import React, { useState, useEffect } from "react";
import axios from 'axios'
import Post from './Post'
import styled from 'styled-components'
import homeImg from './img/home.jpg'

const StyledBigDiv = styled.div`
display:flex;
justify-content:space-evenly;
width: 100%;
height: 100%;
flex-wrap:wrap;

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

const StyledHomeDiv =styled.div`
background-image:url(${homeImg});
background-size:cover;
object-fit:cover;
`





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
          <StyledHomeDiv>
            <h1>Home Page!</h1>
            <StyledBigDiv>
                    
            {
                posts.map(post => {
                  return(
                    <StyledDiv>
                    <Post info={post}/>
                    </StyledDiv>
                  )
                })
                
              }
             
                    </StyledBigDiv>
            </StyledHomeDiv>
    );
}