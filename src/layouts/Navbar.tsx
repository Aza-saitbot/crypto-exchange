import {Alert, Avatar, Layout, Menu, Select, Spin} from 'antd';
import { useEffect, useState } from 'react';
import {Link, NavLink, useLocation, useNavigate} from 'react-router-dom';
import { useGetCoinsQuery } from '../redux/features/coins.feature';
import {BulbOutlined, FormOutlined, FundOutlined, HomeOutlined} from "@ant-design/icons";

const items: MenuItem[] = [
	{
		label: <NavLink to='/'>Home</NavLink>,
		key: '/',
		icon: <HomeOutlined />,
	},
	{
		label: <NavLink to='/currencies'>Currencies</NavLink>,
		key: '/currencies',
		icon: <FundOutlined />,
	},
	{
		label: <NavLink to='/reference-currencies'>Reference Currencies</NavLink>,
		key: '/reference-currencies',
		icon: <FormOutlined />,
	},
	{
		label: <NavLink to='/news'>News</NavLink>,
		key: '/news',
		icon: <BulbOutlined />,
	},
];

function Navbar() {
	const navigateTo = useNavigate();
	const { isFetching, error, data } = useGetCoinsQuery('');
	const { pathname } = useLocation();

	const [options, setOptions] = useState<AutoCompleteOption[]>([]);

	useEffect(() => {
		setOptions(
			data?.data?.coins.map((coin: Coin) => ({
				value: coin.name,
				label: coin.name,
				reset: { ...coin },
			}))
		);
	}, [data]);

	const onSelect = (_value: string, option: AutoCompleteOption) => {
		navigateTo(`/crypto/${option.reset.uuid}`);
	};

	if (isFetching) {
		return <Spin size='small' />;
	} else if (error) {
		return <Alert showIcon message={JSON.stringify(error)} type='warning' />;
	} else if (data) {
		return (
			<Layout.Header className='p-0 bg-white flex items-center'>
				<Link to='/'>
						<h4 className='transition-all duration-300 ml-4 text-2xl'>
							CryptoX
						</h4>
				</Link>

				<Menu
					className={'w-full bg-green-500 flex'}
					defaultSelectedKeys={[pathname]}
					mode="horizontal"
					items={items}
				/>
				<div className='mx-5 w-full items-center'>
					<Select
						showSearch
						onSelect={onSelect}
						className='w-full'
						placeholder='Search'
						filterOption={(inputValue, option) =>
							option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
							-1
						}
						filterSort={(optionA, optionB) =>
							(optionA?.label ?? '')
								.toLowerCase()
								.localeCompare((optionB?.label ?? '').toLowerCase())
						}
						options={options}
					/>
				</div>
			</Layout.Header>
		);
	} else {
		return <></>;
	}
}

export default Navbar;
