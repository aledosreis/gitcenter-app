import { RepoResponse } from '@/@types/github'
import { auth } from '@/auth'
import { formatDate } from '@/utils/date'
import { getRepositoryCommits } from '@/utils/fetch'
import { LockIcon, UnlockIcon } from 'lucide-react'
import Link from 'next/link'

export async function Repository({ repository }: { repository: RepoResponse }) {
	const session = await auth()
	if (!session) return null

	const {
		user: {
			access_token,
			profile: { login },
		},
	} = session

	const commits = await getRepositoryCommits(
		login,
		repository.name,
		access_token!
	)
	const lastCommit = commits.at(0)
	const commitMessage = lastCommit?.commit.message

	return (
		<Link
			href={`/repositories/${repository.full_name}`}
			className='flex items-center justify-between bg-zinc-900 border border-zinc-600 py-2 px-4 mx-5'>
			<div className='flex gap-3 items-center'>
				{repository.visibility === 'public' ? <UnlockIcon /> : <LockIcon />}
				<div className='flex flex-col w-96'>
					<span className='font-semibold'>{repository.name}</span>
					<span
						className='font-light text-zinc-400 truncate'
						title={repository.description}>
						{repository.description ||
							"This repository hasn't any description."}
					</span>
				</div>
			</div>

			<span
				className='font-light text-zinc-400 text-start flex-1 px-10 truncate max-w-lg'
				title={commitMessage}>
				{commitMessage || 'No commit found'}
			</span>

			<div className='flex flex-col'>
				<span className='italic'>
					Last updated: {formatDate(repository.pushed_at)}
				</span>
				<span className='font-light italic text-zinc-400'>
					Language: {repository.language || 'None'}
				</span>
			</div>
		</Link>
	)
}
