'use server'

import { signIn, signOut } from '@/auth'

export async function login() {
	await signIn('github', { redirectTo: '/dashboard' })
}

export async function logout() {
	await signOut()
}
