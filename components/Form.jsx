import Link from 'next/link';

function Form({ type, post, submitting, setPost, handleSubmit }) {
	return (
		<section className="w-full flrx-start flex-col">
			<h1 type={type} className="head_text text-left">
				<span className="blue_gradient">{type} Post</span>
			</h1>
			<p className="desc text-left max-w-md">
				{type} and share amazing prompts with the world, and let your
				imagination runs wild with any AI-Powered platform.
			</p>
			<form
				action=""
				onSubmit={handleSubmit}
				className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
			>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Your AI Prompt
					</span>
					<textarea
						value={post.prompt}
						onChange={(e) =>
							setPost((post) => ({ ...post, prompt: e.target.value }))
						}
						placeholder="Write your prompt here..."
						required
						className="form_textarea"
					/>
				</label>
				<label>
					<span className="font-satoshi font-semibold text-base text-gray-700">
						Tag{' '}
						<span className="font-dash-normal">
							( Any hashtag for your prompt )
						</span>
					</span>
					<input
						value={post.tag}
						onChange={(e) =>
							setPost((post) => ({ ...post, tag: e.target.value }))
						}
						placeholder="#tag"
						required
						className="form_input"
					/>
				</label>
				<div className="flex-end mx-3 mb5 gap-4">
					<Link href="/" className="text-gray-500 text-sm">
						Cancel
					</Link>
					<button
						type="submit"
						disabled={submitting}
						className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
					>
						{submitting
							? `${type.slice(0, 1).toUpperCase()}${type.slice(1, -1)}ting...`
							: `${type.slice(0, 1).toUpperCase()}${type.slice(1)}`}
					</button>
				</div>
			</form>
		</section>
	);
}

export default Form;
