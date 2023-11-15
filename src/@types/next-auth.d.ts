import {
	Profile as DefaultProfile,
	DefaultSession,
	User as DefaultUser,
} from 'next-auth'

declare module 'next-auth' {
	interface Session {
		user: {
			access_token?: string
			profile?: Profile
		} & DefaultSession['user']
	}

	interface Profile extends DefaultProfile {
		login: string
	}

	interface User extends DefaultUser {
		profile?: Profile
		access_token?: string
	}
}

declare module '@auth/core/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		access_token?: string
		profile?: Profile
	}
}
