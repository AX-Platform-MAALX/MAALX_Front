import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../components/atoms/index.js';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 추가: 페이지 이동을 위한 훅
import { RadioGroup, FormControlLabel, Radio } from '@mui/material';


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
    const [industry, setIndustry] = useState('');
    const [revenue, setRevenue] = useState('');
    const [painPoint, setPainPoint] = useState('');
    const [detailedIssue, setDetailedIssue] = useState('');
    const [consultingField, setConsultingField] = useState('');
    const [aiNeeds, setAiNeeds] = useState('');
    const [detailedDemand, setDetailedDemand] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

    const handleSubmit = async () => {
        const parsedRevenue = parseFloat(revenue);
        const token = localStorage.getItem('token');
        
        // 사용자 정보를 state로 저장하여 Consulting 페이지로 전달
        const consultingData = {
            companyName,
            industry,
            revenue: parsedRevenue,
            painPoint,
            detailedIssue,
            consultingField,
            aiNeeds,
            detailedDemand
        };

        // localStorage에 컨설팅 데이터 저장
        localStorage.setItem('consultingData', JSON.stringify(consultingData));
        
        // 사용자의 요금제 정보 가져오기 (예: 'Basic' 또는 'Pro')
        const userPlan = 'Pro'; // 테스트를 위해 임시로 'Pro'로 설정
        localStorage.setItem('userPlan', userPlan);

        try {
            if (token) {  // 토큰이 있을 때만 백엔드 통신 시도
                const response = await fetch('http://localhost:8080/user/additional', {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ...consultingData,
                        date: new Date().toISOString().split('T')[0]
                    })
                });
                console.log(response);  // 응답 내용 확인
                if (!response.ok) {
                    console.error('기업정보 저장에 실패했습니다.');
                }
                // 기업정보 저장 성공 알림
                alert("기업정보가 성공적으로 저장되었습니다.");
                navigate('/consulting-history');
                 // 2. 컨설팅 요청 (POST 요청)
                const consultingResponse = await fetch("http://localhost:8080/consulting/request", {
                    method: "GET",  // 컨설팅 요청은 GET 방식으로 처리하는 API로 수정
                    headers: {
                        "Authorization": `Bearer ${token}`, // 인증 토큰을 헤더에 추가
                    },
                });

                if (!consultingResponse.ok) {
                    throw new Error("컨설팅 요청에 실패했습니다.");
                }

                const consultingDataResponse = await consultingResponse.json();
                console.log("컨설팅 결과:", consultingDataResponse);
                
                // 컨설팅 요청 성공 알림
                alert("컨설팅 요청이 성공적으로 처리되었습니다.");
                window.location.reload(); // 화면 새로고침
            }
        } catch (error) {
            console.error('Error:', error);
        } 
        // finally {
        //     // 백엔드 통신 성공 여부와 관계없이 페이지 이동
        //     console.log('Navigating to consulting page...');
        //     navigate('/consulting');
        // }
    };
    return (
        <div>
            <Title>기업정보입력</Title>
        <Stack
            spacing={theme.spacing(3)}
            sx={{
                maxWidth: '500px',
                marginLeft: '36%', // 왼쪽 정렬을 위해 margin 설정
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
                        <Text bold>1-2. 사업분야</Text>
                        <RadioGroup
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}row 
                            style={{ display: 'flex', flexDirection: 'vertical' }} >
                            <FormControlLabel
                                value="제조업"
                                control={<Radio />}
                                label="제조업"/>
                            <FormControlLabel
                                value="서비스업"
                                control={<Radio />}
                                label="서비스업"/>
                            <FormControlLabel
                                value="정보통신업"
                                control={<Radio />}
                                label="정보통신업"/>
                        </RadioGroup>
                    </SubSection>
                    <SubSection>
                        <Text bold>1-3. 매출액(최근 3년)</Text>
                        <Input
                            value={revenue}
                            onChange={(e) => setRevenue(e.target.value)}
                            placeholder="최근 5년 매출액을 입력해주세요"
                        />
                    </SubSection>
                </Stack>
            </Section>
            <Section>
                <SectionTitle bold>2. 부가정보</SectionTitle>
                <Stack spacing={2}>
                    <SubSection>
                        <Text bold>2-1. painpoint</Text>
                        <RadioGroup
                            value={painPoint}
                            onChange={(e) => setPainPoint(e.target.value)}
                            style={{ display: 'flex', flexDirection: 'vertical' }} >
                            <FormControlLabel
                                value="높은 구축 비용"
                                control={<Radio />}
                                label="높은 구축 비용"/>
                            <FormControlLabel
                                value="인적 자원 부족"
                                control={<Radio />}
                                label="인적 자원 부족"/>
                            <FormControlLabel
                                value="기술 경험 부족"
                                control={<Radio />}
                                label="기술 경험 부족"/>
                            <FormControlLabel
                                value="AI 이점에 대한 불확실성"
                                control={<Radio />}
                                label="AI 이점에 대한 불확실성"/>
                            <FormControlLabel
                                value="경영진의 AI 지식 부족"
                                control={<Radio />}
                                label="경영진의 AI 지식 부족"/>
                            <FormControlLabel
                                value="조직내 저항"
                                control={<Radio />}
                                label="조직내 저항"/>
                            <FormControlLabel
                                value="AX 전략 수립의 어려움"
                                control={<Radio />}
                                label="AX 전략 수립의 어려움"/>
                        </RadioGroup>
                    </SubSection>
                    <SubSection>
                        <Text bold>2-2. detailed issue</Text>
                        <TextArea
                            value={detailedIssue}
                            onChange={(e) => setDetailedIssue(e.target.value)}
                            placeholder="detailed issue를 입력해주세요"
                        />
                    </SubSection>
                    <SubSection>
                        <Text bold>2-3. consulting field</Text>
                        <RadioGroup
                            value={consultingField}
                            onChange={(e) => setConsultingField(e.target.value)}
                            style={{ display: 'flex', flexDirection: 'vertical' }} >
                            <FormControlLabel
                                value="AX 방법론용"
                                control={<Radio />}
                                label="AX 방법론"/>
                            <FormControlLabel
                                value="비즈니스 혁신 및 인사이트 분석"
                                control={<Radio />}
                                label="비즈니스 혁신 및 인사이트 분석"/>
                        </RadioGroup>
                    </SubSection>
                    <SubSection>
                        <Text bold>2-4. ai needs</Text>
                        <RadioGroup
                            value={aiNeeds}
                            onChange={(e) => setAiNeeds(e.target.value)}
                            style={{ display: 'flex', flexDirection: 'vertical' }} >
                            <FormControlLabel
                                value="AI 챗봇 및 고객 지원 자동화"
                                control={<Radio />}
                                label="AI 챗봇 및 고객 지원 자동화"/>
                            <FormControlLabel
                                value="업무 자동화"
                                control={<Radio />}
                                label="업무 자동화"/>
                            <FormControlLabel
                                value="AI 응용 제품 및 서비스 개발"
                                control={<Radio />}
                                label="AI 응용 제품 및 서비스 개발"/>
                        </RadioGroup>
                    </SubSection>
                    <SubSection>
                        <Text bold>2-5. detailed demand</Text>
                        <TextArea
                            value={detailedDemand}
                            onChange={(e) => setDetailedDemand(e.target.value)}
                            placeholder="구체적인 요구사항을 입력해주세요"
                        />
                    </SubSection>
                </Stack>
            </Section>
        </Stack>
        <Button
            style={{
                width: '350px',
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
                fontSize: '15px',
                cursor: 'pointer'
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
