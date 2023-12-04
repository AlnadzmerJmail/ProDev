import { connectToDB } from '@utils/databse';
import Prompt from '@models/prompt';

export const GET = async (req, res) => {
	try {
		const { searchParams } = req.nextUrl;
		const searchText = searchParams.get('searchText');

		let queryOption = searchText
			? {
					$or: [
						{ prompt: { $regex: searchText, $options: 'i' } },
						{ tag: { $regex: '#' + searchText, $options: 'i' } },
					],
					limit: 1,
			  }
			: {};

		await connectToDB();

		const prompts = await Prompt.find({ ...queryOption }).populate('creator');

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed on fetching prompts', { status: 500 });
	}
};
