import App from './App';
import React from 'react';
import { createRoot } from 'react-dom/client';
const root = document.querySelector('#root');

console.log(import.meta.glob('./pages/dashboard/index.tsx'));

// root &&
// 	createRoot(root).render(
// 		<React.StrictMode>
// 			<App />
// 		</React.StrictMode>,
// 	);
