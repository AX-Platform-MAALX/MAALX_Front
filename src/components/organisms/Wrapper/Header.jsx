import { Stack, useTheme } from '@mui/system';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import { Logo, TextButton, Button } from '../../atoms/index.js';
import { useState, useEffect } from 'react';
import styled from "styled-components";

const DropdownMenu = styled.div`
  position: absolute;
  top: 105px;
  right: 210px;
  background-color: white;
  border: 0.1vw solid #ccc;
  border-radius: 1.5vw;
  overflow: hidden;
  z-index: 1; /* z-index를 높여 다른 요소 위에 나타나도록 설정 */
  box-shadow: 0 0.2vw 1vw rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 1vw 1.5vw;
  color: #333;
  font-size: 15px;
  text-decoration: none;
  white-space: nowrap;
  border-bottom: 0.1vw solid #e0e0e0;
  text-align: center;
  &:hover {
    background-color: #f0f0f0;
  }
  &:last-child {
    border-bottom: none;
  }
`;
export const Header = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const location = useLocation(); // 현재 경로 가져오기
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
		  setIsLoggedIn(true);
		  const user = JSON.parse(localStorage.getItem('user'));
		  console.log(user);  // user 값이 제대로 로드되는지 확인
		  setUserName(user ? user.nickname : '');
		} else {
		  setIsLoggedIn(false);
		}
	  });  // 빈 배열을 전달하여 처음 렌더링될 때만 실행되도록 설정
	
	const handleLocationClick = (path) => () => {
		navigate(path);
	};
	const handleProfileClick = () => {
		setIsDropdownOpen((prev) => !prev);  // 상태 토글
    };
	const handleLogout = () => {
		localStorage.clear();
		setIsLoggedIn(false); // 로그아웃 후 로그인 상태 변경
		setUserName(''); // 사용자 이름 초기화
		navigate("/"); // 홈으로 리다이렉트
		window.location.reload();
	  };
	  
	return (
		<Stack
			component="header"
			direction="row"
			justifyContent="space-between"
			px={theme.spacing(20)}
			sx={{ height: '130px' }}
		>
			<Link to="/">
				<Logo />
			</Link>
			<Stack direction="row" spacing={theme.spacing(5)} alignItems="center" >
				<TextButton 
					style={{
						marginTop: '24px',
						fontSize: '23px',
						width: '160px', // 프로필 이미지 크기 키움
						height: '10px', // 프로필 이미지 크기 키움
						cursor: 'pointer',
						fontFamily: "'MPLUSRounded1c', sans-serif",  // 원하는 폰트 적용
						color: location.pathname === '/' ? '#2F56C7' : '#333', // 경로에 따라 색상 변경
					}}
					onClick={handleLocationClick('/')}>서비스 안내</TextButton>
				<TextButton 
					style={{
						marginTop: '24px',
						marginRight: '10px',
						fontSize: '23px',
						width: '80px', // 프로필 이미지 크기 키움
						height: '10px', // 프로필 이미지 크기 키움
						cursor: 'pointer',
						fontFamily: "'MPLUSRounded1c', sans-serif",  // 원하는 폰트 적용
						color: location.pathname === '/service-info' ? '#2F56C7' : '#333', // 경로에 따라 색상 변경
					}}
					onClick={localStorage.getItem('token') ? handleLocationClick('/service-info') : null}>컨설팅</TextButton>
					{isLoggedIn ? (
					<Stack direction="row" alignItems="center">
						<img 
						src={'images/profile.png'} 
						alt="Profile"
						style={{ marginTop: '30px', marginRight: '110px', width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer' }}
						onClick={handleProfileClick} 
						/>
						<DropdownMenu isOpen={isDropdownOpen}>
						<DropdownItem to="/mypage">마이페이지</DropdownItem>
						<DropdownItem to="/consulting-history">컨설팅 기록</DropdownItem>
						<DropdownItem as="div" onClick={handleLogout}>로그아웃</DropdownItem>
						</DropdownMenu>
					</Stack>
					) : (
					<Button
						style={{ marginTop: '32px', marginRight: '100px', fontSize: '15px', width: '80px', height: '45px', cursor: 'pointer' }} 
						onClick={handleLocationClick('/login')}>Login</Button>
					)}
		
			</Stack>
		</Stack>
	);
};
