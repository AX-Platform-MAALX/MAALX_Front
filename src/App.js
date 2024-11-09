import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Wrapper } from './components/organisms/index.js';
import { BaseLine } from './components/atoms/index.js';

export const App = () => {
	return (
		<>
			<BaseLine />
			<BrowserRouter>
				<Wrapper>
					<Routes>
						<Route path="/" element={<>hi</>} />
					</Routes>
				</Wrapper>
			</BrowserRouter>
		</>
	);
};
