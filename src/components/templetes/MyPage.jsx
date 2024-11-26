import { Stack, useTheme } from '@mui/system';
import { Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Legend,
} from 'recharts';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

const ProfileSection = styled.div({
  backgroundColor: 'white',
  border: '1px solid #e5e5e5',
  borderRadius: '4px',
  padding: '16px',
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const ProfileInfo = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
});

const ProfileDetails = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
});

const ConsultingCount = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  paddingLeft: '24px',
  marginLeft: '24px',
  borderLeft: '1px solid #e5e5e5',
});

const ConsultingSection = styled.div({
  backgroundColor: 'white',
  border: '1px solid #e5e5e5',
  borderRadius: '4px',
  padding: '24px',
  textAlign: 'center',
});

const ChartContainer = styled.div({
  width: '100%',
  height: '500px',
  margin: '24px 0',
  padding: '0 40px',
});

const StatsContainer = styled.div({
  display: 'flex',
  gap: '8px',
  margin: '16px 0',
});

const StatCard = styled.div({
  backgroundColor: '#f8f9fd',
  borderRadius: '4px',
  padding: '8px',
  textAlign: 'center',
  flex: 1,
});

const ConsultingTable = styled.div({
  width: '100%',
  borderTop: '1px solid #e5e5e5',
  marginTop: '24px',
});

const TableRow = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 2fr 1fr',
  padding: '12px',
  borderBottom: '1px solid #e5e5e5',
  '&:last-child': {
    borderBottom: 'none',
  },
});

const ViewButton = styled.button({
  backgroundColor: '#2f56c7',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 16px',
  cursor: 'pointer',
});

const RadioGroup = styled.div({
  display: 'flex',
  gap: '12px',
  width: '100%',
});

const PlanCard = styled.label(props => ({
  display: 'flex',
  flexDirection: 'column',
  padding: '24px',
  border: `2px solid ${props.checked ? '#2f56c7' : '#eee'}`,
  borderRadius: '8px',
  cursor: 'pointer',
  flex: 1,
  position: 'relative',
  backgroundColor: '#fff',

  input: {
    position: 'absolute',
    top: '16px',
    right: '16px',
  },
}));

const PriceText = styled(Text)({
  color: '#ff6b00',
  margin: '8px 0',
  fontWeight: 'bold',
  fontSize: '18px',
});

