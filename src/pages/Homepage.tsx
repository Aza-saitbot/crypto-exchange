import { Statistic, Typography } from 'antd';
import millify from 'millify';
import CryptocurrenciesList from '../components/CryptocurrenciesList';
import Helmet from '../components/Helmet';
import News from '../components/News';
import AsyncWrapper from '../layouts/AsyncWrapper';
import { useGetCoinsQuery } from '../redux/features/coins.feature';
import { useGetFeedsQuery } from '../redux/features/news.feature';
import {
	DollarCircleOutlined,
	ExclamationCircleOutlined,
	MoneyCollectOutlined,
	ThunderboltOutlined,
} from '@ant-design/icons';
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

function Homepage() {
	const { isFetching, error, data } = useGetCoinsQuery('');
	const navigate = useNavigate()
	
	useEffect(()=>{
		if (data){
			const coinId = data.data.coins[0].uuid
			if (coinId){
				console.log('data[0].uuid',coinId)
				navigate(`/crypto/${coinId}`)
			}

		}
	},[data])
console.log('data',data)
	return (
		<AsyncWrapper
			loading={isFetching }
			error={error}
			fulfilled={Boolean(data)}
		>
			<Helmet
				title='Homepage'
				description='These global statistics tell about the data available on coin ranking.'
			/>
			{Boolean( data) && (
				<>
					<h1 className='mb-5 mt-10 text-xl'>Global Crypto Stats</h1>


					<Typography.Title level={3} className='mt-8'>
						Top 10 Cryptocurrencies in the world
					</Typography.Title>
					<CryptocurrenciesList coins={data.data.coins} limit={10} />

					<Typography.Title level={3} className='mt-8'>
						Latest Cryptocurrencies News
					</Typography.Title>
				</>
			)}
		</AsyncWrapper>
	);
}

export default Homepage;
