import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		return console.log('CONNECTION TO DB IS SUCCESSFUL! 2');
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'share_prompt',
			useNewUrlParser: true,
			useUnifiedtopology: true,
		});

		isConnected = true;
		console.log('CONNECTION TO DB IS SUCCESSFUL! 1');
	} catch (error) {
		console.log('CONNECTION TO DB WENT ERROR!');
	}
};
