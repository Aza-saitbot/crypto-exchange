import CryptocurrenciesList from '../components/CryptocurrenciesList';
import { useGetCoinsQuery } from '../redux/features/coins.feature';
import AsyncWrapper from '../layouts/AsyncWrapper';
import Helmet from '../components/Helmet';
import {Statistic} from "antd";
import millify from "millify";
import {DollarCircleOutlined, ExclamationCircleOutlined, MoneyCollectOutlined, ThunderboltOutlined} from "@ant-design/icons";

function Currencies() {
	const { isFetching, error, data } = useGetCoinsQuery('');

	return (
		<AsyncWrapper loading={isFetching} error={error} fulfilled={Boolean(data)}>
			<Helmet
				title='Cryptocurrencies'
				description='Get a list of coins. Coins are by default ordered by their rank, which - somewhat simplified - means that they are ordered on marketcap. The response not only returns a list of coins, but also statistics regarding the requested list, such as the volume in the last 24 hours.'
			/>
			<div className='mb-20 md:grid grid-cols-3'>
				<div className='col-span-1 m-3'>
					<Statistic
						title='Total Cryptocurrencies'
						value={millify(data.data.stats['total'])}
						prefix={<ExclamationCircleOutlined />}
					/>
				</div>
				<div className='col-span-1 m-3'>
					<Statistic
						title='Total Exchanges'
						value={millify(data.data.stats['totalExchanges'])}
						prefix={<MoneyCollectOutlined />}
					/>
				</div>
				<div className='col-span-1 m-3'>
					<Statistic
						title='Total Market Cap'
						value={millify(data.data.stats['totalMarketCap'])}
						prefix={<DollarCircleOutlined />}
					/>
				</div>
				<div className='col-span-1 m-3'>
					<Statistic
						title='Total 24 Volume'
						value={millify(data.data.stats['total24hVolume'])}
						prefix={<ThunderboltOutlined />}
					/>
				</div>
				<div className='col-span-1 m-3'>
					<Statistic
						title='Total Market'
						value={millify(data.data.stats['totalMarkets'])}
						prefix={<DollarCircleOutlined />}
					/>
				</div>
			</div>
			{Boolean(data) && <CryptocurrenciesList coins={data.data.coins} />}
		</AsyncWrapper>
	);
}

export default Currencies;
