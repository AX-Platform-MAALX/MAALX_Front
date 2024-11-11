import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../components/atoms/index.js';
import styled from '@emotion/styled';

const Section = styled.div`
    margin-bottom: 24px;
`;

const InfoCard = styled.div`
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #fff;
    margin-bottom: 16px;
`;

export const ConsultingInfoPage = () => {
    const theme = useTheme();

    return (
        <Stack
            spacing={theme.spacing(3)}
            sx={{
                maxWidth: '800px',
                margin: '0 auto',
                padding: theme.spacing(4)
            }}
        >
            <Text bold fontSize="24px">MAALX 서비스 안내</Text>
            
            <Section>
                <InfoCard>
                    <Text bold fontSize="18px" style={{ marginBottom: '12px' }}>
                        MAALX 소개
                    </Text>
                    <Text style={{ marginBottom: '12px' }}>
                        MAALX는 기업의 디지털 혁신을 선도하는 AI 전문 기업입니다. 
                        최신 AI 기술과 전문가의 경험을 결합하여 기업의 디지털 전환을 성공적으로 이끌어냅니다.
                    </Text>
                    <Stack spacing={1}>
                        <Text>• 기업 맞춤형 AI 솔루션 전문</Text>
                        <Text>• 풍부한 산업 경험과 전문성</Text>
                        <Text>• 최신 AI 기술 적용</Text>
                        <Text>• 지속적인 기술 지원 및 유지보수</Text>
                    </Stack>
                </InfoCard>
            </Section>

            <Text bold fontSize="20px">AI 컨설팅 서비스</Text>
            
            <Section>
                <InfoCard>
                    <Text bold fontSize="18px" style={{ marginBottom: '12px' }}>
                        서비스 개요
                    </Text>
                    <Text>
                        MAALX의 AI 컨설팅 서비스는 기업의 디지털 전환을 위한 맞춤형 솔루션을 제공합니다. 
                        기업의 현재 상태를 분석하고 AI 기술을 활용한 최적의 해결방안을 제시합니다.
                    </Text>
                </InfoCard>

                <InfoCard>
                    <Text bold fontSize="18px" style={{ marginBottom: '12px' }}>
                        서비스 특징
                    </Text>
                    <Stack spacing={1}>
                        <Text>• 기업 맞춤형 AI 솔루션 제안</Text>
                        <Text>• 상세한 현황 분석 및 진단</Text>
                        <Text>• 구체적인 실행 방안 제시</Text>
                        <Text>• 전문가의 체계적인 컨설팅</Text>
                    </Stack>
                </InfoCard>

                <InfoCard>
                    <Text bold fontSize="18px" style={{ marginBottom: '12px' }}>
                        진행 절차
                    </Text>
                    <Stack spacing={1}>
                        <Text>1. 기업 정보 입력</Text>
                        <Text>2. AI 기반 분석 진행</Text>
                        <Text>3. 맞춤형 솔루션 도출</Text>
                        <Text>4. 상세 보고서 제공</Text>
                    </Stack>
                </InfoCard>
            </Section>

            <Button 
                style={{ 
                    width: '100%', 
                    borderRadius: '4px', 
                    padding: '12px' 
                }}
            >
                컨설팅 시작하기
            </Button>
        </Stack>
    );
}; 