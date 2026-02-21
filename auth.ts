import "server-only";

import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.AUTH_GITHUB_ID!,
			clientSecret: process.env.AUTH_GITHUB_SECRET!
		})
	],
	secret: process.env.AUTH_SECRET!
});
