'use client';
import { useState } from 'react';

import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

function PromptCard({ post, handleTagClick, handleEdit, handleDelete }) {
	const { data: session } = useSession();

	const router = useRouter();
	const pathName = usePathname();

	const [copied, setCopied] = useState('');

	const handleCopy = () => {
		setCopied(post.tag);
		navigator.clipboard.writeText(post.prompt);

		setTimeout(() => setCopied(''), 3000);
	};

	const navigateHandler = (e) => {
		const el = e.target.getAttribute('id');

		if (el === 'tag' && handleTagClick) return handleTagClick(post?.tag);

		if (el === 'copy' || pathName === '/profile') return handleCopy();

		router.push(
			`/profile/${post.creator._id}/posts?name=${post.creator.username}`
		);
	};

	return (
		<div className="prompt_card" onClick={navigateHandler}>
			<div className="flex justify-between items-start gap5">
				<div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
					<Image
						src={post.creator?.image || 'assets/images/logo.svg'}
						alt="profile"
						width={40}
						height={40}
						className="rounded-full object-contain"
						onClick={handleTagClick}
					/>
					<div className="flex flex-col ">
						<h3 className="font-satoshi font-semibold text-gray-900">
							{post.creator?.username || 'Unknow'}
						</h3>
						<p className="font-inter text-sm text-gray-500">
							{post.creator?.email || '@unknown'}
						</p>
					</div>
				</div>
				<div
					className="copy_btn"
					// onClick={handleCopy}
				>
					<Image
						src={
							copied === post.prompt
								? '/assets/icons/tick.svg'
								: '/assets/icons/copy.svg'
						}
						alt="copy-icon"
						id="copy"
						width={12}
						height={12}
					/>
				</div>
			</div>
			<p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
			<p className="font-inter text-sm blue_gradient cursor-pointer" id="tag">
				{post.tag}
			</p>

			{session?.user.id === post.creator?._id && pathName === '/profile' && (
				<div className="flex-center gap-4 mt-5 border=t border-gray-100">
					<p
						className="font-inter text-sm green_gradient cursor-pointer"
						onClick={handleEdit}
					>
						Edit
					</p>
					<p
						className="font-inter text-sm orange_gradient cursor-pointer"
						onClick={handleDelete}
					>
						Delete
					</p>
				</div>
			)}
		</div>
	);
}

export default PromptCard;
