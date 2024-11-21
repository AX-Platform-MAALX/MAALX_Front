import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../components/atoms/index.js';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가: 페이지 이동을 위한 훅


const Title = styled.div`
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
    display: block;
    font-family: 'MPLUSRounded1c', sans-serif;  /* 폰트 적용 */
`;

const Input = styled.input`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    background-color: #f5f5f5;
    font-size: 16px;
`;

const TextArea = styled.textarea`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    background-color: #f5f5f5;
    min-height: 100px;
    resize: vertical;
    font-size: 16px;
`;

const Section = styled.div`
    margin-bottom: 24px;
`;

const SectionTitle = styled(Text)`
    font-size: 21px;
    margin-bottom: 16px;
    font-family: 'MPLUSRounded1c', sans-serif;  /* 폰트 적용 */
`;

const SubSection = styled(Stack)`
    font-size: 17px;
    margin-bottom: 18px;
    align-items: flex-start; /* Ensures left alignment */
    font-family: 'MPLUSRounded1c', sans-serif;  /* 폰트 적용 */
    gap: 12px; /* 간격을 추가하여 요소들 사이의 공간을 늘립니다 */
`;

export const ServiceInfoPage = () => {
    const theme = useTheme();
    const navigate = useNavigate(); // 페이지 이동을 위한 훅
    const [companyName, setCompanyName] = useState('');
    const [revenue, setRevenue] = useState('');
    const [technologyField, setTechnologyField] = useState('');
    const [employeeCount, setEmployeeCount] = useState('');
    const [consultingInterest, setConsultingInterest] = useState('');
    const [painPoint, setPainPoint] = useState('');
    const [preferredAITech, setPreferredAITech] = useState('');
    const handleSubmit = async () => {
        const parsedRevenue = parseFloat(revenue);
        const parsedemployeeCount = parseInt(employeeCount);
        const jwtToken = localStorage.getItem('token');
        
        // 사용자 정보를 state로 저장하여 Consulting 페이지로 전달
        const consultingData = {
            companyName,
            revenue: parsedRevenue,
            technologyField,
            employeeCount: parsedemployeeCount,
            consultingInterest,
            painPoint,
            preferredAITech
        };

        // localStorage에 컨설팅 데이터 저장
        localStorage.setItem('consultingData', JSON.stringify(consultingData));
        
        // 사용자의 요금제 정보 가져오기 (예: 'Basic' 또는 'Pro')
        const userPlan = 'Pro'; // 테스트를 위해 임시로 'Pro'로 설정
        localStorage.setItem('userPlan', userPlan);

        try {
            if (jwtToken) {  // 토큰이 있을 때만 백엔드 통신 시도
                const response = await fetch('http://localhost:8080/user/additional', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...consultingData,
                        date: new Date().toISOString().split('T')[0]
                    })
                });

                if (!response.ok) {
                    console.error('Backend communication failed');
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            // 백엔드 통신 성공 여부와 관계없이 페이지 이동
            console.log('Navigating to consulting page...');
            navigate('/consulting');
        }
    };
    return (
        <div>
            <Title>기업정보입력</Title>
        <Stack
            spacing={theme.spacing(3)}
            sx={{
                maxWidth: '500px',
                marginLeft: '35%', // 왼쪽 정렬을 위해 margin 설정
                marginTop: '3%',
                padding: theme.spacing(6)
            }}
        >                     
 
            <Section>
                <SectionTitle bold>1. 기본정보</SectionTitle>
                <Stack spacing={2}>
                    <SubSection>
                        <Text bold>1-1. 사명</Text>
                        <Input
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder="사명을 입력해주세요"
                        />
                    </SubSection>
                    <SubSection>
                        <Text bold>1-2. 매출액(최근 5년)</Text>
                        <Input
                            value={revenue}
                            onChange={(e) => setRevenue(e.target.value)}
                            placeholder="최근 5년 매출액을 입력해주세요"
                        />
                    </SubSection>
                    <SubSection>
                        <Text bold>1-3. 기술분야</Text>
                        <Input
                            value={technologyField}
                            onChange={(e) => setTechnologyField(e.target.value)}
                            placeholder="기업 기술분야를 입력해주세요"
                        />
                    </SubSection>
                    <SubSection>
                        <Text bold>1-4. 사원수</Text>
                        <Input
                            value={employeeCount}
                            onChange={(e) => setEmployeeCount(e.target.value)}
                            placeholder="사원수를 입력해주세요"
                        />                    
                    </SubSection>
                </Stack>
            </Section>

            <Section>
                <SectionTitle bold>2. 부가정보</SectionTitle>
                <Stack spacing={2}>
                    <SubSection>
                        <Text bold>2-1. 희망전환점 분야</Text>
                        <TextArea
                            value={consultingInterest}
                            onChange={(e) => setConsultingInterest(e.target.value)}
                            placeholder="희망하는 전환점 분야를 입력해주세요"
                        />
                    </SubSection>
                    <SubSection>
                        <Text bold>2-2. painpoint</Text>
                        <TextArea
                            value={painPoint}
                            onChange={(e) => setPainPoint(e.target.value)}
                            placeholder="painpoint를 입력해주세요"
                        />
                    </SubSection>
                    <SubSection>
                        <Text bold>2-3. 희망 AI 기술</Text>
                        <TextArea
                            value={preferredAITech}
                            onChange={(e) => setPreferredAITech(e.target.value)}
                            placeholder="희망하는 AI 기술을 입력해주세요"
                        />
                    </SubSection>
                </Stack>
            </Section>
        </Stack>
        <Button
            style={{
                width: '18%',
                borderRadius: '4px',
                height: '80px',  // 세로 길이를 명시적으로 설정
                padding: '23px 20px',  // 위아래 패딩을 늘려서 높이를 증가시킴
                marginLeft: '40%',
                fontFamily: "'MPLUSRounded1c', sans-serif",  // 원하는 폰트 적용
                fontWeight:'bold',
                backgroundColor: 'white', // 배경색 하얀색
                color: '#2F56C7', // 글씨 색 파란색 (여기서는 #2F56C7로 설정)
                border: '2px solid #2F56C7', // 버튼 테두리도 파란색으로 설정 
                alignItems: 'center', // 수직 가운데 정렬
                display: 'flex', // flex 레이아웃을 적용
                justifyContent: 'center', // 수평 가운데 정렬
                fontSize: '15px'
            }}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#2F56C7'; // 마우스가 올라갔을 때 배경색 파란색
                e.target.style.color = 'white'; // 글씨 색 하얀색
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'white'; // 마우스를 벗어나면 배경색 원래대로
                e.target.style.color = '#2F56C7'; // 글씨 색 원래대로
            }}
            onClick={handleSubmit}
            >
            등록
        </Button>
        </div>
    );
};
