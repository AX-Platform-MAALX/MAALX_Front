import { Stack, useTheme } from '@mui/system';
import { Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line, Legend } from 'recharts';

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
  height: 400px;
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

export const MyPage = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState(null);
  const [consultingStats] = useState({
    total: 4,
    completed: 4,
    inProgress: 0
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserData(user);
  }, []);

  // 임시 컨설팅 데이터
  const consultingData = [
    { date: '2024.03.01', title: '컨설팅 진행 현황', status: '완료됨' },
    { date: '2024.02.15', title: '컨설팅 진행 현황', status: '완료됨' },
    { date: '2024.02.01', title: '컨설팅 진행 현황', status: '완료됨' },
    { date: '2024.01.15', title: '컨설팅 진행 현황', status: '완료됨' },
  ];

  // 컨설팅 데이터 (그래프용)
  const chartData = [
    { name: '1회차 컨설팅', value: 270 },
    { name: '2회차 컨설팅', value: 320 },
    { name: '3회차 컨설팅', value: 330 },
    { name: '4회차 컨설팅', value: 360 },
  ];

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
        bold 
        fontSize="20px"
        style={{
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
              <Text color="#666" fontSize="14px">
                회원님의 현재 프로그램은 Pro 입니다
              </Text>
            </div>
          </ProfileInfo>
          <ConsultingCount>
            <Text color="#666" fontSize="14px">전체 진행 횟수</Text>
            <Text bold fontSize="20px" color="#2F56C7">
              {consultingStats.total}회
            </Text>
          </ConsultingCount>
        </ProfileDetails>
        <ViewButton>요금제 변경</ViewButton>
      </ProfileSection>

      <ConsultingSection>
        <Text 
          bold 
          fontSize="16px"
          style={{
            marginBottom: '20px',
            textAlign: 'center'
          }}
        >
          매출액 변화
        </Text>
        
        <ChartContainer>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 20
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis 
                domain={[0, 400]}
                ticks={[0, 50, 100, 150, 200, 250, 300, 350, 400]}
              />
              <Tooltip />
              <Legend 
                payload={[
                  { value: '매출액', type: 'rect', color: '#2F56C7' },
                  { 
                    value: '선형(매출액)', 
                    type: 'line', 
                    color: '#2F56C7',
                    symbol: 'diamond',
                    strokeDasharray: '2 2'
                  }
                ]}
              />
              <Bar 
                dataKey="value" 
                name="매출액" 
                fill="#2F56C7" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
                label={{ 
                  position: 'top',
                  fill: '#2F56C7',
                  fontSize: 12
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                name="선형(매출액)"
                stroke="#2F56C7" 
                strokeDasharray="5 5"
                dot={{ fill: '#2F56C7', r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ConsultingSection>
    </Stack>
  );
}; 