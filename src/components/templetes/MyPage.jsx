import { Stack, useTheme } from '@mui/system';
import { Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, Legend } from 'recharts';
import Modal from 'react-modal';  // 모달 임포트
import { useNavigate } from 'react-router-dom';

const ProfileSection = styled.div`
  background-color: white;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ProfileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const ConsultingCount = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 24px;
  margin-left: 24px;
  border-left: 1px solid #E5E5E5;
`;

const ConsultingSection = styled.div`
  background-color: white;
  border: 1px solid #E5E5E5;
  border-radius: 4px;
  padding: 24px;
  text-align: center;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 500px;
  margin: 24px 0;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin: 16px 0;
`;

const StatCard = styled.div`
  background-color: #F8F9FD;
  border-radius: 4px;
  padding: 8px;
  text-align: center;
  flex: 1;
`;

const ConsultingTable = styled.div`
  width: 100%;
  border-top: 1px solid #E5E5E5;
  margin-top: 24px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  padding: 12px;
  border-bottom: 1px solid #E5E5E5;
  &:last-child {
    border-bottom: none;
  }
`;

const ViewButton = styled.button`
  background-color: #2F56C7;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
`;
const RadioGroup = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
`;
const PlanCard = styled.label`
    display: flex;
    flex-direction: column;
    padding: 24px;
    border: 2px solid ${props => props.checked ? '#2f56c7' : '#eee'};
    border-radius: 8px;
    cursor: pointer;
    flex: 1;
    position: relative;
    background-color: #fff;
    
    input {
        position: absolute;
        top: 16px;
        right: 16px;
    }
`;
const PriceText = styled(Text)`
    color: #FF6B00;
    margin: 8px 0;
    font-weight: bold;
    font-size: 18px;
