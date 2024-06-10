import React from 'react';
import styled from 'styled-components';
import Robot from "../assests/robot.gif";

export default function Welcome({currentUser}) {
    if (!currentUser) {
        return (
          <Container>
            <img src={Robot} alt="robot" />
            <h1>Loading...</h1> {/* or any placeholder content */}
            <h3>Please wait while we load your information.</h3>
          </Container>
        );
      }
  return (
    <Container>
        <img src={Robot} alt="robot" />
        <h1>
            Welcome, <span>
                {currentUser.username}!
            </span>
        </h1>
        <h3>
            Please Select a Chat to start messaging.
        </h3>
    </Container>
  )
}
const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
color:white;
img{
    height:20rem;
}
span{
    color:#4e0eff;
}
`;