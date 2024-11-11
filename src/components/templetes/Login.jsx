import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Input = styled.input`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
`;

export const Login = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    
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
                <Input placeholder="아이디" />
                <Input type="password" placeholder="비밀번호" />
            </Stack>
            <Button style={{ width: '100%' }}>로그인</Button>
            <Text 
                onClick={() => navigate('/signup')} 
                style={{ cursor: 'pointer' }}
            >
                MAALX가 처음이시라면 회원가입
            </Text>
        </Stack>
    );
};