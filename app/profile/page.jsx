'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

function MyProfile() {
	const { data: session } = useSession();
	const router = useRouter();
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchPost = async () => {
			const response = await fetch(`/api/users/${session.user.id}/posts`, {
				method: 'GET',
			});

			const data = await response.json();

			setPosts(data);
		};

		if (session?.user.id) fetchPost();
	}, [session]);

	const handleEdit = (post) => {
		router.push(`/update-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm('Are you sure you want to delete?');

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});

				setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
			} catch (error) {
				alert('Cannot perform delete.....');
			}
		}
	};
	return (
		<Profile
			name="My"
			desc="Welcome to your personalized profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
}

export default MyProfile;
