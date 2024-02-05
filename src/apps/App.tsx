import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MainRoutes from './routes';
import ErrorBoundary from './ErrorBoundary';
import { store } from '../redux/store';

import 'antd/dist/reset.css';
import '../assets/css/app.css';

function App() {

	return (
		<ErrorBoundary>
			<BrowserRouter>
				<Provider store={store}>
					<MainRoutes />
				</Provider>
			</BrowserRouter>
		</ErrorBoundary>
	);
}

export default App;
