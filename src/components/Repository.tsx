import { RepoResponse } from '@/@types/github'
import { getRepositoryCommits } from '@/utils/fetch'
import { BookMarkedIcon } from 'lucide-react'
import Link from 'next/link'

export async function Repository({ repository }: { repository: RepoResponse }) {
	const commits = await getRepositoryCommits('octocat', repository.name)
	const lastCommit = commits.at(0)
	const commitMessage = lastCommit?.commit.message

	return (
		<Link
			href={`/repositories/${repository.full_name}`}
			className='flex items-center justify-between bg-zinc-900 border border-zinc-600 py-2 px-4 mx-5'>
			<div className='flex gap-3 items-center'>
				<BookMarkedIcon />
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
				<span className='italic'>Last updated: {repository.pushed_at}</span>
				<span className='font-light italic text-zinc-400'>
					Language: {repository.language || 'None'}
				</span>
			</div>
		</Link>
	)
}
