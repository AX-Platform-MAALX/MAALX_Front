import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 임포트

const Input = styled.input`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    background-color: #f5f5f5;
    font-size: 16px;
`;

const RadioGroup = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
`;

const PlanCard = styled.label`
    display: flex;
    flex-direction: column;
    padding: 24px;
    border: 2px solid ${props => props.checked ? '#2f56c7' : '#eee'};
    border-radius: 8px;
    cursor: pointer;
    flex: 1;
    position: relative;
    background-color: #fff;
    
    input {
        position: absolute;
        top: 16px;
        right: 16px;
    }
`;

const PriceText = styled(Text)`
    color: #FF6B00;
    margin: 8px 0;
    font-weight: bold;
    font-size: 18px;
`;

const RequiredMark = styled.span`
    color: red;
    margin-left: 4px;
`;

export const SignUp = () => {
    const theme = useTheme();
    const navigate = useNavigate();  // useNavigate 훅 사용
    const [formData, setFormData] = useState({
        email: "",
        nickname: "",
        password: ""
    });
    const [selectedPlan, setSelectedPlan] = useState('Basic');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // formData가 올바르게 설정되었는지 확인
        console.log(formData); // formData 확인
    
        try {
            const response = await fetch("http://localhost:8080/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: formData.email,
                    nickname: formData.nickname,
                    password: formData.password,
                    isPremium: selectedPlan === 'Pro' ? true : false // 요금제에 따른 is_premium 값 설정
                })
            });
    
            const data = await response.json();
            console.log(JSON.stringify({
                email: formData.email,
                nickname: formData.nickname,
                password: formData.password,
                isPremium: selectedPlan === 'Pro' ? true : false // 요금제에 따른 is_premium 값 설정
            }));
            
            if (response.ok) {
                setSuccessMessage(data.message);
                setErrorMessage('');
                navigate('/login');  // 로그인 페이지로 이동
            } else {
                setErrorMessage(data.message);
                setSuccessMessage('');
            }
        } catch (error) {
            console.error("에러:", error);
            setErrorMessage('서버와의 연결에 실패했습니다.');
        }
    };    
    
    return (
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Stack 
            spacing={theme.spacing(3)} 
            alignItems="center"
            sx={{ 
                maxWidth: '800px',
                margin: '0 auto',
                padding: theme.spacing(4)
            }}
        >
            <Text bold style={{fontSize:'24px', marginBottom:'30px'}}>회원가입</Text>
            <Stack spacing={theme.spacing(3)} sx={{ width: '100%' }}>
                <Stack spacing={1}>
                    <Text>이메일<RequiredMark>*</RequiredMark></Text>
                    <Input 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="사용하실 이메일을 입력해주세요" 
                    />                </Stack>
                <Stack spacing={1}>
                    <Text>비밀번호<RequiredMark>*</RequiredMark></Text>
                    <Input 
                        type="password" 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="사용하실 비밀번호를 입력해주세요" 
                    />                </Stack>
                <Stack spacing={1}>
                    <Text>이름<RequiredMark>*</RequiredMark></Text>
                    <Input 
                        type="text"
                        name="nickname"
                        value={formData.nickname}
                        onChange={handleChange}
                        placeholder="가입하시는 분의 성함을 입력해주세요" 
                    />                </Stack>
                <Stack spacing={1}>
                    <Text>요금제 선택<RequiredMark>*</RequiredMark></Text>
                    <RadioGroup>
                        <PlanCard checked={selectedPlan === 'Basic'}>
                            <input 
                                type="radio" 
                                name="plan" 
                                value="Basic" 
                                checked={selectedPlan === 'Basic'}
                                onChange={(e) => {
                                    console.log("Plan selected:", e.target.value); // 선택된 값 확인
                                    setSelectedPlan(e.target.value);}}
                            />
                            <Text bold fontSize="20px">Basic</Text>
                            <Text fontSize="18px">무료</Text>
                            <Text style={{ marginTop: '12px' }}>• 요약본 제공</Text>
                        </PlanCard>
                        <PlanCard checked={selectedPlan === 'Pro'}>
                            <input 
                                type="radio" 
                                name="plan" 
                                value="Pro"
                                checked={selectedPlan === 'Pro'}
                                onChange={(e) => {
                                    console.log("Plan selected:", e.target.value); // 선택된 값 확인
                                    setSelectedPlan(e.target.value);}}
                            />
                            <Text bold fontSize="20px">Pro</Text>
                            <PriceText>￦ 1000</PriceText>
                            <Text>• 전문 제공</Text>
                            <Text>• 문제분석과 계획 제공</Text>
                        </PlanCard>
                    </RadioGroup>
                </Stack>
            </Stack>
            <Button 
                type="submit"
                style={{ 
                    width: '100%', 
                    borderRadius: '4px', 
                    padding: '12px',
                    backgroundColor: '#2f56c7',
                    color: '#fff',
                    fontSize: '16px',
                    cursor: 'pointer',
                    border: 'none'
                }}
            >
                회원가입
            </Button>
        </Stack>
    </form>
    );
};

export default SignUp; 