import { Profile as DefaultProfile, DefaultSession } from 'next-auth'
import { UserResponse } from './github'

declare module 'next-auth' {
	interface Session {
		user: {
			access_token?: string
			profile: Profile
		} & DefaultSession['user']
	}

	interface Profile extends DefaultProfile, UserResponse {}
}

declare module '@auth/core/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		access_token?: string
		profile: Profile
	}
}
