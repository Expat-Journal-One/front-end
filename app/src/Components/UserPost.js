import React, { useState } from "react";
import styled from 'styled-components'
import { useHistory } from 'react-router-dom';
import { axiosWithAuth } from "../Utils/AxiosWithAuth";
import EditPost from "./EditPost";


const StyledBigContainer = styled.div`
margin: 0;
padding: 0;
flex-wrap:wrap;
flex-direction:row-reverse;
width:100%;
`

const StyledContainer = styled.div`
display:flex;
flex-wrap:wrap; 
width: 100%;
flex-grow: 1;
`
const StyledDiv = styled.div`
align-items:center;
justify-content:center;
display:flex;
background: #3f3f44;
width: 100%;
height: auto;
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
height:600px;
width: 66%;
border-radius: 20px;
box-shadow: 12px 4px 15px -5px #000000;
object-fit:cover;
`
const StyledH2 = styled.h2`
margin-top: 4%;
padding: 0;
font-size: 3.5rem;
`
const StyledH3 = styled.h3`
margin: 0;
padding: 0;
font-size: 2rem;
`
const StyledH4 = styled.h4`
font-size: 1.8rem;
margin: 0;
padding: 0;
`
const StyledParagraph = styled.p`
font-size: 1.6rem;
padding: 3%;
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
    const deletePost = e => {
        e.preventDefault();
        axiosWithAuth()
        .delete(`/stories/${info.id}`)
        .then((res) => {
          console.log(res);
          
          history.push('/userpage');
         window.location.reload();
        })
        .catch((err) => console.log(err));
       setTimeout(history.push('/userpage'), 10000);
        };
        

    const [savedID, setSavedID]=useState()
    const [editToggle, setEditToggle]=useState(false)
    const getID = e => {
        setEditToggle(!editToggle)
        setSavedID(info.id)
    }    


    return(
<StyledBigContainer>
        <StyledContainer>
            <StyledDiv>
                <StyledImg src={info.image}></StyledImg>
                <StyledTextDiv>
                    <StyledH2>{info.title}</StyledH2>
                    <StyledH3>{info.date}</StyledH3>
                    <StyledH4>{info.location}</StyledH4>
                    <StyledParagraph>{info.description}</StyledParagraph>
                    <ButtonDiv>
                    <StyledButton onClick={getID}> Edit</StyledButton>    
                    <StyledButton onClick={deletePost}> Delete</StyledButton>
                </ButtonDiv>
                {editToggle && 
                    <EditPost savedID={savedID} info={info}/>
                }
                </StyledTextDiv>
            </StyledDiv>
        </StyledContainer>
     </StyledBigContainer>
    )

}

        