import React, { Component, Suspense, useEffect } from 'react';
import Loading from '@/components/loading';
import { RouterProvider } from 'react-router-dom';
// import { router } from './routers/router';
setTimeout(() => {
	console.log(import.meta);
}, 3000);
const App = () => {
	return (
		<Suspense fallback={<Loading />}>
			{/* <AuthProvider>

			</AuthProvider>
			<RouterProvider router={router}></RouterProvider> */}
		</Suspense>
	);
};

export default App;
