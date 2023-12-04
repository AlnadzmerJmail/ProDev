import React from 'react';
import PromptCard from './PromptCard';

function Profile({ name, desc, data, handleEdit, handleDelete }) {
	return (
		<section className="w-full">
			<h1 className="head_text blue_gradient text-left">{name} Profile</h1>
			<p className="desc text-left ">{desc}</p>
			<div className="mt-10 promt_layout">
				{data.map((post) => {
					return (
						<PromptCard
							key={post._id}
							post={post}
							handleEdit={() => handleEdit && handleEdit(post)}
							handleDelete={() => handleDelete && handleDelete(post)}
						/>
					);
				})}
			</div>
		</section>
	);
}

export default Profile;
