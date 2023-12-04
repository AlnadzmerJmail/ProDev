import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/databse';

// model
import User from '@models/user';

connectToDB();

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
	callbacks: {
		async session({ session }) {
			const user = await User.findOne({ email: session.user.email });

			session.user.id = user._id?.toString();

			return session;
		},
		async signIn({ profile }) {
			try {
				// check if user exists
				const user = await User.findOne({ email: profile.email });

				// else create
				if (!user) {
					await User.create({
						email: profile.email,
						username: profile?.name?.replace(' ', '').toLowerCase(),
						image: profile.picture,
					});
				}

				// allow sign-in
				return true;
			} catch (error) {
				return false;
			}
		},
	},
});

export { handler as GET, handler as POST };
