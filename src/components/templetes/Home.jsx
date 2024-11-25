import { Stack, Grid, useTheme } from '@mui/system';

export const Home = () => {
	const theme = useTheme();
	return (
		<div className="main">
			<img className="App-header" src="/images/MainImg.png" width="90%"
			style={{
				display: 'block',
				margin: '1% auto 0 auto',
				height: 'auto', // 비율 유지
				width: 'auto'
			}}
			></img>
			<div
				style={{
					width:'500px',
					position: 'absolute', // 이미지를 기준으로 위치 고정
					top: '67%', // 상단에서의 거리
					left: '30%', // 왼쪽에서의 거리
					transform: 'translate(-50%, -50%)', // 가운데 정렬
					color: 'white', // 글자색 (이미지에 따라 변경 가능)
					fontSize: '2.5rem', // 글자 크기
					textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // 텍스트 그림자
					textAlign: 'center',
				}}
			>
				AI Solutions<br/>
				for a Smarter Tomorrow
			</div>
			<div className="Sub">
			<img className="App-SubTitle" src="/images/SubTitle.png" 
			style={{
					width:'auto',
					display: 'block',
					margin: '10% auto',
					maxWidth: '100%', // 필요시 크기 조정
				}}></img>
			<div className="subtext1"
				style={{
					width:'auto',
					display: 'block',
					// marginTop: '120px',
					margin: '-8% auto 0 auto', // 위쪽 위치를 조정 (음수로 더 올림)
					textAlign: 'center',
					fontWeight: 'bold', // 텍스트를 볼드체로 설정
					fontSize: '1.2rem' // 필요시 글자 크기 조정
				}}>
				디지털 전환(DX)를 넘어 인공지능 전환(AX) 시대로</div>
			</div>
			<div className="subtext2"
				style={{
					width:'320px',
					display: 'block',
					// marginTop: '120px',
					margin: '2% auto 0 auto', // 위쪽 위치를 조정 (음수로 더 올림)
					textAlign: 'center',
					lineHeight: '1.5', // 기본값 1.2보다 넓은 줄 간격
					fontSize: '1.2rem' // 필요시 글자 크기 조정
				}}>
				'MAALX는 다양한 분야에서 AX 솔루션을 제공해주는 기업입니다.'
			</div>
			{/* App-header2 섹션 */}
			<div
				className="App-header2"
				style={{
					display: 'flex', // Flexbox를 사용하여 나란히 배치
					alignItems: 'center', // 세로 축 중앙 정렬
					justifyContent: 'flex-start', // 왼쪽 정렬
					marginTop: '120px',
					paddingLeft: '10%',
				}}
			>
				<img
					className="header2Img"
					src="/images/consulting.png"
					alt="Consulting"
					style={{
						width: 'auto', // 고정 크기
						height: 'auto', // 비율 유지
						marginRight: '100px', // 이미지와 텍스트 간격
					}}
				/>
				<div className="App-header2-title">
					<div
						style={{
							color: '#2F56C7',
							lineHeight: '1.2',
							fontWeight: 'bold',
							fontSize: '2rem',
						}}
					>
						Field Specific<br />
						Consulting
					</div>
					<div
						className="App-header2-sub"
						style={{
							color: '#333',
							fontSize: '1.2rem',
							lineHeight: '1.5',
							marginTop: '10px', // 제목과 내용 사이의 간격
						}}
					>
						다양한 비즈니스 분야에 맞춤형 컨설팅을<br />
						제공하여 기업이 각자의 특성에 맞는<br />
						솔루션을 받을 수 있습니다.
					</div>
				</div>
			</div>
			{/* App-header3 */}
			<div
				className="App-header3"
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					marginTop: '120px',
					paddingLeft: '30%',
				}}
			>
				<div className="App-header3-title">
					<div
						style={{
							color: '#2F56C7',
							lineHeight: '1.2',
							fontWeight: 'bold',
							fontSize: '2rem',
							marginRight: '100px',
						}}
					>
						Customer<br />
						Feedback-Driven<br/>
						Service
					</div>
					<div
						className="App-header3-sub"
						style={{
							color: '#333',
							fontSize: '1.2rem',
							lineHeight: '1.5',
							marginTop: '10px',
						}}
					>
						고객 평가를 적극 반영하여 서비스 품질<br />
						을 지속적으로 개선하고, 더 높은 정확도의<br />
						컨설팅 서비스를 제공합니다.
					</div>
				</div>
				<img
					className="header3Img"
					src="/images/feedback.png"
					alt="Feedback"
					style={{
						width: 'auto',
						height: 'auto',
						marginLeft: '20px',
					}}
				/>
			</div>

			{/* App-header4 */}
			<div
				className="App-header4"
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					marginTop: '120px',
					paddingLeft: '10%',
				}}
			>
				<img
					className="header4Img"
					src="/images/monitoring.png"
					alt="Monitoring"
					style={{
						width: 'auto',
						height: 'auto',
						marginRight: '100px',
					}}
				/>
				<div className="App-header4-title">
					<div
						style={{
							color: '#2F56C7',
							lineHeight: '1.2',
							fontWeight: 'bold',
							fontSize: '2rem',
						}}
					>
						Session-Based<br />
						Performance<br/>
						Monitoring<br/>
					</div>
					<div
						className="App-header4-sub"
						style={{
							color: '#333',
							fontSize: '1.2rem',
							lineHeight: '1.5',
							marginTop: '10px',
						}}
					>
						회차별 컨설팅을 통해 성과를 지속적으로<br/>
						추적하고 분석하여 목표 달성 여부를 평<br/>
						가하고, 고객의 성장에 기여합니다.
					</div>
				</div>
			</div>
		</div>
	);
};
