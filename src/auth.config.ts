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
				// return false // Redirect unauthenticated users to login page
				return Response.redirect(new URL('/', nextUrl))
			}
			return true
		},
	},
} satisfies NextAuthConfig
