import { Stack, useTheme } from '@mui/system';
import { Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

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

const FeedbackModal = styled.div`
  padding: 24px;
`;

const FeedbackForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CheckboxGroup = styled.div`
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedConsulting, setSelectedConsulting] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState({
    satisfiedPoints: {
      painpointSolution: false,
      expectedEffect: false,
      easyToUnderstand: false,
      satisfiedEtc: false
    },
    satisfiedComment: '',
    
    unsatisfiedPoints: {
      inappropriateSolution: false,
      tooAbstract: false,
      poorAnalysis: false,
      unsatisfiedEtc: false
    },
    unsatisfiedComment: '',
    
    willConsultAgain: true,
    
    additionalComments: ''
  });

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
        feedbackStatus: false
      },
      { 
        id: 2,
        round: '2회차',
        title: '2회차 컨설팅 결과', 
        date: '2024.02.15',
        feedbackStatus: false
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

  const handleFeedbackClick = (consulting) => {
    if (!consulting.feedbackStatus) {
      setSelectedConsulting(consulting);
      setModalIsOpen(true);
    }
  };

  const handleSubmit = () => {
    console.log('피드백 제출:', feedbackForm);
    setModalIsOpen(false);
    setConsultingHistory(prev =>
      prev.map(item =>
        item.id === selectedConsulting.id
          ? { ...item, feedbackStatus: true }
          : item
      )
    );
  };

  const totalConsultings = consultingHistory.length;
  const latestConsulting = consultingHistory[0]?.date || '없음';
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
            <CheckboxGroup>
              <Text bold style={{ marginBottom: '12px' }}>1. 만족한점 (중복선택 가능)</Text>
              <CheckboxItem>
                <input
                  type="checkbox"
                  name="painpointSolution"
                  checked={feedbackForm.satisfiedPoints.painpointSolution}
                  onChange={(e) => setFeedbackForm(prev => ({
                    ...prev,
                    satisfiedPoints: {
                      ...prev.satisfiedPoints,
                      painpointSolution: e.target.checked
                    }
                  }))}
                />
                <span>Painpoint 해소를 위한 제안이 적절함</span>
              </CheckboxItem>
              <CheckboxItem>
                <input
                  type="checkbox"
                  name="expectedEffect"
                  checked={feedbackForm.satisfiedPoints.expectedEffect}
                  onChange={(e) => setFeedbackForm(prev => ({
                    ...prev,
                    satisfiedPoints: {
                      ...prev.satisfiedPoints,
                      expectedEffect: e.target.checked
                    }
                  }))}
                />
                <span>실제 도입 효과가 기대만큼 나타남</span>
              </CheckboxItem>
              <CheckboxItem>
                <input
                  type="checkbox"
                  name="easyToUnderstand"
                  checked={feedbackForm.satisfiedPoints.easyToUnderstand}
                  onChange={(e) => setFeedbackForm(prev => ({
                    ...prev,
                    satisfiedPoints: {
                      ...prev.satisfiedPoints,
                      easyToUnderstand: e.target.checked
                    }
                  }))}
                />
                <span>컨설팅 과정에서 제공된 설명이 이해하기 쉬움</span>
              </CheckboxItem>
              <CheckboxItem>
                <input
                  type="checkbox"
                  name="satisfiedEtc"
                  checked={feedbackForm.satisfiedPoints.satisfiedEtc}
                  onChange={(e) => setFeedbackForm(prev => ({
                    ...prev,
                    satisfiedPoints: {
                      ...prev.satisfiedPoints,
                      satisfiedEtc: e.target.checked
                    }
                  }))}
                />
                <span>기타</span>
              </CheckboxItem>
              <TextArea
                value={feedbackForm.satisfiedComment}
                onChange={(e) => setFeedbackForm(prev => ({
                  ...prev,
                  satisfiedComment: e.target.value
                }))}
                placeholder="만족한점을 입력해주세요."
              />
            </CheckboxGroup>

            <CheckboxGroup>
              <Text bold style={{ marginBottom: '12px' }}>2. 불만족한점 (중복선택 가능)</Text>
              <CheckboxItem>
                <input
                  type="checkbox"
                  name="inappropriateSolution"
                  checked={feedbackForm.unsatisfiedPoints.inappropriateSolution}
                  onChange={(e) => setFeedbackForm(prev => ({
                    ...prev,
                    unsatisfiedPoints: {
                      ...prev.unsatisfiedPoints,
                      inappropriateSolution: e.target.checked
                    }
                  }))}
                />
                <span>Painpoint 해소를 위한 제안이 적절하지 않음</span>
              </CheckboxItem>
              <CheckboxItem>
                <input
                  type="checkbox"
                  name="tooAbstract"
                  checked={feedbackForm.unsatisfiedPoints.tooAbstract}
                  onChange={(e) => setFeedbackForm(prev => ({
                    ...prev,
                    unsatisfiedPoints: {
                      ...prev.unsatisfiedPoints,
                      tooAbstract: e.target.checked
                    }
                  }))}
                />
                <span>추천해준 전략이 너무 추상적임</span>
              </CheckboxItem>
              <CheckboxItem>
                <input
                  type="checkbox"
                  name="poorAnalysis"
                  checked={feedbackForm.unsatisfiedPoints.poorAnalysis}
                  onChange={(e) => setFeedbackForm(prev => ({
                    ...prev,
                    unsatisfiedPoints: {
                      ...prev.unsatisfiedPoints,
                      poorAnalysis: e.target.checked
                    }
                  }))}
                />
                <span>기업분석이 제대로 되지 않음</span>
              </CheckboxItem>
              <CheckboxItem>
                <input
                  type="checkbox"
                  name="unsatisfiedEtc"
                  checked={feedbackForm.unsatisfiedPoints.unsatisfiedEtc}
                  onChange={(e) => setFeedbackForm(prev => ({
                    ...prev,
                    unsatisfiedPoints: {
                      ...prev.unsatisfiedPoints,
                      unsatisfiedEtc: e.target.checked
                    }
                  }))}
                />
                <span>기타</span>
              </CheckboxItem>
              <TextArea
                value={feedbackForm.unsatisfiedComment}
                onChange={(e) => setFeedbackForm(prev => ({
                  ...prev,
                  unsatisfiedComment: e.target.value
                }))}
                placeholder="불만족한점을 입력해주세요."
              />
            </CheckboxGroup>

            <div>
              <Text bold style={{ marginBottom: '12px' }}>3. 추후에 컨설팅을 다시 받을 의향이 있으신가요?</Text>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    name="willConsultAgain"
                    checked={feedbackForm.willConsultAgain}
                    onChange={() => setFeedbackForm(prev => ({
                      ...prev,
                      willConsultAgain: true
                    }))}
                  />
                  <span>있음</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="radio"
                    name="willConsultAgain"
                    checked={!feedbackForm.willConsultAgain}
                    onChange={() => setFeedbackForm(prev => ({
                      ...prev,
                      willConsultAgain: false
                    }))}
                  />
                  <span>없음</span>
                </label>
              </div>
            </div>

            <div>
              <Text bold style={{ marginBottom: '12px' }}>4. 다음 컨설팅에서 추가적으로 다루고 싶은 점이 있으신가요?</Text>
              <TextArea
                value={feedbackForm.additionalComments}
                onChange={(e) => setFeedbackForm(prev => ({
                  ...prev,
                  additionalComments: e.target.value
                }))}
                placeholder="추가적으로 다루고 싶은 점을 입력해주세요."
              />
            </div>

            <SubmitButton onClick={handleSubmit}>
              제출
            </SubmitButton>
          </FeedbackForm>
        </FeedbackModal>
      </Modal>
    </>
  );
}; 