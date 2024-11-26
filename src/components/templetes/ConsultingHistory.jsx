import { Stack, useTheme } from '@mui/system';
import { Text } from '../atoms/index.js';
import styled from '@emotion/styled';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import { RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';

const ConsultingSection = styled.div`
	background-color: white;
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	padding: 32px;
	margin-bottom: 24px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
`;

const TableContainer = styled.div`
	width: 100%;
	border-top: 1px solid #e5e5e5;
	margin-top: 16px;
`;

const TableHeader = styled.div`
	display: grid;
	grid-template-columns: 0.7fr 0.8fr 0.5fr 0.4fr;
	padding: 25px 80px;
	background-color: #e7e7e7;
	border-bottom: 1px solid #e5e5e5;
	font-weight: bold;
	gap: 80px;
`;

const TableRow = styled.div`
	display: grid;
	grid-template-columns: 0.6fr 0.8fr 0.5fr 0.4fr;
	padding: 25px 80px;
	border-bottom: 1px solid #e5e5e5;
	align-items: center;
	gap: 80px;
	cursor: pointer;

	&:last-child {
		border-bottom: none;
	}
`;

const FeedbackStatus = styled.div`
	color: ${(props) => (props.isCompleted ? '#2F56C7' : '#666')};
	font-weight: ${(props) => (props.isCompleted ? 'bold' : 'normal')};
	cursor: pointer;
`;

const ViewButton = styled.button`
	background-color: #2f56c7;
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
	border: 1px solid #e5e5e5;
	border-radius: 4px;
	min-height: 100px;
	resize: vertical;
	margin-top: 8px;
`;

const SubmitButton = styled.button`
	background-color: #2f56c7;
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
	const [satisfaction, setSatisfaction] = useState('');
	const [dissatisfaction, setDissatisfaction] = useState('');
	const [again, setAgain] = useState('');
	const [addition, setAddition] = useState('');
	const [otherSatisfaction, setOtherSatisfaction] = useState('');
	const [otherDissatisfaction, setOtherDissatisfaction] = useState('');
	Modal.setAppElement('#root');

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			console.error('인증 토큰이 없습니다.');
			navigate('/login');
			return;
		}
		// API 호출하여 userId에 맞는 컨설팅 내역을 가져오기
		const fetchConsultingHistory = async () => {
			try {
				// 토큰이 없거나 만료된 경우 처리
				if (!token) {
					console.error('인증 토큰이 없습니다.');
					navigate('/login');
					return;
				}

				const response = await fetch(`http://localhost:8080/consulting`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					credentials: 'include',
				});

				if (response.status === 403) {
					console.error('인증이 만료되었거나 권한이 없습니다.');
					localStorage.removeItem('token');
					navigate('/login');
					return;
				}

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				console.log('Response:', response);
				const data = await response.json();
				console.log('Received data:', data);

				if (!Array.isArray(data)) {
					console.warn('응답 데이터가 배열이 아닙니다:', data);
					setConsultingHistory([]);
					setConsultingTotal(0);
				} else {
					setConsultingHistory(data);
					setConsultingTotal(data.length);
					localStorage.setItem('consultingHistory', JSON.stringify(data));
					localStorage.setItem('totalConsultings', JSON.stringify(data.length));
				}
			} catch (error) {
				console.error('Error details:', error);
				if (error.message.includes('403')) {
					alert('세션이 만료되었습니다. 다시 로그인해주세요.');
					localStorage.removeItem('token');
					navigate('/login');
				} else {
					alert('컨설팅 내역을 가져오는 데 실패했습니다: ' + error.message);
				}
			}
		};

		fetchConsultingHistory();
	}, [navigate]);

	const handleViewReport = (consultingIndex) => {
		console.log('Selected Consulting Index:', consultingIndex);
		// consultingIndex를 함께 URL에 전달하여 consulting 페이지로 이동
		navigate(`/consulting/${consultingIndex}`);
	};
	const createSurvey = async (consultingResponseId) => {
		try {
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('인증 토큰이 없습니다.');
				return;
			}

			const headers = {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			};

			// 설문 데이터 준비
			const surveyRequestDto = {
				satisfaction: satisfaction === '기타' ? otherSatisfaction.trim() : satisfaction,
				dissatisfaction: dissatisfaction === '기타' ? otherDissatisfaction.trim() : dissatisfaction,
				again: again || '없음',
				addition: addition.trim() || '없음',
			};

			console.log('설문 데이터:', surveyRequestDto);

			// API 요청
			const response = await fetch(`http://localhost:8080/survey/create/${consultingResponseId}`, {
				method: 'POST',
				headers: headers,
				body: JSON.stringify(surveyRequestDto),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error('설문조사 생성 실패:', errorData.message || '알 수 없는 오류');
				return;
			}

			const data = await response.json();
			console.log('설문조사 생성 성공:', data);
			return data; // 생성된 설문 데이터 반환
		} catch (error) {
			console.error('네트워크 오류:', error.message);
		}
	};
	const handleFeedbackClick = (consulting) => {
		if (!consulting.feedbackStatus) {
			setSelectedConsulting(consulting);
			setModalIsOpen(true);
		}
	};

	const handleSubmit = async () => {
		if (!selectedConsulting || !selectedConsulting.id) {
			console.error('선택된 컨설팅이 없습니다.');
			return;
		}
		try {
			console.log('선택된 컨설팅 ID:', selectedConsulting.id);
			// 설문 생성
			await createSurvey(selectedConsulting.id);
			// 상태 업데이트: 피드백 완료로 표시
			setConsultingHistory((prev) =>
				prev.map((item) => (item.id === selectedConsulting.id ? { ...item, feedbackStatus: true } : item)),
			);
			// 로컬스토리지에 상태 저장
			localStorage.setItem(
				'consultingHistory',
				JSON.stringify(
					consultingHistory.map((item) =>
						item.id === selectedConsulting.id ? { ...item, feedbackStatus: true } : item,
					),
				),
			);
			// 모달 닫기
			setModalIsOpen(false);
		} catch (error) {
			console.error('설문 제출 실패:', error.message);
		}
	};
	const formatDate = (dateString) => {
		return dateString.split('T')[0]; // 'T'를 기준으로 나누고 첫 번째 부분(날짜)만 반환
	};
	const totalConsultings = consultingTotal;
	const latestConsulting =
		consultingHistory.length > 0 ? consultingHistory[consultingHistory.length - 1].createdAt : '없음'; // 가장 최근의 컨설팅 날짜를 가져옵니다.  const nextConsulting = '없음';
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
					},
				}}
			>
				<Text
					bold
					style={{
						textAlign: 'center',
						fontSize: '24px',
						marginBottom: '20px',
					}}
				>
					컨설팅 기록
				</Text>

				<ConsultingSection>
					<Text
						bold
						fontSize="16px"
						style={{
							marginBottom: '16px',
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
						{consultingHistory.map((consulting, index) => (
							<TableRow
								key={consulting.id}
								onClick={() => handleViewReport(consulting.consultingIndex)} // 행 클릭 시 컨설팅 페이지로 이동
							>
								<Text>{index + 1}</Text>
								<Text bold>{index + 1}회차 컨설팅 결과</Text>
								<Text>{formatDate(consulting.createdAt)}</Text>
								<FeedbackStatus
									isCompleted={consulting.feedbackStatus}
									onClick={(e) => {
										e.stopPropagation(); // 이벤트 전파 중지
										handleFeedbackClick(consulting);
									}}
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
							marginBottom: '16px',
						}}
					>
						컨설팅 요약
					</Text>
					<Text style={{ marginBottom: '8px' }}>• 총 진행 횟수: {totalConsultings}회</Text>
					<Text style={{ marginBottom: '8px' }}>• 최근 컨설팅: {formatDate(latestConsulting)}</Text>
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
						padding: '0',
					},
					overlay: {
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					},
				}}
			>
				<FeedbackModal>
					<FeedbackForm>
						<Text bold fontSize="20px" style={{ textAlign: 'center', marginBottom: '24px' }}>
							피드백
						</Text>
						<Section>
							<Text bold style={{ marginBottom: '12px' }}>
								1. 만족한점 
							</Text>
							<RadioGroup
								value={satisfaction}
								onChange={(e) => setSatisfaction(e.target.value)}
								style={{ display: 'flex', flexDirection: 'vertical' }}
							>
								<FormControlLabel
									value="Painpoint 해소를 위한 제안이 적절함"
									control={<Radio />}
									label="Painpoint 해소를 위한 제안이 적절함"
								/>
								<FormControlLabel
									value="실제 도입 효과가 기대만큼 나타남"
									control={<Radio />}
									label="실제 도입 효과가 기대만큼 나타남"
								/>
								<FormControlLabel
									value="컨설팅 과정에서 제공된 설명이 이해하기 쉬움"
									control={<Radio />}
									label="컨설팅 과정에서 제공된 설명이 이해하기 쉬움"
								/>
								<FormControlLabel value="기타" label="기타" control={<Radio />} />
							</RadioGroup>
							{satisfaction === '기타' && (
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
							<Text bold style={{ marginBottom: '12px' }}>
								2. 불만족한점 
							</Text>
							<RadioGroup
								value={dissatisfaction}
								onChange={(e) => setDissatisfaction(e.target.value)}
								style={{ display: 'flex', flexDirection: 'vertical' }}
							>
								<FormControlLabel
									value="Painpoint 해소를 위한 제안이 적절하지 않음"
									control={<Radio />}
									label="Painpoint 해소를 위한 제안이 적절하지 않음"
								/>
								<FormControlLabel
									value="추천해준 전략이 너무 추상적임"
									control={<Radio />}
									label="추천해준 전략이 너무 추상적임"
								/>
								<FormControlLabel
									value="기업분석이 제대로 되지 않음"
									control={<Radio />}
									label="기업분석이 제대로 되지 않음"
								/>
								<FormControlLabel value="기타" label="기타" control={<Radio />} />
							</RadioGroup>
							{dissatisfaction === '기타' && (
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
							<Text bold style={{ marginBottom: '12px' }}>
								3. 추후에 컨설팅을 다시 받을 의향이 있으신가요?
							</Text>
							<RadioGroup
								value={again}
								onChange={(e) => setAgain(e.target.value)}
								row
								style={{ display: 'flex', flexDirection: 'vertical' }}
							>
								<FormControlLabel value="있음" control={<Radio />} label="있음" />
								<FormControlLabel value="없음" control={<Radio />} label="없음" />
							</RadioGroup>
						</Section>
						<Section>
							<Text bold style={{ marginBottom: '12px' }}>
								4. 다음 컨설팅에서 추가적으로 다루고 싶은 점이 있으신가요?
							</Text>
							<TextArea
								value={addition}
								onChange={(e) => setAddition(e.target.value)}
								placeholder="추가적으로 다루고 싶은 점을 입력해주세요."
							/>
						</Section>
						<SubmitButton onClick={handleSubmit}>제출</SubmitButton>
					</FeedbackForm>
				</FeedbackModal>
			</Modal>
		</>
	);
};
