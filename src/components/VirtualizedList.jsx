import { useState, useEffect } from 'react';
import axios from 'axios';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import 'react-virtualized/styles.css';

const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/posts';

export const VirtualizedList = () => {
	const [items, setItems] = useState([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	useEffect(() => {
		fetchData(page);
	}, [page]);

	const fetchData = async (page) => {
		setLoading(true);
		try {
			const response = await axios.get(API_ENDPOINT, {
				params: { _page: page, _limit: 10 }
			});
			setItems((prevItems) => [...prevItems, ...response.data]);
			setHasMore(response.data.length > 0);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
		setLoading(false);
	};

	const rowRenderer = ({ index, key, style }) => {
		const item = items[index];
		return (
			<div key={key} style={style}>
				<p>{`Post ${index + 1}`}</p>
				{/* <p>{item.title}</p> */}
			</div>
		);
	};

	const loadMoreRows = () => {
		if (!loading && hasMore) setPage((prevPage) => prevPage + 1);
	};

	return (
		<>
			<AutoSizer>
				{({ height, width }) => (
					<List
						width={width}
						height={height}
						rowCount={items.length}
						rowHeight={30}
						rowRenderer={rowRenderer}
						onRowsRendered={({ stopIndex }) => {
							if (stopIndex + 1 === items.length) {
								loadMoreRows();
							}
						}}
					/>
				)}
			</AutoSizer>
		</>
	);
};
