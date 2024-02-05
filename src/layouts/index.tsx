import { Outlet } from 'react-router-dom';
import { FloatButton, Layout } from 'antd';
import Navbar from './Navbar';

function LayoutWrapper() {
	return (
		<Layout className='min-h-screen'>
				<Navbar />
				<Layout.Content className='mx-4 mt-4'>
					<Outlet />
					<FloatButton.BackTop />
				</Layout.Content>
		</Layout>
	);
}

export default LayoutWrapper;
