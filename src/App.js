import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wrapper } from './components/organisms/index.js';
import { BaseLine } from './components/atoms/index.js';

// pages
import { ConsultingPage } from './pages/Consulting.jsx';
import { LoginPage } from './pages/Login.jsx';
import { ServiceInfoPage } from './pages/ServiceInfo.jsx';
import { HomePage } from './pages/Home.jsx';

export const App = () => {
	return (
		<>
			<BaseLine />
			<BrowserRouter>
				<Wrapper>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/service-info" element={<ServiceInfoPage />} />
						<Route path="/consulting" element={<ConsultingPage />} />
					</Routes>
				</Wrapper>
			</BrowserRouter>
		</>
	);
};
