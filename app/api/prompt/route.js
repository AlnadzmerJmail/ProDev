import { connectToDB } from '@utils/databse';
import Prompt from '@models/prompt';
import User from '@models/user';

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

		if (searchText) {
			const creator = await await User.findOne({
				username: { $regex: new RegExp(searchText, 'i') },
			}).populate('prompts');

			if (creator) {
				const { id, username, email, image } = creator;
				const prompts = creator.prompts.map(({ _id, prompt, tag }) => {
					return {
						_id,
						prompt,
						tag,
						creator: {
							id,
							username,
							email,
							image,
						},
					};
				});

				return new Response(JSON.stringify(prompts), { status: 200 });
			}
		}

		const prompts = await Prompt.find({ ...queryOption }).populate('creator');

		return new Response(JSON.stringify(prompts), { status: 200 });
	} catch (error) {
		return new Response('Failed on fetching prompts', { status: 500 });
	}
};
