import { Stack, useTheme } from '@mui/material';
import { Button, Text } from '../components/atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // useParams를 import
import { marked } from 'marked';

const ResultContainer = styled.div`
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    background-color: #fff;
    width: 100%;

    h1, h2, h3 {
        margin-top: 24px;
        margin-bottom: 16px;
        font-weight: 600;
        line-height: 1.25;
    }

    h1 {
        font-size: 2em;
        padding-bottom: 0.3em;
        border-bottom: 1px solid #eee;
    }

    h2 {
        font-size: 1.5em;
        padding-bottom: 0.3em;
        border-bottom: 1px solid #eee;
    }

    h3 {
        font-size: 1.25em;
    }

    p {
        margin-bottom: 16px;
        line-height: 1.6;
    }

    ul, ol {
        padding-left: 2em;
        margin-bottom: 16px;
    }

    li {
        margin-bottom: 8px;
    }

    strong {
        font-weight: 600;
    }
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
    const { consultingIndex } = useParams(); // URL에서 consultingIndex 추출
    const [userPlan, setUserPlan] = useState('Basic');
    const [consultingHistory, setConsultingHistory] = useState([]);
    const [selectedResponseContent, setSelectedResponseContent] = useState(""); // responseContent 상태 추가
    const [consultingResult, setConsultingResult] = useState('');

    useEffect(() => {
        // localStorage에서 컨설팅 데이터와 사용자 요금제 정보 가져오기
        const storedUser = localStorage.getItem('user'); // 예: {nickname: "최영서", userId: 1, isPremium: true}
        const storedConsultingHistory = localStorage.getItem('consultingHistory');
        console.log('consultingIndex:', consultingIndex);  // 디버깅: consultingIndex 출력

        if (storedUser) {
            const user = JSON.parse(storedUser);
            // isPremium 값에 따라 userPlan 설정
            setUserPlan(user.isPremium ? 'Pro' : 'Basic');
        }
        if (storedConsultingHistory) {
            const history = JSON.parse(storedConsultingHistory);
            setConsultingHistory(history);

            // consultingIndex가 URL에서 추출된 값이므로, 이를 사용하여 해당 항목을 찾아 responseContent 설정
            if (consultingIndex) {
                const selectedContent = history.find(item => item.consultingIndex.toString() === consultingIndex);
                console.log('selectedContent:', selectedContent);  // 디버깅: selectedContent 값 출력

                if (selectedContent) {
                    setSelectedResponseContent(selectedContent.responseContent);
                }
            }
        }
    }, [consultingIndex]); // consultingIndex가 변경될 때마다 호출

    useEffect(() => {
        const fetchConsultingResult = async () => {
            try {
                const response = await fetch(`http://localhost:8080/consulting/${consultingIndex}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch consulting result');
                }

                const data = await response.json();
                // marked 라이브러리를 사용하여 마크다운을 HTML로 변환
                const htmlContent = marked(data.prediction);
                setConsultingResult(htmlContent);
            } catch (error) {
                console.error('Error fetching consulting result:', error);
            }
        };

        if (consultingIndex) {
            fetchConsultingResult();
        }
    }, [consultingIndex]);

    const renderBasicContent = () => {
        let parsedContent = "";
        try {
            const contentObj = JSON.parse(selectedResponseContent);
            const fullContent = contentObj.prediction || selectedResponseContent;
            
            // 서론 부분만 추출 (### 1. 서론 부터 다음 ### 까지)
            const introMatch = fullContent.match(/### 1\. 서론([\s\S]*?)(?=###|$)/);
            if (introMatch) {
                parsedContent = `## ${fullContent.split('\n')[0]}\n${introMatch[0]}`; // 제목 + 서론
            } else {
                parsedContent = fullContent; // 매칭되는 부분이 없으면 전체 내용 표시
            }
            
            // 마크다운을 HTML로 변환
            parsedContent = marked(parsedContent);
        } catch (e) {
            parsedContent = selectedResponseContent;
        }

        return (
            <Stack spacing={2}>
                <div 
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                    style={{ 
                        fontSize: '16px',
                        lineHeight: '1.6',
                        '& p': { marginBottom: '1em' }
                    }}
                />
            </Stack>
        );
    };

    const renderProContent = () => {
        // JSON 문자열을 파싱하여 prediction 필드 추출
        let parsedContent = "";
        try {
            const contentObj = JSON.parse(selectedResponseContent);
            parsedContent = contentObj.prediction || selectedResponseContent;
            // 마크다운을 HTML로 변환
            parsedContent = marked(parsedContent);
        } catch (e) {
            parsedContent = selectedResponseContent;
        }

        return (
            <Stack spacing={3}>
                <Text bold fontSize="18px">[전문]</Text>
                <div 
                    dangerouslySetInnerHTML={{ __html: parsedContent }}
                    style={{ 
                        fontSize: '16px',
                        lineHeight: '1.6',
                        '& p': { marginBottom: '1em' }
                    }}
                />
            </Stack>
        );
    };

    return (
        <Stack 
            spacing={theme.spacing(3)} 
            sx={{ 
                maxWidth: '800px',
                margin: '0 auto',
                padding: theme.spacing(4)
            }}
        >
            <Text bold style={{fontSize:"24px"}}>컨설팅 결과</Text>
            
            <TabContainer>
                <Tab 
                    active={activeTab === '요약본'} 
                    onClick={() => setActiveTab('요약본')}                >
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
            </TabContainer>

            <ResultContainer style={{ width: '700px'}}> 
                {activeTab === '요약본' ? renderBasicContent() : renderProContent()}
            </ResultContainer>
        </Stack>
    );
};
