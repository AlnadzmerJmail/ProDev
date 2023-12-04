'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

function CreatePrompt() {
	const router = useRouter();
	const { data: session } = useSession();

	// state
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	const createPrompt = async (e) => {
		e.preventDefault();

		setSubmitting(true);

		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					userId: session?.user.id || session?.user.name,
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			alert('Create prompt went wrong!');
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="Create"
			post={post}
			submitting={submitting}
			setPost={setPost}
			handleSubmit={createPrompt}
		/>
	);
}

export default CreatePrompt;
