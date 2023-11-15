import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
	providers: [],
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			// console.log('authorized')
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
		// async signIn({ user, account, profile, email, credentials }) {
		// console.log('signIn')
		// console.log(user) // Nothing here
		// console.log(account) // I have OAuth information and access_token
		// console.log(profile) // I have user data from OAuth (Github profile)
		// console.log(email) // Nothing here
		// console.log(credentials) // Nothing here

		// On signIn get account.access_token and profile.login and put into user object
		// user = { ...user, access_token: account?.access_token, profile: profile }

		// Or account.access_token and whole profile into user object

		// return true
		// },
		// async redirect({ url, baseUrl }) {
		// 	console.log('redirect')
		// 	return baseUrl
		// },
		async session({ session, user, token }) {
			// console.log('session')
			// console.log(session) // session data (user and expires date)
			// console.log(user) // Nothing
			// console.log(token) // token?

			// Put user profile data/user login and access token into session object
			session.user = {
				...session.user,
				access_token: token.access_token,
				profile: token.profile,
			}

			return session
		},
		async jwt({ token, user, account, profile }) {
			// console.log('jwt')
			if (account && profile) {
				token = {
					...token,
					access_token: account?.access_token,
					profile: profile,
				}
			}
			console.log(token) // token
			// console.log(user) // On login shows user data
			// console.log(account) // On login shows account data
			// console.log(profile) // On login shows profile data
			return token
		},
	},
} satisfies NextAuthConfig
