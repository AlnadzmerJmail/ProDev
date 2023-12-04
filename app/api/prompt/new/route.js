import { connectToDB } from '@utils/databse';
import Prompt from '@models/prompt';

export const POST = async (req, res) => {
	const { userId, prompt, tag } = await req.json();

	try {
		// we need to call it because it is a lambda function which will be die once it does it job
		await connectToDB();

		const newPrompt = new Prompt({
			creator: userId,
			prompt,
			tag: tag.charAt(0) !== '#' ? '#' + tag : tag,
		});

		await newPrompt.save();

		return new Response(JSON.stringify(newPrompt), { status: 201 });
	} catch (error) {
		return new Response('Create prompt went error', { status: 500 });
	}
};
