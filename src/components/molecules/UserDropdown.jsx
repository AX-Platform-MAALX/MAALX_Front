import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  font-size: 14px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${props => props.isOpen ? 'block' : 'none'};
  min-width: 150px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #F8F9FD;
  }
`;

export const UserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        <span>내 계정</span>
        <span>▼</span>
      </DropdownButton>
      
      <DropdownMenu isOpen={isOpen}>
        <DropdownItem onClick={() => navigate('/mypage')}>마이페이지</DropdownItem>
        <DropdownItem onClick={() => navigate('/consulting-history')}>컨설팅 기록</DropdownItem>
        <DropdownItem onClick={handleLogout}>로그아웃</DropdownItem>
      </DropdownMenu>
    </DropdownContainer>
  );
}; 