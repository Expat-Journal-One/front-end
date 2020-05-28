
import React, { useState } from "react";
import styled from 'styled-components'
import CreatePost from './CreatePost'
import { render } from "@testing-library/react";

import React from "react";
import styled from 'styled-components';
import { useHistory, useParams} from 'react-router-dom';
import { axiosWithAuth } from "../Utils/AxiosWithAuth";


const StyledContainer = styled.div`
display:flex;
justify-content:center;
`

const StyledDiv = styled.div`
align-items:center;
display:flex;
background: #3f3f44;
width: 60%;
height: 100%;
border: 5px double #f7f7f7;
border-radius: 20px;
margin: 1% 0;
box-shadow: 3px 3px 15px 5px rgba(0,0,0,0.66);
`

const StyledTextDiv = styled.div`
width: 100%;
font-family: 'Architects Daughter', cursive;
`
const StyledImg = styled.img`
display:flex;
align-self:grow;
height:800px;
width: 66%;
border-radius: 20px;
box-shadow: 12px 4px 15px -5px #000000;


`
const StyledH2 = styled.h2`
margin: 0;
margin-bottom: 5%;
padding: 0;
font-size: 3.5rem;
`

const StyledH3 = styled.h3`
margin: 0;
margin-bottom: 5%;
padding: 0;
font-size: 2rem;

`

const StyledH4 = styled.h4`
margin: 0;
padding: 0;
`

const StyledParagraph = styled.p`
font-size: 1.6rem;
padding: 7%;
line-height: 3rem;
font-weight: 400;
`
const ButtonDiv = styled.div`
display:flex;
justify-content:space-evenly;
text-align:center;

`

const StyledButton = styled.button`
display:flex;
justify-content:center;
font-size: 1.4rem;
background:#3f3f44;
border: 2px double #f7f7f7;
padding: 2%;
width: 33%;
color: #f7f7f7;
:hover{
    border: 2px double #1b6ca8;
    transition: padding 2s;
}

` 

export default function UserPost({info}){


    const history = useHistory();
    const params = useParams();

    const deletePost = e => {
        e.preventDefault();
  console.log(info)
        axiosWithAuth()
        .delete(`/stories/${info.id}`)
        .then((res) => {
          console.log(res);
          
          history.push('/userpage');
        //   window.location.reload();
        })
        .catch((err) => console.log(err));
    //   setTimeout(history.push('/userpage'), 10000);
        };


    return(

        <StyledContainer>
            <StyledDiv>
                <StyledImg src={info.image}></StyledImg>
                <StyledTextDiv>
                    <StyledH2>{info.title}</StyledH2>
                    <StyledH3>{info.date}</StyledH3>
                    <StyledH4>{info.location}</StyledH4>
                    <StyledParagraph>{info.description}</StyledParagraph>
                    <ButtonDiv>

                        <StyledButton >Edit</StyledButton>
                        <StyledButton>Delete</StyledButton>
=======
                        <StyledButton>Edit</StyledButton>
                        <StyledButton onClick={deletePost}> Delete</StyledButton>

                </ButtonDiv>
                </StyledTextDiv>
            </StyledDiv>
        </StyledContainer>
    )

}
        
        
        