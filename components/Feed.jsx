'use client';
import { useState, useEffect } from 'react';
import PromptCard from '@components/PromptCard';

function Feed() {
	const [posts, setPosts] = useState([]);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		fetchPost();
	}, []);

	useEffect(() => {
		let searchDelay;
		if (searchText) {
			searchDelay = window.setTimeout(() => {
				fetchPost(searchText);
			}, 1000);
		}
		return () => window.clearTimeout(searchDelay);
	}, [searchText]);

	const fetchPost = async (searchText = '') => {
		try {
			const response = await fetch(`/api/prompt?searchText=${searchText}`, {
				method: 'GET',
			});

			const data = await response.json();
			setPosts(data);
		} catch (error) {
			alert('Something went wrong!');
		}
	};

	const handleSearchChange = (e) => {
		const { value } = e.target;

		setSearchText(value);
		if (!value) fetchPost();
	};

	const handleTagClick = (tag) => {
		fetchPost(tag.replace('#', ''));
	};

	return (
		<>
			<section className="feed">
				<form
					action=""
					className="relative w-full flex-center"
					onSubmit={(e) => e.preventDefault()}
				>
					<input
						type="text"
						placeholder="Search here"
						value={searchText}
						required
						className="search_input peer"
						onChange={handleSearchChange}
					/>
				</form>
			</section>
			<PromptCardList data={posts} handleTagClick={handleTagClick} />
		</>
	);
}

const PromptCardList = ({ data, handleTagClick }) => {
	return (
		<div className="mt-16 prompt_layout">
			{data.map((post) => {
				return (
					<PromptCard
						key={post._id}
						post={post}
						handleTagClick={handleTagClick}
					/>
				);
			})}
		</div>
	);
};

export default Feed;
