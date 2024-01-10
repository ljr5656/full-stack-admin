import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
const root = document.querySelector('#root');

root &&
	createRoot(root).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
