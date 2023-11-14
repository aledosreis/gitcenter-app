'use client'

import { login } from '@/utils/actions'
import { GithubIcon } from 'lucide-react'

export function GithubButton() {
	return (
		<form action={login}>
			<button className='flex gap-1 border rounded-md px-2 py-1 w-fit'>
				<GithubIcon />
				Login with Github
			</button>
		</form>
	)
}
