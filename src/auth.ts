import { authConfig } from '@/auth.config'
import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	...authConfig,
	providers: [
		GitHub({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
})
