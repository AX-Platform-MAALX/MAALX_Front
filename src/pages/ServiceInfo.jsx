import { Stack, useTheme } from '@mui/system';
import { Button, Text } from '../components/atoms/index.js';
import styled from '@emotion/styled';

const Input = styled.input`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    background-color: #f5f5f5;
`;

const TextArea = styled.textarea`
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    background-color: #f5f5f5;
    min-height: 100px;
    resize: vertical;
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

export const ServiceInfoPage = () => {
    const theme = useTheme();

    return (
        <Stack
            spacing={theme.spacing(3)}
            sx={{
                maxWidth: '600px',
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
                        <Input placeholder="가업 기술분야를 입력해주세요" />
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

            <Button style={{ width: '100%', borderRadius: '4px', padding: '12px' }}>등록</Button>
        </Stack>
    );
};
