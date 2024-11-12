import { Stack, useTheme } from '@mui/system';
import { useNavigate, Link } from 'react-router-dom';
import { Logo, TextButton, Button } from '../../atoms/index.js';
import { useState, useEffect } from 'react';

export const Header = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [profileImage, setProfileImage] = useState(''); // 프로필 이미지 URL 상태
	
	useEffect(() => {
        // 로그인 여부와 사용자 정보 확인
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // 사용자 이름 및 프로필 이미지 설정
            const user = JSON.parse(localStorage.getItem('user')); // 예시로 로컬 스토리지에 저장된 사용자 정보 가져오기
            setUserName(user ? user.nickname : '');
            setProfileImage(user ? user.profileImage : ''); // 프로필 이미지 URL 설정
        }
    }, []);

	const handleLocationClick = (path) => () => {
		navigate(path);
	};
	const handleProfileClick = () => {
        navigate('/profile');  // 프로필 페이지로 이동
    };
	return (
		<Stack
			compoennt="header"
			direction="row"
			justifyContent="space-between"
			px={theme.spacing(2)}
			sx={{ height: '100px' }}
		>
			<Link to="/">
				<Logo />
			</Link>
			<Stack direction="row" spacing={theme.spacing(6)} alignItems="center">
				<TextButton 
					style={{
						marginTop: '17px',
						fontSize: '25px',
						width: '160px', // 프로필 이미지 크기 키움
						height: '10px', // 프로필 이미지 크기 키움
						cursor: 'pointer' 
					}}
					onClick={handleLocationClick('/service-info')}>서비스 안내</TextButton>
				<TextButton 
					style={{
						marginTop: '17px',
						marginRight: '10px',
						fontSize: '25px',
						width: '80px', // 프로필 이미지 크기 키움
						height: '10px', // 프로필 이미지 크기 키움
						cursor: 'pointer' 
					}}
					onClick={handleLocationClick('/consulting')}>컨설팅</TextButton>
				{isLoggedIn ? (
                    <Stack direction="row" alignItems="center">
                        <img 
                            src={'images/profile.png'} // 기본 프로필 이미지 경로 지정
                            alt="Profile"
                            style={{ marginTop: '30px', marginRight: '100px', // 프로필 이미지를 왼쪽으로 살짝 이동
								width: '45px', height: '45px', borderRadius: '50%', cursor: 'pointer' }}
                            onClick={handleProfileClick} 
                        />
                    </Stack>
                ) : (
                    <Button onClick={handleLocationClick('/login')}>Login</Button>
                )}			
			</Stack>
		</Stack>
	);
};
