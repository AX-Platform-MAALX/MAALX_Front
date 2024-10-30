import React from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

// @font-face {
//     font-family: 'Noonnu';
//     src: url('./fonts/NoonnuBasicGothicRegular.ttf');
//   }
const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vw; /* 헤더를 아래로 내리기 위해 추가한 여백 */
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 94%;
  padding: 0 0 1vw 0;
`;

const LogoTitle = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  width: 13vw;
  height: auto;
`;

const LinksContainer = styled.div`
  display: flex;
  gap: 2vw;
  margin-right: 10vw;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 1.5vw;
  font-weight: 700;
  &:hover {
    color: #555;
  }
`;

function Header() {
    const navigate = useNavigate();
    const handleRefresh = () => {
        navigate("/");
        window.location.reload();
      };

    return (
        <HeaderContainer>
          <TopSection>
            <LogoTitle>
              <Link to="/" onClick={handleRefresh}>
                <LogoImage src={Logo} alt="Logo" />
              </Link>
            </LogoTitle>
            <LinksContainer>
              <NavLink to="/service-info">서비스 안내</NavLink>
              <NavLink to="/consulting">컨설팅</NavLink>
            </LinksContainer>
          </TopSection>
        </HeaderContainer>
      );
}

export default Header;
