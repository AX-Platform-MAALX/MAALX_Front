import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Input = styled.input`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

export const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            console.log(data);  // 전체 응답 객체를 콘솔에 출력하여 확인

            if (response.ok) {
                // 로그인 성공 시 JWT 토큰 저장
                localStorage.setItem("token", data.token);  // JWT를 localStorage에 저장
                localStorage.setItem('user', JSON.stringify({ nickname: data.nickname, email: data.email }));  // 이메일, 닉네임만 저장
                setErrorMessage('');
                const userName = data.nickname || "사용자";
                console.log(`${userName}님 로그인 성공했습니다`);  // 성공 메시지 출력
                navigate('/');  // 로그인 후 대시보드로 이동 (경로는 실제 프로젝트에 맞게 수정)
            } else {
                setErrorMessage(data.message || '로그인 실패');
            }
        } catch (error) {
            console.error("에러:", error);
            setErrorMessage('서버와의 연결에 실패했습니다.');
        }
    };
    return (
        <Stack 
            spacing={theme.spacing(2)} 
            alignItems="center"
            sx={{ 
                maxWidth: '400px',
                margin: '0 auto',
                padding: theme.spacing(2)
            }}
        >
            <Text bold>로그인</Text>
            <Stack spacing={theme.spacing(1)} sx={{ width: '100%' }}>
                <Input 
                    name="email"
                    type="email"
                    placeholder="아이디"
                    value={formData.email}
                    onChange={handleChange}
                />                
                <Input 
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    value={formData.password}
                    onChange={handleChange}
                />            
            </Stack>
            <Button style={{ width: '100%' }} onClick={handleSubmit}>로그인</Button>
            <Text 
                onClick={() => navigate('/signup')} 
                style={{ cursor: 'pointer' }}
            >
                MAALX가 처음이시라면 회원가입
            </Text>
        </Stack>
    );
};