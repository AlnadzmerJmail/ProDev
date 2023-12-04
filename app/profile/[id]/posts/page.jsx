'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Profile from '@components/Profile';

export default function UserPost() {
	const params = useParams();
	const searchParams = useSearchParams();

	const { id } = params;
	const name = searchParams.get('name');

	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(`/api/users/${id}/posts`, {
				method: 'GET',
			});
			const posts = await response.json();
			setData(posts);
		};
		fetchPost();
	}, [id]);

	const nameCopy = `${name.slice(0, 1).toUpperCase()}${name
		.slice(1, -1)
		.toLowerCase()}`;

	return (
		<Profile
			name={nameCopy}
			desc={`Welcome to ${nameCopy} personalized profile page`}
			data={data}
		/>
	);
}
