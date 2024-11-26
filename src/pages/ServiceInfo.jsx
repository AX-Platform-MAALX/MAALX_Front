import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../components/atoms/index.js';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, FormControlLabel, Radio,TextField } from '@mui/material';
import { Modal, Box, CircularProgress } from '@mui/material';

const Title = styled.div`
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
    display: block;
    font-family: 'MPLUSRounded1c', sans-serif;
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
    font-family: 'MPLUSRounded1c', sans-serif;
`;

const SubSection = styled(Stack)`
    font-size: 17px;
    margin-bottom: 18px;
    align-items: flex-start;
    font-family: 'MPLUSRounded1c', sans-serif;
    gap: 12px;
`;

export const ServiceInfoPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [industry, setIndustry] = useState('');
    const [revenue, setRevenue] = useState('');
    const [painPoint, setPainPoint] = useState('');
    const [detailedIssue, setDetailedIssue] = useState('');
    const [consultingField, setConsultingField] = useState('');
    const [aiNeeds, setAiNeeds] = useState('');
    const [detailedDemand, setDetailedDemand] = useState('');
    const [isLoading, setIsLoading] = useState(false);
	const [otherIndustry, setOtherIndustry] = useState('');
    const [otherPainpoint, setOtherPainpoint] = useState('');
    const [otherConsultingField, setOtherConsultingField] = useState('');
    const [otherAiNeeds, setOtherAiNeeds] = useState('');

    const handleSubmit = async () => {
        setIsLoading(true); // 로딩 시작
        try {
            const parsedRevenue = parseFloat(revenue);
            const token = localStorage.getItem('token');
            
            const consultingData = {
                companyName,
                industry: industry === '기타' ? otherIndustry.trim() : industry,
                revenue: parsedRevenue,
                painPoint: painPoint ==='기타'?otherPainpoint.trim():painPoint,
                detailedIssue,
                consultingField:consultingField==='기타'?otherConsultingField.trim():consultingField,
                aiNeeds,
                detailedDemand
            };

            localStorage.setItem('consultingData', JSON.stringify(consultingData));
            
            const userPlan = 'Pro';
            localStorage.setItem('userPlan', userPlan);

            if (token) {
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

                if (!response.ok) {
                    throw new Error('기업정보 저장에 실패했습니다.');
                }

                alert("기업정보가 성공적으로 저장되었습니다.");

                const consultingResponse = await fetch("http://localhost:8080/consulting/request", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!consultingResponse.ok) {
                    throw new Error("컨설팅 요청에 실패했습니다.");
                }

                const consultingDataResponse = await consultingResponse.json();
                console.log("컨설팅 결과:", consultingDataResponse);
                
                alert("컨설팅 요청이 성공적으로 처리되었습니다.");
                navigate('/consulting-history');
            }
        } catch (error) {
            console.error('Error:', error);
            alert("오류가 발생했습니다: " + error.message);
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    return (
        <div>
            <Modal
                open={isLoading}
                aria-labelledby="loading-modal"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}>
                    <CircularProgress />
                    <Text>기다리는 중...</Text>
                </Box>
            </Modal>

            <Title>기업정보입력</Title>
            <Stack
                spacing={theme.spacing(3)}
                sx={{
                    maxWidth: '500px',
                    marginLeft: '36%',
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
                                onChange={(e) => setIndustry(e.target.value)}
                                style={{ display: 'flex', flexDirection: 'vertical' }}
                            >
                                <FormControlLabel value="제조업" control={<Radio />} label="제조업"/>
                                <FormControlLabel value="서비스업" control={<Radio />} label="서비스업"/>
                                <FormControlLabel value="정보통신업" control={<Radio />} label="정보통신업"/>
                                <FormControlLabel value="기타" label="기타" control={<Radio />} />
                            </RadioGroup>
                            {industry === '기타' && (
								<TextField
									label="사업분야를 입력해주세요"
									variant="outlined"
									fullWidth
									multiline
									rows={4}
									value={otherIndustry}
									onChange={(e) => setOtherIndustry(e.target.value)}
								/>
							)}
                        </SubSection>
                        <SubSection>
                            <Text bold>1-3. 매출액(최근 3년)</Text>
                            <Input
                                value={revenue}
                                onChange={(e) => setRevenue(e.target.value)}
                                placeholder="최근 3년 매출액을 입력해주세요"
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
                                style={{ display: 'flex', flexDirection: 'vertical' }}
                            >
                                <FormControlLabel value="높은 구축 비용" control={<Radio />} label="높은 구축 비용"/>
                                <FormControlLabel value="인적 자원 부족" control={<Radio />} label="인적 자원 부족"/>
                                <FormControlLabel value="기술 경험 부족" control={<Radio />} label="기술 경험 부족"/>
                                <FormControlLabel value="AI 이점에 대한 불확실성" control={<Radio />} label="AI 이점에 대한 불확실성"/>
                                <FormControlLabel value="경영진의 AI 지식 부족" control={<Radio />} label="경영진의 AI 지식 부족"/>
                                <FormControlLabel value="조직내 저항" control={<Radio />} label="조직내 저항"/>
                                <FormControlLabel value="AX 전략 수립의 어려움" control={<Radio />} label="AX 전략 수립의 어려움"/>
                                <FormControlLabel value="기타" label="기타" control={<Radio />} />
                            </RadioGroup>
                            {painPoint === '기타' && (
								<TextField
									label="기타 사항을 입력해주세요"
									variant="outlined"
									fullWidth
									multiline
									rows={4}
									value={otherPainpoint}
									onChange={(e) => setOtherPainpoint(e.target.value)}
								/>
							)}
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
                                style={{ display: 'flex', flexDirection: 'vertical' }}
                            >
                                <FormControlLabel value="AX 방법론용" control={<Radio />} label="AX 방법론"/>
                                <FormControlLabel value="비즈니스 혁신 및 인사이트 분석" control={<Radio />} label="비즈니스 혁신 및 인사이트 분석"/>
                                <FormControlLabel value="기타" label="기타" control={<Radio />} />
                            </RadioGroup>
                            {consultingField === '기타' && (
								<TextField
									label="기타 사항을 입력해주세요"
									variant="outlined"
									fullWidth
									multiline
									rows={4}
									value={otherConsultingField}
									onChange={(e) => setOtherConsultingField(e.target.value)}
								/>
							)}                        
                        </SubSection>
                        <SubSection>
                            <Text bold>2-4. ai needs</Text>
                            <RadioGroup
                                value={aiNeeds}
                                onChange={(e) => setAiNeeds(e.target.value)}
                                style={{ display: 'flex', flexDirection: 'vertical' }}
                            >
                                <FormControlLabel value="AI 챗봇 및 고객 지원 자동화" control={<Radio />} label="AI 챗봇 및 고객 지원 자동화"/>
                                <FormControlLabel value="업무 자동화" control={<Radio />} label="업무 자동화"/>
                                <FormControlLabel value="AI 응용 제품 및 서비스 개발" control={<Radio />} label="AI 응용 제품 및 서비스 개발"/>
                                <FormControlLabel value="기타" label="기타" control={<Radio />} />
                            </RadioGroup>
                            {aiNeeds === '기타' && (
								<TextField
									label="기타 사항을 입력해주세요"
									variant="outlined"
									fullWidth
									multiline
									rows={4}
									value={otherAiNeeds}
									onChange={(e) => setOtherAiNeeds(e.target.value)}
								/>
							)}                        </SubSection>
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
                    height: '80px',
                    padding: '23px 20px',
                    marginLeft: '40%',
                    fontFamily: "'MPLUSRounded1c', sans-serif",
                    fontWeight:'bold',
                    backgroundColor: 'white',
                    color: '#2F56C7',
                    border: '2px solid #2F56C7',
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    fontSize: '15px',
                    cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#2F56C7';
                    e.target.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'white';
                    e.target.style.color = '#2F56C7';
                }}
                onClick={handleSubmit}
            >
                등록
            </Button>
        </div>
    );
};