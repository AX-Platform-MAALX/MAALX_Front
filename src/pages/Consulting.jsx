import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../components/atoms/index.js';
import styled from '@emotion/styled';
import { useState } from 'react';

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
    const [showResult, setShowResult] = useState(false);
    
    const handleSubmit = () => {
        setShowResult(true);
    };

    const renderBasicContent = () => (
        <Stack spacing={2}>
            <Text bold fontSize="18px">[요약본]</Text>
            <Text>
                AI Innovators Co.는 인공지능 및 클라우드 기술을 중심으로 한 성장형 IT 기업으로, 최근 5년간 매출이 꾸준히 증가하며 2023년 기준 1조 2000억 원을 기록했다. 현재 3000명의 직원을 두고 있으며, 주요 기술 분야는 인공지능, 머신러닝, 클라우드 등 첨단 기술이 포함이다.
            </Text>
            <Text>
                기업이 직면한 주요 과제는 AI 기술 도입을 통한 업무 프로세스 최적화와 고객 경험 향상이며, 이를 위해 AI 기반 고객 지원 시스템 구축과 자동화 솔루션 도입을 계획하고 있다.
            </Text>
        </Stack>
    );

    const renderProContent = () => (
        <Stack spacing={3}>
            <Text bold fontSize="18px">[전문]</Text>
            <Stack spacing={2}>
                <Text bold>1. 현재 AI 분석 및 평가의 분석</Text>
                <Text>
                    AI Innovators Co.가 보유한 AI 관련 분야 사업에서는 AI분석 경험(UX)을 향상시키기 위한 AI 기술의 도입이 증가하고 있습니다. 현재 기업의 주요 기술 스택은 다음과 같습니다:
                </Text>
                <Text>
                    • 인공지능 및 머신러닝 기술
                    • 클라우드 인프라스트럭처
                    • 데이터 분석 및 처리 시스템
                </Text>
            </Stack>
            <Stack spacing={2}>
                <Text bold>2. 문제점 해결하기 위한 계획</Text>
                <Text>
                    • AI 기반 고객 지원 시스템 구축: 사용자 만족도 향상
                    • AI 기술 활용 자동화: 업무 프로세스 최적화
                    • 데이터 기반 의사결정 시스템 도입: 경영 효율성 증대
                </Text>
            </Stack>
            <Stack spacing={2}>
                <Text bold>3. 기대효과</Text>
                <Text>
                    • 고객 서비스 품질 향상: 24/7 지원 체계 구축
                    • 운영 비용 절감: 자동화를 통한 효율성 증대
                    • 데이터 기반 의사결정: 정확한 시장 예측 및 대응
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

    if (!showResult) {
        return (
            <Stack
                spacing={theme.spacing(3)}
                sx={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    padding: theme.spacing(4)
                }}
            >
                <Text bold fontSize="24px">기업정보입력</Text>
                
                <Section>
                    <SectionTitle bold>1. 기본정보</SectionTitle>
                    <Stack spacing={2}>
                        <SubSection>
                            <Text>1-1. 사명</Text>
                            <Input placeholder="사명을 입력해주세요" />
                        </SubSection>
                        <SubSection>
                            <Text>1-2. 매출액(최근 5년)</Text>
                            <Input placeholder="최근 5년 매출액을 입력해주세요" />
                        </SubSection>
                        <SubSection>
                            <Text>1-3. 기술분야</Text>
                            <Input placeholder="기업 기술분야를 입력해주세요" />
                        </SubSection>
                        <SubSection>
                            <Text>1-4. 사원수</Text>
                            <Input placeholder="사원수를 입력해주세요" />
                        </SubSection>
                        <SubSection>
                            <Text>1-5. 시가총액</Text>
                            <Input placeholder="시가총액을 입력해주세요" />
                        </SubSection>
                    </Stack>
                </Section>

                <Section>
                    <SectionTitle bold>2. 부가정보</SectionTitle>
                    <Stack spacing={2}>
                        <SubSection>
                            <Text>2-1. 희망전환점 분야</Text>
                            <TextArea placeholder="희망하는 전환점 분야를 입력해주세요" />
                        </SubSection>
                        <SubSection>
                            <Text>2-2. painpoint</Text>
                            <TextArea placeholder="painpoint를 입력해주세요" />
                        </SubSection>
                        <SubSection>
                            <Text>2-3. 희망 AI 기술</Text>
                            <TextArea placeholder="희망하는 AI 기술을 입력해주세요" />
                        </SubSection>
                    </Stack>
                </Section>

                <Button 
                    onClick={handleSubmit}
                    style={{ width: '100%', borderRadius: '4px', padding: '12px' }}
                >
                    등록
                </Button>
            </Stack>
        );
    }

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
                <Tab 
                    active={activeTab === '전문'} 
                    onClick={() => setActiveTab('전문')}
                >
                    전문
                </Tab>
                <PDFButton>PDF 다운로드</PDFButton>
            </TabContainer>

            <ResultContainer>
                {activeTab === '요약본' ? renderBasicContent() : renderProContent()}
            </ResultContainer>
        </Stack>
    );
};
