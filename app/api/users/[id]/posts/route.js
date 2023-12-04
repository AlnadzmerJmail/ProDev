import { connectToDB } from '@utils/databse';
import Prompt from '@models/prompt';

// --url/users/:id/posts
export const GET = async (req, { params }) => {
	try {
		await connectToDB();

		const prompts = await Prompt.find({ creator: params.id }).populate(
			'creator'
		);

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed on fetching prompts', { status: 500 });
	}
};
