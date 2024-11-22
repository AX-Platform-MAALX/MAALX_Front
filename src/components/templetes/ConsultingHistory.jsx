import { Stack, useTheme } from '@mui/system';
import { Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { RadioGroup, FormControlLabel, Radio,TextField  } from '@mui/material';

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
  grid-template-columns: 0.7fr 0.8fr 0.5fr 0.4fr;
  padding: 25px 80px;
  background-color: #E7E7E7;
  border-bottom: 1px solid #E5E5E5;
  font-weight: bold;
  gap: 80px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 0.8fr 0.5fr 0.4fr;
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

const FeedbackModal = styled.div`
  padding: 24px;
`;

const FeedbackForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CheckboxItem = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  min-height: 100px;
  resize: vertical;
  margin-top: 8px;
`;

const SubmitButton = styled.button`
  background-color: #2F56C7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  margin-top: 16px;
  
  &:hover {
    background-color: #1f3d8a;
  }
`;

export const ConsultingHistory = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [consultingHistory, setConsultingHistory] = useState([]);
  const [consultingTotal, setConsultingTotal] = useState(0); // total을 상태로 관리
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedConsulting, setSelectedConsulting] = useState(null);
  const [satisfaction,setSatisfaction]=useState('');
  const [dissatisfaction,setDissatisfaction]=useState('');
  const [again,setAgain]=useState('');
  const [addition,setAddition]=useState('');
  const [otherSatisfaction, setOtherSatisfaction] = useState('');
  const [otherDissatisfaction, setOtherDissatisfaction] = useState('');
  Modal.setAppElement("#root");

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')); // 친구 변경 사항
    if (!token) {
      navigate('/login');
      return;
    }
  // API 호출하여 userId에 맞는 컨설팅 내역을 가져오기
  const fetchConsultingHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8080/consulting/user/${user.userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('컨설팅 내역을 가져오는 데 실패했습니다.');
      }

      const data = await response.json();
      console.log(data);
      setConsultingHistory(data);  // 가져온 데이터로 state 업데이트
      setConsultingTotal(data.length); // 전체 컨설팅 횟수 계산
      localStorage.setItem('consultingHistory', JSON.stringify(data));
      localStorage.setItem('totalConsultings', JSON.stringify(data.length));

    } catch (error) {
      console.error(error.message);
    }
  };

  fetchConsultingHistory();
  }, [navigate]);

  const handleViewReport = (id) => {
    navigate(`/consulting/${id}`);
  };
  const createSurvey = async (consultingResponseId) => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
  
      const surveyRequestDto = {
        satisfaction: satisfaction === "기타" ? otherSatisfaction : satisfaction,
        dissatisfaction: dissatisfaction === "기타" ? otherDissatisfaction : dissatisfaction,
        again: again,
        addition: addition,
      };      
  
      const response = await fetch(`http://localhost:8080/survey/create/${consultingResponseId}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(surveyRequestDto),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("설문조사 생성 실패:", errorData.message || "알 수 없는 오류");
        return;
      }
  
      const data = await response.json();
      console.log("설문조사 생성 성공:", data);
    } catch (error) {
      console.error("네트워크 오류:", error.message);
    }
    setModalIsOpen(false);
  };
  const handleFeedbackClick = (consulting) => {
    if (!consulting.feedbackStatus) {
      setSelectedConsulting(consulting);
      setModalIsOpen(true);
    }
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    try {
      await createSurvey(2, surveyRequestDto,token);
      setModalIsOpen(false);
      setConsultingHistory((prev) =>
        prev.map((item) =>
          item.id === selectedConsulting.id
            ? { ...item, feedbackStatus: true }
            : item
        )
      );
    } catch (error) {
      console.error('설문 제출 실패:', error);
    }
  };

  const totalConsultings = consultingTotal;
  const latestConsulting = consultingHistory.length > 0
  ? consultingHistory[consultingHistory.length - 1].createdAt: '없음'; // 가장 최근의 컨설팅 날짜를 가져옵니다.  const nextConsulting = '없음';
  const nextConsulting = '없음';

  return (
    <>
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
          style={{
            textAlign: 'center',
            fontSize:"24px",
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
            {consultingHistory.map((consulting,index) => (
              <TableRow key={consulting.id}>
                <Text>{index + 1}</Text>
                <Text bold>{index + 1}회차 컨설팅 결과</Text>
                <Text>{consulting.createdAt}</Text>
                <FeedbackStatus 
                  isCompleted={consulting.feedbackStatus}
                  onClick={() => handleFeedbackClick(consulting)}
                >
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: '600px',
            margin: 'auto',
            borderRadius: '8px',
            padding: '0'
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }
        }}
      >
        <FeedbackModal>
          <FeedbackForm>
            <Text bold fontSize="20px" style={{ textAlign: 'center', marginBottom: '24px' }}>
              피드백
            </Text>
            <Section>
              <Text bold style={{ marginBottom: '12px' }}>1. 만족한점 (중복선택 가능)</Text>
              <RadioGroup
                  value={satisfaction}
                  onChange={(e) => setSatisfaction(e.target.value)} 
                  style={{ display: 'flex', flexDirection: 'vertical' }} >
                  <FormControlLabel
                    value="Painpoint 해소를 위한 제안이 적절함"
                    control={<Radio />}
                    label="Painpoint 해소를 위한 제안이 적절함"/>
                  <FormControlLabel
                    value="실제 도입 효과가 기대만큼 나타남"
                    control={<Radio />}
                    label="실제 도입 효과가 기대만큼 나타남"/>
                  <FormControlLabel
                    value="컨설팅 과정에서 제공된 설명이 이해하기 쉬움"
                    control={<Radio />}
                    label="컨설팅 과정에서 제공된 설명이 이해하기 쉬움"/>
                  <FormControlLabel
                    value="기타"
                    label="기타"
                    control={<Radio />}/>
              </RadioGroup>
                {satisfaction === "기타" && (
                <TextField
                  label="기타 사항을 입력해주세요"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={otherSatisfaction}
                  onChange={(e) => setOtherSatisfaction(e.target.value)}
                  style={{ marginTop: '16px' }}
                />
              )}
            </Section>
            <Section>
              <Text bold style={{ marginBottom: '12px' }}>2. 불만족한점 (중복선택 가능)</Text>
              <RadioGroup
                  value={dissatisfaction}
                  onChange={(e) => setDissatisfaction(e.target.value)} 
                  style={{ display: 'flex', flexDirection: 'vertical' }} >
                  <FormControlLabel
                    value="Painpoint 해소를 위한 제안이 적절하지 않음"
                    control={<Radio />}
                    label="Painpoint 해소를 위한 제안이 적절하지 않음"/>
                  <FormControlLabel
                    value="추천해준 전략이 너무 추상적임"
                    control={<Radio />}
                    label="추천해준 전략이 너무 추상적임"/>
                  <FormControlLabel
                    value="기업분석이 제대로 되지 않음"
                    control={<Radio />}
                    label="기업분석이 제대로 되지 않음"/>
                  <FormControlLabel
                    value="기타"
                    label="기타"
                    control={<Radio />}/>
              </RadioGroup>
                {dissatisfaction === "기타" && (
                <TextField
                  label="기타 사항을 입력해주세요"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={otherDissatisfaction}
                  onChange={(e) => setOtherDissatisfaction(e.target.value)}
                  style={{ marginTop: '16px' }}
                />
              )}
            </Section>
            <Section>
              <Text bold style={{ marginBottom: '12px' }}>3. 추후에 컨설팅을 다시 받을 의향이 있으신가요?</Text>
              <RadioGroup
                  value={again}
                  onChange={(e) => setAgain(e.target.value)}row
                  style={{ display: 'flex', flexDirection: 'vertical' }} >
                  <FormControlLabel
                    value="있음"
                    control={<Radio />}
                    label="있음"/>
                  <FormControlLabel
                    value="없음"
                    control={<Radio />}
                    label="없음"/>
              </RadioGroup>
              </Section>
              <Section>
              <Text bold style={{ marginBottom: '12px' }}>4. 다음 컨설팅에서 추가적으로 다루고 싶은 점이 있으신가요?</Text>
              <TextArea
                value={addition}
                onChange={(e) => setAddition(e.target.value)}
                placeholder="추가적으로 다루고 싶은 점을 입력해주세요."
              />
              </Section>
            <SubmitButton onClick={() => createSurvey(3)}>
              제출
            </SubmitButton>
          </FeedbackForm>
        </FeedbackModal>
      </Modal>
    </>
  );
}; 