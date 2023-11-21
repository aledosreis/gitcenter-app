import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user
			const isOnApp =
				nextUrl.pathname.startsWith('/dashboard') ||
				nextUrl.pathname.startsWith('/repositories')

			if (isOnApp) {
				if (isLoggedIn) return true
				return Response.redirect(new URL('/', nextUrl))
			} else {
				if (isLoggedIn) return Response.redirect(new URL('/dashboard', nextUrl))
			}
			return true
		},
		async session({ session, user, token }) {
			session.user = {
				...session.user,
				access_token: token.access_token,
				profile: token.profile,
			}

			return session
		},
		async jwt({ token, user, account, profile }) {
			if (account && profile) {
				token = {
					...token,
					access_token: account?.access_token,
					profile: profile,
				}
			}
			return token
		},
	},
} satisfies NextAuthConfig
