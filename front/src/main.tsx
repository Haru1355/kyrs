import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import { Layout } from './pages/layout.tsx';
import {Provider} from "jotai";

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider>
			<BrowserRouter>
				<Layout />
			</BrowserRouter>
		</Provider>
	</StrictMode>
);
