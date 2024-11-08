import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Main from "../../assets/images/MainImg.png";
import SubImg1 from "../../assets/images/SubImg1.png";
import SubImg2 from "../../assets/images/SubImg2.png";
import SubImg3 from "../../assets/images/SubImg3.png";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const MainImg = styled.img`
  display: flex;
  width: 100%;
  height: 40vw;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const SubImgContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 80px; /* Space between images */
  margin-top: 10vw;
  margin-bottom: 10vw;
`;

const SubImg = styled.img`
  width: 22%; /* Each image takes up one-third of the container */
  height: auto; /* Maintains aspect ratio */
`;
const Home = () => {
    return(
        <Container>
            <MainImg src={Main} alt="메인이미지">
            </MainImg>
            <SubImgContainer>
                <SubImg src={SubImg1} alt="서브이미지1" />
                <SubImg src={SubImg2} alt="서브이미지2" />
                <SubImg src={SubImg3} alt="서브이미지3" />
            </SubImgContainer>
        </Container>
    )
};
export default Home;