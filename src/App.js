import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BaseLine } from './components/atoms';

export const App = () => {
	return (
		<>
			<BaseLine />
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<>hi</>} />
				</Routes>
			</BrowserRouter>
		</>
	);
};
