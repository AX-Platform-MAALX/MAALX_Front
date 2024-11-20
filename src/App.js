import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wrapper } from './components/organisms/index.js';
import { BaseLine } from './components/atoms/index.js';

// pages
import { HomePage as Home } from './pages/Home.jsx';
import { LoginPage as Login } from './pages/Login.jsx';
import { ServiceInfoPage as ServiceInfo } from './pages/ServiceInfo.jsx';
import { ConsultingPage as Consulting } from './pages/Consulting.jsx';
import SignUp from './pages/SignUp.jsx';
import MyPage from './pages/MyPage.jsx';
import ConsultingHistory from './pages/ConsultingHistory.jsx';

export const App = () => {
	return (
		<>
			<BaseLine />
			<BrowserRouter>
				<Wrapper>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/service-info" element={<ServiceInfo />} />
						<Route path="/consulting" element={<Consulting />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/mypage" element={<MyPage />} />
						<Route path="/consulting-history" element={<ConsultingHistory />} />
					</Routes>
				</Wrapper>
			</BrowserRouter>
		</>
	);
};
