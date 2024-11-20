import { Stack, useTheme } from '@mui/system';
import { Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ConsultingSection = styled.div`
  background-color: white;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  padding: 32px;
  margin-bottom: 24px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const TableContainer = styled.div`
  width: 100%;
  border-top: 1px solid #E5E5E5;
  margin-top: 16px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 3fr 1.2fr 1.2fr;
  padding: 25px 80px;
  background-color: #F8F9FD;
  border-bottom: 1px solid #E5E5E5;
  font-weight: bold;
  gap: 80px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 3fr 1.2fr 1.2fr;
  padding: 25px 80px;
  border-bottom: 1px solid #E5E5E5;
  align-items: center;
  gap: 80px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const FeedbackStatus = styled.div`
  color: ${props => props.isCompleted ? '#2F56C7' : '#666'};
  font-weight: ${props => props.isCompleted ? 'bold' : 'normal'};
  cursor: pointer;
`;

const ViewButton = styled.button`
  background-color: #2F56C7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  
  &:hover {
    background-color: #1f3d8a;
  }
`;

export const ConsultingHistory = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [consultingHistory, setConsultingHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    setConsultingHistory([
      { 
        id: 1,
        round: '1회차',
        title: '1회차 컨설팅 결과', 
        date: '2024.03.01',
        feedbackStatus: true
      },
      { 
        id: 2,
        round: '2회차',
        title: '2회차 컨설팅 결과', 
        date: '2024.02.15',
        feedbackStatus: true
      },
      { 
        id: 3,
        round: '3회차',
        title: '3회차 컨설팅 결과', 
        date: '2024.02.01',
        feedbackStatus: true
      },
      { 
        id: 4,
        round: '4회차',
        title: '4회차 컨설팅 결과', 
        date: '2024.01.15',
        feedbackStatus: true
      },
    ]);
  }, [navigate]);

  const handleViewReport = (id) => {
    navigate(`/consulting/${id}`);
  };

  const totalConsultings = consultingHistory.length;
  const latestConsulting = consultingHistory[0]?.date || '없음';
  const nextConsulting = '없음';

  return (
    <Stack
      spacing={3}
      sx={{
        maxWidth: '1800px',
        margin: '0 auto',
        padding: '24px',
        '@media (max-width: 1800px)': {
          maxWidth: '100%',
          padding: '24px 16px',
        }
      }}
    >
      <Text 
        bold 
        fontSize="20px"
        style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        컨설팅 기록
      </Text>

      <ConsultingSection>
        <Text 
          bold 
          fontSize="16px"
          style={{
            marginBottom: '16px'
          }}
        >
          전체 컨설팅 내역
        </Text>

        <TableContainer>
          <TableHeader>
            <Text>회차</Text>
            <Text>제목</Text>
            <Text>날짜</Text>
            <Text>피드백</Text>
          </TableHeader>
          {consultingHistory.map((consulting) => (
            <TableRow key={consulting.id}>
              <Text>{consulting.round}</Text>
              <Text bold>{consulting.title}</Text>
              <Text>{consulting.date}</Text>
              <FeedbackStatus isCompleted={consulting.feedbackStatus}>
                {consulting.feedbackStatus ? '피드백 완료' : '피드백 미완료'}
              </FeedbackStatus>
            </TableRow>
          ))}
        </TableContainer>
      </ConsultingSection>

      <ConsultingSection>
        <Text 
          bold 
          fontSize="16px"
          style={{
            marginBottom: '16px'
          }}
        >
          컨설팅 요약
        </Text>
        <Text style={{ marginBottom: '8px' }}>
          • 총 진행 횟수: {totalConsultings}회
        </Text>
        <Text style={{ marginBottom: '8px' }}>
          • 최근 컨설팅: {latestConsulting}
        </Text>
        <Text>
          • 다음 예정 컨설팅: {nextConsulting}
        </Text>
      </ConsultingSection>
    </Stack>
  );
}; 