`;
export const MyPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token'); 
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);  // 모달 상태 관리
  const [selectedPlan, setSelectedPlan] = useState('Basic'); // 기본값은 'Basic'으로 설정
  const [consultingTotal, setConsultingTotal] = useState(0); // total을 상태로 관리
  const [consultingStats, setConsultingStats] = useState({
    total: 0,
    completed: 4,
    inProgress: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); 
    setUserData(user);
    if (user?.isPremium) {
      setSelectedPlan('Pro');
    } else {
      setSelectedPlan('Basic');
    }
    
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
      setConsultingTotal(data.length); // 전체 컨설팅 횟수 계산
    } catch (error) {
      console.error(error.message);
    }
  };
  fetchConsultingHistory();
  }, [navigate]);;

  const handlePlanChange = async (plan) => {
    setSelectedPlan(plan);
    const isPremium = plan === 'Pro';
    console.log(isPremium);
    try {
      const response = await fetch('http://localhost:8080/user/upgrade', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPremium }),
      });
      if (!response.ok) {
        throw new Error('회원 상태 변경에 실패했습니다');
      }
      const data = await response.json();
      console.log('회원 상태 변경 성공:', data);
      // 로컬스토리지의 user 데이터를 업데이트
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      updatedUser.isPremium = isPremium;  // isPremium 값을 업데이트

      // 업데이트된 user 데이터를 로컬스토리지에 다시 저장
      localStorage.setItem('user', JSON.stringify(updatedUser));
      // const updatedUser = { ...userData, isPremium };  // 기존 userData를 복사하고, isPremium만 업데이트
      setUserData(updatedUser);  // userData 상태 업데이트
    } catch (error) {
      console.error('회원 상태 변경 실패:', error);
    }
  };
  // 모달 열기
  const openModal = () => {
    console.log('요금제 변경 버튼 클릭됨');
    setModalIsOpen(true);
  };
      
  // 모달 닫기
  const closeModal = () => {
    setModalIsOpen(false);
  };
  // 임시 컨설팅 데이터
  const consultingData = [
    { date: '2024.03.01', title: '컨설팅 진행 현황', status: '완료됨' },
    { date: '2024.02.15', title: '컨설팅 진행 현황', status: '완료됨' },
    { date: '2024.02.01', title: '컨설팅 진행 현황', status: '완료됨' },
    { date: '2024.01.15', title: '컨설팅 진행 현황', status: '완료됨' },
  ];
  // 컨설팅 데이터 (그래프용)
  const chartData = [
    { name: '1회차 컨설팅', value: 270, line: 270 },
    { name: '2회차 컨설팅', value: 320, line: 320 },
    { name: '3회차 컨설팅', value: 330, line: 330 },
    { name: '4회차 컨설팅', value: 360, line: 360 },
  ];
  const totalConsultings = consultingTotal;

  return (
    <Stack
      spacing={3}
      sx={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px',
        '@media (max-width: 1200px)': {
          maxWidth: '100%',
          padding: '24px 16px',
        }
      }}
    >
      <Text  
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '20px'
        }}
      >
        마이페이지
      </Text>

      <ProfileSection>
        <ProfileDetails>
          <ProfileInfo>
            <img
              src="/images/profile.png"
              alt="Profile"
              style={{ width: '48px', height: '48px', borderRadius: '50%' }}
            />
            <div>
              <Text bold fontSize="16px">
                {userData?.nickname ? 
                  `안녕하세요. ${userData.nickname}님!` : 
                  '안녕하세요. TEST 님!'
                }
              </Text>
              <Text color="#666" fontSize="14px" 
              style={{
                marginTop:'5px'
              }}>
                회원님의 현재 프로그램은 {userData?.isPremium ? 'Pro' : 'Basic'} 입니다
              </Text>
            </div>
          </ProfileInfo>
          <ConsultingCount>
            <Text color="#666" fontSize="14px">전체 진행 횟수</Text>
            <Text bold fontSize="20px" color="#2F56C7">
              {totalConsultings}회
            </Text>
          </ConsultingCount>
        </ProfileDetails>
        <ViewButton onClick={openModal}>요금제 변경</ViewButton> {/* 닫는 태그 추가 */}
      </ProfileSection>
{/* 모달 */}
<Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="요금제 변경"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',  // 모달 배경
            },
            content: {
              width: '430px',
              height: '300px',
              margin: 'auto',
              padding: '20px',
              textAlign: 'center',
              borderRadius: '8px',
              background: '#fff',
            },
          }}
        >
          <Stack spacing={4}>
                    <Text bold>요금제 변경</Text>
                    <RadioGroup>
                        <PlanCard checked={selectedPlan === 'Basic'}>
                            <input 
                                type="radio" 
                                name="plan" 
                                value="Basic" 
                                checked={selectedPlan === 'Basic'}
                                onChange={(e) => {
                                    setSelectedPlan(e.target.value);}}
                            />
                            <Text bold fontSize="20px">Basic</Text>
                            <Text fontSize="18px">무료</Text>
                            <Text style={{ marginTop: '12px' }}>• 요약본 제공</Text>
                        </PlanCard>
                        <PlanCard checked={selectedPlan === 'Pro'}>
                            <input 
                                type="radio" 
                                name="plan" 
                                value="Pro"
                                checked={selectedPlan === 'Pro'}
                                onChange={(e) => {
                                    setSelectedPlan(e.target.value);}}
                            />
                            <Text bold fontSize="20px">Pro</Text>
                            <PriceText>￦ 1000</PriceText>
                            <Text>• 전문 제공</Text>
                            <Text>• 문제분석과 계획 제공</Text>
                        </PlanCard>
                    </RadioGroup>
                </Stack>
          <div>
          <button
            onClick={() => {
              handlePlanChange(selectedPlan);
              closeModal();
            }} 
            style={{ padding: '10px', marginTop: '20px', backgroundColor: '#2F56C7', color: '#fff', border: 'none', borderRadius: '4px' }}>변경</button>
        </div>
      </Modal>
      {/* 컨설팅 내역 섹션 추가 */}
      <ConsultingSection>
        <Text bold fontSize="16px" style={{ marginBottom: '16px', textAlign: 'left' }}>
          매출액 변화
        </Text>

        {/* 차트 컨테이너 */}
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, 450]}
                ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400, 450]} // 50 단위로 눈금 설정
                interval={0} // 모든 눈금을 표시
              />
              <Tooltip />
              <Legend 
                payload={[
                  { value: '매출액', type: 'rect', color: '#2F56C7' },
                  { value: '선형 (매출액)', type: 'line', color: '#666666' }
                ]}
              />
              <Bar 
                dataKey="value" 
                fill="#2F56C7" 
                barSize={55}
                label={{ 
                  position: 'top',
                  fill: '#666666',
                  fontSize: 12,
                  formatter: (value) => `${value}`,
                  dy: -10
                }}
              />
              <Line 
                type="monotone" 
                dataKey="line" 
                stroke="#666666" 
                strokeDasharray="5 5" 
                dot={{ fill: '#666666' }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ConsultingSection>
    </Stack>
  )
}