export const MyPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [userData, setUserData] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState({
    companyName: '',
    industry: '',
    revenue: null,
    painPoint: '',
    detailedIssue: '',
    consultingField: '',
    aiNeeds: '',
    detailedDemand: '',
    date: null,
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Basic');
  const [consultingHistory, setConsultingHistory] = useState([]);
  const [consultingTotal, setConsultingTotal] = useState(0);
  const [consultingStats, setConsultingStats] = useState({
    total: 0,
    completed: 4,
    inProgress: 0,
  });
  const [chartData, setChartData] = useState([]);

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
        const response = await fetch(`http://localhost:8080/consulting`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('컨설팅 내역을 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        console.log(data);
        setConsultingHistory(data);
        setConsultingTotal(data.length);
        localStorage.setItem('consultingHistory', JSON.stringify(data));
        localStorage.setItem('totalConsultings', JSON.stringify(data.length));
        const consultingHistory = JSON.parse(localStorage.getItem('consultingHistory')) || [];
        const revenueData = consultingHistory.map((item, index) => ({
          name: `${index + 1}회차 컨설팅`,
          value: item.revenue,
        }));
        setChartData(revenueData);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchConsultingHistory();
  }, [navigate]);

  const handlePlanChange = async (plan) => {
    setSelectedPlan(plan);
    const isPremium = plan === 'Pro';
    console.log(isPremium);
    try {
      const response = await fetch('http://localhost:8080/user/upgrade', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isPremium }),
      });
      if (!response.ok) {
        throw new Error('회원 상태 변경에 실패했습니다');
      }
      const data = await response.json();
      console.log('회원 상태 변경 성공:', data);
      const updatedUser = JSON.parse(localStorage.getItem('user'));
      updatedUser.isPremium = isPremium;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);
    } catch (error) {
      console.error('회원 상태 변경 실패:', error);
    }
  };

  useEffect(() => {
    const fetchAdditionalInfo = async () => {
      try {
        const response = await fetch('http://localhost:8080/user/additional', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('추가 정보를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setAdditionalInfo(data);
        localStorage.setItem('additionalInfo', JSON.stringify(data));
      } catch (error) {
        console.error(error.message);
      }
    };

    const storedData = localStorage.getItem('additionalInfo');
    if (storedData) {
      setAdditionalInfo(JSON.parse(storedData));
    } else {
      fetchAdditionalInfo();
    }
  }, [token]);

  const openModal = () => {
    console.log('요금제 변경 버튼 클릭됨');
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
        },
      }}
    >
      <Text
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '20px',
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
                {userData?.nickname ? `안녕하세요. ${userData.nickname}님!` : '안녕하세요. TEST 님!'}
              </Text>
              <Text
                color="#666"
                fontSize="14px"
                style={{
                  marginTop: '5px',
                }}
              >
                회원님의 현재 프로그램은 {userData?.isPremium ? 'Pro' : 'Basic'} 입니다
              </Text>
            </div>
          </ProfileInfo>
          <ConsultingCount>
            <Text color="#666" fontSize="14px">
              전체 진행 횟수
            </Text>
            <Text bold fontSize="20px" color="#2F56C7">
              {totalConsultings}회
            </Text>
          </ConsultingCount>
        </ProfileDetails>
        <ViewButton onClick={openModal}>요금제 변경</ViewButton>
      </ProfileSection>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="요금제 변경"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
                  setSelectedPlan(e.target.value);
                }}
              />
              <Text bold fontSize="20px">
                Basic
              </Text>
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
                  setSelectedPlan(e.target.value);
                }}
              />
              <Text bold fontSize="20px">
                Pro
              </Text>
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
            style={{
              padding: '10px',
              marginTop: '20px',
              backgroundColor: '#2F56C7',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
            }}
          >
            변경
          </button>
        </div>
      </Modal>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          marginTop: '20px',
        }}
      >
        <div style={{ marginRight: '50px' }}>
          <h3 style={{ fontWeight: 'bold' }}>1. 기본정보</h3>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '300px',
              margin: '0 auto',
              marginTop: '10px',
            }}
          >
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>사명</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {additionalInfo.companyName}
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>사업분야</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{additionalInfo.industry}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>매출액(최근3년)</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{additionalInfo.revenue}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <h3 style={{ fontWeight: 'bold' }}>2. 부가정보</h3>
          <table
            style={{
              borderCollapse: 'collapse',
              width: '500px',
              margin: '0 auto',
              marginTop: '10px',
            }}
          >
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>Painpoint</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{additionalInfo.painPoint}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>Detailed issue</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {additionalInfo.detailedIssue}
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>Consulting Field</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {additionalInfo.consultingField}
                </td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>Ai needs</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>{additionalInfo.aiNeeds}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>Detailed demand</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                  {additionalInfo.detailedDemand}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ConsultingSection>
        <Text bold fontSize="16px" style={{ marginBottom: '16px', textAlign: 'left' }}>
          매출액 변화
        </Text>
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 40,
                right: 60,
                left: 80,
                bottom: 40,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="name" 
                height={60}
                angle={-45}
                textAnchor="end"
                interval={0}
                tick={{
                  fontSize: 12,
                  dy: 20
                }}
              />
              <YAxis
                width={80}
                domain={[0, Math.max(...chartData.map((item) => item.value)) * 1.2]}
                tickFormatter={(value) => `${(value / 100000000).toFixed(1)}억`}
                interval={0}
                tick={{
                  fontSize: 12,
                  dx: -10
                }}
                padding={{ top: 40 }}
              />
              <Tooltip 
                formatter={(value) => [`${(value / 100000000).toFixed(1)}억`, '매출액']}
              />
              <Legend
                payload={[
                  { value: '매출액', type: 'rect', color: '#2F56C7' },
                  { value: '선형 (매출액)', type: 'line', color: '#666666' },
                ]}
                wrapperStyle={{
                  paddingTop: '20px'
                }}
              />
              <Bar
                dataKey="value"
                fill="#2F56C7"
                barSize={55}
                label={{
                  position: 'top',
                  fill: '#666666',
                  fontSize: 12,
                  formatter: (value) => `${(value / 100000000).toFixed(1)}억`,
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
  );
};
