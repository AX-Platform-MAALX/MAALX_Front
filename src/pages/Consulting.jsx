import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../components/atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';

const ResultContainer = styled.div`
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #fff;
    width: 100%;
`;

const TabContainer = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${props => props.active ? '#2f56c7' : '#f5f5f5'};
    color: ${props => props.active ? '#fff' : '#000'};
    cursor: pointer;
`;

const PDFButton = styled(Button)`
    background-color: #f5f5f5;
    color: #000;
    &:hover {
        background-color: #e5e5e5;
    }
`;

const Input = styled.input`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    height: 40px;
    background-color: #f5f5f5;
    font-size: 16px;
`;

const TextArea = styled.textarea`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    background-color: #f5f5f5;
    min-height: 120px;
    resize: vertical;
    font-size: 16px;
`;

const Section = styled.div`
    margin-bottom: 24px;
`;

const SectionTitle = styled(Text)`
    font-size: 18px;
    margin-bottom: 16px;
`;

const SubSection = styled(Stack)`
    margin-bottom: 16px;
`;

export const ConsultingPage = () => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = useState('요약본');
    const [consultingData, setConsultingData] = useState(null);
    const [userPlan, setUserPlan] = useState('Basic');

    useEffect(() => {
        // localStorage에서 컨설팅 데이터와 사용자 요금제 정보 가져오기
        const storedData = localStorage.getItem('consultingData');
        const storedPlan = localStorage.getItem('userPlan');
        
        console.log('Stored Data:', storedData); // 디버깅용 로그
        console.log('Stored Plan:', storedPlan); // 디버깅용 로그
        
        if (storedData) {
            setConsultingData(JSON.parse(storedData));
        }
        if (storedPlan) {
            setUserPlan(storedPlan);
        }
    }, []);

    const renderBasicContent = () => (
        <Stack spacing={2}>
            <Text bold fontSize="18px">[요약본]</Text>
            <Text>
                {consultingData?.companyName}는 {consultingData?.technologyField}을 중심으로 한 성장형 IT 기업으로, 
                현재 매출액은 {consultingData?.revenue}원이며, {consultingData?.employeeCount}명의 직원을 보유하고 있습니다.
            </Text>
            <Text>
                기업이 직면한 주요 과제는 {consultingData?.painPoint}이며, 
                이를 위해 {consultingData?.preferredAITech} 기술 도입을 계획하고 있습니다.
            </Text>
        </Stack>
    );

    const renderProContent = () => (
        <Stack spacing={3}>
            <Text bold fontSize="18px">[전문]</Text>
            <Stack spacing={2}>
                <Text bold>1. 현재 AI 분석 및 평가의 분석</Text>
                <Text>
                    {consultingData?.companyName}가 보유한 AI 관련 분야 사업에서는 AI분석 경험(UX)을 향상시키기 위한 AI 기술의 도입이 증가하고 있습니다. 현재 기업의 주요 기술 스택은 다음과 같습니다:
                </Text>
                <Text>
                    • {consultingData?.technologyField}
                    • AI 및 머신러닝 기술
                    • 데이터 분석 및 처리 시스템
                </Text>
            </Stack>
            <Stack spacing={2}>
                <Text bold>2. 문제점 해결하기 위한 계획</Text>
                <Text>
                    • {consultingData?.painPoint} 해결을 위한 계획
                    • {consultingData?.preferredAITech} 기술 도입
                    • 데이터 기반 의사결정 시스템 도입
                </Text>
            </Stack>
            <Stack spacing={2}>
                <Text bold>3. 기대효과</Text>
                <Text>
                    • 고객 서비스 품질 향상
                    • 운영 비용 절감
                    • 데이터 기반 의사결정 강화
                </Text>
            </Stack>
            <Stack spacing={2}>
                <Text bold>4. 향후 발전 방향</Text>
                <Text>
                    • AI 기술 고도화를 통한 서비스 품질 향상
                    • 글로벌 시장 진출을 위한 기술 경쟁력 확보
                    • 지속 가능한 성장을 위한 R&D 투자 확대
                </Text>
            </Stack>
        </Stack>
    );

    return (
        <Stack 
            spacing={theme.spacing(3)} 
            sx={{ 
                maxWidth: '800px',
                margin: '0 auto',
                padding: theme.spacing(4)
            }}
        >
            <Text bold fontSize="24px">컨설팅 결과</Text>
            
            <TabContainer>
                <Tab 
                    active={activeTab === '요약본'} 
                    onClick={() => setActiveTab('요약본')}
                >
                    요약본
                </Tab>
                {userPlan === 'Pro' && (
                    <Tab 
                        active={activeTab === '전문'} 
                        onClick={() => setActiveTab('전문')}
                    >
                        전문
                    </Tab>
                )}
                <PDFButton>PDF 다운로드</PDFButton>
            </TabContainer>

            <ResultContainer>
                {activeTab === '요약본' ? renderBasicContent() : renderProContent()}
            </ResultContainer>
        </Stack>
    );
};
