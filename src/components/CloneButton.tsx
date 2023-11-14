'use client'

import { CopyIcon } from 'lucide-react'

export function CloneButton({ url }: { url: string }) {
	function copyGitCloneCommand() {
		const command = `git clone ${url}`
		navigator.clipboard.writeText(command)
		alert('Clone command saved in clipboard')
	}

	return (
		<button
			onClick={copyGitCloneCommand}
			title='Copy git command to clipboard'
			className='flex gap-1 border px-2 py-1 rounded-md'>
			<CopyIcon />
			Clone
		</button>
	)
}
