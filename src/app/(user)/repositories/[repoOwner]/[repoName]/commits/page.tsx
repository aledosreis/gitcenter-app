import { auth } from '@/auth'
import { Forbidden } from '@/components/Forbidden'
import { Separator } from '@/components/Separator'
import { formatDate } from '@/utils/date'
import { getRepositoryCommits } from '@/utils/fetch'
import {
	ArrowLeftIcon,
	GitCommitHorizontalIcon,
	HistoryIcon,
} from 'lucide-react'
import Link from 'next/link'

export default async function RepositoryCommitsPage({
	params: { repoOwner, repoName },
}: {
	params: { repoOwner: string; repoName: string }
}) {
	const session = await auth()
	if (!session) return null

	const {
		user: {
			profile: { login },
		},
	} = session

	if (repoOwner !== login) {
		return (
			<Forbidden title='You can not see commits from repositories you do not own.' />
		)
	}

	const commits = await getRepositoryCommits(repoOwner, repoName)
	return (
		<div className='flex flex-col w-full gap-5 px-1'>
			{/* Header */}
			<div className='bg-card px-3 py-1 rounded-md flex justify-between items-center'>
				<h1 className='text-2xl flex gap-2 items-center'>
					<HistoryIcon className='text-primary' />
					Commit history from {repoOwner}/{repoName}
				</h1>

				<Link
					href={`/repositories/${repoOwner}/${repoName}`}
					className='border px-2 py-1 rounded-md flex gap-2 items-center'>
					<ArrowLeftIcon />
					Back to repository
				</Link>
			</div>

			<Separator />

			{/* Commits list */}
			<div className='flex flex-col gap-1'>
				{commits.map(({ sha, commit, author, html_url }) => (
					<Link
						href={html_url}
						target='_blank'
						key={sha}
						className='w-full border border-separator px-3 py-2 bg-card flex justify-between items-center'>
						<div className='flex gap-2'>
							<GitCommitHorizontalIcon className='text-primary' />
							<span>{commit.message}</span>
						</div>
						<span className='text-sm text-light'>
							Committed by {author?.login || commit.author.name} at{' '}
							{formatDate(commit.author.date)}
						</span>
					</Link>
				))}
			</div>
		</div>
	)
}
