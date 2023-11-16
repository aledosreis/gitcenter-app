import { Separator } from '@/components/Separator'
import { formatDate } from '@/utils/date'
import { getRepositoryCommits } from '@/utils/fetch'
import { GitCommitHorizontalIcon, HistoryIcon } from 'lucide-react'

export default async function RepositoryCommitsPage({
	params: { repoOwner, repoName },
}: {
	params: { repoOwner: string; repoName: string }
}) {
	const commits = await getRepositoryCommits(repoOwner, repoName)
	return (
		<div className='flex flex-col w-full gap-5 px-1'>
			{/* Header */}
			<div className='bg-zinc-900 px-3 py-1 rounded-md'>
				<h1 className='text-2xl flex gap-2 items-center'>
					<HistoryIcon />
					Commit history from {repoOwner}/{repoName}
				</h1>
			</div>

			<Separator />

			{/* Commits list */}
			<div className='flex flex-col gap-1'>
				{commits.map(({ sha, commit, author }) => (
					<div
						key={sha}
						className='w-full border border-zinc-600 px-3 py-2 bg-zinc-900 flex justify-between items-center'>
						<div className='flex gap-2'>
							<GitCommitHorizontalIcon />
							<span>{commit.message}</span>
						</div>
						<span className='text-sm text-zinc-300'>
							Committed by {author.login} at {formatDate(commit.author.date)}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
