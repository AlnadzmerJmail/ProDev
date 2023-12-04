import { connectToDB } from '@utils/databse';
import Prompt from '@models/prompt';

export const GET = async (req, { params }) => {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id).populate('creator');

		if (!prompt) return new Response('Not Found', { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response('Failed on fetching prompts', { status: 500 });
	}
};

export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json();

	try {
		await connectToDB();

		const existing = await Prompt.findById(params.id);

		if (!prompt) return new Response('Not Found', { status: 404 });

		existing.prompt = prompt;
		existing.tag = tag;

		await existing.save();

		return new Response(JSON.stringify(existing), { status: 200 });
	} catch (error) {
		return new Response('Failed on Updating prompt', { status: 500 });
	}
};

export const DELETE = async (_, { params }) => {
	try {
		await connectToDB();

		const deleted = await Prompt.findByIdAndRemove(params.id);

		return new Response('Delete Successful', { status: 200 });
	} catch (error) {
		return new Response('Failed on Deleting prompt', { status: 500 });
	}
};
