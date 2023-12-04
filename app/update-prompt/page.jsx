'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

function UpdatePrompt() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');
	const { data: session } = useSession();

	// state
	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};

		if (promptId) getPromptDetails();
	}, [promptId]);

	const updatePrompt = async (e) => {
		e.preventDefault();

		setSubmitting(true);

		if (!promptId) return;

		try {
			const response = await fetch(`/api/prompt/${promptId}`, {
				method: 'PATCH',
				body: JSON.stringify({
					// userId: session?.user.id || session?.user.name,
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			alert('Update prompt went wrong!');
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<Form
			type="Update"
			post={post}
			submitting={submitting}
			setPost={setPost}
			handleSubmit={updatePrompt}
		/>
	);
}

export default UpdatePrompt;
