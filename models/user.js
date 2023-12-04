import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
	{
		email: {
			type: String,
			unique: [true, 'Email is alreadu exists!'],
			required: [true, 'Email is required!'],
		},
		username: {
			type: String,
			required: [true, 'Username is required!'],
			// match: [
			// 	/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			// 	'Username is invalid, it should contain 8-20 alphanumeric letters and be unique!',
			// ],
		},
		image: {
			type: String,
		},
	},
	{
		toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
		toObject: { virtuals: true }, // So `console.log()` and other functions that use `toObject()` include virtuals
	}
);

UserSchema.virtual('prompts', {
	ref: 'Prompt',
	localField: '_id',
	foreignField: 'creator',
});

const User = models.User || model('User', UserSchema);

// const User = model('User', UserSchema);
export default User;
